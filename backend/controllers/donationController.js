const Donation = require("../models/Donation");
const getRazorpay = require("../utils/razorpay");

exports.createOrder = async (req, res, next) => {
  try {
    const { donorName, email, phone, amount, message, campaign, donationType } = req.body;
    const numericAmount = Number(amount);
    if (!donorName || !email || !Number.isFinite(numericAmount) || numericAmount < 1) {
      return res.status(400).json({ success: false, message: "Valid donor name, email and amount are required" });
    }

    const order = await getRazorpay().orders.create({
      amount: Math.round(numericAmount * 100),
      currency: "INR",
      receipt: `synergy_${Date.now()}`
    });

    const donation = await Donation.create({
      donorName, email: req.user.email, phone, amount: numericAmount, message,
      user: req.user.id, campaign, donationType,
      razorpayOrderId: order.id, currency: order.currency
    });

    res.status(201).json({
      success: true,
      donationId: donation._id,
      order: { id: order.id, amount: order.amount, currency: order.currency },
      keyId: process.env.RAZORPAY_KEY_ID
    });
  } catch (err) { next(err); }
};
