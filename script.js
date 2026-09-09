/* =========================================================
   DEFAULT PRODUCTS
========================================================= */

const defaultProducts = [
    {
        id: 1,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 2499,
        stock: 18,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85",
        description: "Comfortable wireless headphones with clear sound, long battery life and a modern everyday design."
    },
    {
        id: 2,
        name: "Smart Watch",
        category: "Electronics",
        price: 3299,
        stock: 12,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85",
        description: "A stylish smartwatch for notifications, activity tracking and everyday convenience."
    },
    {
        id: 3,
        name: "Premium Backpack",
        category: "Fashion",
        price: 1899,
        stock: 22,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85",
        description: "A practical premium backpack for work, travel and everyday use."
    },
    {
        id: 4,
        name: "Running Sneakers",
        category: "Fashion",
        price: 2799,
        stock: 15,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
        description: "Lightweight sneakers designed for comfort, walking and daily activity."
    },
    {
        id: 5,
        name: "Minimal Table Lamp",
        category: "Home",
        price: 1499,
        stock: 8,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85",
        description: "Minimal modern table lamp that adds warm lighting to your room."
    },
    {
        id: 6,
        name: "Ceramic Coffee Mug",
        category: "Home",
        price: 599,
        stock: 30,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?auto=format&fit=crop&w=900&q=85",
        description: "Clean ceramic coffee mug for your morning coffee and tea."
    },
    {
        id: 7,
        name: "Portable Bluetooth Speaker",
        category: "Electronics",
        price: 2199,
        stock: 14,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=85",
        description: "Portable speaker with powerful sound and compact design."
    },
    {
        id: 8,
        name: "Classic Sunglasses",
        category: "Fashion",
        price: 1299,
        stock: 20,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85",
        description: "Classic sunglasses with a versatile everyday frame."
    },
    {
        id: 9,
        name: "Modern Desk Organizer",
        category: "Home",
        price: 799,
        stock: 16,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=900&q=85",
        description: "Keep your desk clean and organized with this simple organizer."
    },
    {
        id: 10,
        name: "Fitness Bottle",
        category: "Lifestyle",
        price: 899,
        stock: 25,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=85",
        description: "Reusable fitness bottle for gym, travel and daily hydration."
    },
    {
        id: 11,
        name: "Travel Wallet",
        category: "Lifestyle",
        price: 1099,
        stock: 13,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=85",
        description: "Compact travel wallet with enough space for cards and essentials."
    },
    {
        id: 12,
        name: "Wireless Mouse",
        category: "Electronics",
        price: 999,
        stock: 19,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=85",
        description: "Smooth and comfortable wireless mouse for work and everyday use."
    }
];


const defaultCategories = [
    "Electronics",
    "Fashion",
    "Home",
    "Lifestyle"
];


const orderStatuses = [
    "Placed",
    "Confirmed",
    "Packed",
    "Shipped",
    "Delivered"
];


/* =========================================================
   LOCAL STORAGE
========================================================= */

let products = JSON.parse(
    localStorage.getItem("cartivoProducts")
) || defaultProducts;

let categories = JSON.parse(
    localStorage.getItem("cartivoCategories")
) || defaultCategories;

let cart = JSON.parse(
    localStorage.getItem("cartivoCart")
) || [];

let wishlist = JSON.parse(
    localStorage.getItem("cartivoWishlist")
) || [];

let orders = JSON.parse(
    localStorage.getItem("cartivoOrders")
) || [];

let currentUser = JSON.parse(
    localStorage.getItem("cartivoCurrentUser")
) || null;


/* =========================================================
   HELPERS
========================================================= */

function saveData() {

    localStorage.setItem(
        "cartivoProducts",
        JSON.stringify(products)
    );

    localStorage.setItem(
        "cartivoCategories",
        JSON.stringify(categories)
    );

    localStorage.setItem(
        "cartivoCart",
        JSON.stringify(cart)
    );

    localStorage.setItem(
        "cartivoWishlist",
        JSON.stringify(wishlist)
    );

    localStorage.setItem(
        "cartivoOrders",
        JSON.stringify(orders)
    );

    localStorage.setItem(
        "cartivoCurrentUser",
        JSON.stringify(currentUser)
    );
}


function money(value) {

    return "₹" + Number(value || 0).toLocaleString("en-IN");
}


function escapeHTML(value) {

    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


function getProduct(id) {

    return products.find(
        product => Number(product.id) === Number(id)
    );
}


function showToast(message) {

    const toast = document.getElementById("toast");

    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}


/* =========================================================
   LOGIN
========================================================= */

document
    .getElementById("loginForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value.trim();

        if (!email || !password) {
            showToast("Please enter email and password.");
            return;
        }

        const isAdmin =
            email.toLowerCase() === "admin@cartivo.com" &&
            password === "admin123";

        currentUser = {
            name: isAdmin ? "Cartivo Admin" : email.split("@")[0],
            email: email,
            role: isAdmin ? "admin" : "customer"
        };

        saveData();

        document
            .getElementById("loginPage")
            .classList.add("hidden");

        if (isAdmin) {
            openAdmin();
        } else {
            document
                .getElementById("storePage")
                .classList.remove("hidden");

            refreshStore();
        }

        showToast(
            isAdmin
                ? "Welcome to Admin Panel"
                : "Welcome to Cartivo"
        );
    });


