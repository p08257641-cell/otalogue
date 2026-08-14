/**
 * MedROBE & Accessories by Lene - Main Application Logic
 * Founder: Charlene Odei Asare
 * Institution: Family Health University College (FHUC)
 * Location: Room M306, Accra, Ghana | 0245636351
 */

document.addEventListener('DOMContentLoaded', () => {
  renderProductCatalog();
  setupCategoryFilters();
  setupSearch();
  renderReviews();
  setupFaqAccordion();
  setupMobileNav();
  setupModals();
  setupContactForm();
});

let currentFilter = 'all';
let searchQuery = '';

function renderProductCatalog() {
  const container = document.getElementById('products-grid');
  if (!container) return;

  const filtered = MEDROBE_PRODUCTS.filter(product => {
    const matchesCat = currentFilter === 'all' || product.category === currentFilter;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="no-products-found">
        <p>No products found matching "<strong>${searchQuery}</strong>" in this category.</p>
        <button class="btn btn-secondary btn-sm" onclick="resetFilters()">View All Products</button>
      </div>
    `;
    return;
  }

  let html = '';
  filtered.forEach(product => {
    const colorDots = product.colors.map(c => 
      `<span class="color-dot" style="background-color: ${c.hex};" title="${c.name}"></span>`
    ).join('');

    const sizeBadges = product.sizes.slice(0, 4).map(s => 
      `<span class="size-pill">${s}</span>`
    ).join('') + (product.sizes.length > 4 ? `<span class="size-pill">+${product.sizes.length - 4}</span>` : '');

    html += `
      <div class="product-card" data-id="${product.id}">
        <div class="product-badge">${product.badge || 'Popular'}</div>
        <div class="product-img-wrapper" onclick="openProductQuickView('${product.id}')">
          <img src="${product.image}" alt="${product.name}" loading="lazy" class="product-img">
          <button class="quick-view-btn" type="button">Quick View</button>
        </div>
        <div class="product-body">
          <div class="product-category-tag">${formatCategory(product.category)}</div>
          <h3 class="product-title" onclick="openProductQuickView('${product.id}')">${product.name}</h3>
          
          <div class="product-rating">
            <span class="stars">★★★★★</span>
            <span class="rating-val">${product.rating}</span>
            <span class="reviews-count">(${product.reviewsCount})</span>
          </div>

          <div class="product-swatches">
            <div class="color-dots">${colorDots}</div>
            <div class="size-pills">${sizeBadges}</div>
          </div>

          <p class="product-desc-snippet">${product.description.substring(0, 95)}...</p>

          <div class="product-footer">
            <div class="product-price">
              <span class="currency">GH₵</span>
              <span class="amount">${product.priceGHS}</span>
            </div>
            <div class="product-card-cta">
              <button class="btn btn-primary btn-sm add-bag-quick-btn" onclick="quickAddToBag('${product.id}')">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                Add to Bag
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function formatCategory(cat) {
  const map = {
    scrubs: 'Medical Scrubs',
    labcoats: 'Tailored Labcoats',
    diagnostics: 'Diagnostic Tools',
    kits: 'Medical Student Kits',
    accessories: 'Accessories & Caps'
  };
  return map[cat] || cat;
}

function setupCategoryFilters() {
  const filterBtns = document.querySelectorAll('.filter-pill-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.category;
      renderProductCatalog();
    });
  });
}

function setupSearch() {
  const searchInput = document.getElementById('catalog-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderProductCatalog();
    });
  }
}

function resetFilters() {
  currentFilter = 'all';
  searchQuery = '';
  const searchInput = document.getElementById('catalog-search-input');
  if (searchInput) searchInput.value = '';
  const filterBtns = document.querySelectorAll('.filter-pill-btn');
  filterBtns.forEach(b => b.classList.toggle('active', b.dataset.category === 'all'));
  renderProductCatalog();
}

function quickAddToBag(productId) {
  const product = MEDROBE_PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const defaultColor = product.colors[0]?.name || 'Standard';
  const defaultSize = product.sizes[0] || 'Standard';

  if (window.MedROBECart) {
    window.MedROBECart.addItem({
      id: product.id,
      name: product.name,
      priceGHS: product.priceGHS,
      size: defaultSize,
      color: defaultColor,
      image: product.image,
      quantity: 1
    });
    window.MedROBECart.openDrawer();
    showToast(`Added ${product.name} to your WhatsApp bag!`);
  }
}

