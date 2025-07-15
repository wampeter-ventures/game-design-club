"use client"

import posthog from "posthog-js"

/**
 * Return the global PostHog instance if it exists on the client.
 * If you need to ensure PostHog is initialised, do that in
 * `app/providers.tsx` (see PostHog’s official Next.js guide).
 */
export function getPostHog() {
  if (typeof window === "undefined") return null
  return posthog
}

/**
 * Capture a single event if PostHog is ready.
 * Analytics errors must never break the UI.
 */
export function trackEvent(eventName: string, properties: Record<string, any> = {}): void {
  try {
    if (typeof posthog.capture === "function") {
      posthog.capture(eventName, properties)
    }
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.warn("[PostHog] trackEvent failed", err)
    }
  }
}

/**
 * Convenience helper for page-view tracking.
 * Call this from a client component after route changes
 * (or rely on PostHog’s automatic capture).
 */
export function trackPageView(url = window.location.href): void {
  trackEvent("$pageview", { $current_url: url })
}
