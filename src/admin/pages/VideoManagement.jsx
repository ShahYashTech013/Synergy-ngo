import { useMemo, useState } from "react";
import {
  Check, ExternalLink, FileVideo2, ImagePlus, Pencil, Play, Plus, Search, Trash2, Video, X,
} from "lucide-react";
import { useRepository } from "../../hooks/useRepository.js";
import VideoPlayer from "../../COMPONENT/VideoPlayer.jsx";
import { mediaService } from "../../services/media/mediaService.js";
import { videoMediaService } from "../../services/media/videoMediaService.js";
import { videoRepository } from "../../services/repositories/videoRepository.js";
import "../videoManagement.css";

const sections = [
  ["hero", "Hero Background"],
  ["biogas", "Biogas Section"],
  ["initiatives", "Our Initiatives"],
  ["installation-plants", "Installation Plants"],
  ["impact", "Our Impact"],
  ["our-story", "Our Story"],
];
const initialForm = {
  title: "", description: "", videoUrl: "", sourceType: "url", fileName: "", contentType: "", fileSize: 0,
  thumbnail: "", location: "hero", displayOrder: 1, status: "active", publicationStatus: "draft",
};
const humanSize = (size) => size ? `${(size / (1024 * 1024)).toFixed(1)} MB` : "";

