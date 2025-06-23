import { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'
import apiService, { ChatResponse, SingleModelResponse } from '../services/api'
import ChatMessage from './ChatMessage'

const MODELS = [
  { id: 'all', label: 'All Models' },
  { id: 'llama3', label: 'LLaMA 3' },
  { id: 'mixtral', label: 'Mixtral' },
  { id: 'tinyllama', label: 'TinyLLaMA' },
] as const

type ModelId = typeof MODELS[number]['id']

interface ChatMessageType {
  id: string
  content: string
  role: 'user' | 'assistant'
  model?: string
  timestamp: Date
  rating?: number
}

export default function DashboardChat() {
  const [selectedModel, setSelectedModel] = useState<ModelId>('all')
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<ChatMessageType[]>([])
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    
    // Add user message
    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      content: input.trim(),
      role: 'user',
      timestamp: new Date(),
    }
    
    setMessages(prev => [...prev, userMessage])
    const currentInput = input.trim()
    setInput('')
    setIsLoading(true)
    setError(null)

    try {
      let result
      switch (selectedModel) {
        case 'all':
          result = await apiService.chat(currentInput)
          break
        case 'llama3':
          result = await apiService.llama3(currentInput)
          break
        case 'mixtral':
          result = await apiService.mixtral(currentInput)
          break
        case 'tinyllama':
          result = await apiService.tinyllama(currentInput)
          break
      }
      
      // Add AI responses
      if (selectedModel === 'all' && 'models' in result) {
        const responseMessages: ChatMessageType[] = []
        
        // Add dataset response if available
        if (result.dataset_match && result.dataset && result.dataset.response) {
          responseMessages.push({
            id: `${Date.now()}-dataset`,
            content: result.dataset.response,
            role: 'assistant',
            model: 'dataset',
            timestamp: new Date(),
          })
        }
        
        // Add model responses
        Object.entries(result.models).forEach(([modelKey, modelData]) => {
          if (modelData.success && modelData.response) {
            responseMessages.push({
              id: `${Date.now()}-${modelKey}`,
              content: modelData.response,
              role: 'assistant',
              model: modelKey,
              timestamp: new Date(),
            })
          }
        })
        
        if (responseMessages.length === 0) {
          setError('Failed to get response from the selected model(s)')
        } else {
          setMessages(prev => [...prev, ...responseMessages])
        }
      } else if (selectedModel !== 'all' && 'response' in result) {
        if (result.response) {
          const responseMessage: ChatMessageType = {
            id: `${Date.now()}-${selectedModel}`,
            content: result.response,
            role: 'assistant',
            model: selectedModel,
            timestamp: new Date(),
          }
          setMessages(prev => [...prev, responseMessage])
        } else {
          setError('Failed to get response from the selected model(s)')
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while processing your request')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRatingChange = (messageId: string, rating: number) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, rating } : msg
      )
    )
  }

  const handleNewChat = () => {
    setMessages([])
    setError(null)
    setInput('')
  }

  return (
    <div className="flex flex-col h-full w-full">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto bg-[#0a0a0a] min-h-0">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-center p-8">
            <div>
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-xl font-semibold text-gray-300 mb-3">How can I help you today?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-md">
                <button className="p-3 bg-[#18181b] border border-gray-800 rounded-lg text-left hover:bg-[#232329] transition-colors">
                  <div className="text-sm font-medium text-gray-200">Compare insurance types</div>
                  <div className="text-xs text-gray-400 mt-1">Auto, home, health coverage</div>
                </button>
                <button className="p-3 bg-[#18181b] border border-gray-800 rounded-lg text-left hover:bg-[#232329] transition-colors">
                  <div className="text-sm font-medium text-gray-200">Claims assistance</div>
                  <div className="text-xs text-gray-400 mt-1">File and track claims</div>
                </button>
                <button className="p-3 bg-[#18181b] border border-gray-800 rounded-lg text-left hover:bg-[#232329] transition-colors">
                  <div className="text-sm font-medium text-gray-200">Policy questions</div>
                  <div className="text-xs text-gray-400 mt-1">Understand your coverage</div>
                </button>
                <button className="p-3 bg-[#18181b] border border-gray-800 rounded-lg text-left hover:bg-[#232329] transition-colors">
                  <div className="text-sm font-medium text-gray-200">Premium calculations</div>
                  <div className="text-xs text-gray-400 mt-1">Estimate costs</div>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-0">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                onRatingChange={handleRatingChange}
              />
            ))}
          </div>
        )}
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="flex items-center gap-3 p-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-gray-300">AI Assistant</span>
                <span className="text-xs text-gray-500">thinking...</span>
              </div>
              <div className="bg-[#18181b] rounded-2xl px-3 py-2 border border-gray-800">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Error message */}
        {error && (
          <div className="p-3">
            <div className="bg-red-900/40 text-red-300 rounded-2xl p-3 text-center text-sm">
              {error}
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="p-4 bg-[#0a0a0a] flex-shrink-0">
        {/* Model Selection */}
        <div className="flex flex-row justify-center gap-2 mb-4">
          {MODELS.map((model) => (
            <button
              key={model.id}
              type="button"
              onClick={() => setSelectedModel(model.id)}
              className={`px-3 py-1.5 rounded-full font-medium text-xs transition-all border
                ${selectedModel === model.id
                  ? 'bg-primary text-white border-primary'
                  : 'bg-[#18181b] text-gray-300 border-gray-800 hover:bg-[#232329]'}
              `}
            >
              {model.label}
            </button>
          ))}
        </div>
        
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message InsuranceBot..."
              className="flex-1 px-4 py-3 rounded-xl border border-gray-700 bg-[#18181b] text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="px-4 py-3 rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading || !input.trim()}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 