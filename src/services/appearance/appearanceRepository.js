import {
  appearanceBreakpoints,
  defaultAppearanceSettings,
  getSectionDefinition,
  spacingScales,
  getTypographyScale,
  typographyScales,
} from "./appearanceConfig.js";

const STORAGE_KEY = "synergy.websiteAppearance.v1";
const PREVIEW_KEY = "synergy.websiteAppearance.preview.v1";
const HISTORY_LIMIT = 25;

const clone = (value) => structuredClone(value);
const emptyState = () => ({ drafts: {}, published: {}, history: [] });

function readStorage(key, fallback) {
  const stored = localStorage.getItem(key);
  if (!stored) return clone(fallback);
  try {
    return JSON.parse(stored);
  } catch (error) {
    console.error(`Could not read appearance data from "${key}".`, error);
    throw new Error("Saved appearance data is unreadable. Clear the damaged demo data before continuing.", { cause: error });
  }
}

function writeState(state, action, sectionId, previousState = state) {
  const snapshot = {
    action,
    sectionId: sectionId || "all",
    savedAt: new Date().toISOString(),
    drafts: clone(previousState.drafts),
    published: clone(previousState.published),
  };
  const next = { ...state, history: [snapshot, ...previousState.history].slice(0, HISTORY_LIMIT) };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

function clampValues(values, supported, scales) {
  const normalized = {};
  supported.forEach((key) => {
    const scale = scales[key];
    const value = Number(values?.[key] ?? scale.default);
    normalized[key] = Number.isFinite(value)
      ? Math.min(scale.max, Math.max(scale.min, value))
      : scale.default;
  });
  return normalized;
}

function clampTypography(values, supported, breakpoint) {
  const normalized = {};
  supported.forEach((key) => {
    const scale = getTypographyScale(key, breakpoint);
    const value = Number(values?.[key] ?? scale.default);
    normalized[key] = Number.isFinite(value)
      ? Math.min(scale.max, Math.max(scale.min, value))
      : scale.default;
  });
  return normalized;
}

function validateSettings(settings) {
  const definition = getSectionDefinition(settings?.sectionId);
  if (!definition) throw new Error("Select a supported website section.");
  const defaults = defaultAppearanceSettings[definition.id];
  const alignment = {};
  definition.alignment.forEach((key) => {
    const value = settings.alignment?.[key] ?? defaults.alignment[key];
    const choices = key === "vertical" ? ["top", "center", "bottom"] : ["left", "center", "right"];
    if (!choices.includes(value)) {
      throw new Error(`Unsupported ${key} alignment for ${definition.label}.`);
    }
    alignment[key] = value;
  });
  const responsive = Object.fromEntries(appearanceBreakpoints.map((breakpoint) => {
    const values = settings.responsive?.[breakpoint] || {};
    return [breakpoint, {
      spacing: clampValues(values.spacing || settings.spacing, definition.spacing, spacingScales),
      typography: clampTypography(values.typography || settings.typography, definition.typography, breakpoint),
    }];
  }));
  return {
    sectionId: definition.id,
    spacing: clampValues(settings.spacing, definition.spacing, spacingScales),
    alignment,
    typography: clampValues(settings.typography, definition.typography, typographyScales),
    responsive,
    status: settings.status === "published" ? "published" : "draft",
  };
}

function getState() {
  const state = readStorage(STORAGE_KEY, emptyState());
  if (!state || typeof state !== "object" || !state.drafts || !state.published || !Array.isArray(state.history)) {
    throw new Error("Saved appearance data has an invalid format.");
  }
  return state;
}

export const appearanceRepository = {
  async getAppearanceSettings() {
    await Promise.resolve();
    return clone(getState());
  },
  async getSectionSettings(sectionId) {
    await Promise.resolve();
    if (!defaultAppearanceSettings[sectionId]) throw new Error(`Unknown website section "${sectionId}".`);
    const state = getState();
    return clone(state.drafts[sectionId] || state.published[sectionId] || defaultAppearanceSettings[sectionId]);
  },
  async getPublicSettings() {
    await Promise.resolve();
    const state = getState();
    return clone({ ...defaultAppearanceSettings, ...state.published });
  },
  async getPreviewSettings(sectionId) {
    await Promise.resolve();
    const state = getState();
    const preview = readStorage(PREVIEW_KEY, {});
    const sectionDraft = preview[sectionId] || state.drafts[sectionId];
    return clone({
      ...defaultAppearanceSettings,
      ...state.published,
      ...(sectionDraft ? { [sectionId]: sectionDraft } : {}),
    });
  },
  async setPreviewSettings(settings) {
    await Promise.resolve();
    const normalized = validateSettings(settings);
    const preview = readStorage(PREVIEW_KEY, {});
    localStorage.setItem(PREVIEW_KEY, JSON.stringify({ ...preview, [normalized.sectionId]: normalized }));
    return clone(normalized);
  },
  async clearPreviewSettings(sectionId) {
    await Promise.resolve();
    const preview = readStorage(PREVIEW_KEY, {});
    if (sectionId) delete preview[sectionId];
    else Object.keys(preview).forEach((key) => delete preview[key]);
    localStorage.setItem(PREVIEW_KEY, JSON.stringify(preview));
  },
  async saveDraft(settings) {
    await Promise.resolve();
    const normalized = validateSettings(settings);
    const state = getState();
    const next = writeState({
      ...state,
      drafts: { ...state.drafts, [normalized.sectionId]: { ...normalized, status: "draft" } },
    }, "save-draft", normalized.sectionId, state);
    return clone(next.drafts[normalized.sectionId]);
  },
  async publishSettings(sectionId) {
    await Promise.resolve();
    const definition = getSectionDefinition(sectionId);
    if (!definition) throw new Error(`Unknown website section "${sectionId}".`);
    const state = getState();
    const normalized = validateSettings(state.drafts[sectionId] || defaultAppearanceSettings[sectionId]);
    const published = { ...normalized, status: "published" };
    const next = writeState({
      ...state,
      drafts: { ...state.drafts },
      published: { ...state.published, [sectionId]: published },
    }, "publish", sectionId, state);
    return clone(next.published[sectionId]);
  },
  async resetSection(sectionId) {
    await Promise.resolve();
    if (!defaultAppearanceSettings[sectionId]) throw new Error(`Unknown website section "${sectionId}".`);
    const state = getState();
    const drafts = { ...state.drafts };
    const published = { ...state.published };
    delete drafts[sectionId];
    delete published[sectionId];
    writeState({ ...state, drafts, published }, "reset-section", sectionId, state);
    return clone(defaultAppearanceSettings[sectionId]);
  },
  async resetAllSettings() {
    await Promise.resolve();
    const state = getState();
    writeState({ ...state, drafts: {}, published: {} }, "reset-all", "all", state);
    return clone(defaultAppearanceSettings);
  },
  async restorePrevious() {
    await Promise.resolve();
    const state = getState();
    const previous = state.history[0];
    if (!previous) throw new Error("There is no saved appearance version to restore.");
    return clone(writeState({
      ...state,
      drafts: previous.drafts,
      published: previous.published,
    }, "restore-version", previous.sectionId, state));
  },
};

export function appearanceStyleFor(sectionId, settings) {
  const definition = getSectionDefinition(sectionId);
  const sectionSettings = settings?.[sectionId] || defaultAppearanceSettings[sectionId];
  const style = {};
  definition.spacing.forEach((key) => {
    style[`--appearance-base-${key}`] = `${sectionSettings.spacing[key]}px`;
    appearanceBreakpoints.forEach((breakpoint) => {
      style[`--appearance-${breakpoint}-${key}`] = `${sectionSettings.responsive?.[breakpoint]?.spacing?.[key] ?? sectionSettings.spacing[key]}px`;
    });
  });
  definition.typography.forEach((key) => {
    style[`--appearance-base-${key}`] = `${sectionSettings.responsive?.desktop?.typography?.[key] ?? sectionSettings.typography[key]}px`;
    appearanceBreakpoints.forEach((breakpoint) => {
      style[`--appearance-${breakpoint}-${key}`] = `${sectionSettings.responsive?.[breakpoint]?.typography?.[key] ?? sectionSettings.typography[key]}px`;
    });
  });
  definition.alignment.forEach((key) => {
    const value = sectionSettings.alignment[key];
    if (key === "content") style["--appearance-content-justify"] = value === "left" ? "flex-start" : value === "right" ? "flex-end" : "center";
    else if (key === "vertical") style["--appearance-vertical-align"] = value === "top" ? "flex-start" : value === "bottom" ? "flex-end" : "center";
    else style[`--appearance-${key}`] = value;
  });
  return style;
}
