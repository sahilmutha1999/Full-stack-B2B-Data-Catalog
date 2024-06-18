const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Resolve the path to the SQLite database file
const dbPath = path.resolve(__dirname, "../../database.db");

// Create a new SQLite database instance and connect to the database file
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Failed to connect to the database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
    createUsersTable(); // Call function to create users table after successful connection
  }
});

// Function to create the users table if it doesn't exist
function createUsersTable() {
  db.run(
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )`,
    (err) => {
      if (err) {
        console.error("Failed to create users table:", err.message);
      } else {
        console.log("Users table created or already exists.");
        insertDefaultUser(); // Call function to insert default user after table creation
      }
    }
  );
}

// Function to insert a default user if it doesn't exist
function insertDefaultUser() {
  const username = "xxxxx";
  const password = "xxxx"; // Use plain text password (for demonstration purposes)

  // Check if the default user already exists
  db.get(
    `SELECT * FROM users WHERE username = ?`,
    [username],
    (err, row) => {
      if (err) {
        console.error("Error checking default user:", err.message);
      } else if (!row) {
        // Insert default user if it doesn't exist
        db.run(
          `INSERT INTO users (username, password) VALUES (?, ?)`,
          [username, password],
          (err) => {
            if (err) {
              console.error("Error inserting default user:", err.message);
            } else {
              console.log("Default user inserted.");
            }
          }
        );
      } else {
        console.log("Default user already exists.");
      }
    }
  );
}

// Export the SQLite database instance to be used in other modules
module.exports = db;
