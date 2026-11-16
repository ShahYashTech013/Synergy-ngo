import { mockActivities, mockContacts, mockSettings } from "../mock/mockData.js";
import { createRepository } from "./mockRepository.js";
export const activityRepository = createRepository("activities", mockActivities);
export const contactRepository = createRepository("contacts", mockContacts, { statusField: "contactStatus" });
export const settingsRepository = createRepository("settings", mockSettings);
