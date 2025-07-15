"use client"

import type { PostHog } from "posthog-js"

/**
 * Singleton PostHog instance – created lazily in the browser.
 */
let posthogInstance: PostHog | null = null

/**
 * Fetches the public PostHog config from our server route.
 * The values are *not* in the client bundle, so this is safe.
 */
async function fetchConfig() {
  try {
    const res = await fetch("/api/posthog-config")
    if (!res.ok) return null
    const json = (await res.json()) as { key?: string; host?: string }
    if (!json.key || !json.host) return null
    return json
  } catch {
    return null
  }
}

/**
 * Loads & initialises PostHog exactly once on the client.
 */
export async function getPostHog(): Promise<PostHog | null> {
  if (typeof window === "undefined") return null
  if (posthogInstance) return posthogInstance

  const cfg = await fetchConfig()
  if (!cfg) return null

  const { default: posthog } = await import("posthog-js")

  posthog.init(cfg.key, {
    api_host: cfg.host,
    capture_pageview: false, // handled manually
    person_profiles: "identified_only",
  })

  posthogInstance = posthog
  return posthog
}

export async function trackEvent(name: string, properties?: Record<string, unknown>) {
  const ph = await getPostHog()
  ph?.capture(name, properties)
}

export async function trackPageView(url?: string) {
  const ph = await getPostHog()
  ph?.capture("$pageview", {
    $current_url: url ?? window.location.href,
  })
}
