/**
 * MedROBE & Accessories by Lene - WhatsApp Bag & Automated Checkout
 * Owner: Charlene Odei Asare
 * Phone / WhatsApp: +233 24 563 6351 (0245636351)
 * Pickup Hub: Family Health University College (FHUC), Room M306
 */

class MedROBECart {
  constructor() {
    this.items = this.loadCart();
    this.phone = "233245636351";
    this.drawer = document.getElementById('cart-drawer');
    this.drawerOverlay = document.getElementById('cart-overlay');
    this.cartItemsList = document.getElementById('cart-items-container');
    this.cartSubtotal = document.getElementById('cart-subtotal-val');
    this.cartTotal = document.getElementById('cart-total-val');
    this.cartCountBadges = document.querySelectorAll('.cart-count-badge');
    this.deliverySelect = document.getElementById('cart-delivery-method');
    
    this.init();
  }

  loadCart() {
    try {
      const saved = localStorage.getItem('medrobe_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem('medrobe_cart', JSON.stringify(this.items));
    } catch (e) {
      console.warn('Storage save failed');
    }
    this.updateUI();
  }

  addItem(product) {
    // Check if duplicate standard product (same id, size, color and without custom embroidery)
    const existingIndex = this.items.findIndex(item => 
      item.id === product.id && 
      item.size === product.size && 
      item.color === product.color && 
      !item.customization && !product.customization
    );

    if (existingIndex > -1) {
      this.items[existingIndex].quantity += (product.quantity || 1);
    } else {
      this.items.push({
        id: product.id || `item-${Date.now()}`,
        name: product.name,
        priceGHS: product.priceGHS,
        size: product.size || 'Standard',
        color: product.color || 'Default',
        image: product.image || 'assets/images/scrubs-wine.jpg',
        customization: product.customization || null,
        quantity: product.quantity || 1
      });
    }

    this.saveCart();
  }

  removeItem(index) {
    if (index >= 0 && index < this.items.length) {
      this.items.splice(index, 1);
      this.saveCart();
    }
  }

  updateQuantity(index, newQty) {
    if (index >= 0 && index < this.items.length) {
      if (newQty <= 0) {
        this.removeItem(index);
      } else {
        this.items[index].quantity = newQty;
        this.saveCart();
      }
    }
  }

  clearCart() {
    this.items = [];
    this.saveCart();
  }

  getSubtotal() {
    return this.items.reduce((sum, item) => sum + (item.priceGHS * item.quantity), 0);
  }

  getDeliveryFee() {
    if (!this.deliverySelect) return 0;
    const val = this.deliverySelect.value;
    if (val === 'accra') return 35;
    if (val === 'nationwide') return 50;
    return 0; // FHUC Campus Pickup M306 or Campus Delivery is FREE
  }

  getTotal() {
    return this.getSubtotal() + this.getDeliveryFee();
  }

  getTotalCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  openDrawer() {
    if (this.drawer && this.drawerOverlay) {
      this.drawer.classList.add('is-open');
      this.drawerOverlay.classList.add('is-visible');
      document.body.classList.add('no-scroll');
    }
  }

  closeDrawer() {
    if (this.drawer && this.drawerOverlay) {
      this.drawer.classList.remove('is-open');
      this.drawerOverlay.classList.remove('is-visible');
      document.body.classList.remove('no-scroll');
    }
  }

  updateUI() {
    const count = this.getTotalCount();
    this.cartCountBadges.forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'inline-flex' : 'none';
    });

    if (!this.cartItemsList) return;

    if (this.items.length === 0) {
      this.cartItemsList.innerHTML = `
        <div class="empty-cart-state">
          <div class="empty-cart-icon"></div>
          <h4>Your MedROBE Bag is Empty</h4>
          <p>Explore our medical scrubs, labcoats, stethoscopes & clinical kits to build your order.</p>
          <button class="btn btn-primary btn-sm" onclick="window.MedROBECart.closeDrawer(); window.location.hash='#catalog';">
            Browse Catalog
          </button>
        </div>
      `;
      if (this.cartSubtotal) this.cartSubtotal.textContent = `GH₵ 0`;
      if (this.cartTotal) this.cartTotal.textContent = `GH₵ 0`;
      return;
    }

    let html = '';
    this.items.forEach((item, index) => {
      let customBadge = '';
      if (item.customization) {
        customBadge = `
          <div class="cart-custom-details">
            <span class="custom-tag"> Custom Embroidery</span>
            <div class="custom-sub">${item.customization.embroideryName} • ${item.customization.threadColor}</div>
            <div class="custom-sub muted">${item.customization.embroideryDept}</div>
          </div>
        `;
      }

      html += `
        <div class="cart-item-row" data-index="${index}">
          <img src="${item.image}" alt="${item.name}" class="cart-item-thumb">
          <div class="cart-item-info">
            <div class="cart-item-title">${item.name}</div>
            <div class="cart-item-variant">
              <span>Size: <strong>${item.size}</strong></span> | 
              <span>Color: <strong>${item.color}</strong></span>
            </div>
            ${customBadge}
            <div class="cart-item-pricing">
              <span class="cart-item-price">GH₵ ${item.priceGHS * item.quantity}</span>
              <span class="cart-item-unit muted">(${item.quantity} × GH₵ ${item.priceGHS})</span>
            </div>
          </div>
          <div class="cart-item-actions">
            <div class="qty-stepper">
              <button class="qty-btn" onclick="window.MedROBECart.updateQuantity(${index}, ${item.quantity - 1})">-</button>
              <span class="qty-num">${item.quantity}</span>
              <button class="qty-btn" onclick="window.MedROBECart.updateQuantity(${index}, ${item.quantity + 1})">+</button>
            </div>
            <button class="cart-remove-btn" title="Remove item" onclick="window.MedROBECart.removeItem(${index})">
              &times;
            </button>
          </div>
        </div>
      `;
    });

