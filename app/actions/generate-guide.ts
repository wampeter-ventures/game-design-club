"use server"

import { vercel } from "@ai-sdk/vercel"
import { generateText } from "ai"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { slugify } from "@/utils/slugify"

const masterPromptTemplate = `# 🧹 Master Prompt: Create Game Design Worksheet Data
  
## 🎯 Objective
Generate a JSON object containing all the data needed to populate a worksheet for a given board game. The data must be structured according to the specification below. The tone should be for smart, engaged 10-year-olds.

## 🧠 Input
**Game to Analyze:** \`[GameName]\`
**User Notes:** \`[NotesfromUser]\`

---

## 📦 Required JSON Output Format
You must return ONLY a valid JSON object. Do not include any other text, markdown, or explanations.

\`\`\`json
{
"gameName": "string",
"gameSubtitle": "string (a fun, one-sentence description of the game, e.g., 'A game of trading, building, and settling an uncharted island.')",
"allMechanics": [
  {
    "id": "number",
    "column": "one of ['biggest_ideas', 'more_mechanics', 'secret_sauce']",
    "title": "string",
    "subTitle": "string (formal game design term)",
    "icon": "string (name of a lucide-react icon, e.g., 'Dice5')",
    "whatItMeans": "string (one fun, kid-friendly sentence)",
    "strategyTip": "string (one smart sentence of advice)",
    "gameRule": "string (one sentence summarizing the rule in the game)"
  }
],
"thinkAndShare": [
  "string (a creative question)",
  "string (a critical thinking question)"
]
}
\`\`\`

---

### 📋 Content Requirements
1.  **gameName:** The official name of the game.
2.  **gameSubtitle:** A fun, descriptive, one-sentence subtitle for the game.
3.  **allMechanics:** An array of exactly 9 unique mechanic objects.
  -   Distribute them evenly: 3 for \`biggest_ideas\`, 3 for \`more_mechanics\`, 3 for \`secret_sauce\`.
4.  **thinkAndShare:** An array of exactly 2 question strings.

---

## ✅ Final Check
- Is the output a single, valid JSON object and nothing else?
- Have I incorporated the User Notes to guide the content?
- Are there exactly 9 mechanics?
- Are there exactly 2 questions?

Ready? Let’s go!
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
