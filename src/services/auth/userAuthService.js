import { serviceMode, apiBaseUrl } from "../config.js";
import { apiRequest } from "../api/apiClient.js";

const TOKEN_KEY = "synergy_user_token";
const USER_KEY = "synergy_user";
const MOCK_USERS_STORAGE_KEY = "synergy_mock_donor_accounts";

const DEFAULT_MOCK_USERS = [
  {
    id: "donor_demo_01",
    name: "Ramesh Patel",
    email: "donor@example.com",
    role: "Donor",
    password: "Password123",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

function getStoredMockUsers() {
  try {
    const raw = typeof window !== "undefined" ? window.localStorage.getItem(MOCK_USERS_STORAGE_KEY) : null;
    if (!raw) {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(MOCK_USERS_STORAGE_KEY, JSON.stringify(DEFAULT_MOCK_USERS));
      }
      return [...DEFAULT_MOCK_USERS];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [...DEFAULT_MOCK_USERS];
  } catch {
    return [...DEFAULT_MOCK_USERS];
  }
}

function saveMockUsers(users) {
  try {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(MOCK_USERS_STORAGE_KEY, JSON.stringify(users));
    }
  } catch (err) {
    console.error("Could not persist mock users:", err);
  }
}

function safeUser(user) {
  return {
    id: user.id || user._id?.toString() || `donor_${Date.now()}`,
    name: user.name || user.fullName || "Supporter",
    email: user.email,
    role: user.role || "Donor",
    createdAt: user.createdAt || new Date().toISOString(),
    updatedAt: user.updatedAt || new Date().toISOString(),
  };
}

function saveSession(payload) {
  if (!payload?.token || !payload?.user) {
    throw new Error("The server returned an invalid authentication response.");
  }
  if (typeof window !== "undefined") {
    window.sessionStorage.setItem(TOKEN_KEY, payload.token);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(payload.user));
  }
  return payload.user;
}

// Local mock registration
function mockRegister({ name, email, password }) {
  const normalizedName = (name || "").trim();
  const normalizedEmail = (email || "").trim().toLowerCase();

  if (!normalizedName || normalizedName.length < 2) {
    throw new Error("Enter a valid name (2–80 characters).");
  }
  if (!normalizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    throw new Error("Enter a valid email address.");
  }
  if (!password || password.length < 6) {
    throw new Error("Password must be at least 6 characters.");
  }

  const users = getStoredMockUsers();
  const existing = users.find((u) => u.email.toLowerCase() === normalizedEmail);
  if (existing) {
    throw new Error("An account with this email already exists.");
  }

  const newUser = {
    id: `donor_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    name: normalizedName,
    email: normalizedEmail,
    role: "Donor",
    password,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveMockUsers(users);

  const payload = {
    success: true,
    token: `mock_jwt_${Date.now()}`,
    user: safeUser(newUser),
  };
  return saveSession(payload);
}

// Local mock login
function mockLogin({ email, password }) {
  const normalizedEmail = (email || "").trim().toLowerCase();
  if (!normalizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    throw new Error("Enter a valid email address.");
  }
  if (!password) {
    throw new Error("Password is required.");
  }

  const users = getStoredMockUsers();
  const existing = users.find((u) => u.email.toLowerCase() === normalizedEmail);

  if (existing) {
    if (existing.password && existing.password !== password) {
      throw new Error("Invalid email or password.");
    }
    const payload = {
      success: true,
      token: `mock_jwt_${Date.now()}`,
      user: safeUser(existing),
    };
    return saveSession(payload);
  }

  // If in mock mode and email is demo account or newly entered, register it
  const autoUser = {
    id: `donor_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    name: normalizedEmail.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) || "Donor",
    email: normalizedEmail,
    role: "Donor",
    password,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  users.push(autoUser);
  saveMockUsers(users);

  const payload = {
    success: true,
    token: `mock_jwt_${Date.now()}`,
    user: safeUser(autoUser),
  };
  return saveSession(payload);
}

export const userAuthService = {
  async register({ name, email, password }) {
    if (serviceMode === "mock") {
      await new Promise((r) => setTimeout(r, 180));
      return mockRegister({ name, email, password });
    }

    try {
      const payload = await apiRequest("/auth/register", {
        method: "POST",
        body: { name, email, password },
      });
      return saveSession(payload);
    } catch (apiError) {
      if (!apiError.status || apiError.message?.includes("Failed to fetch") || apiError.message?.includes("NetworkError")) {
        console.warn(`[Synergy Auth] API server at ${apiBaseUrl} is unreachable. Falling back to local demo session.`);
        return mockRegister({ name, email, password });
      }
      throw apiError;
    }
  },

  async login({ email, password }) {
    if (serviceMode === "mock") {
      await new Promise((r) => setTimeout(r, 180));
      return mockLogin({ email, password });
    }

    try {
      const payload = await apiRequest("/auth/login", {
        method: "POST",
        body: { email, password },
      });
      return saveSession(payload);
    } catch (apiError) {
      if (!apiError.status || apiError.message?.includes("Failed to fetch") || apiError.message?.includes("NetworkError")) {
        console.warn(`[Synergy Auth] API server at ${apiBaseUrl} is unreachable. Falling back to local demo session.`);
        return mockLogin({ email, password });
      }
      throw apiError;
    }
  },

  logout() {
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(TOKEN_KEY);
      window.sessionStorage.removeItem(USER_KEY);
    }
  },

  getCurrentUser() {
    if (typeof window === "undefined") return null;
    const storedUser = window.sessionStorage.getItem(USER_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  },
};
