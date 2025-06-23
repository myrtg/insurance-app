'use client'

import { Heart, Github, Twitter, Mail, Shield, FileText, HelpCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#0f0f0f] border-t border-gray-800 px-6 py-8 mt-auto">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xs">I</span>
              </div>
              <span className="text-white font-bold">InsuranceBot</span>
            </div>
            <p className="text-gray-400 text-sm">
              Intelligent insurance assistance powered by multiple AI models to help you make informed decisions.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Products</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">AI Chat Assistant</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Insurance Calculator</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Policy Analyzer</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Claims Helper</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Documentation
              </a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                Help Center
              </a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Insurance Guides</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API Reference</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Privacy Policy
              </a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Compliance</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>© 2024 InsuranceBot. Built with</span>
            <Heart className="w-4 h-4 text-red-500" />
            <span>using Next.js & AI</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-400">All systems operational</span>
            </div>
            <span className="text-gray-500">v1.2.0</span>
          </div>
        </div>

        {/* AI Models Notice */}
        <div className="mt-6 p-4 bg-[#18181b] border border-gray-800 rounded-lg">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-gray-200 mb-1">AI Models Information</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                This application uses LLaMA 3.3, Gemma2, and TinyLLaMA models to provide insurance advice. 
                Responses are AI-generated and should not replace professional insurance consultation. 
                Always verify important decisions with licensed insurance professionals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 