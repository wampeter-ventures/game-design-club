"use client"

import type React from "react"

import { useState, type Dispatch, type SetStateAction, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { generateGuideAction } from "@/app/actions/generate-guide"
import { Loader2 } from "lucide-react"

interface CreateGuideModalProps {
  isOpen: boolean
  onClose: () => void
  onGenerationComplete: (result: { slug: string; data: any }) => void
  isGenerating: boolean
  setIsGenerating: Dispatch<SetStateAction<boolean>>
}

export function CreateGuideModal({
  isOpen,
  onClose,
  onGenerationComplete,
  isGenerating,
  setIsGenerating,
}: CreateGuideModalProps) {
  const [error, setError] = useState<string | null>(null)
  const [countdown, setCountdown] = useState(15)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isGenerating) {
      setCountdown(15) // Reset timer
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [isGenerating])

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsGenerating(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const result = await generateGuideAction(formData)

    setIsGenerating(false)

    if (result.success && result.data && result.slug) {
      onGenerationComplete({ data: result.data, slug: result.slug })
    } else {
      const errorMessage = result.error || "An unknown error occurred. No specific reason was provided by the server."
      setError(errorMessage)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-white border-4 border-black">
        <DialogHeader>
          <DialogTitle style={{ fontFamily: "'Press Start 2P', monospace" }}>Create a Game Guide</DialogTitle>
          <DialogDescription>Enter the game details below to generate a new worksheet.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleFormSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="gameName"
                className="text-right text-sm"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                Game Name
              </label>
              <Input id="gameName" name="gameName" required className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="creatorName"
                className="text-right text-sm"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                Your Name
              </label>
              <Input id="creatorName" name="creatorName" required className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="notes"
                className="text-right text-sm"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                Notes
              </label>
              <Textarea
                id="notes"
                name="notes"
                placeholder="What do you love about this game? What mechanics should we highlight? Feel free to paste text here, or just leave this blank."
                className="col-span-3"
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
          <DialogFooter>
            <Button type="submit" disabled={isGenerating} className="w-full">
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating... {countdown > 0 ? `(~${countdown}s left)` : "(almost there!)"}
                </>
              ) : (
                "Generate Guide"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
