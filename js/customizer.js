/**
 * MedROBE & Accessories by Lene - Live Scrub & Labcoat Embroidery Customizer
 * Real-time dynamic visual preview of custom embroidered medical apparel
 */

document.addEventListener('DOMContentLoaded', () => {
  initCustomizer();
});

function initCustomizer() {
  const nameInput = document.getElementById('custom-name');
  const deptInput = document.getElementById('custom-dept');
  const subDeptInput = document.getElementById('custom-subdept');
  const apparelTypeInputs = document.querySelectorAll('input[name="apparel-type"]');
  const fabricColorBtns = document.querySelectorAll('.fabric-color-btn');
  const threadColorBtns = document.querySelectorAll('.thread-color-btn');
  const fontSelect = document.getElementById('custom-font');
  const iconSelect = document.getElementById('custom-icon');
  const sizeSelect = document.getElementById('custom-size');
  
  // Preview Elements
  const previewPocket = document.getElementById('embroidery-preview-pocket');
  const previewName = document.getElementById('preview-text-name');
  const previewDept = document.getElementById('preview-text-dept');
  const previewSubDept = document.getElementById('preview-text-subdept');
  const previewIcon = document.getElementById('preview-icon-wrapper');
  const priceDisplay = document.getElementById('customizer-price-val');
  const addToCartBtn = document.getElementById('add-custom-to-cart-btn');

  if (!previewPocket) return;

  let state = {
    apparel: 'scrub', // 'scrub' or 'labcoat'
    name: 'Dr. Charlene O. Asare',
    dept: 'Family Health Medical School',
    subDept: 'Dept. of Medicine',
    fabricColorHex: '#631d36',
    fabricColorName: 'Burgundy Wine',
    threadColorHex: '#f59e0b',
    threadColorName: 'Champagne Gold',
    font: 'serif',
    icon: 'caduceus',
    size: 'M',
    basePrice: 420,
    embroideryFee: 40
  };

  const ICONS_SVG = {
    none: '',
    caduceus: `<svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M8 5a4 4 0 0 1 8 0c0 3-4 5-4 8 0-3-4-5-4-8z"/><path d="M12 9c3 1.5 5 4 5 7 0 2-2 3-5 3s-5-1-5-3c0-3 2-5.5 5-7z"/><circle cx="12" cy="2.5" r="1.5" fill="currentColor"/></svg>`,
    heartbeat: `<svg viewBox="0 0 24 24" width="30" height="30" stroke="currentColor" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.5 12h3l2-4 3 8 2-4h4"/></svg>`,
    stethoscope: `<svg viewBox="0 0 24 24" width="30" height="30" stroke="currentColor" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 3v5a4.5 4.5 0 0 0 9 0V3"/><path d="M9 12.5v4.25a3.25 3.25 0 0 0 6.5 0v-2"/><circle cx="15.5" cy="12.5" r="2.5"/></svg>`,
    fhuc: `<svg viewBox="0 0 24 24" width="30" height="30" stroke="currentColor" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 3 7v9l9 5 9-5V7l-9-5Z"/><path d="M12 22V12"/><path d="m12 12 7.5-4.2"/><path d="M12 12 4.5 7.8"/></svg>`
  };

  function updatePreview() {
    // Update texts
    previewName.textContent = state.name.trim() || 'Dr. Your Name';
    previewDept.textContent = state.dept.trim() || 'Family Health University';
    previewSubDept.textContent = state.subDept.trim() || '';
    previewSubDept.style.display = state.subDept.trim() ? 'block' : 'none';

    // Update colors
    previewPocket.style.backgroundColor = state.fabricColorHex;
    previewPocket.style.color = state.threadColorHex;
    previewName.style.color = state.threadColorHex;
    previewDept.style.color = state.threadColorHex;
    previewSubDept.style.color = state.threadColorHex;

    // Update icon
    previewIcon.innerHTML = ICONS_SVG[state.icon] || '';
    previewIcon.style.color = state.threadColorHex;

    // Update font class
    previewName.className = 'preview-text-name font-' + state.font;
    previewDept.className = 'preview-text-dept font-' + state.font;

    // Update apparel styling
    if (state.apparel === 'labcoat') {
      previewPocket.classList.add('is-labcoat');
      state.basePrice = 350;
    } else {
      previewPocket.classList.remove('is-labcoat');
      state.basePrice = 420;
    }

    const totalPrice = state.basePrice + state.embroideryFee;
    if (priceDisplay) {
      priceDisplay.textContent = `GH₵ ${totalPrice}`;
    }
  }

  // Event Listeners
  if (nameInput) {
    nameInput.addEventListener('input', (e) => {
      state.name = e.target.value;
      updatePreview();
    });
  }

  if (deptInput) {
    deptInput.addEventListener('input', (e) => {
      state.dept = e.target.value;
      updatePreview();
    });
  }

  if (subDeptInput) {
    subDeptInput.addEventListener('input', (e) => {
      state.subDept = e.target.value;
      updatePreview();
    });
  }

  apparelTypeInputs.forEach(input => {
    input.addEventListener('change', (e) => {
      state.apparel = e.target.value;
      if (state.apparel === 'labcoat') {
        // Default to white for labcoat if current is dark
        state.fabricColorHex = '#ffffff';
        state.fabricColorName = 'Pure White';
        state.threadColorHex = '#d97706';
        state.threadColorName = 'Champagne Gold';
      }
      updatePreview();
    });
  });

  fabricColorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      fabricColorBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.fabricColorHex = btn.dataset.hex;
      state.fabricColorName = btn.dataset.name;
      updatePreview();
    });
  });

  threadColorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      threadColorBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.threadColorHex = btn.dataset.hex;
      state.threadColorName = btn.dataset.name;
      updatePreview();
    });
  });

  if (fontSelect) {
    fontSelect.addEventListener('change', (e) => {
      state.font = e.target.value;
      updatePreview();
    });
  }

  if (iconSelect) {
    iconSelect.addEventListener('change', (e) => {
      state.icon = e.target.value;
      updatePreview();
    });
  }

  if (sizeSelect) {
    sizeSelect.addEventListener('change', (e) => {
      state.size = e.target.value;
    });
  }

  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      const customItem = {
        id: `custom-${Date.now()}`,
        name: `Custom Embroidered ${state.apparel === 'labcoat' ? 'Executive Labcoat' : 'Elite Scrub Jogger Set'}`,
        priceGHS: state.basePrice + state.embroideryFee,
        size: state.size,
        color: state.fabricColorName,
        image: state.apparel === 'labcoat' ? 'assets/images/labcoat.jpg' : 'assets/images/scrubs-wine.jpg',
        customization: {
          embroideryName: state.name || 'Dr. Custom',
          embroideryDept: state.dept || 'Family Health University',
          embroiderySubDept: state.subDept || '',
          threadColor: state.threadColorName,
          crestIcon: state.icon
        },
        quantity: 1
      };

      if (window.MedROBECart) {
        window.MedROBECart.addItem(customItem);
        window.MedROBECart.openDrawer();
        if (window.showToast) {
          window.showToast('Custom garment added to your WhatsApp order bag!');
        }
      }
    });
  }

  // Initial render
  updatePreview();
}
