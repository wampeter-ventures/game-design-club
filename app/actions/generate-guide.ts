"use server"

import { vercel } from "@ai-sdk/vercel"
import { generateText } from "ai"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { slugify } from "@/utils/slugify"

const masterPromptTemplate = `# 🧹 Master Prompt: Create Game Design Worksheet Data
  
## 🎯 Objective
Generate a JSON object containing all the data needed to populate a worksheet for a given board game. The data must be structured according to the specification below. Use the Exploding Kittens cheeky, energizing language, but toned down a bit. Focus on the core game mechanics as if you were a master game designer teaching the basics of game design to 10 year olds, in their language and with energy!

## 🧠 Input
**Game to Analyze:** \`[GameName]\`
**User Notes:** \`[NotesfromUser]\`

---

## ⚠️ Error Handling
If you do not have enough information about '[GameName]' to create a high-quality, accurate worksheet based on the requirements, you MUST return the following JSON object and nothing else:

\`\`\`json
{
  "error": "insufficient_information",
  "message": "I don't know enough about this game. Please provide more notes."
}
\`\`\`

---

## 📦 Required JSON Output Format
You must return ONLY a valid JSON object. Do not include any other text, markdown, or explanations.

\`\`\`json
{
"gameName": "string",
"gameSubtitle": "string (a fun, one-sentence description of the game, e.g., 'A game of trading, building, and settling an uncharted island.')",
"imageUrl": "string (a publicly accessible image URL for the game box art or game components, or null if none found)",
"fallbackIcon": "string (name of a lucide-react icon that represents the game theme, e.g., 'Dice5', 'Castle', 'Sword')",
"allMechanics": [
  {
    "id": "number",
    "column": "one of ['biggest_ideas', 'more_mechanics', 'secret_sauce']",
    "title": "string (an interesting concept or design element or game mechanic from the game, with a fun title)",
    "subTitle": "string (formal game design term, different from title)",
    "icon": "string (name of a lucide-react icon, e.g., 'Dice5')",
    "whatItMeans": "string (one fun, kid-friendly sentence with energy)",
    "strategyTip": "string (one smart sentence of advice with enthusiasm)",
    "gameRule": "string (one sentence summarizing the rule in the game)"
  }
],
"thinkAndShare": [
  "string (a creative question)",
  "string (a critical thinking question)"
]
}
\`\`\`

Remember: the subtitles in quotes are meant to be universal game principles and game design mechanics, not game-specific lingo. The goal is to use this guide to drive a conversation about how and where certain universal game design principles were uniquely applied to this game in particular, while teaching the concept of the game design principles and game design dynamics.

---

### 📋 Content Requirements
1.  **gameName:** The official name of the game.
2.  **gameSubtitle:** A fun, descriptive, one-sentence subtitle for the game.
3.  **imageUrl:** Try to find a publicly accessible image URL for the game's box art or components. Use null if you cannot find a reliable public image URL.
4.  **fallbackIcon:** Choose a lucide-react icon name that best represents the game's theme or main mechanic (e.g., 'Castle' for medieval games, 'Rocket' for space games, 'Dice5' for dice games).
5.  **allMechanics:** An array of exactly 9 unique mechanic objects.
  -   Distribute them evenly: 3 for \`biggest_ideas\`, 3 for \`more_mechanics\`, 3 for \`secret_sauce\`.
6.  **thinkAndShare:** An array of exactly 2 question strings.

---

## ✅ Final Check
- Is the output a single, valid JSON object and nothing else?
- Have I incorporated the User Notes to guide the content? This is critically important. Go above and beyond to incorporate any user notes!
- Are there exactly 9 mechanics?
- Are there exactly 2 questions?
- Does the language have that cheeky, energizing tone for smart 10-year-olds?
- Am I teaching game design fundamentals in kid-friendly language?
- Have I included an appropriate imageUrl (or null) and fallbackIcon?

Ready? Let's go!
`

export async function generateGuideAction(formData: FormData) {
  const gameName = formData.get("gameName") as string
  const notes = formData.get("notes") as string
  const creatorName = formData.get("creatorName") as string

  if (!gameName) {
    return { success: false, error: "Game name is required." }
  }

  if (!process.env.VERCEL_API_KEY) {
    return { success: false, error: "VERCEL_API_KEY is not set. Please add it to your environment variables." }
  }

  const finalPrompt = masterPromptTemplate
    .replace(/\[GameName\]/g, gameName)
    .replace("[NotesfromUser]", notes || "No notes provided.")

  try {
    const { text } = await generateText({
      model: vercel("v0-1.5-md"),
      prompt: finalPrompt,
      system:
        "You are an expert game design analyst. Your task is to generate a single, valid JSON object based on the user's request. Do not include any explanatory text, markdown formatting, or anything else—only the raw JSON.",
    })

    console.log("--- Raw AI Response ---", text)

    function safeParseJSON(raw: string) {
      try {
        return { ok: true, data: JSON.parse(raw.trim()) }
      } catch {}
      const cleaned = raw
        .replace(/^```(?:json)?\s*/i, "")
        .replace(/```$/i, "")
        .trim()
      try {
        return { ok: true, data: JSON.parse(cleaned) }
      } catch (err) {
        return { ok: false, err }
      }
    }

    const parsed = safeParseJSON(text)

    if (!parsed.ok) {
      console.error("JSON Parsing Error:", parsed.err)
      throw new Error("Model did not return valid JSON.")
    }

    const guideData = parsed.data as any
    console.log("--- Parsed Guide Data ---", guideData)

    if (guideData.error === "insufficient_information") {
      console.log("--- AI needs more information ---")
      return {
        success: false,
        error: "insufficient_information",
        message:
          "I don't know enough about this game to generate a game design guide. Can you share more notes about this game? Feel free to copy and paste anything from the web.",
      }
    }

    if (!guideData || typeof guideData !== "object") {
      throw new Error("Parsed data is not a valid object.")
    }

    guideData.gameName = gameName
    if (creatorName) {
      guideData.creatorName = creatorName
    }

    const slug = slugify(gameName)
    console.log("--- Generated Slug ---", slug)

    if (!slug) {
      return { success: false, error: "Could not generate a valid slug from the game name." }
    }

    const supabase = createSupabaseServerClient()
    const { error } = await supabase.from("guides").upsert(
      {
        slug: slug,
        game_name: gameName,
        guide_data: guideData,
      },
      { onConflict: "slug" },
    )

    if (error) {
      console.error("--- Supabase Error ---", error)
      return { success: false, error: `Database error: ${error.message}` }
    }

    console.log("--- Successfully saved to DB ---")
    return { success: true, slug, data: guideData }
  } catch (error: any) {
    console.error("--- Error in generateGuideAction ---", error)
    return {
      success: false,
      error: error.message || "An unexpected server error occurred.",
    }
  }
}
