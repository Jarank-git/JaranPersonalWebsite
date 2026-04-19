import type { Metadata } from 'next'
import { Cinzel, EB_Garamond } from 'next/font/google'
import './globals.css'
import { EmberField } from '@/components/layout/EmberField'
import { RouteTransition } from '@/components/layout/RouteTransition'
import { GlobalKeyboard } from '@/components/layout/GlobalKeyboard'
import { Breadcrumb } from '@/components/menu/Breadcrumb'
import { KeyHud } from '@/components/menu/KeyHud'

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
      <body className="relative min-h-screen antialiased">
        <EmberField />
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:bg-[var(--color-obsidian-2)] focus:px-3 focus:py-2 focus:text-[var(--color-cream)]"
        >
          Skip to navigation
        </a>
        <Breadcrumb />
        <div id="content">
          <RouteTransition>{children}</RouteTransition>
        </div>
        <KeyHud />
        <GlobalKeyboard />
      </body>
    </html>
  )
}
