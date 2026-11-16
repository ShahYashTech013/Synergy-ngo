import VideoPlayer from "./VideoPlayer.jsx";
import "./publicVideoSection.css";

const locationLabels = {
  hero: "Hero Background",
  biogas: "Biogas Section",
  initiatives: "Our Initiatives",
  "installation-plants": "Installation Plants",
  impact: "Our Impact",
  "our-story": "Our Story",
};

export default function PublicVideoSection({ location, videos }) {
  const items = videos.filter((video) => video.location === location);
  if (!items.length) return null;

  return (
    <div className="public-video-section container-fluid px-4 px-md-5 py-4">
      <div className="public-video-section__heading">
        <span>VIDEO HIGHLIGHTS</span>
        <h2>{locationLabels[location]}</h2>
      </div>
      <div className="public-video-section__grid">
        {items.map((video) => (
          <article className="public-video-card" key={video.id}>
            <VideoPlayer src={video.videoUrl} poster={video.thumbnail} title={video.title} preload="none" />
            <div className="public-video-card__copy">
              <h3>{video.title}</h3>
              {video.description && <p>{video.description}</p>}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
