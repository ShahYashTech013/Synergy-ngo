import { useState } from "react";
import {
  Bell, ChevronDown, ChevronRight, CircleHelp, ExternalLink, LogOut, Menu, Settings, X,
} from "lucide-react";
import { hasPermission } from "../../services/auth/permissions.js";
import AdminBrand from "./AdminBrand.jsx";

export default function AdminLayout({ modules, route, onNavigate, onLogout, onPublicHome, user, children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const current = modules.find((item) => item.key === route) || modules[0];
  const allowed = modules.filter((item) => hasPermission(user, item.permission));

  return (
    <div className="admin-shell">
      {mobileOpen && <button className="admin-sidebar-scrim" onClick={() => setMobileOpen(false)} aria-label="Close navigation" />}
      <aside className={`admin-sidebar${mobileOpen ? " is-open" : ""}`}>
        <div className="admin-sidebar-brand">
          <AdminBrand />
          <button className="admin-mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X size={18} /></button>
        </div>
        <div className="admin-sidebar-label">WORKSPACE</div>
        <nav aria-label="Admin navigation">
          {allowed.map(({ key, label, path, icon: Icon }) => (
            <button key={key} className={`admin-nav-link${key === route ? " active" : ""}`} onClick={() => { onNavigate(path); setMobileOpen(false); }}>
              <Icon size={18} />
              <span>{label}</span>
              {key === "enquiries" && <i className="admin-nav-dot" />}
            </button>
          ))}
        </nav>
        <div className="admin-sidebar-bottom">
          <div className="admin-help-card">
            <div className="admin-help-icon"><CircleHelp size={17} /></div>
            <b>Need a hand?</b>
            <span>Frontend demonstration workspace</span>
          </div>
          <button className="admin-nav-link" onClick={onPublicHome}><ExternalLink size={17} /><span>View public website</span></button>
          <button className="admin-nav-link admin-logout" onClick={onLogout}><LogOut size={18} /><span>Log out</span></button>
          <div className="admin-sidebar-foot">SYNERGY ORGANIZATION <span>v1.0 · Demo</span></div>
        </div>
      </aside>
      <div className="admin-main">
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button className="admin-menu-toggle" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu size={21} /></button>
            <div>
              <h2>{current.label}</h2>
              <div className="admin-breadcrumb"><span>Workspace</span><ChevronRight size={13} /><b>{current.label}</b></div>
            </div>
          </div>
          <div className="admin-topbar-right">
            <button className="admin-icon-button" aria-label="Notifications" title="No new demo notifications"><Bell size={18} /><i /></button>
            <div className="admin-user-wrap">
              <button className="admin-user-button" onClick={() => setProfileOpen(!profileOpen)}>
                <span className="admin-user-avatar">{user.fullName.split(" ").map((part) => part[0]).slice(0, 2).join("")}</span>
                <span className="admin-user-meta"><b>{user.fullName}</b><small><span>{user.role}</span></small></span>
                <ChevronDown size={15} />
              </button>
              {profileOpen && (
                <div className="admin-profile-menu">
                  <b>{user.email}</b>
                  <span>{user.role} · demo access</span>
                  <button onClick={() => onNavigate("/admin/settings")}><Settings size={15} /> Settings</button>
                  <button onClick={onLogout}><LogOut size={15} /> Log out</button>
                </div>
              )}
            </div>
          </div>
        </header>
        <main className="admin-main-content">{children}</main>
        <footer className="admin-footer">
          <span>© {new Date().getFullYear()} Synergy Organization</span>
          <span>Frontend demo · No backend connected</span>
        </footer>
      </div>
    </div>
  );
}
