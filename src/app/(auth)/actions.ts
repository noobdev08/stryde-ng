'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

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
    return redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
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
    return redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function logout() {
  const supabase = await createClient()

  // 1. Sign out from Supabase (clears server-side session)
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error('Logout error:', error.message)
  }

  // 2. Clear the cache and redirect to the home page
  redirect('/')
}