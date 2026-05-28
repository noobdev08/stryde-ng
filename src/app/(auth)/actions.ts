'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { mapSignupError, mapLoginError } from '@/utils/lib/authErrors'

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: { name: formData.get('name') as string }
    }
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    console.log(error.message)
    const errorMessage = mapSignupError(error.message)
    return redirect(`/signup?error=${encodeURIComponent(errorMessage)}`)
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard?signup=success')
}

export async function logIn(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.log(error.message)
    const errorMessage = mapLoginError(error.message)
    return redirect(`/login?error=${encodeURIComponent(errorMessage)}`)
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function logout() {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Logout error:', error.message)
  }
  redirect('/')
}