'use client'

import { useState } from 'react'
import { Menu, User, Settings, Bell, Search } from 'lucide-react'

interface HeaderProps {
  onMenuClick: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [showProfile, setShowProfile] = useState(false)

  return (
    <header className="bg-[#0a0a0a] border-b border-gray-800 px-4 py-2 flex items-center justify-between flex-shrink-0">
      {/* Left side */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg hover:bg-gray-800 transition-colors md:hidden"
        >
          <Menu className="w-5 h-5 text-gray-300" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">I</span>
          </div>
          <h1 className="text-lg font-bold text-white">InsuranceBot</h1>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-1">
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <User className="w-3 h-3 text-white" />
            </div>
            <span className="text-gray-300 font-medium hidden sm:block text-sm">User</span>
          </button>
          
          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 bg-[#18181b] border border-gray-700 rounded-lg shadow-lg py-2">
              <a href="#" className="block px-4 py-2 text-gray-300 hover:bg-gray-800">Profile</a>
              <a href="#" className="block px-4 py-2 text-gray-300 hover:bg-gray-800">Settings</a>
              <a href="#" className="block px-4 py-2 text-gray-300 hover:bg-gray-800">Billing</a>
              <hr className="my-2 border-gray-700" />
              <a href="#" className="block px-4 py-2 text-gray-300 hover:bg-gray-800">Sign out</a>
            </div>
          )}
        </div>
      </div>
    </header>
  )
} 