/* =========================================================
   LOGOUT
========================================================= */

function logout() {

    currentUser = null;

    saveData();

    document
        .getElementById("storePage")
        .classList.add("hidden");

    document
        .getElementById("adminPage")
        .classList.add("hidden");

    document
        .getElementById("loginPage")
        .classList.remove("hidden");

    document
        .getElementById("loginForm")
        .reset();

    toggleProfileMenu(true);
}


/* =========================================================
   PROFILE
========================================================= */

function updateProfile() {

    if (!currentUser) return;

    const name =
        document.getElementById("profileName");

    const email =
        document.getElementById("profileEmail");

    const initial =
        document.getElementById("profileInitial");

    if (name) {
        name.textContent = currentUser.name;
    }

    if (email) {
        email.textContent = currentUser.email;
    }

    if (initial) {
        initial.textContent =
            currentUser.name.charAt(0).toUpperCase();
    }

    const adminButton =
        document.getElementById("adminMenuButton");

    if (adminButton) {

        adminButton.classList.toggle(
            "hidden",
            currentUser.role !== "admin"
        );
    }
}


function toggleProfileMenu(forceClose = false) {

    const menu =
        document.getElementById("profileMenu");

    if (!menu) return;

    if (forceClose) {
        menu.classList.add("hidden");
        return;
    }

    menu.classList.toggle("hidden");
}


/* =========================================================
   NAVIGATION
========================================================= */

function hideAllStoreSections() {

    [
        "homeSection",
        "shopSection",
        "wishlistSection",
        "ordersSection"
    ].forEach(id => {

        const element =
            document.getElementById(id);

        if (element) {
            element.classList.add("hidden");
        }
    });

    toggleProfileMenu(true);
}


function showHome() {

    hideAllStoreSections();

    document
        .getElementById("homeSection")
        .classList.remove("hidden");

    refreshStore();
}


function showShop() {

    hideAllStoreSections();

    document
        .getElementById("shopSection")
        .classList.remove("hidden");

    renderShop();
}


function showCategories() {

    showHome();

    setTimeout(() => {

        document
            .getElementById("categoriesSection")
            ?.scrollIntoView({
                behavior: "smooth"
            });

    }, 50);
}


function showWishlist() {

    hideAllStoreSections();

    document
        .getElementById("wishlistSection")
        .classList.remove("hidden");

    renderWishlist();
}


function showOrders() {

    hideAllStoreSections();

    document
        .getElementById("ordersSection")
        .classList.remove("hidden");

    renderOrders();
}


/* =========================================================
   SEARCH
========================================================= */

document
    .getElementById("globalSearch")
    .addEventListener("input", function() {

        const value =
            this.value.trim();

        if (!value) return;

        showShop();

        document
            .getElementById("shopSearch")
            .value = value;

        renderShop();
    });


document
    .getElementById("shopSearch")
    .addEventListener("input", renderShop);

document
    .getElementById("categoryFilter")
    .addEventListener("change", renderShop);

document
    .getElementById("priceFilter")
    .addEventListener("change", renderShop);

document
    .getElementById("sortFilter")
    .addEventListener("change", renderShop);


/* =========================================================
   CATEGORY RENDER
========================================================= */

function renderCategories() {

    const grid =
        document.getElementById("categoryGrid");

    if (!grid) return;

    const icons = {
        Electronics: "🎧",
        Fashion: "👟",
        Home: "🏠",
        Lifestyle: "✨"
    };

    grid.innerHTML = categories.map(category => {

        const count =
            products.filter(
                product => product.category === category
            ).length;

        return `
            <div
                class="category-card"
                onclick="filterCategory('${escapeHTML(category)}')"
            >
                <h3>${escapeHTML(category)}</h3>
                <p>${count} products</p>
                <div class="category-icon">
                    ${icons[category] || "✦"}
                </div>
            </div>
        `;

    }).join("");
}


function populateCategoryFilter() {

    const select =
        document.getElementById("categoryFilter");

    const adminSelect =
        document.getElementById("adminProductCategory");

    if (select) {

        select.innerHTML =
            `<option value="all">All Categories</option>` +
            categories.map(category =>
                `<option value="${escapeHTML(category)}">
                    ${escapeHTML(category)}
                </option>`
            ).join("");
    }

    if (adminSelect) {

        adminSelect.innerHTML =
            categories.map(category =>
                `<option value="${escapeHTML(category)}">
                    ${escapeHTML(category)}
                </option>`
            ).join("");
    }
}


function filterCategory(category) {

    showShop();

    document
        .getElementById("categoryFilter")
        .value = category;

    renderShop();
}


/* =========================================================
   PRODUCT CARD
========================================================= */

