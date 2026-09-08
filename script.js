/* =========================================================
   CARTIVO - E-COMMERCE & INVENTORY MANAGEMENT PLATFORM
   Frontend demo using HTML, CSS and JavaScript
   ========================================================= */


/* ================= DATA ================= */

const defaultProducts = [

    {
        id: 1,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 2499,
        stock: 18,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
        description: "Comfortable wireless headphones with clear sound, modern design and long battery life.",
        createdAt: 8
    },

    {
        id: 2,
        name: "Smart Watch Pro",
        category: "Electronics",
        price: 4999,
        stock: 12,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
        description: "A stylish smartwatch designed for everyday activity tracking and notifications.",
        createdAt: 7
    },

    {
        id: 3,
        name: "Minimal Backpack",
        category: "Fashion",
        price: 1799,
        stock: 25,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
        description: "Minimal everyday backpack with a spacious interior and clean modern styling.",
        createdAt: 6
    },

    {
        id: 4,
        name: "Classic Sneakers",
        category: "Fashion",
        price: 3299,
        stock: 8,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
        description: "Comfortable everyday sneakers combining classic style with lightweight comfort.",
        createdAt: 5
    },

    {
        id: 5,
        name: "Modern Table Lamp",
        category: "Home",
        price: 1499,
        stock: 14,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
        description: "Elegant table lamp that adds a warm and modern touch to your room.",
        createdAt: 4
    },

    {
        id: 6,
        name: "Ceramic Coffee Set",
        category: "Home",
        price: 999,
        stock: 31,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=80",
        description: "A clean ceramic coffee set perfect for everyday coffee moments.",
        createdAt: 3
    },

    {
        id: 7,
        name: "Portable Speaker",
        category: "Electronics",
        price: 2199,
        stock: 5,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80",
        description: "Compact portable speaker with powerful sound and a travel-friendly design.",
        createdAt: 2
    },

    {
        id: 8,
        name: "Premium Sunglasses",
        category: "Fashion",
        price: 1999,
        stock: 16,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
        description: "Modern sunglasses with a timeless frame designed for everyday wear.",
        createdAt: 1
    },

    {
        id: 9,
        name: "Desk Organizer",
        category: "Home",
        price: 699,
        stock: 22,
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=800&q=80",
        description: "Keep your workspace clean and organized with this simple desk organizer.",
        createdAt: 9
    },

    {
        id: 10,
        name: "Mechanical Keyboard",
        category: "Electronics",
        price: 3799,
        stock: 10,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
        description: "Responsive mechanical keyboard designed for productivity and gaming.",
        createdAt: 10
    },

    {
        id: 11,
        name: "Everyday Hoodie",
        category: "Fashion",
        price: 1599,
        stock: 20,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
        description: "Soft everyday hoodie with a relaxed fit and comfortable fabric.",
        createdAt: 11
    },

    {
        id: 12,
        name: "Minimal Wall Clock",
        category: "Home",
        price: 1199,
        stock: 7,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=800&q=80",
        description: "Minimal wall clock that fits naturally into modern interiors.",
        createdAt: 12
    }

];


const defaultCategories = [
    {
        id: 1,
        name: "Electronics",
        image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        name: "Fashion",
        image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        name: "Home",
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4,
        name: "Lifestyle",
        image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80"
    }
];


let products = loadData("cartivoProducts", defaultProducts);

let categories = loadData(
    "cartivoCategories",
    defaultCategories
);

let cart = loadData(
    "cartivoCart",
    []
);

let orders = loadData(
    "cartivoOrders",
    []
);

let wishlist = loadData(
    "cartivoWishlist",
    []
);

let currentUser = loadData(
    "cartivoCurrentUser",
    null
);


/* ================= HELPERS ================= */

function loadData(key, fallback) {

    try {

        const data = localStorage.getItem(key);

        if (!data) {
            return JSON.parse(JSON.stringify(fallback));
        }

        return JSON.parse(data);

    } catch (error) {

        return JSON.parse(JSON.stringify(fallback));

    }

}


function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}


function money(value) {
    return "₹" + Number(value).toLocaleString("en-IN");
}


function escapeHtml(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* ================= LOGIN ================= */

document
    .getElementById("loginForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const email = document
            .getElementById("loginEmail")
            .value
            .trim();

        const password = document
            .getElementById("loginPassword")
            .value;

        if (!email || !password) {
            showToast("Please enter email and password.");
            return;
        }

        currentUser = {
            name: email
                .split("@")[0]
                .replace(/[._-]/g, " ")
                .replace(/\b\w/g, char => char.toUpperCase()),

            email: email
        };

        saveData(
            "cartivoCurrentUser",
            currentUser
        );

        updateUserUI();

        document
            .getElementById("loginPage")
            .classList.add("hidden");

        document
            .getElementById("storePage")
            .classList.remove("hidden");

        showStore();

        showToast("Welcome to Cartivo!");

    });


function updateUserUI() {

    if (!currentUser) return;

    const name =
        currentUser.name || "Customer";

    const email =
        currentUser.email || "customer@example.com";

    document.getElementById("profileName").textContent =
        name;

    document.getElementById("profileEmail").textContent =
        email;

    document.getElementById("userInitial").textContent =
        name.charAt(0).toUpperCase();

}


