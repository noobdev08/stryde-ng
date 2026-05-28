export function mapSignupError(errorMessage: string): string {
  if (errorMessage.includes('User already registered')) {
    return 'An account already exists with this email'
  }
  if (errorMessage.includes('Password should be at least 6 characters')) {
    return 'Password must be at least 6 characters'
  }
  if (errorMessage.includes('email')) {
    return 'Please enter a valid email address'
  }
  return 'Something went wrong. Please try again.'
}

export function mapLoginError(errorMessage: string): string {
  if (errorMessage.includes('Invalid login credentials')) {
    return 'Invalid email or password'
  }
  if (errorMessage.includes('Email not confirmed')) {
    return 'Please confirm your email address before logging in'
  }
  return 'Something went wrong. Please try again.'
}
