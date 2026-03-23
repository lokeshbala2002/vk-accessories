/* ============================================================
   VK ACCESSORIES — script.js
   ============================================================ */
document.addEventListener("DOMContentLoaded", function () {

  // 👉 Page ready aana apram code run aagum
  console.log("✅ VK Accessories initialized");

  // Check if Firebase is ready
  if (typeof firebase === "undefined") {
    console.error("❌ Firebase not loaded");
    return;
  }

  const form = document.getElementById("checkoutForm");

  if (!form) {
    console.warn("⚠️ Checkout form not found on this page");
    return;
  }

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    console.log("📝 Checkout submitted, processing order...");

    const name = document.getElementById("checkoutName").value;
    const phone = document.getElementById("checkoutPhone").value;
    const address = document.getElementById("checkoutAddress").value;
    const pincode = document.getElementById("checkoutPincode").value;
    const house = document.getElementById("checkoutHouse").value;
    const city = document.getElementById("checkoutCity").value;
    const state = document.getElementById("checkoutState").value;

    if (!name || !phone || !address || !pincode || !house || !city || !state) {
      alert("⚠️ Please fill all required fields!");
      return;
    }

    // Check if cart is empty
    if (cartItems.length === 0) {
      alert("⚠️ Your cart is empty! Please add items before checkout.");
      return;
    }

    // Calculate order total
    let orderTotal = 0;
    cartItems.forEach(item => {
      const price = parseFloat(item.price.replace(/[₹,]/g, ''));
      orderTotal += price * item.qty;
    });

    // Add order to Firestore (checkout form)
    db.collection("orders").add({
      orderType: "checkout",
      name: name,
      phone: phone,
      delivery: {
        pincode: pincode,
        house: house,
        address: address,
        city: city,
        state: state
      },
      items: cartItems, // Include cart items
      total: orderTotal,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      status: "pending"
    })
    .then((docRef) => {
      console.log("✅ Order saved! ID:", docRef.id);
      alert("✅ Order placed successfully! Order ID: " + docRef.id);

      // Send WhatsApp notification
      const whatsappNumber = "918270534479";
      let message = `New Order:%0AOrder ID: ${docRef.id}%0AName: ${name}%0APhone: ${phone}%0ADelivery: ${house}, ${address}, ${city}, ${state}, ${pincode}%0A%0AItems:`;

      cartItems.forEach(item => {
        message += `%0A- ${item.name} (Qty: ${item.qty}) - ${item.price}`;
      });

      message += `%0A%0ATotal: ₹${orderTotal.toLocaleString('en-IN')}`;

      window.open(
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
        "_blank"
      );

      form.reset();
    })
    .catch((error) => {
      console.error("❌ Firestore Error:", error.code, error.message);
      alert("❌ Error: " + error.message + "\n\nPlease check browser console for details.");
    });

  });

});

