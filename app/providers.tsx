"use client"

import { type ReactNode, useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import posthog from "posthog-js"
import { PostHogProvider as PHProvider } from "posthog-js/react"

// A client-side component to track page views
function PostHogPageview(): null {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname) {
      let url = window.origin + pathname
      if (searchParams && searchParams.toString()) {
        url = url + `?${searchParams.toString()}`
      }
      posthog.capture("$pageview", {
        $current_url: url,
      })
    }
  }, [pathname, searchParams])

  return null
}

export function PostHogProvider({ children }: { children: ReactNode }) {
  // We fetch the config and init PostHog on the client.
  // This is to avoid exposing the key on the server, which Vercel blocks.
  useEffect(() => {
    const initPostHog = async () => {
      try {
        const res = await fetch("/api/posthog-config")
        if (!res.ok) {
          console.error("Failed to fetch PostHog config")
          return
        }
        const config = await res.json()
        if (config.key && config.host) {
          posthog.init(config.key, {
            api_host: config.host,
            person_profiles: "identified_only",
          })
        }
      } catch (error) {
        console.error("Error initializing PostHog:", error)
      }
    }
    initPostHog()
  }, [])

  return (
    <PHProvider client={posthog}>
      <PostHogPageview />
      {children}
    </PHProvider>
  )
}
