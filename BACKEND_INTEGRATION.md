# Backend integration guide

## Phase 1 status

This repository currently contains a React/Vite frontend with browser-local demonstration repositories. No API server, database, real authentication, file storage, or payment processing is implemented. Mock CRUD records persist in local browser storage and can be cleared by the user; they are not shared across browsers or saved to a server. Demo login and client-side permission checks are for interface development only; they are not security controls.

## Architecture

- `src/services/config.js` centralizes `VITE_DATA_MODE` and `VITE_API_BASE_URL`.
- `src/services/api/apiClient.js` is the shared fetch client. It sends same-origin credentials, JSON payloads, and turns non-success responses into errors.
- `src/services/repositories/` contains domain repositories. Components depend on repository contracts rather than API URLs.
- `src/services/appearance/appearanceRepository.js` stores validated website appearance drafts and published settings in browser storage for the frontend demo. Public sections consume only the published configuration; the editor's iframe preview can also read a temporary, unpublished section configuration.
- `src/services/repositories/mockRepository.js` provides Promise-based mock CRUD, local browser persistence, and the API repository implementation selected by configuration.
- `src/services/mock/mockData.js` is the single seed source for admin and public views.
- `src/hooks/useRepository.js` reads repositories asynchronously and refreshes mock-backed views after changes.
- `src/services/auth/` contains the replaceable auth interface and centralized demo permission definitions.
- `src/services/media/mediaService.js` owns image validation and temporary previews. It deliberately does not claim to persist a file.
- `src/services/media/videoMediaService.js` owns video validation, availability checks, and temporary browser previews. Replace its upload adapter with permanent media storage without changing the admin interface.
- `src/services/payments/paymentService.js` defines a payment boundary and refuses to initiate demo payments.
- `src/admin/` contains the separate admin application and its styles; existing public-site routes remain in `src/App.jsx`.

All repository methods are asynchronous. `getAll()` returns `{ data, total, page, pageSize }`; `getById(id)`, `create(data)`, `update(id, data)`, `delete(id)`, and `updateStatus(id, status)` are provided where relevant. Donation updates are limited to donor contact corrections and administrative notes; amounts, transaction references, payment methods, and verification statuses remain immutable in the UI.

## Switching data adapters

The default is mock mode. Add these values to the frontend build environment to select an API adapter:

```env
VITE_DATA_MODE=api
VITE_API_BASE_URL=https://your-api.example
```

`VITE_API_BASE_URL` is a public endpoint address, not a secret. Do not put credentials, payment keys, or signing secrets in Vite environment variables. `VITE_DATA_MODE=api` switches the domain repositories from mock implementations to the shared API client. Implement the proposed endpoints and align the response envelope before enabling it. Replace the demo `authService` with the backend session implementation in the same phase; the frontend demo authentication is intentionally not an API security layer.

## Data contracts

Use ISO-8601 UTC timestamps, stable string IDs, and the same field names in API responses:

```json
{
  "id": "project_123",
  "title": "Household Biogas Plant",
  "description": "A compact household digester.",
  "location": "Belagavi, Karnataka",
  "installationDate": "2026-03-10",
  "plantCapacity": "2 m³",
  "category": "Household Biogas",
  "images": [{ "id": "media_123", "url": "https://cdn.example/project.jpg", "alt": "Installed plant" }],
  "status": "published",
  "createdAt": "2026-03-10T10:00:00.000Z",
  "updatedAt": "2026-03-10T10:00:00.000Z"
}
```

Additional contracts already represented by the mock data:

