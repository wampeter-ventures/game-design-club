"use client"

/**
 * Lightweight wrapper around posthog-js so we can safely
 * call trackEvent() from any client component—even before
 * PostHog has finished initialising.
 */
import posthog from "posthog-js"

/**
 * Track a PostHog event safely.
 * If PostHog isn’t ready yet, the call is ignored.
 */
export function trackEvent(eventName: string, properties: Record<string, any> = {}): void {
  try {
    // posthog.capture is defined once posthog.init() (in providers.tsx) has run.
    if (typeof posthog.capture === "function") {
      posthog.capture(eventName, properties)
    }
  } catch (err) {
    // Never let analytics break the UI
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.warn("Failed to capture PostHog event:", err)
    }
  }
}
