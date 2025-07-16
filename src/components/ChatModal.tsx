'use client';

import { useState } from 'react';
import {
  Drawer,
  Box,
  TextField,
  IconButton,
  Typography,
  Paper,
  AppBar,
  Toolbar,
  Chip,
  CircularProgress,
  Avatar,
  Divider,
  Button,
} from '@mui/material';
import { Send, Close, SmartToy, Person, RestartAlt, ChatBubbleOutline } from '@mui/icons-material';
import { ChatMessage } from '@/interface/types';
import { generateId } from '@/utils';

interface ChatDrawerProps {
  open: boolean;
  onClose: () => void;
  dict?: any;
}

export default function ChatDrawer({ open, onClose, dict = {} }: ChatDrawerProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: generateId(),
      content:
        "Hello! I'm your AI financial assistant. I can help you with budgeting, saving tips, investment advice, and answering questions about your financial data. How can I assist you today?",
      role: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: generateId(),
      content: currentMessage,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const messageToSend = currentMessage;
    setCurrentMessage('');
    setLoading(true);

    try {
      // Get conversation history for context
      const conversationMessages = messages.map((msg) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      }));

      // Call the API route
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageToSend,
          messages: conversationMessages,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from AI assistant');
      }

      const data = await response.json();
      const aiResponseText = data.response;

      const aiResponse: ChatMessage = {
        id: generateId(),
        content: aiResponseText,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorResponse: ChatMessage = {
        id: generateId(),
        content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleNewChat = () => {
    setMessages([
      {
        id: generateId(),
        content: "Hello! I'm your AI financial assistant. How can I help you today?",
        role: 'assistant',
        timestamp: new Date(),
      },
    ]);
  };

  const handleExampleClick = (example: string) => {
    setCurrentMessage(example);
  };

  const exampleQuestions = [
    'How can I create a monthly budget?',
    'What are some effective saving strategies?',
    'How should I start investing?',
    'Analyze my spending patterns',
    'Help me set financial goals',
  ];

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100vw', sm: 400, md: 500 },
          maxWidth: '100vw',
        },
      }}
    >
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <AppBar position="static" elevation={0} sx={{ bgcolor: 'background.paper', color: 'text.primary' }}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                <SmartToy fontSize="small" />
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Financial AI
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton onClick={handleNewChat} size="small" sx={{ color: 'text.secondary' }}>
                <RestartAlt />
              </IconButton>
              <IconButton onClick={onClose} size="small" sx={{ color: 'text.secondary' }}>
                <Close />
              </IconButton>
            </Box>
          </Toolbar>
          <Divider />
        </AppBar>

        {/* Chat Messages */}
        <Box
          sx={{
            flexGrow: 1,
            overflow: 'auto',
            p: 2,
            backgroundColor: '#f8f9fa',
          }}
        >
          {messages.map((message, index) => (
            <Box key={message.id} sx={{ mb: 3 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 2,
                  flexDirection: message.role === 'user' ? 'row-reverse' : 'row',
                }}
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: message.role === 'user' ? 'primary.main' : 'grey.300',
                  }}
                >
                  {message.role === 'user' ? <Person fontSize="small" /> : <SmartToy fontSize="small" />}
                </Avatar>

                <Box
                  sx={{
                    maxWidth: '85%',
                    minWidth: '200px',
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      mb: 0.5,
                      display: 'block',
                      textAlign: message.role === 'user' ? 'right' : 'left',
                    }}
                  >
                    {message.role === 'user' ? 'You' : 'Financial AI'}
                  </Typography>

                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      bgcolor: message.role === 'user' ? 'primary.main' : 'background.paper',
                      color: message.role === 'user' ? 'primary.contrastText' : 'text.primary',
                      borderRadius: 2,
                      border: message.role === 'assistant' ? '1px solid' : 'none',
                      borderColor: 'divider',
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        whiteSpace: 'pre-wrap',
                        lineHeight: 1.5,
                      }}
                    >
                      {message.content}
                    </Typography>
                  </Paper>

                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      mt: 0.5,
                      display: 'block',
                      textAlign: message.role === 'user' ? 'right' : 'left',
                    }}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}

          {loading && (
            <Box sx={{ mb: 3 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 2,
                }}
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: 'grey.300',
                  }}
                >
                  <SmartToy fontSize="small" />
                </Avatar>

                <Box>
                  <Typography variant="caption" sx={{ color: 'text.secondary', mb: 0.5, display: 'block' }}>
                    Financial AI
                  </Typography>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      bgcolor: 'background.paper',
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CircularProgress size={16} />
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Thinking...
                      </Typography>
                    </Box>
                  </Paper>
                </Box>
              </Box>
            </Box>
          )}
        </Box>

        {/* Example Questions - Only show if no conversation started */}
        {messages.length === 1 && (
          <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
            <Typography variant="subtitle2" sx={{ mb: 2, color: 'text.secondary' }}>
              Try asking about:
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {exampleQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outlined"
                  size="small"
                  onClick={() => handleExampleClick(question)}
                  sx={{
                    justifyContent: 'flex-start',
                    textAlign: 'left',
                    textTransform: 'none',
                    borderRadius: 2,
                  }}
                >
                  <ChatBubbleOutline sx={{ mr: 1, fontSize: 16 }} />
                  {question}
                </Button>
              ))}
            </Box>
            <Divider sx={{ my: 2 }} />
          </Box>
        )}

        {/* Input Area */}
        <Box
          sx={{
            p: 2,
            bgcolor: 'background.paper',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              placeholder="Message Financial AI..."
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              variant="outlined"
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  backgroundColor: 'grey.50',
                },
              }}
            />
            <IconButton
              color="primary"
              onClick={handleSendMessage}
              disabled={!currentMessage.trim() || loading}
              sx={{
                borderRadius: 2,
                p: 1.5,
                bgcolor: currentMessage.trim() && !loading ? 'primary.main' : 'grey.300',
                color: 'white',
                '&:hover': {
                  bgcolor: currentMessage.trim() && !loading ? 'primary.dark' : 'grey.400',
                },
              }}
            >
              <Send fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
}
