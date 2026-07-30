const menuBtn = document.getElementById('productMenuBtn');
const drawer = document.getElementById('productDrawer');
const overlay = document.getElementById('drawerOverlay');
const closeBtn = document.getElementById('closeDrawerBtn');

function openMenu() {
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; 
}

function closeMenu() {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = ''; 
}

menuBtn.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

// Hər hansı bir kateqoriyaya klikləyəndə menyu avtomatik bağlansın və həmin hissəyə düşsün
document.querySelectorAll('.category-item a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMenu();
    }
});