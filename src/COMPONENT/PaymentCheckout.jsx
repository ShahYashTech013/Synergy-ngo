import { useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  CreditCard,
  Lock,
  QrCode,
  Shield,
  ShieldCheck,
  Smartphone,
  Wallet,
  Zap,
} from "lucide-react";
import { paymentService } from "../services/payments/paymentService.js";
import "./PaymentCheckout.css";

const POPULAR_BANKS = [
  { id: "HDFC", name: "HDFC Bank", code: "HDFC" },
  { id: "SBIN", name: "State Bank of India", code: "SBI" },
  { id: "ICIC", name: "ICICI Bank", code: "ICICI" },
  { id: "UTIB", name: "Axis Bank", code: "Axis" },
  { id: "KKBK", name: "Kotak Mahindra Bank", code: "Kotak" },
  { id: "PUNB", name: "Punjab National Bank", code: "PNB" },
];

const OTHER_BANKS = [
  "Bank of Baroda",
  "Canara Bank",
  "Union Bank of India",
  "IndusInd Bank",
  "Yes Bank",
  "Federal Bank",
  "IDFC FIRST Bank",
  "Indian Bank",
  "Central Bank of India",
];

const UPI_APPS = [
  { id: "gpay", name: "Google Pay", label: "GPay" },
  { id: "phonepe", name: "PhonePe", label: "PhonePe" },
  { id: "paytm", name: "Paytm UPI", label: "Paytm" },
  { id: "bhim", name: "BHIM UPI", label: "BHIM" },
];

const WALLETS = [
  { id: "paytm", name: "Paytm Wallet" },
  { id: "phonepe", name: "PhonePe Wallet" },
  { id: "amazonpay", name: "Amazon Pay" },
  { id: "mobikwik", name: "MobiKwik" },
];

