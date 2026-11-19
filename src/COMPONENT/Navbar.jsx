import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  Flame,
  GraduationCap,
  House,
  Images,
  Leaf,
  Menu,
  Sprout,
  UsersRound,
  X,
} from "lucide-react";
import { assetUrl } from "../utils/assetUrl";
import "./Navbar.css";

const navigationItems = [
  { type: "link", label: "Home", page: "home" },
  { type: "link", label: "Impact", page: "impact" },
  {
    type: "menu",
    label: "Our Initiatives",
    page: "initiatives",
    eyebrow: "OUR INITIATIVES",
    description: "Discover how we work towards cleaner energy, healthier homes and stronger rural communities.",
    items: [
      {
        label: "Biogas for Clean Energy",
        page: "initiative-biogas-clean-energy",
        route: "/initiatives/biogas-clean-energy",
        icon: Flame,
      },
      {
        label: "Sustainable Agriculture",
        page: "initiative-agriculture",
        route: "/initiatives/sustainable-agriculture",
        icon: Sprout,
      },
      {
        label: "Environmental Campaigns",
        page: "initiative-environment",
        route: "/initiatives/environmental-campaign",
        icon: Leaf,
      },
      {
        label: "Women Empowerment",
        page: "initiative-women-empowerment",
        route: "/initiatives/women-empowerment",
        icon: UsersRound,
      },
      {
        label: "Youth Skill Development",
        page: "initiative-skill-development",
        route: "/initiatives/skill-development",
        icon: GraduationCap,
      },
    ],
  },
  {
    type: "menu",
    label: "Discover",
    page: "about",
    eyebrow: "THE ORGANIZATION",
    description: "Get to know the people and principles behind our work.",
    items: [
      { label: "About Us", page: "about", anchor: "about-story", icon: BookOpen },
      { label: "Vision & Mission", page: "about", anchor: "about-vision", icon: Sprout },
      { label: "Our Team", page: "about", anchor: "about-team", icon: UsersRound },
      { label: "Our Values", page: "about", anchor: "about-values", icon: Check },
      { label: "Our Gallery", page: "gallery", anchor: "gallery-archive", icon: Images },
    ],
  },
];

function isActive(item, activePage = "") {
  if (item.label === "Our Initiatives") {
    return activePage === "initiatives" || activePage.startsWith("initiative-");
  }
  if (item.label === "Discover") {
    return activePage === "about" || activePage === "gallery";
  }
  return item.page === activePage;
}

function Brand({ onNavigate }) {
  return (
    <a
      className="synergy-brand d-inline-flex align-items-center"
      href="#home"
      onClick={(event) => {
        event.preventDefault();
        onNavigate("home");
      }}
      aria-label="Synergy Organization home"
    >
      <img
        className="synergy-brand__logo"
        src={assetUrl("/synergy-organization-logo.svg")}
        alt="Synergy Organization"
      />
    </a>
  );
}

function NavigationLink({ item, onNavigate, onClose, mobile = false }) {
  const Icon = item.icon;
  const linkClass = mobile ? "synergy-mobile-link" : "synergy-dropdown-link";
  const href = item.route || (item.anchor ? `/#${item.anchor}` : `#${item.page}`);

  return (
    <a
      className={`${linkClass}${item.description ? ` ${linkClass}--detailed` : ""}`}
      href={href}
      onClick={(event) => {
        event.preventDefault();
        onNavigate(item.page, item.anchor);
        onClose();
      }}
    >
      {Icon && (
        <span className={mobile ? "synergy-mobile-link__icon" : "synergy-dropdown-link__icon"} aria-hidden="true">
          <Icon size={17} strokeWidth={1.7} />
        </span>
      )}
      {item.description ? (
        <span className={`${linkClass}__content`}>
          <span className={`${linkClass}__title`}>{item.label}</span>
          <span className={`${linkClass}__description`}>{item.description}</span>
        </span>
      ) : (
        <span>{item.label}</span>
      )}
      {mobile && <ArrowUpRight className="synergy-mobile-link__arrow" size={16} aria-hidden="true" />}
      {!mobile && <ArrowUpRight className="synergy-dropdown-link__arrow" size={15} aria-hidden="true" />}
    </a>
  );
}

