"use client"

import { Printer } from "lucide-react"

export default function GuidePageClient() {
  return (
    <div>
      {/* Your guide content here */}
      <button
        onClick={() => window.print()}
        className="print:hidden fixed bottom-4 right-4 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors z-50"
        aria-label="Print Guide"
      >
        <Printer className="w-6 h-6" />
      </button>
    </div>
  )
}
