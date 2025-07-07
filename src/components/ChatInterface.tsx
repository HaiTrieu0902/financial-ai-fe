'use client'

import { useState } from 'react'
import {
  Box,
  TextField,
  IconButton,
  Typography,
  Paper,
  AppBar,
  Toolbar,
  Chip,
  CircularProgress,
} from '@mui/material'
import { Send, Close, SmartToy, Person } from '@mui/icons-material'
import { ChatMessage } from '@/interface/types'
import { generateId } from '@/utils'

interface ChatInterfaceProps {
  dict: any
  onClose: () => void
}

export default function ChatInterface({ dict, onClose }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: generateId(),
      content: "Hello! I'm your AI financial assistant. How can I help you with your finances today?",
      role: 'assistant',
      timestamp: new Date(),
    },
  ])
  const [currentMessage, setCurrentMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return

    const userMessage: ChatMessage = {
      id: generateId(),
      content: currentMessage,
      role: 'user',
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    const messageToSend = currentMessage
    setCurrentMessage('')
    setLoading(true)

    try {
      // Get conversation history for context
      const conversationMessages = messages.map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content
      }))

      // Call the API route
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageToSend,
          messages: conversationMessages
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response from AI assistant')
      }

      const data = await response.json()
      const aiResponseText = data.response

      const aiResponse: ChatMessage = {
        id: generateId(),
        content: aiResponseText,
        role: 'assistant',
        timestamp: new Date(),
      }
      
      setMessages(prev => [...prev, aiResponse])
    } catch (error) {
      console.error('Error getting AI response:', error)
      const errorResponse: ChatMessage = {
        id: generateId(),
        content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
        role: 'assistant',
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, errorResponse])
    } finally {
      setLoading(false)
    }
  }

  const handleExampleClick = (example: string) => {
    setCurrentMessage(example)
  }

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <SmartToy sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {dict.chat.title}
          </Typography>
          <IconButton color="inherit" onClick={onClose}>
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Chat Messages */}
      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
        {messages.map((message) => (
          <Box
            key={message.id}
            sx={{
              display: 'flex',
              justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
              mb: 2,
            }}
          >
            <Paper
              sx={{
                p: 2,
                maxWidth: '80%',
                bgcolor: message.role === 'user' ? 'primary.main' : 'grey.100',
                color: message.role === 'user' ? 'white' : 'text.primary',
              }}
            >
              <Box display="flex" alignItems="center" mb={1}>
                {message.role === 'user' ? <Person fontSize="small" /> : <SmartToy fontSize="small" />}
                <Typography variant="caption" sx={{ ml: 1, opacity: 0.7 }}>
                  {message.role === 'user' ? 'You' : 'AI Assistant'}
                </Typography>
              </Box>
              <Typography variant="body2">{message.content}</Typography>
            </Paper>
          </Box>
        ))}
        
        {loading && (
          <Box display="flex" justifyContent="flex-start" mb={2}>
            <Paper sx={{ p: 2, bgcolor: 'grey.100' }}>
              <Box display="flex" alignItems="center">
                <SmartToy fontSize="small" sx={{ mr: 1 }} />
                <CircularProgress size={16} />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  Thinking...
                </Typography>
              </Box>
            </Paper>
          </Box>
        )}
      </Box>

      {/* Example Questions */}
      {messages.length === 1 && (
        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Typography variant="subtitle2" gutterBottom>
            Try asking:
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip
              label={dict.chat.examples.budgetHelp}
              onClick={() => handleExampleClick(dict.chat.examples.budgetHelp)}
              size="small"
              variant="outlined"
            />
            <Chip
              label={dict.chat.examples.savingTips}
              onClick={() => handleExampleClick(dict.chat.examples.savingTips)}
              size="small"
              variant="outlined"
            />
            <Chip
              label={dict.chat.examples.investmentAdvice}
              onClick={() => handleExampleClick(dict.chat.examples.investmentAdvice)}
              size="small"
              variant="outlined"
            />
          </Box>
        </Box>
      )}

      {/* Input Area */}
      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Box display="flex" gap={1}>
          <TextField
            fullWidth
            multiline
            maxRows={3}
            placeholder={dict.chat.placeholder}
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            variant="outlined"
            size="small"
          />
          <IconButton
            color="primary"
            onClick={handleSendMessage}
            disabled={!currentMessage.trim() || loading}
          >
            <Send />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}