export default function VideoManagement({ user }) {
  const { records, loading, error: loadError, refresh } = useRepository(videoRepository);
  const [query, setQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [publicationFilter, setPublicationFilter] = useState("");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [previewStatus, setPreviewStatus] = useState("empty");
  const [fieldErrors, setFieldErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const can = (action) => user.permissions?.includes("*") || user.permissions?.includes(`video.${action}`);
  const rows = useMemo(() => records
    .filter((record) => {
      const text = [record.title, record.description, record.videoUrl, record.fileName].join(" ").toLowerCase();
      return (!query || text.includes(query.toLowerCase()))
        && (!locationFilter || record.location === locationFilter)
        && (!statusFilter || record.status === statusFilter)
        && (!publicationFilter || record.publicationStatus === publicationFilter);
    })
    .sort((left, right) => Number(left.displayOrder || 0) - Number(right.displayOrder || 0)), [records, query, locationFilter, statusFilter, publicationFilter]);
  const previewSource = useMemo(() => {
    if (!form.videoUrl) return "";
    if (form.sourceType === "upload") return form.videoUrl;
    try {
      return videoMediaService.validateUrl(form.videoUrl);
    } catch {
      return "";
    }
  }, [form.videoUrl, form.sourceType]);

  const setField = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
    setFieldErrors((current) => ({ ...current, [key]: "" }));
    if (key === "videoUrl") {
      if (!value) {
        setPreviewStatus("empty");
      } else if (form.sourceType === "url") {
        try {
          videoMediaService.validateUrl(value);
          setPreviewStatus("loading");
        } catch (validationError) {
          setPreviewStatus("error");
          setFieldErrors((current) => ({ ...current, videoUrl: validationError.message }));
        }
      } else {
        setPreviewStatus("loading");
      }
    }
  };
  const closeModal = (keepPreviews = false) => {
    if (!keepPreviews && modal?.type !== "view") {
      if (form.videoUrl.startsWith("blob:") && form.videoUrl !== modal?.record?.videoUrl) {
        videoMediaService.revokePreview(form.videoUrl);
      }
      if (form.thumbnail.startsWith("blob:") && form.thumbnail !== modal?.record?.thumbnail) {
        mediaService.revokePreview(form.thumbnail);
      }
    }
    setModal(null); setFieldErrors({}); setError("");
  };
  const openForm = async (record) => {
    setError(""); setNotice(""); setFieldErrors({});
    if (!record) {
      setForm({ ...initialForm, displayOrder: records.length + 1 });
      setPreviewStatus("empty");
      setModal({ type: "create" });
      return;
    }
    setBusy(true);
    try {
      const current = await videoRepository.getById(record.id);
      setForm({ ...initialForm, ...current });
      setPreviewStatus(current.videoUrl ? "loading" : "empty");
      setModal({ type: "edit", record: current });
    } catch (openError) {
      setError(openError.message || "Unable to load this video.");
    } finally {
      setBusy(false);
    }
  };
  const chooseVideo = async (file) => {
    if (!file) return;
    setError(""); setFieldErrors((current) => ({ ...current, videoUrl: "" }));
    try {
      const preview = await videoMediaService.createPreview(file);
      if (form.videoUrl.startsWith("blob:") && form.videoUrl !== modal?.record?.videoUrl) {
        videoMediaService.revokePreview(form.videoUrl);
      }
      setForm((current) => ({
        ...current, sourceType: "upload", videoUrl: preview.url, fileName: preview.fileName,
        contentType: preview.contentType, fileSize: preview.size,
      }));
      setPreviewStatus("loading");
    } catch (fileError) {
      setFieldErrors((current) => ({ ...current, videoUrl: fileError.message }));
    }
  };
  const chooseThumbnail = async (file) => {
    setError("");
    try {
      const preview = await mediaService.createPreview(file);
      if (form.thumbnail.startsWith("blob:") && form.thumbnail !== modal?.record?.thumbnail) {
        mediaService.revokePreview(form.thumbnail);
      }
      setField("thumbnail", preview.url);
    } catch (fileError) {
      setFieldErrors((current) => ({ ...current, thumbnail: fileError.message }));
    }
  };
  const changeSourceType = (sourceType) => {
    if (form.videoUrl.startsWith("blob:") && form.videoUrl !== modal?.record?.videoUrl) {
      videoMediaService.revokePreview(form.videoUrl);
    }
    setForm((current) => ({
      ...current, sourceType, videoUrl: "", fileName: "", contentType: "", fileSize: 0,
    }));
    setPreviewStatus("empty");
    setFieldErrors((current) => ({ ...current, videoUrl: "" }));
  };
  const updatePreviewStatus = (status, message) => {
    setPreviewStatus(status);
    if (status === "ready") {
      setFieldErrors((current) => ({ ...current, videoUrl: "" }));
    } else if (status === "error") {
      setFieldErrors((current) => ({ ...current, videoUrl: message || "The video preview could not be loaded." }));
    }
  };
  const validate = () => {
    const next = {};
    if (!form.title.trim()) next.title = "Video title is required.";
    if (!form.description.trim()) next.description = "Video description is required.";
    if (!form.videoUrl) next.videoUrl = form.sourceType === "upload" ? "Choose a video file." : "Enter a video URL.";
    else if (form.sourceType === "url") {
      try { videoMediaService.validateUrl(form.videoUrl); } catch (validationError) { next.videoUrl = validationError.message; }
    }
    if (form.videoUrl && !next.videoUrl && previewStatus !== "ready") {
      next.videoUrl = previewStatus === "error"
        ? fieldErrors.videoUrl || "The video preview could not be loaded."
        : "Wait for the video preview to load before saving.";
    }
    if (form.thumbnail.trim()) {
      try {
        const posterUrl = new URL(form.thumbnail, window.location.origin);
        if (!["http:", "https:", "blob:"].includes(posterUrl.protocol)) next.thumbnail = "Use an HTTP or HTTPS poster image URL.";
        else if (/\.(mp4|webm|ogg)$/i.test(posterUrl.pathname)) next.thumbnail = "Choose an image poster URL, not a video URL.";
      } catch {
        next.thumbnail = "Enter a valid poster URL.";
      }
    }
    if (!sections.some(([key]) => key === form.location)) next.location = "Select an approved landing-page section.";
    if (!Number.isInteger(Number(form.displayOrder)) || Number(form.displayOrder) < 0) next.displayOrder = "Enter a whole number of 0 or greater.";
    if (!["active", "inactive"].includes(form.status)) next.status = "Select Active or Inactive.";
    if (!["draft", "published"].includes(form.publicationStatus)) next.publicationStatus = "Select Draft or Published.";
    setFieldErrors(next);
    return Object.keys(next).length === 0;
  };
  const save = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    setBusy(true); setError(""); setNotice("");
    try {
      const source = form.sourceType === "url" ? videoMediaService.validateUrl(form.videoUrl) : form.videoUrl;
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        videoUrl: source,
        sourceType: form.sourceType,
        fileName: form.sourceType === "upload" ? form.fileName : "",
        contentType: form.contentType || "",
        fileSize: Number(form.fileSize || 0),
        thumbnail: form.thumbnail.trim(),
        location: form.location,
        displayOrder: Number(form.displayOrder),
        status: form.status,
        publicationStatus: can("publish") ? form.publicationStatus : modal.type === "edit" ? modal.record.publicationStatus : "draft",
      };
      if (modal.type === "edit") {
        await videoRepository.update(modal.record.id, payload);
        if (modal.record.videoUrl !== payload.videoUrl) videoMediaService.revokePreview(modal.record.videoUrl);
        if (modal.record.thumbnail !== payload.thumbnail) mediaService.revokePreview(modal.record.thumbnail);
      } else {
        await videoRepository.create(payload);
      }
      await refresh();
      setNotice(modal.type === "edit" ? "Video changes saved to the existing record." : "Video saved to browser demo storage.");
      closeModal(true);
    } catch (saveError) {
      setError(saveError.message || "Unable to save this video.");
    } finally {
      setBusy(false);
    }
  };
  const remove = async (record) => {
    if (!can("delete") || !window.confirm(`Delete "${record.title}"? This removes the video from the public website.`)) return;
    setError(""); setNotice("");
    try {
      await videoRepository.delete(record.id);
      videoMediaService.revokePreview(record.videoUrl);
      mediaService.revokePreview(record.thumbnail);
      await refresh();
      setNotice("Video deleted.");
    } catch (deleteError) {
      setError(deleteError.message || "Unable to delete this video.");
    }
  };
  const updatePublication = async (record) => {
    if (!can("publish")) return;
    setError(""); setNotice("");
    try {
      if (record.publicationStatus === "published") await videoRepository.unpublish(record.id);
      else await videoRepository.publish(record.id);
      await refresh();
      setNotice(record.publicationStatus === "published" ? "Video unpublished from the public website." : "Video published to its selected landing-page section.");
    } catch (statusError) {
      setError(statusError.message || "Unable to change publication status.");
    }
  };
  const updateActiveStatus = async (record) => {
    if (!can("edit")) return;
    setError(""); setNotice("");
    try {
      const status = record.status === "active" ? "inactive" : "active";
      await videoRepository.updateStatus(record.id, status);
      await refresh();
      setNotice(status === "active" ? "Video activated." : "Video deactivated and removed from the public website.");
    } catch (statusError) {
      setError(statusError.message || "Unable to change video status.");
    }
  };
  const sourceLabel = (record) => record.sourceType === "upload" ? record.fileName || "Uploaded file" : record.videoUrl;

  return (
    <div className="admin-content video-management">
      <div className="admin-page-heading">
        <div><span className="admin-eyebrow">PUBLIC CONTENT WORKSPACE</span><h1>Video Management</h1><p>Manage videos in approved landing-page sections without changing the site layout.</p></div>
        {can("create") && <button className="admin-primary" onClick={() => openForm(null)}><Plus size={17} /> Add Video</button>}
      </div>
      <div className="admin-demo-banner"><Video size={17} /><span><b>Temporary browser previews</b> — selected files and poster previews are not permanently uploaded. Mock records persist in this browser only.</span></div>
      {notice && <div className="admin-alert admin-alert--success"><Check size={17} />{notice}<button onClick={() => setNotice("")} aria-label="Dismiss success message"><X size={15} /></button></div>}
      {(error || loadError) && <div className="admin-alert admin-alert--error" role="alert">{error || loadError}<button onClick={() => { setError(""); refresh(); }} aria-label="Dismiss error"><X size={15} /></button></div>}

      <section className="admin-panel admin-table-panel">
        <div className="admin-table-toolbar video-toolbar">
          <label className="admin-search"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search videos" aria-label="Search videos" /></label>
          <div className="admin-toolbar-actions">
            <select value={locationFilter} onChange={(event) => setLocationFilter(event.target.value)} aria-label="Filter by section"><option value="">All sections</option>{sections.map(([key, label]) => <option value={key} key={key}>{label}</option>)}</select>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} aria-label="Filter by active status"><option value="">All statuses</option><option value="active">Active</option><option value="inactive">Inactive</option></select>
            <select value={publicationFilter} onChange={(event) => setPublicationFilter(event.target.value)} aria-label="Filter by publication status"><option value="">All publication</option><option value="draft">Draft</option><option value="published">Published</option></select>
          </div>
        </div>
        {loading ? <div className="admin-state"><span className="admin-spinner" /> Loading videos…</div>
          : rows.length === 0 ? <div className="admin-state"><div className="admin-empty-icon"><FileVideo2 size={23} /></div><b>No videos found</b><span>Adjust your filters or add a video to an approved landing-page section.</span>{can("create") && <button className="admin-secondary" onClick={() => openForm(null)}><Plus size={15} /> Add Video</button>}</div>
            : <div className="admin-table-wrap"><table className="admin-table video-table"><thead><tr><th>Preview</th><th>Title</th><th>Landing-page section</th><th>File or URL</th><th>Status</th><th>Publication</th><th className="admin-actions-heading">Actions</th></tr></thead>
              <tbody>{rows.map((record) => <tr key={record.id}>
                <td>{record.thumbnail ? <img className="video-table__thumb" src={record.thumbnail} alt="" /> : <span className="video-table__placeholder"><Video size={17} /></span>}</td>
                <td><strong>{record.title}</strong><small className="video-table__description">{record.description}</small><small>Order {record.displayOrder}</small></td>
                <td>{sections.find(([key]) => key === record.location)?.[1] || "—"}</td>
                <td className="video-table__source" title={sourceLabel(record)}><span>{record.sourceType === "upload" ? <FileVideo2 size={15} /> : <ExternalLink size={14} />}{sourceLabel(record)}</span>{record.sourceType === "upload" && <small>{humanSize(record.fileSize)} · temporary</small>}</td>
                <td><span className={`admin-status status-${record.status}`}>{record.status}</span></td>
                <td><span className={`admin-status status-${record.publicationStatus}`}>{record.publicationStatus}</span></td>
                <td><div className="video-row-actions">
                  <button title="Preview video" aria-label={`Preview ${record.title}`} onClick={() => setModal({ type: "view", record })}><Play size={16} /></button>
                  {can("edit") && <button className="admin-update-button" title="Update video" onClick={() => openForm(record)}><Pencil size={16} /> Update</button>}
                  {can("edit") && <button className="video-action-text" onClick={() => updateActiveStatus(record)}>{record.status === "active" ? "Deactivate" : "Activate"}</button>}
                  {can("publish") && <button className="video-action-text" onClick={() => updatePublication(record)}>{record.publicationStatus === "published" ? "Unpublish" : "Publish"}</button>}
                  {can("delete") && <button title="Delete video" aria-label={`Delete ${record.title}`} className="danger" onClick={() => remove(record)}><Trash2 size={16} /></button>}
                </div></td>
              </tr>)}</tbody>
            </table></div>}
        {!loading && rows.length > 0 && <div className="admin-pagination"><span>{rows.length} video{rows.length === 1 ? "" : "s"}</span><span>Public videos must be both active and published.</span></div>}
      </section>

      {modal && <div className="admin-modal-backdrop video-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget && !busy) closeModal(); }}>
        <section className="admin-modal video-modal" role="dialog" aria-modal="true" aria-labelledby="video-modal-title">
          <header><div><span className="admin-eyebrow">{modal.type === "view" ? "VIDEO PREVIEW" : "VIDEO LIBRARY"}</span><h2 id="video-modal-title">{modal.type === "view" ? modal.record.title : modal.type === "edit" ? "Update video" : "Add video"}</h2></div><button onClick={closeModal} aria-label="Close" disabled={busy}><X size={19} /></button></header>
          {modal.type === "view" ? <div className="video-view-content">
            <VideoPlayer src={modal.record.videoUrl} poster={modal.record.thumbnail} title={modal.record.title} />
            <p>{modal.record.description}</p>
            <div className="video-view-meta"><span>{sections.find(([key]) => key === modal.record.location)?.[1]}</span><span>{modal.record.status} · {modal.record.publicationStatus}</span></div>
          </div> : <form onSubmit={save} noValidate>
            {error && <div className="admin-alert admin-alert--error" role="alert">{error}</div>}
            <div className="video-form-grid">
              <label className={`admin-field${fieldErrors.title ? " has-error" : ""}`}>Video title <span>*</span><input value={form.title} onChange={(event) => setField("title", event.target.value)} required aria-invalid={Boolean(fieldErrors.title)} />{fieldErrors.title && <small>{fieldErrors.title}</small>}</label>
              <label className={`admin-field${fieldErrors.location ? " has-error" : ""}`}>Landing-page section <span>*</span><select value={form.location} onChange={(event) => setField("location", event.target.value)}>{sections.map(([key, label]) => <option value={key} key={key}>{label}</option>)}</select>{fieldErrors.location && <small>{fieldErrors.location}</small>}</label>
              <label className={`admin-field video-form-grid__wide${fieldErrors.description ? " has-error" : ""}`}>Video description <span>*</span><textarea rows="3" value={form.description} onChange={(event) => setField("description", event.target.value)} required />{fieldErrors.description && <small>{fieldErrors.description}</small>}</label>
              <fieldset className="video-source-select video-form-grid__wide"><legend>Video file or URL <span>*</span></legend>
                <div className="video-source-select__choices">
                  <label><input type="radio" name="video-source-type" value="url" checked={form.sourceType === "url"} onChange={() => changeSourceType("url")} /> Video URL</label>
                  <label><input type="radio" name="video-source-type" value="upload" checked={form.sourceType === "upload"} onChange={() => changeSourceType("upload")} /> Upload video</label>
                </div>
                {form.sourceType === "url" ? <label className={`admin-field${fieldErrors.videoUrl ? " has-error" : ""}`}>Video URL<input type="text" inputMode="url" placeholder="/video.mp4 or https://example.com/video.mp4" value={form.videoUrl.startsWith("blob:") ? "" : form.videoUrl} onChange={(event) => setField("videoUrl", event.target.value)} aria-invalid={Boolean(fieldErrors.videoUrl)} />{fieldErrors.videoUrl && <small>{fieldErrors.videoUrl}</small>}</label>
                  : <div className="video-file-control"><label className={`admin-field video-native-file${fieldErrors.videoUrl ? " has-error" : ""}`}>Choose a video file<input type="file" accept="video/mp4,video/webm,video/ogg,.mp4,.webm,.ogg" aria-label="Choose a video file" onChange={(event) => { chooseVideo(event.target.files?.[0]); event.target.value = ""; }} />{fieldErrors.videoUrl && <small>{fieldErrors.videoUrl}</small>}</label><small>MP4 or WebM · maximum 100 MB · temporary browser preview</small>{form.fileName && <span>{form.fileName} · {humanSize(form.fileSize)}</span>}</div>}
              </fieldset>
              <div className="video-poster-field video-form-grid__wide">
                <label className={`admin-field${fieldErrors.thumbnail ? " has-error" : ""}`}>Video thumbnail / poster image URL<input type="text" inputMode="url" placeholder="https://example.com/poster.jpg (optional)" value={form.thumbnail.startsWith("blob:") ? "" : form.thumbnail} onChange={(event) => setField("thumbnail", event.target.value)} />{fieldErrors.thumbnail && <small>{fieldErrors.thumbnail}</small>}</label>
                <div className="video-file-control"><label className="video-file-button"><ImagePlus size={16} /> Choose poster image<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" aria-label="Choose poster image" onChange={(event) => { chooseThumbnail(event.target.files?.[0]); event.target.value = ""; }} /></label><small>JPG, PNG, WebP or GIF · up to 5 MB. A fallback poster is used if omitted.</small></div>
              </div>
              <label className={`admin-field${fieldErrors.displayOrder ? " has-error" : ""}`}>Display order<input type="number" min="0" step="1" value={form.displayOrder} onChange={(event) => setField("displayOrder", event.target.value)} />{fieldErrors.displayOrder && <small>{fieldErrors.displayOrder}</small>}</label>
              <label className={`admin-field${fieldErrors.status ? " has-error" : ""}`}>Video status<select value={form.status} onChange={(event) => setField("status", event.target.value)}><option value="active">Active</option><option value="inactive">Inactive</option></select>{fieldErrors.status && <small>{fieldErrors.status}</small>}</label>
              <label className={`admin-field${fieldErrors.publicationStatus ? " has-error" : ""}`}>Publication status<select value={form.publicationStatus} disabled={!can("publish")} onChange={(event) => setField("publicationStatus", event.target.value)}><option value="draft">Draft</option><option value="published">Published</option></select>{!can("publish") && <small>Publishing requires the video.publish permission.</small>}{fieldErrors.publicationStatus && <small>{fieldErrors.publicationStatus}</small>}</label>
            </div>
            {form.videoUrl && <div className="video-form-preview"><div className="video-form-preview__heading"><strong>Preview before saving</strong><span>{previewStatus === "ready" ? "Preview is ready." : previewStatus === "error" ? "Preview failed. Choose a supported video or check the URL." : "Loading preview…"}</span></div>{previewSource ? <VideoPlayer src={previewSource} poster={form.thumbnail} title={form.title || "Video preview"} onStatusChange={updatePreviewStatus} /> : <div className="video-preview-url-error" role="status">Enter a supported MP4, WebM, or Ogg URL to preview the video.</div>}</div>}
            <div className="admin-modal-actions"><button type="button" className="admin-secondary" onClick={closeModal} disabled={busy}>Cancel</button><button className="admin-primary" disabled={busy}>{busy ? "Checking and saving…" : modal.type === "edit" ? "Save Changes" : "Save Video"}</button></div>
          </form>}
        </section>
      </div>}
    </div>
  );
}