- **Impact:** `id`, `title`, `value`, `suffix`, `description`, `icon`, `displayOrder`, `isActive`, `createdAt`, `updatedAt`.
- **Impact charts:** `/impact-charts` contains the approved annual-installation and growth-chart year/value series. Demo graph values are bounded to 0–100 and feed the public charts through the shared repository.
- **Donation:** `id`, `donorName`, `email`, `phone`, `adminNotes`, `amount` (INR decimal for display), `paymentMethod`, `transactionReference`, `paymentStatus`, `donationType`, `campaign`, `createdAt`. Treat payment fields as immutable evidence and verify payments server-side.
- **Volunteer:** `id`, `fullName`, `email`, `phone`, `areaOfInterest`, `experience`, `applicationStatus`, `assignedStaff`, `createdAt`, `updatedAt`.
- **Enquiry:** `id`, `fullName`, `email`, `phone`, `location`, `plantType`, `message`, `enquiryStatus`, `assignedStaff`, `internalNotes`, `createdAt`, `updatedAt`. Administrative updates must preserve the visitor-submitted fields.
- **Campaign:** `id`, `title`, `description`, `image`, `goalAmount`, `startDate`, `endDate`, `status`, `createdAt`, `updatedAt`.
- **Media:** `id`, `title`, `category`, `image`, `location`, `publishedAt`, `status`, `createdAt`, `updatedAt`. For persisted media, return an image URL and storage metadata instead of a `blob:` preview.
- **Video:** `id`, `title`, `description`, `videoUrl`, `sourceType` (`url` or `upload`), `fileName`, `contentType`, `fileSize`, `thumbnail`, `location`, `displayOrder`, `status` (`active` or `inactive`), `publicationStatus` (`draft` or `published`), `createdAt`, `updatedAt`. Public reads must include only active, published videos and approved locations.
- **Story:** `id`, `title`, `description`, `image`, `location`, `publishedAt`, `status`, `createdAt`, `updatedAt`.
- **User:** `id`, `fullName`, `email`, `role`, `permissions`, `status`, `createdAt`, `updatedAt`. Never return password hashes or authentication secrets.
- **Contact/settings:** Public organization profile records should be explicitly approved/active before exposure to anonymous website visitors.

Recommended statuses in this UI are `draft`, `published`, `completed`, `active`, `inactive`, `pending`, `approved`, `declined`, `new`, `in_progress`, `resolved`, `paid`, `failed`, `refunded`, and `rejected`, as applicable to each resource.

## Proposed API contracts (not implemented endpoints)

The following are proposed REST contracts, not server functionality shipped in this project. The frontend client uses resource paths matching these names.

| Resource | Proposed endpoints |
|---|---|
| Projects | `GET/POST /projects`, `GET/PUT/DELETE /projects/:id`, `PATCH /projects/:id/status` |
| Volunteers | `GET/POST /volunteers`, `GET/PUT /volunteers/:id`, `PATCH /volunteers/:id/status` |
| Donations | `GET /donations`, `GET /donations/:id`, `PUT /donations/:id` (allow donor contact corrections and administrative notes only; reject changes to payment evidence) |
| Campaigns | `GET/POST /campaigns`, `GET/PUT/DELETE /campaigns/:id`, `PATCH /campaigns/:id/status` |
| Contacts | `GET/POST /contacts`, `GET/PUT/DELETE /contacts/:id`, `PATCH /contacts/:id/status` |
| Enquiries | `GET/POST /enquiries`, `GET/PUT /enquiries/:id`, `PATCH /enquiries/:id/status` |
| Impact | `GET/POST /impact`, `GET/PUT/DELETE /impact/:id`, `PATCH /impact/:id/status` |
| Impact charts | `GET /impact-charts`, `GET/PUT /impact-charts/:id` (validate approved year/value series before publishing to public charts) |
| Media | `GET/POST /media`, `GET/PUT/DELETE /media/:id`, `PATCH /media/:id/status`, `POST /media/uploads` |
| Videos | `GET/POST /videos`, `GET/PUT/DELETE /videos/:id`, `PATCH /videos/:id/status` |
| Stories | `GET/POST /stories`, `GET/PUT/DELETE /stories/:id`, `PATCH /stories/:id/status` |
| Users | `GET/POST /users`, `GET/PUT/DELETE /users/:id`, `PATCH /users/:id/status` |
| Activities | `GET /activities` (write audit events on the server when administrative mutations succeed) |
| Settings | `GET/PUT /settings/:id` |
| Session | `POST /auth/login`, `POST /auth/logout`, `GET /auth/me`, `POST /auth/forgot-password`, `POST /auth/reset-password` |
| Payments | `POST /payments/checkout`, `POST /payments/webhook` (provider verification must be server-side) |

Collection requests use `search`, `status`, `page`, and `pageSize` query parameters. Return:

```json
{
  "data": [{ "id": "project_123", "title": "Household Biogas Plant" }],
  "total": 42,
  "page": 1,
  "pageSize": 20
}
```

Create/update requests send the resource fields as JSON. Return the saved resource (or `204 No Content` for delete). For example:

```http
POST /projects
Content-Type: application/json
```

```json
{
  "title": "Village Digester",
  "description": "Community-scale clean cooking installation.",
  "location": "Dharwad, Karnataka",
  "installationDate": "2026-11-12",
  "plantCapacity": "8 m³",
  "category": "Community Biogas",
  "images": [],
  "status": "draft"
}
```

