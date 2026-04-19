import { notFound } from 'next/navigation'
import { AboutSection } from '@/components/features/AboutSection'
import { getAboutSlab } from '@/lib/content'

export default async function AboutSlabPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const data = getAboutSlab(slug)
  if (!data) notFound()
  return (
    <main className="min-h-screen">
      <AboutSection data={data} />
    </main>
  )
}
