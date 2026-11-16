import { useEffect, useState } from "react";
import {
  Activity, ArrowDownToLine, BookOpen, Check, ChevronLeft, ChevronRight,
  ClipboardList, CreditCard, ExternalLink, FileImage, Flame, FolderKanban, HandHeart, House, ImagePlus,
  LayoutDashboard, Leaf, Mail, MessageSquare, Pencil, Plus, Search, Settings, Video,
  LayoutTemplate, Shield, Sparkles, Trash2, Users, X,
} from "lucide-react";
import { useRepository } from "../hooks/useRepository.js";
import { authService } from "../services/auth/authService.js";
import { hasPermission, permissionMatrix } from "../services/auth/permissions.js";
import AdminLayout from "./components/AdminLayout.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AppearanceManagement from "./pages/AppearanceManagement.jsx";
import VideoManagement from "./pages/VideoManagement.jsx";
import { mediaService } from "../services/media/mediaService.js";
import { serviceMode } from "../services/config.js";
import {
  activityRepository, campaignRepository, contactRepository, donationRepository, enquiryRepository,
  impactChartRepository, impactRepository, initiativeRepository, mediaRepository, projectRepository, settingsRepository,
  storyRepository, userRepository, volunteerRepository,
} from "../services/repositories/index.js";
import "./admin.css";

const modules = [
  { key: "dashboard", label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard, permission: "dashboard.view" },
  { key: "activities", label: "Recent Activities", path: "/admin/activities", icon: Activity, permission: "activities.view" },
  { key: "projects", label: "Project Management", path: "/admin/projects", icon: FolderKanban, permission: "projects.view" },
  { key: "initiatives", label: "Initiative Management", path: "/admin/initiatives", icon: Leaf, permission: "initiatives.view" },
  { key: "volunteers", label: "Volunteer Management", path: "/admin/volunteers", icon: HandHeart, permission: "volunteers.view" },
  { key: "donations", label: "Donation Management", path: "/admin/donations", icon: CreditCard, permission: "donations.view" },
  { key: "campaigns", label: "Campaign Management", path: "/admin/campaigns", icon: Leaf, permission: "campaigns.view" },
  { key: "contacts", label: "Contact Management", path: "/admin/contacts", icon: Mail, permission: "contacts.view" },
  { key: "enquiries", label: "Enquiries", path: "/admin/enquiries", icon: MessageSquare, permission: "enquiries.view" },
  { key: "impact", label: "Impact Management", path: "/admin/impact", icon: Flame, permission: "impact.view" },
  { key: "media", label: "Image Management", path: "/admin/media", icon: FileImage, permission: "media.view" },
  { key: "videos", label: "Video Management", path: "/admin/videos", icon: Video, permission: "video.view" },
  { key: "stories", label: "Stories Management", path: "/admin/stories", icon: BookOpen, permission: "stories.view" },
  { key: "users", label: "User Management", path: "/admin/users", icon: Users, permission: "users.view" },
  { key: "settings", label: "Settings", path: "/admin/settings", icon: Settings, permission: "settings.view" },
  { key: "appearance", label: "Website Appearance", path: "/admin/appearance", icon: LayoutTemplate, permission: "appearance.manage" },
];

