/**
 * Resolves static asset paths correctly with the application's base URL.
 * Supports root hosting ('/'), subpath hosting (e.g. GitHub Pages '/Synergy-ngo/'),
 * and passes through external URLs (https://, http://, data:, blob:) unchanged.
 */
export const BASE_PATH = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "");

export function assetUrl(path) {
  if (!path) return "";
  if (/^(https?:|\/\/|data:|blob:)/i.test(path)) return path;
  if (!BASE_PATH) return path.startsWith("/") ? path : `/${path}`;
  if (path === BASE_PATH || path.startsWith(`${BASE_PATH}/`)) return path;
  const clean = String(path).replace(/^\/+/, "");
  return `${BASE_PATH}/${clean}`;
}

export default assetUrl;
