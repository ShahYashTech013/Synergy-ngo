# Public Image Inventory

Inventory checked recursively under `public/`. It contains five image files in the root and no image subfolders. The additional `synergy vedio.mp4` file is existing video media, not an image, and remains in use by the homepage hero.

| Image path | Visual subject | Dimensions | Aspect ratio | Recommended section |
| --- | --- | --- | --- | --- |
| `public/WhatsApp Image 2026-11-08 at 3.21.32 PM.jpeg` | Kitchen stove with two lit gas burners; an LPG cylinder is visible at the right. This photograph does not show a biogas appliance. | 1280 x 720 px | 16:9 | Smoke-Free Homes / household cooking context, with the LPG distinction stated |
| `public/WhatsApp Image 2026-11-08 at 3.21.33 PM.jpeg` | HomeBiogas branded flexible digester installed in a garden beside a home. | 1200 x 1600 px | 3:4 | Biogas & Clean Energy, plus the homepage hero poster/fallback |
| `public/WhatsApp Image 2026-11-08 at 3.21.40 PM.jpeg` | A woman carrying a bundle of gathered firewood outdoors. | 960 x 1280 px | 3:4 | Rural context and Women Empowerment, without implying a specific programme or outcome |
| `public/From smoke to clean cooking.png` | Two women in a kitchen with a gas burner and a traditional cookstove visible. A Gemini sparkle watermark appears in the image. | 2400 x 1792 px | 1.339:1 | Subject fits Smoke-Free Homes, but excluded because the visible watermark identifies it as AI-generated and AI-generated images are prohibited for this task. |
| `public/Gemini_Generated_Image_fvx2cnfvx2cnfvx2.png` | Two men working with organic material beside a brick dome digester in a field. | 1792 x 2400 px | 0.747:1 | The subject would fit biogas fieldwork, but this file is excluded from website use because its filename identifies it as Gemini-generated and AI-generated images are prohibited for this task. |

## Duplicate check

All five images have distinct SHA-256 hashes; no duplicate image files were found.

## Integration

The three non-generated supplied photographs are referenced in the existing React pages and gallery. The digester image is also used as the homepage video poster/fallback, is visible beneath the video layer, and now appears in the installation section with an unconfirmed-location caption. Exact component references are in `src/App.jsx`, `src/PAGES/About.jsx`, `src/PAGES/WhatWeDo.jsx`, `src/PAGES/initiativeContent.js`, `src/PAGES/biogasLearningContent.js`, and `src/services/repositories/initiativeRepository.js`; the public gallery defaults are in `src/DATA/initialData.js`.

## Placement limits

No non-generated supplied photographs show training workshops, volunteer activities, teams, group events, or impact measurement. The supplied scenes with people working by a digester or cooking are AI-generated and excluded. Existing impact sections are text/statistic layouts without image slots.
