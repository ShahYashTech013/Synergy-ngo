import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Calendar,
  Check,
  Compass,
  Flame,
  HandHeart,
  HeartPulse,
  House,
  Leaf,
  Lightbulb,
  MapPin,
  Recycle,
  ShieldCheck,
  Sparkles,
  Sprout,
  UsersRound,
} from "lucide-react";
import { assetUrl } from "../utils/assetUrl";
import { biogasLearningNavigation } from "./biogasLearningContent.js";
import "./BiogasCleanEnergy.css";

const icons = {
  recycle: Recycle,
  sprout: Sprout,
  light: Lightbulb,
  flame: Flame,
  house: House,
  leaf: Leaf,
};

const ruralPortrait = assetUrl("/WhatsApp%20Image%202026-11-08%20at%203.21.40%20PM.jpeg");
const primaryBiogasPhoto = assetUrl("/images/biogas/biogas_clean_energy_photo.jpg");
const authenticFieldPhoto = assetUrl("/images/biogas/IMG2%20BIO%20GAS.jpeg");

const processSteps = [
  {
    title: "Collect organic material",
    description: "Gather suitable biodegradable feedstock, such as animal manure and organic waste.",
    icon: "recycle",
  },
  {
    title: "Feed the digester",
    description: "Introduce prepared feedstock into a properly designed, sealed digestion system.",
    icon: "sprout",
  },
  {
    title: "Anaerobic digestion",
    description: "Microorganisms break down the material in an oxygen-free environment.",
    icon: "light",
  },
  {
    title: "Biogas forms",
    description: "The process produces a gas mixture, primarily methane and carbon dioxide.",
    icon: "flame",
  },
  {
    title: "Use energy safely",
    description: "With suitable equipment and operation, biogas can serve appropriate energy applications.",
    icon: "house",
  },
  {
    title: "Manage digestate",
    description: "The remaining material may be used as a soil amendment when safely and appropriately managed.",
    icon: "leaf",
  },
];

const applications = [
  {
    title: "Household cooking",
    description: "Biogas can fuel a compatible cooking appliance when gas supply, installation and operation are suitable.",
    icon: "flame",
  },
  {
    title: "Heat applications",
    description: "Some systems use biogas to provide heat with equipment designed for the gas and its conditions.",
    icon: "light",
  },
  {
    title: "Electricity generation",
    description: "At an appropriate scale, biogas can power compatible generators, with technical oversight and suitable gas treatment.",
    icon: "sprout",
  },
  {
    title: "Digestate use",
    description: "Digestate may be managed as a soil amendment only when it is suitable and handled according to local guidance.",
    icon: "leaf",
  },
];

const benefits = [
  {
    title: "Energy awareness",
    description: "Build understanding of renewable and non-conventional energy options.",
    icon: "light",
  },
  {
    title: "Resource use",
    description: "Organic material can become a useful input when a suitable system is available.",
    icon: "recycle",
  },
  {
    title: "Household options",
    description: "Biogas may provide cooking energy with correctly designed and operated appliances.",
    icon: "house",
  },
  {
    title: "Environmental care",
    description: "Responsible energy choices can be part of broader environmental awareness.",
    icon: "leaf",
  },
];

