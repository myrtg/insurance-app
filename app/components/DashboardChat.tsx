import { useState } from 'react'
import apiService, { ChatResponse, SingleModelResponse } from '../services/api'

const MODELS = [
  { id: 'all', label: 'All Models' },
  { id: 'llama3', label: 'LLaMA 3' },
  { id: 'mixtral', label: 'Mixtral' },
  { id: 'tinyllama', label: 'TinyLLaMA' },
] as const

type ModelId = typeof MODELS[number]['id']

export default function DashboardChat() {
  const [selectedModel, setSelectedModel] = useState<ModelId>('all')
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<ChatResponse | SingleModelResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    
    setIsLoading(true)
    setError(null)
    setResponse(null)
    setExpandedCard(null)

    try {
      let result
      switch (selectedModel) {
        case 'all':
          result = await apiService.chat(input.trim())
          break
        case 'llama3':
          result = await apiService.llama3(input.trim())
          break
        case 'mixtral':
          result = await apiService.mixtral(input.trim())
          break
        case 'tinyllama':
          result = await apiService.tinyllama(input.trim())
          break
      }
      setResponse(result)
      
      if (!result.success) {
        setError('Failed to get response from the selected model(s)')
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while processing your request')
    } finally {
      setIsLoading(false)
    }
  }

  const toggleCard = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId)
  }

  return (
    <div className="flex flex-col items-center w-full gap-10">
      {/* Model selection and input */}
      <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-6">
        <div className="flex flex-row justify-center gap-2 w-full">
          {MODELS.map((model) => (
            <button
              key={model.id}
              type="button"
              onClick={() => setSelectedModel(model.id)}
              className={`px-6 py-3 rounded-full font-semibold text-base transition-all border
                ${selectedModel === model.id
                  ? 'bg-primary text-white border-primary shadow-md'
                  : 'bg-[#18181b] text-gray-300 border-gray-800 hover:bg-[#232329]'}
              `}
            >
              {model.label}
            </button>
          ))}
        </div>
        <div className="w-full flex flex-row gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about insurance..."
            className="flex-1 px-7 py-6 rounded-2xl border border-gray-800 bg-[#18181b] text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/40 text-xl shadow-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="px-10 py-6 rounded-2xl bg-primary text-white font-bold shadow-md hover:bg-primary-dark transition disabled:opacity-60 text-xl"
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? 'Processing...' : 'Send'}
          </button>
        </div>
      </form>

      {/* Results */}
      <div className="w-full">
        {error && (
          <div className="bg-red-900/40 text-red-300 rounded-2xl p-6 text-center font-semibold mb-6">
            {error}
          </div>
        )}
        
        {selectedModel === 'all' && response && 'responses' in response && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {Object.entries(response.responses).map(([model, result]) => (
              <div 
                key={model}
                onClick={() => toggleCard(model)}
                className={`bg-[#18181b] border border-gray-800 rounded-2xl p-6 flex flex-col shadow-none cursor-pointer transition-all duration-300
                  ${expandedCard === model ? 'col-span-2 row-span-2 scale-105 z-10' : ''}`}
              >
                <div className="text-xs font-bold text-primary mb-2">
                  {model === 'llama3' ? 'LLaMA 3' : model === 'mixtral' ? 'Mixtral' : 'TinyLLaMA'}
                </div>
                <div className={`text-lg whitespace-pre-wrap ${result ? 'text-gray-100' : 'text-red-400'}`}>
                  {result || 'No response available'}
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedModel !== 'all' && response && 'response' in response && (
          <div className="flex flex-row justify-center w-full">
            <div 
              onClick={() => toggleCard(selectedModel)}
              className={`bg-[#18181b] border border-primary rounded-2xl p-8 flex flex-col shadow-none cursor-pointer transition-all duration-300
                ${expandedCard === selectedModel ? 'max-w-2xl scale-105' : 'max-w-xl'} w-full`}
            >
              <div className="text-xs font-bold text-primary mb-2">
                {MODELS.find((m) => m.id === selectedModel)?.label}
              </div>
              <div className={`text-lg whitespace-pre-wrap ${response.response ? 'text-gray-100' : 'text-red-400'}`}>
                {response.response || 'No response available'}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 