const scale = (min, defaultValue, max, step = 1) => ({ min, default: defaultValue, max, step });

export const appearanceSections = [
  { id: "hero", label: "Hero Section", anchor: "hero-section", spacing: ["top", "bottom", "left", "right", "headingParagraph", "paragraphButton"], alignment: ["text", "content", "vertical"], typography: ["heroHeading", "paragraph", "buttonText"] },
  { id: "discover", label: "Discover", anchor: "discover", spacing: ["top", "bottom", "left", "right", "headingParagraph", "paragraphButton", "imageText"], alignment: ["text", "content", "vertical", "image"], typography: ["sectionHeading", "paragraph", "buttonText"] },
  { id: "initiatives", label: "Our Initiatives", anchor: "initiatives", spacing: ["top", "bottom", "left", "right", "headingParagraph", "cardGap", "gridGap", "cardPadding"], alignment: ["text"], typography: ["sectionHeading", "cardTitle", "cardDescription", "buttonText"] },
  { id: "biogas", label: "Biogas", anchor: "biogas", spacing: ["top", "bottom", "left", "right", "headingParagraph", "imageText", "cardGap"], alignment: ["text", "content", "vertical", "image"], typography: ["sectionHeading", "subheading", "paragraph"] },
  { id: "installation-plants", label: "Installation Plants", anchor: "installation-plants", spacing: ["top", "bottom", "left", "right", "headingParagraph", "cardGap", "gridGap", "cardPadding"], alignment: ["text"], typography: ["sectionHeading", "cardTitle", "cardDescription"] },
  { id: "impact", label: "Our Impact", anchor: "impact", spacing: ["top", "bottom", "left", "right", "headingParagraph", "cardGap", "gridGap", "cardPadding"], alignment: ["text"], typography: ["sectionHeading", "subheading", "paragraph", "cardTitle", "cardDescription"] },
  { id: "donation", label: "Donation", anchor: "support-our-mission", spacing: ["top", "bottom", "left", "right", "headingParagraph", "paragraphButton", "imageText", "cardPadding"], alignment: ["text", "content", "vertical", "image"], typography: ["sectionHeading", "paragraph", "buttonText"] },
  { id: "our-story", label: "Our Story", anchor: "our-story", spacing: ["top", "bottom", "left", "right", "headingParagraph", "imageText"], alignment: ["text", "vertical", "image"], typography: ["sectionHeading", "paragraph", "buttonText"] },
  { id: "stories", label: "Stories", anchor: "stories", spacing: ["top", "bottom", "left", "right", "headingParagraph", "cardGap", "gridGap", "cardPadding"], alignment: ["text"], typography: ["sectionHeading", "cardTitle", "cardDescription", "buttonText"] },
  { id: "join-our-team", label: "Join Our Team", anchor: "join-our-team", spacing: ["top", "bottom", "left", "right", "headingParagraph", "paragraphButton", "imageText", "cardGap", "cardPadding"], alignment: ["text", "content", "vertical"], typography: ["sectionHeading", "subheading", "paragraph", "cardTitle", "buttonText"] },
  { id: "footer", label: "Footer", anchor: "website-footer", spacing: ["top", "bottom", "left", "right", "gridGap"], alignment: ["text"], typography: ["subheading", "paragraph", "footerText"] },
];

export const appearanceBreakpoints = ["desktop", "tablet", "mobile"];

export const spacingScales = {
  top: scale(0, 48, 96, 4),
  bottom: scale(0, 48, 96, 4),
  left: scale(0, 0, 64, 4),
  right: scale(0, 0, 64, 4),
  headingParagraph: scale(4, 16, 36, 2),
  paragraphButton: scale(4, 24, 40, 2),
  imageText: scale(12, 24, 64, 4),
  cardGap: scale(8, 24, 48, 4),
  gridGap: scale(8, 24, 48, 4),
  cardPadding: scale(12, 24, 40, 4),
};

export const typographyScales = {
  heroHeading: scale(32, 56, 72),
  sectionHeading: scale(26, 40, 52),
  subheading: scale(18, 22, 30),
  paragraph: scale(13, 16, 20),
  cardTitle: scale(16, 20, 28),
  cardDescription: scale(13, 16, 20),
  buttonText: scale(13, 15, 18),
  footerText: scale(12, 14, 18),
};

export function getTypographyScale(key, breakpoint) {
  const base = typographyScales[key];
  if (breakpoint === "desktop") return base;
  const limits = breakpoint === "mobile"
    ? { heroHeading: 48, sectionHeading: 40, subheading: 24, paragraph: 18, cardTitle: 24, cardDescription: 18, buttonText: 16, footerText: 16 }
    : { heroHeading: 64, sectionHeading: 48, subheading: 28, paragraph: 18, cardTitle: 26, cardDescription: 18, buttonText: 17, footerText: 17 };
  return { ...base, max: Math.min(base.max, limits[key]) };
}

const responsiveTypographyDefaults = {
  heroHeading: { desktop: 56, tablet: 48, mobile: 40 },
  sectionHeading: { desktop: 40, tablet: 34, mobile: 30 },
  subheading: { desktop: 22, tablet: 20, mobile: 18 },
  paragraph: { desktop: 16, tablet: 16, mobile: 15 },
  cardTitle: { desktop: 20, tablet: 19, mobile: 18 },
  cardDescription: { desktop: 16, tablet: 15, mobile: 14 },
  buttonText: { desktop: 15, tablet: 15, mobile: 14 },
  footerText: { desktop: 14, tablet: 14, mobile: 13 },
};

const defaultSectionSettings = (section) => {
  const spacing = Object.fromEntries(section.spacing.map((key) => [
    key,
    key === "top" || key === "bottom" ? section.id === "hero" ? 0 : section.id === "footer" ? 24 : spacingScales[key].default
      : (key === "left" || key === "right") && section.id === "footer" ? 48
      : key === "imageText" && ["discover", "our-story"].includes(section.id) ? 48
        : spacingScales[key].default,
  ]));
  const typography = Object.fromEntries(section.typography.map((key) => [
    key,
    section.id === "footer" && key === "paragraph" ? typographyScales.footerText.default : typographyScales[key].default,
  ]));
  const centeredText = ["initiatives", "biogas", "installation-plants", "impact", "stories"].includes(section.id);
  const alignment = Object.fromEntries(section.alignment.map((key) => [
    key,
    key === "vertical" || key === "image" ? "center"
      : key === "text" ? centeredText ? "center" : "left"
        : "left",
  ]));
  const responsive = Object.fromEntries(appearanceBreakpoints.map((breakpoint) => [breakpoint, {
    spacing: {
      ...spacing,
      ...(section.id === "footer" && breakpoint === "mobile" ? { left: 16, right: 16 } : {}),
    },
    typography: Object.fromEntries(section.typography.map((key) => [
      key,
      section.id === "footer" && key === "paragraph"
        ? responsiveTypographyDefaults.footerText[breakpoint]
        : responsiveTypographyDefaults[key][breakpoint],
    ])),
  }]));
  return { sectionId: section.id, spacing, alignment, typography, responsive, status: "default" };
};

export const defaultAppearanceSettings = Object.fromEntries(
  appearanceSections.map((section) => [section.id, defaultSectionSettings(section)]),
);

export const getSectionDefinition = (sectionId) => appearanceSections.find((section) => section.id === sectionId);
