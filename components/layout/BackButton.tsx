'use client'

import { useRouter } from 'next/navigation'
import { setNavBack } from '@/lib/nav-direction'

export function BackButton() {
  const router = useRouter()

  const handleBack = () => {
    setNavBack()
    router.push('/')
  }

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
