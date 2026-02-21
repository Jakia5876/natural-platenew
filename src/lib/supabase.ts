import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rioiopzqcukunmrgncih.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpb2lvcHpxY3VrdW5tcmduY2loIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExMzIxODYsImV4cCI6MjA4NjcwODE4Nn0.zHRcfVa9JeJjabvUwTLN0ymN8aXxedq5hUZcExABrOQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
