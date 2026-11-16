import { mockImpactCharts } from "../mock/mockData.js";
import { createRepository } from "./mockRepository.js";

export const impactChartRepository = createRepository("impact-charts", mockImpactCharts);
