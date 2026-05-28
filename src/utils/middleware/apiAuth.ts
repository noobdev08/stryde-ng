import { createClient } from "@/utils/supabase/server"

export async function requireAuth() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return { user: null, response: new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 }) }
  }

  return { user, response: null }
}
