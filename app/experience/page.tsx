import { MenuStack } from '@/components/menu/MenuStack'
import { experience, toRoleMenuItem } from '@/lib/content'

export default function ExperiencePage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-xl">
        <MenuStack items={experience.map(toRoleMenuItem)} ariaLabel="Experience" />
      </div>
    </main>
  )
}