export default function BiogasCleanEnergy({ onNavigate }) {
  const [selectedPhoto, setSelectedPhoto] = useState("primary");

  const activePhotoSrc = selectedPhoto === "primary" ? primaryBiogasPhoto : authenticFieldPhoto;
  const activePhotoCaption =
    selectedPhoto === "primary"
      ? "Documentary record: Rural Indian household biogas plant showing the white-dome anaerobic digester, blue feeding inlet drum, and agricultural homestead in Maharashtra."
      : "Synergy field archive: Resident beside an installed rural flexible biogas digester unit and connected equipment, Rural Maharashtra & Karnataka.";
  const activePhotoFig = selectedPhoto === "primary" ? "FIG. 01 — BIOGAS FIELD INSTALLATION" : "FIG. 01 — FIELD ARCHIVE";

  return (
    <article className="bce-page" aria-labelledby="bce-main-heading">
      {/* ==========================================================
          1. EDITORIAL MASTHEAD
          ========================================================== */}
      <header className="bce-masthead">
        <div className="bce-shell">
          <div className="bce-masthead__kicker-row">
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
                onClick={() => onNavigate && onNavigate("what-we-do")}
              >
                Our Initiatives
              </button>
              <span className="bce-breadcrumb-separator">/</span>
              <span className="bce-breadcrumb-current">Biogas for Clean Energy</span>
            </nav>

            <div className="bce-masthead__badge">
              <span className="bce-masthead__index">
                INITIATIVE 01 <span className="bce-masthead__index-divider">/</span> 04
              </span>
            </div>
          </div>

          <div className="bce-masthead__heading-group">
            <span className="bce-category-tag">
              SYNERGY ORGANISATION · RURAL SUSTAINABILITY INITIATIVE
            </span>
            <h1 id="bce-main-heading" className="bce-main-title">
              BIOGAS FOR CLEAN ENERGY
            </h1>
            <p className="bce-subtitle">
              Clean Household Cooking Fuel &amp; Organic Agro-Slurry Solutions
            </p>
            <p className="bce-motto">
              <em>&ldquo;Turning Natural Resources Into Clean Energy.&rdquo;</em>
            </p>
          </div>

          <div className="bce-metadata-grid">
            <div className="bce-metadata-item">
              <span className="bce-metadata-label">
                <Compass size={13} aria-hidden="true" /> DOMAIN
              </span>
              <span className="bce-metadata-value">Renewable Energy &amp; Organic Farming</span>
            </div>
            <div className="bce-metadata-item">
              <span className="bce-metadata-label">
                <MapPin size={13} aria-hidden="true" /> ACTIVE REGION
              </span>
              <span className="bce-metadata-value">Rural Maharashtra &amp; Karnataka</span>
            </div>
            <div className="bce-metadata-item">
              <span className="bce-metadata-label">
                <Calendar size={13} aria-hidden="true" /> TIMELINE &amp; ROOTS
              </span>
              <span className="bce-metadata-value">Established 2010 (Fieldwork since 1990)</span>
            </div>
            <div className="bce-metadata-item">
              <span className="bce-metadata-label">
                <Sparkles size={13} aria-hidden="true" /> CORE FOCUS
              </span>
              <span className="bce-metadata-value">Household Digesters &amp; Bio-Fertilizer</span>
            </div>
          </div>

          <div className="bce-masthead__actions-row">
            <p className="bce-masthead__summary-lead">
              Discover how biogas and non-conventional energy can support cleaner, healthier homes and more sustainable rural communities across Maharashtra and Karnataka.
            </p>
            <div className="bce-masthead__actions">
              <button
                type="button"
                className="bce-btn bce-btn--primary"
                onClick={() => {
                  const target = document.getElementById("bce-editorial-story");
                  target?.scrollIntoView({
                    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
                  });
                }}
              >
                <span>Read Editorial Story</span>
                <ArrowDown size={15} aria-hidden="true" />
              </button>
              <button
                type="button"
                className="bce-btn bce-btn--outline"
                onClick={() => onNavigate && onNavigate("donate")}
              >
                <span>Support This Initiative</span>
                <ArrowRight size={15} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ==========================================================
          2. CORE EDITORIAL STORY SPREAD (IMAGE LEFT, CONTENT RIGHT)
          ========================================================== */}
      <section id="bce-editorial-story" className="bce-editorial-spread" aria-labelledby="bce-story-title">
        <div className="bce-shell">
          <div className="bce-spread-grid">
            {/* ----------------- LEFT SIDE ----------------- */}
            <div className="bce-left-col">
              <figure className="bce-primary-figure">
                <div className="bce-figure-img-wrap">
                  <img
                    src={activePhotoSrc}
                    alt="Rural household biogas digester installation in an Indian village"
                    className="bce-figure-img"
                    loading="eager"
                  />
                  <span className="bce-figure-watermark">SYNERGY DOCUMENTARY</span>
                </div>
                <figcaption className="bce-figcaption">
                  <span className="bce-fig-badge">[ {activePhotoFig} ]</span>
                  <p className="bce-fig-caption-text">{activePhotoCaption}</p>
                </figcaption>
              </figure>

              {/* Matching Forest-Green Editorial Headline Banner */}
              <div className="bce-editorial-banner">
                <h4 className="bce-editorial-banner__headline">CLEAN ENERGY. HEALTHIER COMMUNITIES.</h4>
                <span className="bce-editorial-banner__underline" aria-hidden="true" />
                <p className="bce-editorial-banner__sub">Sustainable solutions for rural transformation.</p>
              </div>

              {/* View options toggle */}
              <div className="bce-left-field-card">
                <h4 className="bce-left-field-card-title">Authentic Rural Field Reality</h4>
                <p className="bce-left-field-card-text">
                  Photographed in rural village homesteads across Maharashtra and Karnataka, reflecting genuine daily adoption of clean household biogas systems.
                </p>
                <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.5rem" }}>
                  <button
                    type="button"
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: selectedPhoto === "primary" ? "700" : "500",
                      background: selectedPhoto === "primary" ? "var(--bce-primary)" : "transparent",
                      color: selectedPhoto === "primary" ? "#ffffff" : "var(--bce-primary)",
                      border: "1px solid var(--bce-primary)",
                      padding: "0.25rem 0.65rem",
                      cursor: "pointer",
                      borderRadius: "2px",
                    }}
                    onClick={() => setSelectedPhoto("primary")}
                  >
                    Documentary Photo
                  </button>
                  <button
                    type="button"
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: selectedPhoto === "field" ? "700" : "500",
                      background: selectedPhoto === "field" ? "var(--bce-primary)" : "transparent",
                      color: selectedPhoto === "field" ? "#ffffff" : "var(--bce-primary)",
                      border: "1px solid var(--bce-primary)",
                      padding: "0.25rem 0.65rem",
                      cursor: "pointer",
                      borderRadius: "2px",
                    }}
                    onClick={() => setSelectedPhoto("field")}
                  >
                    Field Archive Photo
                  </button>
                </div>
              </div>
            </div>

            {/* ----------------- RIGHT SIDE ----------------- */}
            <div className="bce-right-col">
              <div className="bce-section-kicker">
                <span className="bce-section-num">01</span>
                <span className="bce-section-tag">EDITORIAL STORY &amp; FIELD INITIATIVE</span>
              </div>

              <h2 id="bce-story-title" className="bce-story-heading">
                Powering Rural Communities Through Sustainable Energy.
              </h2>

              {/* Introductory Overview Paragraph with Drop-Cap */}
              <p className="bce-paragraph bce-paragraph--lead">
                <span className="bce-dropcap">S</span>
                ynergy Organisation actively promotes the adoption of biogas technology as a sustainable and eco-friendly energy solution, particularly in rural and semi-urban communities where traditional cooking relies heavily on firewood, coal, or other biomass fuels. By converting organic waste—such as food waste, agricultural residues, and animal dung—into clean energy, the programme provides households with a reliable and environmentally responsible alternative to conventional fuels. This reduces indoor air pollution, mitigates deforestation, and lowers greenhouse gas emissions, contributing directly to improved health and environmental protection.
              </p>

              {/* Required Exact Paragraph 1 */}
              <p className="bce-paragraph">
                The benefits of biogas extend beyond energy production. The anaerobic digestion process generates nutrient-rich slurry as a by-product, which can be used as an effective organic fertilizer for farming. This dual advantage addresses both energy and agricultural needs, promoting sustainable farming practices, enhancing soil fertility, improving crop yields, and reducing dependency on chemical fertilizers. By integrating clean energy solutions with agriculture, the programme supports holistic rural development that is environmentally sound and economically viable.
              </p>

              {/* Required Exact Paragraph 2 */}
              <p className="bce-paragraph">
                Through this integrated approach, the Biogas for Clean Energy programme contributes to improved rural livelihoods, economic empowerment, and environmental stewardship. Households benefit from reduced energy costs, cleaner cooking environments, and increased agricultural productivity, while communities as a whole become more self-reliant and environmentally conscious.
              </p>

              {/* Required Visually Distinguished Conclusion */}
              <div className="bce-conclusion-block">
                <div className="bce-conclusion-header">
                  <span className="bce-conclusion-tag">PROGRAMME COMMITMENT</span>
                </div>
                <h3 className="bce-conclusion-title">Conclusion</h3>
                <p className="bce-conclusion-text">
                  Synergy Organisation's Biogas for Clean Energy initiative demonstrates how innovative, sustainable technologies can transform rural communities. By providing access to clean energy and promoting organic farming practices, the programme enhances health, livelihoods, and ecological well-being simultaneously. Through continued awareness, training, and community engagement, Synergy Organisation strives to create healthier, self-reliant, and eco-conscious communities, laying the foundation for a cleaner, greener, and more sustainable future for generations to come.
                </p>
              </div>

              {/* Foundational Knowledge Box (Preserving Existing Content) */}
              <div className="bce-context-box">
                <h4 className="bce-context-box__title">Energy From Everyday Resources</h4>
                <ul className="bce-context-box__list">
                  <li className="bce-context-box__item">
                    Biogas is a renewable fuel produced when microorganisms break down biodegradable material such as animal manure and some organic waste in an oxygen-free digester.
                  </li>
                  <li className="bce-context-box__item">
                    The gas can be used for suitable energy needs, while the remaining digestate may be managed as a soil amendment when handled appropriately. System design, feedstock and safe operation all matter.
                  </li>
                  <li className="bce-context-box__item">
                    Synergy Organization's stated vision includes promoting non-conventional energy and environmental awareness in rural households.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================
          3. METHODOLOGY & 6-STEP DIGESTION WORKFLOW
          ========================================================== */}
      <section className="bce-section bce-section--canvas" aria-labelledby="bce-process-heading">
        <div className="bce-shell">
          <div className="bce-section-kicker">
            <span className="bce-section-num">02</span>
            <span className="bce-section-tag">FIELD ARCHITECTURE &amp; WORKFLOW</span>
          </div>

          <div className="bce-section-header">
            <div>
              <span className="bce-category-tag">A SIMPLE, PROVEN PROCESS</span>
              <h2 id="bce-process-heading" className="bce-section-heading">
                From Natural Resources to Usable Energy.
              </h2>
            </div>
            <p className="bce-section-desc">
              A general overview of anaerobic digestion. Actual systems vary by design, feedstock availability and operating conditions.
            </p>
          </div>

          <div className="bce-process-grid">
            {processSteps.map((step, index) => {
              const Icon = icons[step.icon] || Sprout;
              return (
                <div className="bce-process-card" key={step.title}>
                  <div className="bce-process-card__top">
                    <span className="bce-process-num">0{index + 1}</span>
                    <div className="bce-process-icon">
                      <Icon size={17} strokeWidth={1.8} aria-hidden="true" />
                    </div>
                  </div>
                  <h3 className="bce-process-title">{step.title}</h3>
                  <p className="bce-process-desc">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==========================================================
          4. TECHNICAL LEARNING MODULES (BIOGAS LIBRARY)
          ========================================================== */}
      <section className="bce-section" aria-labelledby="bce-learning-heading">
        <div className="bce-shell">
          <div className="bce-learning-card">
            <div className="bce-learning-intro">
              <span className="bce-category-tag">EXPLORE THE SUBJECT IN DEPTH</span>
              <h2 id="bce-learning-heading" className="bce-section-heading">
                Technical Learning Modules &amp; Guides
              </h2>
              <p className="bce-paragraph" style={{ marginTop: "0.75rem", marginBottom: 0 }}>
                Four structured reference guides exploring biogas fundamentals, digestion dynamics, system designs, and household suitability considerations.
              </p>
            </div>

            <div className="bce-learning-grid">
              {biogasLearningNavigation.map((item, index) => (
                <button
                  type="button"
                  key={item.page}
                  className="bce-learning-tile"
                  onClick={() => onNavigate && onNavigate(item.page)}
                >
                  <div className="bce-learning-tile__badge">MODULE 0{index + 1}</div>
                  <span className="bce-learning-tile__title">{item.label}</span>
                  <span className="bce-learning-tile__arrow">
                    Read Guide <ArrowRight size={15} aria-hidden="true" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================
          5. APPLICATIONS & CORE BENEFITS
          ========================================================== */}
      <section className="bce-section bce-section--canvas" aria-labelledby="bce-app-heading">
        <div className="bce-shell">
          <div className="bce-section-kicker">
            <span className="bce-section-num">03</span>
            <span className="bce-section-tag">PRACTICAL APPLICATIONS &amp; IMPACT</span>
          </div>

          <div className="bce-section-header">
            <div>
              <h2 id="bce-app-heading" className="bce-section-heading">
                Design the System Around the Intended Use.
              </h2>
            </div>
            <p className="bce-section-desc">
              The right configuration depends on available feedstock, scale, gas quality, equipment and local operating capacity.
            </p>
          </div>

          <div className="bce-app-grid">
            {applications.map((item, index) => {
              const Icon = icons[item.icon] || Flame;
              return (
                <article className="bce-app-card" key={item.title}>
                  <div className="bce-app-card__header">
                    <span className="bce-app-card__num">0{index + 1}</span>
                    <div className="bce-app-card__icon">
                      <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
                    </div>
                  </div>
                  <h3 className="bce-app-card__title">{item.title}</h3>
                  <p className="bce-app-card__desc">{item.description}</p>
                </article>
              );
            })}
          </div>

          <div className="bce-section-header">
            <div>
              <span className="bce-category-tag">WHY CLEAN ENERGY MATTERS</span>
              <h3 className="bce-section-heading" style={{ fontSize: "1.8rem" }}>
                A Practical Part of a More Sustainable Future.
              </h3>
            </div>
            <p className="bce-section-desc">
              Biogas is one option among many. Its suitability depends on local resources, system design, maintenance and safe operation.
            </p>
          </div>

          <div className="bce-app-grid" style={{ marginBottom: "2rem" }}>
            {benefits.map((item, index) => {
              const Icon = icons[item.icon] || Check;
              return (
                <article className="bce-app-card" key={item.title}>
                  <div className="bce-app-card__header">
                    <span className="bce-app-card__num">0{index + 1}</span>
                    <div className="bce-app-card__icon">
                      <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
                    </div>
                  </div>
                  <h3 className="bce-app-card__title">{item.title}</h3>
                  <p className="bce-app-card__desc">{item.description}</p>
                </article>
              );
            })}
          </div>

          <div className="bce-benefits-note">
            <span className="bce-benefits-note__label">DISCLOSURE:</span>
            <p className="bce-benefits-note__text">
              These are general technology considerations, not independently verified Synergy Organization impact claims.
            </p>
          </div>
        </div>
      </section>

      {/* ==========================================================
          6. FOUNDER'S VISION & COMMUNITY ROOTS
          ========================================================== */}
      <section className="bce-story-section" aria-labelledby="bce-founder-heading">
        <div className="bce-shell">
          <div className="bce-story-card">
            <div className="bce-story-grid">
              <div className="bce-story-visual">
                <div className="bce-story-img-wrap">
                  <img
                    src={ruralPortrait}
                    alt="Rural woman carrying gathered firewood outdoors in Maharashtra"
                    loading="lazy"
                  />
                </div>
                <figcaption className="bce-figcaption" style={{ color: "rgba(255,255,255,0.7)" }}>
                  <span className="bce-fig-badge" style={{ color: "var(--bce-gold)" }}>
                    [ FIG. 02 — RURAL CONTEXT ]
                  </span>
                  <p className="bce-fig-caption-text" style={{ color: "rgba(255,255,255,0.75)" }}>
                    Rural context / supplied photograph of daily firewood gathering before clean cooking transition.
                  </p>
                </figcaption>
              </div>

              <div className="bce-story-content">
                <span className="bce-story-tag">OUR VISION &amp; HERITAGE</span>
                <h2 id="bce-founder-heading" className="bce-story-title">
                  A Cleaner Energy Future for Every Rural Household.
                </h2>
                <p className="bce-story-para">
                  Synergy Organization's stated vision is to promote non-conventional energy and environmental awareness in rural households. The organization was established in 2010 by Mr. Nandkumar Patil, whose dedicated grassroots work began in 1990.
                </p>

                <blockquote className="bce-pullquote">
                  <p className="bce-pullquote-text">
                    &ldquo;Promoting non-conventional energy and environmental awareness in rural households.&rdquo;
                  </p>
                  <cite className="bce-pullquote-cite">
                    — Mr. Nandkumar Patil, Founder (Work began 1990, Synergy established 2010)
                  </cite>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================
          7. EDITORIAL CALL TO ACTION
          ========================================================== */}
      <section className="bce-cta-section" aria-labelledby="bce-cta-heading">
        <div className="bce-shell">
          <div className="bce-cta-box">
            <div className="bce-cta-box__inner">
              <span className="bce-category-tag" style={{ color: "var(--bce-gold)" }}>
                BE PART OF THE ENERGY TRANSFORMATION
              </span>
              <h2 id="bce-cta-heading" className="bce-cta-title">
                Support a Cleaner Energy Future.
              </h2>
              <p className="bce-cta-desc">
                Explore how clean energy awareness fits into Synergy Organization's wider rural development focus across Karnataka and Maharashtra.
              </p>
              <div className="bce-cta-actions">
                <button
                  type="button"
                  className="bce-btn bce-btn--gold"
                  onClick={() => onNavigate && onNavigate("donate")}
                >
                  <span>Donate Now</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="bce-btn bce-btn--outline-light"
                  onClick={() => onNavigate && onNavigate("what-we-do")}
                >
                  <span>Explore Our Other Initiatives</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
