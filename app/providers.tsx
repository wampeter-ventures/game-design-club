"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import posthog from "posthog-js"
import { PostHogProvider as PHProvider } from "posthog-js/react"

type Config = { key: string; host: string }

async function fetchConfig(): Promise<Config> {
  const res = await fetch("/api/posthog-config")
  if (!res.ok) throw new Error("Failed to fetch PostHog config")
  return res.json()
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)
  const pathname = usePathname()
  const search = useSearchParams()

  /* Initialise once */
  useEffect(() => {
    fetchConfig()
      .then(({ key, host }) => {
        posthog.init(key, {
          api_host: host,
          loaded: (ph) => {
            if (process.env.NODE_ENV === "development") ph.debug()
          },
        })
        setReady(true)
      })
      .catch((err) => {
        console.error("PostHog init failed", err)
      })
  }, [])

  /* Track page views whenever the route or query string changes */
  useEffect(() => {
    if (ready) posthog.capture("$pageview")
  }, [ready, pathname, search?.toString()])

  /* Render children immediately; wrap with PHProvider only once ready */
  return ready ? <PHProvider client={posthog}>{children}</PHProvider> : <>{children}</>
}
