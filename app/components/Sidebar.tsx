'use client'

import { useState } from 'react'
import { Plus, MessageSquare, Archive, Trash2, Edit, X } from 'lucide-react'

interface ChatHistoryItem {
  id: string
  title: string
  timestamp: Date
  preview: string
}

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  onNewChat: () => void
}

const mockChatHistory: ChatHistoryItem[] = [
  {
    id: '1',
    title: 'Car insurance coverage options',
    timestamp: new Date('2024-12-20T10:30:00'),
    preview: 'What are the different types of car insurance...'
  },
  {
    id: '2',
    title: 'Health insurance claims process',
    timestamp: new Date('2024-12-20T09:15:00'),
    preview: 'How do I file a health insurance claim...'
  },
  {
    id: '3',
    title: 'Home insurance deductibles',
    timestamp: new Date('2024-12-19T16:45:00'),
    preview: 'What is a deductible in home insurance...'
  }
]

const formatDate = (date: Date) => {
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
  
  if (diffInHours < 1) return 'Just now'
  if (diffInHours < 24) return `${diffInHours}h ago`
  if (diffInHours < 48) return 'Yesterday'
  return date.toLocaleDateString()
}

export default function Sidebar({ isOpen, onClose, onNewChat }: SidebarProps) {
  const [hoveredChat, setHoveredChat] = useState<string | null>(null)

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      <div className={`
        fixed top-0 left-0 h-full bg-[#0f0f0f] border-r border-gray-800 z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 w-80
      `}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Chat History</h2>
              <button
                onClick={onClose}
                className="p-1 rounded-md hover:bg-gray-800 md:hidden"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            
            <button
              onClick={onNewChat}
              className="w-full flex items-center gap-3 p-3 bg-primary hover:bg-primary/90 rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5 text-white" />
              <span className="text-white font-medium">New Chat</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-2">
              <div className="mb-4">
                <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider px-2 mb-2">
                  Today
                </h3>
                {mockChatHistory.slice(0, 2).map((chat) => (
                  <div
                    key={chat.id}
                    className="group relative p-3 rounded-lg hover:bg-[#18181b] cursor-pointer mb-1 transition-colors"
                    onMouseEnter={() => setHoveredChat(chat.id)}
                    onMouseLeave={() => setHoveredChat(null)}
                  >
                    <div className="flex items-start gap-3">
                      <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-200 truncate">
                          {chat.title}
                        </h4>
                        <p className="text-xs text-gray-400 truncate mt-1">
                          {chat.preview}
                        </p>
                        <span className="text-xs text-gray-500 mt-1 block">
                          {formatDate(chat.timestamp)}
                        </span>
                      </div>
                    </div>
                    
                    {hoveredChat === chat.id && (
                      <div className="absolute right-2 top-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1 rounded hover:bg-gray-700">
                          <Edit className="w-3 h-3 text-gray-400" />
                        </button>
                        <button className="p-1 rounded hover:bg-gray-700">
                          <Trash2 className="w-3 h-3 text-gray-400" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider px-2 mb-2">
                  Yesterday
                </h3>
                {mockChatHistory.slice(2).map((chat) => (
                  <div
                    key={chat.id}
                    className="group relative p-3 rounded-lg hover:bg-[#18181b] cursor-pointer mb-1 transition-colors"
                    onMouseEnter={() => setHoveredChat(chat.id)}
                    onMouseLeave={() => setHoveredChat(null)}
                  >
                    <div className="flex items-start gap-3">
                      <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-200 truncate">
                          {chat.title}
                        </h4>
                        <p className="text-xs text-gray-400 truncate mt-1">
                          {chat.preview}
                        </p>
                        <span className="text-xs text-gray-500 mt-1 block">
                          {formatDate(chat.timestamp)}
                        </span>
                      </div>
                    </div>
                    
                    {hoveredChat === chat.id && (
                      <div className="absolute right-2 top-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1 rounded hover:bg-gray-700">
                          <Edit className="w-3 h-3 text-gray-400" />
                        </button>
                        <button className="p-1 rounded hover:bg-gray-700">
                          <Trash2 className="w-3 h-3 text-gray-400" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-800">
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 p-2 text-sm text-gray-400 hover:text-gray-300 hover:bg-gray-800 rounded-lg transition-colors">
                <Archive className="w-4 h-4" />
                Archive
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 p-2 text-sm text-gray-400 hover:text-gray-300 hover:bg-gray-800 rounded-lg transition-colors">
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
