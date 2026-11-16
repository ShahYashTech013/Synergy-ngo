const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/User");

async function authMiddleware(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ success: false, message: "Authentication required" });

  let claims;
  try {
    claims = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }

  if (claims.role === "admin" && !claims.sub && typeof claims.email === "string") {
    req.user = { id: null, email: claims.email, role: "admin" };
    req.admin = req.user;
    return next();
  }

  if (typeof claims.sub !== "string" || !mongoose.Types.ObjectId.isValid(claims.sub)) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }

  try {
    const user = await User.findById(claims.sub).select("_id name email role isActive");
    if (!user || !user.isActive) {
      return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
    req.user = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };
    return next();
  } catch (error) {
    return next(error);
  }
}

authMiddleware.requireUser = (req, res, next) => {
  if (!req.user || req.user.role !== "user") {
    return res.status(403).json({ success: false, message: "User access required" });
  }
  return next();
};

authMiddleware.requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Administrator access required" });
  }
  return next();
};

module.exports = authMiddleware;
