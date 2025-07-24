import type { ReactNode } from "react"
import type { Metadata } from "next"
import { Suspense } from "react"

import { Press_Start_2P } from "next/font/google"
import "./globals.css"

import { ThemeProvider } from "@/components/theme-provider"
import { PostHogProvider } from "./providers"

/* --- Retro arcade font --- */
const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start-2p",
})

export const metadata: Metadata = {
  title: "Game Design Club",
  description: "Play more games • Make more games",
  generator: "v0.dev",
  openGraph: {
    images: "/IMG_6499.png",
    title: "Game Design Club",
    description: "Play more games • Make more games",
  },
  twitter: {
    card: "summary_large_image",
    images: "/IMG_6499.png",
    title: "Game Design Club",
    description: "Play more games • Make more games",
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={pressStart2P.variable}>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {/* PostHogProvider (client) uses useSearchParams – keep inside Suspense */}
          <Suspense fallback={null}>
            <PostHogProvider>{children}</PostHogProvider>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
