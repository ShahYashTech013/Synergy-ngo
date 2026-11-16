import { mockDonations } from "../mock/mockData.js";
import { createRepository } from "./mockRepository.js";
export const donationRepository = createRepository("donations", mockDonations, { statusField: "paymentStatus" });
