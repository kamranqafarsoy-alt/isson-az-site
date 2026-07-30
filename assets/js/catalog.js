import { supabase } from "../../js/supabase.js";
import { productCard, escapeHtml } from "./site.js";

const grid = document.querySelector("[data-products-grid]");
const search = document.querySelector("[data-search]");
const sort = document.querySelector("[data-sort]");
const count = document.querySelector("[data-count]");
const params = new URLSearchParams(location.search);
const category = params.get("cat");

const categoryNames = {
  kombi: "Kombilər",
  kondisioner: "Kondisionerlər",
  laminat: "Laminatlar",
  qapi: "Otaq qapıları",
  moydadir: "Moydadır və hamam mebelləri",
  seyfqapilar: "Seyf qapıları"
};

let products = [];

function render() {
  const term = (search?.value || "").trim().toLocaleLowerCase("az");
  let shown = products.filter(item =>
    `${item.name || ""} ${item.title || ""} ${item.description || ""}`
      .toLocaleLowerCase("az").includes(term)
  );
  if (sort?.value === "price-asc") shown.sort((a, b) => Number(a.price || Infinity) - Number(b.price || Infinity));
  if (sort?.value === "price-desc") shown.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
  if (sort?.value === "newest") shown.sort((a, b) => Number(b.id) - Number(a.id));
  if (count) count.textContent = `${shown.length} məhsul`;
  grid.innerHTML = shown.length
    ? shown.map(productCard).join("")
    : `<div class="state"><strong>Nəticə tapılmadı.</strong><br>Axtarışı dəyişib yenidən yoxlayın.</div>`;
}

async function load() {
  if (!grid) return;
  grid.innerHTML = Array.from({ length: 6 }, () => '<div class="card skeleton" aria-hidden="true"></div>').join("");
  let query = supabase.from("products").select("*");
  if (category === "qapi") query = query.eq("category", "qapi").eq("subcategory", "otaq-qapisi");
  else if (category === "seyfqapilar") query = query.eq("category", "qapi").eq("subcategory", "seyf-qapisi");
  else if (category) query = query.eq("category", category);

  const { data, error } = await query.order("id", { ascending: false });
  if (error) {
    console.error(error);
    grid.innerHTML = '<div class="state"><strong>Məhsulları yükləmək mümkün olmadı.</strong><br>Bir qədər sonra yenidən cəhd edin.</div>';
    return;
  }
  products = data || [];
  render();
}

const title = category ? categoryNames[category] || "Məhsullar" : "Ümumi kataloq";
document.querySelectorAll("[data-catalog-title]").forEach(node => node.textContent = title);
document.title = `${escapeHtml(title)} | ISSON GROUP`;
search?.addEventListener("input", render);
sort?.addEventListener("change", render);
load();
