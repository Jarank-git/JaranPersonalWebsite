import type { Metadata } from 'next'
import {
  Cormorant_Garamond,
  IBM_Plex_Mono,
  Italianno,
} from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import { GlobalAtmosphere } from '@/components/layout/GlobalAtmosphere'
import { PageTransition } from '@/components/layout/PageTransition'

const optimusPrinceps = localFont({
  src: [
    { path: '../public/fonts/OptimusPrinceps.ttf', weight: '400', style: 'normal' },
    { path: '../public/fonts/OptimusPrincepsSemiBold.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-optimus-princeps',
  display: 'swap',
})

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-ibm-mono',
  display: 'swap',
})

const italianno = Italianno({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-italianno',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Jaran Khalid',
  description: 'Portfolio — Electrical Engineering, University of Waterloo.',
}

const fontVars = [
  optimusPrinceps.variable,
  cormorantGaramond.variable,
  ibmPlexMono.variable,
  italianno.variable,
].join(' ')

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVars}>
      <body className="antialiased">
        <a href="#content" className="skip-link">
          Skip to navigation
        </a>
        <GlobalAtmosphere />
        <div id="content" className="app-root">
          <PageTransition>{children}</PageTransition>
        </div>
      </body>
    </html>
  )
}
