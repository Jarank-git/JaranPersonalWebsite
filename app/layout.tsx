import type { Metadata } from 'next'
import { Cinzel, EB_Garamond } from 'next/font/google'
import './globals.css'

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-cinzel',
  display: 'swap',
})

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-eb-garamond',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Jaran Khalid',
  description: 'Portfolio — Electrical Engineering, University of Waterloo.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cinzel.variable} ${ebGaramond.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  )
}
