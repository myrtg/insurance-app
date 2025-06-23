'use client'

import { useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import DashboardChat from './components/DashboardChat'

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleNewChat = () => {
    // Reset chat state - this will trigger a refresh of the chat
    setSidebarOpen(false)
    // Force a re-render by updating the key
    window.location.reload()
  }

  return (
    <div className="h-screen bg-[#0a0a0a] flex overflow-hidden">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        onNewChat={handleNewChat}
      />
      
      <main className="flex-1 flex flex-col overflow-hidden min-h-0">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <div className="flex-1 flex flex-col overflow-hidden min-h-0">
          <DashboardChat />
        </div>
      </main>
    </div>
  )
}
