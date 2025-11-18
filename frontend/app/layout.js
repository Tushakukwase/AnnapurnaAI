import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AnnapurnaAI - Ancient Indian Food Recommender',
  description: 'Discover Ancient Foods for Modern Health with Ayurvedic Wisdom',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
