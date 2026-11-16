import { useEffect, useMemo, useState } from "react";
import { Eye, RotateCcw, Save, Send, Smartphone, Tablet, Monitor, LayoutTemplate } from "lucide-react";
import {
  appearanceBreakpoints,
  appearanceSections,
  defaultAppearanceSettings,
  getTypographyScale,
  spacingScales,
} from "../../services/appearance/appearanceConfig.js";
import { appearanceRepository } from "../../services/appearance/appearanceRepository.js";

const breakpointWidths = { desktop: 1200, tablet: 768, mobile: 390 };
const breakpointLabels = { desktop: "Desktop", tablet: "Tablet", mobile: "Mobile" };
const alignmentOptions = {
  text: ["left", "center", "right"],
  content: ["left", "center", "right"],
  vertical: ["top", "center", "bottom"],
  image: ["left", "center", "right"],
};
const spacingLabels = {
  top: "Top padding",
  bottom: "Bottom padding",
  left: "Left padding",
  right: "Right padding",
  headingParagraph: "Heading-to-paragraph gap",
  paragraphButton: "Paragraph-to-button gap",
  imageText: "Image-to-text gap",
  cardGap: "Card spacing (columns)",
  gridGap: "Grid gap (rows)",
  cardPadding: "Internal card padding",
};
const typographyLabels = {
  heroHeading: "Main heading",
  sectionHeading: "Section heading",
  subheading: "Subheading",
  paragraph: "Paragraph",
  cardTitle: "Card title",
  cardDescription: "Card description",
  buttonText: "Button text",
  footerText: "Footer text",
};

function ValueControl({ label, value, scale, unit, onChange, onReset }) {
  const presets = [...new Set([scale.min, scale.default, Math.round((scale.min + scale.max) / 2), scale.max])].sort((a, b) => a - b);
  return (
    <div className="appearance-control">
      <div className="appearance-control__heading">
        <label>{label}</label>
        <strong>{value}{unit}</strong>
      </div>
      <div className="appearance-control__range">
        <button type="button" className="admin-secondary" onClick={() => onChange(Math.max(scale.min, value - scale.step))} aria-label={`Decrease ${label}`}>−</button>
        <input type="range" min={scale.min} max={scale.max} step={scale.step} value={value} onChange={(event) => onChange(Number(event.target.value))} aria-label={label} />
        <button type="button" className="admin-secondary" onClick={() => onChange(Math.min(scale.max, value + scale.step))} aria-label={`Increase ${label}`}>+</button>
      </div>
      <div className="appearance-control__presets">
        {presets.map((preset) => <button type="button" key={preset} className={value === preset ? "is-selected" : ""} onClick={() => onChange(preset)}>{preset}{unit}</button>)}
        <button type="button" onClick={onReset}>Reset</button>
      </div>
    </div>
  );
}

