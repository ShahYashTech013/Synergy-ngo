export const serviceMode = import.meta.env.VITE_DATA_MODE || "mock";
export const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api").replace(/\/+$/, "");

if (!["mock", "api"].includes(serviceMode)) {
  throw new Error(`Unsupported VITE_DATA_MODE "${serviceMode}". Use "mock" or "api".`);
}

if (serviceMode === "api" && !apiBaseUrl) {
  throw new Error("VITE_API_BASE_URL is required when VITE_DATA_MODE=api.");
}
