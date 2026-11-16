import { assetUrl } from "../utils/assetUrl";

export const initialProgrammes = [
  {
    id: "biogas-clean-energy",
    title: "Biogas for Clean Energy",
    badge: "Flagship Programme",
    shortDesc: "Promoting household biogas units in rural Karnataka & Maharashtra using cattle dung and organic wet waste.",
    problem: "Traditional cooking fuels such as firewood and biomass create hazardous indoor smoke and increase deforestation pressure on local natural resources.",
    solution: "Closed-tank anaerobic biogas digesters process daily cattle dung and wet kitchen waste into clean, dependable cooking fuel and rich organic slurry.",
    activities: [
      "Village-level baseline survey & household feasibility assessment",
      "Turnkey construction & installation guidance for household biogas units",
      "Hands-on user training on daily dung-water mixing ratios & safety",
      "Post-installation field monitoring, troubleshooting & ongoing maintenance",
    ],
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "sustainable-agriculture",
    title: "Sustainable Agriculture Support",
    badge: "Organic Farming",
    shortDesc: "Converting nutrient-rich biogas slurry into organic fertiliser alongside composting and soil health workshops.",
    problem: "Heavy reliance on synthetic chemical fertilizers degrades long-term soil organic carbon and increases farming debt.",
    solution: "Training farmers to utilize biogas slurry/residuals, vermiculture, crop rotation, intercropping, and natural pest management.",
    activities: [
      "Biogas slurry manure application & enrichment workshops",
      "Demonstration plots for composting, vermiculture & soil health",
      "Natural pest management & bio-fertilizer practical training",
    ],
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "environment-awareness",
    title: "Environmental Awareness Campaigns",
    badge: "Eco Habits",
    shortDesc: "Community and school drives for waste segregation, water conservation, tree plantation, and renewable energy.",
    problem: "Lack of structured waste management and deforestation affect rural water tables and community ecosystems.",
    solution: "Grassroots awareness rallies, school eco-clubs, plastic reduction drives, and native tree plantation programmes.",
    activities: [
      "Household wet/dry waste segregation & composting demonstrations",
      "Water conservation, rainwater awareness & village cleanups",
      "Monsoon native tree plantation drives with survival monitoring",
    ],
    image: "https://images.unsplash.com/photo-1542601098-3adb3baeb1ec?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "women-empowerment",
    title: "Women Empowerment Programs",
    badge: "Livelihoods & SHGs",
    shortDesc: "Supporting rural women through tailoring, handicrafts, food processing, financial literacy, and Self-Help Groups.",
    problem: "Rural women face severe respiratory health risks from indoor smoke and lack independent household livelihood opportunities.",
    solution: "Time saved from clean cooking is channeled into income-generating vocational skills and Self-Help Group micro-enterprises.",
    activities: [
      "Tailoring, embroidery & local handicraft production batches",
      "Home-based food processing, packaging & hygiene workshops",
      "Digital payments, household budgeting & financial literacy camps",
    ],
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "youth-skill-development",
    title: "Youth Skill Development",
    badge: "Employability",
    shortDesc: "Equipping rural youth with vocational training, digital awareness, soft skills, and rural entrepreneurship.",
    problem: "Rural youth face unemployment due to a lack of hands-on technical trades and workplace communication skills.",
    solution: "Practical vocational workshops, biogas technician trades, digital literacy, and rural entrepreneurship mentoring.",
    activities: [
      "Vocational & green-tech maintenance training",
      "Workplace communication, teamwork & time management",
      "Digital awareness, career readiness & micro-enterprise guidance",
    ],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
  },
];

export const initialBiogasSteps = [
  { step: 1, title: "1. Organic Waste", desc: "Cattle dung (Gobar) + household wet organic matter collected daily.", icon: "bi-recycle" },
  { step: 2, title: "2. Biogas Digester", desc: "Processed inside an oxygen-free closed underground digester tank.", icon: "bi-gear-wide-connected" },
  { step: 3, title: "3. Clean Cooking Gas", desc: "Piped directly to the household kitchen burner for smoke-free cooking.", icon: "bi-fire" },
  { step: 4, title: "4. Nutrient Slurry", desc: "Digested bio-slurry automatically discharges into the collection pit.", icon: "bi-droplet-half" },
  { step: 5, title: "5. Organic Farming", desc: "Slurry applied to fields as high-grade manure to revitalize soil health.", icon: "bi-flower1" },
];

export const initialGalleryItems = [
  { id: 1, category: "Biogas installation", caption: "HomeBiogas branded flexible digester in a garden", location: "", date: "", image: assetUrl("/WhatsApp%20Image%202026-11-08%20at%203.21.33%20PM.jpeg") },
  { id: 2, category: "Household cooking", caption: "Kitchen stove with two gas burners lit; LPG cylinder visible", location: "", date: "", image: assetUrl("/WhatsApp%20Image%202026-11-08%20at%203.21.32%20PM.jpeg") },
  { id: 3, category: "Rural context", caption: "A woman carrying a bundle of gathered firewood outdoors", location: "", date: "", image: assetUrl("/WhatsApp%20Image%202026-11-08%20at%203.21.40%20PM.jpeg") },
];

export const initialDonations = [
  {
    id: "pay_P9kL82mX10",
    orderId: "order_N8jK19zQ01",
    donorName: "Rajesh Kulkarni",
    email: "rajesh.k@example.com",
    phone: "9823012345",
    amountPaise: 250000,
    campaign: "Biogas for Clean Energy",
    status: "PAID",
    date: "2026-11-05",
  },
  {
    id: "pay_P9kM44vB92",
    orderId: "order_N8jM01pL88",
    donorName: "Sneha Deshmukh",
    email: "sneha.d@example.com",
    phone: "9765432109",
    amountPaise: 500000,
    campaign: "Women Empowerment Programs",
    status: "PAID",
    date: "2026-11-07",
  },
];
