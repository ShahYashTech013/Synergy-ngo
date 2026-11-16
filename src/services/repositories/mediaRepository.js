import { mockMedia } from "../mock/mockData.js";
import { createRepository } from "./mockRepository.js";
export const mediaRepository = createRepository("media", mockMedia);
