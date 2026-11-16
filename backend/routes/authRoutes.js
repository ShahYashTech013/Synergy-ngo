const router = require("express").Router();
const { login, register } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, authMiddleware.requireUser, (req, res) => {
  res.json({ success: true, user: req.user });
});

module.exports = router;