// ---- Product Data ----
const products = [
  {
    id: 1,
    name: "Graduated Link Necklace Gold...",
    price: "₹31,580",
    oldPrice: "₹29,350",
    rating: 4.5,
    reviews: 38,
    img: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=400&q=80",
    cat: "Earrings"
  },
  {
    id: 2,
    name: "Graduated Link Necklace Gold...",
    price: "₹31,580",
    oldPrice: "₹29,350",
    rating: 4.5,
    reviews: 38,
    img: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&q=80",
    cat: "Earrings"
  },
  {
    id: 3,
    name: "Graduated Link Necklace Gold...",
    price: "₹31,580",
    oldPrice: "₹29,350",
    rating: 4.5,
    reviews: 38,
    img: "https://images.unsplash.com/photo-1603974372039-adc49044b6bd?w=400&q=80",
    cat: "Earrings"
  },
  {
    id: 4,
    name: "Graduated Link Necklace Gold...",
    price: "₹31,580",
    oldPrice: "₹29,350",
    rating: 4.5,
    reviews: 38,
    img: "https://images.unsplash.com/photo-1602163474044-bdda8777c0be?w=400&q=80",
    cat: "Earrings"
  },
  {
    id: 5,
    name: "Graduated Link Necklace Gold...",
    price: "₹31,580",
    oldPrice: "₹29,350",
    rating: 4.5,
    reviews: 38,
    img: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=400&q=80",
    cat: "Necklaces"
  },
  {
    id: 6,
    name: "Graduated Link Necklace Gold...",
    price: "₹31,580",
    oldPrice: "₹29,350",
    rating: 4.5,
    reviews: 38,
    img: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=400&q=80",
    cat: "Necklaces"
  },
  {
    id: 7,
    name: "Graduated Link Necklace Gold...",
    price: "₹31,580",
    oldPrice: "₹29,350",
    rating: 4.5,
    reviews: 38,
    img: "https://images.unsplash.com/photo-1601121141461-9d6647bef0a1?w=400&q=80",
    cat: "Necklaces"
  },
  {
    id: 8,
    name: "Graduated Link Necklace Gold...",
    price: "₹31,580",
    oldPrice: "₹29,350",
    rating: 4.5,
    reviews: 38,
    img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80",
    cat: "Necklaces"
  }
];

// ---- Cart Data ----
const cartItems = [
  {
    id: 1,
    name: "Golden Butterfly Tiny Studded Affair Earrings With Black Chain",
    sku: "FER0381B",
    colour: "Silver",
    size: "10mm",
    qty: 1,
    price: "₹31,580",
    oldPrice: "₹29,350",
    img: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=200&q=80"
  },
  {
    id: 2,
    name: "Golden Butterfly Tiny Studded Affair Earrings With Black Chain",
    sku: "FER0381B",
    colour: "Silver",
    size: "10mm",
    qty: 1,
    price: "₹31,580",
    oldPrice: "₹29,350",
    img: "https://images.unsplash.com/photo-1602163474044-bdda8777c0be?w=200&q=80"
  }
];

// ---- Thumb Images for Product Detail ----
const thumbImgs = [
  "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=700&q=80",
  "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=700&q=80",
  "https://images.unsplash.com/photo-1603974372039-adc49044b6bd?w=700&q=80",
  "https://images.unsplash.com/photo-1602163474044-bdda8777c0be?w=700&q=80"
];

// ---- Current active page tracking ----
let activePage = 'home';

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  renderFeaturedGrid();
  renderEarringsGrid();
  renderAlsoLikeGrid();
  renderCartItems();
  initScrollAnimations();
  initSizeButtons();
  initColourSwatches();
  initPaymentOptions();
  showHomePage();
});

// ============================================================
// NAVBAR
// ============================================================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (mobileMenu.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      mobileMenu.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
}