function productCard(product) {

    const isWishlisted =
        wishlist.includes(Number(product.id));

    const badge =
        Number(product.stock) <= 5
            ? "LOW STOCK"
            : Number(product.id) <= 4
                ? "POPULAR"
                : "";

    return `
        <article
            class="product-card"
            onclick="openProduct(${product.id})"
        >

            <div class="product-image-wrap">

                <img
                    src="${escapeHTML(product.image)}"
                    alt="${escapeHTML(product.name)}"
                    onerror="this.style.opacity='.2'"
                >

                ${
                    badge
                        ? `<span class="product-badge">
                            ${badge}
                           </span>`
                        : ""
                }

                <button
                    class="product-wishlist ${isWishlisted ? "active" : ""}"
                    onclick="event.stopPropagation(); toggleWishlist(${product.id})"
                >
                    ${isWishlisted ? "♥" : "♡"}
                </button>

            </div>

            <div class="product-info">

                <div class="product-category">
                    ${escapeHTML(product.category)}
                </div>

                <h3>
                    ${escapeHTML(product.name)}
                </h3>

                <div class="product-rating">
                    <span>
                        ★ ${product.rating}
                    </span>

                    <small>
                        Customer rating
                    </small>
                </div>

                <div class="product-bottom">

                    <strong class="product-price">
                        ${money(product.price)}
                    </strong>

                    <button
                        class="add-cart-btn"
                        onclick="event.stopPropagation(); addToCart(${product.id})"
                        ${product.stock <= 0 ? "disabled" : ""}
                    >
                        ${product.stock <= 0 ? "Sold Out" : "+ Cart"}
                    </button>

                </div>

            </div>

        </article>
    `;
}


/* =========================================================
   HOME PRODUCTS
========================================================= */

function renderHomeProducts() {

    const grid =
        document.getElementById("homeProducts");

    if (!grid) return;

    grid.innerHTML =
        products
            .slice(0, 8)
            .map(productCard)
            .join("");
}


/* =========================================================
   SHOP
========================================================= */

function renderShop() {

    const grid =
        document.getElementById("shopProducts");

    if (!grid) return;

    const search =
        document
            .getElementById("shopSearch")
            .value
            .toLowerCase()
            .trim();

    const category =
        document.getElementById("categoryFilter").value;

    const price =
        document.getElementById("priceFilter").value;

    const sort =
        document.getElementById("sortFilter").value;

    let filtered =
        [...products];

    if (search) {

        filtered =
            filtered.filter(product =>
                product.name.toLowerCase().includes(search) ||
                product.category.toLowerCase().includes(search)
            );
    }

    if (category !== "all") {

        filtered =
            filtered.filter(
                product => product.category === category
            );
    }

    if (price !== "all") {

        filtered =
            filtered.filter(product => {

                const p =
                    Number(product.price);

                if (price === "0-1000") {
                    return p < 1000;
                }

                if (price === "1000-3000") {
                    return p >= 1000 && p <= 3000;
                }

                if (price === "3000-10000") {
                    return p > 3000 && p <= 10000;
                }

                if (price === "10000+") {
                    return p > 10000;
                }

                return true;
            });
    }

    if (sort === "priceLow") {

        filtered.sort(
            (a,b) => a.price - b.price
        );
    }

    if (sort === "priceHigh") {

        filtered.sort(
            (a,b) => b.price - a.price
        );
    }

    if (sort === "rating") {

        filtered.sort(
            (a,b) => b.rating - a.rating
        );
    }

    if (sort === "name") {

        filtered.sort(
            (a,b) => a.name.localeCompare(b.name)
        );
    }

    if (!filtered.length) {

        grid.innerHTML = `
            <div class="empty-state">
                <strong>No products found</strong>
                Try another search or filter.
            </div>
        `;

        return;
    }

    grid.innerHTML =
        filtered.map(productCard).join("");
}


/* =========================================================
   PRODUCT DETAIL
========================================================= */

function openProduct(id) {

    const product =
        getProduct(id);

    if (!product) return;

    const modal =
        document.getElementById("productModal");

    const detail =
        document.getElementById("productDetail");

    const stockClass =
        product.stock <= 0
            ? "stock-out"
            : product.stock <= 5
                ? "stock-low"
                : "stock-good";

    const stockText =
        product.stock <= 0
            ? "Out of stock"
            : product.stock <= 5
                ? `Only ${product.stock} left`
                : `${product.stock} items available`;

    detail.innerHTML = `
        <div class="product-detail-layout">

            <div class="detail-image">
                <img
                    src="${escapeHTML(product.image)}"
                    alt="${escapeHTML(product.name)}"
                >
            </div>

            <div class="detail-info">

                <p class="orange-label">
                    ${escapeHTML(product.category)}
                </p>

                <h2>
                    ${escapeHTML(product.name)}
                </h2>

                <div class="product-rating">
                    <span>
                        ★ ${product.rating}
                    </span>
                </div>

                <div class="detail-price">
                    ${money(product.price)}
                </div>

                <p class="detail-description">
                    ${escapeHTML(product.description)}
                </p>

                <div class="detail-stock ${stockClass}">
                    ${stockText}
                </div>

                <button
                    class="primary-btn"
                    onclick="addToCart(${product.id}); closeProductModal();"
                    ${product.stock <= 0 ? "disabled" : ""}
                >
                    ${product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
                </button>

            </div>

        </div>
    `;

    modal.classList.remove("hidden");
}


