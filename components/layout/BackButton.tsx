'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { setNavBack } from '@/lib/nav-direction'

export function BackButton() {
  const router = useRouter()

  const handleBack = () => {
    setNavBack()
    router.push('/')
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleBack()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <button
      className="dest-back-btn"
      onClick={handleBack}
      aria-label="Return to main menu"
      type="button"
    >
      <span>Return</span>
    </button>
  )
}