    this.cartItemsList.innerHTML = html;

    const subtotal = this.getSubtotal();
    const total = this.getTotal();
    if (this.cartSubtotal) this.cartSubtotal.textContent = `GH₵ ${subtotal}`;
    if (this.cartTotal) this.cartTotal.textContent = `GH₵ ${total}`;
  }

  generateWhatsAppMessage() {
    const custName = (document.getElementById('checkout-name')?.value || '').trim();
    const custPhone = (document.getElementById('checkout-phone')?.value || '').trim();
    const custDelivery = document.getElementById('cart-delivery-method')?.selectedOptions[0]?.text || 'FHUC Campus Pickup (Room M306)';
    const custLocationNote = (document.getElementById('checkout-location')?.value || '').trim();
    const custSpecialNote = (document.getElementById('checkout-notes')?.value || '').trim();

    if (!custName) {
      alert('Please enter your Name before sending the WhatsApp order.');
      document.getElementById('checkout-name')?.focus();
      return null;
    }

    if (this.items.length === 0) {
      alert('Your bag is empty! Please add products before checking out.');
      return null;
    }

    let msg = ` *NEW ORDER: MedROBE & Accessories by Lene* \n`;
    msg += `------------------------------------\n`;
    msg += `👤 *Customer Name:* ${custName}\n`;
    if (custPhone) msg += ` *Phone / WhatsApp:* ${custPhone}\n`;
    msg += ` *Delivery / Collection:* ${custDelivery}\n`;
    if (custLocationNote) msg += `🏫 *Hostel / Room / Address:* ${custLocationNote}\n`;
    msg += `------------------------------------\n`;
    msg += ` *ORDER ITEMS (${this.getTotalCount()} items):*\n\n`;

    this.items.forEach((item, i) => {
      msg += `${i + 1}. *${item.name}*\n`;
      msg += `   • Size: ${item.size} | Color: ${item.color}\n`;
      msg += `   • Qty: ${item.quantity} | Subtotal: GH₵ ${item.priceGHS * item.quantity}\n`;
      if (item.customization) {
        msg += `    *Custom Embroidery:* "${item.customization.embroideryName}"\n`;
        msg += `      - Dept: ${item.customization.embroideryDept}\n`;
        if (item.customization.embroiderySubDept) msg += `      - Unit: ${item.customization.embroiderySubDept}\n`;
        msg += `      - Thread Color: ${item.customization.threadColor}\n`;
      }
      msg += `\n`;
    });

    msg += `------------------------------------\n`;
    msg += `💵 *Subtotal:* GH₵ ${this.getSubtotal()}\n`;
    if (this.getDeliveryFee() > 0) {
      msg += `🚚 *Delivery Fee:* GH₵ ${this.getDeliveryFee()}\n`;
    } else {
      msg += `🚚 *Delivery / Pickup:* FREE (FHUC Campus / Room M306)\n`;
    }
    msg += `💰 *TOTAL ESTIMATED:* GH₵ ${this.getTotal()}\n`;
    msg += `------------------------------------\n`;
    if (custSpecialNote) {
      msg += `📝 *Customer Notes:* ${custSpecialNote}\n`;
      msg += `------------------------------------\n`;
    }
    msg += ` *Sent via MedROBE by Lene Official Showcase*\n`;
    msg += ` *FHUC Hub: Room M306 | Phone: 0245636351*`;

    return msg;
  }

  sendWhatsAppOrder() {
    const text = this.generateWhatsAppMessage();
    if (!text) return;

    const encoded = encodeURIComponent(text);
    const waUrl = `https://wa.me/${this.phone}?text=${encoded}`;
    
    // Open in new window or tab
    window.open(waUrl, '_blank');
  }

  init() {
    // Delivery selection change listener
    if (this.deliverySelect) {
      this.deliverySelect.addEventListener('change', () => this.updateUI());
    }

    // Bag open / close trigger listeners
    document.querySelectorAll('.open-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openDrawer();
      });
    });

    document.querySelectorAll('.close-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.closeDrawer();
      });
    });

    if (this.drawerOverlay) {
      this.drawerOverlay.addEventListener('click', () => this.closeDrawer());
    }

    const checkoutSubmitBtn = document.getElementById('cart-whatsapp-checkout-btn');
    if (checkoutSubmitBtn) {
      checkoutSubmitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.sendWhatsAppOrder();
      });
    }

    this.updateUI();
  }
}

// Global instance
window.addEventListener('DOMContentLoaded', () => {
  window.MedROBECart = new MedROBECart();
});