function closeProductModal() {

    document
        .getElementById("productModal")
        .classList.add("hidden");
}


/* =========================================================
   WISHLIST
========================================================= */

function toggleWishlist(id) {

    id = Number(id);

    if (wishlist.includes(id)) {

        wishlist =
            wishlist.filter(
                item => item !== id
            );

        showToast("Removed from wishlist.");

    } else {

        wishlist.push(id);

        showToast("Added to wishlist.");
    }

    saveData();

    updateCounts();

    renderHomeProducts();
    renderShop();
    renderWishlist();
}


function renderWishlist() {

    const grid =
        document.getElementById("wishlistProducts");

    if (!grid) return;

    const items =
        products.filter(
            product => wishlist.includes(Number(product.id))
        );

    if (!items.length) {

        grid.innerHTML = `
            <div class="empty-state">
                <strong>Your wishlist is empty</strong>
                Save products you love and find them here later.
            </div>
        `;

        return;
    }

    grid.innerHTML =
        items.map(productCard).join("");
}


/* =========================================================
   CART
========================================================= */

function addToCart(id) {

    const product =
        getProduct(id);

    if (!product) return;

    if (product.stock <= 0) {

        showToast("This product is out of stock.");
        return;
    }

    const existing =
        cart.find(
            item => Number(item.id) === Number(id)
        );

    if (existing) {

        if (existing.qty >= product.stock) {

            showToast("Maximum available stock reached.");
            return;
        }

        existing.qty += 1;

    } else {

        cart.push({
            id: Number(id),
            qty: 1
        });
    }

    saveData();

    updateCounts();

    renderCart();

    showToast(
        `${product.name} added to cart.`
    );
}


function changeCartQty(id, amount) {

    const item =
        cart.find(
            item => Number(item.id) === Number(id)
        );

    const product =
        getProduct(id);

    if (!item || !product) return;

    item.qty += amount;

    if (item.qty <= 0) {

        cart =
            cart.filter(
                cartItem =>
                    Number(cartItem.id) !== Number(id)
            );
    }

    if (item.qty > product.stock) {

        item.qty = product.stock;

        showToast("Maximum available stock reached.");
    }

    saveData();

    updateCounts();

    renderCart();
}


function removeFromCart(id) {

    cart =
        cart.filter(
            item =>
                Number(item.id) !== Number(id)
        );

    saveData();

    updateCounts();

    renderCart();

    showToast("Product removed from cart.");
}


function cartTotalValue() {

    return cart.reduce(
        (total, item) => {

            const product =
                getProduct(item.id);

            return total +
                (product
                    ? product.price * item.qty
                    : 0);

        },
        0
    );
}


function cartItemCount() {

    return cart.reduce(
        (total,item) =>
            total + Number(item.qty),
        0
    );
}


function renderCart() {

    const container =
        document.getElementById("cartItems");

    const total =
        document.getElementById("cartTotal");

    if (!container || !total) return;

    if (!cart.length) {

        container.innerHTML = `
            <div class="empty-state">
                <strong>Your cart is empty</strong>
                <span>Add something you love to get started.</span>
            </div>
        `;

        total.textContent = "₹0";

        return;
    }

    container.innerHTML =
        cart.map(item => {

            const product =
                getProduct(item.id);

            if (!product) return "";

            return `
                <div class="cart-item">

                    <img
                        src="${escapeHTML(product.image)}"
                        alt="${escapeHTML(product.name)}"
                    >

                    <div>

                        <h4>
                            ${escapeHTML(product.name)}
                        </h4>

                        <small>
                            ${money(product.price)}
                        </small>

                        <div class="qty-controls">

                            <button
                                onclick="changeCartQty(${product.id}, -1)"
                            >
                                −
                            </button>

                            <span>
                                ${item.qty}
                            </span>

                            <button
                                onclick="changeCartQty(${product.id}, 1)"
                            >
                                +
                            </button>

                        </div>

                        <button
                            class="remove-btn"
                            onclick="removeFromCart(${product.id})"
                        >
                            Remove
                        </button>

                    </div>

                    <div class="cart-item-price">
                        ${money(product.price * item.qty)}
                    </div>

                </div>
            `;

        }).join("");

    total.textContent =
        money(cartTotalValue());
}


function openCart() {

    renderCart();

    document
        .getElementById("cartOverlay")
        .classList.remove("hidden");

    document
        .getElementById("cartDrawer")
        .classList.add("open");
}


function closeCart() {

    document
        .getElementById("cartOverlay")
        .classList.add("hidden");

    document
        .getElementById("cartDrawer")
        .classList.remove("open");
}


/* =========================================================
   CHECKOUT
========================================================= */

function openCheckout() {

    if (!cart.length) {

        showToast("Your cart is empty.");
        return;
    }

    closeCart();

    document
        .getElementById("checkoutName")
        .value =
        currentUser?.name || "";

    document
        .getElementById("checkoutEmail")
        .value =
        currentUser?.email || "";

    document
        .getElementById("checkoutModal")
        .classList.remove("hidden");
}


