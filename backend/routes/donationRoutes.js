const router = require("express").Router();
const { createOrder } = require("../controllers/donationController");
const { verifyPayment } = require("../controllers/paymentController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/create-order", authMiddleware, authMiddleware.requireUser, createOrder);
router.post("/verify-payment", authMiddleware, authMiddleware.requireUser, verifyPayment);

module.exports = router;