const configs = {
  projects: {
    title: "Project Management", description: "Manage installation projects and public project listings.", repository: projectRepository,
    fields: [["title", "Project title", "text", true], ["description", "Description", "textarea", true], ["location", "Location", "text", true], ["installationDate", "Installation date", "date", false], ["plantCapacity", "Plant capacity", "text", false], ["category", "Category", "select", true], ["image", "Cover image URL", "image", false], ["status", "Status", "status", true]],
    columns: [["title", "Project"], ["location", "Location"], ["plantCapacity", "Capacity"], ["status", "Status"]],
    defaults: { title: "", description: "", location: "", installationDate: "", plantCapacity: "", category: "Household Biogas", images: [], status: "draft" },
    statusKey: "status", statuses: ["draft", "published", "completed"],
  },
  initiatives: {
    title: "Initiative Management",
    description: "Manage the four homepage initiative cards. Only active, published initiatives appear publicly, ordered by display position.",
    repository: initiativeRepository,
    fields: [
      ["title", "Initiative title", "text", true],
      ["category", "Category badge", "text", true],
      ["description", "Short description", "textarea", true],
      ["image", "Image URL", "image", true],
      ["imageAlt", "Image alternative text", "text", true],
      ["imageIsIllustrative", "Label as illustrative photo", "checkbox", false],
      ["displayOrder", "Display order", "number", true],
      ["isActive", "Active on website", "checkbox", false],
      ["status", "Publication status", "select", true],
    ],
    columns: [["image", "Photo"], ["title", "Initiative"], ["category", "Category"], ["displayOrder", "Order"], ["isActive", "Active"], ["status", "Publication"]],
    defaults: { title: "", category: "", description: "", image: "", imageAlt: "", imageIsIllustrative: true, displayOrder: 1, isActive: true, status: "draft" },
    statusKey: "status",
    statuses: ["draft", "published"],
  },
  volunteers: {
    title: "Volunteer Management", description: "Review applications and keep volunteer records up to date.", repository: volunteerRepository,
    fields: [["fullName", "Full name", "text", true], ["email", "Email", "email", true], ["phone", "Phone", "tel", false], ["areaOfInterest", "Area of interest", "text", true], ["experience", "Experience", "textarea", false], ["applicationStatus", "Application status", "select", true], ["assignedStaff", "Assigned staff member", "text", false]],
    columns: [["fullName", "Volunteer"], ["email", "Email"], ["areaOfInterest", "Interest"], ["applicationStatus", "Status"]],
    defaults: { fullName: "", email: "", phone: "", areaOfInterest: "", experience: "", applicationStatus: "pending", assignedStaff: "" }, statusKey: "applicationStatus", statuses: ["pending", "approved", "declined"],
  },
  donations: {
    title: "Donation Management", description: "Review sample payment records. No live payments are processed in this frontend demo.", repository: donationRepository,
    fields: [["donorName", "Donor name", "text", true], ["email", "Email", "email", true], ["phone", "Phone", "tel", false], ["adminNotes", "Administrative notes", "textarea", false]],
    columns: [["donorName", "Donor"], ["amount", "Amount"], ["campaign", "Campaign"], ["paymentStatus", "Payment status"], ["createdAt", "Date"]],
    defaults: { donorName: "", email: "", phone: "", campaign: "", donationType: "one-time", adminNotes: "" }, noCreate: true,
  },
  campaigns: {
    title: "Campaign Management", description: "Plan fundraising and community campaigns.", repository: campaignRepository,
    fields: [["title", "Campaign title", "text", true], ["description", "Description", "textarea", true], ["image", "Campaign image URL", "image", false], ["goalAmount", "Goal (INR)", "number", false], ["startDate", "Start date", "date", true], ["endDate", "End date", "date", true], ["status", "Status", "select", true]],
    columns: [["title", "Campaign"], ["startDate", "Starts"], ["endDate", "Ends"], ["status", "Status"]],
    defaults: { title: "", description: "", image: "", goalAmount: "", startDate: "", endDate: "", status: "draft" }, statusKey: "status", statuses: ["draft", "active", "completed"],
  },
  contacts: {
    title: "Contact Management", description: "Manage approved organization contact details shown across the website.", repository: contactRepository,
    fields: [["fullName", "Display name", "text", true], ["email", "Public email", "email", true], ["phone", "Public phone", "tel", false], ["address", "Address", "text", false], ["instagramUrl", "Instagram URL", "url", false], ["facebookUrl", "Facebook URL", "url", false], ["linkedinUrl", "LinkedIn URL", "url", false], ["message", "Notes", "textarea", false], ["contactStatus", "Status", "select", true]],
    columns: [["fullName", "Contact"], ["email", "Email"], ["phone", "Phone"], ["contactStatus", "Status"]],
    defaults: { fullName: "", email: "", phone: "", address: "", instagramUrl: "", facebookUrl: "", linkedinUrl: "", message: "", contactStatus: "active" }, statusKey: "contactStatus", statuses: ["active", "inactive"],
  },
  enquiries: {
    title: "Enquiries", description: "Track incoming installation and partnership enquiries.", repository: enquiryRepository,
    fields: [["fullName", "Full name", "text", true], ["email", "Email", "email", true], ["phone", "Phone", "tel", false], ["location", "Location", "text", false], ["plantType", "Plant type", "text", false], ["message", "Message", "textarea", true], ["enquiryStatus", "Status", "select", true]],
    editFields: [["enquiryStatus", "Status", "select", true], ["assignedStaff", "Assigned staff member", "text", false], ["internalNotes", "Internal follow-up notes", "textarea", false]],
    columns: [["fullName", "Name"], ["location", "Location"], ["plantType", "Interest"], ["enquiryStatus", "Status"], ["createdAt", "Received"]],
    defaults: { fullName: "", email: "", phone: "", location: "", plantType: "", message: "", enquiryStatus: "new", assignedStaff: "", internalNotes: "" }, statusKey: "enquiryStatus", statuses: ["new", "in_progress", "resolved"], noCreate: true,
  },
  impact: {
    title: "Impact Management", description: "Edit public impact counters and chart data using shared repositories.", repository: impactRepository,
    fields: [["title", "Counter title", "text", true], ["value", "Value", "text", true], ["suffix", "Suffix", "text", false], ["description", "Description", "text", false], ["icon", "Approved icon", "select", true], ["displayOrder", "Display order", "number", true], ["isActive", "Visible on website", "checkbox", false]],
    columns: [["title", "Counter"], ["value", "Value"], ["suffix", "Suffix"], ["displayOrder", "Order"], ["isActive", "Visible"]],
    defaults: { title: "", value: "", suffix: "+", description: "", icon: "Flame", displayOrder: 1, isActive: true }, noStatus: true,
  },
  media: {
    title: "Image Management", description: "Approve images for the public gallery. Selected local files are temporary previews only.", repository: mediaRepository,
    fields: [["title", "Image caption", "text", true], ["category", "Category", "text", true], ["location", "Location", "text", false], ["image", "Image URL", "image", true], ["publishedAt", "Date", "text", false], ["status", "Approval status", "select", true]],
    columns: [["title", "Image"], ["category", "Category"], ["location", "Location"], ["status", "Approval"]],
    defaults: { title: "", category: "Biogas installations", location: "", image: "", publishedAt: "", status: "approved" }, statusKey: "status", statuses: ["approved", "pending", "rejected"], imageField: true,
  },
  stories: {
    title: "Stories Management", description: "Write and publish stories from the field.", repository: storyRepository,
    fields: [["title", "Story title", "text", true], ["description", "Story", "textarea", true], ["image", "Cover image URL", "image", false], ["location", "Location", "text", false], ["publishedAt", "Publication date", "date", false], ["status", "Status", "select", true]],
    columns: [["title", "Story"], ["location", "Location"], ["publishedAt", "Date"], ["status", "Status"]],
    defaults: { title: "", description: "", image: "", location: "", publishedAt: "", status: "draft" }, statusKey: "status", statuses: ["draft", "published"],
  },
  users: {
    title: "User Management", description: "Demo role and permission assignments. Server authorization is not implemented in Phase 1.", repository: userRepository,
    fields: [["fullName", "Full name", "text", true], ["email", "Email", "email", true], ["role", "Role", "select", true], ["appearanceManage", "Grant Website Appearance access", "checkbox", false], ["videoManage", "Grant Video Management access", "checkbox", false], ["initiativeManage", "Grant Initiative Management access", "checkbox", false], ["status", "Status", "select", true]],
    columns: [["fullName", "User"], ["email", "Email"], ["role", "Role"], ["status", "Status"]],
    defaults: { fullName: "", email: "", role: "Staff", status: "active", initiativeManage: false }, statusKey: "status", statuses: ["active", "inactive"],
  },
  activities: {
    title: "Recent Activities", description: "Recent demonstration activity records.", repository: activityRepository,
    fields: [], columns: [["action", "Activity"], ["subject", "Record"], ["actor", "By"], ["createdAt", "Date"]], defaults: {}, readOnly: true, noCreate: true,
  },
  settings: {
    title: "Settings", description: "Edit shared organization profile information for future public-site integration.", repository: settingsRepository,
    fields: [["title", "Organization name", "text", true], ["email", "Public email", "email", true], ["phone", "Public phone", "tel", false], ["address", "Address", "text", false]],
    columns: [["title", "Organization"], ["email", "Email"], ["phone", "Phone"], ["address", "Address"]],
    defaults: { title: "Organization contact", email: "", phone: "", address: "", status: "active" }, noDelete: true,
  },
};

