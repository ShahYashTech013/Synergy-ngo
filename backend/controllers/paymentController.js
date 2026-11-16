const crypto = require("crypto");
const Donation = require("../models/Donation");
const getRazorpay = require("../utils/razorpay");

exports.verifyPayment = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: "Missing payment verification fields" });
    }

    const expected = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`).digest("hex");
    const a = Buffer.from(expected);
    const b = Buffer.from(razorpay_signature);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
      return res.status(400).json({ success: false, message: "Invalid payment signature" });
    }

    const razorpay = getRazorpay();
    const payment = await razorpay.payments.fetch(razorpay_payment_id);
    if (payment.order_id !== razorpay_order_id || payment.status !== "captured") {
      return res.status(400).json({ success: false, message: "Payment is not captured for this order" });
    }

    const donation = await Donation.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id, user: req.user.id },
      { paymentStatus: "paid", razorpayPaymentId: razorpay_payment_id },
      { new: true }
    );
    if (!donation) return res.status(404).json({ success: false, message: "Donation order not found" });
    res.json({ success: true, message: "Payment verified", donation });
  } catch (err) { next(err); }
};

exports.webhook = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!secret) return res.status(500).send("Webhook secret missing");
    const signature = req.headers["x-razorpay-signature"];
    const expected = crypto.createHmac("sha256", secret).update(req.body).digest("hex");
    const a = Buffer.from(expected);
    const b = Buffer.from(signature || "");
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return res.status(400).send("Invalid webhook signature");

    const event = JSON.parse(req.body.toString("utf8"));
    const paymentEntity = event.payload?.payment?.entity;
    if (paymentEntity?.order_id) {
      if (event.event === "payment.captured" || event.event === "order.paid") {
        await Donation.findOneAndUpdate(
          { razorpayOrderId: paymentEntity.order_id },
          { paymentStatus: "paid", razorpayPaymentId: paymentEntity.id }
        );
      } else if (event.event === "payment.failed") {
        await Donation.findOneAndUpdate(
          { razorpayOrderId: paymentEntity.order_id, paymentStatus: { $ne: "paid" } },
          { paymentStatus: "failed" }
        );
      }
    }
    res.json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err.message);
    res.status(400).send("Webhook processing failed");
  }
};
