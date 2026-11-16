import { Mail, Phone } from "lucide-react";
import { assetUrl } from "../utils/assetUrl";

const groups = [
  {
    title: "Quick Links",
    links: [
      ["Home", "/"],
      ["About Us", "/about"],
      ["Our Mission", "/what-we-do"],
      ["Our Story", "/#our-story"],
      ["Our Impact", "/#impact"],
      ["Contact Us", "/#contact"],
    ],
  },
  {
    title: "Our Initiatives",
    links: [
      ["Biogas & Clean Energy", "/initiatives/biogas-clean-energy"],
      ["Smoke-Free Homes", "/initiatives/smoke-free-homes"],
      ["Women Empowerment", "/initiatives/women-empowerment"],
      ["Skill Development", "/initiatives/skill-development"],
      ["Our Projects", "/#installation-plants"],
    ],
  },
  {
    title: "Get Involved",
    links: [
      ["Join Our Team", "/#join-our-team"],
      ["Volunteer Opportunities", "/#join-our-team"],
      ["Community Engagement", "/#join-our-team"],
      ["Partner With Us", "/#contact"],
    ],
  },
];

export default function Footer({ publicContact }) {
  const email = publicContact?.email || "nspatilsynergyorg@gmail.com";
  const phone = publicContact?.phone || "+91 8861953047";
  const address = (publicContact?.address && !publicContact.address.includes("Karnataka"))
    ? publicContact.address
    : "Kolhapur, Maharashtra, India";

  const socialProfiles = [
    {
      name: "LinkedIn",
      url: publicContact?.linkedinUrl || "https://www.linkedin.com/company/synergy-organization",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      ),
      className: "synergy-footer__social-link--linkedin",
    },
    {
      name: "Facebook",
      url: publicContact?.facebookUrl || "https://www.facebook.com/synergyorganization",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
        </svg>
      ),
      className: "synergy-footer__social-link--facebook",
    },
    {
      name: "YouTube",
      url: publicContact?.youtubeUrl || "https://www.youtube.com/@synergyorganization",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M21.58 7.19a2.7 2.7 0 0 0-1.9-1.9C18 4.8 12 4.8 12 4.8s-6 0-7.68.49a2.7 2.7 0 0 0-1.9 1.9C2 8.87 2 12 2 12s0 3.13.42 4.81a2.7 2.7 0 0 0 1.9 1.9c1.68.49 7.68.49 7.68.49s6 0 7.68-.49a2.7 2.7 0 0 0 1.9-1.9C22 15.13 22 12 22 12s0-3.13-.42-4.81zM10 15V9l5.2 3-5.2 3z" />
        </svg>
      ),
      className: "synergy-footer__social-link--youtube",
    },
  ];

  return (
    <footer className="synergy-footer">
      <div className="synergy-footer__shell">
        <div className="synergy-footer__main">
          {/* Column 1: SYNERGY ORGANIZATION */}
          <div className="synergy-footer__brand">
            <a href={assetUrl("/")} className="synergy-footer__wordmark">
              <span>SYNERGY</span>
              <small>ORGANIZATION (INDIA)</small>
            </a>
            <p>
              Building cleaner communities through biogas, sustainable energy and community empowerment.
            </p>
            <a href={`mailto:${email}`} className="synergy-footer__contact-link">
              <Mail size={15} aria-hidden="true" />
              <span>{email}</span>
            </a>
            <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="synergy-footer__contact-link">
              <Phone size={15} aria-hidden="true" />
              <span>{phone}</span>
            </a>
            {address && <p className="synergy-footer__address">{address}</p>}
          </div>

          {/* Columns 2, 3, 4: QUICK LINKS, OUR INITIATIVES, GET INVOLVED */}
          {groups.map((group) => (
            <nav className="synergy-footer__group" key={group.title} aria-label={group.title}>
              <h2>{group.title}</h2>
              <ul>
                {group.links.map(([label, href]) => (
                  <li key={label}>
                    <a href={href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:") ? href : assetUrl(href)}>{label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Column 5: SOCIAL MEDIA */}
          <nav className="synergy-footer__group" aria-label="Social Media">
            <h2>Social Media</h2>
            <ul className="synergy-footer__social-list">
              {socialProfiles.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`synergy-footer__social-link ${item.className}`}
                    aria-label={`Visit Synergy Organization on ${item.name}`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="synergy-footer__bottom">
          <span>
            © {new Date().getFullYear()} Synergy Organization (India). All rights reserved.
          </span>
          <div className="synergy-footer__bottom-links">
            <a href={assetUrl("/#contact")}>Contact</a>
            <a href={assetUrl("/about")}>About</a>
            <a href={assetUrl("/#impact")}>Impact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
