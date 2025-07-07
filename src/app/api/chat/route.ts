import { NextRequest, NextResponse } from 'next/server'
import { azureOpenAIService } from '@/service/azureOpenAI'

interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export async function POST(request: NextRequest) {
  try {
    const { message, messages = [] } = await request.json()
    
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Prepare conversation history for Azure OpenAI
    const conversationMessages: ChatMessage[] = messages.map((msg: any) => ({
      role: msg.role,
      content: msg.content
    }))

    // Add the new user message
    conversationMessages.push({
      role: 'user',
      content: message
    })

    // Call Azure OpenAI service
    const response = await azureOpenAIService.sendMessage(conversationMessages)

    return NextResponse.json({
      response,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
