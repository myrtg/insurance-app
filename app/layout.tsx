import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata = {
  title: 'Insurance Chatbot',
  description: 'Multi-model insurance chatbot powered by LLaMA 3, Mixtral, and TinyLLaMA',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-white dark:bg-gray-900`}>
        <main className="min-h-screen">
        {children}
        </main>
      </body>
    </html>
  )
}
