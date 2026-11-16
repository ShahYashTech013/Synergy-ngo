import { mockStories } from "../mock/mockData.js";
import { createRepository } from "./mockRepository.js";
export const storyRepository = createRepository("stories", mockStories);