export default function PaymentCheckout({
  amount,
  donationType = "one-time",
  campaign = "General Fund (Where Needed Most)",
  donorEmail,
  donorName,
  donorPhone,
  onBack,
  onPaymentSuccess,
}) {
  const [method, setMethod] = useState("upi");
  const [selectedUpiApp, setSelectedUpiApp] = useState("gpay");
  const [upiId, setUpiId] = useState("");
  const [selectedBank, setSelectedBank] = useState("HDFC");
  const [selectedWallet, setSelectedWallet] = useState("paytm");
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: donorName || "",
    saveCard: true,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  const formatCardNumber = (val) => {
    const digits = val.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const formatExpiry = (val) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
    }
    return digits;
  };

  const handlePay = async () => {
    if (isProcessing) return;
    setIsProcessing(true);
    setCheckoutError("");

    try {
      await paymentService.createCheckoutSession({
        donorName: donorName || "Supporter",
        email: donorEmail,
        phone: donorPhone,
        amount,
        campaign,
        donationType,
      });
      if (typeof onPaymentSuccess === "function") {
        onPaymentSuccess();
      }
    } catch (err) {
      setCheckoutError(err.message || "Payment checkout could not be completed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section className="payment-checkout-section">
      <div className="payment-checkout-container">
        <div className="payment-checkout-card">
          {/* ================================================================
              LEFT COLUMN: DONATION SUMMARY
              ================================================================ */}
          <aside className="payment-summary-side" aria-label="Donation Summary">
            <div>
              <div className="payment-summary-brand">
                <img
                  src="/synergy-organization-logo.svg"
                  alt="Synergy Organization"
                  className="payment-summary-logo"
                />
                <span className="payment-summary-tag">
                  <ShieldCheck size={13} />
                  <span>Verified NGO • 80G Tax Exempt</span>
                </span>
              </div>

              {/* Amount Box */}
              <div className="payment-amount-box">
                <div className="payment-amount-label">Total Contribution</div>
                <div className="payment-amount-value">
                  <span className="payment-amount-currency">₹</span>
                  <span>{Number(amount || 0).toLocaleString("en-IN")}</span>
                </div>
                <span className="payment-amount-type">
                  {donationType === "monthly" ? "Monthly Sustaining Support" : "One-Time Contribution"}
                </span>
              </div>

              {/* Donation Details */}
              <dl className="payment-details-list">
                <div className="payment-detail-row">
                  <dt>Campaign / Cause</dt>
                  <dd>{campaign}</dd>
                </div>
                <div className="payment-detail-row">
                  <dt>Donor Email</dt>
                  <dd>{donorEmail}</dd>
                </div>
                {donorName && (
                  <div className="payment-detail-row">
                    <dt>Donor Name</dt>
                    <dd>{donorName}</dd>
                  </div>
                )}
                {donorPhone && (
                  <div className="payment-detail-row">
                    <dt>Mobile Number</dt>
                    <dd>{donorPhone}</dd>
                  </div>
                )}
              </dl>

              {/* Trust & Security Indicators */}
              <div className="payment-security-badges">
                <div className="payment-security-item">
                  <Lock size={13} />
                  <span>256-Bit Bank-Grade SSL Encryption</span>
                </div>
                <div className="payment-security-item">
                  <Shield size={13} />
                  <span>PCI-DSS Level 1 Certified Payment Flow</span>
                </div>
                <div className="payment-security-item">
                  <CheckCircle2 size={13} />
                  <span>Official 80G Tax Exemption Receipt</span>
                </div>
              </div>
            </div>

            {/* Back link */}
            <div>
              <button
                type="button"
                className="payment-back-link"
                onClick={onBack}
                disabled={isProcessing}
              >
                <ArrowLeft size={15} />
                <span>Change amount or details</span>
              </button>
            </div>
          </aside>

          {/* ================================================================
              RIGHT COLUMN: RAZORPAY-INSPIRED PAYMENT METHODS
              ================================================================ */}
          <main className="payment-methods-side">
            <header className="payment-header">
              <div className="payment-header-left">
                <h3>Select Payment Method</h3>
                <p>Choose your preferred payment mode to complete this donation.</p>
              </div>
              <div className="razorpay-badge" title="Secured by Razorpay Payment Gateway">
                <Lock size={11} />
                <span>Secured by <strong>Razorpay</strong></span>
              </div>
            </header>

            {/* Payment Method Tabs */}
            <div className="payment-method-selector" role="tablist" aria-label="Payment modes">
              <button
                type="button"
                role="tab"
                aria-selected={method === "upi"}
                className={`payment-method-tab ${method === "upi" ? "active" : ""}`}
                onClick={() => setMethod("upi")}
              >
                <div className="payment-method-tab-icon">
                  <Smartphone size={16} />
                </div>
                <span className="payment-method-tab-title">UPI</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={method === "card"}
                className={`payment-method-tab ${method === "card" ? "active" : ""}`}
                onClick={() => setMethod("card")}
              >
                <div className="payment-method-tab-icon">
                  <CreditCard size={16} />
                </div>
                <span className="payment-method-tab-title">Card</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={method === "netbanking"}
                className={`payment-method-tab ${method === "netbanking" ? "active" : ""}`}
                onClick={() => setMethod("netbanking")}
              >
                <div className="payment-method-tab-icon">
                  <Building2 size={16} />
                </div>
                <span className="payment-method-tab-title">NetBanking</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={method === "wallet"}
                className={`payment-method-tab ${method === "wallet" ? "active" : ""}`}
                onClick={() => setMethod("wallet")}
              >
                <div className="payment-method-tab-icon">
                  <Wallet size={16} />
                </div>
                <span className="payment-method-tab-title">Wallets</span>
              </button>
            </div>

            {/* Error Message if any */}
            {checkoutError && (
              <div className="donor-auth-alert donor-auth-alert--error mb-3" role="alert">
                <AlertCircle size={18} />
                <div>{checkoutError}</div>
              </div>
            )}

            {/* Method Panels */}
            {method === "upi" && (
              <div className="payment-panel-box">
                <div className="payment-panel-title">
                  <span>Fast UPI Payment</span>
                  <span className="badge bg-success-subtle text-success small fw-semibold">Zero Surcharge</span>
                </div>

                <div className="upi-app-grid">
                  {UPI_APPS.map((app) => (
                    <button
                      type="button"
                      key={app.id}
                      className={`upi-app-btn ${selectedUpiApp === app.id ? "active" : ""}`}
                      onClick={() => setSelectedUpiApp(app.id)}
                    >
                      <Zap size={16} className="text-warning" />
                      <span className="upi-app-badge">{app.label}</span>
                    </button>
                  ))}
                </div>

                <div className="upi-vpa-input-group">
                  <label htmlFor="upi-vpa-field">Or Enter Any UPI ID (VPA)</label>
                  <input
                    id="upi-vpa-field"
                    type="text"
                    className="upi-vpa-input"
                    placeholder="e.g. mobile@upi or username@okhdfcbank"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                  <div className="upi-merchant-note">
                    <ShieldCheck size={14} />
                    <span>Verified Merchant: Synergy Organization (synergy@razorpay)</span>
                  </div>
                </div>
              </div>
            )}

            {method === "card" && (
              <div className="payment-panel-box">
                <div className="payment-panel-title">
                  <span>Credit or Debit Card</span>
                  <span className="small text-muted">Visa, Mastercard, RuPay</span>
                </div>

                <div className="card-form-grid">
                  <div className="card-input-wrap">
                    <input
                      type="text"
                      className="card-input"
                      placeholder="Card Number (XXXX XXXX XXXX XXXX)"
                      maxLength={19}
                      value={cardData.number}
                      onChange={(e) => setCardData({ ...cardData, number: formatCardNumber(e.target.value) })}
                    />
                    <div className="card-icons-inline">
                      <span>VISA</span> • <span>MC</span> • <span>RuPay</span>
                    </div>
                  </div>

                  <div className="card-row-split">
                    <input
                      type="text"
                      className="card-input"
                      placeholder="MM / YY"
                      maxLength={5}
                      value={cardData.expiry}
                      onChange={(e) => setCardData({ ...cardData, expiry: formatExpiry(e.target.value) })}
                    />
                    <input
                      type="password"
                      className="card-input"
                      placeholder="CVV / CVC"
                      maxLength={4}
                      value={cardData.cvv}
                      onChange={(e) => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, "") })}
                    />
                  </div>

                  <input
                    type="text"
                    className="card-input"
                    placeholder="Cardholder Name"
                    value={cardData.name}
                    onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                  />

                  <label className="card-save-checkbox">
                    <input
                      type="checkbox"
                      checked={cardData.saveCard}
                      onChange={(e) => setCardData({ ...cardData, saveCard: e.target.checked })}
                    />
                    <span>Save card securely as per RBI guidelines for future donations</span>
                  </label>
                </div>
              </div>
            )}

            {method === "netbanking" && (
              <div className="payment-panel-box">
                <div className="payment-panel-title">
                  <span>Select Your Bank</span>
                  <span className="small text-muted">All Indian Banks Supported</span>
                </div>

                <div className="banks-grid">
                  {POPULAR_BANKS.map((b) => (
                    <button
                      type="button"
                      key={b.id}
                      className={`bank-option-btn ${selectedBank === b.id ? "active" : ""}`}
                      onClick={() => setSelectedBank(b.id)}
                    >
                      {b.code}
                    </button>
                  ))}
                </div>

                <select
                  className="bank-select-dropdown"
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                >
                  <option value="" disabled>Choose Another Bank</option>
                  {OTHER_BANKS.map((bankName) => (
                    <option key={bankName} value={bankName}>{bankName}</option>
                  ))}
                </select>
              </div>
            )}

            {method === "wallet" && (
              <div className="payment-panel-box">
                <div className="payment-panel-title">
                  <span>Popular Wallets</span>
                  <span className="small text-muted">Instant Link</span>
                </div>

                <div className="wallets-grid">
                  {WALLETS.map((w) => (
                    <button
                      type="button"
                      key={w.id}
                      className={`wallet-option-btn ${selectedWallet === w.id ? "active" : ""}`}
                      onClick={() => setSelectedWallet(w.id)}
                    >
                      <Wallet size={16} className="text-success" />
                      <span>{w.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Prominent Green Pay Securely Button */}
            <button
              type="button"
              className="payment-submit-btn"
              disabled={isProcessing}
              onClick={handlePay}
            >
              <Lock size={18} />
              <span>
                {isProcessing
                  ? "Opening Secure Checkout…"
                  : `Pay Securely ₹${Number(amount || 0).toLocaleString("en-IN")}`}
              </span>
              {!isProcessing && <ArrowRight size={18} className="pay-arrow" />}
            </button>

            <div className="payment-footer-note">
              <ShieldCheck size={14} className="text-success" />
              <span>Encrypted 256-bit connection via Razorpay • 100% Tax-Deductible</span>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}
