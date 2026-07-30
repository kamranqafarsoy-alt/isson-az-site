export const STORES = [
  { name: "Tempra Home", phone: "994552000080", address: "Məmməd Cəfər Cəfərov küçəsi" },
  { name: "Condo Luxury Concept", phone: "994559000909", address: "Zivərbəy Əhmədbəyov küçəsi" }
];

export function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[char]);
}

export function formatPrice(value) {
  if (value === null || value === undefined || value === "") return "Qiymət üçün əlaqə";
  const number = Number(value);
  return Number.isFinite(number)
    ? `${new Intl.NumberFormat("az-AZ").format(number)} ₼`
    : `${escapeHtml(value)} ₼`;
}

export function productCard(product) {
  const image = product.image || product.image_url || "images/ana-sehife.jpg";
  return `
    <a class="card" href="product.html?id=${encodeURIComponent(product.id)}">
      <div class="card-image">
        <img src="${escapeHtml(image)}" alt="${escapeHtml(product.name || "Məhsul")}" loading="lazy" width="600" height="450">
      </div>
      <div class="card-body">
        <h3>${escapeHtml(product.name || product.title || "Məhsul")}</h3>
        <div class="card-meta">
          <span class="price">${formatPrice(product.price)}</span>
          <span aria-hidden="true">→</span>
        </div>
      </div>
    </a>`;
}

export function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("role", "status");
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  requestAnimationFrame(() => toast.classList.add("show"));
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 3500);
}

export function setupSite() {
  const toggle = document.querySelector("[data-menu-toggle]");
  const links = document.querySelector("[data-menu]");
  if (toggle && links) {
    const close = () => {
      links.classList.remove("active");
      document.body.classList.remove("menu-open");
      toggle.setAttribute("aria-expanded", "false");
    };
    toggle.addEventListener("click", () => {
      const open = !links.classList.contains("active");
      links.classList.toggle("active", open);
      document.body.classList.toggle("menu-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.addEventListener("click", close);
    document.addEventListener("keydown", event => event.key === "Escape" && close());
  }
  document.querySelectorAll("[data-year]").forEach(node => node.textContent = new Date().getFullYear());
}

setupSite();
