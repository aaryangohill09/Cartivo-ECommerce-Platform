/* =========================================================
   CARTIVO - E-COMMERCE & INVENTORY MANAGEMENT PLATFORM
   Frontend + Backend Integration
========================================================= */

const API_URL = "https://cartivo-ecommerce-platform-production.up.railway.app/api";

/* =========================================================
   DEFAULT DATA
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
    "Delivered",
    "Cancelled"
];

/* =========================================================
   LOCAL STATE
========================================================= */

let products = JSON.parse(
    localStorage.getItem("cartivoProducts") || "null"
) || defaultProducts;

let categories = JSON.parse(
    localStorage.getItem("cartivoCategories") || "null"
) || defaultCategories;

let cart = JSON.parse(
    localStorage.getItem("cartivoCart") || "[]"
);

let wishlist = JSON.parse(
    localStorage.getItem("cartivoWishlist") || "[]"
);

let orders = JSON.parse(
    localStorage.getItem("cartivoOrders") || "[]"
);

let users = [];

let currentUser = JSON.parse(
    localStorage.getItem("cartivoCurrentUser") || "null"
);

let adminDashboardData = null;

/* =========================================================
   HELPERS
========================================================= */

function token() {
    return localStorage.getItem("cartivoToken");
}

function authHeaders() {
    const headers = {
        "Content-Type": "application/json"
    };

    if (token()) {
        headers.Authorization = `Bearer ${token()}`;
    }

    return headers;
}

async function apiRequest(url, options = {}) {
    const config = {
        ...options,
        headers: {
            ...authHeaders(),
            ...(options.headers || {})
        }
    };

    const response = await fetch(`${API_URL}${url}`, config);

    let data = {};

    try {
        data = await response.json();
    } catch {
        data = {};
    }

    if (!response.ok) {
        throw new Error(data.message || "Request failed");
    }

    return data;
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

function saveLocalData() {
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
   DATA NORMALIZATION
========================================================= */

function normalizeCategoryList(data) {
    const list = data?.categories || [];

    return list.map(category => {
        if (typeof category === "string") {
            return category;
        }

        return category.name;
    });
}

function normalizeProduct(product) {
    return {
        id: Number(product.id),
        name: product.name || "",
        category: product.category || "",
        price: Number(product.price || 0),
        stock: Number(product.stock || 0),
        rating: Number(product.rating || 0),
        image: product.image || "",
        description: product.description || ""
    };
}

function normalizeOrder(order) {
    return {
        id: order.order_number || order.orderNumber || order.id,
        dbId: order.id,
        date: order.created_at || order.date || new Date().toISOString(),
        status: order.status || "Placed",
        total: Number(order.total || 0),
        payment: order.payment_method || order.payment || "COD",
        customer: {
            name: order.customer_name || order.customer?.name || "Customer",
            email: order.email || order.customer?.email || "",
            phone: order.phone || ""
        },
        address: order.address || "",
        city: order.city || "",
        zip: order.zip || "",
        items: (order.items || []).map(item => ({
            id: Number(item.product_id || item.productId || item.id),
            name: item.product_name || item.name || "Product",
            price: Number(item.price || 0),
            qty: Number(item.quantity || item.qty || 1),
            image: item.image || getProduct(item.product_id)?.image || ""
        }))
    };
}

/* =========================================================
   AUTH - LOGIN
========================================================= */

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const email = document
            .getElementById("loginEmail")
            .value
            .trim()
            .toLowerCase();

        const password = document
            .getElementById("loginPassword")
            .value
            .trim();

        if (!email || !password) {
            showToast("Please enter email and password.");
            return;
        }

        try {
            showToast("Logging in...");

            const data = await apiRequest("/auth/login", {
                method: "POST",
                body: JSON.stringify({
                    email,
                    password
                })
            });

            localStorage.setItem(
                "cartivoToken",
                data.token
            );

            currentUser = {
                id: data.user.id,
                name: data.user.name,
                email: data.user.email,
                role: data.user.role
            };

            saveLocalData();

            document
                .getElementById("loginPage")
                ?.classList.add("hidden");

            if (currentUser.role === "admin") {
                openAdmin();
                showToast("Welcome to Admin Panel");
            } else {
                document
                    .getElementById("storePage")
                    ?.classList.remove("hidden");

                await refreshStore();
                showToast("Welcome to Cartivo");
            }

        } catch (error) {
            console.error("Login error:", error);
            showToast(error.message || "Invalid email or password.");
        }
    });
}

/* =========================================================
   AUTH - REGISTER
========================================================= */

