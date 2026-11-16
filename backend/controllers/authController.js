const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_POLICY_MESSAGE = "Password must be 8–128 characters and include at least one letter and one number.";

function safeUser(user) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

function tokenFor(user) {
  return generateToken({
    sub: user._id.toString(),
    email: user.email,
    role: user.role,
  });
}

exports.register = async (req, res, next) => {
  const { name, email, password } = req.body || {};
  const normalizedName = typeof name === "string" ? name.trim() : "";
  const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

  if (!normalizedName || !normalizedEmail || typeof password !== "string" || !password) {
    return res.status(400).json({ success: false, message: "Name, email, and password are required." });
  }
  const hasControlCharacters = [...normalizedName].some((character) => {
    const code = character.charCodeAt(0);
    return code < 32 || code === 127;
  });
  if (normalizedName.length < 2 || normalizedName.length > 80 || hasControlCharacters) {
    return res.status(400).json({ success: false, message: "Enter a valid name (2–80 characters)." });
  }
  if (normalizedEmail.length > 254 || !EMAIL_PATTERN.test(normalizedEmail)) {
    return res.status(400).json({ success: false, message: "Enter a valid email address." });
  }
  if (password.length < 8 || password.length > 128 || !/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    return res.status(400).json({ success: false, message: PASSWORD_POLICY_MESSAGE });
  }

  try {
    await User.init();
    if (await User.exists({ email: normalizedEmail })) {
      return res.status(409).json({ success: false, message: "An account with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      name: normalizedName,
      email: normalizedEmail,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      token: tokenFor(user),
      user: safeUser(user),
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: "An account with this email already exists." });
    }
    if (error.name === "ValidationError") {
      return res.status(400).json({ success: false, message: "Please check the account details and try again." });
    }
    return next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body || {};
  const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

  if (!normalizedEmail || typeof password !== "string" || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required." });
  }
  if (normalizedEmail.length > 254 || !EMAIL_PATTERN.test(normalizedEmail)) {
    return res.status(400).json({ success: false, message: "Enter a valid email address." });
  }

  try {
    const user = await User.findOne({ email: normalizedEmail }).select("+password");
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }
    if (!user.isActive) {
      return res.status(403).json({ success: false, message: "This account is inactive." });
    }

    return res.json({
      success: true,
      token: tokenFor(user),
      user: safeUser(user),
    });
  } catch (error) {
    return next(error);
  }
};
