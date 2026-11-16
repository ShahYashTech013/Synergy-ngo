import { apiRequest } from "../api/apiClient.js";

const TOKEN_KEY = "synergy_user_token";
const USER_KEY = "synergy_user";

function saveSession(payload) {
  if (!payload?.token || !payload?.user) {
    throw new Error("The server returned an invalid authentication response.");
  }
  window.sessionStorage.setItem(TOKEN_KEY, payload.token);
  window.sessionStorage.setItem(USER_KEY, JSON.stringify(payload.user));
  return payload.user;
}

export const userAuthService = {
  async register({ name, email, password }) {
    const payload = await apiRequest("/auth/register", {
      method: "POST",
      body: { name, email, password },
    });
    return saveSession(payload);
  },

  async login({ email, password }) {
    const payload = await apiRequest("/auth/login", {
      method: "POST",
      body: { email, password },
    });
    return saveSession(payload);
  },

  logout() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(USER_KEY);
  },

  getCurrentUser() {
    const storedUser = window.sessionStorage.getItem(USER_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  },
};
