"use client" 

import { useFormStatus } from "react-dom"
import { Loader2 } from "lucide-react"

export default function SubmitButton({ text = "Continue" }) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 transition-all text-white font-bold shadow-lg shadow-blue-500/10 active:scale-[0.98] cursor-pointer mt-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Authenticating...
        </>
      ) : (
        text
      )}
    </button>
  )
}