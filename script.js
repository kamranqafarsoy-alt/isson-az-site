// =========================================================================
// 1. SUPABASE BAĞLANTI AYARLARI (GÖZLƏMƏ REJİMLİ)
// =========================================================================
const SUPABASE_URL = 'https://da9uq5xga1zeqdit6gbi.supabase.co'; 
const SUPABASE_ANON_KEY = 'sb_publishable_dA9UQ5xGa1Zeqdit6gBI5A_oUGoDwqa';

let supabaseInstance = null;

// Kitabxananın yüklənib-yüklənmədiyini yoxlayıb təhlükəsiz bağlantı qururuq
function getSupabase() {
    if (supabaseInstance) return supabaseInstance;
    
    if (typeof supabase !== 'undefined' && typeof supabase.createClient === 'function') {
        supabaseInstance = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        return supabaseInstance;
    } else if (typeof window.supabase !== 'undefined' && typeof window.supabase.createClient === 'function') {
        supabaseInstance = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        return supabaseInstance;
    }
    return null;
}

// =========================================================================
// 2. SİSTEM BAŞLADIQLA İCRA OLUNAN FUNKSİYALAR
// =========================================================================
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

// =========================================================================
// 3. BAZADAN MƏLUMATLARI ÇƏKƏN ƏSAS FUNKSİYA
// =========================================================================
async function fetchProductsFromSupabase(category = null) {
    const client = getSupabase();
    
    if (!client) {
        console.warn("Supabase kitabxanası tapılmadı. Statik və ya köhnə məlumat rejimini yoxlayın.");
        return null;
    }
    
    try {
        let query = client.from('products').select('*');
        if (category) {
            query = query.eq('category', category);
        }
        
        query = query.order('id', { ascending: true });

        const { data, error } = await query;
        if (error) throw error;
        return data;
    } catch (err) {
        console.error("Məhsullar çəkilərkən xəta baş verdi:", err.message);
        return null;
    }
}