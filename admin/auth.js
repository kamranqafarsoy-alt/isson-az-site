import { supabase } from "../js/supabase.js";

export async function requireAdmin(){
const { data:{ user }, error } = await supabase.auth.getUser();

if(error || !user){
location.replace("index.html");
throw new Error("Sessiya tapılmadı");
}

const { data:allowed, error:roleError } = await supabase.rpc("is_admin");

if(roleError || !allowed){
await supabase.auth.signOut();
location.replace("index.html");
throw new Error("Admin icazəsi yoxdur");
}

return user;
}
