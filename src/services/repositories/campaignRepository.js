import { mockCampaigns } from "../mock/mockData.js";
import { createRepository } from "./mockRepository.js";
export const campaignRepository = createRepository("campaigns", mockCampaigns);
