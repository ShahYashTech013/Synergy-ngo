const router = require("express").Router();
const { login, getDonations } = require("../controllers/adminController");
const auth = require("../middleware/authMiddleware");

router.post("/login", login);
router.get("/donations", auth, auth.requireAdmin, getDonations);

module.exports = router;
