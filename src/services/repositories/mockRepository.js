import { serviceMode } from "../config.js";
import { apiRequest } from "../api/apiClient.js";

const listeners = new Set();
const tables = new Map();
const copy = (value) => structuredClone(value);
const storageKey = (name) => `synergy.mockRepository.${name}.v1`;

function readTable(name, seed) {
  const stored = localStorage.getItem(storageKey(name));
  if (!stored) return copy(seed);
  let records;
  try {
    records = JSON.parse(stored);
  } catch (error) {
    console.error(`Could not restore mock repository "${name}".`, error);
    throw new Error(`Saved ${name} demo records are unreadable. Clear the damaged browser data before continuing.`, { cause: error });
  }
  if (!Array.isArray(records)) throw new Error(`Saved ${name} demo records have an invalid format.`);
  return records;
}

export function notifyRepositoryChange() {
  listeners.forEach((listener) => listener());
}

export function subscribeToRepositories(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function createMockRepository(name, seed, options = {}) {
  if (!tables.has(name)) tables.set(name, readTable(name, seed));
  const read = () => tables.get(name);
  const write = (records) => {
    const saved = copy(records);
    localStorage.setItem(storageKey(name), JSON.stringify(saved));
    tables.set(name, saved);
    notifyRepositoryChange();
  };
  return {
    async getAll({ search = "", status, page = 1, pageSize = 1000 } = {}) {
      await Promise.resolve();
      const all = read().filter((record) => {
        const text = Object.values(record).flat().join(" ").toLowerCase();
        return (!search || text.includes(search.toLowerCase()))
          && (!status || record.status === status || record.applicationStatus === status || record.paymentStatus === status || record.enquiryStatus === status || record.contactStatus === status);
      });
      return { data: copy(all.slice((page - 1) * pageSize, page * pageSize)), total: all.length, page, pageSize };
    },
    async getById(id) {
      await Promise.resolve();
      const record = read().find((item) => String(item.id) === String(id));
      if (!record) throw new Error(`${name} record "${id}" was not found.`);
      return copy(record);
    },
    async create(data) {
      await Promise.resolve();
      const timestamp = new Date().toISOString();
      const record = { ...copy(data), id: data.id || `${name}-${crypto.randomUUID()}`, createdAt: timestamp, updatedAt: timestamp };
      write([record, ...read()]);
      return copy(record);
    },
    async update(id, data) {
      await Promise.resolve();
      let updated;
      const records = read().map((item) => {
        if (String(item.id) !== String(id)) return item;
        updated = { ...item, ...copy(data), id: item.id, createdAt: item.createdAt, updatedAt: new Date().toISOString() };
        return updated;
      });
      if (!updated) throw new Error(`${name} record "${id}" was not found.`);
      write(records);
      return copy(updated);
    },
    async delete(id) {
      await Promise.resolve();
      const records = read();
      if (!records.some((item) => String(item.id) === String(id))) throw new Error(`${name} record "${id}" was not found.`);
      write(records.filter((item) => String(item.id) !== String(id)));
    },
    async updateStatus(id, status) {
      const field = options.statusField || "status";
      return this.update(id, { [field]: status });
    },
  };
}

export function createRepository(name, seed, options = {}) {
  if (serviceMode === "mock") return createMockRepository(name, seed, options);
  const endpoint = options.endpoint || `/${name}`;
  const request = (path, method, body) => apiRequest(path, { method, body });
  return {
    async getAll({ search = "", status = "", page = 1, pageSize = 20 } = {}) {
      const params = new URLSearchParams({ search, status, page: String(page), pageSize: String(pageSize) });
      return request(`${endpoint}?${params}`, "GET");
    },
    async getById(id) { return request(`${endpoint}/${encodeURIComponent(id)}`, "GET"); },
    async create(data) { return request(endpoint, "POST", data); },
    async update(id, data) { return request(`${endpoint}/${encodeURIComponent(id)}`, "PUT", data); },
    async delete(id) { return request(`${endpoint}/${encodeURIComponent(id)}`, "DELETE"); },
    async updateStatus(id, status) {
      const field = options.statusField || "status";
      return request(`${endpoint}/${encodeURIComponent(id)}/status`, "PATCH", { [field]: status });
    },
  };
}
