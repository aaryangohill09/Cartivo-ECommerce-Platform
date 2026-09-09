const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("./database");

const app = express();

const PORT = 5000;
const JWT_SECRET = "cartivo_secret_key_2026";

app.use(cors());
app.use(express.json());


// ======================================================
// BASIC
// ======================================================

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Cartivo Backend API is running"
    });
});


// ======================================================
// AUTH MIDDLEWARE
// ======================================================

function authenticateToken(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Authorization token required"
        });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }

    try {

        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });

    }
}


function adminOnly(req, res, next) {

    if (req.user.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Admin access required"
        });
    }

    next();
}


// ======================================================
// AUTH
// ======================================================

// Register

app.post("/api/auth/register", async (req, res) => {

    try {

        const {
            name,
            email,
            password
        } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required"
            });
        }

        const existingUser = db
            .prepare("SELECT id FROM users WHERE email = ?")
            .get(email);

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = db.prepare(`
            INSERT INTO users
            (name, email, password, role)
            VALUES (?, ?, ?, 'customer')
        `).run(
            name,
            email,
            hashedPassword
        );

        const user = {
            id: result.lastInsertRowid,
            name,
            email,
            role: "customer"
        };

        const token = jwt.sign(
            user,
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(201).json({
            success: true,
            message: "Registration successful",
            token,
            user
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Registration failed"
        });

    }

});


// Login

app.post("/api/auth/login", async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const user = db
            .prepare("SELECT * FROM users WHERE email = ?")
            .get(email);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const validPassword = await bcrypt.compare(
            password,
            user.password
        );

        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const safeUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        };

        const token = jwt.sign(
            safeUser,
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            success: true,
            message: "Login successful",
            token,
            user: safeUser
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Login failed"
        });

    }

});


// Current user

app.get("/api/auth/me", authenticateToken, (req, res) => {

    const user = db
        .prepare(`
            SELECT id, name, email, role, created_at
            FROM users
            WHERE id = ?
        `)
        .get(req.user.id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    res.json({
        success: true,
        user
    });

});


// ======================================================
// CATEGORIES
// ======================================================

app.get("/api/categories", (req, res) => {

    const categories = db
        .prepare(`
            SELECT *
            FROM categories
            ORDER BY name ASC
        `)
        .all();

    res.json({
        success: true,
        categories
    });

});


app.post(
    "/api/categories",
    authenticateToken,
    adminOnly,
    (req, res) => {

        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Category name is required"
            });
        }

        try {

            const result = db
                .prepare(`
                    INSERT INTO categories (name)
                    VALUES (?)
                `)
                .run(name.trim());

            res.status(201).json({
                success: true,
                message: "Category added",
                category: {
                    id: result.lastInsertRowid,
                    name: name.trim()
                }
            });

        } catch (error) {

            res.status(409).json({
                success: false,
                message: "Category already exists"
            });

        }

    }
);


app.put(
    "/api/categories/:id",
    authenticateToken,
    adminOnly,
    (req, res) => {

        const { name } = req.body;

        db.prepare(`
            UPDATE categories
            SET name = ?
            WHERE id = ?
        `).run(
            name,
            req.params.id
        );

        res.json({
            success: true,
            message: "Category updated"
        });

    }
);


app.delete(
    "/api/categories/:id",
    authenticateToken,
    adminOnly,
    (req, res) => {

        db.prepare(`
            DELETE FROM categories
            WHERE id = ?
        `).run(req.params.id);

        res.json({
            success: true,
            message: "Category deleted"
        });

    }
);


// ======================================================
// PRODUCTS
// ======================================================