// Quick View Modal
let selectedModalColor = '';
let selectedModalSize = '';

function openProductQuickView(productId) {
  const product = MEDROBE_PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  selectedModalColor = product.colors[0]?.name || 'Standard';
  selectedModalSize = product.sizes[0] || 'Standard';

  const modal = document.getElementById('quick-view-modal');
  const modalBody = document.getElementById('quick-view-modal-content');
  if (!modal || !modalBody) return;

  const colorsHtml = product.colors.map((c, i) => `
    <button type="button" class="color-option-btn ${i === 0 ? 'selected' : ''}" 
            style="--color: ${c.hex};" 
            title="${c.name}" 
            onclick="selectModalColor('${c.name}', this)">
      <span class="color-preview" style="background-color: ${c.hex};"></span>
      <span class="color-name-text">${c.name}</span>
    </button>
  `).join('');

  const sizesHtml = product.sizes.map((s, i) => `
    <button type="button" class="size-option-btn ${i === 0 ? 'selected' : ''}" 
            onclick="selectModalSize('${s}', this)">
      ${s}
    </button>
  `).join('');

  const featuresList = product.features.map(f => `<li><span class="check-icon">✓</span> ${f}</li>`).join('');

  modalBody.innerHTML = `
    <div class="qv-grid">
      <div class="qv-image-col">
        <img src="${product.image}" alt="${product.name}" class="qv-main-img">
        <div class="qv-badge">${product.badge || 'Official MedROBE'}</div>
        <div class="qv-trust-bar">
          <span>✨ FHUC Student Preferred</span> • 
          <span>🚚 Room M306 Pickup</span>
        </div>
      </div>
      <div class="qv-details-col">
        <div class="qv-header">
          <span class="qv-cat">${formatCategory(product.category)}</span>
          <h2 class="qv-title">${product.name}</h2>
          <div class="product-rating">
            <span class="stars">★★★★★</span>
            <span class="rating-val">${product.rating}</span>
            <span class="reviews-count">(${product.reviewsCount} verified reviews)</span>
          </div>
          <div class="qv-price-tag">
            <span class="qv-currency">GH₵</span>
            <span class="qv-amount">${product.priceGHS}</span>
            <span class="qv-tax-note">Includes campus handoff at FHUC</span>
          </div>
        </div>

        <p class="qv-desc">${product.description}</p>

        <div class="qv-selectors">
          <div class="selector-group">
            <label class="selector-label">Select Color / Finish: <strong id="modal-selected-color-label">${selectedModalColor}</strong></label>
            <div class="modal-colors-wrap">${colorsHtml}</div>
          </div>

          <div class="selector-group">
            <div class="label-with-link">
              <label class="selector-label">Select Size / Fit: <strong id="modal-selected-size-label">${selectedModalSize}</strong></label>
              <a href="javascript:void(0)" onclick="openSizeGuideModal()" class="size-guide-link">📐 Size Guide</a>
            </div>
            <div class="modal-sizes-wrap">${sizesHtml}</div>
          </div>

          <div class="selector-group">
            <label class="selector-label">Key Clinical Features:</label>
            <ul class="qv-features-list">${featuresList}</ul>
          </div>
        </div>

        <div class="qv-actions">
          <div class="modal-qty-box">
            <button class="qty-btn" onclick="adjustModalQty(-1)">-</button>
            <input type="number" id="modal-qty-val" value="1" min="1" max="50" readonly>
            <button class="qty-btn" onclick="adjustModalQty(1)">+</button>
          </div>
          <button class="btn btn-primary btn-lg qv-add-bag-btn" onclick="addModalItemToCart('${product.id}')">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            Add to WhatsApp Bag
          </button>
          <button class="btn btn-secondary qv-custom-btn" onclick="goToCustomizerWithProduct('${product.category}')">
            ✨ Add Custom Embroidery
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('is-open');
  document.body.classList.add('no-scroll');
}

function selectModalColor(colorName, btn) {
  selectedModalColor = colorName;
  document.querySelectorAll('.color-option-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  const label = document.getElementById('modal-selected-color-label');
  if (label) label.textContent = colorName;
}

function selectModalSize(size, btn) {
  selectedModalSize = size;
  document.querySelectorAll('.size-option-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  const label = document.getElementById('modal-selected-size-label');
  if (label) label.textContent = size;
}

function adjustModalQty(delta) {
  const input = document.getElementById('modal-qty-val');
  if (!input) return;
  let val = parseInt(input.value) || 1;
  val = Math.max(1, Math.min(50, val + delta));
  input.value = val;
}

function addModalItemToCart(productId) {
  const product = MEDROBE_PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const qtyInput = document.getElementById('modal-qty-val');
  const qty = parseInt(qtyInput ? qtyInput.value : 1) || 1;

  if (window.MedROBECart) {
    window.MedROBECart.addItem({
      id: product.id,
      name: product.name,
      priceGHS: product.priceGHS,
      size: selectedModalSize || product.sizes[0],
      color: selectedModalColor || product.colors[0]?.name,
      image: product.image,
      quantity: qty
    });
    closeQuickViewModal();
    window.MedROBECart.openDrawer();
    showToast(`Added ${qty}x ${product.name} to your bag!`);
  }
}

function goToCustomizerWithProduct(category) {
  closeQuickViewModal();
  const customizerSection = document.getElementById('customizer');
  if (customizerSection) {
    customizerSection.scrollIntoView({ behavior: 'smooth' });
  }
}

function closeQuickViewModal() {
  const modal = document.getElementById('quick-view-modal');
  if (modal) {
    modal.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
  }
}

function openSizeGuideModal() {
  const modal = document.getElementById('size-guide-modal');
  if (modal) {
    modal.classList.add('is-open');
    document.body.classList.add('no-scroll');
  }
}

function closeSizeGuideModal() {
  const modal = document.getElementById('size-guide-modal');
  if (modal) {
    modal.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
  }
}

// Reviews
function renderReviews() {
  const container = document.getElementById('reviews-grid');
  if (!container) return;

  let html = '';
  REVIEWS_DATA.forEach(rev => {
    html += `
      <div class="review-card">
        <div class="review-header">
          <div class="review-avatar">${rev.avatar}</div>
          <div class="review-meta">
            <h4 class="review-author">${rev.author}</h4>
            <span class="review-role">${rev.role}</span>
          </div>
          <div class="review-stars">★★★★★</div>
        </div>
        <p class="review-text">"${rev.comment}"</p>
        <div class="review-footer">
          <span class="verified-badge">✓ Verified FHUC Buyer</span>
          <span class="review-date">${rev.date}</span>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// FAQ Accordion
function setupFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isOpen) {
          item.classList.add('active');
        }
      });
    }
  });
}

