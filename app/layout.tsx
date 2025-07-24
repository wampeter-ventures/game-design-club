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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(){var reb2b=window.reb2b=window.reb2b||[];if(reb2b.invoked)return;reb2b.invoked=!0;reb2b.methods=["identify","collect"];reb2b.factory=function(method){return function(){var args=Array.prototype.slice.call(arguments);args.unshift(method);reb2b.push(args);return reb2b;}};for(var i=0;i<reb2b.methods.length;i++){var key=reb2b.methods[i];reb2b[key]=reb2b.factory(key);}reb2b.load=function(key){var script=document.createElement("script");script.type="text/javascript";script.async=!0;script.src="https://b2bjsstore.s3.us-west-2.amazonaws.com/b/"+key+"/QO92DH7955N7.js.gz";var first=document.getElementsByTagName("script")[0];first.parentNode.insertBefore(script,first);};reb2b.SNIPPET_VERSION="1.0.1";reb2b.load("QO92DH7955N7");}();`,
          }}
        />
      </head>
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
