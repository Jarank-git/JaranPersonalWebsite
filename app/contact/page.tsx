import { MenuStack } from '@/components/menu/MenuStack'
import { contactLinks, toContactMenuItem } from '@/lib/content'

export default function ContactPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-xl">
        <MenuStack items={contactLinks.map(toContactMenuItem)} ariaLabel="Contact" />
      </div>
    </main>
  )
}
