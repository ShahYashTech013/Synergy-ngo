import { initialProgrammes } from "../../DATA/initialData.js";
import { createRepository } from "./mockRepository.js";

const initiativeContent = {
  "biogas-clean-energy": {
    category: "FLAGSHIP PROGRAMME",
    description: "Promoting household biogas solutions in rural Karnataka and Maharashtra through organic waste management and renewable energy.",
    image: "/WhatsApp%20Image%202026-11-08%20at%203.21.33%20PM.jpeg",
    imageAlt: "HomeBiogas branded flexible digester installed in a garden.",
    imageIsIllustrative: false,
  },
  "sustainable-agriculture": {
    category: "ORGANIC FARMING",
    description: "Encouraging sustainable farming through organic manure, biogas slurry utilization, composting and soil health practices.",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Illustrative photograph of people in a grain field.",
    imageIsIllustrative: true,
  },
  "environment-awareness": {
    category: "ENVIRONMENTAL AWARENESS",
    description: "Supporting community awareness about waste segregation, water conservation, tree plantation and renewable energy.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Illustrative photograph of hands planting a young tree.",
    imageIsIllustrative: true,
  },
  "women-empowerment": {
    category: "LIVELIHOODS & SHGs",
    description: "Supporting rural women's livelihoods through skill development, self-help groups and sustainable income opportunities.",
    image: "/WhatsApp%20Image%202026-11-08%20at%203.21.40%20PM.jpeg",
    imageAlt: "A woman carrying a bundle of gathered firewood outdoors.",
    imageIsIllustrative: false,
  },
};

const initialInitiatives = initialProgrammes.slice(0, 4).map((initiative, index) => ({
  ...initiative,
  ...initiativeContent[initiative.id],
  displayOrder: index + 1,
  isActive: true,
  status: "published",
}));

export const initiativeRepository = createRepository("initiatives", initialInitiatives);
