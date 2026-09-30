import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cvavbnwcxkcfwrynesyk.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_W-SHuUN-3nhGEIaskqBD5g_0cpuICVU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)