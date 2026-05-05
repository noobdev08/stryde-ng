"use client"

import { useFormStatus } from "react-dom"
import { Loader2 } from "lucide-react" // Or any spinner icon

export function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white py-3 rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Saving...
        </>
      ) : (
        "Save username"
      )}
    </button>
  )
}