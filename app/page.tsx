'use client'

import { useState } from 'react'
import DashboardChat from './components/DashboardChat'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center py-16 px-2">
      <div className="w-full max-w-4xl flex flex-col gap-16">
        <header className="flex flex-col items-center gap-4 mt-8 mb-8">
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-4 leading-tight text-center drop-shadow-xl">Insurance Chatbot</h1>
          <p className="text-2xl text-gray-400 text-center max-w-3xl font-light">
            Get answers from multiple AI models about insurance-related questions
          </p>
        </header>
        <DashboardChat />
      </div>
    </div>
  )
}