const labelFor = (key) => key.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());
const formatValue = (value) => {
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (!value) return "—";
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)) return new Date(value).toLocaleDateString();
  return String(value);
};

function Field({ field, value, onChange, error, disabled = false }) {
  const [key, label, type, required] = field;
  const inputValue = value ?? "";
  const props = { id: key, name: key, required, disabled, value: inputValue, onChange: (event) => onChange(key, type === "checkbox" ? event.target.checked : event.target.value), "aria-invalid": Boolean(error), "aria-describedby": error ? `${key}-error` : undefined };
  return <label className={`admin-field${error ? " has-error" : ""}`} htmlFor={key}>{label}{required && <span> *</span>}
    {type === "textarea" ? <textarea {...props} rows="4" /> : type === "select" ? <select {...props}>
      {(key === "category" ? ["Household Biogas", "Community Biogas", "Institutional Biogas", "Agriculture", "Environment", "Women empowerment", "Youth development"] : key === "role" ? ["Super Admin", "Admin", "Staff"] : key === "donationType" ? ["one-time", "monthly"] : key === "icon" ? ["Flame", "House", "Users", "Recycle", "MapPin"] : key.toLowerCase().includes("status") || key === "status" ? (["pending", "approved", "declined", "draft", "published", "completed", "active", "inactive", "new", "in_progress", "resolved", "paid", "failed", "refunded", "rejected"].includes(inputValue) ? [...new Set([inputValue, "pending", "approved", "declined", "draft", "published", "completed", "active", "inactive", "new", "in_progress", "resolved", "paid", "failed", "refunded", "rejected"])] : ["draft", "published", "active", "inactive"]) : [inputValue || "Select"] ).map((option) => <option key={option} value={option}>{option.replaceAll("_", " ")}</option>)}
    </select> : type === "checkbox" ? <input {...props} type="checkbox" checked={Boolean(value)} value={undefined} /> : <input {...props} type={type === "image" ? "url" : type} placeholder={type === "image" ? "https://… or /image.jpg" : ""} />}
    {error && <small id={`${key}-error`} role="alert">{error}</small>}
  </label>;
}