function closeCheckout() {

    document
        .getElementById("checkoutModal")
        .classList.add("hidden");
}


document
    .getElementById("checkoutForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        if (!cart.length) {

            showToast("Your cart is empty.");
            return;
        }

        const orderId =
            "CT-" +
            Math.floor(
                10000 +
                Math.random() * 90000
            );

        const payment =
            document.querySelector(
                'input[name="payment"]:checked'
            )?.value || "COD";

        const orderItems =
            cart.map(item => {

                const product =
                    getProduct(item.id);

                return {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    qty: item.qty,
                    image: product.image
                };
            });

        const order = {

            id: orderId,

            customer: {
                name:
                    document
                        .getElementById("checkoutName")
                        .value.trim(),

                email:
                    document
                        .getElementById("checkoutEmail")
                        .value.trim(),

                phone:
                    document
                        .getElementById("checkoutPhone")
                        .value.trim(),

                city:
                    document
                        .getElementById("checkoutCity")
                        .value.trim(),

                zip:
                    document
                        .getElementById("checkoutZip")
                        .value.trim(),

                address:
                    document
                        .getElementById("checkoutAddress")
                        .value.trim()
            },

            payment,

            items: orderItems,

            total: cartTotalValue(),

            status: "Placed",

            date: new Date().toISOString()
        };


        /* Reduce stock */

        cart.forEach(item => {

            const product =
                getProduct(item.id);

            if (product) {

                product.stock =
                    Math.max(
                        0,
                        Number(product.stock) -
                        Number(item.qty)
                    );
            }
        });


        orders.unshift(order);

        cart = [];

        saveData();

        closeCheckout();

        document
            .getElementById("successOrderId")
            .textContent = orderId;

        document
            .getElementById("successModal")
            .classList.remove("hidden");

        refreshStore();
    });


function closeSuccess() {

    document
        .getElementById("successModal")
        .classList.add("hidden");
}


/* =========================================================
   ORDERS
========================================================= */

function renderOrders() {

    const container =
        document.getElementById("ordersList");

    if (!container) return;

    const email =
        currentUser?.email;

    const myOrders =
        orders.filter(
            order =>
                order.customer?.email === email
        );

    if (!myOrders.length) {

        container.innerHTML = `
            <div class="empty-state">
                <strong>No orders yet</strong>
                Your placed orders will appear here.
            </div>
        `;

        return;
    }

    container.innerHTML =
        myOrders.map(order => {

            const currentIndex =
                orderStatuses.indexOf(order.status);

            return `
                <div class="order-card">

                    <div class="order-top">

                        <div>
                            <div class="order-id">
                                ${escapeHTML(order.id)}
                            </div>

                            <div class="order-date">
                                ${new Date(order.date).toLocaleString("en-IN")}
                            </div>
                        </div>

                        <span class="status-pill">
                            ${escapeHTML(order.status)}
                        </span>

                    </div>


                    <div class="order-products">

                        ${order.items.map(item => `
                            <div class="order-product">

                                <img
                                    src="${escapeHTML(item.image)}"
                                    alt="${escapeHTML(item.name)}"
                                >

                                <div>
                                    <strong>
                                        ${escapeHTML(item.name)}
                                    </strong>

                                    <small>
                                        ${item.qty} × ${money(item.price)}
                                    </small>
                                </div>

                            </div>
                        `).join("")}

                    </div>


                    <div class="order-bottom">

                        <span>
                            ${order.payment}
                        </span>

                        <strong>
                            Total ${money(order.total)}
                        </strong>

                    </div>


                    <div class="tracking">

                        ${orderStatuses.map(
                            (status,index) => `
                                <div
                                    class="track-step ${
                                        index <= currentIndex
                                            ? "active"
                                            : ""
                                    }"
                                >
                                    <div class="track-dot"></div>
                                    <small>
                                        ${status}
                                    </small>
                                </div>
                            `
                        ).join("")}

                    </div>

                </div>
            `;

        }).join("");
}


/* =========================================================
   ADMIN
========================================================= */

function openAdmin() {

    if (
        !currentUser ||
        currentUser.role !== "admin"
    ) {
        showToast("Admin access required.");
        return;
    }

    document
        .getElementById("storePage")
        .classList.add("hidden");

    document
        .getElementById("loginPage")
        .classList.add("hidden");

    document
        .getElementById("adminPage")
        .classList.remove("hidden");

    adminSection(
        "dashboard",
        document.querySelector(".admin-nav")
    );

    refreshAdmin();
}


function closeAdmin() {

    document
        .getElementById("adminPage")
        .classList.add("hidden");

    document
        .getElementById("storePage")
        .classList.remove("hidden");

    refreshStore();
}


