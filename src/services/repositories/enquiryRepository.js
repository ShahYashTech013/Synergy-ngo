import { mockEnquiries } from "../mock/mockData.js";
import { createRepository } from "./mockRepository.js";
export const enquiryRepository = createRepository("enquiries", mockEnquiries, { statusField: "enquiryStatus" });
