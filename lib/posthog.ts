"use client"

import posthog from "posthog-js"

export function getPostHog() {
  return posthog
}

export function trackEvent(event: string, props?: Record<string, unknown>) {
  if (typeof window !== "undefined") {
    posthog.capture(event, props)
  }
}

export function trackPageView(props?: Record<string, unknown>) {
  trackEvent("$pageview", props)
}
