import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://qcnkjmnywapgnkbttznv.supabase.co'

const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjbmtqbW55d2FwZ25rYnR0em52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk0NDE3NDEsImV4cCI6MjA5NTAxNzc0MX0.fYZ-ectEYZ5RnHraTn1IsiB2OA8sks-JcnUJ6grXHzQ'

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)