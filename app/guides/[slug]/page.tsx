import { createSupabaseServerClient } from "@/lib/supabase/server"
import GuidePageClient, { type GuideData } from "./guide-page-client"
import { notFound } from "next/navigation"

export const revalidate = 0

export default async function GuidePage({ params }: { params: { slug: string } }) {
  const supabase = createSupabaseServerClient()

  const { data: guide, error } = await supabase.from("guides").select("guide_data").eq("slug", params.slug).single()

  if (error || !guide) {
    console.error("Error fetching guide:", error)
    notFound()
  }

  const guideData = guide.guide_data as GuideData

  if (!guideData) {
    console.error("Guide data is null for slug:", params.slug)
    notFound()
  }

  return <GuidePageClient guideData={guideData} />
}
