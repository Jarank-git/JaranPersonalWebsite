import { MenuStack } from '@/components/menu/MenuStack'
import { Ornament } from '@/components/layout/Ornament'
import type { MenuItem } from '@/types/content'

const NOT_FOUND_ITEMS: MenuItem[] = [
  { label: 'Return to Main', href: '/' },
]

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="mb-10 text-center">
        <h1 className="menu-label gold-text text-5xl md:text-6xl">Quest Not Found</h1>
        <Ornament variant="flourish" className="mx-auto mt-4" />
        <p className="mt-4 text-lg italic text-[var(--color-cream-dim)]">
          This path no longer leads anywhere.
        </p>
      </div>
      <div className="w-full max-w-xl">
        <MenuStack items={NOT_FOUND_ITEMS} ariaLabel="Not-found actions" />
      </div>
    </main>
  )
}