export default function AppearanceManagement({ user, canEdit }) {
  const [sectionId, setSectionId] = useState(appearanceSections[0].id);
  const [breakpoint, setBreakpoint] = useState("desktop");
  const [settings, setSettings] = useState(defaultAppearanceSettings[appearanceSections[0].id]);
  const [previewVersion, setPreviewVersion] = useState(0);
  const [loadedSectionId, setLoadedSectionId] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [draftState, setDraftState] = useState({});
  const [publishedState, setPublishedState] = useState({});
  const [history, setHistory] = useState([]);
  const section = useMemo(() => appearanceSections.find((item) => item.id === sectionId), [sectionId]);
  const loading = loadedSectionId !== sectionId;
  const breakpointValues = settings.responsive?.[breakpoint] || { spacing: settings.spacing, typography: settings.typography };

  const refreshRepositoryState = async () => {
    const state = await appearanceRepository.getAppearanceSettings();
    setDraftState(state.drafts);
    setPublishedState(state.published);
    setHistory(state.history);
  };

  useEffect(() => {
    let active = true;
    appearanceRepository.getSectionSettings(sectionId)
      .then((value) => {
        if (active) {
          setSettings(value);
          setError("");
        }
      })
      .catch((loadError) => {
        if (active) setError(loadError.message || "Unable to load appearance settings.");
      })
      .finally(() => {
        if (active) setLoadedSectionId(sectionId);
      });
    appearanceRepository.getAppearanceSettings()
      .then((value) => { if (active) { setDraftState(value.drafts); setPublishedState(value.published); setHistory(value.history); } })
      .catch((loadError) => { if (active) setError(loadError.message || "Unable to load draft status."); });
    return () => { active = false; };
  }, [sectionId]);

  useEffect(() => {
    if (loading || !canEdit) return;
    appearanceRepository.setPreviewSettings(settings)
      .catch((previewError) => setError(previewError.message || "Unable to update the live preview."));
  }, [settings, loading, canEdit]);

  useEffect(() => () => {
    appearanceRepository.clearPreviewSettings(sectionId).catch((previewError) => {
      console.error("Could not clear the temporary appearance preview.", previewError);
    });
  }, [sectionId]);

  const updateValue = (group, key, value) => {
    setNotice("");
    setSettings((current) => {
      const responsive = { ...current.responsive };
      responsive[breakpoint] = {
        ...responsive[breakpoint],
        [group]: { ...responsive[breakpoint]?.[group], [key]: value },
      };
      const next = { ...current, responsive };
      if (breakpoint === "desktop") next[group] = { ...current[group], [key]: value };
      return next;
    });
  };

  const updateAlignment = (key, value) => {
    setNotice("");
    setSettings((current) => ({ ...current, alignment: { ...current.alignment, [key]: value } }));
  };

  const showError = (actionError, fallback) => setError(actionError.message || fallback);
  const saveDraft = async () => {
    setBusy(true); setError(""); setNotice("");
    try {
      const saved = await appearanceRepository.saveDraft(settings);
      setSettings(saved);
      await refreshRepositoryState();
      setNotice("Draft saved in this browser. It is not public until published.");
    } catch (saveError) { showError(saveError, "Unable to save the draft."); }
    finally { setBusy(false); }
  };

  const publish = async () => {
    setBusy(true); setError(""); setNotice("");
    try {
      await appearanceRepository.saveDraft(settings);
      const published = await appearanceRepository.publishSettings(sectionId);
      setSettings(published);
      await refreshRepositoryState();
      setNotice("Validated appearance settings published for the public website.");
    } catch (publishError) { showError(publishError, "Unable to publish these appearance settings."); }
    finally { setBusy(false); }
  };

  const resetSection = async () => {
    if (!window.confirm(`Restore the default appearance for "${section.label}"? This will replace its published settings.`)) return;
    setBusy(true); setError(""); setNotice("");
    try {
      const restored = await appearanceRepository.resetSection(sectionId);
      setSettings(restored);
      await refreshRepositoryState();
      await appearanceRepository.clearPreviewSettings(sectionId);
      setPreviewVersion((version) => version + 1);
      setNotice(`${section.label} was restored to its original design defaults.`);
    } catch (resetError) { showError(resetError, "Unable to reset this section."); }
    finally { setBusy(false); }
  };

  const resetAll = async () => {
    if (!window.confirm("Reset every website section to its original defaults? The previous appearance can be restored with Restore previous version.")) return;
    setBusy(true); setError(""); setNotice("");
    try {
      await appearanceRepository.resetAllSettings();
      await appearanceRepository.clearPreviewSettings();
      setSettings(defaultAppearanceSettings[sectionId]);
      await refreshRepositoryState();
      setPreviewVersion((version) => version + 1);
      setNotice("All published and draft appearance settings were restored to defaults.");
    } catch (resetError) { showError(resetError, "Unable to reset all appearance settings."); }
    finally { setBusy(false); }
  };

  const restorePrevious = async () => {
    if (!window.confirm("Restore the previous saved appearance configuration? Current published and draft settings will be kept in the version history.")) return;
    setBusy(true); setError(""); setNotice("");
    try {
      const restored = await appearanceRepository.restorePrevious();
      await appearanceRepository.clearPreviewSettings();
      await refreshRepositoryState();
      setSettings(restored.drafts[sectionId] || restored.published[sectionId] || defaultAppearanceSettings[sectionId]);
      setPreviewVersion((version) => version + 1);
      setNotice("The previous saved appearance configuration was restored.");
    } catch (restoreError) { showError(restoreError, "Unable to restore the previous appearance configuration."); }
    finally { setBusy(false); }
  };

  const previewHref = `/?appearancePreview=1&section=${encodeURIComponent(sectionId)}#${section.anchor}`;
  const savedStatus = draftState[sectionId] && publishedState[sectionId] ? "Draft + published"
    : draftState[sectionId] ? "Draft saved"
      : publishedState[sectionId] ? "Published" : "Default settings";

  return (
    <div className="admin-content appearance-page">
      <div className="admin-page-heading">
        <div><span className="admin-eyebrow">PUBLIC WEBSITE</span><h1>Website Appearance</h1><p>Controlled spacing, alignment and typography for approved sections.</p></div>
        <span className="appearance-status"><LayoutTemplate size={15} />{savedStatus}</span>
      </div>
      <div className="admin-demo-banner"><Eye size={17} /><span><b>Frontend demo behavior</b> — drafts and published appearance are stored in this browser. No backend is connected. Public pages use published settings only.</span></div>
      {notice && <div className="admin-alert admin-alert--success" role="status">{notice}</div>}
      {error && <div className="admin-alert admin-alert--error" role="alert">{error}</div>}

      <div className="appearance-layout">
        <section className="admin-panel appearance-editor" aria-label="Appearance controls">
          <div className="admin-panel-heading"><div><h2>Section settings</h2><p>Only controls supported by the selected section are shown.</p></div></div>
          <div className="appearance-editor__body">
            <label className="admin-field" htmlFor="appearance-section">Website section
              <select id="appearance-section" value={sectionId} onChange={(event) => setSectionId(event.target.value)}>
                {appearanceSections.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
              </select>
            </label>
            <div className="appearance-breakpoints" role="group" aria-label="Responsive settings breakpoint">
              {appearanceBreakpoints.map((size) => {
                const Icon = size === "desktop" ? Monitor : size === "tablet" ? Tablet : Smartphone;
                return <button type="button" key={size} className={breakpoint === size ? "is-active" : ""} onClick={() => setBreakpoint(size)}><Icon size={16} />{breakpointLabels[size]}</button>;
              })}
            </div>
            {loading ? <div className="admin-state"><span className="admin-spinner" /> Loading section settings…</div> : <>
              {section.spacing.length > 0 && <div className="appearance-controls-group"><h3>Spacing <span>px</span></h3>
                {section.spacing.map((key) => <ValueControl key={key} label={spacingLabels[key]} value={breakpointValues.spacing[key]} scale={spacingScales[key]} unit="px" onChange={(value) => updateValue("spacing", key, value)} onReset={() => updateValue("spacing", key, defaultAppearanceSettings[sectionId].responsive[breakpoint].spacing[key])} />)}
              </div>}
              {section.alignment.length > 0 && <div className="appearance-controls-group"><h3>Alignment</h3>
                {section.alignment.map((key) => <fieldset className="appearance-alignment" key={key}><legend>{key === "text" ? "Text alignment" : key === "content" ? "Content alignment" : key === "vertical" ? "Vertical alignment" : "Image alignment"}</legend><div>{alignmentOptions[key].map((value) => <button type="button" key={value} className={settings.alignment[key] === value ? "is-selected" : ""} onClick={() => updateAlignment(key, value)}>{value[0].toUpperCase() + value.slice(1)}</button>)}</div></fieldset>)}
              </div>}
              {section.typography.length > 0 && <div className="appearance-controls-group"><h3>Font sizes <span>px</span></h3>
                {section.typography.map((key) => <ValueControl key={key} label={typographyLabels[key]} value={breakpointValues.typography[key]} scale={getTypographyScale(key, breakpoint)} unit="px" onChange={(value) => updateValue("typography", key, value)} onReset={() => updateValue("typography", key, defaultAppearanceSettings[sectionId].responsive[breakpoint].typography[key])} />)}
              </div>}
            </>}
          </div>
          <div className="appearance-actions">
            <button type="button" className="admin-secondary" onClick={resetSection} disabled={busy || !canEdit}><RotateCcw size={15} /> Reset section</button>
            <button type="button" className="admin-secondary" onClick={() => setPreviewVersion((version) => version + 1)}><Eye size={15} /> Preview changes</button>
            <button type="button" className="admin-primary" onClick={saveDraft} disabled={busy || loading || !canEdit}><Save size={15} /> Save draft</button>
            <button type="button" className="admin-primary appearance-publish" onClick={publish} disabled={busy || loading || !canEdit}><Send size={15} /> Publish changes</button>
            {history.length > 0 && <button type="button" className="admin-secondary" onClick={restorePrevious} disabled={busy || !canEdit}><RotateCcw size={15} /> Restore previous version</button>}
            {user.role === "Super Admin" && <button type="button" className="appearance-reset-all" onClick={resetAll} disabled={busy}>Reset all sections</button>}
          </div>
          {!canEdit && <p className="appearance-readonly-note">You have view-only access. Ask a Super Admin for the appearance management permission.</p>}
        </section>

        <section className="admin-panel appearance-preview">
          <div className="admin-panel-heading"><div><h2>Live website preview</h2><p>Rendered from the real public website components.</p></div><span className="admin-tag">{breakpointLabels[breakpoint]}</span></div>
          <div className="appearance-preview__viewport">
            <div className="appearance-preview__frame" style={{ width: breakpointWidths[breakpoint] }}>
              <iframe
                key={`${sectionId}-${breakpoint}-${previewVersion}`}
                title={`${section.label} ${breakpointLabels[breakpoint]} preview`}
                src={previewHref}
                style={{ width: breakpointWidths[breakpoint] }}
              />
            </div>
          </div>
          <div className="appearance-preview__caption">Unpublished preview only · {breakpointWidths[breakpoint]}px viewport · Images preserve their aspect ratio.</div>
        </section>
      </div>
    </div>
  );
}
