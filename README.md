# ISSON GROUP saytı

ISSON GROUP üçün statik məhsul kataloqu və Supabase əsaslı idarəetmə paneli.

## Quruluş

- `index.html` — ana səhifə və dinamik kateqoriyalar
- `katalog.html` — bütün məhsullar, axtarış və sıralama
- `category.html?cat=...` — kateqoriya məhsulları
- `product.html?id=...` — məhsul qalereyası və WhatsApp əlaqəsi
- `admin/` — sessiya ilə qorunan məhsul və kateqoriya idarəetməsi
- `assets/` — ortaq dizayn və JavaScript modulları
- `js/supabase.js` — Supabase klient konfiqurasiyası
- `supabase/setup.sql` — RLS və Storage təhlükəsizlik qaydaları

## Lokal baxış

ES module və Supabase sorğuları səbəbindən faylları birbaşa açmaq əvəzinə lokal HTTP server istifadə edin:

```powershell
python -m http.server 8000
```

Sonra `http://localhost:8000` ünvanını açın.

## Supabase hazırlanması

1. Supabase SQL Editor-də `supabase/setup.sql` faylını icra edin.
2. Faylın sonundakı nümunə sorğu ilə giriş edəcək istifadəçini `admin_users` cədvəlinə əlavə edin.
3. `products` adlı public Storage bucket mövcud olmalıdır.
4. `products` və `categories` cədvəlləri aşağıdakı sahələri saxlayır.

### products

`id`, `name`, `title`, `category`, `subcategory`, `price`, `description`, `image`, `image_url`, `image2`, `image3`, `image4`

### categories

`id`, `name`, `slug`, `image`

## Yerləşdirmə

Layihə statik şəkildə Vercel-də işləyir. `vercel.json` admin yönləndirməsini, təhlükəsizlik başlıqlarını və admin üçün keş/qovluq indekslənməsi qaydalarını saxlayır.

Canlı domen `isson.az` deyilsə, `robots.txt`, `sitemap.xml` və HTML fayllarındakı canonical ünvanlarını faktiki domenlə əvəz edin.
