import { useState, useEffect } from "react";
import AdminPanel from "./admin/AdminPanel.jsx";
import { useRepository } from "./hooks/useRepository.js";
import {
  contactRepository,
  enquiryRepository,
  impactChartRepository,
  impactRepository,
  mediaRepository,
  projectRepository,
  storyRepository,
  videoRepository,
  volunteerRepository,
} from "./services/repositories/index.js";
import { appearanceRepository, appearanceStyleFor } from "./services/appearance/appearanceRepository.js";
import { getSectionDefinition } from "./services/appearance/appearanceConfig.js";
import { serviceMode } from "./services/config.js";
import { ArrowDown, ArrowRight, Flame, Recycle, Sprout, ClipboardList, UsersRound, Megaphone, Handshake } from "lucide-react";
import Footer from "./COMPONENT/Footer.jsx";
import "./App.css";
import "./appearance.css";
import assetUrl, { BASE_PATH } from "./utils/assetUrl.js";
import Navbar from "./COMPONENT/Navbar.jsx";
import AnimatedText, { AnimatedCounter } from "./COMPONENT/AnimatedText.jsx";
import PublicVideoSection from "./COMPONENT/PublicVideoSection.jsx";
import FocusAreasShowcase from "./COMPONENT/FocusAreasShowcase.jsx";
import OurProgrammes from "./COMPONENT/OurProgrammes.jsx";
import FindOurLocation from "./COMPONENT/FindOurLocation.jsx";
import SiteChrome from "./COMPONENT/SiteChrome.jsx";
import About from "./PAGES/About.jsx";
import Impact from "./PAGES/Impact.jsx";
import AuthPage from "./PAGES/AuthPage.jsx";
import Donate from "./PAGES/Donate.jsx";
import BiogasCleanEnergy from "./PAGES/BiogasCleanEnergy.jsx";
import WomenEmpowerment from "./PAGES/WomenEmpowerment.jsx";
import SkillDevelopment from "./PAGES/SkillDevelopment.jsx";
import WhatWeDo from "./PAGES/WhatWeDo.jsx";
import UnderstandingBiogas from "./PAGES/UnderstandingBiogas.jsx";
import HowBiogasWorks from "./PAGES/HowBiogasWorks.jsx";
import BiogasSolutions from "./PAGES/BiogasSolutions.jsx";
import BiogasBenefits from "./PAGES/BiogasBenefits.jsx";
import PartnerWithUs from "./COMPONENT/PartnerWithUs.jsx";
import {
  initialProgrammes,
  initialGalleryItems,
} from "./DATA/initialData.js";

const pageRoutes = {
  login: "/login",
  register: "/register",
  donate: "/donate",
  "donor-checkout": "/donate/checkout",
  "what-we-do": "/what-we-do",
  programmes: "/programmes",
  "initiative-biogas-clean-energy": "/initiatives/biogas-clean-energy",
  "initiative-women-empowerment": "/initiatives/women-empowerment",
  "initiative-skill-development": "/initiatives/skill-development",
  "biogas-understanding": "/biogas/understanding-biogas",
  "biogas-how-it-works": "/biogas/how-biogas-works",
  "biogas-solutions": "/biogas/biogas-solutions",
  "biogas-benefits": "/biogas/benefits-of-biogas",
  about: "/about",
  "get-involved": "/get-involved",
  "partner-with-us": "/partner-with-us",
};

const legacyInitiativeRedirects = {
  "/initiatives/smoke-free-homes": "clean-cooking",
  "/initiatives/women-empowerment": "women-empowerment",
  "/initiatives/skill-development": "skill-development",
  "/initiatives/environmental-campaign": "environmental-campaign",
  "/initiatives/clean-energy": "clean-cooking",
  "/initiatives": "clean-cooking",
};