app.get("/api/products", (req, res) => {

    const {
        category,
        search,
        minPrice,
        maxPrice,
        sort
    } = req.query;

    let query = "SELECT * FROM products WHERE 1=1";
    const params = [];

    if (category && category !== "all") {
        query += " AND category = ?";
        params.push(category);
    }

    if (search) {
        query += " AND (name LIKE ? OR description LIKE ?)";
        params.push(
            `%${search}%`,
            `%${search}%`
        );
    }

    if (minPrice) {
        query += " AND price >= ?";
        params.push(Number(minPrice));
    }

    if (maxPrice) {
        query += " AND price <= ?";
        params.push(Number(maxPrice));
    }

    if (sort === "price-low") {
        query += " ORDER BY price ASC";
    } else if (sort === "price-high") {
        query += " ORDER BY price DESC";
    } else if (sort === "rating") {
        query += " ORDER BY rating DESC";
    } else {
        query += " ORDER BY id DESC";
    }

    const products = db
        .prepare(query)
        .all(...params);

    res.json({
        success: true,
        products
    });

});


app.get("/api/products/:id", (req, res) => {

    const product = db
        .prepare(`
            SELECT *
            FROM products
            WHERE id = ?
        `)
        .get(req.params.id);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    res.json({
        success: true,
        product
    });

});


app.post(
    "/api/products",
    authenticateToken,
    adminOnly,
    (req, res) => {

        const {
            name,
            category,
            price,
            stock,
            rating,
            image,
            description
        } = req.body;

        if (!name || !category || price === undefined) {
            return res.status(400).json({
                success: false,
                message: "Name, category and price are required"
            });
        }

        const result = db.prepare(`
            INSERT INTO products
            (name, category, price, stock, rating, image, description)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `).run(
            name,
            category,
            Number(price),
            Number(stock || 0),
            Number(rating || 4.5),
            image || "",
            description || ""
        );

        const product = db
            .prepare("SELECT * FROM products WHERE id = ?")
            .get(result.lastInsertRowid);

        res.status(201).json({
            success: true,
            message: "Product added",
            product
        });

    }
);


app.put(
    "/api/products/:id",
    authenticateToken,
    adminOnly,
    (req, res) => {

        const {
            name,
            category,
            price,
            stock,
            rating,
            image,
            description
        } = req.body;

        db.prepare(`
            UPDATE products
            SET
                name = ?,
                category = ?,
                price = ?,
                stock = ?,
                rating = ?,
                image = ?,
                description = ?
            WHERE id = ?
        `).run(
            name,
            category,
            Number(price),
            Number(stock),
            Number(rating),
            image || "",
            description || "",
            req.params.id
        );

        const product = db
            .prepare("SELECT * FROM products WHERE id = ?")
            .get(req.params.id);

        res.json({
            success: true,
            message: "Product updated",
            product
        });

    }
);


app.delete(
    "/api/products/:id",
    authenticateToken,
    adminOnly,
    (req, res) => {

        db.prepare(`
            DELETE FROM products
            WHERE id = ?
        `).run(req.params.id);

        res.json({
            success: true,
            message: "Product deleted"
        });

    }
);


// ======================================================
// INVENTORY
// ======================================================

app.get(
    "/api/inventory",
    authenticateToken,
    adminOnly,
    (req, res) => {

        const products = db
            .prepare(`
                SELECT
                    id,
                    name,
                    category,
                    price,
                    stock
                FROM products
                ORDER BY stock ASC
            `)
            .all();

        res.json({
            success: true,
            inventory: products
        });

    }
);


app.put(
    "/api/inventory/:productId",
    authenticateToken,
    adminOnly,
    (req, res) => {

        const { stock } = req.body;

        db.prepare(`
            UPDATE products
            SET stock = ?
            WHERE id = ?
        `).run(
            Number(stock),
            req.params.productId
        );

        res.json({
            success: true,
            message: "Inventory updated"
        });

    }
);


// ======================================================
// ORDERS
// ======================================================

