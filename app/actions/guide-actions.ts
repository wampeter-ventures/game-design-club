"use server"

import { createSupabaseServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

// Fetches guides where is_pinned = true
export async function getPinnedGuidesAction() {
  try {
    const supabase = createSupabaseServerClient()
    const { data, error } = await supabase
      .from("guides")
      .select("*") // Select all columns, including the full guide_data
      .eq("is_pinned", true)
      .order("created_at", { ascending: false })

    if (error) throw error
    return { success: true, guides: data || [] }
  } catch (error: any) {
    console.error("Error fetching pinned guides:", error)
    return { success: false, error: error.message, guides: [] }
  }
}

// Fetches guides where is_pinned = false
export async function getFeedGuidesAction() {
  try {
    const supabase = createSupabaseServerClient()
    const { data, error } = await supabase
      .from("guides")
      .select("*") // Select all columns
      .eq("is_pinned", false)
      .order("created_at", { ascending: false })

    if (error) throw error
    return { success: true, guides: data || [] }
  } catch (error: any) {
    console.error("Error fetching feed guides:", error)
    return { success: false, error: error.message, guides: [] }
  }
}

// Toggles the is_pinned status of a guide
export async function togglePinAction(slug: string, newStatus: boolean) {
  try {
    const supabase = createSupabaseServerClient()
    const { error } = await supabase.from("guides").update({ is_pinned: newStatus }).eq("slug", slug)

    if (error) throw error
    revalidatePath("/") // Revalidate the homepage to show changes
    return { success: true }
  } catch (error: any) {
    console.error(`Error toggling pin for ${slug}:`, error)
    return { success: false, error: error.message }
  }
}

// Deletes a guide
export async function deleteGuideAction(slug: string) {
  try {
    const supabase = createSupabaseServerClient()
    const { error } = await supabase.from("guides").delete().eq("slug", slug)

    if (error) throw error
    revalidatePath("/") // Revalidate the homepage to show changes
    return { success: true }
  } catch (error: any) {
    console.error(`Error deleting guide ${slug}:`, error)
    return { success: false, error: error.message }
  }
}
