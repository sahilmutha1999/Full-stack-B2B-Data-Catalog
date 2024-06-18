const jwt = require("jsonwebtoken");

const secretKey = "your_secret_key"; // Replace with your actual secret key

function generateToken(userId) {
  return jwt.sign({ userId }, secretKey, { expiresIn: "1h" });
}

function verifyToken(token) {
  return jwt.verify(token, secretKey);
}

module.exports = {
  generateToken,
  verifyToken,
};