const pageKeysByPath = Object.fromEntries(
  Object.entries(pageRoutes).map(([page, path]) => [path, page]),
);
const HERO_BACKGROUND_VIDEO_URL = assetUrl("/synergy%20vedio.mp4");
const HERO_BACKGROUND_POSTER = assetUrl("/WhatsApp%20Image%202026-11-08%20at%203.21.33%20PM.jpeg");
const movedGalleryItems = [
  { id: "behind-work-biogas-1", category: "Behind the Work", caption: "Brick dome digester field installation", location: "", date: "", image: assetUrl("/images/volunteers/BIO%20GAS%20INSTALL1.jpeg") },
  { id: "behind-work-biogas-2", category: "Behind the Work", caption: "Community members at a biogas installation site", location: "", date: "", image: assetUrl("/images/volunteers/IMG3BIOGAS.jpeg") },
  { id: "behind-work-biogas-3", category: "Behind the Work", caption: "Resident beside a flexible biogas digester", location: "", date: "", image: assetUrl("/images/volunteers/IMG2%20BIO%20GAS.jpeg") },
  { id: "behind-work-rural", category: "Behind the Work", caption: "Rural woman carrying gathered firewood", location: "", date: "", image: assetUrl("/images/volunteers/WhatsApp%20Image%202026-11-08%20at%203.21.40%20PM.jpeg") },
];
function getGalleryImageName(image) {
  const imagePath = String(image || "").split(/[?#]/)[0];
  const imageName = imagePath.split("/").pop() || "";
  try {
    return decodeURIComponent(imageName).toLowerCase();
  } catch {
    return imageName.toLowerCase();
  }
}

function safeExternalUrl(value) {
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}

function getAppPath() {
  const fullPath = window.location.pathname.replace(/\/+$/, "") || "/";
  if (BASE_PATH && fullPath.startsWith(BASE_PATH)) {
    const relative = fullPath.slice(BASE_PATH.length).replace(/\/+$/, "");
    return relative || "/";
  }
  return fullPath;
}

function getPageFromLocation() {
  const path = getAppPath();
  if (legacyInitiativeRedirects[path]) {
    return "home";
  }
  return pageKeysByPath[path] || "home";
}

function getInitialAnchor() {
  const path = getAppPath();
  if (legacyInitiativeRedirects[path]) {
    return legacyInitiativeRedirects[path];
  }
  return window.location.hash.replace(/^#/, "") || null;
}

// ==================== 1. INITIAL DATA ====================

// ==================== 2. MAIN APPLICATION ====================
function PublicWebsite() {
  const [activePage, setActivePage] = useState(getPageFromLocation);
  const [navigationTarget, setNavigationTarget] = useState(() => {
    const anchor = getInitialAnchor();
    const page = getPageFromLocation();
    return anchor ? { page, anchor, timestamp: Date.now() } : null;
  });
  const [selectedProgramme, setSelectedProgramme] = useState(null);
  const [failedHeroVideoSource, setFailedHeroVideoSource] = useState("");
  const [readyHeroVideoSource, setReadyHeroVideoSource] = useState("");
  const [heroFontsReady, setHeroFontsReady] = useState(() => !document.fonts);
  const [documentReady, setDocumentReady] = useState(() => document.readyState === "complete");
  const [heroPosterReady, setHeroPosterReady] = useState(() => getPageFromLocation() !== "home");
  const [loaderMinimumElapsed, setLoaderMinimumElapsed] = useState(false);
  const [loaderFallbackElapsed, setLoaderFallbackElapsed] = useState(false);
  const [pageLoaderReady, setPageLoaderReady] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [galleryCategory, setGalleryCategory] = useState("All");
  const [appearanceSettings, setAppearanceSettings] = useState({});
  const appearancePreview = new URLSearchParams(window.location.search).get("appearancePreview") === "1";
  const previewSectionId = new URLSearchParams(window.location.search).get("section");

  useEffect(() => {
    let active = true;
    const loadAppearance = () => (appearancePreview
      ? appearanceRepository.getPreviewSettings(previewSectionId)
      : appearanceRepository.getPublicSettings()
    ).then((settings) => {
      if (active) setAppearanceSettings(settings);
    }).catch((error) => {
      console.error("Could not load website appearance settings.", error);
    });
    loadAppearance();
    const onStorage = (event) => {
      if (!event.key || event.key.startsWith("synergy.websiteAppearance.")) loadAppearance();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      active = false;
      window.removeEventListener("storage", onStorage);
    };
  }, [appearancePreview, previewSectionId]);

  useEffect(() => {
    if (!appearancePreview || !previewSectionId || !appearanceSettings[previewSectionId]) return undefined;
    const section = getSectionDefinition(previewSectionId);
    if (!section) return undefined;
    const timer = window.setTimeout(() => {
      document.getElementById(section.anchor)?.scrollIntoView({ block: "start" });
    }, 100);
    return () => window.clearTimeout(timer);
  }, [appearancePreview, previewSectionId, appearanceSettings]);

  const sectionAppearance = (sectionId) => {
    const definition = getSectionDefinition(sectionId);
    const props = {
      "data-appearance-section": sectionId,
      style: appearanceStyleFor(sectionId, appearanceSettings),
    };
    if (definition.spacing.includes("cardPadding")) props["data-appearance-card-padding"] = "";
    if (definition.spacing.includes("paragraphButton")) props["data-appearance-paragraph-spacing"] = "";
    if (definition.spacing.includes("gridGap")) props["data-appearance-grid-gap"] = "";
    if (definition.spacing.includes("cardGap")) props["data-appearance-card-gap"] = "";
    if (definition.spacing.includes("imageText")) props["data-appearance-image-text"] = "";
    definition.typography.forEach((key) => {
      const attribute = key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
      props[`data-appearance-${attribute}`] = "";
    });
    return props;
  };

  // Dynamic Content States
  const [programmesList, setProgrammesList] = useState(initialProgrammes);
  const [fallbackGalleryItems, setGalleryItems] = useState(initialGalleryItems);
  const [fallbackImpactStats, setImpactStats] = useState({
    biogasPlants: "10,000*",
    districts: "10*",
    smokeFreeHomes: "10,000*",
    peopleBenefited: "50,000*",
  });

  // Admin Dynamic Form States
  const [newProg, setNewProg] = useState({ title: "", badge: "", shortDesc: "", image: "" });
  const [newPhoto, setNewPhoto] = useState({ category: "Biogas installations", caption: "", location: "", date: "2026", image: "" });

  // Contact Form State
  const [contactForm, setContactForm] = useState({ name: "", phone: "", message: "" });
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState("");
  const [contactBusy, setContactBusy] = useState(false);
  const [installationFilter, setInstallationFilter] = useState("All Installations");
  const [selectedInstallationProject, setSelectedInstallationProject] = useState(null);
  const [installationPhotoIndex, setInstallationPhotoIndex] = useState(0);
  const [joinForm, setJoinForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    interest: "",
    availability: "",
    experience: "",
    reason: "",
    consent: false,
  });
  const [joinSuccess, setJoinSuccess] = useState(false);
  const [joinError, setJoinError] = useState("");
  const [joinBusy, setJoinBusy] = useState(false);
  const mediaData = useRepository(mediaRepository);
  const projectData = useRepository(projectRepository);
  const impactData = useRepository(impactRepository);
  const impactChartData = useRepository(impactChartRepository);
  const storiesData = useRepository(storyRepository);
  const videoData = useRepository(videoRepository);
  const contactData = useRepository(contactRepository);
  const publicContact = contactData.records.find((contact) => contact.contactStatus === "active");
  const existingGalleryItems = mediaData.records.length
    ? mediaData.records.filter((item) => item.status === "approved").map((item) => ({
      id: item.id, category: item.category, caption: item.title, location: item.location,
      date: item.publishedAt, image: item.image,
    }))
    : fallbackGalleryItems;
  const existingGalleryImageNames = new Set(existingGalleryItems.map((item) => getGalleryImageName(item.image)));
  const galleryItems = [
    ...existingGalleryItems,
    ...movedGalleryItems.filter((item) => {
      const imageName = getGalleryImageName(item.image);
      if (existingGalleryImageNames.has(imageName)) return false;
      existingGalleryImageNames.add(imageName);
      return true;
    }),
  ];
  const impactStats = impactData.records.length
    ? (() => {
      const values = Object.fromEntries(impactData.records.map((item) => [item.id, `${item.value}${item.suffix || ""}`]));
      return {
        biogasPlants: values["impact-plants"] || "0",
        districts: values["impact-districts"] || "0",
        smokeFreeHomes: values["impact-homes"] || "0",
        peopleBenefited: values["impact-people"] || "0",
      };
    })()
    : fallbackImpactStats;

  const installationProjects = [
    { id: "biogas-photo-1", category: "Biogas Installation", title: "Brick-Dome Digester Construction", description: "The photograph shows a brick dome digester under construction, with the installation pit and masonry visible.", image: assetUrl("/images/biogas/BIO GAS INSTALL1.jpeg"), images: [assetUrl("/images/biogas/BIO GAS INSTALL1.jpeg")], imageAlt: "Brick dome biogas digester under construction at a rural site" },
    { id: "biogas-photo-2", category: "Biogas Installation", title: "Household Flexible Digester", description: "A resident stands beside a flexible biogas digester and its connected equipment at a household site.", image: assetUrl("/images/biogas/IMG2 BIO GAS.jpeg"), images: [assetUrl("/images/biogas/IMG2 BIO GAS.jpeg")], imageAlt: "Resident beside a flexible biogas digester and blue equipment drum" },
    { id: "biogas-photo-3", category: "Biogas Installation", title: "Brick-Dome Digester at an Installation Site", description: "The photograph shows a brick dome digester under construction with workers and community members at the site.", image: assetUrl("/images/biogas/IMG3BIOGAS.jpeg"), images: [assetUrl("/images/biogas/IMG3BIOGAS.jpeg")], imageAlt: "Workers and community members beside a brick dome digester under construction" },
    { id: "biogas-photo-4", category: "Biogas Installation", title: "Flexible Digester at a Home Site", description: "Two residents stand beside a flexible biogas digester in a garden setting.", image: assetUrl("/images/biogas/BIOGASIMG4.jpeg"), images: [assetUrl("/images/biogas/BIOGASIMG4.jpeg")], imageAlt: "Two residents beside a flexible biogas digester installed in a garden" },
  ];
  const installationCategories = ["All Installations", ...new Set(installationProjects.map((project) => project.category).filter(Boolean))];
  const visibleInstallationProjects = installationFilter === "All Installations"
    ? installationProjects
    : installationProjects.filter((project) => project.category === installationFilter);
  const storyCards = storiesData.records
    .filter((story) => story.status === "published")
    .map((story) => ({ ...story, date: story.publishedAt }));
  const publicVideos = videoData.records
    .filter((video) => video.status === "active" && video.publicationStatus === "published")
    .sort((left, right) => Number(left.displayOrder || 0) - Number(right.displayOrder || 0));
  const heroBackgroundVideo = publicVideos.find((video) => video.location === "hero");
  const heroVideoSource = heroBackgroundVideo?.videoUrl || HERO_BACKGROUND_VIDEO_URL;
  const heroVideoPoster = heroBackgroundVideo?.thumbnail || HERO_BACKGROUND_POSTER;
  const impactCards = impactData.records
    .filter((item) => item.isActive)
    .sort((left, right) => left.displayOrder - right.displayOrder)
    .map((item) => ({ label: item.title, value: item.value, suffix: item.suffix, note: item.description }));
  const impactGraphs = impactChartData.records[0] || {
    annualYears: ["2021", "2022", "2023", "2024", "2025"],
    annualInstallations: [42, 58, 76, 63, 88],
    growthYears: ["2021", "2022", "2023", "2024", "2025", "2026", "2027"],
    growthValues: [8, 23, 33, 51, 61, 78, 100],
  };
  const growthPoints = impactGraphs.growthValues.map((value, index) => ({
    x: 20 + (280 * index) / Math.max(1, impactGraphs.growthValues.length - 1),
    y: 150 - (Math.max(0, Math.min(100, Number(value))) * 1.18),
  }));
  const growthPath = growthPoints.map(({ x, y }, index) => `${index ? "L" : "M"}${x} ${y}`).join(" ");

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setPrefersReducedMotion(motionPreference.matches);
    motionPreference.addEventListener("change", updateMotionPreference);
    return () => motionPreference.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    const markDocumentReady = () => setDocumentReady(true);
    if (document.readyState === "complete") markDocumentReady();
    else window.addEventListener("load", markDocumentReady, { once: true });

    const minimumTimer = window.setTimeout(() => setLoaderMinimumElapsed(true), 420);
    const fallbackTimer = window.setTimeout(() => setLoaderFallbackElapsed(true), 8000);
    return () => {
      window.removeEventListener("load", markDocumentReady);
      window.clearTimeout(minimumTimer);
      window.clearTimeout(fallbackTimer);
    };
  }, []);

  useEffect(() => {
    if (activePage !== "home") {
      setHeroPosterReady(true);
      return undefined;
    }

    let active = true;
    const poster = new Image();
    const markPosterReady = () => {
      if (active) setHeroPosterReady(true);
    };
    poster.onload = markPosterReady;
    poster.onerror = markPosterReady;
    poster.src = HERO_BACKGROUND_POSTER;
    if (poster.complete) {
      poster.decode?.().catch(() => { }).finally(markPosterReady);
    }
    return () => {
      active = false;
      poster.onload = null;
      poster.onerror = null;
    };
  }, [activePage]);

  useEffect(() => {
    if (pageLoaderReady) return;
    const homepageVideoReady = activePage !== "home"
      || (!videoData.loading
        && (prefersReducedMotion
          || !heroVideoSource
          || readyHeroVideoSource === heroVideoSource
          || failedHeroVideoSource === heroVideoSource));
    const resourcesReady = documentReady
      && heroFontsReady
      && (activePage !== "home" || heroPosterReady)
      && homepageVideoReady;

    if (loaderFallbackElapsed || (loaderMinimumElapsed && resourcesReady)) {
      setPageLoaderReady(true);
    }
  }, [
    activePage,
    documentReady,
    failedHeroVideoSource,
    heroFontsReady,
    heroPosterReady,
    heroVideoSource,
    loaderFallbackElapsed,
    loaderMinimumElapsed,
    pageLoaderReady,
    prefersReducedMotion,
    readyHeroVideoSource,
    videoData.loading,
  ]);

  useEffect(() => {
    if (!document.fonts?.ready) return undefined;
    let active = true;
    document.fonts.ready.then(() => {
      if (active) setHeroFontsReady(true);
    });
    return () => { active = false; };
  }, []);

  // Load Bootstrap Icons; Bootstrap CSS is bundled locally in main.jsx.
  useEffect(() => {
    const icons = document.createElement("link");
    icons.rel = "stylesheet";
    icons.href = "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css";
    document.head.appendChild(icons);
  }, []);

  useEffect(() => {
    const playHeroVideo = () => {
      const v = document.querySelector(".hero-background-video");
      if (v && v.paused) {
        v.defaultMuted = true;
        v.muted = true;
        v.play().catch(() => { });
      }
    };
    window.addEventListener("click", playHeroVideo, { passive: true });
    window.addEventListener("touchstart", playHeroVideo, { passive: true });
    window.addEventListener("scroll", playHeroVideo, { passive: true });
    return () => {
      window.removeEventListener("click", playHeroVideo);
      window.removeEventListener("touchstart", playHeroVideo);
      window.removeEventListener("scroll", playHeroVideo);
    };
  }, []);

  // Handle legacy redirects on initial mount
  useEffect(() => {
    const path = window.location.pathname.replace(/\/+$/, "") || "/";
    const redirectAnchor = legacyInitiativeRedirects[path];
    if (redirectAnchor) {
      window.history.replaceState({ page: "home", anchor: redirectAnchor }, "", `/#${redirectAnchor}`);
    }
  }, []);

  useEffect(() => {
    if (!navigationTarget || navigationTarget.page !== activePage) return undefined;

    const scrollTimer = window.setTimeout(() => {
      const target = document.getElementById(navigationTarget.anchor);
      if (!target) {
        console.warn(`Navigation target "${navigationTarget.anchor}" was not found.`);
        return;
      }

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      setNavigationTarget(null);
    }, 120);

    return () => window.clearTimeout(scrollTimer);
  }, [activePage, navigationTarget, pageLoaderReady]);

  useEffect(() => {
    const handlePopState = (event) => {
      const page = event.state?.page || getPageFromLocation();
      const anchor = event.state?.anchor || window.location.hash.replace(/^#/, "") || null;
      setActivePage(page);
      setSelectedProgramme(null);
      setNavigationTarget(anchor ? { page, anchor, timestamp: Date.now() } : null);
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("hashchange", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("hashchange", handlePopState);
    };
  }, []);

  const navigatePage = (page, anchor) => {
    const routePath = pageRoutes[page] || "/";
    const fullAppPath = `${BASE_PATH}${routePath === "/" ? "" : routePath}` || "/";
    const fullUrl = anchor ? `${fullAppPath}#${anchor}` : fullAppPath;
    if (window.location.pathname !== fullAppPath || window.location.hash !== (anchor ? `#${anchor}` : "")) {
      window.history.pushState({ page, anchor }, "", fullUrl);
    }
    setActivePage(page);
    setSelectedProgramme(null);
    setNavigationTarget(anchor ? { page, anchor, timestamp: Date.now() } : null);
    if (!anchor) {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    }
  };

  return (
    <div className="synergy-app-shell text-dark m-0 p-0" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <SiteChrome isLoading={!pageLoaderReady} />
      <Navbar
        activePage={activePage}
        onNavigate={navigatePage}
      />

      {/* ================= MAIN CONTENT PAGES ================= */}
      <main className="synergy-main-content">
        {/* 1. HOME */}
        {activePage === "home" && (
          <div className="w-100" style={{ background: "#f5f1e7" }}>
            <section
              id="hero-section"
              className="hero-video-section position-relative overflow-hidden text-white"
              {...sectionAppearance("hero")}
              style={{
                ...sectionAppearance("hero").style,
                backgroundImage: `url("${HERO_BACKGROUND_POSTER}")`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                minHeight: "clamp(500px, 75vh, 640px)",
                display: "flex",
                alignItems: "center",
              }}
            >
              {heroVideoSource && failedHeroVideoSource !== heroVideoSource && (
                <video
                  key={heroVideoSource}
                  className="hero-background-video"
                  src={heroVideoSource}
                  poster={heroVideoPoster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  aria-hidden="true"
                  ref={(el) => {
                    if (el) {
                      el.defaultMuted = true;
                      el.muted = true;
                      if (el.paused) el.play().catch(() => { });
                    }
                  }}
                  onCanPlay={() => setReadyHeroVideoSource(heroVideoSource)}
                  onError={(event) => {
                    console.error(`Homepage hero video failed to load: ${event.currentTarget.currentSrc}`, event.currentTarget.error);
                    setFailedHeroVideoSource(heroVideoSource);
                  }}
                />
              )}
              <div className="hero-background-overlay" aria-hidden="true" />
              {(videoData.loading || (heroVideoSource
                && failedHeroVideoSource !== heroVideoSource
                && (readyHeroVideoSource !== heroVideoSource || !heroFontsReady))) && (
                  <div className="hero-video-loading" role="status" aria-label="Loading homepage video">
                    <span className="hero-video-loading__track" aria-hidden="true"><span /></span>
                    <span className="hero-video-loading__label">Loading</span>
                  </div>
                )}
              <div className="container-fluid px-4 px-md-5 py-5 hero-content">
                <div className="row align-items-center g-5" data-appearance-layout>
                  <div className="col-lg-7">
                    <AnimatedText
                      as="h1"
                      variant="word"
                      className="display-3 fw-bold mb-4 lh-tight"
                      delay={80}
                      stagger={85}
                      highlightWords={["Waste", "into", "Clean", "Energy."]}
                    >
                      Turning Organic Waste into Clean Energy.
                    </AnimatedText>
                    <AnimatedText as="p" variant="fade" delay={260} className="lead mb-4 text-light opacity-90 col-lg-10">
                      Turning local resources into lasting progress for families, women, and the environment.
                    </AnimatedText>
                    <AnimatedText as="div" variant="fade" delay={420} className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start">
                      <button
                        className="btn btn-warning btn-lg fw-bold px-4 py-3 rounded-pill shadow"
                        onClick={() => navigatePage("what-we-do")}
                      >
                        Explore Our Work
                      </button>
                      <button
                        className="btn btn-outline-light btn-lg px-4 py-3 rounded-pill"
                        onClick={() => navigatePage("about", "about-vision")}
                      >
                        Discover Our Mission
                      </button>
                    </AnimatedText>
                    <div className="d-flex flex-wrap gap-3 mt-4 text-light opacity-90">
                      <span className="fw-semibold"><i className="bi bi-check-circle-fill me-2 text-warning"></i>Renewable solutions</span>
                      <span className="fw-semibold"><i className="bi bi-check-circle-fill me-2 text-warning"></i>Healthier homes</span>
                      <span className="fw-semibold"><i className="bi bi-check-circle-fill me-2 text-warning"></i>Cleaner communities</span>
                    </div>
                  </div>

                  <div className="col-lg-5">
                    <div className="bg-white/10 border border-white/20 rounded-4 p-4 shadow-lg backdrop-blur-sm">
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <span className="badge bg-warning text-dark px-3 py-2 fw-semibold">Community Impact</span>
                        <span className="small text-light opacity-80">2026 Pipeline</span>
                      </div>
                      <div className="row g-3 text-center">
                        <div className="col-6">
                          <div className="bg-white/10 rounded-3 p-3 h-100">
                            <div className="display-6 fw-bold text-warning"><AnimatedCounter value={impactStats.biogasPlants} suffix="+" /></div>
                            <div className="small text-light opacity-80 mt-1">Plants</div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="bg-white/10 rounded-3 p-3 h-100">
                            <div className="display-6 fw-bold text-warning"><AnimatedCounter value={impactStats.districts} /></div>
                            <div className="small text-light opacity-80 mt-1">Districts</div>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="bg-white/8 rounded-3 p-3 text-start">
                            <div className="small text-light opacity-80 mb-2">Waste-to-energy flow</div>
                            <div className="hero-flow-indicators mb-2">
                              <span className="hero-flow-step">Organic waste</span>
                              <i className="bi bi-arrow-right hero-flow-arrow" aria-hidden="true"></i>
                              <span className="hero-flow-step">Biogas</span>
                              <i className="bi bi-arrow-right hero-flow-arrow" aria-hidden="true"></i>
                              <span className="hero-flow-step">Energy</span>
                            </div>
                            <div className="progress" style={{ height: "10px" }}>
                              <div className="progress-bar bg-warning" role="progressbar" style={{ width: "73%" }} aria-valuenow="73" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="hero-scroll-indicator scroll-indicator"
                type="button"
                aria-label="Scroll to Main Focus Areas"
                onClick={() => {
                  const nextSection = document.getElementById("main-focus-areas") || document.querySelector(".focus-showcase");
                  if (nextSection) {
                    nextSection.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }}
              >
                <ArrowDown size={20} strokeWidth={1.8} aria-hidden="true" />
              </button>
            </section>

            <FocusAreasShowcase onNavigate={navigatePage} />

            <section id="biogas" className="biogas-process-section" {...sectionAppearance("biogas")}>
              <div className="biogas-process-container">
                <header className="biogas-process-header">
                  <span className="biogas-process-eyebrow">Our Biogas Process</span>
                  <h2>From Organic Waste to Clean, Reliable Renewable Energy.</h2>
                  <div className="biogas-process-divider" />
                  <p>Discover how everyday organic waste becomes clean cooking fuel and nutrient-rich manure.</p>
                </header>
                <div className="biogas-process-layout">
                  <div className="biogas-process-image-column">
                    <figure className="biogas-installation-card">
                      <div className="biogas-process-image-frame">
                        <img src={assetUrl("/WhatsApp%20Image%202026-11-08%20at%203.21.33%20PM.jpeg")} alt="HomeBiogas digester installed in a garden beside a rural home" className="biogas-feature-photo" loading="lazy" />
                      </div>
                      <figcaption>
                        <span>Real Installation</span>
                        <h3>Community Biogas Installation</h3>
                        <p>An example of organic waste being converted into renewable energy.</p>
                      </figcaption>
                    </figure>
                  </div>
                  <div className="biogas-process-content">
                    <h3 className="biogas-steps-eyebrow">How It Works <span>— 5 Steps</span></h3>
                    <div className="biogas-process-cards">
                      {[
                        ["Organic Waste", "Collect cattle dung and household organic waste."],
                        ["Biogas Digester", "Organic material breaks down without oxygen."],
                        ["Clean Cooking Gas", "Generated biogas is supplied for cooking."],
                        ["Nutrient Slurry", "Digested slurry is collected as a by-product."],
                        ["Organic Farming", "Use nutrient-rich slurry to support soil health."],
                      ].map(([title, description], index) => (
                        <article className="biogas-process-card" key={title}>
                          <span className="biogas-process-number">{String(index + 1).padStart(2, "0")}</span>
                          <div className="biogas-process-copy">
                            <h4>{title}</h4>
                            <p>{description}</p>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="biogas-benefits" aria-label="Biogas benefits">
                  <div><Recycle aria-hidden="true" /><span>Waste Management</span></div>
                  <div><Flame aria-hidden="true" /><span>Clean Cooking</span></div>
                  <div><Sprout aria-hidden="true" /><span>Soil Improvement</span></div>
                </div>
                <div className="biogas-installations-cta">
                  <button type="button" onClick={() => document.getElementById("installation-plants")?.scrollIntoView({ behavior: "smooth" })}>
                    <span>Explore Our Biogas Installations</span>
                    <ArrowRight size={17} aria-hidden="true" />
                  </button>
                </div>
                <PublicVideoSection location="biogas" videos={publicVideos} />
              </div>
            </section>

            <section id="installation-plants" className="bg-[#eef4eb]" {...sectionAppearance("installation-plants")}>
              <div className="biogas-process-container installation-portfolio-shell">
                <header className="installation-portfolio-header">
                  <span>Our Projects</span>
                  <h2>Biogas Installations in Action</h2>
                  <div className="installation-header-divider" aria-hidden="true" />
                  <p>Explore our biogas installations, project developments and community clean-energy initiatives.</p>
                </header>
                <div className="installation-project-filters" aria-label="Filter biogas installations">
                  {installationCategories.map((filter) => <button key={filter} type="button" aria-pressed={installationFilter === filter} className={installationFilter === filter ? "is-active" : ""} onClick={() => setInstallationFilter(filter)}>{filter}</button>)}
                </div>
                <div className="installation-project-grid">
                  {visibleInstallationProjects.map((project) => (
                    <article className="installation-project-card" key={project.id}>
                      <div className="installation-project-image"><img src={project.image} alt={project.imageAlt || `${project.title} installation photograph`} loading="lazy" /></div>
                      <div className="installation-project-body">
                        {project.category && <span className="installation-project-category">{project.category}</span>}
                        <h3>{project.title}</h3>
                        {project.description && <p>{project.description}</p>}
                        <button type="button" className="installation-project-detail-link" onClick={() => { setSelectedInstallationProject(project); setInstallationPhotoIndex(0); }}>View Project Details <span aria-hidden="true">→</span></button>
                      </div>
                    </article>
                  ))}
                  {!visibleInstallationProjects.length && <p className="installation-project-empty">No published installation photographs match this filter yet.</p>}
                </div>
                {selectedInstallationProject && (
                  <div className="installation-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedInstallationProject(null); }}>
                    <section className="installation-project-modal" role="dialog" aria-modal="true" aria-labelledby="installation-modal-title" onKeyDown={(event) => { if (event.key === "Escape") setSelectedInstallationProject(null); }}>
                      <button type="button" className="installation-modal-close" aria-label="Close project details" onClick={() => setSelectedInstallationProject(null)}>×</button>
                      {(() => {
                        const photos = selectedInstallationProject.images?.length ? selectedInstallationProject.images : [selectedInstallationProject.image].filter(Boolean); return <>
                          {photos[installationPhotoIndex] && <img className="installation-modal-photo" src={photos[installationPhotoIndex]} alt={selectedInstallationProject.imageAlt || selectedInstallationProject.title} />}
                          {photos.length > 1 && <div className="installation-modal-gallery">{photos.map((photo, index) => <button key={`${photo}-${index}`} type="button" aria-label={`View project photograph ${index + 1}`} aria-pressed={installationPhotoIndex === index} onClick={() => setInstallationPhotoIndex(index)}><img src={photo} alt="" loading="lazy" /></button>)}</div>}
                        </>;
                      })()}
                      <div className="installation-modal-content">
                        {selectedInstallationProject.category && <span className="installation-project-category">{selectedInstallationProject.category}</span>}
                        <h2 id="installation-modal-title">{selectedInstallationProject.title}</h2>
                        {selectedInstallationProject.description && <p>{selectedInstallationProject.description}</p>}
                        <dl>
                          {selectedInstallationProject.location && <div><dt>Location</dt><dd>{selectedInstallationProject.location}</dd></div>}
                          {selectedInstallationProject.installationType && <div><dt>Installation Type</dt><dd>{selectedInstallationProject.installationType}</dd></div>}
                          {(selectedInstallationProject.plantCapacity || selectedInstallationProject.capacity) && <div><dt>Capacity</dt><dd>{selectedInstallationProject.plantCapacity || selectedInstallationProject.capacity}</dd></div>}
                          {selectedInstallationProject.installationDate && <div><dt>Installation Date</dt><dd>{selectedInstallationProject.installationDate}</dd></div>}
                          {selectedInstallationProject.technology && <div><dt>Technology</dt><dd>{selectedInstallationProject.technology}</dd></div>}
                        </dl>
                      </div>
                    </section>
                  </div>
                )}                <PublicVideoSection location="installation-plants" videos={publicVideos} />
              </div>
            </section>

            <section id="impact" className="synergy-section-padding bg-[#f5f1e7]" {...sectionAppearance("impact")}>
              <div className="container-fluid px-4 px-md-5">
                <div className="text-center mb-4">
                  <AnimatedText as="span" variant="underline" className="text-success text-uppercase fw-bold small">Our Impact</AnimatedText>
                  <AnimatedText as="h2" variant="line" className="fw-bold display-6 mt-3">Measured progress, cleaner energy and stronger communities.</AnimatedText>
                </div>

                <div className="row g-4 mb-5">
                  {impactCards.map((item) => (
                    <div className="col-md-6 col-xl-3" key={item.label}>
                      <div className="card border-0 shadow-sm rounded-4 h-100 p-4 text-center bg-white">
                        <div className="display-5 fw-bold text-success mb-2"><AnimatedCounter value={item.value} suffix={item.suffix} /></div>
                        <div className="fw-semibold text-dark mb-1">{item.label}</div>
                        <div className="small text-muted">{item.note}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="row g-4 align-items-stretch">
                  <div className="col-lg-4">
                    <div className="card border-0 shadow-sm rounded-4 h-100 p-4 bg-white">
                      <h5 className="fw-bold mb-4">Energy impact</h5>
                      <div className="d-flex justify-content-center">
                        <svg width="180" height="180" viewBox="0 0 180 180" aria-label="Energy impact progress">
                          <circle cx="90" cy="90" r="62" fill="none" stroke="#e7e6df" strokeWidth="14" />
                          <circle cx="90" cy="90" r="62" fill="none" stroke="#203C2B" strokeWidth="14" strokeLinecap="round" strokeDasharray="389.56" strokeDashoffset="103.5" transform="rotate(-90 90 90)" />
                          <text x="90" y="94" textAnchor="middle" fill="#203C2B" fontSize="30" fontWeight="700">73%</text>
                        </svg>
                      </div>
                      <p className="small text-muted text-center mt-3 mb-0">Clean cooking and household energy access improved across rural installations.</p>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="card border-0 shadow-sm rounded-4 h-100 p-4 bg-white">
                      <h5 className="fw-bold mb-4">Annual installations</h5>
                      <div className="d-flex align-items-end justify-content-between gap-2" style={{ height: "180px" }}>
                        {impactGraphs.annualInstallations.map((height, index) => (
                          <div key={impactGraphs.annualYears[index]} className="d-flex flex-column align-items-center justify-content-end w-100">
                            <div className="bg-success rounded-top" style={{ width: "100%", height: `${Math.max(0, Math.min(100, Number(height)))}%`, minHeight: "3px" }}></div>
                            <small className="mt-2 text-muted">{impactGraphs.annualYears[index]}</small>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="card border-0 shadow-sm rounded-4 h-100 p-4 bg-white">
                      <h5 className="fw-bold mb-4">Growth over time</h5>
                      <svg viewBox="0 0 320 180" width="100%" height="180" aria-label="Impact growth graph">
                        <path d={growthPath} fill="none" stroke="#203C2B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        {growthPoints.map(({ x, y }) => <circle key={`${x}-${y}`} cx={x} cy={y} r="5" fill="#DDAF4C" />)}
                      </svg>
                      <div className="d-flex justify-content-between small text-muted mt-2">
                        {impactGraphs.growthYears.map((year) => <span key={year}>{year}</span>)}
                      </div>
                    </div>
                  </div>
                </div>
                <PublicVideoSection location="impact" videos={publicVideos} />
              </div>
            </section>

            <section id="our-story" className="our-story-section" {...sectionAppearance("our-story")}>
              <div className="our-story-shell">
                <header className="our-story-header">
                  <span>Our Story</span>
                  <h2>A Rural Journey Shaped by Purpose, Clean Energy and Community Trust.</h2>
                  <p>Sustainable change begins by understanding local needs, working with communities and supporting practical solutions that fit everyday life.</p>
                </header>
                <div className="our-story-journey">
                  {[
                    "Understand the Community",
                    "Explore Practical Solutions",
                    "Support Implementation",
                    "Promote Sustainable Use",
                  ].map((step, index) => <article key={step}><span>{String(index + 1).padStart(2, "0")}</span><h3>{step}</h3></article>)}
                </div>
                <div className="our-story-editorial">
                  <div className="our-story-photo-stack">
                    <img className="our-story-main-photo" src={assetUrl("/images/story/IMG3BIOGAS.jpeg")} alt="Field team and community members beside a brick dome digester under construction" loading="lazy" />
                    <img className="our-story-detail-photo" src={assetUrl("/images/story/BIO GAS INSTALL1.jpeg")} alt="Community members at a biogas digester construction site" loading="lazy" />
                  </div>
                  <div className="our-story-principles">
                    <span className="our-story-kicker">What Guides Us</span>
                    <h3>Practical progress, shaped with communities.</h3>
                    <div className="our-story-values">
                      {[["Sustainability", "Solutions designed for lasting everyday use."], ["Community", "Local needs and knowledge at the centre."], ["Innovation", "Practical ideas for rural energy challenges."], ["Responsibility", "Clear, careful and respectful action."]].map(([title, description]) => <article key={title}><h4>{title}</h4><p>{description}</p></article>)}
                    </div>
                    <button type="button" className="our-story-cta" onClick={() => setActivePage("about")}>Read Our Full Story <span aria-hidden="true">→</span></button>
                  </div>
                </div>
                <div className="our-story-gallery">
                  <div><span className="our-story-kicker">Behind the Work</span><h3>Field moments</h3></div>
                  <div className="our-story-gallery-grid">
                    <img src={assetUrl("/images/story/IMG3BIOGAS.jpeg")} alt="Community members and field workers at a digester site" loading="lazy" />
                    <img src={assetUrl("/images/story/BIO GAS INSTALL1.jpeg")} alt="Brick dome biogas digester construction" loading="lazy" />
                    <img src={assetUrl("/images/story/WhatsApp Image 2026-11-08 at 3.21.40 PM.jpeg")} alt="Woman carrying gathered firewood outdoors" loading="lazy" />
                  </div>
                </div>
              </div>
            </section>

            <section id="join-our-team" className="join-premium-section" {...sectionAppearance("join-our-team")}>
              <div className="join-premium-shell">
                <header className="join-premium-header"><span>GET INVOLVED</span><h2>Join Thousands of Others Across the Country</h2><p>Giving your time means helping to give those most vulnerable a chance at the future they deserve.</p></header>
                <div className="join-premium-layout">
                  <div className="join-volunteer-content">
                    <h3>Your Skills. Our Mission. A Greener Future.</h3>
                    <div className="volunteer-opportunity-grid">
                      {[
                        [ClipboardList, "01", "Field Implementation", "Support rural surveys, household installations and community engagement."],
                        [UsersRound, "02", "Awareness & Training", "Contribute to workshops, learning sessions and capacity building."],
                        [Handshake, "03", "Community Engagement", "Help connect local communities with sustainable energy initiatives."],
                        [Megaphone, "04", "Communication & Outreach", "Support documentation, awareness campaigns and project communication."],
                      ].map(([Icon, number, title, description]) => <article className="volunteer-opportunity" key={number}><span>{number}</span><Icon aria-hidden="true" /><h4>{title}</h4><p>{description}</p></article>)}
                    </div>
                    <div className="join-why-card"><h4>Why Join Us?</h4><ul><li>Practical field experience</li><li>Community interaction</li><li>Sustainable development exposure</li><li>Opportunity to contribute your skills</li></ul></div>
                  </div>
                  <form className="synergy-public-form join-team-form" onSubmit={async (event) => {
                    event.preventDefault();
                    if (joinBusy) return;
                    setJoinBusy(true); setJoinError("");
                    try {
                      const reasonDetails = `${joinForm.reason}\n\nCity / District: ${joinForm.city}\nAvailability: ${joinForm.availability}\nContact consent: ${joinForm.consent ? "Yes" : "No"}`;
                      await volunteerRepository.create({ fullName: joinForm.name, email: joinForm.email, phone: joinForm.phone, areaOfInterest: joinForm.interest, experience: joinForm.experience, reason: reasonDetails, applicationStatus: "pending" });
                      setJoinSuccess(true);
                    } catch (error) { setJoinSuccess(false); setJoinError(error.message || "Unable to submit your application."); }
                    finally { setJoinBusy(false); }
                  }}>
                    <h3>Let’s Connect</h3><p>Tell us about yourself and how you would like to contribute.</p>
                    <div className="join-form-grid">
                      <label>Full Name *<input name="name" autoComplete="name" required value={joinForm.name} onChange={(e) => setJoinForm({ ...joinForm, name: e.target.value })} /></label>
                      <label>Email Address *<input name="email" type="email" autoComplete="email" required value={joinForm.email} onChange={(e) => setJoinForm({ ...joinForm, email: e.target.value })} /></label>
                      <label>Phone Number *<input name="phone" type="tel" autoComplete="tel" pattern="[+0-9() .-]{7,20}" title="Enter a valid phone number" required value={joinForm.phone} onChange={(e) => setJoinForm({ ...joinForm, phone: e.target.value })} /></label>
                      <label>City / District *<input name="city" autoComplete="address-level2" required value={joinForm.city} onChange={(e) => setJoinForm({ ...joinForm, city: e.target.value })} /></label>
                      <label>Area of Interest *<select required value={joinForm.interest} onChange={(e) => setJoinForm({ ...joinForm, interest: e.target.value })}><option value="">Choose an area</option><option>Field Implementation</option><option>Awareness & Training</option><option>Community Engagement</option><option>Communication & Outreach</option></select></label>
                      <label>Availability *<select required value={joinForm.availability} onChange={(e) => setJoinForm({ ...joinForm, availability: e.target.value })}><option value="">Choose availability</option><option>Weekdays</option><option>Weekends</option><option>Flexible</option></select></label>
                      <label className="join-form-wide">Skills / Experience *<input required value={joinForm.experience} onChange={(e) => setJoinForm({ ...joinForm, experience: e.target.value })} /></label>
                      <label className="join-form-wide">Why do you want to join us? *<textarea rows="3" required value={joinForm.reason} onChange={(e) => setJoinForm({ ...joinForm, reason: e.target.value })} /></label>
                    </div>
                    <label className="join-consent"><input type="checkbox" required checked={joinForm.consent} onChange={(e) => setJoinForm({ ...joinForm, consent: e.target.checked })} /><span>I agree to be contacted regarding volunteer opportunities.</span></label>
                    <div className="join-submit-row"><button type="submit" disabled={joinBusy}>{joinBusy ? "Submitting…" : "Submit Application →"}</button>{joinSuccess && <span role="status">{serviceMode === "mock" ? "Demo application saved in this browser." : "Your application has been submitted."}</span>}{joinError && <span role="alert">{joinError}</span>}</div>
                  </form>
                </div>
              </div>
            </section>

            <FindOurLocation />
          </div>
        )}

        {/* 2. ABOUT */}
        {activePage === "about" && (
          <About onNavigate={(page) => setActivePage(page)} />
        )}

        {activePage === "what-we-do" && (
          <WhatWeDo onNavigate={navigatePage} />
        )}

        {activePage === "initiative-biogas-clean-energy" && (
          <BiogasCleanEnergy onNavigate={navigatePage} />
        )}
        {activePage === "initiative-women-empowerment" && (
          <WomenEmpowerment onNavigate={navigatePage} />
        )}
        {activePage === "initiative-skill-development" && (
          <SkillDevelopment onNavigate={navigatePage} />
        )}
        {activePage === "biogas-understanding" && (
          <UnderstandingBiogas onNavigate={navigatePage} />
        )}
        {activePage === "biogas-how-it-works" && (
          <HowBiogasWorks onNavigate={navigatePage} />
        )}
        {activePage === "biogas-solutions" && (
          <BiogasSolutions onNavigate={navigatePage} />
        )}
        {activePage === "biogas-benefits" && (
          <BiogasBenefits onNavigate={navigatePage} />
        )}

        {/* 3. PROGRAMMES */}
        {activePage === "programmes" && (
          <div className="container-fluid px-4 px-md-5 synergy-section-padding w-100">
            {selectedProgramme ? (
              <div>
                <button
                  className="btn btn-sm btn-outline-secondary mb-4 px-3 py-2 rounded-pill"
                  onClick={() => setSelectedProgramme(null)}
                >
                  <i className="bi bi-arrow-left me-1"></i> Back to All Programmes
                </button>
                <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                  <img
                    src={selectedProgramme.image}
                    alt={selectedProgramme.imageAlt || selectedProgramme.title}
                    style={{ height: 380, objectFit: "cover" }}
                  />
                  <div className="card-body p-5">
                    <span className="badge bg-success mb-3 px-3 py-2">{selectedProgramme.badge}</span>
                    <AnimatedText as="h2" variant="word" className="fw-bold display-6 mb-3">{selectedProgramme.title}</AnimatedText>
                    <AnimatedText as="p" variant="fade" delay={100} className="lead text-muted mb-4">{selectedProgramme.shortDesc}</AnimatedText>
                    {(selectedProgramme.problem || selectedProgramme.solution) && (
                      <div className="row g-4 my-3">
                        {selectedProgramme.problem && (
                          <div className="col-md-6">
                            <div className="p-4 bg-light rounded-4 border-0 h-100">
                              <AnimatedText as="h6" variant="line" className="fw-bold text-danger mb-2">The Problem</AnimatedText>
                              <AnimatedText as="p" variant="fade" delay={90} className="small text-muted mb-0">{selectedProgramme.problem}</AnimatedText>
                            </div>
                          </div>
                        )}
                        {selectedProgramme.solution && (
                          <div className="col-md-6">
                            <div className="p-4 bg-light rounded-4 border-0 h-100">
                              <AnimatedText as="h6" variant="line" className="fw-bold text-success mb-2">The Solution</AnimatedText>
                              <AnimatedText as="p" variant="fade" delay={90} className="small text-muted mb-0">{selectedProgramme.solution}</AnimatedText>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    {selectedProgramme.activities?.length > 0 && (
                      <>
                        <AnimatedText as="h5" variant="line" className="fw-bold mt-5 mb-3">Key Field Activities</AnimatedText>
                        <ul className="list-group list-group-flush mb-4">
                          {selectedProgramme.activities.map((a, i) => (
                            <li key={i} className="list-group-item bg-transparent px-0 py-2">
                              <i className="bi bi-check-circle-fill text-success me-2"></i> {a}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                    <button
                      className="btn btn-success btn-lg fw-bold px-4 py-3 rounded-pill"
                      onClick={() => setActivePage("contact")}
                    >
                      Request Partnership Support <i className="bi bi-arrow-right ms-2"></i>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <OurProgrammes onNavigate={navigatePage} />
            )}
          </div>
        )}

        {/* 4. IMPACT */}
        {activePage === "impact" && (
          <Impact impactStats={impactStats} />
        )}

        {/* 5. OUR GALLERY */}
        {activePage === "gallery" && (
          <div className="container-fluid px-4 px-md-5 synergy-section-padding w-100">
            <div className="text-center mb-5" id="gallery-archive">
              <AnimatedText as="span" variant="character" className="badge bg-success-subtle text-success px-3 py-2 fw-semibold mb-2">VISUAL PROGRESS</AnimatedText>
              <AnimatedText as="h1" variant="word" className="fw-bold display-5 mb-2">Our Gallery</AnimatedText>
              <AnimatedText as="p" variant="fade" delay={100} className="text-muted">Moments that reflect our work and impact.</AnimatedText>
            </div>

            <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
              {["All", ...new Set(galleryItems.map((item) => item.category).filter(Boolean))].map(
                (cat) => (
                  <button
                    key={cat}
                    className={`btn btn-sm px-3 py-2 rounded-pill ${galleryCategory === cat ? "btn-success shadow-sm" : "btn-outline-secondary bg-white"
                      }`}
                    onClick={() => setGalleryCategory(cat)}
                  >
                    {cat}
                  </button>
                )
              )}
            </div>

            <div className="row g-4">
              {galleryItems
                .filter((item) => galleryCategory === "All" || item.category === galleryCategory)
                .map((item) => (
                  <div className="col-md-4" key={item.id}>
                    <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.caption}
                        style={{ height: 240, objectFit: "cover" }}
                        className="card-img-top"
                        loading="lazy"
                      />
                      <div className="card-body p-4">
                        <span className="badge bg-success-subtle text-success mb-2 px-3 py-1">{item.category}</span>
                        <AnimatedText as="h6" variant="line" className="fw-bold mb-2">{item.caption}</AnimatedText>
                        {item.location || item.date ? <AnimatedText as="p" variant="fade" delay={90} className="small text-muted mb-0">{item.location ? <span><i className="bi bi-geo-alt me-1 text-danger"></i>{item.location}</span> : null}{item.location && item.date ? " · " : null}{item.date}</AnimatedText> : null}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="row g-3 mt-4">
              <section className="col-md-4" id="news-events">
                <div className="h-100 border-top border-success border-2 bg-white p-4">
                  <AnimatedText as="span" variant="underline" className="small text-uppercase text-success fw-semibold">News & Events</AnimatedText>
                  <AnimatedText as="h2" variant="line" className="h5 mt-2">Field updates</AnimatedText>
                  <AnimatedText as="p" variant="fade" delay={90} className="small text-muted mb-0">
                    Upcoming events and news from our communities will be shared here.
                  </AnimatedText>
                </div>
              </section>
              <section className="col-md-4" id="success-stories">
                <div className="h-100 border-top border-success border-2 bg-white p-4">
                  <AnimatedText as="span" variant="underline" className="small text-uppercase text-success fw-semibold">Success Stories</AnimatedText>
                  <AnimatedText as="h2" variant="line" className="h5 mt-2">Progress from the field</AnimatedText>
                  <AnimatedText as="p" variant="fade" delay={90} className="small text-muted mb-0">
                    Stories of community-led progress will be added here as they are documented.
                  </AnimatedText>
                </div>
              </section>
              <section className="col-md-4" id="community-stories">
                <div className="h-100 border-top border-success border-2 bg-white p-4">
                  <AnimatedText as="span" variant="underline" className="small text-uppercase text-success fw-semibold">Community Stories</AnimatedText>
                  <AnimatedText as="h2" variant="line" className="h5 mt-2">Voices from our communities</AnimatedText>
                  <AnimatedText as="p" variant="fade" delay={90} className="small text-muted mb-0">
                    Community voices and experiences will be featured here.
                  </AnimatedText>
                </div>
              </section>
            </div>
          </div>
        )}

        {/* 6. PARTNER WITH US */}
        {(activePage === "get-involved" || activePage === "partner-with-us") && (
          <PartnerWithUs />
        )}

        {(activePage === "login" || activePage === "register") && (
          <AuthPage key={activePage} mode={activePage} onNavigate={navigatePage} />
        )}

        {/* 7. PARTNERSHIP & SUPPORT */}
        {activePage === "donate" && (
          <div className="container-fluid px-4 px-md-5 synergy-section-padding w-100">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                  <div className="card-header bg-success text-white p-4">
                    <AnimatedText as="h3" variant="line" className="fw-bold mb-1">Support and Partnerships</AnimatedText>
                    <AnimatedText as="p" variant="fade" delay={90} className="small mb-0 opacity-90">
                      Financial and programme support details are confirmed only after the organization verifies them.
                    </AnimatedText>
                  </div>
                  <div className="card-body p-4 p-md-5">
                    <p className="lead text-muted mb-4">
                      This website does not process live online payments. For partnerships, volunteering, programme support,
                      or beneficiary enquiries, please use the contact form and provide the relevant context.
                    </p>
                    <div className="row g-3 mb-4">
                      <div className="col-md-6">
                        <div className="border rounded-4 p-3 h-100 bg-light">
                          <h5 className="fw-bold mb-2 text-success">Volunteer</h5>
                          <p className="small text-muted mb-0">Support awareness drives, training sessions, and field documentation.</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="border rounded-4 p-3 h-100 bg-light">
                          <h5 className="fw-bold mb-2 text-success">CSR & Partnerships</h5>
                          <p className="small text-muted mb-0">Explore joint initiatives for clean energy, women empowerment, and rural livelihoods.</p>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex flex-wrap gap-3">
                      <button className="btn btn-success fw-bold px-4 py-3 rounded-pill" onClick={() => setActivePage("contact")}>
                        Contact the Team
                      </button>
                      <button className="btn btn-outline-success px-4 py-3 rounded-pill" onClick={() => setActivePage("get-involved")}>
                        Explore Opportunities
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activePage === "donor-checkout" && (
          <Donate
            programmes={programmesList}
            onReturn={() => navigatePage("home")}
          />
        )}

        {/* 8. CONTACT */}
        {activePage === "contact" && (
          <div className="container-fluid px-4 px-md-5 synergy-section-padding w-100">
            <div className="row g-5">
              <div className="col-lg-6">
                <AnimatedText as="h2" variant="blur" className="fw-bold mb-3">Interested in discussing?</AnimatedText>
                <AnimatedText as="p" variant="fade" delay={100} className="text-muted mb-4">Have questions about biogas installation or volunteering? Send us an enquiry.</AnimatedText>
                {publicContact && <p className="small text-muted">{publicContact.email}{publicContact.phone ? ` · ${publicContact.phone}` : ""}{publicContact.address ? ` · ${publicContact.address}` : ""}</p>}
                {contactSuccess && (
                  <div className="alert alert-success rounded-3 mb-4" role="status">
                    {serviceMode === "mock" ? "Demo enquiry saved in this browser." : "Your enquiry has been sent."}
                  </div>
                )}
                {contactError && <div className="alert alert-danger rounded-3 mb-4" role="alert">{contactError}</div>}
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (contactBusy) return;
                    setContactBusy(true);
                    setContactError("");
                    try {
                      await enquiryRepository.create({
                        fullName: contactForm.name,
                        email: "",
                        phone: contactForm.phone,
                        location: contactForm.message,
                        plantType: "General contact",
                        message: contactForm.message,
                        enquiryStatus: "new",
                      });
                      setContactSuccess(true);
                    } catch (error) {
                      setContactSuccess(false);
                      setContactError(error.message || "Unable to save this demo contact request.");
                    } finally {
                      setContactBusy(false);
                    }
                  }}
                  className="synergy-public-form card border-0 shadow-sm rounded-4 p-4"
                >
                  <div className="mb-3">
                    <label className="form-label small fw-bold" htmlFor="contact-name">Your Name *</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      className="form-control"
                      autoComplete="name"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-bold" htmlFor="contact-phone">Phone / WhatsApp *</label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      className="form-control"
                      autoComplete="tel"
                      required
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-bold" htmlFor="contact-message">Message / Village Location *</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      className="form-control"
                      rows="4"
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-success fw-bold py-2 rounded-pill animated-cta-button" disabled={contactBusy}>
                    {contactBusy ? "Submitting..." : "Submit Enquiry"}
                  </button>
                </form>
              </div>

              <div className="col-lg-6">
                <AnimatedText as="h2" variant="line" className="fw-bold mb-3">Frequently Asked Questions</AnimatedText>
                <div className="accordion" id="faqAcc">
                  {[
                    {
                      q: "What is Synergy Organization and where does it work?",
                      a: "Synergy Organization is an NGO working in rural Karnataka and Maharashtra focusing on biogas clean energy, sustainable agriculture, environmental awareness, women empowerment, and youth skill development.",
                    },
                    {
                      q: "What is a biogas plant and how does it work?",
                      a: "A biogas plant processes cattle dung and household organic wet waste inside an oxygen-free tank to generate clean cooking gas and nutrient-rich organic manure slurry.",
                    },
                    {
                      q: "Does the organisation provide training or follow-up support?",
                      a: "Yes. Synergy follows a 5-step approach: Plan, Train, Monitor, Support, and Report—providing ongoing guidance after installation.",
                    },
                  ].map((f, i) => (
                    <div className="accordion-item mb-3 border-0 shadow-sm rounded-4 overflow-hidden" key={i}>
                      <h2 className="accordion-header">
                        <button className="accordion-button collapsed fw-semibold bg-white py-3" type="button">
                          {f.q}
                        </button>
                      </h2>
                      <div className="accordion-body small text-muted bg-white pb-3">{f.a}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3">
              <FindOurLocation />
            </div>
          </div>
        )}

        {/* 9. CONTENT MANAGEMENT DASHBOARD */}
        {activePage === "admin" && (
          <div className="container-fluid px-4 px-md-5 synergy-section-padding w-100">
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
              <div>
                <span className="badge bg-info text-dark mb-1 px-3 py-1">STAFF PORTAL</span>
                <h2 className="fw-bold mb-0">NGO Content Management Dashboard</h2>
              </div>
            </div>

            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
              <h6 className="fw-bold mb-3">Update public impact counters</h6>
              <div className="row g-3">
                <div className="col-6 col-md-3">
                  <label className="small text-muted mb-1">Biogas Plants</label>
                  <input
                    className="form-control"
                    value={impactStats.biogasPlants}
                    onChange={(e) => setImpactStats({ ...impactStats, biogasPlants: e.target.value })}
                  />
                </div>
                <div className="col-6 col-md-3">
                  <label className="small text-muted mb-1">Districts</label>
                  <input
                    className="form-control"
                    value={impactStats.districts}
                    onChange={(e) => setImpactStats({ ...impactStats, districts: e.target.value })}
                  />
                </div>
                <div className="col-6 col-md-3">
                  <label className="small text-muted mb-1">Smoke-Free Homes</label>
                  <input
                    className="form-control"
                    value={impactStats.smokeFreeHomes}
                    onChange={(e) => setImpactStats({ ...impactStats, smokeFreeHomes: e.target.value })}
                  />
                </div>
                <div className="col-6 col-md-3">
                  <label className="small text-muted mb-1">People Benefited</label>
                  <input
                    className="form-control"
                    value={impactStats.peopleBenefited}
                    onChange={(e) => setImpactStats({ ...impactStats, peopleBenefited: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* DYNAMIC PROGRAMME MANAGEMENT */}
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
              <h5 className="fw-bold mb-3 text-success">Add / Manage Programmes Dynamically</h5>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (newProg.title) {
                    setProgrammesList([
                      ...programmesList,
                      {
                        id: "prog-" + Date.now(),
                        title: newProg.title,
                        badge: newProg.badge || "New Initiative",
                        shortDesc: newProg.shortDesc || "Community development program.",
                        problem: "Identified local rural challenge.",
                        solution: "Implementation through community participation.",
                        activities: ["Field assessment", "Community outreach"],
                        image: newProg.image || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=900&q=80",
                      },
                    ]);
                    setNewProg({ title: "", badge: "", shortDesc: "", image: "" });
                  }
                }}
                className="row g-3"
              >
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Programme Title"
                    value={newProg.title}
                    onChange={(e) => setNewProg({ ...newProg, title: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Badge (e.g. Flagship)"
                    value={newProg.badge}
                    onChange={(e) => setNewProg({ ...newProg, badge: e.target.value })}
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Short Description"
                    value={newProg.shortDesc}
                    onChange={(e) => setNewProg({ ...newProg, shortDesc: e.target.value })}
                  />
                </div>
                <div className="col-md-2">
                  <button type="submit" className="btn btn-success w-100 fw-bold rounded-pill">
                    Add Programme
                  </button>
                </div>
              </form>
            </div>

            {/* DYNAMIC GALLERY MANAGEMENT */}
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
              <h5 className="fw-bold mb-3 text-success">Add Photo to Our Gallery Dynamically</h5>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (newPhoto.caption && newPhoto.image) {
                    setGalleryItems([
                      {
                        id: Date.now(),
                        category: newPhoto.category,
                        caption: newPhoto.caption,
                        location: newPhoto.location || "Karnataka / Maharashtra",
                        date: newPhoto.date || "2026",
                        image: newPhoto.image,
                      },
                      ...galleryItems,
                    ]);
                    setNewPhoto({ category: "Biogas installations", caption: "", location: "", date: "2026", image: "" });
                  }
                }}
                className="row g-3"
              >
                <div className="col-md-3">
                  <select
                    className="form-select"
                    value={newPhoto.category}
                    onChange={(e) => setNewPhoto({ ...newPhoto, category: e.target.value })}
                  >
                    <option value="Biogas installations">Biogas installations</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Environment">Environment</option>
                    <option value="Women empowerment">Women empowerment</option>
                    <option value="Youth development">Youth development</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Photo Caption"
                    value={newPhoto.caption}
                    onChange={(e) => setNewPhoto({ ...newPhoto, caption: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="url"
                    className="form-control"
                    placeholder="Image URL"
                    value={newPhoto.image}
                    onChange={(e) => setNewPhoto({ ...newPhoto, image: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-2">
                  <button type="submit" className="btn btn-success w-100 fw-bold rounded-pill">
                    Add to Gallery
                  </button>
                </div>
              </form>
            </div>

          </div>
        )}
      </main>

      <Footer publicContact={publicContact} />
    </div>
  );
}

export default function App() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const updatePath = () => setPath(window.location.pathname);
    window.addEventListener("popstate", updatePath);
    return () => window.removeEventListener("popstate", updatePath);
  }, []);
  const openPublicSite = () => {
    window.history.pushState({}, "", "/");
    setPath("/");
  };
  return path.startsWith("/admin")
    ? <AdminPanel key="admin" onPublicHome={openPublicSite} />
    : <PublicWebsite key="public" />;
}




