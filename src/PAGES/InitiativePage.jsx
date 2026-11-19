import {
  ArrowRight,
  Calendar,
  Compass,
  MapPin,
} from "lucide-react";
import "./BiogasCleanEnergy.css";

function InitiativeStrip({ heading }) {
  if (!heading) return null;
  return (
    <div className="bce-initiative-strip" aria-label={heading}>
      <h2 className="bce-strip-heading">
        <span className="bce-strip-animated-text">{heading}</span>
      </h2>
    </div>
  );
}

export default function InitiativePage({ page, onNavigate }) {
  if (!page) {
    return null;
  }

  const primaryPhoto = page?.photos?.primary || {
    src: page?.heroImage,
    caption: page?.heroAlt || page?.title,
    stripHeading: page?.stripHeading || page?.editorialBanner?.headline || page?.title,
  };
  const fieldPhoto = page?.photos?.field || primaryPhoto;
  const conclusionPhoto = page?.photos?.conclusion || fieldPhoto;

  const leadText = page?.story?.lead || page?.summaryLead || page?.summary || "";

  return (
    <article className="bce-page" aria-labelledby="bce-main-heading">
      {/* ==========================================================
          1. EDITORIAL MASTHEAD
          ========================================================== */}
      <header className="bce-masthead">
        <div className="bce-shell">
          <div className="bce-masthead__kicker-row">
            <div className="bce-masthead__left-nav">
              <button
                type="button"
                className="bce-back-button"
                onClick={() => onNavigate && onNavigate("home", "main-focus-areas")}
                aria-label="Back to Initiatives"
              >
                &larr; Back to Initiatives
              </button>
              <nav className="bce-breadcrumbs" aria-label="Breadcrumbs">
                <button
                  type="button"
                  className="bce-breadcrumb-link"
                  onClick={() => onNavigate && onNavigate("home")}
                >
                  Home
                </button>
                <span className="bce-breadcrumb-separator">/</span>
                <button
                  type="button"
                  className="bce-breadcrumb-link"
                  onClick={() => onNavigate && onNavigate("home", "main-focus-areas")}
                >
                  Our Initiatives
                </button>
                <span className="bce-breadcrumb-separator">/</span>
                <span className="bce-breadcrumb-current">{page.title}</span>
              </nav>
            </div>

            <div className="bce-masthead__badge">
              <span className="bce-masthead__index">
                INITIATIVE {page.index || "01"} <span className="bce-masthead__index-divider">/</span> 05
              </span>
            </div>
          </div>

          <div className="bce-masthead__heading-group">
            <span className="bce-category-tag">
              {page.categoryTag || "SYNERGY ORGANISATION · RURAL SUSTAINABILITY INITIATIVE"}
            </span>
            <h1 id="bce-main-heading" className="bce-main-title">
              {page.title}
            </h1>
          </div>

          {page.metadata && (
            <div className="bce-metadata-grid">
              <div className="bce-metadata-item">
                <span className="bce-metadata-label">
                  <Compass size={13} aria-hidden="true" /> DOMAIN
                </span>
                <span className="bce-metadata-value">{page.metadata.domain}</span>
              </div>
              <div className="bce-metadata-item">
                <span className="bce-metadata-label">
                  <MapPin size={13} aria-hidden="true" /> ACTIVE REGION
                </span>
                <span className="bce-metadata-value">{page.metadata.activeRegion}</span>
              </div>
              <div className="bce-metadata-item">
                <span className="bce-metadata-label">
                  <Calendar size={13} aria-hidden="true" /> TIMELINE &amp; ROOTS
                </span>
                <span className="bce-metadata-value">{page.metadata.timeline}</span>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* ==========================================================
          2. CORE EDITORIAL STORY SPREAD (3-ROW ALTERNATING FORMAT)
          ========================================================== */}
      <section id="bce-editorial-story" className="bce-editorial-spread" aria-labelledby="bce-story-title">
        <div className="bce-shell">
          {/* Row 1: Intro Text (Left) + Primary Image (Right) */}
          <div className="bce-editorial-row bce-editorial-row--row1">
            <div className="bce-editorial-col-text">
              <div className="bce-section-kicker">
                <span className="bce-section-num">{page.story?.kickerNum || page.index || "01"}</span>
                <span className="bce-section-tag">{page.story?.kickerTag || "EDITORIAL STORY & FIELD INITIATIVE"}</span>
              </div>

              <h2 id="bce-story-title" className="bce-story-heading">
                {page.story?.title || page.headline || page.title}
              </h2>

              {leadText && (
                <p className="bce-paragraph bce-paragraph--lead">
                  {leadText}
                </p>
              )}
            </div>

            <div className="bce-editorial-col-media">
              <figure className="bce-clean-media">
                <img
                  src={primaryPhoto.src}
                  alt={primaryPhoto.caption || page.title}
                  loading="eager"
                />
              </figure>
              <InitiativeStrip heading={primaryPhoto.stripHeading || page.stripHeading || page.editorialBanner?.headline || page.title} />
            </div>
          </div>

          {/* Row 2: Field Image (Left) + Subheadings & Content (Right) */}
          <div className="bce-editorial-row bce-editorial-row--row2">
            <div className="bce-editorial-col-media">
              <figure className="bce-clean-media">
                <img
                  src={fieldPhoto.src}
                  alt={fieldPhoto.caption || page.title}
                  loading="lazy"
                />
              </figure>
              <InitiativeStrip heading={fieldPhoto.stripHeading || fieldPhoto.fig || "ORGANIC BIO-SLURRY APPLICATION"} />
            </div>

            <div className="bce-editorial-col-text">
              {page.story?.subheadings?.[0] && (
                <h4 className="bce-subheading">{page.story.subheadings[0]}</h4>
              )}
              {page.story?.paragraphs?.[0] && (
                <p className="bce-paragraph">{page.story.paragraphs[0]}</p>
              )}

              {page.story?.subheadings?.[1] && (
                <h4 className="bce-subheading">{page.story.subheadings[1]}</h4>
              )}
              {page.story?.paragraphs?.[1] && (
                <p className="bce-paragraph">{page.story.paragraphs[1]}</p>
              )}

              {page.story?.paragraphs?.slice(2).map((para, idx) => (
                <p className="bce-paragraph" key={idx}>
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* Optional Feature Row (e.g. Row 3: Text Left + Media Right) */}
          {page.featureRow && (
            <div className="bce-editorial-row bce-editorial-row--row1 bce-editorial-row--feature">
              <div className="bce-editorial-col-text">
                {page.featureRow.subheading && (
                  <h4 className="bce-subheading">{page.featureRow.subheading}</h4>
                )}
                {page.featureRow.paragraphs?.map((para, idx) => (
                  <p className="bce-paragraph" key={idx}>
                    {para}
                  </p>
                ))}
              </div>

              <div className="bce-editorial-col-media">
                <figure className="bce-clean-media">
                  <img
                    src={page.featureRow.photo?.src}
                    alt={page.featureRow.photo?.caption || page.title}
                    loading="lazy"
                  />
                </figure>
                <InitiativeStrip heading={page.featureRow.photo?.stripHeading || "AGRO-BIODIVERSITY & CLIMATE RESILIENCE"} />
              </div>
            </div>
          )}

          {/* Conclusion Row */}
          {page.featureRow ? (
            <div className="bce-editorial-row bce-editorial-row--row2 bce-editorial-row--conclusion">
              <div className="bce-editorial-col-media">
                <figure className="bce-clean-media">
                  <img
                    src={conclusionPhoto.src}
                    alt={conclusionPhoto.caption || page.title}
                    loading="lazy"
                  />
                </figure>
                <InitiativeStrip heading={conclusionPhoto.stripHeading || conclusionPhoto.fig || "SMOKELESS COOKING & CLEAN FLAME"} />
              </div>

              <div className="bce-editorial-col-text bce-editorial-col-text--conclusion">
                {page.conclusion && (
                  <div className="bce-conclusion-block">
                    <h4 className="bce-subheading">{page.conclusion.title || "Conclusion"}</h4>
                    <p className="bce-paragraph">{page.conclusion.text}</p>
                  </div>
                )}
                <div className="bce-conclusion-actions">
                  <button
                    type="button"
                    className="bce-btn bce-btn--primary"
                    onClick={() => onNavigate && onNavigate("donate")}
                  >
                    <span>Support This Initiative</span>
                    <ArrowRight size={15} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bce-editorial-row bce-editorial-row--row3">
              <div className="bce-editorial-col-text bce-editorial-col-text--conclusion">
                {page.conclusion && (
                  <div className="bce-conclusion-block">
                    <h4 className="bce-subheading">{page.conclusion.title || "Conclusion"}</h4>
                    <p className="bce-paragraph">{page.conclusion.text}</p>
                  </div>
                )}
                <div className="bce-conclusion-actions">
                  <button
                    type="button"
                    className="bce-btn bce-btn--primary"
                    onClick={() => onNavigate && onNavigate("donate")}
                  >
                    <span>Support This Initiative</span>
                    <ArrowRight size={15} aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="bce-editorial-col-media">
                <figure className="bce-clean-media">
                  <img
                    src={conclusionPhoto.src}
                    alt={conclusionPhoto.caption || page.title}
                    loading="lazy"
                  />
                </figure>
                <InitiativeStrip heading={conclusionPhoto.stripHeading || conclusionPhoto.fig || "SMOKELESS COOKING & CLEAN FLAME"} />
              </div>
            </div>
          )}
        </div>
      </section>
    </article>
  );
}
