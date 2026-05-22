import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://qcnkjmnywapgnkbttznv.supabase.co";
const supabaseKey = "SENIN_ANON_KEY";

export const supabase = createClient(supabaseUrl, supabaseKey);