function logout() {

    currentUser = null;

    localStorage.removeItem(
        "cartivoCurrentUser"
    );

    document
        .getElementById("storePage")
        .classList.add("hidden");

    document
        .getElementById("adminPage")
        .classList.add("hidden");

    document
        .getElementById("loginPage")
        .classList.remove("hidden");

    showToast("Logged out successfully.");

}


/* ================= INITIALIZATION ================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateUserUI();

        populateCategories();

        renderCategoryCards();

        renderProducts();

        updateCartUI();

        updateWishlistCount();

        setupSearch();

    }
);


/* ================= STORE NAVIGATION ================= */

function showStore() {

    document
        .getElementById("loginPage")
        .classList.add("hidden");

    document
        .getElementById("adminPage")
        .classList.add("hidden");

    document
        .getElementById("storePage")
        .classList.remove("hidden");

    hideCustomerSections();

    document
        .getElementById("homeSection")
        .classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    updateUserUI();

}


function hideCustomerSections() {

    document
        .getElementById("ordersSection")
        .classList.add("hidden");

    document
        .getElementById("wishlistSection")
        .classList.add("hidden");

    document
        .getElementById("homeSection")
        .classList.remove("hidden");

}


function scrollToShop() {

    showStore();

    setTimeout(() => {

        document
            .getElementById("shopSection")
            .scrollIntoView({
                behavior: "smooth"
            });

    }, 50);

}


function scrollToCategories() {

    showStore();

    setTimeout(() => {

        document
            .getElementById("categoriesSection")
            .scrollIntoView({
                behavior: "smooth"
            });

    }, 50);

}


function showAllProducts() {

    showStore();

    setTimeout(() => {

        document
            .getElementById("categoryFilter")
            .value = "All";

        renderProducts();

        scrollToShop();

    }, 50);

}


/* ================= PROFILE ================= */

function toggleProfileMenu() {

    document
        .getElementById("profileMenu")
        .classList.toggle("hidden");

}


/* ================= CATEGORIES ================= */

function populateCategories() {

    const filter =
        document.getElementById("categoryFilter");

    const adminSelect =
        document.getElementById("adminProductCategory");

    filter.innerHTML =
        `<option value="All">All Categories</option>`;

    adminSelect.innerHTML = "";

    categories.forEach(category => {

        filter.innerHTML += `
            <option value="${escapeHtml(category.name)}">
                ${escapeHtml(category.name)}
            </option>
        `;

        adminSelect.innerHTML += `
            <option value="${escapeHtml(category.name)}">
                ${escapeHtml(category.name)}
            </option>
        `;

    });

}


function renderCategoryCards() {

    const container =
        document.getElementById("categoryCards");

    container.innerHTML = "";

    categories.forEach(category => {

        const count =
            products.filter(
                product =>
                    product.category === category.name
            ).length;

        container.innerHTML += `

            <div
                class="category-card"
                onclick="filterByCategory('${escapeHtml(category.name)}')"
            >

                <img
                    src="${category.image}"
                    alt="${escapeHtml(category.name)}"
                >

                <div class="category-card-content">

                    <h3>
                        ${escapeHtml(category.name)}
                    </h3>

                    <p>
                        ${count} products
                    </p>

                </div>

            </div>

        `;

    });

}


function filterByCategory(category) {

    showStore();

    document
        .getElementById("categoryFilter")
        .value = category;

    renderProducts();

    setTimeout(() => {

        document
            .getElementById("shopSection")
            .scrollIntoView({
                behavior: "smooth"
            });

    }, 50);

}


/* ================= SEARCH + FILTER ================= */

function setupSearch() {

    document
        .getElementById("shopSearch")
        .addEventListener(
            "input",
            renderProducts
        );

    document
        .getElementById("navSearch")
        .addEventListener(
            "input",
            function() {

                document
                    .getElementById("shopSearch")
                    .value = this.value;

                showStore();

                renderProducts();

            }
        );

    document
        .getElementById("categoryFilter")
        .addEventListener(
            "change",
            renderProducts
        );

    document
        .getElementById("priceFilter")
        .addEventListener(
            "change",
            renderProducts
        );

    document
        .getElementById("sortFilter")
        .addEventListener(
            "change",
            renderProducts
        );

}