function adminSection(section, button) {

    const sections = {
        dashboard: "adminDashboard",
        products: "adminProductsSection",
        inventory: "adminInventorySection",
        categories: "adminCategoriesSection",
        users: "adminUsersSection",
        orders: "adminOrdersSection"
    };

    Object.values(sections).forEach(id => {

        document
            .getElementById(id)
            ?.classList.add("hidden");
    });

    document
        .getElementById(sections[section])
        ?.classList.remove("hidden");


    document
        .querySelectorAll(".admin-nav")
        .forEach(nav =>
            nav.classList.remove("active")
        );

    if (button) {
        button.classList.add("active");
    }


    const titles = {
        dashboard: "Dashboard",
        products: "Products",
        inventory: "Inventory",
        categories: "Categories",
        users: "Customers",
        orders: "Orders"
    };

    document
        .getElementById("adminPageTitle")
        .textContent =
        titles[section];

    refreshAdmin();
}


/* =========================================================
   ADMIN DASHBOARD
========================================================= */

function updateAdminDashboard() {

    const revenue =
        orders.reduce(
            (total,order) =>
                total + Number(order.total || 0),
            0
        );

    const lowStock =
        products.filter(
            product =>
                Number(product.stock) <= 5
        ).length;


    document
        .getElementById("adminSales")
        .textContent =
        money(revenue);

    document
        .getElementById("adminOrders")
        .textContent =
        orders.length;

    document
        .getElementById("adminProducts")
        .textContent =
        products.length;

    document
        .getElementById("adminLowStock")
        .textContent =
        lowStock;


    const recent =
        document.getElementById("recentOrders");

    if (recent) {

        if (!orders.length) {

            recent.innerHTML = `
                <div class="empty-state">
                    No orders yet.
                </div>
            `;

        } else {

            recent.innerHTML =
                orders.slice(0,5).map(order => `
                    <div class="admin-order-row">

                        <div>
                            <strong>
                                ${escapeHTML(order.id)}
                            </strong>

                            <small>
                                ${escapeHTML(
                                    order.customer?.name || "Customer"
                                )}
                            </small>
                        </div>

                        <div>
                            <strong>
                                ${money(order.total)}
                            </strong>

                            <small>
                                ${escapeHTML(order.status)}
                            </small>
                        </div>

                    </div>
                `).join("");
        }
    }


    const alertBox =
        document.getElementById("inventoryAlert");

    if (alertBox) {

        const lowProducts =
            products.filter(
                product =>
                    Number(product.stock) <= 5
            );

        if (!lowProducts.length) {

            alertBox.innerHTML = `
                <div class="empty-state">
                    <strong>All good ✓</strong>
                    No low-stock products.
                </div>
            `;

        } else {

            alertBox.innerHTML =
                lowProducts.map(product => `
                    <div class="inventory-alert-row">

                        <div>
                            <strong>
                                ${escapeHTML(product.name)}
                            </strong>

                            <small>
                                ${escapeHTML(product.category)}
                            </small>
                        </div>

                        <strong class="${
                            product.stock <= 0
                                ? "stock-out"
                                : "stock-low"
                        }">
                            ${product.stock <= 0
                                ? "OUT"
                                : `${product.stock} left`
                            }
                        </strong>

                    </div>
                `).join("");
        }
    }
}


/* =========================================================
   ADMIN PRODUCTS
========================================================= */

function renderAdminProducts() {

    const table =
        document.getElementById("productsTable");

    if (!table) return;

    table.innerHTML =
        products.map(product => `

            <tr>

                <td>

                    <div class="table-product">

                        <img
                            src="${escapeHTML(product.image)}"
                            alt=""
                        >

                        <div>
                            <strong>
                                ${escapeHTML(product.name)}
                            </strong>

                            <small>
                                #${product.id}
                            </small>
                        </div>

                    </div>

                </td>

                <td>
                    ${escapeHTML(product.category)}
                </td>

                <td>
                    ${money(product.price)}
                </td>

                <td>
                    ${product.stock}
                </td>

                <td>

                    <button
                        class="action-btn edit-btn"
                        onclick="editProduct(${product.id})"
                    >
                        Edit
                    </button>

                    <button
                        class="action-btn delete-btn"
                        onclick="deleteProduct(${product.id})"
                    >
                        Delete
                    </button>

                </td>

            </tr>

        `).join("");
}


/* =========================================================
   ADD / EDIT PRODUCT
========================================================= */

function openProductAdminModal(product = null) {

    populateCategoryFilter();

    const modal =
        document.getElementById("productAdminModal");

    const title =
        document.getElementById("productAdminTitle");

    document
        .getElementById("productForm")
        .reset();

    if (product) {

        title.textContent = "Edit Product";

        document
            .getElementById("editProductId")
            .value = product.id;

        document
            .getElementById("adminProductName")
            .value = product.name;

        document
            .getElementById("adminProductCategory")
            .value = product.category;

        document
            .getElementById("adminProductPrice")
            .value = product.price;

        document
            .getElementById("adminProductStock")
            .value = product.stock;

        document
            .getElementById("adminProductRating")
            .value = product.rating;

        document
            .getElementById("adminProductImage")
            .value = product.image;

        document
            .getElementById("adminProductDescription")
            .value = product.description;

    } else {

        title.textContent = "Add Product";

        document
            .getElementById("editProductId")
            .value = "";
    }

    modal.classList.remove("hidden");
}


