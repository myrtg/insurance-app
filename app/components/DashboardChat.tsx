import { useState } from 'react'

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
  const [response, setResponse] = useState<any>(null)
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
      const endpoint = selectedModel === 'all' ? '/api/chat' : `/api/${selectedModel}`
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: input.trim() }),
      })
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      const data = await res.json()
      setResponse(data)
    } catch (err: any) {
      setError(err.message || 'Unknown error')
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
            {isLoading ? '...' : 'Send'}
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
        {selectedModel === 'all' && response && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {/* Dataset match */}
            {response.dataset_match && response.dataset && (
              <div 
                onClick={() => toggleCard('dataset')}
                className={`bg-[#18181b] border border-primary rounded-2xl p-6 flex flex-col shadow-none cursor-pointer transition-all duration-300
                  ${expandedCard === 'dataset' ? 'col-span-2 row-span-2 scale-105 z-10' : ''}`}
              >
                <div className="text-xs font-bold text-primary mb-2">Dataset Match</div>
                <div className="text-lg text-gray-100 mb-2 whitespace-pre-wrap">{response.dataset.response}</div>
                <div className="text-xs text-gray-400">Intent: {response.dataset.intent} | Source: {response.dataset.source}</div>
              </div>
            )}
            {/* Model answers */}
            {Object.entries(response.models).map(([model, result]: [string, any]) => (
              <div 
                key={model}
                onClick={() => toggleCard(model)}
                className={`bg-[#18181b] border border-gray-800 rounded-2xl p-6 flex flex-col shadow-none cursor-pointer transition-all duration-300
                  ${expandedCard === model ? 'col-span-2 row-span-2 scale-105 z-10' : ''}`}
              >
                <div className="text-xs font-bold text-primary mb-2">
                  {model === 'llama3' ? 'LLaMA 3' : model === 'mixtral' ? 'Mixtral' : model === 'tinyllama' ? 'TinyLLaMA' : model}
                </div>
                <div className={`text-lg whitespace-pre-wrap ${result.success ? 'text-gray-100' : 'text-red-400'}`}>
                  {result.success ? result.response : result.error}
                </div>
                <div className="text-xs text-gray-500 mt-2">{result.model}</div>
              </div>
            ))}
          </div>
        )}
        {selectedModel !== 'all' && response && (
          <div className="flex flex-row justify-center w-full">
            <div 
              onClick={() => toggleCard(selectedModel)}
              className={`bg-[#18181b] border border-primary rounded-2xl p-8 flex flex-col shadow-none cursor-pointer transition-all duration-300
                ${expandedCard === selectedModel ? 'max-w-2xl scale-105' : 'max-w-xl'} w-full`}
            >
              <div className="text-xs font-bold text-primary mb-2">
                {MODELS.find((m) => m.id === selectedModel)?.label}
              </div>
              <div className={`text-lg whitespace-pre-wrap ${response.success ? 'text-gray-100' : 'text-red-400'}`}>
                {response.success ? response.response : response.error}
              </div>
              <div className="text-xs text-gray-500 mt-2">{response.model}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 