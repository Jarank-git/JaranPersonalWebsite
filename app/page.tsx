import { MenuStack } from '@/components/menu/MenuStack'
import { MAIN_ITEMS } from '@/lib/content'

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-xl">
        <MenuStack items={MAIN_ITEMS} ariaLabel="Main menu" />
      </div>
    </main>
  )
}
