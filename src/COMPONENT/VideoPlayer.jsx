import { useState } from "react";
import { AlertCircle, LoaderCircle } from "lucide-react";
import "./videoPlayer.css";

const fallbackPoster = "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80";

export default function VideoPlayer({ src, poster, title, preload = "metadata", onStatusChange }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const reportStatus = (status, message = "") => onStatusChange?.(status, message);
  const showError = (event) => {
    const errorCode = event.currentTarget.error?.code;
    const message = errorCode === 3
      ? "The video could not be decoded. The file may be damaged."
      : errorCode === 4
        ? "This video format is unsupported or the video URL is unavailable."
        : "The video could not be loaded. Check the file or URL and try again.";
    setLoading(false);
    setError(message);
    reportStatus("error", message);
  };

  return (
    <div className="video-player">
      <video
        key={src}
        src={src}
        poster={poster || fallbackPoster}
        controls
        playsInline
        preload={preload}
        aria-label={title || "Video"}
        onLoadStart={() => { setLoading(true); setError(""); reportStatus("loading"); }}
        onCanPlay={() => { setLoading(false); reportStatus("ready"); }}
        onLoadedData={() => { setLoading(false); reportStatus("ready"); }}
        onError={showError}
      />
      {loading && <div className="video-player__state" aria-live="polite"><LoaderCircle className="video-player__spinner" size={22} /> Loading video…</div>}
      {error && <div className="video-player__error" role="status"><AlertCircle size={20} /><span>{error}</span></div>}
    </div>
  );
}
