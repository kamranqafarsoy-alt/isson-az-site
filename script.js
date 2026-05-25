// =========================================================================
// 1. SUPABASE YENİ NƏSİL API BAĞLANTI AYARLARI
// =========================================================================
// Sizin yeni nəsil təhlükəsiz açarınız və layihə linkiniz bura daxil edildi
const SUPABASE_URL = 'https://da9uq5xga1zeqdit6gbi.supabase.co'; 
const SUPABASE_ANON_KEY = 'sb_publishable_dA9UQ5xGa1Zeqdit6gBI5A_oUGoDwqa';

// Supabase müştərisini qlobal olaraq yaradırıq
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// =========================================================================
// 2. SİSTEM BAŞLADIQLA İCRA OLUNAN FUNKSİYALAR
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
    console.log("ISSON GROUP: Sistem ugurla basladildi.");
    setActiveNavLink();
    initWhatsAppClickTracker();
});

// Menyuda aktiv səhifəni təyin edən funksiya
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

// Mağazalar üzrə WhatsApp kliklərini konsolda izləyən funksiya
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

// =========================================================================
// 3. BAZADAN MƏLUMATLARI ÇƏKƏN ƏSAS FUNKSİYA (DİNAMİK)
// =========================================================================
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
        
        // Sıralamanı ID-yə görə düzürük
        query = query.order('id', { ascending: true });

        const { data, error } = await query;
        if (error) throw error;
        return data;
    } catch (err) {
        console.error("Supabase-den mehsullar cekilerken xeta bas verdi:", err.message);
        return null;
    }
}