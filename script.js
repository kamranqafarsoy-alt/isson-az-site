document.addEventListener("DOMContentLoaded", () => {
    console.log("ISSON GROUP: Sistem ugurla basladildi.");
    setActiveNavLink();
    initWhatsAppClickTracker();
});

function setActiveNavLink() {
    const currentPath = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach(link => {
        const linkPath = link.getAttribute("href");
        if (currentPath === linkPath) {
            navLinks.forEach(item => item.classList.remove("active"));
            link.classList.add("active");
        }
    });
}

function initWhatsAppClickTracker() {
    document.addEventListener("click", (e) => {
        const waButton = e.target.closest(".btn-tempra, .btn-condo");
        if (waButton) {
            const url = new URL(waButton.href);
            const textParam = url.searchParams.get("text");
            const shopName = waButton.classList.contains("btn-tempra") ? "TEMPRA" : "CONDO";
            console.log(`Musteri ${shopName} magazasina yonlendirilir. Mesaj: ${decodeURIComponent(textParam)}`);
        }
    });
}

async function fetchProductsFromSupabase(category = null) {
    if (typeof supabase === 'undefined') {
        console.warn("Supabase hele proqrama daxil edilmeyib. Statik melumatlar gosterilir.");
        return null;
    }
    try {
        let query = supabase.from('products').select('*');
        if (category) {
            query = query.eq('category', category);
        }
        const { data, error } = await query;
        if (error) throw error;
        return data;
    } catch (err) {
        console.error("Supabase-den mehsullar cekilerken xeta bas verdi:", err.message);
        return null;
    }
}