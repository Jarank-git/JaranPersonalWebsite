import { notFound } from 'next/navigation'
import { RoleCard } from '@/components/features/RoleCard'
import { getRole } from '@/lib/content'

export default async function ExperienceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const role = getRole(slug)
  if (!role) notFound()
  return (
    <main className="min-h-screen">
      <RoleCard role={role} />
    </main>
  )
}