const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const name = document
            .getElementById("registerName")
            .value
            .trim();

        const email = document
            .getElementById("registerEmail")
            .value
            .trim()
            .toLowerCase();

        const password = document
            .getElementById("registerPassword")
            .value
            .trim();

        if (!name || !email || !password) {
            showToast("Please fill all fields.");
            return;
        }

        if (password.length < 6) {
            showToast("Password must be at least 6 characters.");
            return;
        }

        try {
            showToast("Creating account...");

            const data = await apiRequest("/auth/register", {
                method: "POST",
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });

            localStorage.setItem(
                "cartivoToken",
                data.token
            );

            currentUser = {
                id: data.user.id,
                name: data.user.name,
                email: data.user.email,
                role: data.user.role
            };

            saveLocalData();

            document
                .getElementById("loginPage")
                ?.classList.add("hidden");

            document
                .getElementById("storePage")
                ?.classList.remove("hidden");

            await refreshStore();

            showToast("Account created successfully!");

        } catch (error) {
            console.error("Registration error:", error);
            showToast(error.message || "Registration failed.");
        }
    });
}

/* =========================================================
   LOGOUT
========================================================= */

function logout() {
    currentUser = null;

    localStorage.removeItem("cartivoToken");
    localStorage.removeItem("cartivoCurrentUser");

    document
        .getElementById("storePage")
        ?.classList.add("hidden");

    document
        .getElementById("adminPage")
        ?.classList.add("hidden");

    document
        .getElementById("loginPage")
        ?.classList.remove("hidden");

    document
        .getElementById("loginForm")
        ?.reset();

    toggleProfileMenu(true);

    showToast("Logged out successfully.");
}

/* =========================================================
   PROFILE
========================================================= */

function updateProfile() {
    if (!currentUser) return;

    const name = document.getElementById("profileName");
    const email = document.getElementById("profileEmail");
    const initial = document.getElementById("profileInitial");
    const adminButton = document.getElementById("adminMenuButton");

    if (name) {
        name.textContent = currentUser.name || "User";
    }

    if (email) {
        email.textContent = currentUser.email || "";
    }

    if (initial) {
        initial.textContent =
            (currentUser.name || "U")
                .charAt(0)
                .toUpperCase();
    }

    if (adminButton) {
        adminButton.classList.toggle(
            "hidden",
            currentUser.role !== "admin"
        );
    }
}

function toggleProfileMenu(forceClose = false) {
    const menu = document.getElementById("profileMenu");

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
        document
            .getElementById(id)
            ?.classList.add("hidden");
    });

    toggleProfileMenu(true);
}

async function showHome() {
    hideAllStoreSections();

    document
        .getElementById("homeSection")
        ?.classList.remove("hidden");

    await refreshStore();
}

async function showShop() {
    hideAllStoreSections();

    document
        .getElementById("shopSection")
        ?.classList.remove("hidden");

    renderShop();
}

async function showCategories() {
    await showHome();

    setTimeout(() => {
        document
            .getElementById("categoriesSection")
            ?.scrollIntoView({
                behavior: "smooth"
            });
    }, 100);
}

async function showWishlist() {
    hideAllStoreSections();

    document
        .getElementById("wishlistSection")
        ?.classList.remove("hidden");

    await loadWishlist();
    renderWishlist();
}

async function showOrders() {
    hideAllStoreSections();

    document
        .getElementById("ordersSection")
        ?.classList.remove("hidden");

    await loadMyOrders();
    renderOrders();
}

/* =========================================================
   SEARCH
========================================================= */

const globalSearch = document.getElementById("globalSearch");

if (globalSearch) {
    globalSearch.addEventListener("input", async function() {
        const value = this.value.trim();

        if (!value) return;

        await showShop();

        const shopSearch =
            document.getElementById("shopSearch");

        if (shopSearch) {
            shopSearch.value = value;
        }

        renderShop();
    });
}

document
    .getElementById("shopSearch")
    ?.addEventListener("input", renderShop);

document
    .getElementById("categoryFilter")
    ?.addEventListener("change", renderShop);

document
    .getElementById("priceFilter")
    ?.addEventListener("change", renderShop);

document
    .getElementById("sortFilter")
    ?.addEventListener("change", renderShop);

