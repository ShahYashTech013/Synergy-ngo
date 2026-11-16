import { mockUsers } from "../mock/mockData.js";
import { createRepository } from "./mockRepository.js";
export const userRepository = createRepository("users", mockUsers);
