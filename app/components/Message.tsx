interface MessageProps {
  message: {
    content: string
    role: 'user' | 'assistant'
    model?: string
    error?: string
    meta?: {
      intent?: string
      source?: string
    }
  }
}

export function Message({ message }: MessageProps) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} w-full`}>
      <div
        className={`w-full max-w-2xl rounded-2xl p-7 shadow-none border border-gray-800 bg-[#18181b] transition-all
          ${isUser ? 'ml-auto' : 'mr-auto'}
        `}
      >
        {!isUser && message.model && (
          <div className="text-xs font-bold mb-3 text-primary">
            {message.model}
            {message.meta && (
              <>
                {message.meta.intent && <span> | Intent: {message.meta.intent}</span>}
                {message.meta.source && <span> | Source: {message.meta.source}</span>}
              </>
            )}
          </div>
        )}
        <div className={`whitespace-pre-wrap text-lg leading-relaxed ${isUser ? 'text-gray-100' : message.error ? 'text-red-500' : 'text-gray-200'}`}>{message.content}</div>
      </div>
    </div>
  )
} 