function closeProductAdminModal() {

    document
        .getElementById("productAdminModal")
        .classList.add("hidden");
}


function editProduct(id) {

    const product =
        getProduct(id);

    if (product) {
        openProductAdminModal(product);
    }
}


document
    .getElementById("productForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const editId =
            document
                .getElementById("editProductId")
                .value;

        const productData = {

            name:
                document
                    .getElementById("adminProductName")
                    .value.trim(),

            category:
                document
                    .getElementById("adminProductCategory")
                    .value,

            price:
                Number(
                    document
                        .getElementById("adminProductPrice")
                        .value
                ),

            stock:
                Number(
                    document
                        .getElementById("adminProductStock")
                        .value
                ),

            rating:
                Number(
                    document
                        .getElementById("adminProductRating")
                        .value
                ) || 4.5,

            image:
                document
                    .getElementById("adminProductImage")
                    .value.trim() ||
                "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=900&q=85",

            description:
                document
                    .getElementById("adminProductDescription")
                    .value.trim()
        };


        if (editId) {

            const product =
                getProduct(editId);

            if (product) {

                Object.assign(
                    product,
                    productData
                );

                showToast("Product updated.");
            }

        } else {

            const newId =
                products.length
                    ? Math.max(
                        ...products.map(
                            product =>
                                Number(product.id)
                        )
                    ) + 1
                    : 1;

            products.push({
                id: newId,
                ...productData
            });

            showToast("Product added.");
        }

        saveData();

        closeProductAdminModal();

        refreshAdmin();

        refreshStore();
    });


function deleteProduct(id) {

    const product =
        getProduct(id);

    if (!product) return;

    const confirmed =
        confirm(
            `Delete "${product.name}"?`
        );

    if (!confirmed) return;

    products =
        products.filter(
            item =>
                Number(item.id) !== Number(id)
        );

    cart =
        cart.filter(
            item =>
                Number(item.id) !== Number(id)
        );

    wishlist =
        wishlist.filter(
            item =>
                Number(item) !== Number(id)
        );

    saveData();

    refreshAdmin();

    refreshStore();

    showToast("Product deleted.");
}


/* =========================================================
   INVENTORY
========================================================= */

function renderInventory() {

    const table =
        document.getElementById("inventoryTable");

    if (!table) return;

    table.innerHTML =
        products.map(product => `

            <tr>

                <td>

                    <div class="table-product">

                        <img
                            src="${escapeHTML(product.image)}"
                            alt=""
                        >

                        <strong>
                            ${escapeHTML(product.name)}
                        </strong>

                    </div>

                </td>

                <td>
                    ${escapeHTML(product.category)}
                </td>

                <td>
                    ${product.stock}
                </td>

                <td>

                    <input
                        id="stock-${product.id}"
                        class="stock-input"
                        type="number"
                        min="0"
                        value="${product.stock}"
                    >

                    <button
                        class="action-btn stock-save"
                        onclick="updateStock(${product.id})"
                    >
                        Save
                    </button>

                </td>

            </tr>

        `).join("");
}


function updateStock(id) {

    const input =
        document.getElementById(
            `stock-${id}`
        );

    const product =
        getProduct(id);

    if (!input || !product) return;

    product.stock =
        Math.max(
            0,
            Number(input.value)
        );

    saveData();

    renderInventory();

    updateAdminDashboard();

    refreshStore();

    showToast("Stock updated.");
}


/* =========================================================
   CATEGORIES
========================================================= */

function renderAdminCategories() {

    const grid =
        document.getElementById("adminCategoryGrid");

    if (!grid) return;

    grid.innerHTML =
        categories.map(category => {

            const count =
                products.filter(
                    product =>
                        product.category === category
                ).length;

            return `
                <div class="admin-category-card">

                    <h3>
                        ${escapeHTML(category)}
                    </h3>

                    <p>
                        ${count} products
                    </p>

                    <div class="category-actions">

                        <button
                            class="action-btn edit-btn"
                            onclick="renameCategory('${escapeHTML(category)}')"
                        >
                            Rename
                        </button>

                        <button
                            class="action-btn delete-btn"
                            onclick="deleteCategory('${escapeHTML(category)}')"
                        >
                            Delete
                        </button>

                    </div>

                </div>
            `;

        }).join("");
}


function addCategory() {

    const name =
        prompt("Enter new category name:");

    if (!name) return;

    const clean =
        name.trim();

    if (!clean) return;

    if (
        categories.some(
            category =>
                category.toLowerCase() ===
                clean.toLowerCase()
        )
    ) {
        showToast("Category already exists.");
        return;
    }

    categories.push(clean);

    saveData();

    refreshAdmin();

    refreshStore();

    showToast("Category added.");
}


