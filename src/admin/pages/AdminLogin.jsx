import { useState } from "react";
import { ChevronRight, Leaf, Shield } from "lucide-react";
import { authService } from "../../services/auth/authService.js";
import AdminBrand from "../components/AdminBrand.jsx";

export default function AdminLogin({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "", role: "Super Admin" });
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await authService.login(form);
      onLogin();
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <AdminBrand />
        <div className="admin-eyebrow">SECURE WORKSPACE</div>
        <h1>Welcome back</h1>
        <p>Sign in to manage Synergy Organization.</p>
        {error && <div className="admin-alert admin-alert--error" role="alert">{error}</div>}
        <form onSubmit={submit}>
          <label>
            Email address
            <input
              type="email"
              autoComplete="username"
              required
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              placeholder="you@organization.org"
            />
          </label>
          <label>
            Password
            <span className="admin-password">
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                minLength="6"
                required
                value={form.password}
                onChange={(event) => setForm({ ...form, password: event.target.value })}
                placeholder="Enter your password"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "Hide" : "Show"}
              </button>
            </span>
          </label>
          <label>
            Demonstration role
            <select value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })}>
              <option>Super Admin</option>
              <option>Admin</option>
              <option>Staff</option>
            </select>
          </label>
          <button className="admin-primary admin-login__submit" disabled={busy}>
            {busy ? "Signing in…" : "Sign in"} <ChevronRight size={17} />
          </button>
        </form>
        <div className="admin-login__hint"><Shield size={16} /> Frontend-only demo authentication; not a security control.</div>
        <button
          className="admin-text-button"
          onClick={() => setError("Password recovery is not available in the frontend demo. Configure an authenticated backend email flow in Phase 2.")}
        >
          Forgot password?
        </button>
        <div className="admin-demo-hint">Use any valid email and a password of 6+ characters. No production credentials are included.</div>
      </div>
      <div className="admin-login__aside">
        <span>OUR MISSION</span>
        <h2>Cleaner energy.<br />Stronger communities.</h2>
        <p>Tools for the people working to build lasting change.</p>
        <div className="admin-login__aside-mark"><Leaf size={29} /></div>
      </div>
    </div>
  );
}
