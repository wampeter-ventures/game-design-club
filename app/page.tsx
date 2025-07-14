"use client"
import type React from "react"
import { Dice5, Mountain, Building2, LayoutGrid, Rocket } from "lucide-react"
import { HomePage } from "@/components/home-page"

const gamesWevePlayed = [
  {
    href: "/catan-worksheet",
    title: "Settlers of Catan",
    description: "A game of trading, building, and settling an uncharted island.",
    icon: <Dice5 className="w-8 h-8 text-orange-600" />,
  },
  {
    href: "/andor-worksheet",
    title: "Legends of Andor",
    description: "A cooperative fantasy adventure to defend a realm and rescue wolf cubs.",
    icon: <Mountain className="w-8 h-8 text-emerald-600" />,
  },
  {
    href: "/machi-koro-worksheet",
    title: "Machi Koro",
    description: "A fast-paced game of dice rolling and city building to construct landmarks.",
    icon: <Building2 className="w-8 h-8 text-blue-600" />,
  },
  {
    href: "/azul-worksheet",
    title: "Azul",
    description: "An elegant game of pattern building and competitive tile drafting.",
    icon: <LayoutGrid className="w-8 h-8 text-cyan-700" />,
  },
]

const gamesWeveMade = [
  {
    href: "https://playliftoff.com",
    title: "Liftoff",
    description: "Build. Boost. Blast or BOOM! How far can you fly?",
    icon: <Rocket className="w-8 h-8 text-red-500" />,
    action: "Play",
    external: true,
  },
]

// Game-themed falling objects
const fallingObjects = [
  // Tetris blocks
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
  // Catan pieces
  { shape: [[1]], color: "bg-amber-600", type: "catan", emoji: "🏠" },
  { shape: [[1]], color: "bg-amber-700", type: "catan", emoji: "🏙️" },
  { shape: [[1]], color: "bg-stone-600", type: "catan", emoji: "🛤️" },
  { shape: [[1]], color: "bg-red-600", type: "catan", emoji: "🧱" },
  { shape: [[1]], color: "bg-green-600", type: "catan", emoji: "🌾" },
  // Azul tiles
  { shape: [[1]], color: "bg-blue-400", type: "azul", emoji: "🔷" },
  { shape: [[1]], color: "bg-red-400", type: "azul", emoji: "🔶" },
  { shape: [[1]], color: "bg-yellow-400", type: "azul", emoji: "🟨" },
  { shape: [[1]], color: "bg-black", type: "azul", emoji: "⬛" },
  // Andor elements
  { shape: [[1]], color: "bg-emerald-600", type: "andor", emoji: "🐺" },
  { shape: [[1]], color: "bg-red-700", type: "andor", emoji: "🐉" },
  { shape: [[1]], color: "bg-gray-600", type: "andor", emoji: "⚔️" },
  { shape: [[1]], color: "bg-yellow-600", type: "andor", emoji: "☀️" },
  // Machi Koro buildings
  { shape: [[1]], color: "bg-blue-500", type: "machi", emoji: "🏢" },
  { shape: [[1]], color: "bg-green-500", type: "machi", emoji: "🏭" },
  { shape: [[1]], color: "bg-purple-500", type: "machi", emoji: "🎲" },
  // Rockets and space
  { shape: [[1]], color: "bg-red-500", type: "rocket", emoji: "🚀" },
  { shape: [[1]], color: "bg-orange-500", type: "rocket", emoji: "💥" },
  { shape: [[1]], color: "bg-yellow-500", type: "rocket", emoji: "⭐" },
]

