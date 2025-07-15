"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import posthog from "posthog-js"
import { PostHogProvider as PHProvider } from "posthog-js/react"

/**
 * Fetch key/host from a server-only route to avoid hard-coding env vars
 * into the client bundle (keeps Vercel happy).
 */
async function fetchConfig() {
  const res = await fetch("/api/posthog-config")
  if (!res.ok) throw new Error("Failed to load PostHog config")
  return (await res.json()) as { key: string; host: string }
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Initialise PostHog once
  useEffect(() => {
    if (ready) return
    fetchConfig()
      .then(({ key, host }) => {
        posthog.init(key, {
          api_host: host || "https://us.i.posthog.com",
          capture_pageview: false, // we’ll send it ourselves
          loaded: (ph) => {
            if (process.env.NODE_ENV === "development") ph.debug()
            ph.capture("$pageview")
            setReady(true)
          },
        })
      })
      .catch((err) => {
        console.error("PostHog init failed", err)
      })
  }, [ready])

  // Track client-side navigations (after PostHog is ready)
  useEffect(() => {
    if (!ready) return
    posthog.capture("$pageview", { pathname, search: searchParams.toString() })
  }, [pathname, searchParams, ready])

  return <PHProvider client={posthog}>{children}</PHProvider>
}