window.closeMobileMenu = function() {
  const mobileMenu = document.getElementById('mobileMenu');
  mobileMenu.classList.remove('open');
  document.querySelectorAll('.hamburger span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
};

// ============================================================
// PAGE NAVIGATION
// ============================================================
const HOME_SECTIONS = ['home', 'categories', 'featured', 'offers'];

window.showHomePage = function() {
  // Hide all page sections
  document.querySelectorAll('.page-section').forEach(s => s.classList.add('hidden'));
  document.querySelectorAll('.page-section').forEach(s => s.style.display = 'none');

  // Show home sections
  const homeSections = document.querySelectorAll(
    '.hero-section, .categories-section, #featured, .offers-section, .combos-section, .instagram-section, .fresh-drop-banner'
  );
  homeSections.forEach(s => s.style.display = '');

  activePage = 'home';
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.showSection = function(sectionName) {
  // Hide home content
  const homeSections = document.querySelectorAll(
    '.hero-section, .categories-section, #featured, .offers-section, .combos-section, .instagram-section, .fresh-drop-banner'
  );
  homeSections.forEach(s => s.style.display = 'none');

  // Hide all page sections
  document.querySelectorAll('.page-section').forEach(s => {
    s.style.display = 'none';
    s.classList.add('hidden');
  });

  // Show requested section
  let targetId = '';
  if (sectionName === 'earrings') targetId = 'earrings-page';
  else if (sectionName === 'product') targetId = 'product-page';
  else if (sectionName === 'cart') {
    targetId = 'cart-page';
    closeCartPanel();
  }
  else if (sectionName === 'checkout') {
    targetId = 'checkout-page';
    closeCartPanel();
    renderCheckoutSummary(); // Update checkout summary with current cart
  }

  if (targetId) {
    const el = document.getElementById(targetId);
    if (el) {
      el.style.display = 'block';
      el.classList.remove('hidden');
    }
  }

  activePage = sectionName;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// ============================================================
// PRODUCT GRIDS
// ============================================================
function createProductCard(p, showOutlineBtn = false) {
  const stars = '★'.repeat(Math.floor(p.rating)) + (p.rating % 1 ? '½' : '');
  const btnClass = showOutlineBtn ? 'btn-add-cart outline-btn' : 'btn-add-cart';
  const btnLabel = showOutlineBtn ? 'Add to Cart' : 'Add to Cart';

  return `
    <div class="product-card" onclick="openProduct(${p.id})">
      <div class="product-card-img">
        <img src="${p.img}" alt="${p.name}" loading="lazy" />
        <button class="wishlist-btn" onclick="toggleWishlist(event, this)" aria-label="Wishlist">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>
      <div class="product-card-body">
        <div class="product-card-price">
          <span class="price-new">${p.price}</span>
          <span class="price-old">${p.oldPrice}</span>
        </div>
        <p class="product-card-name">${p.name}</p>
        <div class="product-card-stars">
          <span>${stars}</span>
          <span>(${p.reviews})</span>
        </div>
        <button class="${btnClass}" onclick="addToCart(event)">${btnLabel}</button>
      </div>
    </div>
  `;
}

function renderFeaturedGrid() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;
  grid.innerHTML = products.map((p, i) => createProductCard(p, i % 2 === 1)).join('');
}

function renderEarringsGrid() {
  const grid = document.getElementById('earringsGrid');
  if (!grid) return;
  const earringsProducts = [...products, ...products.slice(0, 4)].map(p => ({...p}));
  grid.innerHTML = earringsProducts.map((p, i) => createProductCard(p, i % 2 === 1)).join('');
}

function renderAlsoLikeGrid() {
  const grid = document.getElementById('alsoLikeGrid');
  if (!grid) return;
  grid.innerHTML = products.map((p, i) => createProductCard(p, i % 2 === 1)).join('');
}

window.openProduct = function(id) {
  showSection('product');
};

// ============================================================
// CART ITEMS
// ============================================================
function renderCartItems() {
  const container = document.getElementById('cartItems');
  if (!container) return;

  container.innerHTML = cartItems.map(item => `
    <div class="cart-item" id="cart-item-${item.id}">
      <div class="cart-item-img">
        <img src="${item.img}" alt="${item.name}" />
      </div>
      <div class="cart-item-details">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-sku">${item.sku}</p>
        <p class="cart-item-meta">Colour: <strong>${item.colour}</strong> &nbsp;|&nbsp; Size: <strong>${item.size}</strong></p>
        <p class="option-label" style="font-size:12px; margin-bottom:8px">Quantity</p>
        <div class="qty-control">
          <button class="qty-btn" onclick="changeCartQty(${item.id}, -1)">-</button>
          <span class="qty-val" id="cart-qty-${item.id}">${item.qty}</span>
          <button class="qty-btn" onclick="changeCartQty(${item.id}, 1)">+</button>
        </div>
      </div>
      <div class="cart-item-price">
        <span class="price-current">${item.price}</span><br/>
        <span class="price-original">${item.oldPrice}</span>
      </div>
      <div style="display:flex; flex-direction:column; gap:8px; align-self:flex-start">
        <button class="cart-action-btn" onclick="removeCartItem(${item.id})">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
          Delete
        </button>
        <button class="cart-action-btn" onclick="showToast('Added to Wishlist ♡')">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          Move to Wishlist
        </button>
      </div>
    </div>
  `).join('');
}

window.changeCartQty = function(id, delta) {
  const item = cartItems.find(c => c.id === id);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  const el = document.getElementById(`cart-qty-${id}`);
  if (el) el.textContent = item.qty;
};

window.removeCartItem = function(id) {
  const el = document.getElementById(`cart-item-${id}`);
  if (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateX(-20px)';
    el.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      const idx = cartItems.findIndex(c => c.id === id);
      if (idx !== -1) cartItems.splice(idx, 1);
      renderCartItems();
      updateCartBadge();
    }, 300);
  }
  showToast('Item removed from cart');
};

