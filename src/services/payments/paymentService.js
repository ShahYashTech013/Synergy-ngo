import { apiRequest } from "../api/apiClient.js";

function loadRazorpay() {
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
  },
};