```json
{
  "data": {
    "id": "project_456",
    "title": "Village Digester",
    "description": "Community-scale clean cooking installation.",
    "location": "Dharwad, Karnataka",
    "installationDate": "2026-11-12",
    "plantCapacity": "8 m³",
    "category": "Community Biogas",
    "images": [],
    "status": "draft",
    "createdAt": "2026-11-12T10:00:00.000Z",
    "updatedAt": "2026-11-12T10:00:00.000Z"
  }
}
```

The API adapter and UI should agree on whether responses are direct records or wrapped in `data`. If using the example wrapper for individual responses, unwrap it in the repository adapter (do not spread response-envelope logic through React components). The mock UI adds activity entries for its own demo mutations; in API mode, activity records must be generated by the server, not trusted from a browser.

## Authentication and authorization requirements

The login screen's selected role and the client-side route/menu permission checks are demonstrations only. In Phase 2:

1. Implement `login`, `logout`, `getCurrentUser`/session restoration, and permission retrieval in the auth service using the chosen server session/token design.
2. Prefer secure, HTTP-only, same-site cookies for browser sessions where appropriate; protect state-changing cookie-authenticated requests against CSRF.
3. Enforce authentication and permission checks on **every** protected endpoint. Never rely on a hidden menu item or client-side route guard.
4. Define server-managed permissions for Super Admin, Admin, and assigned Staff. Return only the current user's authorized permissions and scope Staff record reads/updates to assigned records.
5. Apply least privilege, validate all inputs server-side, record privileged actions, and protect user/role administration.
6. Require public read endpoints to return only published stories/projects/campaigns and approved media or contact information.

Suggested permission names follow `<resource>.<action>`, for example `projects.view`, `projects.create`, `projects.edit`, `projects.publish`, `projects.delete`, `donations.edit` (donor corrections/admin notes only), `donations.export`, and `users.edit`.

## Website appearance management (future API)

The appearance editor is a controlled layout service, not a CSS editor. Its allowlisted section IDs, supported controls, numeric bounds, design-token defaults, and responsive breakpoints are defined in `src/services/appearance/appearanceConfig.js`. The async `appearanceRepository` currently persists drafts, published settings, a bounded recovery history, and a temporary preview in local browser storage. The public website reads only published settings except when loaded in the editor's explicit preview mode.

Replace the local-storage adapter behind `appearanceRepository` with these authenticated endpoints; keep its existing async method contract so the editor and public components do not need API-specific code:

| Method | Proposed endpoint | Contract |
|---|---|---|
| `getAppearanceSettings()` | `GET /admin/website-appearance` | Return `{ drafts, published, history }` for the authorized user. |
| `getSectionSettings(sectionId)` | `GET /admin/website-appearance/:sectionId` | Return the authorized section's draft, published settings, or approved defaults. |
| `saveDraft(settings)` | `PUT /admin/website-appearance/:sectionId/draft` | Validate the allowlisted fields and bounds; save as unpublished. |
| `publishSettings(sectionId)` | `POST /admin/website-appearance/:sectionId/publish` | Revalidate, publish atomically, and retain the prior version for recovery. |
| `resetSection(sectionId)` | `POST /admin/website-appearance/:sectionId/reset` | Restore the section defaults while retaining the previous version in history. |
| `resetAllSettings()` | `POST /admin/website-appearance/reset` | Require confirmation in the UI and privileged server authorization; restore all approved defaults with a recoverable snapshot. |

Use the existing shape `{ sectionId, spacing, alignment, typography, responsive, status }`. `responsive` contains only the supported `desktop`, `tablet`, and `mobile` spacing/font-size values for that section. Reject unknown section IDs, unsupported settings, non-finite numeric values, and unauthorized publish/reset operations. Never accept or persist arbitrary CSS, selectors, fonts, colors, weights, routes, or structural edits. Proposed permission: `appearance.manage`; the Super Admin role receives it, while Admin and Staff receive it only through an explicit server-managed grant. Enforce that permission on every endpoint. The current frontend route/menu guard and demo role assignment are not security controls.

## Media and payment integration

The media selector validates JPG/PNG/WEBP/GIF files up to 5 MB and makes a temporary object URL preview. The preview is not an upload and is not durable. Implement `mediaService.upload(file)` against authenticated multipart `POST /media/uploads`, returning durable metadata such as `{ id, url, fileName, contentType, size }`; store the durable URL/ID through the media or project repository. Enforce file size/type, authorization, malware scanning, and storage policies on the server.

### Video upload and media contracts

