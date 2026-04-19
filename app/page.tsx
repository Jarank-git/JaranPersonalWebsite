import { MenuStack } from '@/components/menu/MenuStack'
import { Ornament } from '@/components/layout/Ornament'
import { MAIN_ITEMS } from '@/lib/content'

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6">
      <Ornament variant="corner-tl" className="fixed left-6 top-6 !h-20 !w-20 opacity-70" />
      <Ornament variant="corner-tr" className="fixed right-6 top-6 !h-20 !w-20 opacity-70" />
      <Ornament variant="corner-bl" className="fixed bottom-6 left-6 !h-20 !w-20 opacity-70" />
      <Ornament variant="corner-br" className="fixed right-6 bottom-6 !h-20 !w-20 opacity-70" />

      <div className="mb-12 text-center">
        <h1 className="menu-label gold-text text-5xl md:text-7xl tracking-[0.25em] leading-tight">
          Jaran Khalid
        </h1>
        <div className="mx-auto mt-4 max-w-xs">
          <Ornament variant="flourish" className="mx-auto" />
        </div>
        <p className="mt-3 font-body text-sm tracking-[0.3em] text-[var(--color-cream-faint)] uppercase">
          Electrical Engineering &middot; University of Waterloo
        </p>
      </div>

      <div className="w-full max-w-xl">
        <MenuStack items={MAIN_ITEMS} ariaLabel="Main menu" />
      </div>
    </main>
  )
}
