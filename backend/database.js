const Database = require("better-sqlite3");
const bcrypt = require("bcryptjs");
const path = require("path");

const db = new Database(
    path.join(__dirname, "cartivo.db")
);

db.pragma("foreign_keys = ON");

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'customer',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        price REAL NOT NULL,
        stock INTEGER NOT NULL DEFAULT 0,
        rating REAL DEFAULT 4.5,
        image TEXT,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_number TEXT UNIQUE NOT NULL,
        user_id INTEGER NOT NULL,
        total REAL NOT NULL,
        status TEXT NOT NULL DEFAULT 'Placed',
        customer_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        address TEXT NOT NULL,
        city TEXT,
        zip TEXT,
        payment_method TEXT NOT NULL DEFAULT 'COD',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS order_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        product_name TEXT NOT NULL,
        price REAL NOT NULL,
        quantity INTEGER NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id)
    );

    CREATE TABLE IF NOT EXISTS wishlists (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, product_id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    );
`);


/* =========================================================
   SEED ADMIN
========================================================= */

const adminExists = db
    .prepare(
        "SELECT id FROM users WHERE email = ?"
    )
    .get("admin@cartivo.com");

if (!adminExists) {

    const hashedPassword =
        bcrypt.hashSync(
            "admin123",
            10
        );

    db.prepare(`
        INSERT INTO users
        (name, email, password, role)
        VALUES (?, ?, ?, 'admin')
    `).run(
        "Cartivo Admin",
        "admin@cartivo.com",
        hashedPassword
    );
}


/* =========================================================
   SEED CATEGORIES
========================================================= */

const categoryCount =
    db
        .prepare(
            "SELECT COUNT(*) AS count FROM categories"
        )
        .get().count;

if (categoryCount === 0) {

    const insertCategory =
        db.prepare(`
            INSERT INTO categories (name)
            VALUES (?)
        `);

    const categories = [
        "Electronics",
        "Fashion",
        "Home",
        "Lifestyle"
    ];

    const insertCategories =
        db.transaction(() => {

            for (const category of categories) {
                insertCategory.run(category);
            }

        });

    insertCategories();
}


/* =========================================================
   SEED PRODUCTS
========================================================= */

const productCount =
    db
        .prepare(
            "SELECT COUNT(*) AS count FROM products"
        )
        .get().count;

if (productCount === 0) {

    const products = [

        {
            name: "Wireless Headphones",
            category: "Electronics",
            price: 2499,
            stock: 18,
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85",
            description:
                "Premium wireless headphones with clear sound, comfortable fit and long battery life."
        },

        {
            name: "Smart Watch",
            category: "Electronics",
            price: 3299,
            stock: 12,
            rating: 4.7,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85",
            description:
                "A stylish smartwatch for notifications, activity tracking and everyday convenience."
        },

        {
            name: "Premium Backpack",
            category: "Fashion",
            price: 1899,
            stock: 22,
            rating: 4.6,
            image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85",
            description:
                "A practical premium backpack for work, travel and everyday use."
        },

        {
            name: "Running Sneakers",
            category: "Fashion",
            price: 2799,
            stock: 15,
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
            description:
                "Lightweight sneakers designed for comfort, walking and daily activity."
        },

        {
            name: "Minimal Table Lamp",
            category: "Home",
            price: 1499,
            stock: 8,
            rating: 4.5,
            image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85",
            description:
                "Minimal modern table lamp that adds warm lighting to your room."
        },

        {
            name: "Ceramic Coffee Mug",
            category: "Home",
            price: 599,
            stock: 30,
            rating: 4.4,
            image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?auto=format&fit=crop&w=900&q=85",
            description:
                "Clean ceramic coffee mug for your morning coffee and tea."
        },

        {
            name: "Portable Bluetooth Speaker",
            category: "Electronics",
            price: 2199,
            stock: 14,
            rating: 4.7,
            image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=85",
            description:
                "Portable speaker with powerful sound and compact design."
        },

        {
            name: "Classic Sunglasses",
            category: "Fashion",
            price: 1299,
            stock: 20,
            rating: 4.5,
            image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85",
            description:
                "Classic sunglasses with a versatile everyday frame."
        },

        {
            name: "Modern Desk Organizer",
            category: "Home",
            price: 799,
            stock: 16,
            rating: 4.3,
            image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=900&q=85",
            description:
                "Keep your desk clean and organized with this simple organizer."
        },

        {
            name: "Fitness Bottle",
            category: "Lifestyle",
            price: 899,
            stock: 25,
            rating: 4.6,
            image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=85",
            description:
                "Reusable fitness bottle for gym, travel and daily hydration."
        },

        {
            name: "Travel Wallet",
            category: "Lifestyle",
            price: 1099,
            stock: 13,
            rating: 4.4,
            image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=85",
            description:
                "Compact travel wallet with enough space for cards and essentials."
        },

        {
            name: "Wireless Mouse",
            category: "Electronics",
            price: 999,
            stock: 19,
            rating: 4.5,
            image: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=85",
            description:
                "Smooth and comfortable wireless mouse for work and everyday use."
        }

    ];

    const insertProduct =
        db.prepare(`
            INSERT INTO products
            (
                name,
                category,
                price,
                stock,
                rating,
                image,
                description
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `);

    const insertProducts =
        db.transaction(() => {

            for (const product of products) {

                insertProduct.run(
                    product.name,
                    product.category,
                    product.price,
                    product.stock,
                    product.rating,
                    product.image,
                    product.description
                );

            }

        });

    insertProducts();
}


console.log("Cartivo database ready.");
console.log("Admin: admin@cartivo.com / admin123");
console.log("Products seeded:", db
    .prepare("SELECT COUNT(*) AS count FROM products")
    .get().count
);


module.exports = db;