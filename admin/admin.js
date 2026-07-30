import { supabase } from "../js/supabase.js";

export async function requireAdmin() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) {
    sessionStorage.setItem("admin_notice", "Davam etmək üçün giriş edin.");
    location.replace("index.html");
    throw new Error("Sessiya tapılmadı");
  }
  const { data: allowed, error: roleError } = await supabase.rpc("is_admin");
  if (roleError || !allowed) {
    await supabase.auth.signOut();
    sessionStorage.setItem("admin_notice", "Bu hesabın admin icazəsi yoxdur.");
    location.replace("index.html");
    throw new Error("Admin icazəsi yoxdur");
  }
  return user;
}

export async function redirectIfAuthenticated() {
  const { data: { user } } = await supabase.auth.getUser();
  if (user) location.replace("dashboard.html");
}

export function setupLogout() {
  document.querySelectorAll("[data-logout]").forEach(button => button.addEventListener("click", async () => {
    button.disabled = true;
    await supabase.auth.signOut();
    location.replace("index.html");
  }));
}

export function setBusy(button, busy, label = "Yadda saxlanılır...") {
  if (!button) return;
  if (busy) button.dataset.original = button.textContent;
  button.disabled = busy;
  button.textContent = busy ? label : button.dataset.original || button.textContent;
}

export function safeFileName(file) {
  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  return `${crypto.randomUUID()}.${extension.replace(/[^a-z0-9]/g, "")}`;
}

export async function uploadImage(file, folder = "products") {
  if (!file) return null;
  if (!file.type.startsWith("image/")) throw new Error("Yalnız şəkil faylı seçilə bilər.");
  if (file.size > 8 * 1024 * 1024) throw new Error("Şəkil ölçüsü 8 MB-dan çox ola bilməz.");
  const path = `${folder}/${safeFileName(file)}`;
  const { error } = await supabase.storage.from("products").upload(path, file, { cacheControl: "3600", upsert: false });
  if (error) throw error;
  return supabase.storage.from("products").getPublicUrl(path).data.publicUrl;
}

export async function removeStorageUrls(urls = []) {
  const marker = "/storage/v1/object/public/products/";
  const paths = urls.filter(Boolean).map(url => {
    const index = url.indexOf(marker);
    return index >= 0 ? decodeURIComponent(url.slice(index + marker.length)) : null;
  }).filter(Boolean);
  if (paths.length) await supabase.storage.from("products").remove(paths);
}

export { supabase };
