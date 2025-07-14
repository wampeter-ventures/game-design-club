"use client"
import type React from "react"
import { useEffect, useState, useRef, useTransition } from "react"
import Image from "next/image"
import {
  Dice5,
  Mountain,
  Building2,
  LayoutGrid,
  Rocket,
  BookOpen,
  Play,
  Wand2,
  FileText,
  Gamepad2,
  Loader2,
  Pin,
  PinOff,
  Trash2,
  ShieldCheck,
  X,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { CreateGuideModal } from "@/components/create-guide-modal"
import {
  getPinnedGuidesAction,
  getFeedGuidesAction,
  togglePinAction,
  deleteGuideAction,
} from "@/app/actions/guide-actions"

const gamesWeveMade = [
  {
    slug: "liftoff",
    game_name: "Liftoff",
    is_pinned: false,
    guide_data: {
      gameSubtitle: "The more Honor Dice we earn, the farther we can go...",
      creatorName: "Dan",
    },
    external: true,
    href: "https://playliftoff.com",
  },
]

// Game-themed falling objects
const fallingObjects = [
  {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: "bg-yellow-500",
    type: "tetris",
  },
  { shape: [[1, 1, 1, 1]], color: "bg-cyan-500", type: "tetris" },
  {
    shape: [
      [1, 1, 1],
      [0, 1, 0],
    ],
    color: "bg-purple-500",
    type: "tetris",
  },
  {
    shape: [
      [1, 1, 1],
      [1, 0, 0],
    ],
    color: "bg-orange-500",
    type: "tetris",
  },
  { shape: [[1]], emoji: "🏠", type: "catan" },
  { shape: [[1]], emoji: "🐺", type: "andor" },
  { shape: [[1]], emoji: "🏢", type: "machi" },
  { shape: [[1]], emoji: "🔷", type: "azul" },
  { shape: [[1]], emoji: "🚀", type: "rocket" },
  { shape: [[1]], emoji: "💥", type: "rocket" },
]

interface FallingBlock {
  id: number
  x: number
  y: number
  shape: number[][]
  color?: string
  rotation: number
  speed: number
  emoji?: string
  type: string
}

interface Guide {
  slug: string
  game_name: string
  guide_data: any
  is_pinned: boolean
  external?: boolean
  href?: string
}

interface TetorisGameCardProps {
  game: Guide
  actionText: string
  actionIcon: React.ReactNode
  buttonColor: string
  isAdmin: boolean
  onPinToggle: (slug: string, newStatus: boolean) => void
  onDelete: (slug: string) => void
}

function TetorisGameCard({
  game,
  actionText,
  actionIcon,
  buttonColor,
  isAdmin,
  onPinToggle,
  onDelete,
}: TetorisGameCardProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const guideData = game.guide_data || {}
  const description = guideData.gameSubtitle || `An AI-generated guide for ${game.game_name}.`
  const creatorName = guideData.creatorName

  const handleNavigation = (e: React.MouseEvent) => {
    e.preventDefault()
    if (game.external && game.href) {
      window.open(game.href, "_blank", "noopener,noreferrer")
    } else {
      router.push(`/guides/${game.slug}`)
    }
  }

  const handlePinToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    startTransition(() => onPinToggle(game.slug, !game.is_pinned))
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (window.confirm(`Are you sure you want to delete the guide for "${game.game_name}"?`)) {
      startTransition(() => onDelete(game.slug))
    }
  }

  const iconMap: { [key: string]: React.ReactNode } = {
    "settlers-of-catan": <Dice5 className="w-8 h-8 text-orange-600" />,
    "legends-of-andor": <Mountain className="w-8 h-8 text-emerald-600" />,
    "machi-koro": <Building2 className="w-8 h-8 text-blue-600" />,
    azul: <LayoutGrid className="w-8 h-8 text-cyan-700" />,
    liftoff: <Rocket className="w-8 h-8 text-red-500" />,
  }

  const icon = iconMap[game.slug] || <Wand2 className="w-8 h-8 text-purple-600" />

  return (
    <div className="bg-white border-4 border-black p-4 group hover:bg-yellow-50 transition-colors duration-200 relative flex flex-col">
      {isAdmin && !game.external && (
        <div className="absolute top-2 right-2 z-10 flex gap-2">
          <button onClick={handlePinToggle} className="p-1 bg-white border-2 border-black hover:bg-gray-200">
            {game.is_pinned ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
          </button>
          <button onClick={handleDelete} className="p-1 bg-red-500 border-2 border-black hover:bg-red-600">
            <Trash2 className="w-4 h-4 text-white" />
          </button>
        </div>
      )}
      {isPending && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      )}

      <div className="absolute top-0 left-0 w-2 h-2 bg-black"></div>
      <div className="absolute top-0 right-0 w-2 h-2 bg-black"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 bg-black"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 bg-black"></div>

      <div className="flex-grow">
        <div className="flex items-center gap-4 mb-2">
          <div className="p-2 bg-gray-200 border-2 border-black">{icon}</div>
          <div>
            <h3
              className="font-bold text-black text-sm tracking-wide"
              style={{ fontFamily: "var(--font-press-start-2p)" }}
            >
              {game.game_name.toUpperCase()}
            </h3>
            {creatorName && <p className="text-gray-600 text-xs tracking-wide">Created by {creatorName}</p>}
          </div>
        </div>
        <p className="text-gray-800 text-xs leading-relaxed mb-4">{description}</p>
      </div>

      <div className="relative group/btn mt-auto">
        <div className={`absolute inset-0 translate-y-2 bg-gray-700 border-4 border-black`}></div>
        <button
          onClick={handleNavigation}
          className={`relative w-full ${buttonColor} border-4 border-black p-4 font-bold text-white transition-transform duration-100 group-hover/btn:translate-y-1 group-active/btn:translate-y-2 cursor-pointer`}
          style={{ fontFamily: "var(--font-press-start-2p)" }}
        >
          <div className="absolute top-0 left-0 w-2 h-2 bg-black"></div>
          <div className="absolute top-0 right-0 w-2 h-2 bg-black"></div>
          <div className="absolute bottom-0 left-0 w-2 h-2 bg-black"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-black"></div>
          <span className="flex items-center justify-center text-sm">
            {actionText}
            {actionIcon}
          </span>
        </button>
      </div>
    </div>
  )
}

