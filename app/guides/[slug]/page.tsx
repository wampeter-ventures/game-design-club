import { allGuides } from "contentlayer/generated"
import { notFound } from "next/navigation"
import GuidePageClient from "./GuidePageClient"

interface Props {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return allGuides.map((guide) => ({ slug: guide.slug }))
}

export async function generateMetadata({ params }: Props) {
  const guide = allGuides.find((guide) => guide.slug === params.slug)
  if (!guide) {
    return {}
  }

  return {
    title: guide.title,
    description: guide.description,
  }
}

export default async function GuidePage({ params }: Props) {
  const guide = allGuides.find((guide) => guide.slug === params.slug)

  if (!guide) {
    notFound()
  }

  return (
    <div className="bg-yellow-100 min-h-screen">
      <GuidePageClient guide={guide} />
    </div>
  )
}