function updateCartBadge() {
  const badge = document.getElementById('cartBadge');
  const count = document.getElementById('cartCount');
  if (badge) badge.textContent = cartItems.length;
  if (count) count.textContent = cartItems.length;
}

// ============================================================
// CHECKOUT SUMMARY
// ============================================================
function renderCheckoutSummary() {
  const container = document.getElementById('checkoutItemsContainer');
  const totalsContainer = document.getElementById('checkoutTotals');

  if (!container || !totalsContainer) return;

  // Render items
  container.innerHTML = cartItems.map(item => `
    <div class="checkout-item">
      <div class="checkout-item-img-wrap">
        <img src="${item.img}" alt="${item.name}" />
        <span class="checkout-qty-badge">${item.qty}</span>
      </div>
      <div class="checkout-item-info">
        <p>${item.name}</p>
        <p class="checkout-sku">${item.sku}</p>
        <p class="checkout-meta">Colour: <strong>${item.colour}</strong> &nbsp;|&nbsp; Size: <strong>${item.size}</strong></p>
      </div>
      <strong>${item.price}</strong>
    </div>
  `).join('');

  // Calculate totals
  let subtotal = 0;
  cartItems.forEach(item => {
    const price = parseFloat(item.price.replace(/[₹,]/g, ''));
    subtotal += price * item.qty;
  });
  const deliveryFee = 60; // Fixed delivery fee
  const total = subtotal + deliveryFee;

  // Render totals
  totalsContainer.innerHTML = `
    <div class="checkout-total-row">
      <div>
        <span>Subtotal (${cartItems.length})</span>
        <p class="tax-small">MRP incl. of all taxes</p>
      </div>
      <span>₹${subtotal.toLocaleString('en-IN')}</span>
    </div>
    <div class="checkout-total-row">
      <span>Delivery Fee</span>
      <span>₹${deliveryFee}</span>
    </div>
    <div class="checkout-total-row total-row-big">
      <strong>Total Amount</strong>
      <strong class="total-price">₹${total.toLocaleString('en-IN')}</strong>
    </div>
  `;
}

// ============================================================
// CART PANEL
// ============================================================
window.toggleCart = function() {
  const panel = document.getElementById('cartPanel');
  const overlay = document.getElementById('cartPanelOverlay');
  panel.classList.toggle('open');
  overlay.classList.toggle('open');
  document.body.style.overflow = panel.classList.contains('open') ? 'hidden' : '';
};

