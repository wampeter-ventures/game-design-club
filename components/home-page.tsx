"use client"

import Image from "next/image"
import { useState } from "react"
import agreementsSticker from "@/public/agreements-sticker.png"

function HomePage() {
  const [showAgreements, setShowAgreements] = useState(false)

  return (
    <div>
      {/* AGREEMENTS STICKER */}
      <button
        onClick={() => setShowAgreements(true)}
        className="group md:fixed md:top-4 md:right-4 md:z-50 outline-none"
        aria-label="View Agreements"
      >
        <Image
          src={agreementsSticker || "/placeholder.svg"}
          alt="Game Club Agreements"
          priority
          className="w-28 md:w-24 transition-transform duration-150 ease-in-out group-hover:-rotate-3"
        />
      </button>
      {showAgreements && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4">
          <div className="relative max-w-lg w-full">
            <button
              onClick={() => setShowAgreements(false)}
              className="absolute -top-3 -right-3 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center border-2 border-black"
            >
              ×
            </button>
            <Image
              src="/agreements-real.jpeg"
              alt="Hand-written Game Club Agreements"
              width={1000}
              height={700}
              className="w-full rounded-md shadow-lg"
            />
          </div>
        </div>
      )}

      {/* Create a Game Card */}
      <section>
        <h2>Create</h2>
        <p className="text-sm">
          Work with AI to design and prototype a new game from scratch. Even if that sounds outlandish, just try… you
          might surprise yourself!
        </p>
        <a href="https://v0.dev" target="_blank" rel="noopener noreferrer" className="mt-4">
          You can do it!
        </a>
      </section>
    </div>
  )
}

export { HomePage }
export default HomePage