function Dashboard({ navigate }) {
  const projects = useRepository(projectRepository);
  const donations = useRepository(donationRepository);
  const volunteers = useRepository(volunteerRepository);
  const enquiries = useRepository(enquiryRepository);
  const activities = useRepository(activityRepository);
  const totalPaid = donations.records.filter((row) => row.paymentStatus === "paid").reduce((sum, row) => sum + Number(row.amount || 0), 0);
  const cards = [
    { label: "Active projects", value: projects.records.filter((row) => row.status === "published").length, icon: FolderKanban, tone: "green", link: "projects" },
    { label: "Total donations", value: `₹${totalPaid.toLocaleString("en-IN")}`, icon: CreditCard, tone: "gold", link: "donations" },
    { label: "New enquiries", value: enquiries.records.filter((row) => row.enquiryStatus === "new").length, icon: MessageSquare, tone: "blue", link: "enquiries" },
    { label: "Volunteer applications", value: volunteers.records.length, icon: HandHeart, tone: "purple", link: "volunteers" },
  ];
  return <div className="admin-content">
    <div className="admin-page-heading"><div><span className="admin-eyebrow">OVERVIEW</span><h1>Good morning</h1><p>Here’s what’s happening across your programs today.</p></div><div className="admin-date"><span>DEMO WORKSPACE</span><strong>{new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</strong></div></div>
    <div className="admin-demo-banner"><Sparkles size={17} /><span><b>Frontend demo mode</b> — changes persist in this browser only; they are not saved to a server.</span></div>
    <div className="admin-stat-grid">{cards.map(({ label, value, icon: Icon, tone, link }) => <button className="admin-stat-card" key={label} onClick={() => navigate(link)}><span className={`admin-stat-icon ${tone}`}><Icon size={20} /></span><span className="admin-stat-label">{label}</span><strong>{projects.loading || donations.loading || volunteers.loading || enquiries.loading ? "…" : value}</strong><span className="admin-stat-link">View records <ExternalLink size={13} /></span></button>)}</div>
    <div className="admin-dashboard-grid">
      <section className="admin-panel admin-chart-panel"><div className="admin-panel-heading"><div><h2>Program activity</h2><p>Illustrative monthly activity overview</p></div><span className="admin-tag">DEMO DATA</span></div><div className="admin-chart"><div className="admin-chart-y"><span>100</span><span>75</span><span>50</span><span>25</span><span>0</span></div><div className="admin-chart-area"><div className="admin-chart-grid"><i /><i /><i /><i /><i /></div><svg viewBox="0 0 640 200" preserveAspectRatio="none" aria-label="Illustrative activity chart"><defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#2b7550" stopOpacity=".2" /><stop offset="1" stopColor="#2b7550" stopOpacity="0" /></linearGradient></defs><path d="M0 158 C50 144 72 140 110 126 S170 148 220 108 S285 121 330 82 S385 103 435 70 S500 86 540 48 S590 62 640 25 L640 200 L0 200Z" fill="url(#chartFill)" /><path d="M0 158 C50 144 72 140 110 126 S170 148 220 108 S285 121 330 82 S385 103 435 70 S500 86 540 48 S590 62 640 25" fill="none" stroke="#2b7550" strokeWidth="3" vectorEffect="non-scaling-stroke" /></svg><div className="admin-chart-x"><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span></div></div></div><div className="admin-chart-legend"><span><i /> Community programs</span><small>Illustrative mock data</small></div></section>
      <section className="admin-panel"><div className="admin-panel-heading"><div><h2>Recent projects</h2><p>Latest installation work</p></div><button className="admin-link-button" onClick={() => navigate("projects")}>View all <ArrowDownToLine size={14} /></button></div><div className="admin-compact-list">{projects.records.slice(0, 4).map((row) => <div className="admin-compact-row" key={row.id}><div className="admin-list-avatar"><House size={17} /></div><div className="admin-list-copy"><b>{row.title}</b><span>{row.location}</span></div><span className={`admin-status status-${row.status}`}>{row.status}</span></div>)}</div></section>
      <section className="admin-panel"><div className="admin-panel-heading"><div><h2>Recent donations</h2><p>Sample payment records</p></div><button className="admin-link-button" onClick={() => navigate("donations")}>View all <ArrowDownToLine size={14} /></button></div><div className="admin-compact-list">{donations.records.slice(0, 4).map((row) => <div className="admin-compact-row" key={row.id}><div className="admin-list-avatar gold"><CreditCard size={17} /></div><div className="admin-list-copy"><b>{row.donorName}</b><span>{row.campaign}</span></div><strong>₹{Number(row.amount).toLocaleString("en-IN")}</strong></div>)}</div></section>
      <section className="admin-panel"><div className="admin-panel-heading"><div><h2>Pending enquiries</h2><p>Items waiting for follow-up</p></div><button className="admin-link-button" onClick={() => navigate("enquiries")}>View all <ArrowDownToLine size={14} /></button></div><div className="admin-compact-list">{enquiries.records.filter((row) => row.enquiryStatus !== "resolved").slice(0, 4).map((row) => <div className="admin-compact-row" key={row.id}><div className="admin-list-avatar blue"><MessageSquare size={17} /></div><div className="admin-list-copy"><b>{row.fullName}</b><span>{row.location}</span></div><span className={`admin-status status-${row.enquiryStatus}`}>{row.enquiryStatus.replace("_", " ")}</span></div>)}</div></section>
      <section className="admin-panel"><div className="admin-panel-heading"><div><h2>Administrative activity</h2><p>Latest workspace updates</p></div><button className="admin-link-button" onClick={() => navigate("activities")}>View all <ArrowDownToLine size={14} /></button></div><div className="admin-compact-list">{activities.records.slice(0, 4).map((row) => <div className="admin-compact-row" key={row.id}><div className="admin-list-avatar purple"><Activity size={17} /></div><div className="admin-list-copy"><b>{row.action}</b><span>{row.subject} · {row.actor}</span></div><small>{new Date(row.createdAt).toLocaleDateString()}</small></div>)}</div></section>
      <section className="admin-panel"><div className="admin-panel-heading"><div><h2>Volunteer applications</h2><p>Review and respond to applicants</p></div><button className="admin-link-button" onClick={() => navigate("volunteers")}>View all <ArrowDownToLine size={14} /></button></div><div className="admin-compact-list">{volunteers.records.slice(0, 4).map((row) => <div className="admin-compact-row" key={row.id}><div className="admin-list-avatar green"><HandHeart size={17} /></div><div className="admin-list-copy"><b>{row.fullName}</b><span>{row.areaOfInterest}</span></div><span className={`admin-status status-${row.applicationStatus}`}>{row.applicationStatus}</span></div>)}</div></section>
    </div>
  </div>;
}

function ImpactChartEditor({ user }) {
  const charts = useRepository(impactChartRepository);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const chart = charts.records[0];

  const save = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const readValues = (key, length) => Array.from({ length }, (_, index) => {
      const rawValue = formData.get(`${key}-${index}`);
      if (rawValue === null || String(rawValue).trim() === "") throw new Error("Complete every chart value before saving.");
      const value = Number(rawValue);
      if (!Number.isInteger(value) || value < 0 || value > 100) throw new Error("Enter whole-number chart values between 0 and 100.");
      return value;
    });
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const updated = await impactChartRepository.update(chart.id, {
        annualInstallations: readValues("annual", chart.annualYears.length),
        growthValues: readValues("growth", chart.growthYears.length),
      });
      if (serviceMode === "mock") {
        await activityRepository.create({ action: "Impact chart data updated", actor: user.fullName, subject: "Public impact graphs" });
      }
      await charts.refresh();
      setNotice("Chart data saved. The public website preview now uses these values.");
      return updated;
    } catch (saveError) {
      setError(saveError.message || "Unable to save chart data.");
    } finally {
      setBusy(false);
    }
  };

  return <section className="admin-panel admin-impact-chart-editor">
    <div className="admin-panel-heading"><div><h2>Public impact charts</h2><p>Demo values are percentages from 0 to 100 and update the public graphs.</p></div></div>
    {charts.loading ? <div className="admin-state"><span className="admin-spinner" /> Loading chart data…</div> : !chart ? <div className="admin-state">No impact chart configuration is available.</div> : <form key={chart.updatedAt} onSubmit={save} noValidate>
      {notice && <div className="admin-alert admin-alert--success" role="status">{notice}</div>}
      {error && <div className="admin-alert admin-alert--error" role="alert">{error}</div>}
      <h3>Annual installations</h3>
      <div className="admin-form-grid admin-impact-chart-grid">{chart.annualYears.map((year, index) => <label className="admin-field" key={year} htmlFor={`annual-${index}`}>{year}<input id={`annual-${index}`} name={`annual-${index}`} type="number" min="0" max="100" step="1" defaultValue={chart.annualInstallations[index]} required /></label>)}</div>
      <h3>Growth over time</h3>
      <div className="admin-form-grid admin-impact-chart-grid">{chart.growthYears.map((year, index) => <label className="admin-field" key={year} htmlFor={`growth-${index}`}>{year}<input id={`growth-${index}`} name={`growth-${index}`} type="number" min="0" max="100" step="1" defaultValue={chart.growthValues[index]} required /></label>)}</div>
      <div className="admin-modal-actions"><button className="admin-primary" disabled={busy}>{busy ? "Saving…" : "Save chart changes"}</button></div>
    </form>}
  </section>;
}

