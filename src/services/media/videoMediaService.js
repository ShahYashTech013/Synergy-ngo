const MAX_VIDEO_SIZE = 100 * 1024 * 1024;
const allowedTypes = new Map([
  [".mp4", ["video/mp4"]],
  [".webm", ["video/webm"]],
  [".ogg", ["video/ogg", "application/ogg"]],
]);
const activePreviews = new Set();

if (typeof window !== "undefined") {
  window.addEventListener("pagehide", () => {
    activePreviews.forEach((url) => URL.revokeObjectURL(url));
    activePreviews.clear();
  });
}

function extensionOf(fileName) {
  const match = fileName.toLowerCase().match(/\.(mp4|webm|ogg)$/);
  return match ? `.${match[1]}` : "";
}

function validateFile(file) {
  if (!file) throw new Error("Choose a video file.");
  const extension = extensionOf(file.name);
  const acceptedTypes = allowedTypes.get(extension);
  if (!acceptedTypes || (file.type && !acceptedTypes.includes(file.type))) {
    throw new Error("Choose a supported MP4, WebM, or Ogg video file.");
  }
  if (file.size === 0) throw new Error("The selected video file is empty.");
  if (file.size > MAX_VIDEO_SIZE) throw new Error("Video files must be 100 MB or smaller.");
  return { extension, contentType: file.type || acceptedTypes[0] };
}

export const videoMediaService = {
  async createPreview(file) {
    const { contentType } = validateFile(file);
    const url = URL.createObjectURL(file);
    activePreviews.add(url);
    return { url, fileName: file.name, size: file.size, contentType, temporary: true };
  },
  validateUrl(value) {
    const trimmed = value.trim();
    if (/^(?:[a-z]:[\\/]|\\\\|file:)/i.test(trimmed)) {
      throw new Error("Windows file paths are not video URLs. Choose Upload video and select the file from your computer.");
    }

    let url;
    try {
      const baseUrl = typeof window === "undefined" ? "http://localhost" : window.location.origin;
      url = new URL(trimmed, baseUrl);
    } catch {
      throw new Error("Enter a valid direct video URL or a public site path such as /video.mp4.");
    }
    if (!["http:", "https:"].includes(url.protocol)) {
      throw new Error("Video URLs must use HTTP or HTTPS. To use a local file, select Upload video.");
    }
    if (![".mp4", ".webm", ".ogg"].includes(extensionOf(url.pathname))) {
      throw new Error("Use a direct MP4, WebM, or Ogg video URL.");
    }
    return url.href;
  },
  async upload(file) {
    validateFile(file);
    throw new Error("Permanent video uploads are not configured. Selected files are temporary browser previews only.");
  },
  revokePreview(url) {
    if (url?.startsWith("blob:")) {
      activePreviews.delete(url);
      URL.revokeObjectURL(url);
    }
  },
};
