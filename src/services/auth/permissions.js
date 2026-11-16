export const permissionMatrix = {
  "Super Admin": ["*"],
  Admin: [
    "dashboard.view", "activities.view", "projects.view", "projects.create", "projects.edit", "projects.delete", "projects.publish",
    "volunteers.view", "volunteers.edit", "donations.view", "donations.edit", "donations.export", "campaigns.view", "campaigns.create", "campaigns.edit",
    "contacts.view", "contacts.edit", "enquiries.view", "enquiries.edit", "impact.view", "impact.edit",
    "initiatives.view", "initiatives.create", "initiatives.edit", "initiatives.delete", "initiatives.publish", "media.view", "media.create",
    "media.edit", "media.delete", "media.publish", "video.view", "video.create", "video.edit", "video.delete", "video.publish",
    "stories.view", "stories.create", "stories.edit", "stories.delete", "stories.publish",
    "users.view", "settings.view", "settings.edit",
  ],
  Staff: ["dashboard.view", "activities.view", "projects.view", "volunteers.view", "volunteers.edit", "enquiries.view", "enquiries.edit", "stories.view"],
};

export function hasPermission(user, permission) {
  return Boolean(user && (user.permissions?.includes("*") || user.permissions?.includes(permission)));
}
