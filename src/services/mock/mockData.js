import { initialDonations, initialGalleryItems, initialProgrammes } from "../../DATA/initialData.js";

const now = new Date().toISOString();
const dated = (record) => ({ createdAt: now, updatedAt: now, ...record });

export const mockProjects = [
  { id: "project-1", title: "Household Biogas Plant", description: "A compact family digester designed for clean cooking, reduced smoke exposure, and nutrient-rich slurry recovery.", location: "Belagavi, Karnataka", installationDate: "2025-06-15", plantCapacity: "2 m³", category: "Household Biogas", images: [], status: "published", ...dated({}) },
  { id: "project-2", title: "Community Cooking Unit", description: "Shared biogas infrastructure serving multiple families.", location: "Kolhapur, Maharashtra", installationDate: "2024-09-10", plantCapacity: "8 m³", category: "Community Biogas", images: [], status: "published", ...dated({}) },
  { id: "project-3", title: "School Energy Initiative", description: "Institutional biogas support for a rural school kitchen.", location: "Sangli, Maharashtra", installationDate: "2026-02-20", plantCapacity: "12 m³", category: "Institutional Biogas", images: [], status: "draft", ...dated({}) },
  { id: "project-4", title: "Women SHG Digester", description: "A women-led household system supporting cleaner cooking and livelihoods.", location: "Satara, Maharashtra", installationDate: "2025-03-08", plantCapacity: "4 m³", category: "Household Biogas", images: [], status: "published", ...dated({}) },
];

export const mockVolunteers = [
  dated({ id: "volunteer-1", fullName: "Asha Patil", email: "asha.patil@example.org", phone: "+91 98765 43210", areaOfInterest: "Community training", experience: "3 years in rural outreach", applicationStatus: "pending", assignedStaff: "Demo Staff" }),
  dated({ id: "volunteer-2", fullName: "Rohan Kulkarni", email: "rohan.k@example.org", phone: "+91 97654 32109", areaOfInterest: "Field implementation", experience: "Environmental science student", applicationStatus: "approved", assignedStaff: "Demo Admin" }),
];

export const mockDonations = initialDonations.map((item) => dated({
  id: item.id,
  donorName: item.donorName,
  email: item.email,
  phone: item.phone,
  amount: item.amountPaise / 100,
  paymentMethod: "Online (demo record)",
  transactionReference: item.orderId,
  paymentStatus: item.status.toLowerCase(),
  donationType: "one-time",
  campaign: item.campaign,
  createdAt: `${item.date}T12:00:00.000Z`,
}));

export const mockCampaigns = [
  dated({ id: "campaign-1", title: "Biogas for Clean Energy", description: "Expand household biogas access in rural communities.", image: initialProgrammes[0].image, goalAmount: 500000, startDate: "2026-01-01", endDate: "2026-12-31", status: "active" }),
  dated({ id: "campaign-2", title: "Women-led Rural Livelihoods", description: "Support skills and self-help groups.", image: initialProgrammes[3].image, goalAmount: 250000, startDate: "2026-02-01", endDate: "2026-11-30", status: "draft" }),
];

export const mockEnquiries = [
  dated({ id: "enquiry-1", fullName: "Meera Joshi", email: "meera.j@example.org", phone: "+91 99887 76655", location: "Dharwad, Karnataka", plantType: "Household 2 m³", message: "We would like to learn about installation requirements.", enquiryStatus: "new", assignedStaff: "Demo Staff", internalNotes: "" }),
  dated({ id: "enquiry-2", fullName: "Gram Panchayat Kavathe", email: "office@example.org", phone: "+91 91234 56780", location: "Sangli, Maharashtra", plantType: "Community unit", message: "Requesting a feasibility discussion for our village.", enquiryStatus: "in_progress", assignedStaff: "Demo Admin", internalNotes: "" }),
];

export const mockImpact = [
  dated({ id: "impact-plants", title: "Biogas plants installed", value: "2300", suffix: "+", description: "Operational units across rural communities", icon: "Flame", displayOrder: 1, isActive: true }),
  dated({ id: "impact-families", title: "Families benefited", value: "12500", suffix: "+", description: "Households using cleaner cooking energy", icon: "House", displayOrder: 2, isActive: true }),
  dated({ id: "impact-communities", title: "Communities reached", value: "180", suffix: "+", description: "Villages engaged in awareness and activation", icon: "Users", displayOrder: 3, isActive: true }),
  dated({ id: "impact-waste", title: "Waste processed", value: "9800", suffix: " t", description: "Organic waste safely managed each year", icon: "Recycle", displayOrder: 4, isActive: true }),
  dated({ id: "impact-districts", title: "Districts covered", value: "10", suffix: "+", description: "Across Maharashtra and Karnataka", icon: "MapPin", displayOrder: 5, isActive: true }),
  dated({ id: "impact-homes", title: "Smoke-free homes", value: "10000", suffix: "+", description: "Using clean biogas stoves", icon: "House", displayOrder: 6, isActive: true }),
  dated({ id: "impact-people", title: "People benefited", value: "50000", suffix: "+", description: "Healthier household members", icon: "Users", displayOrder: 7, isActive: true }),
];

