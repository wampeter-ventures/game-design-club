"use client"

/**
 * Tiny helper around window.posthog so components can import
 *   import { getPostHog, trackEvent, trackPageView } from '@/lib/posthog'
 * without bundling the full SDK twice.
 */

type PostHogClient = {
  capture: (event: string, properties?: Record<string, unknown>) => void
}

/** Safely grab the global PostHog instance (or undefined in SSR / if not loaded). */
export function getPostHog(): PostHogClient | undefined {
  if (typeof window === "undefined") return undefined
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return (window as any).posthog as PostHogClient | undefined
}

/** Fire a custom event – fails silently if PostHog isn’t ready. */
export function trackEvent(event: string, properties: Record<string, unknown> = {}) {
  getPostHog()?.capture(event, properties)
}

/** Convenience wrapper for a page-view event. */
export function trackPageView() {
  getPostHog()?.capture("$pageview")
}
