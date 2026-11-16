import { mockVolunteers } from "../mock/mockData.js";
import { createRepository } from "./mockRepository.js";
export const volunteerRepository = createRepository("volunteers", mockVolunteers, { statusField: "applicationStatus" });