const AgreementsSticker = ({ onClick }: { onClick: () => void }) => (
  <button onClick={onClick} className="w-40 h-40 group" aria-label="View Game Club Agreements">
    <img
      src="/agreements-sticker.png"
      alt="A sticky note that says Agreements, taped to the screen."
      className="w-full h-full object-contain transition-transform duration-150 ease-in-out group-hover:rotate-[-2deg] group-hover:scale-105"
    />
  </button>
)

const AgreementsModal = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose}>
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <Image
        src="/agreements-real.jpeg"
        alt="The real photo of the game club agreements on butcher paper"
        width={1200}
        height={900}
        className="object-contain rounded-lg shadow-2xl max-w-[90vw] max-h-[90vh]"
      />
      <button
        onClick={onClose}
        className="absolute -top-4 -right-4 bg-white text-black rounded-full p-2 shadow-lg hover:bg-gray-200"
        aria-label="Close agreements view"
      >
        <X className="w-6 h-6" />
      </button>
    </div>
  </div>
)

export function HomePage() {
  const [blocks, setBlocks] = useState<FallingBlock[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAgreementsModalOpen, setIsAgreementsModalOpen] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [pinnedGuides, setPinnedGuides] = useState<Guide[]>([])
  const [feedGuides, setFeedGuides] = useState<Guide[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()

  const fetchGuides = async () => {
    setLoading(true)
    const [pinnedResult, feedResult] = await Promise.all([getPinnedGuidesAction(), getFeedGuidesAction()])
    if (pinnedResult.success) setPinnedGuides(pinnedResult.guides as Guide[])
    if (feedResult.success) setFeedGuides(feedResult.guides as Guide[])
    setLoading(false)
  }

  useEffect(() => {
    fetchGuides()
  }, [])

  const handleGenerationComplete = (result: { slug: string; data: any }) => {
    setIsModalOpen(false)
    fetchGuides() // Refetch guides to show the new one
    router.push(`/guides/${result.slug}`)
  }

  const handlePinToggle = async (slug: string, newStatus: boolean) => {
    await togglePinAction(slug, newStatus)
    fetchGuides()
  }

  const handleDelete = async (slug: string) => {
    await deleteGuideAction(slug)
    fetchGuides()
  }

  const handleAdminToggle = () => {
    if (isAdmin) {
      setIsAdmin(false)
    } else {
      const password = window.prompt("Enter admin password:")
      if (password === "RDS") {
        setIsAdmin(true)
      } else if (password !== null) {
        // User entered something but it was wrong
        alert("Incorrect password.")
      }
    }
  }

  useEffect(() => {
    // Animation effect
    let lastTime = 0
    const frameInterval = 1000 / 60
    const createBlock = (): FallingBlock => {
      const objectType = fallingObjects[Math.floor(Math.random() * fallingObjects.length)]
      const containerWidth = containerRef.current?.clientWidth || window.innerWidth
      return {
        id: Date.now() + Math.random(),
        x: Math.random() * (containerWidth - 100),
        y: -150,
        shape: objectType.shape,
        color: objectType.color,
        rotation: Math.random() * 360,
        speed: 1 + Math.random() * 2,
        emoji: objectType.emoji,
        type: objectType.type,
      }
    }
    const animate = (currentTime: number) => {
      if (currentTime - lastTime >= frameInterval) {
        setBlocks((prevBlocks) => {
          const containerHeight = containerRef.current?.clientHeight || window.innerHeight
          const newBlocks = Math.random() < 0.04 ? [...prevBlocks, createBlock()] : [...prevBlocks]
          return newBlocks
            .map((block) => ({
              ...block,
              y: block.y + block.speed,
              rotation: block.rotation + (block.type === "tetris" ? 1 : 0.5),
            }))
            .filter((block) => block.y < containerHeight + 300)
            .slice(-50)
        })
        lastTime = currentTime
      }
      animationRef.current = requestAnimationFrame(animate)
    }
    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <>
      <div ref={containerRef} className="min-h-screen relative overflow-hidden bg-yellow-300">
        {isAgreementsModalOpen && <AgreementsModal onClose={() => setIsAgreementsModalOpen(false)} />}

        <div className="fixed inset-0 pointer-events-none z-10 opacity-80">
          {blocks.map((block) => (
            <div
              key={block.id}
              className="absolute"
              style={{
                left: `${block.x}px`,
                top: `${block.y}px`,
                transform: `rotate(${block.rotation}deg)`,
                willChange: "transform",
              }}
            >
              {block.emoji ? (
                <div className="text-2xl select-none">{block.emoji}</div>
              ) : (
                <div className="grid gap-px">
                  {block.shape.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex gap-px">
                      {row.map((cell, cellIndex) => (
                        <div
                          key={cellIndex}
                          className={`w-4 h-4 border border-black ${cell ? block.color : "transparent"}`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="absolute top-0 left-0 w-8 h-8 bg-black z-30"></div>
        <div className="absolute top-0 right-0 w-8 h-8 bg-black z-30"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 bg-black z-30"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 bg-black z-30"></div>

        <div className="relative z-20 flex flex-col items-center p-8 min-h-screen">
          <header className="text-center mb-8">
            <h1
              className="text-2xl md:text-4xl font-bold text-black mb-4 tracking-wider"
              style={{ fontFamily: "var(--font-press-start-2p)" }}
            >
              RDS GAME DESIGN CLUB
            </h1>
            <p className="text-lg text-gray-800 tracking-wide" style={{ fontFamily: "var(--font-press-start-2p)" }}>
              SUMMER 2025
            </p>
          </header>

          <main className="w-full max-w-6xl">
            <div className="flex justify-center mb-8">
              <AgreementsSticker onClick={() => setIsAgreementsModalOpen(true)} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
              {/* Games We've Played Column */}
              <div className="space-y-6">
                <div className="text-center">
                  <h2
                    className="text-2xl font-bold text-black mb-4 flex items-center justify-center gap-3 tracking-wide"
                    style={{ fontFamily: "var(--font-press-start-2p)" }}
                  >
                    <BookOpen className="w-6 h-6 text-black" />
                    GAMES WE'VE PLAYED
                  </h2>
                </div>
                <div className="bg-black border-4 border-black p-1">
                  <div className="bg-yellow-200 p-6">
                    {loading ? (
                      <div className="flex justify-center items-center h-24">
                        <Loader2 className="w-8 h-8 animate-spin text-yellow-700" />
                      </div>
                    ) : (
                      <div className="grid gap-6">
                        {pinnedGuides.map((game) => (
                          <TetorisGameCard
                            key={game.slug}
                            game={game}
                            actionText="LEARN"
                            actionIcon={<BookOpen className="ml-2 w-4 h-4" />}
                            buttonColor="bg-blue-500"
                            isAdmin={isAdmin}
                            onPinToggle={handlePinToggle}
                            onDelete={handleDelete}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Games We've Made Column */}
              <div className="space-y-6">
                <div className="text-center">
                  <h2
                    className="text-2xl font-bold text-black mb-4 flex items-center justify-center gap-3 tracking-wide"
                    style={{ fontFamily: "var(--font-press-start-2p)" }}
                  >
                    <Rocket className="w-6 h-6 text-black" />
                    GAMES WE'VE MADE
                  </h2>
                </div>
                <div className="bg-black border-4 border-black p-1">
                  <div className="bg-pink-200 p-6">
                    <div className="grid gap-6">
                      {gamesWeveMade.map((game) => (
                        <TetorisGameCard
                          key={game.slug}
                          game={game}
                          actionText="PLAY"
                          actionIcon={<Play className="ml-2 w-4 h-4" />}
                          buttonColor="bg-pink-500"
                          isAdmin={isAdmin}
                          onPinToggle={handlePinToggle}
                          onDelete={handleDelete}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <h2
                className="text-2xl font-bold text-black mb-4 flex items-center justify-center gap-3 tracking-wide"
                style={{ fontFamily: "var(--font-press-start-2p)" }}
              >
                <Wand2 className="w-6 h-6 text-black" />
                CREATE
              </h2>
            </div>
            <div className="bg-black border-4 border-black p-1 mb-12">
              <div className="bg-green-200 p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div
                    className="bg-white border-4 border-black p-4 relative group hover:bg-green-100 transition-colors duration-200 cursor-pointer flex flex-col"
                    onClick={() => !isGenerating && setIsModalOpen(true)}
                  >
                    <div className="absolute top-0 left-0 w-2 h-2 bg-black"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 bg-black"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 bg-black"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 bg-black"></div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-2 bg-gray-200 border-2 border-black">
                          <FileText className="w-8 h-8 text-green-700" />
                        </div>
                        <h3
                          className="font-bold text-black text-sm tracking-wide"
                          style={{ fontFamily: "var(--font-press-start-2p)" }}
                        >
                          CREATE A GUIDE
                        </h3>
                      </div>
                      <p className="text-gray-800 text-xs leading-relaxed mb-4">
                        Use our AI-powered worksheet generator to create a new game guide. Just provide the game name
                        and some notes.
                      </p>
                    </div>
                    <div className="relative group/btn mt-auto">
                      <div className="absolute inset-0 translate-y-2 bg-gray-700 border-4 border-black"></div>
                      <div
                        className="relative w-full bg-green-500 border-4 border-black p-4 font-bold text-white transition-transform duration-100 group-hover:translate-y-1"
                        style={{ fontFamily: "var(--font-press-start-2p)" }}
                      >
                        <div className="absolute top-0 left-0 w-2 h-2 bg-black"></div>
                        <div className="absolute top-0 right-0 w-2 h-2 bg-black"></div>
                        <div className="absolute bottom-0 left-0 w-2 h-2 bg-black"></div>
                        <div className="absolute bottom-0 right-0 w-2 h-2 bg-black"></div>
                        <span className="flex items-center justify-center text-sm">
                          What Game?
                          <Wand2 className="ml-2 w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white border-4 border-black p-4 relative group flex flex-col">
                    <div className="absolute top-0 left-0 w-2 h-2 bg-black"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 bg-black"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 bg-black"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 bg-black"></div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-2 bg-gray-200 border-2 border-black">
                          <Gamepad2 className="w-8 h-8 text-purple-700" />
                        </div>
                        <h3
                          className="font-bold text-black text-sm tracking-wide"
                          style={{ fontFamily: "var(--font-press-start-2p)" }}
                        >
                          CREATE A GAME
                        </h3>
                      </div>
                      <p className="text-gray-800 text-xs leading-relaxed mb-4">
                        Use AI to design and prototype a new game from scratch.
                      </p>
                    </div>
                    <div className="relative group/btn mt-auto">
                      <div className="absolute inset-0 translate-y-2 bg-gray-400 border-4 border-black"></div>
                      <button
                        disabled
                        className="relative w-full bg-gray-500 border-4 border-black p-4 font-bold text-white"
                        style={{ fontFamily: "var(--font-press-start-2p)" }}
                      >
                        <div className="absolute top-0 left-0 w-2 h-2 bg-black"></div>
                        <div className="absolute top-0 right-0 w-2 h-2 bg-black"></div>
                        <div className="absolute bottom-0 left-0 w-2 h-2 bg-black"></div>
                        <div className="absolute bottom-0 right-0 w-2 h-2 bg-black"></div>
                        <span className="flex items-center justify-center text-sm">
                          COMING SOON
                          <Play className="ml-2 w-4 h-4" />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <h2
                className="text-2xl font-bold text-black mb-4 flex items-center justify-center gap-3 tracking-wide"
                style={{ fontFamily: "var(--font-press-start-2p)" }}
              >
                <Gamepad2 className="w-6 h-6 text-black" />
                GENERATED GUIDES
              </h2>
            </div>
            <div className="bg-black border-4 border-black p-1">
              <div className="bg-purple-200 p-6">
                {loading ? (
                  <div className="flex justify-center items-center h-24">
                    <Loader2 className="w-8 h-8 animate-spin text-purple-700" />
                  </div>
                ) : feedGuides.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {feedGuides.map((game) => (
                      <TetorisGameCard
                        key={game.slug}
                        game={game}
                        actionText="VIEW GUIDE"
                        actionIcon={<BookOpen className="ml-2 w-4 h-4" />}
                        buttonColor="bg-purple-500"
                        isAdmin={isAdmin}
                        onPinToggle={handlePinToggle}
                        onDelete={handleDelete}
                      />
                    ))}
                  </div>
                ) : (
                  <p
                    className="text-center text-purple-800 py-4"
                    style={{ fontFamily: "var(--font-press-start-2p)", fontSize: "12px" }}
                  >
                    No guides generated yet!
                  </p>
                )}
              </div>
            </div>
          </main>

          <footer className="mt-12 text-center">
            <button
              onClick={handleAdminToggle}
              className="bg-black text-white border-2 border-white p-2 hover:bg-gray-700"
              style={{ fontFamily: "var(--font-press-start-2p)", fontSize: "10px" }}
            >
              <ShieldCheck className="w-4 h-4 inline-block mr-2" />
              {isAdmin ? "EXIT ADMIN MODE" : "ENTER ADMIN MODE"}
            </button>
          </footer>
        </div>
        <CreateGuideModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onGenerationComplete={handleGenerationComplete}
          isGenerating={isGenerating}
          setIsGenerating={setIsGenerating}
        />
      </div>
    </>
  )
}
