const db = require("../utils/db");
const { generateToken, addToBlacklist } = require("../utils/tokenutils");

/**
 * Register a new user.
 * @param {Object} req - The request object containing username and password in req.body.
 * @param {Object} res - The response object to send JSON response.
 */
exports.register = (req, res) => {
  const { username, password } = req.body;

  db.run(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, password],
    function (err) {
      if (err) {
        if (err.code === "SQLITE_CONSTRAINT") {
          return res.status(409).json({ error: "Username already exists" });
        }
        return res.status(500).json({ error: "Internal server error" });
      }

      res.json({ message: "User registered successfully" });
    }
  );
};

/**
 * Authenticate user login.
 * @param {Object} req - The request object containing username and password in req.body.
 * @param {Object} res - The response object to send JSON response.
 */
exports.login = (req, res) => {
  const { username, password } = req.body;

  db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }

    if (!row || row.password !== password) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = generateToken(row.id);
    res.json({ token });
  });
};

/**
 * Get all products from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object to send JSON response.
 */
exports.getProducts = (req, res) => {
  db.all("SELECT * FROM products", (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }

    res.json(rows);
  });
};

/**
 * Get a product by its ID.
 * @param {Object} req - The request object containing product ID in req.params.id.
 * @param {Object} res - The response object to send JSON response.
 */
exports.getProductById = (req, res) => {
  const productId = req.params.id;

  db.get("SELECT * FROM products WHERE id = ?", [productId], (err, row) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }

    if (!row) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(row);
  });
};

// /**
//  * Update a product by its ID.
//  * @param {Object} req - The request object containing product ID in req.params.id and updated data in req.body.
//  * @param {Object} res - The response object to send JSON response.
//  */
// exports.updateProductById = (req, res) => {
//   const productId = req.params.id;
//   const { data_category, record_count, fields, name } = req.body;

//   db.run(
//     `UPDATE products SET data_category = ?, record_count = ?, fields = ?, name = ? WHERE id = ?`,
//     [data_category, record_count, JSON.stringify(fields), name, productId],
//     function (err) {
//       if (err) {
//         return res.status(500).json({ error: "Internal server error" });
//       }

//       if (this.changes === 0) {
//         return res.status(404).json({ error: "Product not found" });
//       }

//       res.json({ message: "Product updated successfully" });
//     }
//   );
// };

// /**
//  * Delete a product by its ID.
//  * @param {Object} req - The request object containing product ID in req.params.id.
//  * @param {Object} res - The response object to send JSON response.
//  */
// exports.deleteProductById = (req, res) => {
//   const productId = req.params.id;

//   db.run("DELETE FROM products WHERE id = ?", [productId], function (err) {
//     if (err) {
//       return res.status(500).json({ error: "Internal server error" });
//     }

//     if (this.changes === 0) {
//       return res.status(404).json({ error: "Product not found" });
//     }

//     res.json({ message: "Product deleted successfully" });
//   });
// };
