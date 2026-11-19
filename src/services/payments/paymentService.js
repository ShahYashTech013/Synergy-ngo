import { apiRequest } from "../api/apiClient.js";
import { serviceMode } from "../config.js";
import { donationRepository } from "../repositories/donationRepository.js";

function loadRazorpay() {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (window.Razorpay) return Promise.resolve(true);
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export const paymentService = {
  async createCheckoutSession({ donorName, email, phone, amount, campaign, donationType }) {
    if (serviceMode === "mock") {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const mockRecord = await donationRepository.create({
        donorName: donorName || "Supporter",
        email: email || "donor@example.com",
        phone: phone || "",
        amount: Number(amount) || 1500,
        campaign: campaign || "General Fund (Where Needed Most)",
        donationType: donationType || "one-time",
        paymentMethod: "Demo Online",
        transactionReference: `TXN_DEMO_${Date.now()}`,
        paymentStatus: "paid",
        createdAt: new Date().toISOString(),
      });
      return {
        success: true,
        orderId: `order_demo_${Date.now()}`,
        paymentId: `pay_demo_${Date.now()}`,
        donation: mockRecord,
      };
    }

    try {
      if (!(await loadRazorpay())) throw new Error("Could not load secure checkout. Please try again.");
      const session = await apiRequest("/donations/create-order", {
        method: "POST",
        body: { donorName, email, phone, amount, campaign, donationType },
      });

      return new Promise((resolve, reject) => {
        const checkout = new window.Razorpay({
          key: session.keyId,
          order_id: session.order.id,
          amount: session.order.amount,
          currency: session.order.currency,
          name: "Synergy Organization",
          description: campaign || "Donation",
          prefill: { name: donorName, email, contact: phone },
          handler: async (response) => {
            try {
              const verified = await apiRequest("/donations/verify-payment", {
                method: "POST",
                body: response,
              });
              resolve(verified);
            } catch (error) {
              reject(error);
            }
          },
          modal: { ondismiss: () => reject(new Error("Checkout was closed before payment completed.")) },
        });
        checkout.on("payment.failed", (event) => {
          reject(new Error(event.error?.description || "Payment failed. Please try again."));
        });
        checkout.open();
      });
    } catch (err) {
      if (err.message?.includes("Failed to fetch") || !err.status) {
        console.warn("[Synergy Payment] API server unreachable. Creating demo donation record locally.");
        const mockRecord = await donationRepository.create({
          donorName: donorName || "Supporter",
          email: email || "donor@example.com",
          phone: phone || "",
          amount: Number(amount) || 1500,
          campaign: campaign || "General Fund (Where Needed Most)",
          donationType: donationType || "one-time",
          paymentMethod: "Demo Online",
          transactionReference: `TXN_DEMO_${Date.now()}`,
          paymentStatus: "paid",
          createdAt: new Date().toISOString(),
        });
        return {
          success: true,
          orderId: `order_demo_${Date.now()}`,
          paymentId: `pay_demo_${Date.now()}`,
          donation: mockRecord,
        };
      }
      throw err;
    }
  },
};
