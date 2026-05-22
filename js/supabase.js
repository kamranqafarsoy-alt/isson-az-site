import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://qcnkjmnywapgnkbttznv.supabase.co";

const supabaseKey = "BURAYA_TAM_ANON_KEY_YAZ";

export const supabase = createClient(supabaseUrl, supabaseKey);