app.post(
    "/api/orders",
    authenticateToken,
    (req, res) => {

        const {
            items,
            customerName,
            email,
            phone,
            address,
            city,
            zip,
            paymentMethod
        } = req.body;

        if (
            !items ||
            !items.length ||
            !customerName ||
            !address
        ) {
            return res.status(400).json({
                success: false,
                message: "Order information is incomplete"
            });
        }

        const createOrder = db.transaction(() => {

            let total = 0;

            const preparedItems = [];

            for (const item of items) {

                const product = db
                    .prepare(`
                        SELECT *
                        FROM products
                        WHERE id = ?
                    `)
                    .get(item.productId);

                if (!product) {
                    throw new Error(
                        `Product ${item.productId} not found`
                    );
                }

                if (product.stock < item.quantity) {
                    throw new Error(
                        `${product.name} is out of stock`
                    );
                }

                total +=
                    product.price *
                    Number(item.quantity);

                preparedItems.push({
                    product,
                    quantity: Number(item.quantity)
                });

            }

            const orderNumber =
                "CT-" +
                Date.now().toString().slice(-8);

            const orderResult = db.prepare(`
                INSERT INTO orders
                (
                    order_number,
                    user_id,
                    total,
                    status,
                    customer_name,
                    email,
                    phone,
                    address,
                    city,
                    zip,
                    payment_method
                )
                VALUES (?, ?, ?, 'Placed', ?, ?, ?, ?, ?, ?, ?)
            `).run(
                orderNumber,
                req.user.id,
                total,
                customerName,
                email,
                phone || "",
                address,
                city || "",
                zip || "",
                paymentMethod || "COD"
            );

            const orderId =
                orderResult.lastInsertRowid;

            for (const item of preparedItems) {

                db.prepare(`
                    INSERT INTO order_items
                    (
                        order_id,
                        product_id,
                        product_name,
                        price,
                        quantity
                    )
                    VALUES (?, ?, ?, ?, ?)
                `).run(
                    orderId,
                    item.product.id,
                    item.product.name,
                    item.product.price,
                    item.quantity
                );

                db.prepare(`
                    UPDATE products
                    SET stock = stock - ?
                    WHERE id = ?
                `).run(
                    item.quantity,
                    item.product.id
                );

            }

            return {
                id: orderId,
                orderNumber,
                total
            };

        });

        try {

            const order = createOrder();

            res.status(201).json({
                success: true,
                message: "Order placed successfully",
                order
            });

        } catch (error) {

            res.status(400).json({
                success: false,
                message: error.message
            });

        }

    }
);


// User orders

app.get(
    "/api/orders/my",
    authenticateToken,
    (req, res) => {

        const orders = db
            .prepare(`
                SELECT *
                FROM orders
                WHERE user_id = ?
                ORDER BY created_at DESC
            `)
            .all(req.user.id);

        for (const order of orders) {

            order.items = db
                .prepare(`
                    SELECT *
                    FROM order_items
                    WHERE order_id = ?
                `)
                .all(order.id);

        }

        res.json({
            success: true,
            orders
        });

    }
);


// Single order

app.get(
    "/api/orders/:id",
    authenticateToken,
    (req, res) => {

        const order = db
            .prepare(`
                SELECT *
                FROM orders
                WHERE id = ?
                AND user_id = ?
            `)
            .get(
                req.params.id,
                req.user.id
            );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        order.items = db
            .prepare(`
                SELECT *
                FROM order_items
                WHERE order_id = ?
            `)
            .all(order.id);

        res.json({
            success: true,
            order
        });

    }
);


// ======================================================
// ADMIN ORDERS
// ======================================================

app.get(
    "/api/admin/orders",
    authenticateToken,
    adminOnly,
    (req, res) => {

        const orders = db
            .prepare(`
                SELECT
                    orders.*,
                    users.name AS user_name
                FROM orders
                LEFT JOIN users
                ON orders.user_id = users.id
                ORDER BY orders.created_at DESC
            `)
            .all();

        for (const order of orders) {

            order.items = db
                .prepare(`
                    SELECT *
                    FROM order_items
                    WHERE order_id = ?
                `)
                .all(order.id);

        }

        res.json({
            success: true,
            orders
        });

    }
);


