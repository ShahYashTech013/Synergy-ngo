import { useEffect, useState } from "react";
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
import { assetUrl } from "../utils/assetUrl";
import "../COMPONENT/DonorAuth.css";

export default function AuthPage({ mode, onNavigate }) {
  const [activeTab, setActiveTab] = useState(mode === "register" ? "register" : "login");
  const isRegister = activeTab === "register";

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setActiveTab(mode === "register" ? "register" : "login");
    setError("");
    setSuccess("");
  }, [mode]);

  useEffect(() => {
    if (!success) return undefined;
    const redirectTimer = window.setTimeout(() => onNavigate("home"), 1200);
    return () => window.clearTimeout(redirectTimer);
  }, [onNavigate, success]);

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setError("");
    setSuccess("");
    if (typeof onNavigate === "function") {
      onNavigate(tab);
    }
  };

  const submit = async (event) => {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    setSuccess("");

    try {
      if (isRegister) {
        await userAuthService.register(form);
        setSuccess("Account successfully created! Taking you to the Synergy portal…");
      } else {
        await userAuthService.login({ email: form.email, password: form.password });
        setSuccess("Successfully signed in! Taking you to the Synergy portal…");
      }
    } catch (authError) {
      setError(authError.message || "Authentication failed. Please verify your credentials and try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="donor-auth-section">
      <div className="donor-auth-container">
        <div className="donor-auth-card">
          {/* Left Column: NGO Branding & Environmental Story */}
          <div className="donor-auth-brand-side">
            <div className="donor-auth-brand-overlay" />
            <div className="donor-auth-brand-content">
              <div>
                <div className="donor-auth-logo-badge">
                  <img src={assetUrl("/synergy-organization-logo.svg")} alt="Synergy Organization" />
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
              <span className="donor-auth-form-eyebrow">Donor Portal</span>
              <h1 className="donor-auth-form-title">
                {isRegister ? "Create Donor Account" : "Welcome Back"}
              </h1>
              <p className="donor-auth-form-sub">
                {isRegister
                  ? "Join Synergy Organization to support verified environmental initiatives."
                  : "Please sign in to access your donation portal and official receipts."}
              </p>
            </div>

            {/* Modern Segmented Tabs */}
            <div className="donor-auth-tabs" role="tablist" aria-label="Authentication mode">
              <button
                type="button"
                role="tab"
                aria-selected={!isRegister}
                className={`donor-auth-tab-btn ${!isRegister ? "active" : ""}`}
                onClick={() => handleTabSwitch("login")}
              >
                <Lock size={15} />
                <span>Donor Sign In</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={isRegister}
                className={`donor-auth-tab-btn ${isRegister ? "active" : ""}`}
                onClick={() => handleTabSwitch("register")}
              >
                <User size={15} />
                <span>Create Account</span>
              </button>
            </div>

            {/* Error Notification */}
            {error && (
              <div className="donor-auth-alert donor-auth-alert--error" role="alert">
                <AlertCircle size={18} />
                <div>{error}</div>
              </div>
            )}

            {/* Success Notification */}
            {success && (
              <div className="donor-auth-alert donor-auth-alert--success" role="status">
                <CheckCircle2 size={18} />
                <div>{success}</div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={submit} noValidate={false}>
              {isRegister && (
                <div className="donor-auth-field">
                  <label className="donor-auth-label" htmlFor="auth-full-name">
                    Full Name <span>*</span>
                  </label>
                  <div className="donor-auth-input-wrapper">
                    <User size={18} className="donor-auth-input-icon" aria-hidden="true" />
                    <input
                      id="auth-full-name"
                      name="name"
                      type="text"
                      className="donor-auth-input"
                      placeholder="e.g. Ramesh Patel"
                      autoComplete="name"
                      minLength={2}
                      maxLength={80}
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                </div>
              )}

              <div className="donor-auth-field">
                <label className="donor-auth-label" htmlFor="auth-email-address">
                  Email Address <span>*</span>
                </label>
                <div className="donor-auth-input-wrapper">
                  <Mail size={18} className="donor-auth-input-icon" aria-hidden="true" />
                  <input
                    id="auth-email-address"
                    name="email"
                    type="email"
                    className="donor-auth-input"
                    placeholder="donor@example.com"
                    autoComplete="email"
                    maxLength={254}
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="donor-auth-field">
                <label className="donor-auth-label" htmlFor="auth-donor-password">
                  Password <span>*</span>
                </label>
                <div className="donor-auth-input-wrapper">
                  <Lock size={18} className="donor-auth-input-icon" aria-hidden="true" />
                  <input
                    id="auth-donor-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="donor-auth-input donor-auth-input--with-toggle"
                    placeholder="••••••••••••"
                    autoComplete={isRegister ? "new-password" : "current-password"}
                    minLength={isRegister ? 8 : undefined}
                    maxLength={128}
                    required
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
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
                {isRegister && (
                  <span className="donor-auth-hint">
                    Use 8–128 characters with at least one letter and one number.
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="donor-auth-submit-btn"
                disabled={busy || Boolean(success)}
              >
                <span>
                  {busy
                    ? "Please wait…"
                    : isRegister
                    ? "Create Account & Continue"
                    : "Sign In to Synergy"}
                </span>
                {!busy && <ArrowRight size={18} className="btn-arrow" />}
              </button>
            </form>

            <div className="donor-auth-footer">
              <span>{isRegister ? "Already have an account?" : "New to Synergy Organization?"}</span>{" "}
              <button
                type="button"
                className="donor-auth-switch-btn"
                onClick={() => handleTabSwitch(isRegister ? "login" : "register")}
              >
                {isRegister ? "Sign In" : "Create Account"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