function renderProducts() {

    const grid =
        document.getElementById("productGrid");

    const empty =
        document.getElementById("emptyProducts");

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


    let filtered = products.filter(product => {

        const matchesSearch =
            product.name
                .toLowerCase()
                .includes(search) ||

            product.category
                .toLowerCase()
                .includes(search);

        const matchesCategory =
            category === "All" ||
            product.category === category;

        let matchesPrice = true;

        if (price === "0-1000") {
            matchesPrice =
                product.price < 1000;
        }

        if (price === "1000-5000") {
            matchesPrice =
                product.price >= 1000 &&
                product.price <= 5000;
        }

        if (price === "5000-15000") {
            matchesPrice =
                product.price > 5000 &&
                product.price <= 15000;
        }

        if (price === "15000+") {
            matchesPrice =
                product.price > 15000;
        }

        return (
            matchesSearch &&
            matchesCategory &&
            matchesPrice
        );

    });


    if (sort === "low") {

        filtered.sort(
            (a, b) =>
                a.price - b.price
        );

    }

    if (sort === "high") {

        filtered.sort(
            (a, b) =>
                b.price - a.price
        );

    }

    if (sort === "rating") {

        filtered.sort(
            (a, b) =>
                b.rating - a.rating
        );

    }

    if (sort === "new") {

        filtered.sort(
            (a, b) =>
                b.createdAt - a.createdAt
        );

    }


    grid.innerHTML = "";


    filtered.forEach(product => {

        const isWishlisted =
            wishlist.includes(product.id);

        const outOfStock =
            product.stock <= 0;


        grid.innerHTML += `

            <article class="product-card">

                <div class="product-image">

                    <img
                        src="${product.image}"
                        alt="${escapeHtml(product.name)}"
                    >

                    ${
                        outOfStock
                        ?
                        `<div class="stock-label">
                            Out of stock
                        </div>`
                        :
                        product.stock <= 5
                        ?
                        `<div class="stock-label">
                            Only ${product.stock} left
                        </div>`
                        :
                        ""
                    }

                    <button
                        class="wishlist-btn ${
                            isWishlisted
                            ? "active"
                            : ""
                        }"
                        onclick="toggleWishlist(${product.id})"
                    >
                        ${isWishlisted ? "♥" : "♡"}
                    </button>

                </div>


                <div class="product-info">

                    <span class="product-category">
                        ${escapeHtml(product.category)}
                    </span>

                    <h3
                        onclick="openProduct(${product.id})"
                        style="cursor:pointer"
                    >
                        ${escapeHtml(product.name)}
                    </h3>

                    <div class="product-rating">
                        ★ ${product.rating}
                    </div>


                    <div class="product-bottom">

                        <span class="product-price">
                            ${money(product.price)}
                        </span>

                        <button
                            class="add-btn"
                            onclick="addToCart(${product.id})"
                            ${
                                outOfStock
                                ? "disabled"
                                : ""
                            }
                        >
                            +
                        </button>

                    </div>

                </div>

            </article>

        `;

    });


    if (filtered.length === 0) {

        empty.classList.remove("hidden");

    } else {

        empty.classList.add("hidden");

    }

}


/* ================= PRODUCT DETAILS ================= */

