const express = require("express");
const cors = require("cors");
const productModel = require("./models/productModel");
const app = express();
const productController = require("./controllers/productController");
const { verifyToken } = require("./utils/tokenutils");

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

// Middleware to verify JWT token
const verifyTokenMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (req.path === "/api/register" || req.path === "/api/login") {
    // Skip token verification for /api/register and /api/login
    return next();
  }

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    verifyToken(token);
    next();
  } catch (err) {
    return res.status(403).json({ error: err.message });
  }
};

// Routes
app.post("/api/register", productController.register);
app.post("/api/login", productController.login);

app.get("/api/products", verifyTokenMiddleware, productController.getProducts);
app.get(
  "/api/products/:id",
  verifyTokenMiddleware,
  productController.getProductById
);

// Call createProductsTable() when the server starts
productModel.createProductsTable();

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
