import { useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Leaf,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";
import { userAuthService } from "../services/auth/userAuthService.js";
import { paymentService } from "../services/payments/paymentService.js";
import PaymentCheckout from "../COMPONENT/PaymentCheckout.jsx";
import "../COMPONENT/DonorAuth.css";

export default function Donate({
  programmes,
  onReturn,
}) {
  const [donorUser, setDonorUser] = useState(() => userAuthService.getCurrentUser());
  const [donorAuthEmail, setDonorAuthEmail] = useState(() => userAuthService.getCurrentUser()?.email || "");
  const donorLoggedIn = Boolean(donorUser);
  const [authMode, setAuthMode] = useState("login");
  const [donorPassword, setDonorPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authBusy, setAuthBusy] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authSuccess, setAuthSuccess] = useState("");
  const [donationType, setDonationType] = useState("one-time");
  const [donationAmount, setDonationAmount] = useState(1500);
  const [customAmount, setCustomAmount] = useState("");
  const [donationProgramme, setDonationProgramme] = useState("General Fund (Where Needed Most)");
  const [donorDetails, setDonorDetails] = useState({ name: userAuthService.getCurrentUser()?.name || "", phone: "" });
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [paymentBusy, setPaymentBusy] = useState(false);

  const finalAmount = customAmount ? Number(customAmount) : donationAmount;
  const finalAmountPaise = finalAmount * 100;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (authBusy) return;
    setAuthBusy(true);
    setAuthError("");
    setAuthSuccess("");
    try {
      const user = authMode === "register"
        ? await userAuthService.register({
          name: donorDetails.name,
          email: donorAuthEmail,
          password: donorPassword,
        })
        : await userAuthService.login({ email: donorAuthEmail, password: donorPassword });
      setDonorAuthEmail(user.email);
      setDonorUser(user);
      setDonorDetails((details) => ({ ...details, name: details.name || user.name || "" }));
      setAuthSuccess(authMode === "register" ? "Your account has been created." : "You are signed in.");
    } catch (error) {
      setAuthError(error.message || "Authentication failed. Please try again.");
    } finally {
      setAuthBusy(false);
    }
  };

  const handleDonorLogout = () => {
    setDonorUser(null);
    userAuthService.logout();
    setAuthSuccess("");
  };

  const handlePay = async () => {
    if (paymentBusy) return;
    setPaymentBusy(true);
    setAuthError("");
    try {
      await paymentService.createCheckoutSession({
        donorName: donorDetails.name || userAuthService.getCurrentUser()?.name || "Supporter",
        email: donorAuthEmail,
        phone: donorDetails.phone,
        amount: finalAmount,
        campaign: donationProgramme,
        donationType,
      });
      setCheckoutStep(4);
    } catch (error) {
      setAuthError(error.message || "Could not complete the donation. Please try again.");
    } finally {
      setPaymentBusy(false);
    }
  };

  return (
    <div className="w-100">
      {!donorLoggedIn ? (
        <section className="donor-auth-section">
          <div className="donor-auth-container">
            <div className="donor-auth-card">
              {/* Left Column: NGO Branding & Environmental Story */}
              <div className="donor-auth-brand-side">
                <div className="donor-auth-brand-overlay" />
                <div className="donor-auth-brand-content">
                  <div>
                    <div className="donor-auth-logo-badge">
                      <img src="/synergy-organization-logo.svg" alt="Synergy Organization" />
                    </div>

                    <div className="donor-auth-badge">
                      <Leaf size={14} className="text-warning" />
                      <span>Synergy Organization</span>
                    </div>

                    <h2 className="donor-auth-brand-title">
                      Empowering Rural Lives, <span>Restoring Nature.</span>
                    </h2>

                    <p className="donor-auth-brand-desc">
                      Join our dedicated donor community providing smoke-free kitchens, clean biogas energy,
                      and sustainable livelihoods across rural India.
                    </p>

                    <div className="donor-auth-features">
                      <div className="donor-auth-feature-item">
                        <div className="donor-auth-feature-icon">
                          <Leaf size={16} />
                        </div>
                        <div className="donor-auth-feature-text">
                          <h4>100% Direct Impact</h4>
                          <p>Every contribution directly funds community biogas & green village setups.</p>
                        </div>
                      </div>

                      <div className="donor-auth-feature-item">
                        <div className="donor-auth-feature-icon">
                          <ShieldCheck size={16} />
                        </div>
                        <div className="donor-auth-feature-text">
                          <h4>80G Tax Exemption</h4>
                          <p>Qualifies for tax-deductible receipts issued directly to your email.</p>
                        </div>
                      </div>

                      <div className="donor-auth-feature-item">
                        <div className="donor-auth-feature-icon">
                          <Sparkles size={16} />
                        </div>
                        <div className="donor-auth-feature-text">
                          <h4>Verified Donor Portal</h4>
                          <p>Encrypted records, seamless receipts, and real-time project updates.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="donor-auth-quote">
                    <span className="donor-auth-quote-tag">
                      🌱 <strong>2,400+ Families</strong> transitioned to clean cooking through Synergy initiatives.
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Clean White Authentication Form */}
              <div className="donor-auth-form-side">
                <div className="donor-auth-form-header">
                  <span className="donor-auth-form-eyebrow">Donor Checkout Portal</span>
                  <h1 className="donor-auth-form-title">
                    {authMode === "register" ? "Create Donor Account" : "Donor Sign In"}
                  </h1>
                  <p className="donor-auth-form-sub">
                    {authMode === "register"
                      ? "Register to access the secure donation checkout and receive your transaction receipt."
                      : "Please sign in to proceed with your donation and receive an 80G receipt."}
                  </p>
                </div>

                {/* Modern Segmented Tabs */}
                <div className="donor-auth-tabs" role="tablist" aria-label="Authentication mode">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={authMode === "login"}
                    className={`donor-auth-tab-btn ${authMode === "login" ? "active" : ""}`}
                    onClick={() => {
                      setAuthMode("login");
                      setAuthError("");
                      setAuthSuccess("");
                    }}
                  >
                    <Lock size={15} />
                    <span>Donor Sign In</span>
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={authMode === "register"}
                    className={`donor-auth-tab-btn ${authMode === "register" ? "active" : ""}`}
                    onClick={() => {
                      setAuthMode("register");
                      setAuthError("");
                      setAuthSuccess("");
                    }}
                  >
                    <User size={15} />
                    <span>Create Account</span>
                  </button>
                </div>

                {/* Notifications */}
                {authError && (
                  <div className="donor-auth-alert donor-auth-alert--error" role="alert">
                    <AlertCircle size={18} />
                    <div>{authError}</div>
                  </div>
                )}
                {authSuccess && (
                  <div className="donor-auth-alert donor-auth-alert--success" role="status">
                    <CheckCircle2 size={18} />
                    <div>{authSuccess}</div>
                  </div>
                )}

                <form onSubmit={handleLoginSubmit}>
                  {authMode === "register" && (
                    <div className="donor-auth-field">
                      <label className="donor-auth-label" htmlFor="donor-register-name">
                        Full Name <span>*</span>
                      </label>
                      <div className="donor-auth-input-wrapper">
                        <User size={18} className="donor-auth-input-icon" aria-hidden="true" />
                        <input
                          id="donor-register-name"
                          name="name"
                          type="text"
                          className="donor-auth-input"
                          required
                          minLength={2}
                          maxLength={80}
                          autoComplete="name"
                          placeholder="e.g. Ramesh Patel"
                          value={donorDetails.name}
                          onChange={(e) => setDonorDetails({ ...donorDetails, name: e.target.value })}
                        />
                      </div>
                    </div>
                  )}

                  <div className="donor-auth-field">
                    <label className="donor-auth-label" htmlFor="donor-auth-email">
                      Email Address <span>*</span>
                    </label>
                    <div className="donor-auth-input-wrapper">
                      <Mail size={18} className="donor-auth-input-icon" aria-hidden="true" />
                      <input
                        id="donor-auth-email"
                        name="email"
                        type="email"
                        className="donor-auth-input"
                        required
                        maxLength={254}
                        autoComplete="email"
                        placeholder="donor@example.com"
                        value={donorAuthEmail}
                        onChange={(e) => setDonorAuthEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="donor-auth-field">
                    <label className="donor-auth-label" htmlFor="donor-auth-password">
                      Password <span>*</span>
                    </label>
                    <div className="donor-auth-input-wrapper">
                      <Lock size={18} className="donor-auth-input-icon" aria-hidden="true" />
                      <input
                        id="donor-auth-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        className="donor-auth-input donor-auth-input--with-toggle"
                        required
                        minLength={authMode === "register" ? 8 : undefined}
                        maxLength={128}
                        autoComplete={authMode === "register" ? "new-password" : "current-password"}
                        placeholder="••••••••••••"
                        value={donorPassword}
                        onChange={(e) => setDonorPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="donor-auth-toggle-pwd"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        aria-pressed={showPassword}
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {authMode === "register" && (
                      <span className="donor-auth-hint">
                        Use 8–128 characters with at least one letter and one number.
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={authBusy}
                    className="donor-auth-submit-btn"
                  >
                    <span>
                      {authBusy
                        ? "Please wait…"
                        : authMode === "login"
                        ? "Sign In & Continue to Donate"
                        : "Register & Continue"}
                    </span>
                    {!authBusy && <ArrowRight size={18} className="btn-arrow" />}
                  </button>
                </form>

                <div className="donor-auth-footer">
                  <span>
                    {authMode === "register" ? "Already have an account?" : "New to Synergy Organization?"}
                  </span>{" "}
                  <button
                    type="button"
                    className="donor-auth-switch-btn"
                    onClick={() => {
                      setAuthMode(authMode === "register" ? "login" : "register");
                      setAuthError("");
                      setAuthSuccess("");
                    }}
                  >
                    {authMode === "register" ? "Donor Sign In" : "Create Account"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : checkoutStep === 3 ? (
        <PaymentCheckout
          amount={finalAmount}
          donationType={donationType}
          campaign={donationProgramme}
          donorEmail={donorAuthEmail}
          donorName={donorDetails.name}
          donorPhone={donorDetails.phone}
          onBack={() => setCheckoutStep(2)}
          onPaymentSuccess={() => setCheckoutStep(4)}
        />
      ) : (
        <div className="synergy-public-form container-fluid px-4 px-md-5 synergy-section-padding w-100">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="card-header bg-success text-white p-4 d-flex justify-content-between align-items-center synergy-donor-header">
                <div className="synergy-donor-header__identity">
                  <h3 className="fw-bold mb-1">Support Rural Communities</h3>
                  <p className="small mb-0 opacity-90">
                    Logged in as: <strong>{donorAuthEmail}</strong>
                  </p>
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-light rounded-pill px-3"
                  onClick={handleDonorLogout}
                >
                  Log out
                </button>
              </div>
              <div className="card-body p-4 p-md-5">
                {authError && <div className="alert alert-danger rounded-3" role="alert">{authError}</div>}
                {authSuccess && <div className="alert alert-success rounded-3" role="status">{authSuccess}</div>}
                {checkoutStep === 1 && (
                  <div>
                    <div className="mb-4">
                      <label className="form-label fw-bold">1. Choose Donation Type</label>
                      <div className="d-flex flex-wrap gap-2" role="group" aria-label="Donation frequency">
                        <button
                          type="button"
                          aria-pressed={donationType === "one-time"}
                          className={`btn px-4 rounded-pill ${
                            donationType === "one-time" ? "btn-success shadow-sm" : "btn-outline-secondary"
                          }`}
                          onClick={() => setDonationType("one-time")}
                        >
                          One-Time Donation
                        </button>
                        <button
                          type="button"
                          aria-pressed={donationType === "monthly"}
                          className={`btn px-4 rounded-pill ${
                            donationType === "monthly" ? "btn-success shadow-sm" : "btn-outline-secondary"
                          }`}
                          onClick={() => setDonationType("monthly")}
                        >
                          Monthly Support
                        </button>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-bold" htmlFor="donation-custom-amount">2. Select Amount (INR)</label>
                      <div className="d-flex flex-wrap gap-2 mb-3">
                        {[500, 1500, 3000, 5000, 10000].map((amt) => (
                          <button
                            type="button"
                            aria-pressed={!customAmount && donationAmount === amt}
                            key={amt}
                            className={`btn px-4 py-2 rounded-pill ${
                              !customAmount && donationAmount === amt
                                ? "btn-warning fw-bold text-dark shadow-sm"
                                : "btn-outline-dark"
                            }`}
                            onClick={() => {
                              setDonationAmount(amt);
                              setCustomAmount("");
                            }}
                          >
                            ₹{amt.toLocaleString("en-IN")}
                          </button>
                        ))}
                      </div>
                      <input
                        id="donation-custom-amount"
                        name="customAmount"
                        type="number"
                        min="1"
                        step="0.01"
                        className="form-control form-control-lg"
                        placeholder="Or enter custom amount (₹)"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                      />
                      <small className="text-muted mt-1 d-block">
                        Backend integer value: <code>{finalAmountPaise} paise</code>
                      </small>
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-bold" htmlFor="donation-programme">3. Earmark Programme / Campaign</label>
                      <select
                        id="donation-programme"
                        name="campaign"
                        className="form-select form-select-lg"
                        value={donationProgramme}
                        onChange={(e) => setDonationProgramme(e.target.value)}
                      >
                        <option>General Fund (Where Needed Most)</option>
                        {programmes.map((p) => (
                          <option key={p.id} value={p.title}>{p.title}</option>
                        ))}
                      </select>
                    </div>

                    <div className="row g-3 mb-4">
                      <div className="col-md-6">
                        <label className="form-label fw-semibold small" htmlFor="donation-donor-name">Full Name *</label>
                        <input
                          id="donation-donor-name"
                          name="donorName"
                          type="text"
                          className="form-control"
                          autoComplete="name"
                          required
                          value={donorDetails.name}
                          onChange={(e) => setDonorDetails({ ...donorDetails, name: e.target.value })}
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold small" htmlFor="donation-donor-phone">Mobile Number *</label>
                        <input
                          id="donation-donor-phone"
                          name="phone"
                          type="tel"
                          className="form-control"
                          autoComplete="tel"
                          required
                          value={donorDetails.phone}
                          onChange={(e) => setDonorDetails({ ...donorDetails, phone: e.target.value })}
                          placeholder="10-digit mobile number"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      className="btn btn-warning btn-lg w-100 fw-bold py-3 text-dark shadow rounded-pill"
                      onClick={() => {
                        if (!donorDetails.name.trim() || !donorDetails.phone.trim() || !Number.isFinite(finalAmount) || finalAmount < 1) {
                          setAuthError("Enter your name, phone number, and a valid donation amount to continue.");
                          return;
                        }
                        setAuthError("");
                        setCheckoutStep(2);
                      }}
                    >
                      Review Donation Details <i className="bi bi-arrow-right ms-2"></i>
                    </button>
                  </div>
                )}

                {checkoutStep === 2 && (
                  <div>
                    <h4 className="fw-bold mb-4">Review Your Contribution</h4>
                    <ul className="list-group list-group-flush mb-4 rounded-3 border">
                      <li className="list-group-item d-flex justify-content-between py-3">
                        <span>Contribution Amount:</span>
                        <strong className="text-success fs-5">₹{finalAmount.toLocaleString("en-IN")}</strong>
                      </li>
                      <li className="list-group-item d-flex justify-content-between py-3">
                        <span>Programme Fund:</span>
                        <strong>{donationProgramme}</strong>
                      </li>
                      <li className="list-group-item d-flex justify-content-between py-3">
                        <span>Authenticated Donor:</span>
                        <strong>{donorAuthEmail}</strong>
                      </li>
                    </ul>
                    <div className="d-flex gap-3 synergy-review-actions">
                      <button type="button" className="btn btn-outline-secondary px-4 py-3 rounded-pill" onClick={() => setCheckoutStep(1)}>
                        Back
                      </button>
                      <button type="button" className="btn btn-success fw-bold flex-grow-1 py-3 shadow rounded-pill" onClick={() => setCheckoutStep(3)}>
                        Proceed to secure payment
                      </button>
                    </div>
                  </div>
                )}

                {checkoutStep === 4 && (
                  <div className="text-center py-5">
                    <div className="display-3 text-success mb-3">
                      <i className="bi bi-check-circle-fill"></i>
                    </div>
                    <h3 className="fw-bold mb-2">Payment Verified Successfully!</h3>
                    <p className="text-muted mb-4">
                      Your payment was verified by our server. Thank you for supporting Synergy Organization.
                    </p>
                    <button type="button" className="btn btn-outline-success px-4 py-2 rounded-pill" onClick={onReturn}>
                      Return to Synergy
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
);
}
