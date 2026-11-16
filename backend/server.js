const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const donationRoutes = require("./routes/donationRoutes");
const adminRoutes = require("./routes/adminRoutes");
const paymentController = require("./controllers/paymentController");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();
app.use(cors({
  origin: true,
  credentials: true,
}));

// Razorpay webhook requires the raw request body for signature validation.
app.post("/api/payments/webhook", express.raw({ type: "application/json" }), paymentController.webhook);
app.use(express.json({ limit: "10kb" }));

app.get("/api/health", (_req, res) => res.json({ success: true, message: "Synergy API is running" }));
app.use("/api/auth", authRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/admin", adminRoutes);
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
connectDB()
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((err) => {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  });
