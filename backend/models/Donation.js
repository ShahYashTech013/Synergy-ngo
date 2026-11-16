const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  donorName: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, trim: true },
  amount: { type: Number, required: true, min: 1 },
  message: { type: String, trim: true, maxlength: 1000 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  campaign: { type: String, trim: true, maxlength: 160 },
  donationType: { type: String, enum: ["one-time", "monthly"], default: "one-time" },
  razorpayOrderId: { type: String, unique: true, sparse: true },
  razorpayPaymentId: { type: String, default: null },
  paymentStatus: { type: String, enum: ["created", "paid", "failed"], default: "created" },
  currency: { type: String, default: "INR" }
}, { timestamps: true });

module.exports = mongoose.model("Donation", donationSchema);
