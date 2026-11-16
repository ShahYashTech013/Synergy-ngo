/**
 * Resolves static asset paths correctly with the application's base URL.
 * Supports root hosting ('/'), subpath hosting (e.g. GitHub Pages '/Synergy-ngo/'),
 * normalizes spaces / encoded URIs, and passes through external URLs (https://, http://, data:, blob:) unchanged.
 */
export const BASE_PATH = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "");

export function assetUrl(path) {
  if (!path) return "";
  if (/^(https?:|\/\/|data:|blob:)/i.test(path)) return path;
  let resolved = "";
  if (!BASE_PATH) {
    resolved = path.startsWith("/") ? path : `/${path}`;
  } else if (path === BASE_PATH || path.startsWith(`${BASE_PATH}/`)) {
    resolved = path;
  } else {
    const clean = String(path).replace(/^\/+/, "");
    resolved = `${BASE_PATH}/${clean}`;
  }
  try {
    return encodeURI(decodeURI(resolved));
  } catch {
    return encodeURI(resolved);
  }
}

export default assetUrl;
