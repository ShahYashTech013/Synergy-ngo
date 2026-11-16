import { mockVideos } from "../mock/mockData.js";
import { createRepository } from "./mockRepository.js";

const repository = createRepository("videos", mockVideos, { statusField: "status" });

export const videoRepository = {
  getAll: (...args) => repository.getAll(...args),
  getById: (id) => repository.getById(id),
  create: (data) => repository.create(data),
  update: (id, data) => repository.update(id, data),
  delete: (id) => repository.delete(id),
  async updateStatus(id, status) {
    if (!["active", "inactive"].includes(status)) throw new Error("Video status must be active or inactive.");
    return repository.updateStatus(id, status);
  },
  async publish(id) {
    return repository.update(id, { publicationStatus: "published" });
  },
  async unpublish(id) {
    return repository.update(id, { publicationStatus: "draft" });
  },
};