function openProduct(id) {

    const product =
        products.find(
            item => item.id === id
        );

    if (!product) return;

    const modal =
        document.getElementById("productModal");

    const details =
        document.getElementById("productDetails");

    details.innerHTML = `

        <div class="product-detail">

            <div class="product-detail-image">

                <img
                    src="${product.image}"
                    alt="${escapeHtml(product.name)}"
                >

            </div>

            <div class="product-detail-info">

                <p class="eyebrow">
                    ${escapeHtml(product.category)}
                </p>

                <h2>
                    ${escapeHtml(product.name)}
                </h2>

                <div class="product-rating">
                    ★ ${product.rating} / 5
                </div>

                <div class="detail-price">
                    ${money(product.price)}
                </div>

                <p class="detail-description">
                    ${escapeHtml(product.description)}
                </p>

                <div class="detail-stock">

                    ${
                        product.stock > 0
                        ?
                        `✓ ${product.stock} units available`
                        :
                        `✕ Currently out of stock`
                    }

                </div>

                <button
                    class="primary-btn full-btn"
                    onclick="addToCart(${product.id}); closeProductModal();"
                    ${
                        product.stock <= 0
                        ? "disabled"
                        : ""
                    }
                >
                    Add to Cart
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


/* ================= WISHLIST ================= */

function toggleWishlist(id) {

    const index =
        wishlist.indexOf(id);

    if (index >= 0) {

        wishlist.splice(index, 1);

        showToast("Removed from wishlist.");

    } else {

        wishlist.push(id);

        showToast("Added to wishlist.");

    }

    saveData(
        "cartivoWishlist",
        wishlist
    );

    updateWishlistCount();

    renderProducts();

}


function updateWishlistCount() {

    document
        .getElementById("wishlistCount")
        .textContent =
        wishlist.length;

}


function showWishlist() {

    hideCustomerSections();

    document
        .getElementById("wishlistSection")
        .classList.remove("hidden");

    const grid =
        document.getElementById("wishlistGrid");

    const items =
        products.filter(
            product =>
                wishlist.includes(product.id)
        );

    grid.innerHTML = "";

    items.forEach(product => {

        grid.innerHTML += `

            <article class="product-card">

                <div class="product-image">

                    <img
                        src="${product.image}"
                        alt="${escapeHtml(product.name)}"
                    >

                    <button
                        class="wishlist-btn active"
                        onclick="toggleWishlist(${product.id})"
                    >
                        ♥
                    </button>

                </div>

                <div class="product-info">

                    <span class="product-category">
                        ${escapeHtml(product.category)}
                    </span>

                    <h3>
                        ${escapeHtml(product.name)}
                    </h3>

                    <div class="product-bottom">

                        <span class="product-price">
                            ${money(product.price)}
                        </span>

                        <button
                            class="add-btn"
                            onclick="addToCart(${product.id})"
                        >
                            +
                        </button>

                    </div>

                </div>

            </article>

        `;

    });


    if (items.length === 0) {

        grid.innerHTML = `

            <div class="empty-state">

                <div>♡</div>

                <h3>Your wishlist is empty</h3>

                <p>
                    Save products you like and find them here.
                </p>

            </div>

        `;

    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* ================= CART ================= */

function addToCart(id) {

    const product =
        products.find(
            item => item.id === id
        );

    if (!product) return;

    if (product.stock <= 0) {

        showToast("This product is out of stock.");

        return;

    }


    const existing =
        cart.find(
            item => item.id === id
        );


    if (existing) {

        if (existing.quantity >= product.stock) {

            showToast("Maximum available stock reached.");

            return;

        }

        existing.quantity++;

    } else {

        cart.push({
            id: id,
            quantity: 1
        });

    }


    saveData(
        "cartivoCart",
        cart
    );

    updateCartUI();

    showToast("Added to cart.");

}


function updateCartUI() {

    const totalItems =
        cart.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );

    document
        .getElementById("cartCount")
        .textContent =
        totalItems;


    const container =
        document.getElementById("cartItems");

    if (cart.length === 0) {

        container.innerHTML = `

            <div class="empty-state">

                <div>🛒</div>

                <h3>Your cart is empty</h3>

                <p>
                    Add products to start shopping.
                </p>

            </div>

        `;

        updateCartTotals();

        return;

    }


    container.innerHTML = "";


    cart.forEach(item => {

        const product =
            products.find(
                product =>
                    product.id === item.id
            );

        if (!product) return;


        container.innerHTML += `

            <div class="cart-item">

                <img
                    src="${product.image}"
                    alt="${escapeHtml(product.name)}"
                >

                <div>

                    <h4>
                        ${escapeHtml(product.name)}
                    </h4>

                    <div class="cart-item-price">
                        ${money(product.price)}
                    </div>


                    <div class="quantity-control">

                        <button
                            onclick="changeQuantity(${product.id}, -1)"
                        >
                            −
                        </button>

                        <strong>
                            ${item.quantity}
                        </strong>

                        <button
                            onclick="changeQuantity(${product.id}, 1)"
                        >
                            +
                        </button>

                        <button
                            class="remove-cart"
                            onclick="removeFromCart(${product.id})"
                        >
                            Remove
                        </button>

                    </div>

                </div>

            </div>

        `;

    });


    updateCartTotals();

}


function changeQuantity(id, amount) {

    const item =
        cart.find(
            item =>
                item.id === id
        );

    const product =
        products.find(
            product =>
                product.id === id
        );

    if (!item || !product) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                item =>
                    item.id !== id
            );

    }


    if (item.quantity > product.stock) {

        item.quantity =
            product.stock;

        showToast(
            "Available stock limit reached."
        );

    }


    saveData(
        "cartivoCart",
        cart
    );

    updateCartUI();

}


function removeFromCart(id) {

    cart =
        cart.filter(
            item =>
                item.id !== id
        );

    saveData(
        "cartivoCart",
        cart
    );

    updateCartUI();

    showToast("Item removed.");

}


function getCartTotal() {

    return cart.reduce(
        (total, item) => {

            const product =
                products.find(
                    product =>
                        product.id === item.id
                );

            if (!product) return total;

            return total +
                product.price *
                item.quantity;

        },
        0
    );

}


function updateCartTotals() {

    const total =
        getCartTotal();

    document
        .getElementById("cartSubtotal")
        .textContent =
        money(total);

    document
        .getElementById("cartTotal")
        .textContent =
        money(total);

}


function openCart() {

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


/* ================= CHECKOUT ================= */

function openCheckout() {

    if (cart.length === 0) {

        showToast("Your cart is empty.");

        return;

    }

    closeCart();

    document
        .getElementById("checkoutTotal")
        .textContent =
        money(getCartTotal());


    if (currentUser) {

        document
            .getElementById("checkoutName")
            .value =
            currentUser.name || "";

        document
            .getElementById("checkoutEmail")
            .value =
            currentUser.email || "";

    }


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
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            if (cart.length === 0) {

                closeCheckout();

                showToast(
                    "Your cart is empty."
                );

                return;

            }


            const customerName =
                document
                    .getElementById("checkoutName")
                    .value
                    .trim();

            const email =
                document
                    .getElementById("checkoutEmail")
                    .value
                    .trim();

            const phone =
                document
                    .getElementById("checkoutPhone")
                    .value
                    .trim();

            const address =
                document
                    .getElementById("checkoutAddress")
                    .value
                    .trim();

            const city =
                document
                    .getElementById("checkoutCity")
                    .value
                    .trim();

            const zip =
                document
                    .getElementById("checkoutZip")
                    .value
                    .trim();

            const payment =
                document.querySelector(
                    'input[name="payment"]:checked'
                ).value;


            const orderItems =
                cart.map(item => {

                    const product =
                        products.find(
                            product =>
                                product.id === item.id
                        );

                    return {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        quantity: item.quantity,
                        image: product.image
                    };

                });


            const total =
                getCartTotal();


            const order = {

                id:
                    "CT-" +
                    Math.floor(
                        10000 +
                        Math.random() * 90000
                    ),

                customer:
                    customerName,

                email:
                    email,

                phone:
                    phone,

                address:
                    address,

                city:
                    city,

                zip:
                    zip,

                payment:
                    payment,

                items:
                    orderItems,

                total:
                    total,

                status:
                    "Placed",

                date:
                    new Date().toISOString()

            };


            /* Reduce inventory */

            cart.forEach(item => {

                const product =
                    products.find(
                        product =>
                            product.id === item.id
                    );

                if (product) {

                    product.stock =
                        Math.max(
                            0,
                            product.stock -
                            item.quantity
                        );

                }

            });


            orders.unshift(order);

            cart = [];


            saveData(
                "cartivoOrders",
                orders
            );

            saveData(
                "cartivoProducts",
                products
            );

            saveData(
                "cartivoCart",
                cart
            );


            document
                .getElementById("successOrderId")
                .textContent =
                order.id;


            closeCheckout();

            updateCartUI();

            renderProducts();

            document
                .getElementById("successModal")
                .classList.remove("hidden");

        }
    );


function closeSuccess() {

    document
        .getElementById("successModal")
        .classList.add("hidden");

    showStore();

}


function viewLatestOrder() {

    closeSuccess();

    showOrders();

}


/* ================= ORDERS ================= */

function showOrders() {

    hideCustomerSections();

    document
        .getElementById("ordersSection")
        .classList.remove("hidden");

    renderOrders();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


function renderOrders() {

    const container =
        document.getElementById("ordersList");

    if (orders.length === 0) {

        container.innerHTML = `

            <div class="empty-state">

                <div>📦</div>

                <h3>No orders yet</h3>

                <p>
                    Your placed orders will appear here.
                </p>

                <br>

                <button
                    class="primary-btn"
                    onclick="scrollToShop()"
                >
                    Start Shopping
                </button>

            </div>

        `;

        return;

    }


    container.innerHTML = "";


    orders.forEach(order => {

        container.innerHTML += createOrderHTML(
            order
        );

    });

}


function createOrderHTML(order) {

    const statusClass =
        "status-" +
        order.status.toLowerCase();


    const productHTML =
        order.items.map(item => `

            <div class="order-product-mini">

                <img
                    src="${item.image}"
                    alt="${escapeHtml(item.name)}"
                >

                <span>
                    ${escapeHtml(item.name)}
                    × ${item.quantity}
                </span>

            </div>

        `).join("");


    return `

        <div class="order-card">

            <div class="order-head">

                <div>

                    <div class="order-id">
                        ${order.id}
                    </div>

                    <div class="order-date">
                        ${formatDate(order.date)}
                    </div>

                </div>

                <span
                    class="status-badge ${statusClass}"
                >
                    ${order.status}
                </span>

            </div>


            <div class="order-products">
                ${productHTML}
            </div>


            <div class="order-bottom">

                <div>

                    <span class="order-total">
                        ${money(order.total)}
                    </span>

                    <small>
                        · ${escapeHtml(order.payment)}
                    </small>

                </div>

                <button
                    class="track-btn"
                    onclick="toggleTracking('${order.id}')"
                >
                    Track Order
                </button>

            </div>


            <div
                id="tracking-${order.id}"
                class="tracking hidden"
            >
                ${createTrackingHTML(order.status)}
            </div>

        </div>

    `;

}


function toggleTracking(orderId) {

    const tracking =
        document.getElementById(
            "tracking-" + orderId
        );

    tracking.classList.toggle("hidden");

}


function createTrackingHTML(status) {

    const statuses = [
        "Placed",
        "Confirmed",
        "Packed",
        "Shipped",
        "Delivered"
    ];

    let currentIndex =
        statuses.indexOf(status);

    if (currentIndex < 0) {
        currentIndex = 0;
    }


    const percent =
        (currentIndex / 4) * 100;


    const steps =
        statuses.map(
            (item, index) => `

                <div
                    class="tracking-step ${
                        index <= currentIndex
                        ? "active"
                        : ""
                    }"
                >

                    <div class="circle">
                        ${
                            index <= currentIndex
                            ? "✓"
                            : index + 1
                        }
                    </div>

                    <small>
                        ${item}
                    </small>

                </div>

            `
        ).join("");


    return `

        <div class="tracking-line">

            <div class="tracking-connector">

                <div
                    class="tracking-connector-fill"
                    style="width:${percent}%"
                ></div>

            </div>

            ${steps}

        </div>

    `;

}


function formatDate(date) {

    return new Date(date)
        .toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
                year: "numeric"
            }
        );

}


/* ================= ADMIN ACCESS ================= */

function openAdmin() {

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

    updateAdminDashboard();

}


/* Add Admin button dynamically */

const adminButton =
    document.createElement("button");

adminButton.className =
    "outline-btn";

adminButton.textContent =
    "Admin";

adminButton.style.marginLeft =
    "5px";

adminButton.onclick =
    openAdmin;

document
    .querySelector(".nav-actions")
    .appendChild(adminButton);


/* ================= ADMIN SECTIONS ================= */

function adminSection(section, button) {

    document
        .querySelectorAll(".admin-section")
        .forEach(
            element =>
                element.classList.add("hidden")
        );


    document
        .querySelectorAll(".admin-nav")
        .forEach(
            element =>
                element.classList.remove("active")
        );


    const titles = {

        dashboard:
            "Dashboard",

        products:
            "Products",

        inventory:
            "Inventory",

        categories:
            "Categories",

        users:
            "Users",

        orders:
            "Orders"

    };


    document
        .getElementById("adminTitle")
        .textContent =
        titles[section];


    const sectionMap = {

        dashboard:
            "adminDashboard",

        products:
            "adminProductsSection",

        inventory:
            "adminInventorySection",

        categories:
            "adminCategoriesSection",

        users:
            "adminUsersSection",

        orders:
            "adminOrdersSection"

    };


    document
        .getElementById(sectionMap[section])
        .classList.remove("hidden");


    if (button) {

        button.classList.add("active");

    }


    if (section === "dashboard") {
        updateAdminDashboard();
    }

    if (section === "products") {
        renderProductsTable();
    }

    if (section === "inventory") {
        renderInventoryTable();
    }

    if (section === "categories") {
        renderAdminCategories();
    }

    if (section === "users") {
        renderUsersTable();
    }

    if (section === "orders") {
        renderOrdersTable();
    }

}


function adminSectionByName(section) {

    openAdmin();

    const buttons =
        document.querySelectorAll(
            ".admin-nav"
        );

    const indexMap = {
        dashboard: 0,
        products: 1,
        inventory: 2,
        categories: 3,
        users: 4,
        orders: 5
    };

    adminSection(
        section,
        buttons[indexMap[section]]
    );

}


/* ================= ADMIN DASHBOARD ================= */

function updateAdminDashboard() {

    const sales =
        orders.reduce(
            (sum, order) =>
                sum + order.total,
            0
        );

    const lowStock =
        products.filter(
            product =>
                product.stock <= 5
        ).length;


    document
        .getElementById("adminSales")
        .textContent =
        money(sales);

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


    renderRecentOrders();

    renderInventoryAlert();

}


function renderRecentOrders() {

    const container =
        document.getElementById(
            "recentOrders"
        );

    const recent =
        orders.slice(0, 5);


    if (recent.length === 0) {

        container.innerHTML = `

            <div class="empty-state">
                <p>No orders yet.</p>
            </div>

        `;

        return;

    }


    container.innerHTML = "";


    recent.forEach(order => {

        container.innerHTML += `

            <div class="admin-order-row">

                <div>

                    <strong>
                        ${order.id}
                    </strong>

                    <small>
                        ${escapeHtml(order.customer)}
                    </small>

                </div>

                <div>

                    <strong>
                        ${money(order.total)}
                    </strong>

                    <small>
                        ${order.status}
                    </small>

                </div>

            </div>

        `;

    });

}


function renderInventoryAlert() {

    const container =
        document.getElementById(
            "inventoryAlert"
        );

    const low =
        products
            .filter(
                product =>
                    product.stock <= 5
            )
            .sort(
                (a, b) =>
                    a.stock - b.stock
            );


    if (low.length === 0) {

        container.innerHTML = `

            <div class="empty-state">
                <p>All products have healthy stock.</p>
            </div>

        `;

        return;

    }


    container.innerHTML = "";


    low.forEach(product => {

        container.innerHTML += `

            <div class="inventory-alert-row">

                <div>

                    <strong>
                        ${escapeHtml(product.name)}
                    </strong>

                    <small>
                        ${escapeHtml(product.category)}
                    </small>

                </div>

                <strong class="${
                    product.stock === 0
                    ? "stock-out"
                    : "stock-low"
                }">

                    ${
                        product.stock === 0
                        ? "Out of stock"
                        :
                        `${product.stock} left`
                    }

                </strong>

            </div>

        `;

    });

}


/* ================= ADMIN PRODUCTS ================= */

function renderProductsTable() {

    const tbody =
        document.getElementById(
            "productsTable"
        );

    tbody.innerHTML = "";


    products.forEach(product => {

        let status = "In Stock";
        let statusClass = "stock-good";


        if (product.stock === 0) {

            status = "Out of Stock";
            statusClass = "stock-out";

        } else if (product.stock <= 5) {

            status = "Low Stock";
            statusClass = "stock-low";

        }


        tbody.innerHTML += `

            <tr>

                <td>

                    <div class="product-table-info">

                        <img
                            src="${product.image}"
                            alt=""
                        >

                        <div>

                            <strong>
                                ${escapeHtml(product.name)}
                            </strong>

                            <small>
                                ID: ${product.id}
                            </small>

                        </div>

                    </div>

                </td>

                <td>
                    ${escapeHtml(product.category)}
                </td>

                <td>
                    ${money(product.price)}
                </td>

                <td>
                    ${product.stock}
                </td>

                <td class="${statusClass}">
                    ${status}
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

        `;

    });

}


/* ================= ADD / EDIT PRODUCT ================= */

function openAddProduct() {

    document
        .getElementById("productAdminTitle")
        .textContent =
        "Add Product";

    document
        .getElementById("productForm")
        .reset();

    document
        .getElementById("editProductId")
        .value = "";

    populateCategories();

    document
        .getElementById("productAdminModal")
        .classList.remove("hidden");

}


function editProduct(id) {

    const product =
        products.find(
            item =>
                item.id === id
        );

    if (!product) return;


    document
        .getElementById("productAdminTitle")
        .textContent =
        "Edit Product";


    document
        .getElementById("editProductId")
        .value =
        product.id;

    document
        .getElementById("adminProductName")
        .value =
        product.name;

    document
        .getElementById("adminProductPrice")
        .value =
        product.price;

    document
        .getElementById("adminProductStock")
        .value =
        product.stock;

    document
        .getElementById("adminProductCategory")
        .value =
        product.category;

    document
        .getElementById("adminProductImage")
        .value =
        product.image;

    document
        .getElementById("adminProductDescription")
        .value =
        product.description;


    document
        .getElementById("productAdminModal")
        .classList.remove("hidden");

}


document
    .getElementById("productForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const id =
                document
                    .getElementById("editProductId")
                    .value;


            const name =
                document
                    .getElementById("adminProductName")
                    .value
                    .trim();

            const price =
                Number(
                    document
                        .getElementById("adminProductPrice")
                        .value
                );

            const stock =
                Number(
                    document
                        .getElementById("adminProductStock")
                        .value
                );

            const category =
                document
                    .getElementById("adminProductCategory")
                    .value;

            const image =
                document
                    .getElementById("adminProductImage")
                    .value
                    .trim();

            const description =
                document
                    .getElementById("adminProductDescription")
                    .value
                    .trim();


            if (id) {

                const product =
                    products.find(
                        item =>
                            item.id === Number(id)
                    );

                if (product) {

                    product.name =
                        name;

                    product.price =
                        price;

                    product.stock =
                        stock;

                    product.category =
                        category;

                    if (image) {
                        product.image =
                            image;
                    }

                    product.description =
                        description;

                }

                showToast(
                    "Product updated."
                );

            } else {

                const newProduct = {

                    id:
                        Date.now(),

                    name:
                        name,

                    category:
                        category,

                    price:
                        price,

                    stock:
                        stock,

                    rating:
                        4.5,

                    image:
                        image ||
                        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=800&q=80",

                    description:
                        description ||
                        "New Cartivo product.",

                    createdAt:
                        Date.now()

                };


                products.push(
                    newProduct
                );

                showToast(
                    "Product added."
                );

            }


            saveData(
                "cartivoProducts",
                products
            );


            closeAdminProductModal();

            renderProducts();

            renderCategoryCards();

            renderProductsTable();

            updateAdminDashboard();

        }
    );


function closeAdminProductModal() {

    document
        .getElementById("productAdminModal")
        .classList.add("hidden");

}


function deleteProduct(id) {

    const product =
        products.find(
            item =>
                item.id === id
        );

    if (!product) return;


    const confirmed =
        confirm(
            `Delete "${product.name}"?`
        );


    if (!confirmed) return;


    products =
        products.filter(
            product =>
                product.id !== id
        );


    cart =
        cart.filter(
            item =>
                item.id !== id
        );


    wishlist =
        wishlist.filter(
            item =>
                item !== id
        );


    saveData(
        "cartivoProducts",
        products
    );

    saveData(
        "cartivoCart",
        cart
    );

    saveData(
        "cartivoWishlist",
        wishlist
    );


    renderProducts();

    updateCartUI();

    updateWishlistCount();

    renderCategoryCards();

    renderProductsTable();

    updateAdminDashboard();

    showToast(
        "Product deleted."
    );

}


/* ================= INVENTORY ================= */

function renderInventoryTable() {

    const tbody =
        document.getElementById(
            "inventoryTable"
        );

    tbody.innerHTML = "";


    products.forEach(product => {

        let status =
            "Healthy";

        let className =
            "stock-good";


        if (product.stock === 0) {

            status =
                "Out of Stock";

            className =
                "stock-out";

        } else if (product.stock <= 5) {

            status =
                "Low Stock";

            className =
                "stock-low";

        }


        tbody.innerHTML += `

            <tr>

                <td>
                    <strong>
                        ${escapeHtml(product.name)}
                    </strong>
                </td>

                <td>
                    ${escapeHtml(product.category)}
                </td>

                <td>
                    ${product.stock}
                </td>

                <td class="${className}">
                    ${status}
                </td>

                <td>

                    <input
                        type="number"
                        min="0"
                        value="${product.stock}"
                        style="width:90px;padding:7px;border:1px solid #ddd;border-radius:6px"
                        onchange="updateStock(${product.id}, this.value)"
                    >

                </td>

            </tr>

        `;

    });

}


function updateStock(id, value) {

    const product =
        products.find(
            item =>
                item.id === id
        );

    if (!product) return;


    product.stock =
        Math.max(
            0,
            Number(value)
        );


    saveData(
        "cartivoProducts",
        products
    );


    renderInventoryTable();

    renderProducts();

    renderProductsTable();

    updateAdminDashboard();

    showToast(
        "Inventory updated."
    );

}


/* ================= CATEGORIES ADMIN ================= */

function renderAdminCategories() {

    const container =
        document.getElementById(
            "adminCategoryGrid"
        );

    container.innerHTML = "";


    categories.forEach(category => {

        const count =
            products.filter(
                product =>
                    product.category === category.name
            ).length;


        container.innerHTML += `

            <div class="admin-category-card">

                <h3>
                    ${escapeHtml(category.name)}
                </h3>

                <p>
                    ${count} products
                </p>

                <button
                    class="action-btn edit-btn"
                    onclick="renameCategory(${category.id})"
                >
                    Edit
                </button>

                <button
                    class="action-btn delete-btn"
                    onclick="deleteCategory(${category.id})"
                >
                    Delete
                </button>

            </div>

        `;

    });

}


function addCategory() {

    const name =
        prompt(
            "Enter new category name:"
        );

    if (!name) return;


    const exists =
        categories.some(
            category =>
                category.name.toLowerCase() ===
                name.trim().toLowerCase()
        );


    if (exists) {

        showToast(
            "Category already exists."
        );

        return;

    }


    categories.push({

        id:
            Date.now(),

        name:
            name.trim(),

        image:
            "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=800&q=80"

    });


    saveData(
        "cartivoCategories",
        categories
    );


    populateCategories();

    renderCategoryCards();

    renderAdminCategories();

    showToast(
        "Category added."
    );

}


function renameCategory(id) {

    const category =
        categories.find(
            item =>
                item.id === id
        );

    if (!category) return;


    const newName =
        prompt(
            "Enter new category name:",
            category.name
        );


    if (!newName) return;


    const oldName =
        category.name;

    category.name =
        newName.trim();


    products.forEach(product => {

        if (
            product.category === oldName
        ) {

            product.category =
                category.name;

        }

    });


    saveData(
        "cartivoCategories",
        categories
    );

    saveData(
        "cartivoProducts",
        products
    );


    populateCategories();

    renderCategoryCards();

    renderAdminCategories();

    renderProducts();

    showToast(
        "Category updated."
    );

}


function deleteCategory(id) {

    const category =
        categories.find(
            item =>
                item.id === id
        );

    if (!category) return;


    const used =
        products.some(
            product =>
                product.category ===
                category.name
        );


    if (used) {

        showToast(
            "Cannot delete category with products."
        );

        return;

    }


    const confirmed =
        confirm(
            `Delete "${category.name}"?`
        );


    if (!confirmed) return;


    categories =
        categories.filter(
            item =>
                item.id !== id
        );


    saveData(
        "cartivoCategories",
        categories
    );


    populateCategories();

    renderCategoryCards();

    renderAdminCategories();

    showToast(
        "Category deleted."
    );

}


/* ================= USERS ================= */

function getUsers() {

    const userMap = {};


    orders.forEach(order => {

        if (!userMap[order.email]) {

            userMap[order.email] = {

                name:
                    order.customer,

                email:
                    order.email,

                orders:
                    0

            };

        }


        userMap[order.email].orders++;

    });


    if (
        currentUser &&
        !userMap[currentUser.email]
    ) {

        userMap[currentUser.email] = {

            name:
                currentUser.name,

            email:
                currentUser.email,

            orders:
                0

        };

    }


    return Object.values(
        userMap
    );

}


function renderUsersTable() {

    const tbody =
        document.getElementById(
            "usersTable"
        );

    const users =
        getUsers();


    tbody.innerHTML = "";


    if (users.length === 0) {

        tbody.innerHTML = `

            <tr>

                <td colspan="4">
                    No customers yet.
                </td>

            </tr>

        `;

        return;

    }


    users.forEach(user => {

        tbody.innerHTML += `

            <tr>

                <td>
                    <strong>
                        ${escapeHtml(user.name)}
                    </strong>
                </td>

                <td>
                    ${escapeHtml(user.email)}
                </td>

                <td>
                    ${user.orders}
                </td>

                <td class="stock-good">
                    Active
                </td>

            </tr>

        `;

    });

}


/* ================= ADMIN ORDERS ================= */

function renderOrdersTable() {

    const tbody =
        document.getElementById(
            "ordersTable"
        );

    tbody.innerHTML = "";


    if (orders.length === 0) {

        tbody.innerHTML = `

            <tr>

                <td colspan="6">
                    No orders yet.
                </td>

            </tr>

        `;

        return;

    }


    orders.forEach(order => {

        tbody.innerHTML += `

            <tr>

                <td>
                    <strong>
                        ${order.id}
                    </strong>
                </td>

                <td>
                    ${escapeHtml(order.customer)}
                </td>

                <td>
                    ${formatDate(order.date)}
                </td>

                <td>
                    ${money(order.total)}
                </td>

                <td>
                    ${escapeHtml(order.payment)}
                </td>

                <td>

                    <select
                        onchange="updateOrderStatus('${order.id}', this.value)"
                    >

                        ${[
                            "Placed",
                            "Confirmed",
                            "Packed",
                            "Shipped",
                            "Delivered",
                            "Cancelled"
                        ]
                        .map(status => `

                            <option
                                value="${status}"
                                ${
                                    status ===
                                    order.status
                                    ? "selected"
                                    : ""
                                }
                            >
                                ${status}
                            </option>

                        `)
                        .join("")}

                    </select>

                </td>

            </tr>

        `;

    });

}


function updateOrderStatus(
    orderId,
    status
) {

    const order =
        orders.find(
            order =>
                order.id === orderId
        );

    if (!order) return;


    order.status =
        status;


    saveData(
        "cartivoOrders",
        orders
    );


    renderOrdersTable();

    renderOrders();

    updateAdminDashboard();

    showToast(
        `Order ${orderId} updated.`
    );

}


/* ================= TOAST ================= */

let toastTimer;


function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );

    toast.querySelector("p")
        .textContent =
        message;

    toast.classList.add("show");


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2200
        );

}