import { mockUsers } from "../mock/mockData.js";
import { permissionMatrix } from "./permissions.js";
import { userRepository } from "../repositories/userRepository.js";
import { serviceMode } from "../config.js";

let currentUser = null;
const listeners = new Set();
const notify = () => listeners.forEach((listener) => listener(currentUser));

export const authService = {
  async login({ email, password, role }) {
    await new Promise((resolve) => setTimeout(resolve, 350));
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 6) {
      throw new Error("Enter a valid email address and a password of at least 6 characters.");
    }
    const storedUsers = serviceMode === "mock" ? await userRepository.getAll() : null;
    const user = storedUsers?.data.find((candidate) => candidate.role === role)
      || mockUsers.find((candidate) => candidate.role === role);
    if (!user) throw new Error("Select a valid demo role.");
    if (user.status !== "active") throw new Error("This demo account is inactive.");
    const permissions = user.permissions || permissionMatrix[user.role] || [];
    const defaultVideoPermissions = user.role === "Admin"
      ? permissionMatrix.Admin.filter((permission) => permission.startsWith("video."))
      : [];
    const defaultInitiativePermissions = user.role === "Admin"
      ? permissionMatrix.Admin.filter((permission) => permission.startsWith("initiatives."))
      : [];
    currentUser = {
      ...user,
      email,
      fullName: user.fullName,
      permissions: [...new Set([...permissions, ...defaultVideoPermissions, ...defaultInitiativePermissions])],
    };
    notify();
    return structuredClone(currentUser);
  },
  async logout() {
    currentUser = null;
    notify();
  },
  async getCurrentUser() {
    await Promise.resolve();
    return currentUser ? structuredClone(currentUser) : null;
  },
  subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};
