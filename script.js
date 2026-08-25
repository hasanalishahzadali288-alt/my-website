// ===== HELPERS =====
const qs = new URLSearchParams(window.location.search);
const page = document.body.dataset.page || '';

// ===== PRELOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader')?.classList.add('hidden');
  }, 1600);
});

// ===== ANNOUNCEMENT BAR =====
const announcementTexts = document.querySelectorAll('#announcementSlider p');
let currentAnnouncement = 0;

function rotateAnnouncements() {
  if (!announcementTexts.length) return;
  announcementTexts.forEach(p => p.classList.remove('active'));
  currentAnnouncement = (currentAnnouncement + 1) % announcementTexts.length;
  announcementTexts[currentAnnouncement].classList.add('active');
}

if (announcementTexts.length) {
  announcementTexts[0].classList.add('active');
  setInterval(rotateAnnouncements, 3000);
}

// ===== HEADER SCROLL =====
const headerEl = document.getElementById('header');
window.addEventListener('scroll', () => {
  headerEl?.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== MOBILE NAV =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const mobileNavOverlay = document.getElementById('mobileNavOverlay');
const mobileNavClose = document.getElementById('mobileNavClose');

mobileMenuBtn?.addEventListener('click', () => {
  mobileNav?.classList.add('active');
  mobileNavOverlay?.classList.add('active');
  document.body.style.overflow = 'hidden';
});

function closeMobileNav() {
  mobileNav?.classList.remove('active');
  mobileNavOverlay?.classList.remove('active');
  document.body.style.overflow = '';
}

mobileNavClose?.addEventListener('click', closeMobileNav);
mobileNavOverlay?.addEventListener('click', closeMobileNav);

// ===== AUTO-HIGHLIGHT CURRENT NAV LINK =====
(function markActiveNav() {
  const key = page === 'collection' ? (qs.get('cat') || '') : page;
  const map = {
    'sale': 'collection.html?cat=sale',
    'bestseller': 'collection.html?cat=bestseller',
    'new': 'collection.html?cat=new',
    'men': 'collection.html?cat=men',
    'women': 'collection.html?cat=women',
    'smart': 'collection.html?cat=smart',
    'couple': 'collection.html?cat=couple',
    'track': 'track-order.html'
  };
  const target = map[key];
  if (!target) return;
  document.querySelectorAll('.nav-row a, .main-nav a').forEach(a => {
    if (a.getAttribute('href') === target) a.classList.add('active');
  });
})();

// ===== HERO 3D PARALLAX =====
const heroSection = document.getElementById('heroSlider');
if (heroSection) {
  heroSection.addEventListener('mousemove', e => {
    const r = heroSection.getBoundingClientRect();
    const mx = ((e.clientX - r.left) / r.width - 0.5).toFixed(3);
    const my = ((e.clientY - r.top) / r.height - 0.5).toFixed(3);
    heroSection.style.setProperty('--mx', mx);
    heroSection.style.setProperty('--my', my);
  });
  heroSection.addEventListener('mouseleave', () => {
    heroSection.style.setProperty('--mx', 0);
    heroSection.style.setProperty('--my', 0);
  });
}

// ===== CART =====
let cartItems = parseInt(sessionStorage.getItem('shahCart') || '0', 10);
const cartCount = document.getElementById('cartCount');
if (cartCount) cartCount.textContent = cartItems;

function addToCart(name) {
  cartItems++;
  sessionStorage.setItem('shahCart', cartItems);
  if (cartCount) {
    cartCount.textContent = cartItems;
    cartCount.style.transform = 'scale(1.3)';
    setTimeout(() => { cartCount.style.transform = 'scale(1)'; }, 200);
  }

  const n = document.createElement('div');
  n.textContent = `${name} added to cart!`;
  n.className = 'toast';
  document.body.appendChild(n);
  setTimeout(() => {
    n.style.opacity = '0';
    setTimeout(() => n.remove(), 350);
  }, 1500);
}

// ===== REVEAL ON SCROLL (defined early — used by product renderers) =====
const revealObserver = 'IntersectionObserver' in window ?
  new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); }
    });
  }, { threshold: 0.12 }) : null;

function observeReveals() {
  if (!revealObserver) {
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => el.classList.add('visible'));
    return;
  }
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => revealObserver.observe(el));
}

