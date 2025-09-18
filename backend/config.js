require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 4000,
  MONGO_URI: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/lead_management",
  JWT_SECRET: process.env.JWT_SECRET || "supersecretjwt",
  COOKIE_NAME: "token",
  COOKIE_SAMESITE: process.env.COOKIE_SAMESITE || "lax", // lax in dev
  COOKIE_SECURE: process.env.COOKIE_SECURE === "true",   // true in prod
  NODE_ENV: process.env.NODE_ENV || "development",
};
