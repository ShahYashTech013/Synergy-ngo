const bcrypt = require("bcryptjs");
const Donation = require("../models/Donation");
const generateToken = require("../utils/generateToken");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password || email !== process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD_HASH) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }
  const valid = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);
  if (!valid) return res.status(401).json({ success: false, message: "Invalid credentials" });
  res.json({ success: true, token: generateToken({ email, role: "admin" }) });
};

exports.getDonations = async (_req, res, next) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 }).limit(500);
    res.json({ success: true, donations });
  } catch (err) { next(err); }
};