function renameCategory(oldName) {

    const newName =
        prompt(
            "Enter new category name:",
            oldName
        );

    if (!newName) return;

    const clean =
        newName.trim();

    if (!clean || clean === oldName) return;

    if (categories.includes(clean)) {

        showToast("Category already exists.");
        return;
    }

    const index =
        categories.indexOf(oldName);

    if (index === -1) return;

    categories[index] = clean;

    products.forEach(product => {

        if (product.category === oldName) {
            product.category = clean;
        }
    });

    saveData();

    refreshAdmin();

    refreshStore();

    showToast("Category renamed.");
}


function deleteCategory(category) {

    const count =
        products.filter(
            product =>
                product.category === category
        ).length;

    if (count > 0) {

        showToast(
            "Move products before deleting this category."
        );

        return;
    }

    const confirmed =
        confirm(
            `Delete "${category}" category?`
        );

    if (!confirmed) return;

    categories =
        categories.filter(
            item => item !== category
        );

    saveData();

    refreshAdmin();

    refreshStore();

    showToast("Category deleted.");
}


/* =========================================================
   ADMIN USERS
========================================================= */

function renderUsers() {

    const table =
        document.getElementById("usersTable");

    if (!table) return;

    const users = {};

    orders.forEach(order => {

        const email =
            order.customer?.email ||
            "unknown@example.com";

        if (!users[email]) {

            users[email] = {
                name:
                    order.customer?.name ||
                    "Customer",

                email,

                orders: 0,

                spent: 0
            };
        }

        users[email].orders += 1;

        users[email].spent +=
            Number(order.total || 0);
    });


    if (
        currentUser &&
        currentUser.role !== "admin" &&
        !users[currentUser.email]
    ) {

        users[currentUser.email] = {
            name: currentUser.name,
            email: currentUser.email,
            orders: 0,
            spent: 0
        };
    }


    const list =
        Object.values(users);

    if (!list.length) {

        table.innerHTML = `
            <tr>
                <td colspan="4">
                    No customers yet.
                </td>
            </tr>
        `;

        return;
    }

    table.innerHTML =
        list.map(user => `

            <tr>

                <td>
                    ${escapeHTML(user.name)}
                </td>

                <td>
                    ${escapeHTML(user.email)}
                </td>

                <td>
                    ${user.orders}
                </td>

                <td>
                    ${money(user.spent)}
                </td>

            </tr>

        `).join("");
}


/* =========================================================
   ADMIN ORDERS
========================================================= */

function renderAdminOrders() {

    const table =
        document.getElementById("adminOrdersTable");

    if (!table) return;

    if (!orders.length) {

        table.innerHTML = `
            <tr>
                <td colspan="5">
                    No orders yet.
                </td>
            </tr>
        `;

        return;
    }

    table.innerHTML =
        orders.map(order => `

            <tr>

                <td>
                    <strong>
                        ${escapeHTML(order.id)}
                    </strong>
                </td>

                <td>
                    ${escapeHTML(
                        order.customer?.name || "Customer"
                    )}
                </td>

                <td>
                    ${money(order.total)}
                </td>

                <td>
                    ${escapeHTML(order.status)}
                </td>

                <td>

                    <select
                        onchange="updateOrderStatus('${escapeHTML(order.id)}', this.value)"
                    >

                        ${orderStatuses.map(status => `
                            <option
                                value="${status}"
                                ${order.status === status ? "selected" : ""}
                            >
                                ${status}
                            </option>
                        `).join("")}

                    </select>

                </td>

            </tr>

        `).join("");
}


function updateOrderStatus(orderId, status) {

    const order =
        orders.find(
            item =>
                item.id === orderId
        );

    if (!order) return;

    order.status = status;

    saveData();

    renderAdminOrders();

    renderOrders();

    updateAdminDashboard();

    showToast(
        `Order ${orderId} updated to ${status}.`
    );
}


/* =========================================================
   REFRESH
========================================================= */

function updateCounts() {

    document
        .getElementById("cartCount")
        .textContent =
        cartItemCount();

    document
        .getElementById("wishlistCount")
        .textContent =
        wishlist.length;
}


function refreshStore() {

    updateProfile();

    updateCounts();

    populateCategoryFilter();

    renderCategories();

    renderHomeProducts();

    renderShop();

    renderWishlist();

    renderCart();
}


function refreshAdmin() {

    updateAdminDashboard();

    renderAdminProducts();

    renderInventory();

    renderAdminCategories();

    renderUsers();

    renderAdminOrders();

    populateCategoryFilter();
}


/* =========================================================
   GLOBAL ESCAPE
========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key !== "Escape") return;

        closeCart();
        closeProductModal();
        closeCheckout();
        closeSuccess();
        closeProductAdminModal();
        toggleProfileMenu(true);
    }
);


/* =========================================================
   INITIAL LOAD
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        if (currentUser) {

            document
                .getElementById("loginPage")
                .classList.add("hidden");

            if (currentUser.role === "admin") {

                openAdmin();

            } else {

                document
                    .getElementById("storePage")
                    .classList.remove("hidden");

                refreshStore();
            }

        } else {

            document
                .getElementById("loginPage")
                .classList.remove("hidden");

            document
                .getElementById("storePage")
                .classList.add("hidden");

            document
                .getElementById("adminPage")
                .classList.add("hidden");
        }
    }
);