export default function Navbar({ activePage = "", onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mobileOpenMenu, setMobileOpenMenu] = useState(null);
  const menuRef = useRef(null);
  const mobileCloseRef = useRef(null);
  const mobileTriggerRef = useRef(null);
  const hoverOpenedMenuRef = useRef(false);
  const closeMenuTimerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setIsMobileOpen(false);
        setMobileOpenMenu(null);
      }

      if (event.key === "Tab" && isMobileOpen && menuRef.current) {
        const focusableElements = menuRef.current.querySelectorAll(
          "a[href], button:not([disabled])"
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileOpen]);

  useEffect(() => {
    if (!isMobileOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const mobileTrigger = mobileTriggerRef.current;
    document.body.style.overflow = "hidden";
    mobileCloseRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      mobileTrigger?.focus();
    };
  }, [isMobileOpen]);

  const navigate = (page, anchor) => {
    setOpenMenu(null);
    setMobileOpenMenu(null);
    setIsMobileOpen(false);
    onNavigate(page, anchor);
  };

  const openDonate = () => {
    setOpenMenu(null);
    setMobileOpenMenu(null);
    setIsMobileOpen(false);
    onNavigate("get-involved");
  };

  const renderDesktopMenu = (item) => {
    const expanded = openMenu === item.label;

    return (
      <div
        className={`synergy-nav-group${expanded ? " is-open" : ""}`}
        key={item.label}
        onMouseEnter={() => {
          window.clearTimeout(closeMenuTimerRef.current);
          hoverOpenedMenuRef.current = true;
          setOpenMenu(item.label);
        }}
        onMouseLeave={() => {
          closeMenuTimerRef.current = window.setTimeout(() => {
            hoverOpenedMenuRef.current = false;
            setOpenMenu((currentMenu) => (currentMenu === item.label ? null : currentMenu));
          }, 180);
        }}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setOpenMenu(null);
        }}
      >
        <button
          className={`synergy-nav-trigger${isActive(item, activePage) ? " is-active" : ""}`}
          type="button"
          aria-expanded={expanded}
          aria-controls={`synergy-menu-${item.label.replaceAll(" ", "-").toLowerCase()}`}
          onClick={() => {
            const openedByHover = hoverOpenedMenuRef.current;
            hoverOpenedMenuRef.current = false;
            setOpenMenu(expanded && !openedByHover ? null : item.label);
          }}
        >
          {item.label}
          <ChevronDown size={14} strokeWidth={1.8} aria-hidden="true" />
        </button>
        <div
          className="synergy-dropdown"
          id={`synergy-menu-${item.label.replaceAll(" ", "-").toLowerCase()}`}
          aria-hidden={!expanded}
          onMouseEnter={() => window.clearTimeout(closeMenuTimerRef.current)}
        >
          <div className="synergy-dropdown__intro">
            <span>{item.eyebrow}</span>
            <p>{item.description}</p>
          </div>
          <div className="synergy-dropdown__links">
            {item.items.map((subItem) => (
              <NavigationLink
                key={subItem.label}
                item={subItem}
                onNavigate={navigate}
                onClose={() => setOpenMenu(null)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <header className={`synergy-header${isScrolled ? " is-scrolled" : ""}`}>
      <div className="synergy-announcement">
        <span className="synergy-announcement__mark" aria-hidden="true" />
        <p>Creating Sustainable Communities Through Clean Energy</p>
        <span className="synergy-announcement__note">
          RURAL DEVELOPMENT <i aria-hidden="true">/</i> CLEAN ENERGY
        </span>
      </div>

      <nav className="navbar navbar-expand-lg synergy-navigation p-0" aria-label="Main navigation">
        <div className="container-fluid px-3 px-lg-4 px-xl-5">
          <div className="synergy-navigation__inner d-flex align-items-center justify-content-between w-100">
            <div className="d-flex align-items-center flex-shrink-0">
              <Brand onNavigate={navigate} />
            </div>

            <div
              className="synergy-desktop-nav d-none d-lg-flex align-items-center justify-content-center mx-auto gap-3 gap-xl-4 flex-nowrap"
              role="navigation"
              aria-label="Desktop menu"
            >
              {navigationItems.map((item) =>
                item.type === "link" ? (
                  <a
                    className={`synergy-nav-link${isActive(item, activePage) ? " is-active" : ""}`}
                    href={`#${item.page}`}
                    key={item.label}
                    aria-current={isActive(item, activePage) ? "page" : undefined}
                    onClick={(event) => {
                      event.preventDefault();
                      navigate(item.page);
                    }}
                  >
                    {item.label}
                  </a>
                ) : (
                  renderDesktopMenu(item)
                )
              )}
            </div>

            <div className="d-none d-lg-flex align-items-center gap-2 flex-shrink-0">
              <button
                className="synergy-donate-link"
                type="button"
                onClick={() => navigate("donor-checkout")}
              >
                Donate securely
              </button>
              <button className="synergy-donate-link" type="button" onClick={openDonate}>
                Partner With Us <ArrowUpRight size={16} aria-hidden="true" />
              </button>
            </div>

            <button
              className="navbar-toggler synergy-menu-toggle d-lg-none"
              type="button"
              aria-label="Open navigation menu"
              aria-expanded={isMobileOpen}
              aria-controls="synergy-mobile-navigation"
              ref={mobileTriggerRef}
              onClick={() => setIsMobileOpen(true)}
            >
              <Menu size={23} strokeWidth={1.7} aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>

      {isMobileOpen && (
        <div
          className="synergy-mobile-overlay"
          onClick={(event) => {
            if (event.target === event.currentTarget) setIsMobileOpen(false);
          }}
        >
          <div
            className="synergy-mobile-drawer"
            id="synergy-mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            ref={menuRef}
          >
            <div className="synergy-mobile-drawer__top">
              <Brand onNavigate={navigate} />
              <button
                className="synergy-mobile-close"
                type="button"
                aria-label="Close navigation menu"
                ref={mobileCloseRef}
                onClick={() => setIsMobileOpen(false)}
              >
                <X size={21} strokeWidth={1.7} aria-hidden="true" />
              </button>
            </div>

            <div className="synergy-mobile-drawer__label">EXPLORE SYNERGY</div>
            <nav className="synergy-mobile-nav" aria-label="Mobile navigation">
              {navigationItems.map((item) => {
                if (item.type === "link") {
                  return (
                    <a
                      className={`synergy-mobile-direct${isActive(item, activePage) ? " is-active" : ""}`}
                      href={`#${item.page}`}
                      key={item.label}
                      aria-current={isActive(item, activePage) ? "page" : undefined}
                      onClick={(event) => {
                        event.preventDefault();
                        navigate(item.page);
                      }}
                    >
                      {item.label}
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  );
                }

                const expanded = mobileOpenMenu === item.label;
                return (
                  <div className="synergy-mobile-group" key={item.label}>
                    <button
                      className={`synergy-mobile-group__trigger${isActive(item, activePage) ? " is-active" : ""}`}
                      type="button"
                      aria-expanded={expanded}
                      aria-controls={`synergy-mobile-menu-${item.label.replaceAll(" ", "-").toLowerCase()}`}
                      onClick={() => setMobileOpenMenu(expanded ? null : item.label)}
                    >
                      {item.label}
                      <ChevronDown size={17} aria-hidden="true" />
                    </button>
                    <div
                      className="synergy-mobile-group__links"
                      id={`synergy-mobile-menu-${item.label.replaceAll(" ", "-").toLowerCase()}`}
                      hidden={!expanded}
                    >
                      {item.items.map((subItem) => (
                        <NavigationLink
                          key={subItem.label}
                          item={subItem}
                          mobile
                          onNavigate={navigate}
                          onClose={() => setIsMobileOpen(false)}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </nav>

            <div className="synergy-mobile-drawer__actions">
              <button
                className="synergy-mobile-donate"
                type="button"
                onClick={() => navigate("donor-checkout")}
              >
                Donate securely
              </button>
              <button className="synergy-mobile-donate" type="button" onClick={openDonate}>
                Partner With Us <ArrowUpRight size={16} aria-hidden="true" />
              </button>
            </div>
            <div className="synergy-mobile-drawer__foot">
              Rural Development <i aria-hidden="true">•</i> Clean Energy
            </div>
          </div>
        </div>
      )}
    </header>
  );
}