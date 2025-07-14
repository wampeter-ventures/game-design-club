"use client"

import * as Lucide from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export interface Mechanic {
  id: number
  column: string
  title: string
  subTitle: string
  icon: string
  whatItMeans: string
  strategyTip: string
  gameRule: string
}

export interface GuideData {
  gameName: string
  gameSubtitle: string
  creatorName?: string
  allMechanics: Mechanic[]
  thinkAndShare: string[]
}

const FunOMeter = () => (
  <div className="flex items-center mt-2">
    <Lucide.BarChart3 className="w-4 h-4 mr-1 text-sky-600 flex-shrink-0" />
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

function MechanicCard({ mechanic, color }: { mechanic: Mechanic; color: string }) {
  const Icon = (Lucide as any)[mechanic.icon] ?? Lucide.Dice5
  return (
    <div className="bg-slate-50 p-2 rounded-md border-2 border-black flex flex-col h-full break-inside-avoid-column">
      <div className="flex-grow">
        <h4 className="text-base font-semibold">
          <Icon className={`w-4 h-4 inline-block mr-1 ${color}`} />
          {mechanic.title}
        </h4>
        <p className="text-xs text-slate-500 mb-1">
          <Lucide.GraduationCap className="w-4 h-4 inline-block mr-1" />“{mechanic.subTitle}”
        </p>
        <div className="text-xs space-y-2">
          <p>
            <strong className="text-sky-800">What it means:</strong> {mechanic.whatItMeans}
          </p>
          <p>
            <strong className="text-sky-800">Strategy Tip:</strong> {mechanic.strategyTip}
          </p>
          <p>
            <strong className="text-sky-800">Rule:</strong> {mechanic.gameRule}
          </p>
        </div>
      </div>
      <div className="mt-auto pt-1.5">
        <FunOMeter />
      </div>
    </div>
  )
}

export default function GuidePageClient({ guideData }: { guideData: GuideData }) {
  const col1 = guideData.allMechanics.filter((m) => m.column === "biggest_ideas")
  const col2 = guideData.allMechanics.filter((m) => m.column === "more_mechanics" || m.column === "mid_sized")
  const col3 = guideData.allMechanics.filter((m) => m.column === "secret_sauce")

  return (
    <div className="min-h-screen bg-yellow-200 p-2 md:p-4 print:bg-white">
      <div className="w-full max-w-7xl mx-auto relative">
        {/* PRINT BUTTON */}
        <Button
          onClick={() => window.print()}
          className="print:hidden absolute top-2 right-2 bg-black text-white hover:bg-slate-800"
          size="sm"
        >
          <Lucide.Printer className="w-4 h-4 mr-1" /> Print
        </Button>

        {/* HOME LINK */}
        <Link
          href="/"
          className="print:hidden absolute top-2 left-2 text-xs bg-black text-white px-2 py-1 border-2 border-white"
          style={{ fontFamily: "'Press Start 2P', monospace" }}
        >
          &lt; HOME
        </Link>

        <div className="bg-white border-4 border-black p-3 md:p-5 shadow-lg mt-10">
          <header className="text-center mb-4 border-b-4 border-black pb-3">
            <h1 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: "'Press Start 2P', monospace" }}>
              {guideData.gameName}
            </h1>
            <p className="text-sm md:text-base text-gray-700" style={{ fontFamily: "'Press Start 2P', monospace" }}>
              {guideData.gameSubtitle}
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* BIGGEST IDEAS */}
            <div>
              <h2 className="flex items-center bg-orange-400 border-2 border-black text-white p-2 font-semibold text-sm md:text-base">
                <Lucide.Brain className="w-5 h-5 mr-2" /> BIGGEST IDEAS
              </h2>
              <div className="flex flex-col gap-3 mt-2">
                {col1.map((m) => (
                  <MechanicCard key={m.id} mechanic={m} color="text-orange-600" />
                ))}
              </div>
            </div>

            {/* MORE MECHANICS */}
            <div>
              <h2 className="flex items-center bg-blue-400 border-2 border-black text-white p-2 font-semibold text-sm md:text-base">
                <Lucide.ListChecks className="w-5 h-5 mr-2" /> MORE MECHANICS
              </h2>
              <div className="flex flex-col gap-3 mt-2">
                {col2.map((m) => (
                  <MechanicCard key={m.id} mechanic={m} color="text-blue-600" />
                ))}
              </div>
            </div>

            {/* SECRET SAUCE */}
            <div>
              <h2 className="flex items-center bg-purple-400 border-2 border-black text-white p-2 font-semibold text-sm md:text-base">
                <Lucide.Search className="w-5 h-5 mr-2" /> SECRET SAUCE
              </h2>
              <div className="flex flex-col gap-3 mt-2">
                {col3.map((m) => (
                  <MechanicCard key={m.id} mechanic={m} color="text-purple-600" />
                ))}
              </div>
            </div>

            {/* THINK & SHARE */}
            <div className="md:col-span-3 mt-4 bg-pink-200 border-2 border-black p-3 rounded-md">
              <h3 className="flex items-center font-semibold text-sm md:text-base mb-2">
                <Lucide.Sparkles className="w-4 h-4 mr-1" /> THINK & SHARE!
              </h3>
              {guideData.thinkAndShare.map((q, i) => (
                <div key={i} className="mb-2">
                  <p className="text-xs md:text-sm">🔹 {q}</p>
                  <div className="h-8 border-b border-slate-400 mt-1" />
                </div>
              ))}
            </div>
          </div>

          <footer
            className="text-center mt-6 pt-4 border-t-4 border-black text-xs md:text-sm"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            RDS Game Design Club • 2025
            {guideData.creatorName && ` • Created by ${guideData.creatorName}`}
          </footer>
        </div>
      </div>
    </div>
  )
}
