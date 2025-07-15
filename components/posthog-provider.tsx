"use client"

import type { ReactNode } from "react"
import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { trackPageView, getPostHog } from "@/lib/posthog"

/**
 * Mount-time PostHog bootstrap + automatic page-view tracking.
 */
export function PostHogProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const search = useSearchParams()

  // Initialise PostHog once on the client
  useEffect(() => {
    getPostHog().catch(console.error)
  }, [])

  // Track page-views on route/query changes
  useEffect(() => {
    if (!pathname) return
    const url = pathname + (search.toString() ? `?${search.toString()}` : "")
    trackPageView(url).catch(console.error)
  }, [pathname, search])

  return <>{children}</>
}
