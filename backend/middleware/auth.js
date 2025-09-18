const jwt = require("jsonwebtoken");
const { JWT_SECRET, COOKIE_NAME } = require("../config");

module.exports = function (req, res, next) {
  try {
    const token = req.cookies?.[COOKIE_NAME];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload; 
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
