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
    // Map error to user-friendly message
    let errorMessage = ''
    if (error.message.includes('User already registered')) {
      errorMessage = 'An account already exists with this email'
    } else if (error.message.includes('Password should be at least 6 characters')) {
      errorMessage = 'Password must be at least 6 characters'
    } else if (error.message.includes('email')) {
      errorMessage = 'Please enter a valid email address'
    } else {
      errorMessage = 'Something went wrong. Please try again.'
    }
    return redirect(`/signup?error=${encodeURIComponent(errorMessage)}`)
  }

  revalidatePath('/', 'layout')
  // Optional: Show success message before redirect
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
    let errorMessage = ''
    if (error.message.includes('Invalid login credentials')) {
      errorMessage = 'Invalid email or password'
    } else if (error.message.includes('Email not confirmed')) {
      errorMessage = 'Please confirm your email address before logging in'
    } else {
      errorMessage = 'Something went wrong. Please try again.'
    }
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