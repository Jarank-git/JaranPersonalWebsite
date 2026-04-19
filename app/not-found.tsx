import { MenuStack } from '@/components/menu/MenuStack'
import type { MenuItem } from '@/types/content'

const NOT_FOUND_ITEMS: MenuItem[] = [
  { label: 'Return to Main', href: '/' },
]

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="mb-10 text-center">
        <h1 className="menu-label text-4xl text-[var(--color-cream)]">Quest Not Found</h1>
        <p className="mt-3 text-[var(--color-cream-dim)]">
          This path no longer leads anywhere.
        </p>
      </div>
      <div className="w-full max-w-xl">
        <MenuStack items={NOT_FOUND_ITEMS} ariaLabel="Not-found actions" />
      </div>
    </main>
  )
}
