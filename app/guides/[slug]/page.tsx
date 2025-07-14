import { notFound } from "next/navigation"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import GuidePageClient, { type GuideData } from "./guide-page-client"

/**
 * Server component — runs only on the server, so it can safely read
 * SUPABASE_SERVICE_ROLE_KEY & SUPABASE_URL.  No client-side code here!
 */
export const revalidate = 0

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
