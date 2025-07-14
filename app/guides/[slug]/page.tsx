"use client"

import { createSupabaseServerClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import Link from "next/link"
import * as LucideIcons from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface Mechanic {
  id: number
  column: string
  title: string
  subTitle: string
  icon: string
  whatItMeans: string
  strategyTip: string
  gameRule: string
}

interface GuideData {
  gameName: string
  gameSubtitle: string
  creatorName?: string
  allMechanics: Mechanic[]
  thinkAndShare: string[]
}

const FunOMeter = () => (
  <div className="flex items-center mt-2">
    <LucideIcons.BarChart3 className="w-4 h-4 mr-1 text-sky-600 flex-shrink-0" />
    <span className="text-xs font-medium mr-2 whitespace-nowrap">Fun-o-Meter:</span>
    <div className="flex-grow flex w-full">
      {Array(10)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="flex-auto h-3 border border-slate-500 mr-px bg-white" />
        ))}
    </div>
  </div>
)

const MechanicCard = ({ mechanic, color }: { mechanic: Mechanic; color: string }) => {
  const IconComponent = (LucideIcons as any)[mechanic.icon] as LucideIcon | undefined

  return (
    <div className="bg-slate-50 p-2 md:p-2.5 rounded-md border-2 border-black print:p-1.5 break-inside-avoid-column relative flex flex-col h-full">
      <div className="flex-grow">
        <h4 className="text-base font-semibold text-slate-800 leading-tight">
          {IconComponent && <IconComponent className={`w-4 h-4 inline-block mr-1 ${color}`} />}
          {mechanic.title}
        </h4>
        <p className="text-xs text-slate-500 flex items-center leading-tight mb-1">
          <LucideIcons.GraduationCap className="w-4 h-4 inline-block mr-1" />"{mechanic.subTitle}"
        </p>
        <div className="text-xs text-slate-700 space-y-2 print:space-y-1 mt-1">
          <p>
            <strong className="font-medium text-sky-800">What it means:</strong> {mechanic.whatItMeans}
          </p>
          <p>
            <strong className="font-medium text-sky-800">Strategy Tip:</strong> {mechanic.strategyTip}
          </p>
          <p>
            <strong className="font-medium text-sky-800">Rule:</strong> {mechanic.gameRule}
          </p>
        </div>
      </div>
      <div className="mt-auto pt-1.5">
        <FunOMeter />
      </div>
    </div>
  )
}

export default async function GuidePage({ params }: { params: { slug: string } }) {
  const supabase = createSupabaseServerClient()
  const { data, error } = await supabase.from("guides").select("guide_data").eq("slug", params.slug).single()

  if (error || !data) {
    console.error("Error fetching guide:", error)
    notFound()
  }

  const guideData = data.guide_data as GuideData

  const col1Mechanics = guideData.allMechanics.filter((m) => m.column === "biggest_ideas")
  const col2Mechanics = guideData.allMechanics.filter((m) => m.column === "more_mechanics" || m.column === "mid_sized")
  const col3Mechanics = guideData.allMechanics.filter((m) => m.column === "secret_sauce")
  const HeaderIcon = (LucideIcons as any)[col1Mechanics[0]?.icon || "Dice5"] as LucideIcon

  return (
    <>
      <div className="min-h-screen bg-yellow-200 p-2 md:p-4 print:bg-white print:p-1 relative">
        <div className="w-full max-w-7xl mx-auto bg-white shadow-lg print:shadow-none p-3 md:p-5 aspect-[297/210] print:aspect-auto print:w-full print:h-full flex flex-col border-4 border-black relative">
          <div className="absolute top-2 left-2 w-4 h-4 bg-black"></div>
          <div className="absolute top-2 right-2 w-4 h-4 bg-black"></div>
          <div className="absolute bottom-2 left-2 w-4 h-4 bg-black"></div>
          <div className="absolute bottom-2 right-2 w-4 h-4 bg-black"></div>

          <header className="text-center mb-3 md:mb-4 border-b-4 border-black pb-2 md:pb-3">
            <h1
              className="text-xl md:text-3xl font-bold text-black"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              <HeaderIcon className="inline-block w-6 h-6 md:w-8 md:h-8 mr-2 mb-1" />
              {guideData.gameName}
            </h1>
            <p
              className="text-sm md:text-base text-gray-700 mt-1"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              Why This Game Is So Awesome
            </p>
          </header>

          <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5 print:grid-cols-3 print:gap-3">
            {/* Column 1 */}
            <div className="flex flex-col gap-3 md:gap-5">
              <h2
                className="text-lg font-semibold text-white flex items-center p-2 bg-orange-400 border-2 border-black"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                <LucideIcons.Brain className="w-5 h-5 mr-2" /> BIGGEST IDEAS
              </h2>
              {col1Mechanics.map((m) => (
                <MechanicCard key={m.id} mechanic={m} color="text-orange-600" />
              ))}
            </div>
            {/* Column 2 */}
            <div className="flex flex-col gap-3 md:gap-5">
              <h2
                className="text-lg font-semibold text-white flex items-center p-2 bg-blue-400 border-2 border-black"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                <LucideIcons.ListChecks className="w-5 h-5 mr-2" /> MORE MECHANICS
              </h2>
              {col2Mechanics.map((m) => (
                <MechanicCard key={m.id} mechanic={m} color="text-blue-600" />
              ))}
            </div>
            {/* Column 3 */}
            <div className="flex flex-col gap-3 md:gap-5">
              <h2
                className="text-lg font-semibold text-white flex items-center p-2 bg-purple-400 border-2 border-black"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                <LucideIcons.Search className="w-5 h-5 mr-2" /> SECRET SAUCE
              </h2>
              {col3Mechanics.map((m) => (
                <MechanicCard key={m.id} mechanic={m} color="text-purple-600" />
              ))}
            </div>
            {/* THINK & SHARE Section */}
            <div className="md:col-span-3 bg-pink-200 p-2.5 rounded-md border-2 border-black print:p-1.5 mt-0 self-start">
              <h3
                className="text-md font-semibold text-black flex items-center mb-2"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                <LucideIcons.Sparkles className="w-4 h-4 mr-1.5" /> THINK & SHARE!
              </h3>
              {guideData.thinkAndShare.map((q, i) => (
                <div key={i} className="mb-2.5 print:mb-1.5">
                  <p className="text-xs text-slate-800 leading-tight">🔹 {q}</p>
                  <div className="h-8 md:h-10 border-b border-slate-400 mt-1 print:h-6"></div>
                </div>
              ))}
            </div>
          </div>

          <footer
            className="text-center mt-auto pt-4 border-t-4 border-black text-xs"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            RDS Game Design Club • 2025
            {guideData.creatorName && ` • Created by ${guideData.creatorName}`}
          </footer>
        </div>
        <Link
          href="/"
          className="absolute top-4 left-4 bg-black text-white p-2 border-2 border-white print:hidden"
          style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "10px" }}
        >
          &lt; HOME
        </Link>
        <button
          onClick={() => window.print()}
          className="absolute top-4 right-4 bg-black text-white p-2 border-2 border-white print:hidden"
          style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "10px" }}
        >
          PRINT
        </button>
      </div>
    </>
  )
}