function closeCartPanel() {
  const panel = document.getElementById('cartPanel');
  const overlay = document.getElementById('cartPanelOverlay');
  panel.classList.remove('open');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

// ============================================================
// PRODUCT DETAIL
// ============================================================
let productQty = 1;

window.changeQty = function(delta) {
  productQty = Math.max(1, productQty + delta);
  const el = document.getElementById('productQty');
  if (el) el.textContent = productQty;
};

let panelQtyVal = 1;

window.changePanelQty = function(delta) {
  panelQtyVal = Math.max(1, panelQtyVal + delta);
  const el = document.getElementById('panelQty');
  if (el) el.textContent = panelQtyVal;
};

window.switchMainImg = function(idx) {
  const mainImg = document.getElementById('mainProductImg');
  const thumbs = document.querySelectorAll('.thumb');
  if (mainImg) mainImg.src = thumbImgs[idx];
  thumbs.forEach((t, i) => t.classList.toggle('active', i === idx));
};

window.addToCartDetail = function() {
  toggleCart();
  showToast('Item added to cart!');
  updateCartBadge();
};

// ============================================================
// SIZE BUTTONS
// ============================================================
function initSizeButtons() {
  document.querySelectorAll('.size-options').forEach(group => {
    group.querySelectorAll('.size-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        group.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  });
}

// ============================================================
// COLOUR SWATCHES
// ============================================================
function initColourSwatches() {
  document.querySelectorAll('.colour-swatch').forEach(swatch => {
    swatch.addEventListener('click', () => {
      const parent = swatch.closest('.colour-options');
      parent.querySelectorAll('.colour-swatch').forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
    });
  });
}

// ============================================================
// PAYMENT OPTIONS
// ============================================================
function initPaymentOptions() {
  document.querySelectorAll('.payment-option').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.payment-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
    });
  });
}

// ============================================================
// ADD TO CART (from grid)
// ============================================================
window.addToCart = function(e) {
  e.stopPropagation();
  toggleCart();
  showToast('Item added to cart!');
  updateCartBadge();
};

// ============================================================
// WISHLIST TOGGLE
// ============================================================
window.toggleWishlist = function(e, btn) {
  e.stopPropagation();
  btn.classList.toggle('active');
  showToast(btn.classList.contains('active') ? 'Added to Wishlist ♡' : 'Removed from Wishlist');
};

// ============================================================
// ACCORDION
// ============================================================
window.toggleAccordion = function(btn) {
  const body = btn.nextElementSibling;
  const isOpen = btn.classList.contains('open');

  // Close all
  document.querySelectorAll('.accordion-head').forEach(h => {
    h.classList.remove('open');
    h.nextElementSibling.classList.remove('show');
  });

  if (!isOpen) {
    btn.classList.add('open');
    body.classList.add('show');
  }
};

// ============================================================
// SCROLL ANIMATIONS
// ============================================================
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

// Re-run scroll animations when sections become visible
function reinitScrollAnimations() {
  setTimeout(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    document.querySelectorAll('.animate-on-scroll:not(.visible)').forEach(el => {
      observer.observe(el);
    });
  }, 100);
}

// ============================================================
// TOAST
// ============================================================
let toastTimeout;

window.showToast = function(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 2800);
};

// ============================================================
// ICON ACTIONS
// ============================================================
window.showWishlistToast = function() {
  showToast('Your wishlist is empty. Start adding items!');
};

window.showAccountToast = function() {
  showToast('Account feature coming soon!');
};

// ============================================================
// SMOOTH SCROLL for anchor links
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ============================================================
// INITIAL PAGE SETUP (show home, hide page sections)
// ============================================================
(function setup() {
  document.querySelectorAll('.page-section').forEach(s => {
    s.style.display = 'none';
    s.classList.add('hidden');
  });
})();
// ===== ORDER SYSTEM =====
if (false) {

const form = document.getElementById("orderForm");

if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const product = document.getElementById("product").value;
    const quantity = document.getElementById("quantity").value;

    // Firebase save
    firebase.firestore().collection("orders").add({
      name,
      phone,
      address,
      product,
      quantity,
      date: new Date()
    });

    // WhatsApp message
    const message =
      `New Order:%0AName: ${name}%0APhone: ${phone}%0AAddress: ${address}%0AProduct: ${product}%0AQty: ${quantity}`;

    const whatsappNumber = "918270534479";

    window.open(
      `https://wa.me/${whatsappNumber}?text=${message}`,
      "_blank"
    );
  });
}}
