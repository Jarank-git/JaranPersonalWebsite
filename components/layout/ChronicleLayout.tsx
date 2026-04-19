'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface ChronicleLayoutProps {
  eyebrow: string
  title: string
  titleSub: string
  lead: string
  children: ReactNode
}

const ENTER = {
  duration: 0.45,
  delay: 0.08,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
}

export function ChronicleLayout({
  eyebrow,
  title,
  titleSub,
  lead,
  children,
}: ChronicleLayoutProps) {
  return (
    <main className="chronicle">
      <header className="chronicle-header">
        <Link href="/" className="chronicle-back" aria-label="Return to main menu">
          <span className="chronicle-back-glyph" aria-hidden>
            {'\u2190'}
          </span>
          <span className="chronicle-back-text">Return</span>
        </Link>
        <div className="chronicle-mast">EXPEDITION XXXIII</div>
      </header>

      <motion.article
        className="chronicle-body"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0, transition: ENTER }}
      >
        <div className="chronicle-eyebrow">{eyebrow}</div>
        <h1 className="chronicle-title">{title}</h1>
        <div className="chronicle-title-sub">{titleSub}</div>
        <p className="chronicle-lead">{lead}</p>
        <div className="chronicle-content">{children}</div>
      </motion.article>

      <footer className="chronicle-foot">
        <span>{'\u27E1'} Lumi&egrave;re &middot; Anno MMXXVI {'\u27E1'}</span>
      </footer>
    </main>
  )
}