export const mockImpactCharts = [
  dated({
    id: "impact-public-charts",
    annualYears: ["2021", "2022", "2023", "2024", "2025"],
    annualInstallations: [42, 58, 76, 63, 88],
    growthYears: ["2021", "2022", "2023", "2024", "2025", "2026", "2027"],
    growthValues: [8, 23, 33, 51, 61, 78, 100],
  }),
];

export const mockMedia = initialGalleryItems.map((item) => dated({
  id: `media-${item.id}`, title: item.caption, category: item.category, image: item.image,
  location: item.location, publishedAt: item.date, status: "approved",
}));

export const mockVideos = [
  dated({
    id: "video-demo-1",
    title: "Sample video preview",
    description: "A sample MP4 record for trying the video preview and editing workflow.",
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    sourceType: "url",
    fileName: "",
    contentType: "video/mp4",
    fileSize: 0,
    thumbnail: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80",
    location: "biogas",
    displayOrder: 1,
    status: "active",
    publicationStatus: "draft",
  }),
];

export const mockStories = [
  dated({ id: "story-1", title: "From smoke to clean cooking", description: "A family shares how cleaner cooking fuel changed daily routines, health, and household time.", image: initialProgrammes[0].image, location: "Belagavi district", publishedAt: "2026-04-15", status: "published" }),
  dated({ id: "story-2", title: "Women-led change in rural kitchens", description: "Self-help groups use saved time and new skills to strengthen livelihoods.", image: initialProgrammes[3].image, location: "Satara district", publishedAt: "2026-03-10", status: "published" }),
  dated({ id: "story-3", title: "Biogas awareness in village schools", description: "Students engage in environmental education and practical waste-to-energy learning.", image: initialProgrammes[2].image, location: "Dharwad district", publishedAt: "2026-02-12", status: "draft" }),
];

export const mockUsers = [
  dated({ id: "user-demo-super", fullName: "Demo Super Admin", email: "superadmin@demo.local", role: "Super Admin", permissions: ["*"], status: "active" }),
  dated({ id: "user-demo-admin", fullName: "Demo Admin", email: "admin@demo.local", role: "Admin", permissions: ["dashboard.view", "projects.view", "projects.create", "projects.edit", "volunteers.view", "volunteers.edit", "donations.view", "donations.edit", "campaigns.view", "campaigns.create", "campaigns.edit", "contacts.view", "contacts.edit", "enquiries.view", "enquiries.edit", "impact.view", "impact.edit", "media.view", "media.create", "media.edit", "video.view", "video.create", "video.edit", "video.delete", "video.publish", "stories.view", "stories.create", "stories.edit", "settings.view", "settings.edit"], status: "active" }),
  dated({ id: "user-demo-staff", fullName: "Demo Staff", email: "staff@demo.local", role: "Staff", permissions: ["dashboard.view", "projects.view", "volunteers.view", "volunteers.edit", "enquiries.view", "enquiries.edit", "stories.view"], status: "active" }),
];

export const mockContacts = [
  dated({ id: "contact-1", fullName: "Synergy Organization (India)", email: "nspatilsynergyorg@gmail.com", phone: "+91 8861953047", address: "", instagramUrl: "", facebookUrl: "https://www.facebook.com/synergyorganization", linkedinUrl: "https://www.linkedin.com/company/synergy-organization", youtubeUrl: "https://www.youtube.com/@synergyorganization", message: "Organization contact details for the public website.", contactStatus: "active" }),
];
export const mockActivities = [
  dated({ id: "activity-1", action: "Project published", actor: "Demo Admin", subject: "Household Biogas Plant", createdAt: "2026-11-08T10:30:00.000Z" }),
  dated({ id: "activity-2", action: "Volunteer application received", actor: "Website", subject: "Asha Patil", createdAt: "2026-11-07T08:15:00.000Z" }),
  dated({ id: "activity-3", action: "Impact figures reviewed", actor: "Demo Super Admin", subject: "Public impact counters", createdAt: "2026-11-05T13:00:00.000Z" }),
];
export const mockSettings = [
  dated({ id: "organization-contact", title: "Organization contact", email: "nspatilsynergyorg@gmail.com", phone: "+91 8861953047", address: "Kolhapur, Maharashtra, India", status: "active" }),
];
