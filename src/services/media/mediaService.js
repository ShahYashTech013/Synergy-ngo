const MAX_FILE_SIZE = 5 * 1024 * 1024;
const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const activePreviews = new Set();

if (typeof window !== "undefined") {
  window.addEventListener("pagehide", () => {
    activePreviews.forEach((url) => URL.revokeObjectURL(url));
    activePreviews.clear();
  });
}

export const mediaService = {
  async createPreview(file) {
    if (!file) throw new Error("Choose an image file.");
    if (!allowedTypes.includes(file.type)) throw new Error("Choose a JPG, PNG, WEBP, or GIF image.");
    if (file.size > MAX_FILE_SIZE) throw new Error("Image must be 5 MB or smaller.");
    const url = URL.createObjectURL(file);
    activePreviews.add(url);
    return { url, fileName: file.name, size: file.size, contentType: file.type, temporary: true };
  },
  async upload(file) {
    if (!file) throw new Error("Choose an image file.");
    throw new Error("Persistent uploads are not configured in the frontend demo. Preview URLs are temporary.");
  },
  revokePreview(url) {
    if (url?.startsWith("blob:")) {
      activePreviews.delete(url);
      URL.revokeObjectURL(url);
    }
  },
};
