interface ModelSelectorProps {
  selectedModel: 'all' | 'llama3' | 'mixtral' | 'tinyllama'
  onModelSelect: (model: 'all' | 'llama3' | 'mixtral' | 'tinyllama') => void
}

export default function ModelSelector({ selectedModel, onModelSelect }: ModelSelectorProps) {
  const models = [
    { id: 'all', name: 'All Models', description: 'Get answers from all available models' },
    { id: 'llama3', name: 'LLaMA 3', description: 'Powered by Groq' },
    { id: 'mixtral', name: 'Mixtral', description: 'Powered by Groq' },
    { id: 'tinyllama', name: 'TinyLLaMA', description: 'Local model' },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4 tracking-tight text-white">Select Model</h2>
      <div className="flex flex-col gap-4">
        {models.map((model) => (
          <button
            key={model.id}
            onClick={() => onModelSelect(model.id as any)}
            className={`w-full text-left px-6 py-5 rounded-2xl border transition-all duration-150 font-semibold shadow-none focus:outline-none focus:ring-2 focus:ring-primary/40
              ${selectedModel === model.id
                ? 'bg-[#18181b] border-primary text-primary font-bold shadow-md'
                : 'bg-transparent border-gray-800 hover:bg-[#232329] text-gray-300'}
            `}
          >
            <div className="text-lg font-semibold mb-1">{model.name}</div>
            <div className="text-base text-gray-400">
              {model.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
} 