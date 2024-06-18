const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");
const db = require("../utils/db");

/**
 * Creates the products table if it does not exist and loads initial data from JSON if table is empty.
 */
function createProductsTable() {
  db.run(
    `CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY,
      category TEXT NOT NULL,
      recordCount INTEGER NOT NULL,
      fields TEXT NOT NULL,
      name TEXT NOT NULL
    )`,
    (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log("Products table created or already exists.");
        checkAndLoadProductsFromJSON();
      }
    }
  );
}

/**
 * Checks if products table is empty. If empty, loads products data from JSON file.
 */
function checkAndLoadProductsFromJSON() {
  db.get("SELECT COUNT(*) as count FROM products", (err, row) => {
    if (err) {
      console.error(err.message);
    } else {
      if (row.count === 0) {
        loadProductsFromJSON();
      } else {
        console.log("Products data already loaded.");
      }
    }
  });
}

/**
 * Loads products data from JSON file into the products table.
 */
function loadProductsFromJSON() {
  const productsJsonPath = path.resolve(__dirname, "../../data/products.json");
  const productsData = JSON.parse(fs.readFileSync(productsJsonPath, "utf8"));

  const insertStmt = db.prepare(
    "INSERT INTO products (id, category, recordCount, fields, name) VALUES (?, ?, ?, ?, ?)"
  );

  productsData.forEach((product) => {
    insertStmt.run(
      product.id,
      product.category,
      product.recordCount,
      JSON.stringify(product.fields), // Convert array to JSON string
      product.name
    );
  });

  insertStmt.finalize();
  console.log("Products data loaded from JSON file.");
}

module.exports = {
  createProductsTable,
};