// Mobile Nav
function setupMobileNav() {
  const toggle = document.getElementById('mobile-nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (toggle && navMenu) {
    toggle.addEventListener('click', () => {
      navMenu.classList.toggle('is-open');
      toggle.classList.toggle('is-active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
        toggle.classList.remove('is-active');
      });
    });
  }
}

// Modals global listeners
function setupModals() {
  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      closeQuickViewModal();
      closeSizeGuideModal();
    });
  });

  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeQuickViewModal();
        closeSizeGuideModal();
      }
    });
  });
}

// Toast Notifications
function showToast(msg) {
  let toast = document.getElementById('medrobe-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'medrobe-toast';
    toast.className = 'medrobe-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}
window.showToast = showToast;

// Contact Form
function setupContactForm() {
  const form = document.getElementById('direct-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name')?.value || '';
    const phone = document.getElementById('contact-phone')?.value || '';
    const inquiry = document.getElementById('contact-message')?.value || '';

    const waMsg = `Hi Charlene (MedROBE by Lene),\n\nMy name is *${name}* (${phone}).\nI have an inquiry from your website:\n"${inquiry}"\n\nLooking forward to hearing from you!`;
    const url = `https://wa.me/233245636351?text=${encodeURIComponent(waMsg)}`;
    window.open(url, '_blank');
    form.reset();
    showToast('Redirecting to WhatsApp with your inquiry...');
  });
}