// ===== PRODUCT DATA =====
const products = {
  men: [
    { id: 'wyndow-men', name: 'Wyndow', cat: "Men's Stainless Steel", price: 11999, original: 29999, discount: 60, img: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=400&h=400&fit=crop' },
    { id: 'aurex-men', name: 'Aurex', cat: "Men's Leather", price: 19499, original: 39999, discount: 51, img: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=400&h=400&fit=crop' },
    { id: 'modicci-men', name: 'Modicci', cat: "Men's Stainless Steel", price: 11499, original: 13499, discount: 14, img: 'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=400&h=400&fit=crop' },
    { id: 'valen-men', name: 'Valen', cat: "Men's Stainless Steel", price: 12999, original: 27999, discount: 53, img: 'https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=400&h=400&fit=crop' },
    { id: 'aspire-men', name: 'Aspire', cat: "Men's Leather", price: 7499, original: 10999, discount: 31, img: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=400&h=400&fit=crop' },
    { id: 'london-men', name: 'London', cat: "Men's Stainless Steel", price: 24999, original: 39999, discount: 37, img: 'https://images.unsplash.com/photo-1585123334904-845d60e97b29?w=400&h=400&fit=crop' },
    { id: 'elite-men', name: 'Elite', cat: "Men's Leather", price: 8499, original: 10999, discount: 22, img: 'https://images.unsplash.com/photo-1526045431048-f857369baa09?w=400&h=400&fit=crop' },
    { id: 'onyx-men', name: 'Onyx', cat: "Men's Stainless Steel", price: 11499, original: 13999, discount: 17, img: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=400&h=400&fit=crop' }
  ],
  women: [
    { id: 'pearl-women', name: 'Pearl', cat: "Women's Bracelet", price: 10999, original: 27999, discount: 60, img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop' },
    { id: 'valen-women', name: 'Valen', cat: "Women's Stainless Steel", price: 12999, original: 27999, discount: 53, img: 'https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=400&h=400&fit=crop' },
    { id: 'sahara-women', name: 'Sahara', cat: "Women's Stainless Steel", price: 13999, original: 29999, discount: 53, img: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop' },
    { id: 'celia-women', name: 'Celia', cat: "Women's Bracelet", price: 13499, original: 27999, discount: 51, img: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400&h=400&fit=crop' },
    { id: 'devotion-women', name: 'Devotion', cat: "Women's Stainless Steel", price: 12749, original: 16499, discount: 22, img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop' },
    { id: 'orlena-women', name: 'Orlena', cat: "Women's Bracelet", price: 11499, original: 14499, discount: 20, img: 'https://images.unsplash.com/photo-1526045431048-f857369baa09?w=400&h=400&fit=crop' },
    { id: 'delex-women', name: 'Delex', cat: "Women's Bracelet", price: 11499, original: 14999, discount: 23, img: 'https://images.unsplash.com/photo-1585123334904-845d60e97b29?w=400&h=400&fit=crop' },
    { id: 'glam-women', name: 'Glam', cat: "Women's Stainless Steel", price: 9999, original: 12999, discount: 23, img: 'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=400&h=400&fit=crop' }
  ],
  smart: [
    { id: 'miro-smart', name: 'Miro', cat: "Smart Watch Series 5", price: 12999, original: 15999, discount: 18, img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop' },
    { id: 'axre-smart', name: 'Axre', cat: "Smart Watch AMOLED Pro", price: 9999, original: 17999, discount: 44, img: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=400&h=400&fit=crop' },
    { id: 'aristos-smart', name: 'Aristos', cat: "Smart Watch Fitness+", price: 11999, original: 13999, discount: 14, img: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=400&h=400&fit=crop' },
    { id: 'pulse-smart', name: 'Pulse', cat: "Smart Watch Sport GPS", price: 10999, original: 27999, discount: 60, img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop' }
  ],
  couple: [
    { id: 'amore-couple', name: 'Amore', cat: "Couple's Stainless Steel", price: 18499, original: 25999, discount: 28, img: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400&h=400&fit=crop' },
    { id: 'valen-couple', name: 'Valen', cat: "Couple's Stainless Steel", price: 23999, original: 55999, discount: 57, img: 'https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=400&h=400&fit=crop' },
    { id: 'sahara-couple', name: 'Sahara', cat: "Couple's Stainless Steel", price: 25999, original: 51999, discount: 50, img: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop' },
    { id: 'aristos-couple', name: 'Aristos', cat: "Couple's Stainless Steel", price: 21999, original: 28999, discount: 24, img: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=400&h=400&fit=crop' },
    { id: 'mpmentum-couple', name: 'Mpmentum', cat: "Couple's Stainless Steel", price: 24999, original: 34999, discount: 28, img: 'https://images.unsplash.com/photo-1585123334904-845d60e97b29?w=400&h=400&fit=crop' },
    { id: 'devotion-couple', name: 'Devotion', cat: "Couple's Stainless Steel", price: 23499, original: 28499, discount: 17, img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop' },
    { id: 'royale-couple', name: 'Royale', cat: "Couple's Stainless Steel", price: 16999, original: 24999, discount: 32, img: 'https://images.unsplash.com/photo-1526045431048-f857369baa09?w=400&h=400&fit=crop' },
    { id: 'empire-couple', name: 'Empire', cat: "Couple's Stainless Steel", price: 20999, original: 32999, discount: 36, img: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=400&h=400&fit=crop' }
  ]
};

products.bestseller = [products.men[3], products.men[4], products.men[0], products.women[5], products.men[1], products.women[0], products.couple[3], products.smart[1]];
products.sale = [...products.men, ...products.women].sort((a, b) => b.discount - a.discount).slice(0, 10);
products.new = [products.men[5], products.women[6], products.smart[1], products.women[3], products.couple[7], products.smart[3], products.men[2], products.women[5]];

// ===== COLLECTION PAGE CONFIG =====
const collections = {
  men:        { title: "Men's Watches",      sub: 'Timeless precision for the modern gentleman', banner: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=1600&h=500&fit=crop' },
  women:      { title: "Women's Watches",    sub: 'Elegance crafted for her wrist',              banner: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=1600&h=500&fit=crop' },
  smart:      { title: 'Smart Watches',      sub: 'Technology that looks like luxury',           banner: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=1600&h=500&fit=crop' },
  couple:     { title: 'Couple Watches',     sub: 'Two wrists. One story.',                      banner: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=1600&h=500&fit=crop' },
  bestseller: { title: 'Best Sellers',       sub: 'The watches everyone is talking about',       banner: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=1600&h=500&fit=crop' },
  sale:       { title: 'Azadi Sale',         sub: 'Up to 60% OFF — limited time only',           banner: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=1600&h=500&fit=crop' },
  new:        { title: 'New Arrivals',       sub: 'Fresh drops from the latest collection',      banner: 'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=1600&h=500&fit=crop' }
};

function formatPrice(num) {
  return 'Rs.' + num.toLocaleString('en-PK');
}

function productCardHTML(p) {
  return `
    <div class="product-card reveal">
      <div class="product-media">
        <span class="product-badge">-${p.discount}%</span>
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        <span class="shine"></span>
        <div class="product-actions">
          <button class="action-btn wishlist" title="Add to Wishlist"><i class="far fa-heart"></i></button>
          <button class="action-btn" title="Quick View" onclick="addToCart('${p.name} (Quick View)')"><i class="fas fa-eye"></i></button>
          <button class="action-btn" title="Buy Now" onclick="window.location.href='product.html?id=${p.id}'"><i class="fas fa-bolt"></i></button>
        </div>
        <button class="product-cart-btn" onclick="addToCart('${p.name}')">Add to Cart</button>
      </div>
      <a href="product.html?id=${p.id}" class="product-info">
        <span class="product-category">${p.cat}</span>
        <h3 class="product-name">${p.name}</h3>
        <div class="product-rating">
          <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-stroke"></i>
          <span>4.5</span>
        </div>
        <div class="product-prices">
          <span class="price-sale">${formatPrice(p.price)}</span>
          <span class="price-original">${formatPrice(p.original)}</span>
        </div>
        <div class="product-perks">
          <span><i class="fas fa-truck-fast"></i> Free Shipping</span>
          <span><i class="fas fa-shield-halved"></i> 1Y Warranty</span>
        </div>
      </a>
    </div>`;
}

// ===== HOME: FEATURED TABS =====
const homeGrid = document.getElementById('productsGrid');
if (homeGrid) {
  function renderProducts(tab) {
    homeGrid.innerHTML = (products[tab] || products.men).map(productCardHTML).join('');
    observeReveals();
  }

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProducts(btn.dataset.tab);
    });
  });

  renderProducts('men');
}

// ===== COLLECTION PAGE =====
const collectionGrid = document.getElementById('collectionGrid');
if (collectionGrid) {
  const cat = collections[qs.get('cat')] ? qs.get('cat') : 'men';
  const conf = collections[cat];
  let list = [...products[cat]];

  document.getElementById('collectionTitle').textContent = conf.title;
  document.getElementById('collectionSub').textContent = conf.sub;
  document.getElementById('collectionBanner').src = conf.banner;
  document.getElementById('crumbCat').textContent = conf.title;
  document.getElementById('countLabel').textContent = `${list.length} products`;

  // Sub-category pills
  const subs = {
    men: [['all','All'],['stainless',"Stainless Steel"],['leather','Leather']],
    women: [['all','All'],['bracelet','Bracelet'],['stainless','Stainless Steel']],
    couple: [['all','All']],
    smart: [['all','All']],
    sale: [['all','All']],
    new: [['all','All']],
    bestseller: [['all','All']]
  }[cat];

  const pillWrap = document.getElementById('subPills');
  if (pillWrap && subs.length > 1) {
    pillWrap.innerHTML = subs.map(([key,label], i) =>
      `<button class="sub-pill${i===0?' active':''}" data-sub="${key}">${label}</button>`).join('');
  }

  let activeSub = 'all';
  function applyFilters() {
    const min = parseFloat(document.getElementById('priceMin')?.value) || 0;
    const max = parseFloat(document.getElementById('priceMax')?.value) || Infinity;
    let out = list.filter(p => {
      const inSub = activeSub === 'all' || p.cat.toLowerCase().includes(activeSub);
      const inPrice = p.price >= min && p.price <= max;
      return inSub && inPrice;
    });
    const sort = document.getElementById('sortSelect')?.value || 'featured';
    if (sort === 'low') out.sort((a,b)=>a.price-b.price);
    if (sort === 'high') out.sort((a,b)=>b.price-a.price);
    if (sort === 'discount') out.sort((a,b)=>b.discount-a.discount);
    collectionGrid.innerHTML = out.map(productCardHTML).join('') ||
      '<p class="empty-note">No watches match this filter yet — check back soon.</p>';
    document.getElementById('countLabel').textContent = `${out.length} products`;
    observeReveals();
  }

  window.applyFilters = applyFilters;
  document.getElementById('sortSelect')?.addEventListener('change', applyFilters);
  pillWrap?.addEventListener('click', e => {
    const btn = e.target.closest('.sub-pill');
    if (!btn) return;
    pillWrap.querySelectorAll('.sub-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeSub = btn.dataset.sub;
    applyFilters();
  });

  applyFilters();
}

// ===== PRODUCT DETAIL PAGE =====
const pdpRoot = document.getElementById('pdpRoot');
if (pdpRoot) {
  const id = qs.get('id');
  let found = null;
  Object.values(products).flat().forEach(p => { if (!found && p.id === id) found = p; });
  if (!found) found = products.men[0];

  const catKey = found.id.endsWith('-men') ? 'men' :
                 found.id.endsWith('-women') ? 'women' :
                 found.id.endsWith('-couple') ? 'couple' :
                 found.id.endsWith('-smart') ? 'smart' : 'bestseller';
  const crumbLink = document.getElementById('crumbCatLink');
  if (crumbLink) {
    crumbLink.href = `collection.html?cat=${catKey}`;
    crumbLink.textContent = collections[catKey].title;
  }

  document.title = `${found.name} | Shah Watches Pakistan`;
  const crumbTitle = document.getElementById('crumbTitle');
  if (crumbTitle) crumbTitle.textContent = found.name;
  document.getElementById('crumbName').textContent = found.name;
  document.getElementById('pdpImg').src = found.img;
  document.getElementById('pdpName').textContent = found.name;
  document.getElementById('pdpCat').textContent = found.cat;
  document.getElementById('pdpPrice').textContent = formatPrice(found.price);
  document.getElementById('pdpOriginal').textContent = formatPrice(found.original);
  document.getElementById('pdpBadge').textContent = `-${found.discount}% OFF`;
  document.getElementById('pdpSave').textContent = `You save ${formatPrice(found.original - found.price)}`;
  document.getElementById('pdpThumbA').src = found.img;

  // Related
  const relatedPool = found.id.endsWith('-men') ? products.men :
                      found.id.endsWith('-women') ? products.women :
                      found.id.endsWith('-couple') ? products.couple :
                      found.id.endsWith('-smart') ? products.smart : products.bestseller;
  document.getElementById('relatedGrid').innerHTML =
    relatedPool.filter(p => p.id !== found.id).slice(0,4).map(productCardHTML).join('');

  // Qty + gallery thumbs
  let qty = 1;
  const qtyVal = document.getElementById('qtyVal');
  document.getElementById('qtyMinus')?.addEventListener('click', () => { qty = Math.max(1, qty-1); qtyVal.textContent = qty; });
  document.getElementById('qtyPlus')?.addEventListener('click', () => { qty = Math.min(9, qty+1); qtyVal.textContent = qty; });
  document.getElementById('pdpAddCart')?.addEventListener('click', () => addToCart(`${qty}x ${found.name}`));

  document.querySelectorAll('.pdp-thumb').forEach(t => {
    t.addEventListener('click', () => {
      document.querySelectorAll('.pdp-thumb').forEach(x => x.classList.remove('active'));
      t.classList.add('active');
      document.getElementById('pdpImg').src = t.dataset.img || found.img;
    });
  });
}

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-q')?.addEventListener('click', () => {
    const open = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!open) item.classList.add('open');
  });
});

// ===== TRACK ORDER DEMO =====
const trackForm = document.getElementById('trackForm');
trackForm?.addEventListener('submit', e => {
  e.preventDefault();
  const val = document.getElementById('trackInput').value.trim();
  if (!val) return;
  document.getElementById('trackResult').style.display = 'block';
  document.getElementById('trackedId').textContent = val.toUpperCase();
  document.getElementById('trackResult').scrollIntoView({ behavior: 'smooth', block: 'center' });
  document.querySelectorAll('.t-step').forEach((s, i) => {
    s.classList.remove('done','current');
    setTimeout(() => s.classList.add(i <= 2 ? 'done' : ''), i * 450);
    if (i === 2) setTimeout(() => s.classList.add('current'), i * 450 + 100);
  });
});

// ===== CONTACT FORM =====
document.getElementById('contactForm')?.addEventListener('submit', e => {
  e.preventDefault();
  e.target.reset();
  const n = document.createElement('div');
  n.textContent = 'Message sent! We will get back to you within 24 hours.';
  n.className = 'toast success';
  document.body.appendChild(n);
  setTimeout(() => { n.style.opacity = '0'; setTimeout(() => n.remove(), 350); }, 2200);
});

// ===== HERO SLIDER (HOME ONLY) =====
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const ambientImg = document.getElementById('ambientImg');
let currentSlide = 0;
let slideInterval;

function updateAmbient() {
  const activeSlide = slides[currentSlide];
  if (activeSlide && ambientImg && activeSlide.dataset.ambient && ambientImg.src !== activeSlide.dataset.ambient) {
    ambientImg.src = activeSlide.dataset.ambient;
  }
}

function goToSlide(index) {
  if (!slides.length) return;
  slides[currentSlide].classList.remove('active');
  dots[currentSlide]?.classList.remove('active');
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  dots[currentSlide]?.classList.add('active');
  updateAmbient();
}

function startSlider() {
  if (!slides.length) return;
  slideInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    clearInterval(slideInterval);
    goToSlide(i);
    startSlider();
  });
});

updateAmbient();
startSlider();

// ===== VIDEO SHOWCASE LOOP =====
document.querySelectorAll('.video-box video').forEach(video => {
  const tryPlay = () => { video.muted = true; const p = video.play(); if (p?.catch) p.catch(()=>{}); };
  tryPlay();
  video.addEventListener('ended', () => { video.currentTime = 0; tryPlay(); });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(es => es.forEach(en => en.isIntersecting && tryPlay()), { threshold: .25 }).observe(video);
  }
  video.addEventListener('contextmenu', e => e.preventDefault());
});

// ===== STATS COUNTERS =====
function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const duration = 1800;
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - progress, 3)));
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const statsRow = document.querySelector('.stats-row');
if (statsRow && 'IntersectionObserver' in window) {
  const statObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-num').forEach(animateCounter);
        statObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });
  statObserver.observe(statsRow);
}

observeReveals();

// ===== POLICY PAGE =====
const policyBody = document.getElementById('policyBody');
if (policyBody) {
  const POLICIES = {
    shipping: {
      title: 'Shipping Policy', icon: 'fa-truck-fast',
      body: `
        <h3>Delivery Timelines</h3>
        <p>We dispatch all orders within 24–48 hours of confirmation. Delivery across Pakistan takes 3–5 working days, with major cities often receiving orders in 2–3 days.</p>
        <h3>Shipping Charges</h3>
        <p>Shipping is completely <strong>FREE</strong> on all orders, nationwide. There are no hidden charges — the price you see is the price you pay.</p>
        <h3>Order Tracking</h3>
        <p>Once your order ships, you receive an Order ID via SMS and email. Use it on our Track Order page for live delivery status.</p>
        <h3>Undeliverable Parcels</h3>
        <p>If a parcel cannot be delivered after three attempts due to unavailability of the customer, it is returned to our warehouse. Refunds are processed as per our Refund Policy.</p>`
    },
    returns: {
      title: 'Returns & Exchange', icon: 'fa-rotate-left',
      body: `
        <h3>30-Day Hassle-Free Returns</h3>
        <p>If you are not fully satisfied with your purchase, you may return or exchange it within 30 days of delivery.</p>
        <h3>Conditions</h3>
        <ul>
          <li>The watch must be unused and in original condition.</li>
          <li>All packaging, tags, box and warranty card must be intact.</li>
          <li>Sale items marked "Final Sale" are exchange-only.</li>
        </ul>
        <h3>How to Start</h3>
        <p>Contact our support team with your Order ID. Once the item is received and inspected, we will process your refund or ship your replacement within 5 working days.</p>`
    },
    warranty: {
      title: 'Warranty Information', icon: 'fa-shield-halved',
      body: `
        <h3>1-Year International Warranty</h3>
        <p>Every Shah Watches timepiece is covered by a 1-year international warranty against manufacturing defects in movement, dial and hands.</p>
        <h3>What Is Covered</h3>
        <ul>
          <li>Movement defects and timekeeping faults.</li>
          <li>Dial and hand manufacturing defects.</li>
          <li>Battery replacement within the first 6 months.</li>
        </ul>
        <h3>What Is Not Covered</h3>
        <ul>
          <li>Scratches on case, glass or strap from normal wear.</li>
          <li>Water damage beyond rated ATM limits.</li>
          <li>Accidental damage, misuse or unauthorized repairs.</li>
        </ul>
        <p>To claim, present your warranty card and proof of purchase at any of our stores or via customer support.</p>`
    },
    privacy: {
      title: 'Privacy Policy', icon: 'fa-lock',
      body: `
        <h3>Your Data, Protected</h3>
        <p>We respect your privacy. Any personal information collected during ordering — name, phone number, email, and address — is used solely to process and deliver your order.</p>
        <h3>Data We Collect</h3>
        <ul>
          <li>Contact details provided at checkout.</li>
          <li>Order history to improve your shopping experience.</li>
          <li>Anonymized analytics to enhance website performance.</li>
        </ul>
        <h3>We Never Sell Your Data</h3>
        <p>Your information is never sold, rented or shared with third parties except courier partners strictly for delivery purposes.</p>
        <h3>Cookies</h3>
        <p>We use cookies to keep your cart active and remember preferences. You can disable cookies in your browser settings at any time.</p>`
    },
    terms: {
      title: 'Terms of Service', icon: 'fa-file-contract',
      body: `
        <h3>Acceptance of Terms</h3>
        <p>By accessing shahwatches.pk and placing an order, you agree to these Terms of Service in full.</p>
        <h3>Product Information</h3>
        <p>We strive for accuracy in product imagery and descriptions; however, slight variations in color and finish may occur due to screen settings and manufacturing batches.</p>
        <h3>Pricing & Orders</h3>
        <ul>
          <li>All prices are listed in Pakistani Rupees (PKR).</li>
          <li>We reserve the right to cancel orders in case of pricing errors or stock unavailability, with a full refund issued.</li>
        </ul>
        <h3>Governing Law</h3>
        <p>These terms are governed by the laws of the Islamic Republic of Pakistan.</p>`
    },
    refund: {
      title: 'Refund Policy', icon: 'fa-money-bill-transfer',
      body: `
        <h3>Refund Timeline</h3>
        <p>Once your returned item passes inspection at our warehouse, refunds are initiated within 5 working days.</p>
        <h3>Refund Methods</h3>
        <ul>
          <li><strong>COD orders:</strong> refunded via bank transfer or JazzCash/EasyPaisa.</li>
          <li><strong>Card orders:</strong> refunded to the original payment card within 7–10 working days depending on your bank.</li>
        </ul>
        <h3>Non-Refundable Cases</h3>
        <ul>
          <li>Items damaged due to misuse after delivery.</li>
          <li>Requests made after the 30-day return window.</li>
        </ul>
        <p>For refund status, contact support with your Order ID.</p>`
    },
    retail: {
      title: 'Retail Policy', icon: 'fa-store',
      body: `
        <h3>Authorized Retailers Only</h3>
        <p>Shah Watches products are sold exclusively through our official website and authorized retail stores. Products purchased from unauthorized sellers are not covered under warranty.</p>
        <h3>Become a Retail Partner</h3>
        <p>Interested in stocking Shah Watches? We offer attractive dealer margins, marketing support and exclusive regional rights. Contact us at partners@shahwatches.pk with your business details and city.</p>
        <h3>Price Integrity</h3>
        <p>To protect customers, we enforce Minimum Advertised Price (MAP) across all authorized channels.</p>`
    },
    payment: {
      title: 'Modes of Payment', icon: 'fa-credit-card',
      body: `
        <h3>Cash on Delivery (COD)</h3>
        <p>Available nationwide. Inspect the sealed package before paying the courier.</p>
        <h3>Debit / Credit Cards</h3>
        <p>We accept Visa and Mastercard. All transactions are secured with 256-bit SSL encryption.</p>
        <h3>Bank Transfer</h3>
        <p>Direct transfers to our business account are accepted. Share your receipt at support@shahwatches.pk for instant verification.</p>
        <h3>Mobile Wallets</h3>
        <p>JazzCash and EasyPaisa payments are supported for quick, fee-free checkout.</p>`
    }
  };

  const key = qs.get('page') || 'shipping';
  const conf = POLICIES[key] || POLICIES.shipping;
  document.title = `${conf.title} | Shah Watches Pakistan`;
  document.getElementById('policyTitle').textContent = conf.title;
  document.getElementById('crumbPolicy').textContent = conf.title;
  document.getElementById('policyHeading').textContent = conf.title;
  document.getElementById('policyIcon').innerHTML = `<i class="fas ${conf.icon}"></i>`;
  policyBody.innerHTML = conf.body;
}

// ===== BACK TO TOP =====
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop?.classList.toggle('visible', window.scrollY > 400);
});
backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== SUBSCRIBE FORM =====
document.getElementById('subscribeForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = e.target.querySelector('input');
  if (input.value) {
    input.value = '';
    const msg = document.createElement('div');
    msg.textContent = 'Subscribed successfully!';
    msg.className = 'toast success';
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 2000);
  }
});

// Toast styles
const style = document.createElement('style');
style.textContent = `
  @keyframes slideUp { from { transform: translateX(-50%) translateY(20px); opacity: 0; } to { transform: translateX(-50%) translateY(0); opacity: 1; } }
  .toast {
    position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%);
    background: var(--dark); color: white; padding: 12px 26px; border-radius: 30px;
    font-size: 13px; font-weight: 600; z-index: 10000; animation: slideUp .3s ease;
    box-shadow: 0 10px 30px rgba(0,0,0,.25); transition: opacity .35s ease;
  }
  .toast.success { background: #1d9d55; }
  .reveal { opacity: 0; transform: translateY(24px); transition: opacity .6s ease, transform .6s cubic-bezier(.22,1,.36,1); }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  .empty-note { grid-column: 1/-1; text-align: center; color: var(--text-light); padding: 60px 0; font-size: 15px; }
`;
document.head.appendChild(style);