function ResourcePage({ moduleKey, user }) {
  const config = configs[moduleKey];
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(config.defaults);
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const pageSize = 7;
  const result = useRepository(config.repository, { search: query, status: statusFilter, page, pageSize });
  const allRecords = useRepository(config.repository);
  const canAccessRecord = (record) => user.role !== "Staff"
    || record.assignedStaff === user.id
    || record.assignedStaff === user.fullName;
  const scopedRecords = user.role === "Staff"
    ? allRecords.records.filter((record) => {
      const searchableText = Object.values(record).flat().join(" ").toLowerCase();
      const hasStatus = !statusFilter || [
        record.status, record.applicationStatus, record.paymentStatus, record.enquiryStatus, record.contactStatus,
      ].includes(statusFilter);
      return canAccessRecord(record) && (!query || searchableText.includes(query.toLowerCase())) && hasStatus;
    })
    : null;
  const rows = user.role === "Staff"
    ? scopedRecords.slice((page - 1) * pageSize, page * pageSize)
    : result.records;
  const total = user.role === "Staff" ? scopedRecords.length : result.total ?? allRecords.records.length;
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const formFields = modal?.type === "edit" ? config.editFields || config.fields : config.fields;

  const can = (action) => hasPermission(user, `${moduleKey}.${action}`);
  const recordActivity = (verb, record) => serviceMode === "mock"
    ? activityRepository.create({
      action: `${config.title} ${verb}`,
      actor: user.fullName,
      subject: record?.title || record?.fullName || record?.donorName || record?.id || config.title,
    })
    : Promise.resolve();
  const openForm = async (record) => {
    setErrors({}); setNotice(""); setError(""); setPreviewUrl("");
    if (!record) {
      setForm({ ...config.defaults });
      setModal({ type: "create" });
      return;
    }
    setBusy(true);
    try {
      const currentRecord = await config.repository.getById(record.id);
      if (!canAccessRecord(currentRecord)) throw new Error("You can only update records assigned to you.");
      const coverImage = currentRecord.images?.[0];
      setForm({
        ...config.defaults,
        ...currentRecord,
        image: currentRecord.image || (typeof coverImage === "string" ? coverImage : coverImage?.url) || "",
        appearanceManage: currentRecord.permissions?.includes("appearance.manage"),
        videoManage: currentRecord.permissions?.includes("video.view"),
        initiativeManage: currentRecord.permissions?.includes("*")
          || currentRecord.permissions?.includes("initiatives.view")
          || permissionMatrix[currentRecord.role]?.includes("initiatives.view"),
      });
      setModal({ type: "edit", record: currentRecord });
    } catch (openError) {
      setError(openError.message || "Unable to load this record for editing.");
    } finally {
      setBusy(false);
    }
  };
  const setField = (key, value) => { setForm((current) => ({ ...current, [key]: value })); setErrors((current) => ({ ...current, [key]: "" })); };
  const validate = () => {
    const next = {};
    for (const [key, label, type, required] of formFields) {
      if (required && (form[key] === "" || form[key] === null || form[key] === undefined)) next[key] = `${label} is required.`;
      if (type === "email" && form[key] && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form[key])) next[key] = "Enter a valid email address.";
      if (type === "number" && form[key] !== "" && (!Number.isFinite(Number(form[key])) || Number(form[key]) < 0)) next[key] = "Enter a valid non-negative number.";
      if (moduleKey === "impact" && key === "value" && form[key] && !/^\d+(\.\d+)?$/.test(String(form[key]))) next[key] = "Enter a numeric counter value.";
      if ((type === "url" || type === "image") && form[key]) {
        const rootRelativeImage = type === "image" && /^\/(?!\/)/.test(form[key]);
        if (!rootRelativeImage) {
          try {
            const parsed = new URL(form[key]);
            const temporaryImage = type === "image" && parsed.protocol === "blob:";
            if (!temporaryImage && !["http:", "https:"].includes(parsed.protocol)) next[key] = "Enter an HTTP or HTTPS URL.";
          } catch { next[key] = "Enter a valid URL."; }
        }
      }
    }
    setErrors(next); return Object.keys(next).length === 0;
  };
  const save = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    setBusy(true); setError(""); setNotice("");
    try {
      let payload = Object.fromEntries(formFields.map(([key]) => [key, form[key]]));
      if (modal.type === "edit" && !canAccessRecord(modal.record)) throw new Error("You can only update records assigned to you.");
      if (user.role === "Staff") delete payload.assignedStaff;
      if (payload.amount !== undefined && payload.amount !== "") payload.amount = Number(payload.amount);
      if (payload.goalAmount !== undefined && payload.goalAmount !== "") payload.goalAmount = Number(payload.goalAmount);
      if (payload.displayOrder !== undefined) payload.displayOrder = Number(payload.displayOrder);
      if (moduleKey === "users") {
        if (user.role === "Super Admin") {
          const { appearanceManage, videoManage, initiativeManage, ...userRecord } = payload;
          payload = {
            ...userRecord,
            permissions: [...new Set([
              ...(permissionMatrix[payload.role] || []),
              ...(appearanceManage && payload.role !== "Super Admin" ? ["appearance.manage"] : []),
              ...(videoManage && payload.role !== "Super Admin" ? ["video.view", "video.create", "video.edit", "video.delete", "video.publish"] : []),
              ...(initiativeManage && payload.role !== "Super Admin" ? ["initiatives.view", "initiatives.create", "initiatives.edit", "initiatives.delete", "initiatives.publish"] : []),
            ])],
          };
        } else {
          payload.role = modal.type === "edit" ? modal.record.role : "Staff";
          payload.permissions = modal.type === "edit"
            ? modal.record.permissions || permissionMatrix[modal.record.role] || []
            : permissionMatrix.Staff;
        }
      }
      if (moduleKey === "projects") {
        payload.images = payload.image ? [payload.image] : [];
        delete payload.image;
      }
      if (modal.type === "edit") {
        const updated = await config.repository.update(modal.record.id, payload);
        await recordActivity("updated", updated);
      } else {
        const created = await config.repository.create(payload);
        await recordActivity("created", created);
      }
      await result.refresh();
      setNotice(modal.type === "edit" ? "Changes saved to this existing demo record." : "Demo record created.");
      setModal(null);
    } catch (saveError) { setError(saveError.message || "Unable to save this record."); }
    finally { setBusy(false); }
  };
  const remove = async (record) => {
    if (!can("delete") || !window.confirm(`Delete "${record.title || record.fullName || record.donorName || record.id}" from the demo data?`)) return;
    setError(""); setNotice("");
    try { await config.repository.delete(record.id); await recordActivity("deleted", record); await result.refresh(); setNotice("Demo record deleted."); }
    catch (deleteError) { setError(deleteError.message || "Unable to delete this record."); }
  };
  const updateStatus = async (record, value) => {
    if (!canAccessRecord(record)) {
      setError("You can only update records assigned to you.");
      return;
    }
    setError(""); setNotice("");
    try { await config.repository.update(record.id, { [config.statusKey]: value }); await recordActivity("status changed", { ...record, [config.statusKey]: value }); await result.refresh(); setNotice("Status updated in shared mock data."); }
    catch (statusError) { setError(statusError.message || "Unable to update status."); }
  };
  const uploadPreview = async (file) => {
    try {
      const preview = await mediaService.createPreview(file);
      setPreviewUrl(preview.url);
      setField("image", preview.url);
      setNotice("Temporary preview selected. It will not be stored after this session.");
    } catch (previewError) { setError(previewError.message); }
  };
  const exportRows = () => {
    const csv = [config.columns.map(([, label]) => label), ...rows.map((row) => config.columns.map(([key]) => formatValue(row[key])))].map((line) => line.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(",")).join("\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    link.download = `${moduleKey}-demo-export.csv`;
    link.click(); URL.revokeObjectURL(link.href);
  };

  const actions = (record) => <div className="admin-row-actions"><button title="View details" aria-label="View details" onClick={() => setModal({ type: "view", record })}><ExternalLink size={16} /></button>{can("edit") && !config.readOnly && <button className="admin-update-button" title="Update record" onClick={() => openForm(record)}><Pencil size={16} /> Update</button>}{can("delete") && !config.noDelete && <button title="Delete" aria-label="Delete" className="danger" onClick={() => remove(record)}><Trash2 size={16} /></button>}{config.statuses && can("edit") && !config.readOnly && <select aria-label={`Change status for ${record.title || record.fullName || record.donorName}`} value={record[config.statusKey]} onChange={(event) => updateStatus(record, event.target.value)}>{config.statuses.map((status) => <option key={status} value={status}>{status.replaceAll("_", " ")}</option>)}</select>}</div>;
  return <div className="admin-content">
    <div className="admin-page-heading"><div><span className="admin-eyebrow">{moduleKey.toUpperCase()} WORKSPACE</span><h1>{config.title}</h1><p>{config.description}</p></div>{can("create") && !config.noCreate && !config.readOnly && <button className="admin-primary" onClick={() => openForm(null)}><Plus size={17} /> Create new</button>}</div>
    <div className="admin-demo-banner"><Sparkles size={17} /><span><b>Mock data demo</b> — changes are stored in this browser only. {user.role === "Staff" ? "Only records assigned to you are shown." : "API integration is not configured."}</span></div>
    {moduleKey === "impact" && can("edit") && <ImpactChartEditor user={user} />}
    {notice && <div className="admin-alert admin-alert--success"><Check size={17} />{notice}<button onClick={() => setNotice("")}><X size={15} /></button></div>}
    {(error || result.error) && <div className="admin-alert admin-alert--error" role="alert">{error || result.error}<button onClick={() => { setError(""); result.refresh(); }}><X size={15} /></button></div>}
    <section className="admin-panel admin-table-panel">
      <div className="admin-table-toolbar"><div className="admin-search"><Search size={17} /><input value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder={`Search ${config.title.toLowerCase()}…`} aria-label={`Search ${config.title}`} /></div><div className="admin-toolbar-actions">{config.statuses && <select value={statusFilter} onChange={(event) => { setStatusFilter(event.target.value); setPage(1); }} aria-label="Filter by status"><option value="">All statuses</option>{config.statuses.map((status) => <option key={status} value={status}>{status.replaceAll("_", " ")}</option>)}</select>}{moduleKey === "donations" && can("export") && <button className="admin-secondary" onClick={exportRows}><ArrowDownToLine size={15} /> Export CSV</button>}</div></div>
      {result.loading ? <div className="admin-state"><span className="admin-spinner" /> Loading {config.title.toLowerCase()}…</div> : rows.length === 0 ? <div className="admin-state"><div className="admin-empty-icon"><ClipboardList size={23} /></div><b>No records found</b><span>Try changing your search or filters, or create a record.</span>{can("create") && !config.noCreate && <button className="admin-secondary" onClick={() => openForm(null)}><Plus size={15} /> Add the first record</button>}</div> : <div className="admin-table-wrap"><table className="admin-table"><thead><tr>{config.columns.map(([key, label]) => <th key={key}>{label}</th>)}<th className="admin-actions-heading">Actions</th></tr></thead><tbody>{rows.map((record) => <tr key={record.id}>{config.columns.map(([key]) => <td key={key}>{key === "image" || key === "images" ? <img className="admin-thumb" src={record[key]?.[0] || record[key]} alt="" /> : key.toLowerCase().includes("status") || key === "status" ? <span className={`admin-status status-${record[key]}`}>{formatValue(record[key]).replaceAll("_", " ")}</span> : key === "isActive" ? <span className={`admin-status status-${record[key] ? "active" : "inactive"}`}>{record[key] ? "Visible" : "Hidden"}</span> : key === "amount" ? `₹${Number(record[key] || 0).toLocaleString("en-IN")}` : key === "createdAt" || key === "publishedAt" ? formatValue(record[key]) : formatValue(record[key])}</td>)}<td>{actions(record)}</td></tr>)}</tbody></table></div>}
      {!result.loading && rows.length > 0 && <div className="admin-pagination"><span>Showing {Math.min((page - 1) * pageSize + 1, total)}–{Math.min(page * pageSize, total)} of {total}</span><div><button disabled={page <= 1} onClick={() => setPage(page - 1)} aria-label="Previous page"><ChevronLeft size={17} /></button><span>Page {page} of {pages}</span><button disabled={page >= pages} onClick={() => setPage(page + 1)} aria-label="Next page"><ChevronRight size={17} /></button></div></div>}
    </section>
    {modal && <div className="admin-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setModal(null); }}><section className="admin-modal" role="dialog" aria-modal="true" aria-labelledby="admin-modal-title"><header><div><span className="admin-eyebrow">{modal.type === "view" ? "RECORD DETAILS" : "DEMO DATA ENTRY"}</span><h2 id="admin-modal-title">{modal.type === "view" ? "Record details" : modal.type === "edit" ? "Update record" : "Create record"}</h2></div><button onClick={() => setModal(null)} aria-label="Close"><X size={19} /></button></header>{modal.type === "view" ? <div className="admin-detail-list">{config.columns.map(([key, label]) => <div key={key}><span>{label}</span><strong>{formatValue(modal.record[key])}</strong></div>)}{Object.entries(modal.record).filter(([key]) => !config.columns.some(([column]) => column === key) && !["updatedAt"].includes(key)).map(([key, value]) => <div key={key}><span>{labelFor(key)}</span><strong>{formatValue(Array.isArray(value) ? value.join(", ") : value)}</strong></div>)}</div> : <form onSubmit={save} noValidate>{error && <div className="admin-alert admin-alert--error" role="alert">{error}</div>}{notice && <div className="admin-alert admin-alert--success">{notice}</div>}<div className="admin-form-grid">{formFields.map((field) => <div className={field[2] === "textarea" || field[0] === "description" || field[0] === "internalNotes" ? "span-2" : ""} key={field[0]}><Field field={field} value={form[field[0]]} onChange={setField} error={errors[field[0]]} disabled={(moduleKey === "users" && user.role !== "Super Admin" && ["role", "appearanceManage", "initiativeManage"].includes(field[0])) || (user.role === "Staff" && field[0] === "assignedStaff")} />{field[2] === "image" && <div className="admin-file-input"><label><ImagePlus size={16} /> Choose image<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={(event) => uploadPreview(event.target.files?.[0])} /></label><small>JPG, PNG, WEBP or GIF · up to 5 MB</small></div>}</div>)}</div>{(form.image || previewUrl) && <div className="admin-image-preview"><img src={form.image} alt="Selected preview" /><span>{previewUrl ? "Temporary browser preview" : "Image preview"}</span><button type="button" onClick={() => { setPreviewUrl(""); setField("image", ""); }}>Remove</button></div>}<div className="admin-modal-actions"><button type="button" className="admin-secondary" onClick={() => setModal(null)}>Cancel</button><button className="admin-primary" disabled={busy}>{busy ? "Saving…" : modal.type === "edit" ? "Save Changes" : "Save demo record"}</button></div></form>}</section></div>}
  </div>;
}

export default function AdminPanel({ onPublicHome }) {
  const [route, setRoute] = useState(() => window.location.pathname.replace(/\/+$/, "") || "/admin/login");
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  useEffect(() => {
    const pop = () => setRoute(window.location.pathname.replace(/\/+$/, "") || "/admin/login");
    window.addEventListener("popstate", pop);
    authService.getCurrentUser().then(setUser).catch((error) => console.error("Could not restore demo session.", error)).finally(() => setAuthLoading(false));
    const unsubscribe = authService.subscribe(setUser);
    return () => { window.removeEventListener("popstate", pop); unsubscribe(); };
  }, []);
  const navigate = (path) => {
    if (window.location.pathname !== path) window.history.pushState({}, "", path);
    setRoute(path);
  };
  const logout = async () => { await authService.logout(); navigate("/admin/login"); };
  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!authLoading && route !== "/admin/login" && !user) {
        window.history.replaceState({}, "", "/admin/login");
        setRoute("/admin/login");
      }
      if (!authLoading && route === "/admin/login" && user) {
        window.history.replaceState({}, "", "/admin/dashboard");
        setRoute("/admin/dashboard");
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, [authLoading, route, user]);
  if (authLoading) return <div className="admin-auth-loading"><span className="admin-spinner" />Loading admin workspace…</div>;
  if (!user || route === "/admin/login") return <AdminLogin onLogin={() => navigate("/admin/dashboard")} />;
  const routeKey = route.split("/")[2] || "dashboard";
  const currentModule = modules.some((item) => item.key === routeKey) ? routeKey : "dashboard";
  const modulePermission = modules.find((item) => item.key === currentModule)?.permission;
  if (currentModule !== "dashboard" && !hasPermission(user, modulePermission || `${currentModule}.view`)) {
    return <AdminLayout modules={modules} route="dashboard" onNavigate={navigate} onLogout={logout} onPublicHome={onPublicHome} user={user}><div className="admin-content"><div className="admin-state"><Shield size={30} /><b>Access not included in this demo role</b><span>Your current role does not have permission to view this module.</span><button className="admin-secondary" onClick={() => navigate("/admin/dashboard")}>Return to dashboard</button></div></div></AdminLayout>;
  }
  return <AdminLayout modules={modules} route={currentModule} onNavigate={navigate} onLogout={logout} onPublicHome={onPublicHome} user={user}>{currentModule === "dashboard" ? <Dashboard navigate={(key) => navigate(`/admin/${key}`)} /> : currentModule === "appearance" ? <AppearanceManagement user={user} canEdit={hasPermission(user, "appearance.manage")} /> : currentModule === "videos" ? <VideoManagement user={user} /> : <ResourcePage key={currentModule} moduleKey={currentModule} user={user} />}</AdminLayout>;
}
