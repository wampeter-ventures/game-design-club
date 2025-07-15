import { NextResponse, type NextRequest } from "next/server"

/**
 * Server-only route that exposes the PostHog public key & host
 * to the browser.  Values are read from env vars on the server
 * so they never appear in the client bundle.
 */
export async function GET(_req: NextRequest) {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY ?? ""
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? ""

  // We only send the bare minimum public values
  return NextResponse.json({ key, host }, { status: 200 })
}
