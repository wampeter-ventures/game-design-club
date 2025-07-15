import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    key: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
  })
}