/* =========================================================
   CATEGORIES
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

        const count = products.filter(
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
            categories.map(category => `
                <option value="${escapeHTML(category)}">
                    ${escapeHTML(category)}
                </option>
            `).join("");
    }

    if (adminSelect) {
        adminSelect.innerHTML =
            categories.map(category => `
                <option value="${escapeHTML(category)}">
                    ${escapeHTML(category)}
                </option>
            `).join("");
    }
}

function filterCategory(category) {
    showShop().then(() => {
        const filter =
            document.getElementById("categoryFilter");

        if (filter) {
            filter.value = category;
        }

        renderShop();
    });
}

/* =========================================================
   PRODUCTS
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
                        ? `
                            <span class="product-badge">
                                ${badge}
                            </span>
                        `
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
                        ★ ${Number(product.rating || 0).toFixed(1)}
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
                        ${
                            product.stock <= 0
                                ? "Sold Out"
                                : "+ Cart"
                        }
                    </button>

                </div>

            </div>

        </article>
    `;
}

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

function renderShop() {
    const grid =
        document.getElementById("shopProducts");

    if (!grid) return;

    const search =
        document
            .getElementById("shopSearch")
            ?.value
            .toLowerCase()
            .trim() || "";

    const category =
        document
            .getElementById("categoryFilter")
            ?.value || "all";

    const price =
        document
            .getElementById("priceFilter")
            ?.value || "all";

    const sort =
        document
            .getElementById("sortFilter")
            ?.value || "default";

    let filtered = [...products];

    if (search) {
        filtered = filtered.filter(product =>
            product.name
                .toLowerCase()
                .includes(search) ||
            product.category
                .toLowerCase()
                .includes(search) ||
            (product.description || "")
                .toLowerCase()
                .includes(search)
        );
    }

    if (category !== "all") {
        filtered = filtered.filter(
            product => product.category === category
        );
    }

    if (price !== "all") {
        filtered = filtered.filter(product => {
            const p = Number(product.price);

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
        filtered.sort((a, b) =>
            Number(a.price) - Number(b.price)
        );
    }

    if (sort === "priceHigh") {
        filtered.sort((a, b) =>
            Number(b.price) - Number(a.price)
        );
    }

    if (sort === "rating") {
        filtered.sort((a, b) =>
            Number(b.rating) - Number(a.rating)
        );
    }

    if (sort === "name") {
        filtered.sort((a, b) =>
            a.name.localeCompare(b.name)
        );
    }

    if (!filtered.length) {
        grid.innerHTML = `
            <div class="empty-state">
                <strong>No products found</strong>
                <span>Try another search or filter.</span>
            </div>
        `;
        return;
    }

    grid.innerHTML =
        filtered.map(productCard).join("");
}

/* =========================================================
   LOAD PRODUCTS FROM BACKEND
========================================================= */

async function loadProducts() {
    try {
        const data = await apiRequest("/products");

        if (Array.isArray(data.products)) {
            products = data.products.map(normalizeProduct);
            localStorage.setItem(
                "cartivoProducts",
                JSON.stringify(products)
            );
        }

    } catch (error) {
        console.error("Products loading error:", error);
    }
}

async function loadCategories() {
    try {
        const data = await apiRequest("/categories");

        categories = normalizeCategoryList(data);

        if (!categories.length) {
            categories = defaultCategories;
        }

        localStorage.setItem(
            "cartivoCategories",
            JSON.stringify(categories)
        );

    } catch (error) {
        console.error("Categories loading error:", error);
    }
}

/* =========================================================
   PRODUCT DETAIL
========================================================= */