app.put(
    "/api/admin/orders/:id/status",
    authenticateToken,
    adminOnly,
    (req, res) => {

        const { status } = req.body;

        const allowedStatuses = [
            "Placed",
            "Confirmed",
            "Packed",
            "Shipped",
            "Delivered",
            "Cancelled"
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid order status"
            });
        }

        db.prepare(`
            UPDATE orders
            SET status = ?
            WHERE id = ?
        `).run(
            status,
            req.params.id
        );

        res.json({
            success: true,
            message: "Order status updated"
        });

    }
);


// ======================================================
// USERS - ADMIN
// ======================================================

app.get(
    "/api/admin/users",
    authenticateToken,
    adminOnly,
    (req, res) => {

        const users = db
            .prepare(`
                SELECT
                    id,
                    name,
                    email,
                    role,
                    created_at
                FROM users
                ORDER BY created_at DESC
            `)
            .all();

        res.json({
            success: true,
            users
        });

    }
);


// ======================================================
// ADMIN DASHBOARD
// ======================================================

app.get(
    "/api/admin/dashboard",
    authenticateToken,
    adminOnly,
    (req, res) => {

        const products = db
            .prepare(`
                SELECT COUNT(*) AS count
                FROM products
            `)
            .get().count;

        const users = db
            .prepare(`
                SELECT COUNT(*) AS count
                FROM users
            `)
            .get().count;

        const orders = db
            .prepare(`
                SELECT COUNT(*) AS count
                FROM orders
            `)
            .get().count;

        const revenue = db
            .prepare(`
                SELECT COALESCE(SUM(total), 0) AS total
                FROM orders
                WHERE status != 'Cancelled'
            `)
            .get().total;

        const lowStock = db
            .prepare(`
                SELECT COUNT(*) AS count
                FROM products
                WHERE stock <= 5
            `)
            .get().count;

        res.json({
            success: true,
            dashboard: {
                products,
                users,
                orders,
                revenue,
                lowStock
            }
        });

    }
);


// ======================================================
// WISHLIST
// ======================================================

app.get(
    "/api/wishlist",
    authenticateToken,
    (req, res) => {

        const products = db
            .prepare(`
                SELECT products.*
                FROM wishlists
                JOIN products
                ON wishlists.product_id = products.id
                WHERE wishlists.user_id = ?
                ORDER BY wishlists.created_at DESC
            `)
            .all(req.user.id);

        res.json({
            success: true,
            wishlist: products
        });

    }
);


app.post(
    "/api/wishlist/:productId",
    authenticateToken,
    (req, res) => {

        try {

            db.prepare(`
                INSERT INTO wishlists
                (user_id, product_id)
                VALUES (?, ?)
            `).run(
                req.user.id,
                req.params.productId
            );

            res.json({
                success: true,
                message: "Added to wishlist"
            });

        } catch (error) {

            res.status(409).json({
                success: false,
                message: "Product already in wishlist"
            });

        }

    }
);


app.delete(
    "/api/wishlist/:productId",
    authenticateToken,
    (req, res) => {

        db.prepare(`
            DELETE FROM wishlists
            WHERE user_id = ?
            AND product_id = ?
        `).run(
            req.user.id,
            req.params.productId
        );

        res.json({
            success: true,
            message: "Removed from wishlist"
        });

    }
);


// ======================================================
// START SERVER
// ======================================================

app.listen(PORT, () => {

    console.log("");
    console.log("======================================");
    console.log("       CARTIVO BACKEND SERVER");
    console.log("======================================");
    console.log(`Server running on http://localhost:${PORT}`);
    console.log("Database: cartivo.db");
    console.log("======================================");
    console.log("");

});