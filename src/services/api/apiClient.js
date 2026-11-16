import { apiBaseUrl } from "../config.js";

export async function apiRequest(path, { method = "GET", body, signal } = {}) {
  const token = typeof window !== "undefined"
    ? window.sessionStorage.getItem("synergy_user_token")
    : null;
  const response = await fetch(`${apiBaseUrl}${path}`, {
    method,
    signal,
    headers: {
      Accept: "application/json",
      ...(body instanceof FormData ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    credentials: "include",
    body: body === undefined ? undefined : body instanceof FormData ? body : JSON.stringify(body),
  });
  const payload = response.status === 204 ? null : await response.json().catch(() => null);
  if (!response.ok) {
    const error = new Error(payload?.message || `Request failed (${response.status}).`);
    error.status = response.status;
    error.details = payload?.errors;
    throw error;
  }
  return payload;
}