function openProduct(id) {
    const product = getProduct(id);

    if (!product) return;

    const modal =
        document.getElementById("productModal");

    const detail =
        document.getElementById("productDetail");

    if (!modal || !detail) return;

    const stockClass =
        Number(product.stock) <= 0
            ? "stock-out"
            : Number(product.stock) <= 5
                ? "stock-low"
                : "stock-good";

    const stockText =
        Number(product.stock) <= 0
            ? "Out of stock"
            : Number(product.stock) <= 5
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
                        ★ ${Number(product.rating || 0).toFixed(1)}
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
                    ${
                        product.stock <= 0
                            ? "Out of Stock"
                            : "Add to Cart"
                    }
                </button>

            </div>

        </div>
    `;

    modal.classList.remove("hidden");
}

function closeProductModal() {
    document
        .getElementById("productModal")
        ?.classList.add("hidden");
}

/* =========================================================
   WISHLIST - BACKEND
========================================================= */

async function loadWishlist() {
    if (!token()) return;

    try {
        const data = await apiRequest("/wishlist");

        wishlist = (data.wishlist || []).map(
            product => Number(product.id)
        );

        localStorage.setItem(
            "cartivoWishlist",
            JSON.stringify(wishlist)
        );

    } catch (error) {
        console.error("Wishlist loading error:", error);
    }
}

async function toggleWishlist(id) {
    id = Number(id);

    if (!token()) {
        showToast("Please login first.");
        return;
    }

    try {
        if (wishlist.includes(id)) {

            await apiRequest(`/wishlist/${id}`, {
                method: "DELETE"
            });

            wishlist = wishlist.filter(
                item => Number(item) !== id
            );

            showToast("Removed from wishlist.");

        } else {

            await apiRequest(`/wishlist/${id}`, {
                method: "POST"
            });

            wishlist.push(id);

            showToast("Added to wishlist.");
        }

        localStorage.setItem(
            "cartivoWishlist",
            JSON.stringify(wishlist)
        );

        updateCounts();
        renderHomeProducts();
        renderShop();
        renderWishlist();

    } catch (error) {
        console.error("Wishlist error:", error);
        showToast(error.message || "Wishlist update failed.");
    }
}

function renderWishlist() {
    const grid =
        document.getElementById("wishlistProducts");

    if (!grid) return;

    const items = products.filter(
        product =>
            wishlist.includes(Number(product.id))
    );

    if (!items.length) {
        grid.innerHTML = `
            <div class="empty-state">
                <strong>Your wishlist is empty</strong>
                <span>
                    Save products you love and find them here later.
                </span>
            </div>
        `;
        return;
    }

    grid.innerHTML =
        items.map(productCard).join("");
}

/* =========================================================
   CART
   Cart intentionally remains local because backend
   does not provide a cart endpoint.
========================================================= */

function addToCart(id) {
    const product = getProduct(id);

    if (!product) return;

    if (Number(product.stock) <= 0) {
        showToast("This product is out of stock.");
        return;
    }

    const existing = cart.find(
        item => Number(item.id) === Number(id)
    );

    if (existing) {

        if (
            Number(existing.qty) >=
            Number(product.stock)
        ) {
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

    saveLocalData();

    updateCounts();
    renderCart();

    showToast(
        `${product.name} added to cart.`
    );
}

function changeCartQty(id, amount) {
    const item = cart.find(
        item => Number(item.id) === Number(id)
    );

    const product = getProduct(id);

    if (!item || !product) return;

    item.qty += Number(amount);

    if (item.qty <= 0) {
        cart = cart.filter(
            cartItem =>
                Number(cartItem.id) !== Number(id)
        );
    }

    if (item && item.qty > Number(product.stock)) {
        item.qty = Number(product.stock);
        showToast("Maximum available stock reached.");
    }

    saveLocalData();

    updateCounts();
    renderCart();
}

function removeFromCart(id) {
    cart = cart.filter(
        item =>
            Number(item.id) !== Number(id)
    );

    saveLocalData();

    updateCounts();
    renderCart();

    showToast("Product removed from cart.");
}

function cartTotalValue() {
    return cart.reduce(
        (total, item) => {
            const product = getProduct(item.id);

            return total +
                (
                    product
                        ? Number(product.price) *
                          Number(item.qty)
                        : 0
                );
        },
        0
    );
}

function cartItemCount() {
    return cart.reduce(
        (total, item) =>
            total + Number(item.qty || 0),
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
                <span>
                    Add something you love to get started.
                </span>
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
                        ${money(
                            Number(product.price) *
                            Number(item.qty)
                        )}
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
        ?.classList.remove("hidden");

    document
        .getElementById("cartDrawer")
        ?.classList.add("open");
}

function closeCart() {
    document
        .getElementById("cartOverlay")
        ?.classList.add("hidden");

    document
        .getElementById("cartDrawer")
        ?.classList.remove("open");
}

/* =========================================================
   CHECKOUT
========================================================= */

function openCheckout() {
    if (!cart.length) {
        showToast("Your cart is empty.");
        return;
    }

    if (!token()) {
        showToast("Please login before checkout.");
        return;
    }

    closeCart();

    const name =
        document.getElementById("checkoutName");

    const email =
        document.getElementById("checkoutEmail");

    if (name) {
        name.value = currentUser?.name || "";
    }

    if (email) {
        email.value = currentUser?.email || "";
    }

    document
        .getElementById("checkoutModal")
        ?.classList.remove("hidden");
}

function closeCheckout() {
    document
        .getElementById("checkoutModal")
        ?.classList.add("hidden");
}

const checkoutForm =
    document.getElementById("checkoutForm");

if (checkoutForm) {
    checkoutForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();

            if (!cart.length) {
                showToast("Your cart is empty.");
                return;
            }

            if (!token()) {
                showToast(
                    "Please login before placing an order."
                );
                return;
            }

            const payment =
                document.querySelector(
                    'input[name="payment"]:checked'
                )?.value || "COD";

            const customerName =
                document
                    .getElementById("checkoutName")
                    ?.value
                    .trim() || "";

            const email =
                document
                    .getElementById("checkoutEmail")
                    ?.value
                    .trim() || "";

            const phone =
                document
                    .getElementById("checkoutPhone")
                    ?.value
                    .trim() || "";

            const city =
                document
                    .getElementById("checkoutCity")
                    ?.value
                    .trim() || "";

            const zip =
                document
                    .getElementById("checkoutZip")
                    ?.value
                    .trim() || "";

            const address =
                document
                    .getElementById("checkoutAddress")
                    ?.value
                    .trim() || "";

            if (
                !customerName ||
                !email ||
                !address
            ) {
                showToast(
                    "Please fill all required checkout details."
                );
                return;
            }

            const orderItems = cart.map(item => ({
                productId: Number(item.id),
                quantity: Number(item.qty)
            }));

            try {
                showToast("Placing your order...");

                const data = await apiRequest(
                    "/orders",
                    {
                        method: "POST",
                        body: JSON.stringify({
                            items: orderItems,
                            customerName,
                            email,
                            phone,
                            address,
                            city,
                            zip,
                            paymentMethod: payment
                        })
                    }
                );

                cart = [];

                saveLocalData();

                await loadProducts();
                await loadCategories();

                updateCounts();
                renderCart();
                renderHomeProducts();
                renderShop();

                closeCheckout();

                const successId =
                    document.getElementById(
                        "successOrderId"
                    );

                if (successId) {
                    successId.textContent =
                        data.order?.orderNumber ||
                        data.order?.order_number ||
                        data.order?.id ||
                        "Order placed";
                }

                document
                    .getElementById("successModal")
                    ?.classList.remove("hidden");

                showToast(
                    "Order placed successfully!"
                );

            } catch (error) {
                console.error(
                    "Order placement error:",
                    error
                );

                showToast(
                    error.message ||
                    "Unable to place order."
                );
            }
        }
    );
}

function closeSuccess() {
    document
        .getElementById("successModal")
        ?.classList.add("hidden");
}

/* =========================================================
   CUSTOMER ORDERS
========================================================= */

async function loadMyOrders() {
    if (!token()) {
        orders = [];
        return;
    }

    try {
        const data =
            await apiRequest("/orders/my");

        orders = (data.orders || [])
            .map(normalizeOrder);

        localStorage.setItem(
            "cartivoOrders",
            JSON.stringify(orders)
        );

    } catch (error) {
        console.error(
            "My orders loading error:",
            error
        );
    }
}

function renderOrders() {
    const container =
        document.getElementById("ordersList");

    if (!container) return;

    if (!orders.length) {
        container.innerHTML = `
            <div class="empty-state">
                <strong>No orders yet</strong>
                <span>
                    Your placed orders will appear here.
                </span>
            </div>
        `;
        return;
    }

    container.innerHTML =
        orders.map(order => {

            const currentIndex =
                orderStatuses.indexOf(
                    order.status
                );

            return `
                <div class="order-card">

                    <div class="order-top">

                        <div>

                            <div class="order-id">
                                ${escapeHTML(order.id)}
                            </div>

                            <div class="order-date">
                                ${
                                    new Date(
                                        order.date
                                    ).toLocaleString("en-IN")
                                }
                            </div>

                        </div>

                        <span class="status-pill">
                            ${escapeHTML(order.status)}
                        </span>

                    </div>

                    <div class="order-products">

                        ${
                            order.items.map(item => `
                                <div class="order-product">

                                    <img
                                        src="${escapeHTML(
                                            item.image ||
                                            "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=400&q=80"
                                        )}"
                                        alt="${escapeHTML(item.name)}"
                                    >

                                    <div>

                                        <strong>
                                            ${escapeHTML(item.name)}
                                        </strong>

                                        <small>
                                            ${item.qty}
                                            ×
                                            ${money(item.price)}
                                        </small>

                                    </div>

                                </div>
                            `).join("")
                        }

                    </div>

                    <div class="order-bottom">

                        <span>
                            ${escapeHTML(order.payment)}
                        </span>

                        <strong>
                            Total ${money(order.total)}
                        </strong>

                    </div>

                    <div class="tracking">

                        ${
                            orderStatuses
                                .filter(status =>
                                    status !== "Cancelled"
                                )
                                .map(
                                    (status, index) => `
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
                                )
                                .join("")
                        }

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
        ?.classList.add("hidden");

    document
        .getElementById("loginPage")
        ?.classList.add("hidden");

    document
        .getElementById("adminPage")
        ?.classList.remove("hidden");

    refreshAdmin();
}

function closeAdmin() {
    document
        .getElementById("adminPage")
        ?.classList.add("hidden");

    document
        .getElementById("storePage")
        ?.classList.remove("hidden");

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

    const title =
        document.getElementById(
            "adminPageTitle"
        );

    if (title) {
        title.textContent =
            titles[section] || "Dashboard";
    }

    refreshAdmin();
}

/* =========================================================
   ADMIN DASHBOARD - BACKEND
========================================================= */

async function loadAdminDashboard() {
    try {
        const data =
            await apiRequest("/admin/dashboard");

        adminDashboardData =
            data.dashboard || {};

    } catch (error) {
        console.error(
            "Dashboard loading error:",
            error
        );

        adminDashboardData = null;
    }
}

function updateAdminDashboard() {
    const dashboard =
        adminDashboardData || {};

    const sales =
        Number(dashboard.revenue || 0);

    const orderCount =
        Number(dashboard.orders || 0);

    const productCount =
        Number(dashboard.products || products.length);

    const lowStock =
        Number(
            dashboard.lowStock ??
            products.filter(
                product =>
                    Number(product.stock) <= 5
            ).length
        );

    const salesElement =
        document.getElementById("adminSales");

    const ordersElement =
        document.getElementById("adminOrders");

    const productsElement =
        document.getElementById("adminProducts");

    const lowStockElement =
        document.getElementById("adminLowStock");

    if (salesElement) {
        salesElement.textContent =
            money(sales);
    }

    if (ordersElement) {
        ordersElement.textContent =
            orderCount;
    }

    if (productsElement) {
        productsElement.textContent =
            productCount;
    }

    if (lowStockElement) {
        lowStockElement.textContent =
            lowStock;
    }

    const recent =
        document.getElementById(
            "recentOrders"
        );

    if (recent) {

        if (!orders.length) {

            recent.innerHTML = `
                <div class="empty-state">
                    No orders yet.
                </div>
            `;

        } else {

            recent.innerHTML =
                orders
                    .slice(0, 5)
                    .map(order => `
                        <div class="admin-order-row">

                            <div>

                                <strong>
                                    ${escapeHTML(order.id)}
                                </strong>

                                <small>
                                    ${escapeHTML(
                                        order.customer?.name ||
                                        "Customer"
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
                    `)
                    .join("");
        }
    }

    const alertBox =
        document.getElementById(
            "inventoryAlert"
        );

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
                lowProducts
                    .map(product => `
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
                                Number(product.stock) <= 0
                                    ? "stock-out"
                                    : "stock-low"
                            }">
                                ${
                                    Number(product.stock) <= 0
                                        ? "OUT"
                                        : `${product.stock} left`
                                }
                            </strong>

                        </div>
                    `)
                    .join("");
        }
    }
}

/* =========================================================
   ADMIN PRODUCTS
========================================================= */

async function loadAdminProducts() {
    try {
        const data =
            await apiRequest("/products");

        products =
            (data.products || [])
                .map(normalizeProduct);

        localStorage.setItem(
            "cartivoProducts",
            JSON.stringify(products)
        );

    } catch (error) {
        console.error(
            "Admin products loading error:",
            error
        );
    }
}

function renderAdminProducts() {
    const table =
        document.getElementById(
            "productsTable"
        );

    if (!table) return;

    if (!products.length) {
        table.innerHTML = `
            <tr>
                <td colspan="5">
                    No products found.
                </td>
            </tr>
        `;
        return;
    }

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
        document.getElementById(
            "productAdminModal"
        );

    const title =
        document.getElementById(
            "productAdminTitle"
        );

    const form =
        document.getElementById(
            "productForm"
        );

    if (!modal || !form) return;

    form.reset();

    if (product) {

        if (title) {
            title.textContent =
                "Edit Product";
        }

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

        if (title) {
            title.textContent =
                "Add Product";
        }

        document
            .getElementById("editProductId")
            .value = "";
    }

    modal.classList.remove("hidden");
}

function closeProductAdminModal() {
    document
        .getElementById("productAdminModal")
        ?.classList.add("hidden");
}

function editProduct(id) {
    const product = getProduct(id);

    if (product) {
        openProductAdminModal(product);
    }
}

const productForm =
    document.getElementById("productForm");

if (productForm) {
    productForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();

            const editId =
                document
                    .getElementById(
                        "editProductId"
                    )
                    .value;

            const productData = {

                name:
                    document
                        .getElementById(
                            "adminProductName"
                        )
                        .value
                        .trim(),

                category:
                    document
                        .getElementById(
                            "adminProductCategory"
                        )
                        .value,

                price:
                    Number(
                        document
                            .getElementById(
                                "adminProductPrice"
                            )
                            .value
                    ),

                stock:
                    Number(
                        document
                            .getElementById(
                                "adminProductStock"
                            )
                            .value
                    ),

                rating:
                    Number(
                        document
                            .getElementById(
                                "adminProductRating"
                            )
                            .value
                    ) || 4.5,

                image:
                    document
                        .getElementById(
                            "adminProductImage"
                        )
                        .value
                        .trim() ||
                    "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=900&q=85",

                description:
                    document
                        .getElementById(
                            "adminProductDescription"
                        )
                        .value
                        .trim()
            };

            if (!productData.name) {
                showToast("Product name is required.");
                return;
            }

            try {

                if (editId) {

                    await apiRequest(
                        `/products/${editId}`,
                        {
                            method: "PUT",
                            body: JSON.stringify(
                                productData
                            )
                        }
                    );

                    showToast(
                        "Product updated successfully."
                    );

                } else {

                    await apiRequest(
                        "/products",
                        {
                            method: "POST",
                            body: JSON.stringify(
                                productData
                            )
                        }
                    );

                    showToast(
                        "Product added successfully."
                    );
                }

                closeProductAdminModal();

                await loadAdminProducts();
                await loadProducts();

                refreshAdmin();
                refreshStore();

            } catch (error) {

                console.error(
                    "Product save error:",
                    error
                );

                showToast(
                    error.message ||
                    "Product operation failed."
                );
            }
        }
    );
}

async function deleteProduct(id) {
    const product = getProduct(id);

    if (!product) return;

    const confirmed =
        confirm(
            `Delete "${product.name}"?`
        );

    if (!confirmed) return;

    try {

        await apiRequest(
            `/products/${id}`,
            {
                method: "DELETE"
            }
        );

        cart = cart.filter(
            item =>
                Number(item.id) !== Number(id)
        );

        wishlist = wishlist.filter(
            item =>
                Number(item) !== Number(id)
        );

        saveLocalData();

        await loadAdminProducts();
        await loadWishlist();

        refreshAdmin();
        refreshStore();

        showToast(
            "Product deleted successfully."
        );

    } catch (error) {

        console.error(
            "Delete product error:",
            error
        );

        showToast(
            error.message ||
            "Unable to delete product."
        );
    }
}

/* =========================================================
   INVENTORY
========================================================= */

async function loadInventory() {
    try {
        const data =
            await apiRequest("/inventory");

        if (Array.isArray(data.inventory)) {

            data.inventory.forEach(item => {

                const product =
                    getProduct(item.id);

                if (product) {
                    product.stock =
                        Number(item.stock);
                }
            });
        }

    } catch (error) {
        console.error(
            "Inventory loading error:",
            error
        );
    }
}

function renderInventory() {
    const table =
        document.getElementById(
            "inventoryTable"
        );

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

async function updateStock(id) {
    const input =
        document.getElementById(
            `stock-${id}`
        );

    if (!input) return;

    const stock =
        Math.max(
            0,
            Number(input.value)
        );

    try {

        await apiRequest(
            `/inventory/${id}`,
            {
                method: "PUT",
                body: JSON.stringify({
                    stock
                })
            }
        );

        const product =
            getProduct(id);

        if (product) {
            product.stock = stock;
        }

        saveLocalData();

        await loadProducts();

        renderInventory();
        updateAdminDashboard();
        renderHomeProducts();
        renderShop();

        showToast(
            "Stock updated successfully."
        );

    } catch (error) {

        console.error(
            "Stock update error:",
            error
        );

        showToast(
            error.message ||
            "Unable to update stock."
        );
    }
}

/* =========================================================
   ADMIN CATEGORIES
========================================================= */

async function loadAdminCategories() {
    await loadCategories();
}

function renderAdminCategories() {
    const grid =
        document.getElementById(
            "adminCategoryGrid"
        );

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

async function addCategory() {
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
        showToast(
            "Category already exists."
        );
        return;
    }

    try {

        await apiRequest(
            "/categories",
            {
                method: "POST",
                body: JSON.stringify({
                    name: clean
                })
            }
        );

        await loadCategories();

        refreshAdmin();
        refreshStore();

        showToast(
            "Category added successfully."
        );

    } catch (error) {

        console.error(
            "Add category error:",
            error
        );

        showToast(
            error.message ||
            "Unable to add category."
        );
    }
}

async function renameCategory(oldName) {
    const newName =
        prompt(
            "Enter new category name:",
            oldName
        );

    if (!newName) return;

    const clean =
        newName.trim();

    if (
        !clean ||
        clean === oldName
    ) {
        return;
    }

    const categoryExists =
        categories.some(
            category =>
                category.toLowerCase() ===
                clean.toLowerCase()
        );

    if (categoryExists) {
        showToast(
            "Category already exists."
        );
        return;
    }

    const oldCategory =
        categories.find(
            category =>
                category === oldName
        );

    if (!oldCategory) return;

    try {

        const categoryData =
            await apiRequest(
                "/categories"
            );

        const dbCategory =
            (categoryData.categories || [])
                .find(
                    category =>
                        category.name === oldName
                );

        if (!dbCategory) {
            showToast(
                "Category not found."
            );
            return;
        }

        await apiRequest(
            `/categories/${dbCategory.id}`,
            {
                method: "PUT",
                body: JSON.stringify({
                    name: clean
                })
            }
        );

        await loadCategories();
        await loadProducts();

        refreshAdmin();
        refreshStore();

        showToast(
            "Category renamed successfully."
        );

    } catch (error) {

        console.error(
            "Rename category error:",
            error
        );

        showToast(
            error.message ||
            "Unable to rename category."
        );
    }
}

async function deleteCategory(categoryName) {
    const count =
        products.filter(
            product =>
                product.category === categoryName
        ).length;

    if (count > 0) {
        showToast(
            "Move products before deleting this category."
        );
        return;
    }

    const confirmed =
        confirm(
            `Delete "${categoryName}" category?`
        );

    if (!confirmed) return;

    try {

        const data =
            await apiRequest(
                "/categories"
            );

        const category =
            (data.categories || [])
                .find(
                    item =>
                        item.name === categoryName
                );

        if (!category) {
            showToast(
                "Category not found."
            );
            return;
        }

        await apiRequest(
            `/categories/${category.id}`,
            {
                method: "DELETE"
            }
        );

        await loadCategories();

        refreshAdmin();
        refreshStore();

        showToast(
            "Category deleted successfully."
        );

    } catch (error) {

        console.error(
            "Delete category error:",
            error
        );

        showToast(
            error.message ||
            "Unable to delete category."
        );
    }
}

/* =========================================================
   ADMIN USERS
========================================================= */

async function loadUsers() {
    try {

        const data =
            await apiRequest(
                "/admin/users"
            );

        users =
            data.users || [];

    } catch (error) {

        console.error(
            "Users loading error:",
            error
        );

        users = [];
    }
}

function renderUsers() {
    const table =
        document.getElementById(
            "usersTable"
        );

    if (!table) return;

    if (!users.length) {
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
        users.map(user => {

            const customerOrders =
                orders.filter(
                    order =>
                        order.customer?.email ===
                        user.email
                );

            const spent =
                customerOrders.reduce(
                    (sum, order) =>
                        sum +
                        Number(order.total || 0),
                    0
                );

            return `
                <tr>

                    <td>
                        ${escapeHTML(
                            user.name || "Customer"
                        )}
                    </td>

                    <td>
                        ${escapeHTML(
                            user.email
                        )}
                    </td>

                    <td>
                        ${customerOrders.length}
                    </td>

                    <td>
                        ${money(spent)}
                    </td>

                </tr>
            `;
        }).join("");
}

/* =========================================================
   ADMIN ORDERS
========================================================= */

async function loadAdminOrders() {
    try {

        const data =
            await apiRequest(
                "/admin/orders"
            );

        orders =
            (data.orders || [])
                .map(normalizeOrder);

        localStorage.setItem(
            "cartivoOrders",
            JSON.stringify(orders)
        );

    } catch (error) {

        console.error(
            "Admin orders loading error:",
            error
        );
    }
}

function renderAdminOrders() {
    const table =
        document.getElementById(
            "adminOrdersTable"
        );

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
                        order.customer?.name ||
                        "Customer"
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
                        onchange="updateOrderStatus(${Number(order.dbId)}, this.value)"
                    >

                        ${orderStatuses.map(status => `
                            <option
                                value="${escapeHTML(status)}"
                                ${
                                    order.status === status
                                        ? "selected"
                                        : ""
                                }
                            >
                                ${escapeHTML(status)}
                            </option>
                        `).join("")}

                    </select>

                </td>

            </tr>

        `).join("");
}

async function updateOrderStatus(
    orderId,
    status
) {
    try {

        await apiRequest(
            `/admin/orders/${orderId}/status`,
            {
                method: "PUT",
                body: JSON.stringify({
                    status
                })
            }
        );

        await loadAdminOrders();

        renderAdminOrders();
        renderOrders();

        await loadAdminDashboard();

        updateAdminDashboard();

        showToast(
            `Order updated to ${status}.`
        );

    } catch (error) {

        console.error(
            "Order status error:",
            error
        );

        showToast(
            error.message ||
            "Unable to update order status."
        );
    }
}

/* =========================================================
   REFRESH STORE
========================================================= */

async function refreshStore() {
    updateProfile();

    await Promise.all([
        loadProducts(),
        loadCategories(),
        loadWishlist()
    ]);

    updateCounts();

    populateCategoryFilter();

    renderCategories();
    renderHomeProducts();
    renderShop();
    renderWishlist();
    renderCart();
}

/* =========================================================
   REFRESH ADMIN
========================================================= */

async function refreshAdmin() {
    if (
        !currentUser ||
        currentUser.role !== "admin"
    ) {
        return;
    }

    await Promise.all([
        loadAdminDashboard(),
        loadAdminProducts(),
        loadCategories(),
        loadUsers(),
        loadAdminOrders()
    ]);

    await loadInventory();

    updateAdminDashboard();

    renderAdminProducts();
    renderInventory();
    renderAdminCategories();
    renderUsers();
    renderAdminOrders();

    populateCategoryFilter();
}

/* =========================================================
   COUNTS
========================================================= */

function updateCounts() {
    const cartCount =
        document.getElementById(
            "cartCount"
        );

    const wishlistCount =
        document.getElementById(
            "wishlistCount"
        );

    if (cartCount) {
        cartCount.textContent =
            cartItemCount();
    }

    if (wishlistCount) {
        wishlistCount.textContent =
            wishlist.length;
    }
}

/* =========================================================
   CLOSE MODALS WITH ESC
========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key !== "Escape") {
            return;
        }

        closeCart();
        closeProductModal();
        closeCheckout();
        closeSuccess();
        closeProductAdminModal();
        toggleProfileMenu(true);
    }
);

/* =========================================================
   CLOSE OVERLAY
========================================================= */

document
    .getElementById("cartOverlay")
    ?.addEventListener(
        "click",
        closeCart
    );

/* =========================================================
   INITIAL LOAD
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    async function() {

        try {

            if (token()) {

                try {

                    const data =
                        await apiRequest(
                            "/auth/me"
                        );

                    if (data.user) {

                        currentUser = {
                            id: data.user.id,
                            name: data.user.name,
                            email: data.user.email,
                            role: data.user.role
                        };

                        saveLocalData();
                    }

                } catch (error) {

                    console.warn(
                        "Session validation failed:",
                        error.message
                    );

                    localStorage.removeItem(
                        "cartivoToken"
                    );

                    currentUser = null;

                    localStorage.removeItem(
                        "cartivoCurrentUser"
                    );
                }
            }

            if (currentUser) {

                document
                    .getElementById("loginPage")
                    ?.classList.add("hidden");

                if (
                    currentUser.role === "admin"
                ) {

                    document
                        .getElementById("storePage")
                        ?.classList.add("hidden");

                    openAdmin();

                } else {

                    document
                        .getElementById("adminPage")
                        ?.classList.add("hidden");

                    document
                        .getElementById("storePage")
                        ?.classList.remove("hidden");

                    await refreshStore();
                }

            } else {

                document
                    .getElementById("loginPage")
                    ?.classList.remove("hidden");

                document
                    .getElementById("storePage")
                    ?.classList.add("hidden");

                document
                    .getElementById("adminPage")
                    ?.classList.add("hidden");
            }

        } catch (error) {

            console.error(
                "Initial load error:",
                error
            );

            if (!currentUser) {
                document
                    .getElementById("loginPage")
                    ?.classList.remove("hidden");
            }
        }
    }
);
