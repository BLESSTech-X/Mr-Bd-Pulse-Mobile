// ===== HAMBURGER MENU =====
function setupMobileMenu() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const menuOverlay = document.getElementById('menuOverlay');

    if (!hamburgerBtn || !mobileMenu || !closeMenuBtn || !menuOverlay) return;

    function openMenu() {
        mobileMenu.classList.add('open');
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        mobileMenu.classList.remove('open');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    hamburgerBtn.addEventListener('click', openMenu);
    closeMenuBtn.addEventListener('click', closeMenu);
    menuOverlay.addEventListener('click', closeMenu);

    // Close menu when a link is clicked
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

// ===== ACTIVE NAVIGATION (updated for both header and bottom nav) =====
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Header desktop nav
    const desktopLinks = document.querySelectorAll('.desktop-nav a');
    desktopLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
            link.style.color = 'gold';
        }
    });
    
    // Bottom navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
            item.classList.add('active');
        } else if (currentPage === '' && href === 'index.html') {
            item.classList.add('active');
        }
    });
}

// ===== REST OF YOUR EXISTING FUNCTIONS CONTINUE =====
// (Keep all your existing JavaScript from script.js here)

// Make sure to call setupMobileMenu() in DOMContentLoaded
// ===== SLIDESHOW =====
let slideIndex = 0;
let slideInterval;

function showSlides() {
    const slides = document.getElementsByClassName("slide");
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].classList.add("active");
    }
}

function startSlideshow() {
    if (document.getElementsByClassName("slide").length > 0) {
        showSlides();
        slideInterval = setInterval(showSlides, 5000);
    }
}

function changeSlide(n) {
    clearInterval(slideInterval);
    const slides = document.getElementsByClassName("slide");
    slideIndex += n;
    if (slideIndex > slides.length) { slideIndex = 1; }
    if (slideIndex < 1) { slideIndex = slides.length; }
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].classList.add("active");
    }
    slideInterval = setInterval(showSlides, 5000);
}

// ===== SCROLL TO TOP =====
function setupScrollTop() {
    const scrollBtn = document.getElementById('scrollTop');
    if (!scrollBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== PRODUCTS PAGE (Filter and Search) =====
function setupProductsPage() {
    const searchInput = document.getElementById('searchInput');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productsGrid = document.getElementById('all-products');
    
    if (!productsGrid) return;
    
    // Sample product data (will be replaced by CMS later)
    const products = [
        { name: "iPhone 13", price: "ZMW 4,500", description: "128GB, Excellent condition", image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300", category: "iphone", link: "https://wa.me/260572523334?text=I'm%20interested%20in%20iPhone%2013" },
        { name: "iPhone 12", price: "ZMW 3,800", description: "64GB, Like new", image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300", category: "iphone", link: "https://wa.me/260572523334?text=I'm%20interested%20in%20iPhone%2012" },
        { name: "AirPods Pro", price: "ZMW 2,200", description: "Noise cancellation", image: "https://images.unsplash.com/photo-1581798459219-318e76aecc7b?w=300", category: "accessory", link: "https://wa.me/260572523334?text=I'm%20interested%20in%20AirPods%20Pro" },
        { name: "Fast Charger", price: "ZMW 250", description: "20W USB-C", image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300", category: "accessory", link: "https://wa.me/260572523334?text=I'm%20interested%20in%20Fast%20Charger" },
        { name: "Premium Case", price: "ZMW 180", description: "Shockproof", image: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=300", category: "accessory", link: "https://wa.me/260572523334?text=I'm%20interested%20in%20Premium%20Case" },
        { name: "iPhone 11", price: "ZMW 2,900", description: "64GB, Good condition", image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300", category: "iphone", link: "https://wa.me/260572523334?text=I'm%20interested%20in%20iPhone%2011" },
        { name: "Screen Protector", price: "ZMW 80", description: "Tempered glass", image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300", category: "accessory", link: "https://wa.me/260572523334?text=I'm%20interested%20in%20Screen%20Protector" },
        { name: "Wireless Charger", price: "ZMW 350", description: "15W fast charging", image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300", category: "accessory", link: "https://wa.me/260572523334?text=I'm%20interested%20in%20Wireless%20Charger" }
    ];
    
    let currentFilter = 'all';
    let currentSearch = '';
    
    function renderProducts() {
        if (!productsGrid) return;
        
        let filtered = products;
        
        if (currentFilter !== 'all') {
            filtered = filtered.filter(p => p.category === currentFilter);
        }
        
        if (currentSearch) {
            filtered = filtered.filter(p => p.name.toLowerCase().includes(currentSearch.toLowerCase()));
        }
        
        if (filtered.length === 0) {
            productsGrid.innerHTML = '<div class="no-results">No products found. Please try another search.</div>';
            return;
        }
        
        productsGrid.innerHTML = filtered.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <div class="price">${product.price}</div>
                <p class="description">${product.description}</p>
                <a href="${product.link}" class="buy-btn" target="_blank">Buy on WhatsApp</a>
            </div>
        `).join('');
        
        hideLoadingSpinner();
    }
    
    function hideLoadingSpinner() {
        const spinner = document.getElementById('loadingSpinner');
        if (spinner) spinner.style.display = 'none';
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value;
            renderProducts();
        });
    }
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderProducts();
        });
    });
    
    setTimeout(() => {
        hideLoadingSpinner();
        renderProducts();
    }, 500);
}

// ===== ACTIVE NAVIGATION =====
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPage) {
            item.classList.add('active');
        } else if (currentPage === 'index.html' && href === 'index.html') {
            item.classList.add('active');
        } else if (currentPage === '' && href === 'index.html') {
            item.classList.add('active');
        }
    });
}

// ===== CONTACT FORM =====
function setupContactForm() {
    const form = document.getElementById('contactForm');
    const successMsg = document.getElementById('formSuccess');
    
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // This is a placeholder. In production, you would send to a backend or email service
        if (successMsg) {
            successMsg.style.display = 'block';
            form.reset();
            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 5000);
        } else {
            alert('Message sent! We will get back to you soon.');
            form.reset();
        }
    });
}

// ===== LOAD CMS CONTENT (Placeholder for future integration) =====
async function loadCMSContent() {
    try {
        // This will be replaced with actual CMS fetching when implemented
        console.log('CMS content loading...');
    } catch (error) {
        console.log('CMS not configured yet, using default content');
    }
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();        // NEW: hamburger menu
    startSlideshow();
    setupScrollTop();
    setupProductsPage();
    setActiveNav();
    setupContactForm();
    loadCMSContent();
});
