import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { Database } from '@/lib/supabase/database.types'

export const getSupabaseServer = () => {
  return createServerActionClient<Database>({ cookies })
}