// === MASTER PROMPT (raw, so back-ticks are safe) ===
const masterPrompt = String.raw`
# Master Prompt: Create a Game Design Worksheet

**Objective:** Generate a single-page, printable worksheet for a given board game, designed to help students analyze its core mechanics. The worksheet must follow the established “RDS Game Design Club” retro-arcade style.

**Game to Analyze:** [GAME NAME]

---

### 1. Core Content Requirements

A. **Mechanics Analysis (9 Total)**  
For each of the 9 key mechanics provide:  
1. **Mechanic Title** (fun & punchy)  
2. **Mechanic Subtitle** (formal term)  
3. **Lucide Icon** (name only, e.g. \`Dice5\`)  
4. **What it means:** one concise sentence in kid-friendly language  
5. **Strategy Tip:** one concise sentence of advice  
6. **[GAME NAME] Rule:** one-sentence rule reference.

B. **Mechanic Categorisation**  
Place the 9 cards into **three columns** (3–3–3):  
• Column 1 – BIGGEST IDEAS   (Core)  
• Column 2 – MID-SIZED MECHANICS   (Important)  
• Column 3 – SECRET SAUCE   (Unique / subtle)

C. **Think & Share Section**  
Add two open-ended questions:  
• Q1 – creative / “What would you add/change …?”  
• Q2 – analytical / “Why is X part fun …?”

---

### 2. Visual & Layout Spec  (Retro 80s Arcade)

• **Font:** ‘Press Start 2P’ for all headings.  
• **Page:** Landscape A4 (ratio ≈ 297/210).  
• **Borders:** 4 px solid black, plus 2×2 px “pixel” corners.  
• **Colours:**  
  – Background: bg-yellow-200  
  – Column headers: bg-orange-400, bg-blue-400, bg-purple-400  
  – Cards: lighter shades of their column header.  
• **Header:** “[GAME NAME]: Why This Game Is So Awesome” with icon.  
• **Footer:** “RDS Game Design Club • 2025”.  
• **Fun-o-Meter:** include at bottom of every card.  
• **Think & Share:** full-width, e.g. bg-pink-400, with writing lines.

---

**Final Output:** one self-contained React component named  
\`[GameName]WorksheetPage.tsx\` that renders the worksheet exactly to spec.
`

interface FallingBlock {
  id: number
  x: number
  y: number
  shape: number[][]
  color: string
  rotation: number
  speed: number
  emoji?: string
  type: string
}

interface TetorisGameCardProps {
  game: {
    href: string
    title: string
    description: string
    icon: React.ReactNode
    external?: boolean
    action?: string
  }
  actionText: string
  actionIcon: React.ReactNode
  buttonColor: string
  disabled?: boolean
}

function TetorisGameCard({ game, actionText, actionIcon, buttonColor, disabled }: TetorisGameCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (disabled) {
      e.preventDefault()
      return
    }
    e.preventDefault()
    if (game.external) {
      window.open(game.href, "_blank", "noopener,noreferrer")
    } else {
      window.open(game.href, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <div className="bg-white border-4 border-black p-4 group hover:bg-yellow-50 transition-colors duration-200 relative">
      {/* Pixel corners */}
      <div className="absolute top-0 left-0 w-2 h-2 bg-black"></div>
      <div className="absolute top-0 right-0 w-2 h-2 bg-black"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 bg-black"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 bg-black"></div>

      <div className="flex items-center gap-4 mb-4">
        <div className="p-2 bg-gray-200 border-2 border-black">{game.icon}</div>
        <div>
          <h3 className="font-bold text-black text-sm mb-2 tracking-wide">{game.title.toUpperCase()}</h3>
          <p className="text-gray-800 text-xs leading-relaxed">{game.description}</p>
        </div>
      </div>

      <div className="relative group/btn">
        {/* Button shadow */}
        <div
          className={`absolute inset-0 translate-y-2 ${disabled ? "bg-gray-400" : "bg-gray-700"} border-4 border-black`}
        ></div>

        {/* Main button */}
        <button
          onClick={handleClick}
          disabled={disabled}
          className={`relative w-full ${disabled ? "bg-gray-500" : buttonColor} border-4 border-black p-4 font-bold text-white transition-transform duration-100 ${!disabled && "group-hover/btn:translate-y-1 group-active/btn:translate-y-2 cursor-pointer"}`}
          style={{ fontFamily: "'Press Start 2P', monospace" }}
        >
          {/* Pixel corners */}
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

interface PromptDisplayCardProps {
  title: string
  icon: React.ReactNode
  promptText: string
}

function PromptDisplayCard({ title, icon, promptText }: PromptDisplayCardProps) {
  return (
    <div className="bg-white border-4 border-black p-4 relative">
      {/* Pixel corners */}
      <div className="absolute top-0 left-0 w-2 h-2 bg-black"></div>
      <div className="absolute top-0 right-0 w-2 h-2 bg-black"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 bg-black"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 bg-black"></div>

      <div className="flex items-center gap-4 mb-4">
        <div className="p-2 bg-gray-200 border-2 border-black">{icon}</div>
        <h3 className="font-bold text-black text-sm tracking-wide">{title.toUpperCase()}</h3>
      </div>
      <div className="bg-gray-800 text-white p-4 border-2 border-black max-h-64 overflow-y-auto">
        <pre className="whitespace-pre-wrap text-xs font-mono">{promptText}</pre>
      </div>
    </div>
  )
}

export default function Page() {
  // The HomePage component now fetches its own data,
  // so we don't need to pass any initial props here.
  return <HomePage />
}
