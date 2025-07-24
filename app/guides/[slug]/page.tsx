import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import GuidePageClient, { type GuideData } from "./guide-page-client"

/**
 * Server component — runs only on the server, so it can safely read
 * SUPABASE_SERVICE_ROLE_KEY & SUPABASE_URL.  No client-side code here!
 */
export const revalidate = 0

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const supabase = createSupabaseServerClient()
  const { data } = await supabase
    .from("guides")
    .select("guide_data")
    .eq("slug", params.slug)
    .single()

  if (!data) {
    return {}
  }

  const guideData = data.guide_data as GuideData

  const title = `${guideData.gameName} | Game Design Club`
  const description = guideData.gameSubtitle

  return {
    title,
    description,
    openGraph: { images: "/IMG_6499.png", title, description },
    twitter: {
      card: "summary_large_image",
      images: "/IMG_6499.png",
      title,
      description,
    },
  }
}

export default async function GuidePage({
  params,
}: {
  params: { slug: string }
}) {
  const supabase = createSupabaseServerClient()

  const { data, error } = await supabase.from("guides").select("guide_data").eq("slug", params.slug).single()

  if (error || !data) {
    console.error("Error fetching guide:", error)
    notFound()
  }

  const guideData = data.guide_data as GuideData
  return <GuidePageClient guideData={guideData} />
}
