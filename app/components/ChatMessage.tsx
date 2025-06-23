'use client'

import { User, Bot, Copy, ThumbsUp, ThumbsDown } from 'lucide-react'
import StarRating from './StarRating'

interface ChatMessageProps {
  message: {
    id: string
    content: string
    role: 'user' | 'assistant'
    model?: string
    timestamp: Date
    rating?: number
  }
  onRatingChange?: (messageId: string, rating: number) => void
}

// Simple markdown renderer for bold text
const renderMarkdown = (text: string) => {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
}

const getModelIcon = (model?: string) => {
  if (!model) return null
  
  const modelColors = {
    'llama3': 'bg-blue-500',
    'mixtral': 'bg-purple-500', 
    'tinyllama': 'bg-green-500',
    'dataset': 'bg-orange-500',
    'all': 'bg-gradient-to-r from-blue-500 to-purple-500'
  }
  
  const modelLabels = {
    'llama3': 'L3',
    'mixtral': 'MX',
    'tinyllama': 'TL',
    'dataset': 'DB',
    'all': 'AI'
  }
  
  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${modelColors[model as keyof typeof modelColors] || 'bg-gray-500'}`}>
      {modelLabels[model as keyof typeof modelLabels] || 'AI'}
    </div>
  )
}

export default function ChatMessage({ message, onRatingChange }: ChatMessageProps) {
  const isUser = message.role === 'user'
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })
  }

  return (
    <div className={`flex gap-3 p-3 group ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div className="flex-shrink-0">
        {isUser ? (
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
        ) : (
          getModelIcon(message.model)
        )}
      </div>

      {/* Message Content */}
      <div className={`flex-1 max-w-3xl ${isUser ? 'text-right' : 'text-left'}`}>
        {/* Header */}
        <div className={`flex items-center gap-2 mb-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
          <span className="text-sm font-medium text-gray-300">
            {isUser ? 'You' : (message.model === 'llama3' ? 'LLaMA 3' : 
                                message.model === 'mixtral' ? 'Mixtral' : 
                                message.model === 'tinyllama' ? 'TinyLLaMA' :
                                message.model === 'dataset' ? 'Dataset Match' : 'AI Assistant')}
          </span>
          <span className="text-xs text-gray-500">
            {formatTime(message.timestamp)}
          </span>
        </div>

        {/* Message Bubble */}
        <div className={`
          rounded-2xl px-3 py-2 max-w-full overflow-hidden
          ${isUser 
            ? 'bg-primary text-white ml-auto' 
            : 'bg-[#18181b] text-gray-100 border border-gray-800'
          }
        `}>
          {isUser ? (
            <p className="whitespace-pre-wrap break-words">{message.content}</p>
          ) : (
            <div 
              className="whitespace-pre-wrap break-words prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(message.content) }}
            />
          )}
        </div>

        {/* Actions (only for AI messages) */}
        {!isUser && (
          <div className={`flex items-center gap-4 mt-3 opacity-0 group-hover:opacity-100 transition-opacity ${isUser ? 'justify-end' : 'justify-start'}`}>
            {/* Rating */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Rate this response:</span>
              <StarRating
                initialRating={message.rating || 0}
                onRatingChange={(rating) => onRatingChange?.(message.id, rating)}
                size="sm"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={copyToClipboard}
                className="p-1.5 rounded-lg hover:bg-gray-800 transition-colors"
                title="Copy message"
              >
                <Copy className="w-4 h-4 text-gray-400" />
              </button>
              <button className="p-1.5 rounded-lg hover:bg-gray-800 transition-colors">
                <ThumbsUp className="w-4 h-4 text-gray-400" />
              </button>
              <button className="p-1.5 rounded-lg hover:bg-gray-800 transition-colors">
                <ThumbsDown className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 