The current video interface accepts direct HTTP(S) MP4, WebM, and Ogg URLs, root-relative public video paths such as `/video%20name.mp4`, or browser-selected MP4/WebM/Ogg files up to 100 MB. Windows file-system paths are not URLs; users select local files with the video file input. The video URL and optional poster-image URL are separate fields; video extensions are rejected in the poster field, and a configured fallback poster is used when no poster is supplied. Local file previews use `URL.createObjectURL(file)`: they are temporary to the browser session, must load in the preview player before saving, are revoked when replaced/cancelled/deleted or when the page unloads, and are not uploads or durable storage. The UI depends on `videoMediaService.createPreview(file)` for this temporary behavior and `videoMediaService.upload(file)` as the replaceable upload boundary. In the backend phase, implement `upload(file)` with authenticated multipart `POST /media/video-uploads`; do not change the Video Management page.

Proposed multipart request:

```http
POST /media/video-uploads
Content-Type: multipart/form-data
```

Include a `file` field containing the video, and optionally a `poster` image field. The backend must enforce authorization, size and content-type limits, verify the media, and return a durable HTTPS URL (never a `blob:` URL):

```json
{
  "id": "video_media_123",
  "url": "https://cdn.example.org/videos/community-digester.mp4",
  "fileName": "community-digester.mp4",
  "contentType": "video/mp4",
  "size": 18350000,
  "poster": {
    "id": "poster_media_123",
    "url": "https://cdn.example.org/videos/community-digester-poster.jpg",
    "contentType": "image/jpeg",
    "size": 240000
  }
}
```

Persist the returned media ID/URL in the video record (`videoUrl`, `fileName`, `contentType`, `fileSize`, and `thumbnail`). The video repository uses the existing async repository shape and proposed `GET/POST /videos`, `GET/PUT/DELETE /videos/:id`, and `PATCH /videos/:id/status` endpoints. `PUT /videos/:id` accepts `publicationStatus` changes as part of the existing record; updates must preserve the record ID. The six allowed `location` values are `hero`, `biogas`, `initiatives`, `installation-plants`, `impact`, and `our-story`. Reject all other locations server-side. Anonymous landing-page reads must exclude drafts and inactive records; each video is rendered only in the component slot for its selected approved location.

Example video record:

```json
{
  "id": "video_123",
  "title": "Community biogas in action",
  "description": "A short introduction to the community installation.",
  "videoUrl": "https://cdn.example.org/videos/community-digester.mp4",
  "sourceType": "upload",
  "fileName": "community-digester.mp4",
  "contentType": "video/mp4",
  "fileSize": 18350000,
  "thumbnail": "https://cdn.example.org/videos/community-digester-poster.jpg",
  "location": "biogas",
  "displayOrder": 1,
  "status": "active",
  "publicationStatus": "published",
  "createdAt": "2026-11-13T05:30:00.000Z",
  "updatedAt": "2026-11-13T05:30:00.000Z"
}
```

Use permissions `video.view`, `video.create`, `video.edit`, `video.delete`, and `video.publish`. Super Admin receives all permissions, Admin receives the configured video permissions, and Staff receives none unless explicitly granted. These client-side permissions are demonstration UI only; enforce them on every backend endpoint.

No live donation is submitted by this frontend. Integrate the payment provider behind `paymentService`; create checkout sessions on the server, keep all secrets server-side, validate provider callbacks/webhooks, and expose payment status only after server verification. Never store card data in this app.

## Errors and operations

Use non-2xx HTTP status codes and a consistent JSON error envelope, for example:

```json
{
  "message": "Validation failed.",
  "errors": { "title": "Title is required." },
  "requestId": "req_123"
}
```

The API client raises errors with `message`, `status`, and `details`; keep actionable validation details in the response. Use `401` for missing/expired authentication, `403` for insufficient permission, `404` for missing records, `409` for conflicts, `422` for validation errors, and `5xx` for unexpected server errors. Do not return success-shaped data on failures.

## Phase 2 replacement checklist

1. Implement the proposed contracts and a backend-owned schema/mapping for the data models.
2. Configure `VITE_DATA_MODE=api` and `VITE_API_BASE_URL` in the deployment environment.
3. Confirm collection envelopes, status values, and media fields; adjust only repository adapters if backend DTOs differ.
4. Replace demo `authService` with real session restoration/login/logout and server-provided permissions.
5. Enforce all permissions and publication/approval rules on the server.
6. Add upload and payment provider flows through their service abstractions; do not make a local preview or mock payment appear persisted/verified.
7. Test both authorized and unauthorized API calls, validation failures, pagination, and public visibility before deployment.
