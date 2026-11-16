import { mockImpact } from "../mock/mockData.js";
import { createRepository } from "./mockRepository.js";
export const impactRepository = createRepository("impact", mockImpact);
