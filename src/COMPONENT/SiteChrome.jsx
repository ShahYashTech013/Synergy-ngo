import { useEffect, useState } from "react";
import "./SiteChrome.css";

export default function SiteChrome({ isLoading }) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const updateProgress = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
        setScrollProgress(Math.max(0, Math.min(100, progress)));
        frame = 0;
      });
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div
        className="site-scroll-progress"
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(scrollProgress)}
        style={{ "--scroll-progress": `${scrollProgress}%` }}
      >
        <span />
      </div>
      <div
        className={`site-page-loader${isLoading ? " is-visible" : " is-dismissing"}`}
        role={isLoading ? "status" : undefined}
        aria-label={isLoading ? "Loading Synergy Organization" : undefined}
        aria-hidden={!isLoading}
      >
        <div className="site-page-loader__content">
          <span className="site-page-loader__wordmark">SYNERGY</span>
          <span className="site-page-loader__organization">ORGANIZATION</span>
          <span className="site-page-loader__indicator" aria-hidden="true"><i /></span>
        </div>
      </div>
    </>
  );
}
