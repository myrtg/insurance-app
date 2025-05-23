'use client'

import { useState } from 'react'
import { Message } from './Message'

interface ChatInterfaceProps {
  selectedModel: 'all' | 'llama3' | 'mixtral' | 'tinyllama'
}

interface ChatMessage {
  id: string
  content: string
  role: 'user' | 'assistant'
  model?: string
  error?: string
  meta?: {
    intent?: string
    source?: string
  }
}

export default function ChatInterface({ selectedModel }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const endpoint = selectedModel === 'all' ? '/api/chat' : `/api/${selectedModel}`
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: input.trim() }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (selectedModel === 'all') {
        const newMessages: ChatMessage[] = []
        // Dataset match
        if (data.dataset_match && data.dataset) {
          newMessages.push({
            id: `${Date.now()}-dataset`,
            content: data.dataset.response,
            role: 'assistant',
            model: 'Dataset Match',
            meta: {
              intent: data.dataset.intent,
              source: data.dataset.source,
            },
            error: !data.dataset.success ? data.dataset.response : undefined,
          })
        }
        // Model answers
        for (const [model, result] of Object.entries(data.models)) {
          const res = result as any;
          newMessages.push({
            id: `${Date.now()}-${model}`,
            content: res.success ? res.response : res.error,
            role: 'assistant',
            model,
            error: !res.success ? res.error : undefined,
          })
        }
        setMessages((prev) => [...prev, ...newMessages])
      } else {
        const assistantMessage: ChatMessage = {
          id: Date.now().toString(),
          content: data.success ? data.response : data.error,
          role: 'assistant',
          model: selectedModel,
          error: !data.success ? data.error : undefined,
        }
        setMessages((prev) => [...prev, assistantMessage])
      }
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        content: 'An error occurred while fetching the response. Please make sure the backend server is running at http://localhost:5000',
        role: 'assistant',
        error: 'Failed to get response',
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto mb-6 space-y-6 px-10 pt-10">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        {isLoading && (
          <div className="flex items-center justify-center py-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-4 px-10 pb-10">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about insurance..."
          className="flex-1 px-6 py-5 rounded-2xl border border-gray-800 bg-[#18181b] text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/40 text-lg shadow-none"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="px-8 py-5 rounded-2xl bg-primary text-white font-bold shadow-md hover:bg-primary-dark transition disabled:opacity-60 text-lg"
          disabled={isLoading || !input.trim()}
        >
          Send
        </button>
      </form>
    </div>
  )
} 