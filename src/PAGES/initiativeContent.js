import { biogasLearningNavigation } from "./biogasLearningContent.js";
import { assetUrl } from "../utils/assetUrl";

// Shared Authentic Imagery
const ruralPortrait = assetUrl("/WhatsApp%20Image%202026-11-08%20at%203.21.40%20PM.jpeg");
const primaryBiogasPhoto = assetUrl("/images/biogas/biogas_clean_energy_photo.jpg");
const authenticFieldBiogas = assetUrl("/images/biogas/IMG2%20BIO%20GAS.jpeg");

const agriHarvest = assetUrl("/images/agriculture/indian_farmers_organic_harvest_1795029142115.jpg");
const agriBioSlurry = assetUrl("/images/agriculture/farmer_applying_bio_slurry_1795029135211.jpg");
const agriTraining = assetUrl("/images/agriculture/rural_agri_training_session_1795029129506.jpg");
const agriResilience = assetUrl("/images/agriculture/sustainable_agriculture_biodiversity_resilience.jpg");

const envPlantation = assetUrl("/images/environment/environmental_community_tree_plantation_1795026126588.jpg");
const envWaste = assetUrl("/images/environment/environmental_waste_management_campaign_clean_1795026100792.jpg");
const envWorkshop = assetUrl("/images/environment/environmental_awareness_workshop_1795026156562.jpg");
const envEngagement = assetUrl("/images/environment/environmental_community_engagement_stewardship.jpg");

const womenTailoring = assetUrl("/images/women/rural_women_tailoring_training_1795029146013.jpg");
const womenBachatGat = assetUrl("/images/women/mahila_bachat_gat_meeting_1795029152941.jpg");
const womenLeaders = assetUrl("/images/women/rural_women_community_leaders_1795029155069.jpg");
const womenCollectiveStrength = assetUrl("/images/women/rural_women_collective_leadership_1795106410819.jpg");

const skillsVocational = assetUrl("/images/skills/vocational_skills_training_india_1795029167099.jpg");
const skillsDigital = assetUrl("/images/skills/digital_literacy_classroom_1795029180903.jpg");
const skillsWorkshop = assetUrl("/images/skills/indian_entrepreneur_workshop_1795029177202.jpg");
const skillsEntrepreneurship = assetUrl("/images/skills/indian_youth_entrepreneurship_workshop_1795107173652.jpg");

export const initiativePages = {
  // =========================================================================
  // 01. BIOGAS FOR CLEAN ENERGY
  // =========================================================================
  "initiative-biogas-clean-energy": {
    key: "biogas",
    index: "01",
    title: "BIOGAS FOR CLEAN ENERGY",
    subtitle: "Clean Household Cooking Fuel & Organic Agro-Slurry Solutions",
    motto: "“Turning Natural Resources Into Clean Energy.”",
    categoryTag: "SYNERGY ORGANISATION · RURAL SUSTAINABILITY INITIATIVE",
    metadata: {
      domain: "Renewable Energy & Organic Farming",
      activeRegion: "Rural Maharashtra & Karnataka",
      timeline: "Established 2010 (Fieldwork since 1990)",
      coreFocus: "Household Digesters & Bio-Fertilizer",
    },
    summaryLead:
      "Discover how biogas and non-conventional energy can support cleaner, healthier homes and more sustainable rural communities across Maharashtra and Karnataka.",
    photos: {
      primary: {
        src: authenticFieldBiogas,
        caption:
          "Resident beside a flexible biogas digester and connected equipment.",
        fig: "FIG. 01 — CLEAN HOUSEHOLD ENERGY",
        stripHeading: "CLEAN ENERGY & HEALTHIER COMMUNITIES",
      },
      field: {
        src: assetUrl("/images/biogas/biogas-sustainable-agriculture.jpg"),
        caption:
          "Rural Indian farmer applying organic bio-slurry fertilizer beside a biogas plant.",
        fig: "FIG. 02 — BIO-SLURRY APPLICATION",
        stripHeading: "ORGANIC BIO-SLURRY APPLICATION",
      },
      conclusion: {
        src: assetUrl("/images/biogas/biogas-community-empowerment.jpg"),
        caption:
          "Rural Indian woman cooking with clean blue biogas flame on veranda with village community.",
        fig: "FIG. 03 — SMOKELESS COOKING & CLEAN FLAME",
        stripHeading: "SMOKELESS COOKING & CLEAN FLAME",
      },
    },
    editorialBanner: {
      headline: "CLEAN ENERGY. HEALTHIER COMMUNITIES.",
      sub: "Sustainable solutions for rural transformation.",
    },
    fieldCard: {
      title: "Authentic Rural Field Reality",
      text: "Photographed in rural village homesteads across Maharashtra and Karnataka, reflecting genuine daily adoption of clean household biogas systems.",
    },
    conclusion: {
      tag: "PROGRAMME COMMITMENT",
      title: "Conclusion",
      text: "Synergy Organisation's Biogas for Clean Energy initiative demonstrates how innovative, sustainable technologies can transform rural communities. By providing access to clean energy and promoting organic farming practices, the programme enhances health, livelihoods, and ecological well-being simultaneously. Through continued awareness, training, and community engagement, Synergy Organisation strives to create healthier, self-reliant, and eco-conscious communities, laying the foundation for a cleaner, greener, and more sustainable future for generations to come.",
    },
    story: {
      kickerNum: "01",
      kickerTag: "EDITORIAL STORY & FIELD INITIATIVE",
      title: "Powering Rural Communities Through Sustainable Energy.",
      subheadings: [
        "Bio-Slurry & Organic Agriculture",
        "Rural Livelihoods & Economic Empowerment",
      ],
      lead: "Synergy Organisation actively promotes the adoption of biogas technology as a sustainable and eco-friendly energy solution, particularly in rural and semi-urban communities where traditional cooking relies heavily on firewood, coal, or other biomass fuels. By converting organic waste—such as food waste, agricultural residues, and animal dung—into clean energy, the programme provides households with a reliable and environmentally responsible alternative to conventional fuels. This reduces indoor air pollution, mitigates deforestation, and lowers greenhouse gas emissions, contributing directly to improved health and environmental protection.",
      paragraphs: [
        "The benefits of biogas extend beyond energy production. The anaerobic digestion process generates nutrient-rich slurry as a by-product, which can be used as an effective organic fertilizer for farming. This dual advantage addresses both energy and agricultural needs, promoting sustainable farming practices, enhancing soil fertility, improving crop yields, and reducing dependency on chemical fertilizers. By integrating clean energy solutions with agriculture, the programme supports holistic rural development that is environmentally sound and economically viable.",
        "Through this integrated approach, the Biogas for Clean Energy programme contributes to improved rural livelihoods, economic empowerment, and environmental stewardship. Households benefit from reduced energy costs, cleaner cooking environments, and increased agricultural productivity, while communities as a whole become more self-reliant and environmentally conscious.",
      ],
      contextBox: {
        title: "Energy From Everyday Resources",
        items: [
          "Biogas is a renewable fuel produced when microorganisms break down biodegradable material such as animal manure and some organic waste in an oxygen-free digester.",
          "The gas can be used for suitable energy needs, while the remaining digestate may be managed as a soil amendment when handled appropriately. System design, feedstock and safe operation all matter.",
          "Synergy Organization's stated vision includes promoting non-conventional energy and environmental awareness in rural households.",
        ],
      },
    },
    process: {
      kickerNum: "02",
      kickerTag: "FIELD ARCHITECTURE & WORKFLOW",
      categoryTag: "A SIMPLE, PROVEN PROCESS",
      heading: "From Natural Resources to Usable Energy.",
      description:
        "A general overview of anaerobic digestion. Actual systems vary by design, feedstock availability and operating conditions.",
      steps: [
        { title: "Collect organic material", description: "Gather suitable biodegradable feedstock, such as animal manure and organic waste.", icon: "recycle" },
        { title: "Feed the digester", description: "Introduce prepared feedstock into a properly designed, sealed digestion system.", icon: "sprout" },
        { title: "Anaerobic digestion", description: "Microorganisms break down the material in an oxygen-free environment.", icon: "light" },
        { title: "Biogas forms", description: "The process produces a gas mixture, primarily methane and carbon dioxide.", icon: "flame" },
        { title: "Use energy safely", description: "With suitable equipment and operation, biogas can serve appropriate energy applications.", icon: "house" },
        { title: "Manage digestate", description: "The remaining material may be used as a soil amendment when safely and appropriately managed.", icon: "leaf" },
      ],
    },
    learningModules: {
      categoryTag: "EXPLORE THE SUBJECT IN DEPTH",
      heading: "Technical Learning Modules & Guides",
      description:
        "Four structured reference guides exploring biogas fundamentals, digestion dynamics, system designs, and household suitability considerations.",
      items: biogasLearningNavigation.map((item, idx) => ({
        badge: `MODULE 0${idx + 1}`,
        title: item.label,
        page: item.page,
      })),
    },
    applications: {
      kickerNum: "03",
      kickerTag: "PRACTICAL APPLICATIONS & IMPACT",
      heading: "Design the System Around the Intended Use.",
      description:
        "The right configuration depends on available feedstock, scale, gas quality, equipment and local operating capacity.",
      items: [
        { title: "Household cooking", description: "Biogas can fuel a compatible cooking appliance when gas supply, installation and operation are suitable.", icon: "flame" },
        { title: "Heat applications", description: "Some systems use biogas to provide heat with equipment designed for the gas and its conditions.", icon: "light" },
        { title: "Electricity generation", description: "At an appropriate scale, biogas can power compatible generators, with technical oversight and suitable gas treatment.", icon: "sprout" },
        { title: "Digestate use", description: "Digestate may be managed as a soil amendment only when it is suitable and handled according to local guidance.", icon: "leaf" },
      ],
    },
    benefits: {
      categoryTag: "WHY CLEAN ENERGY MATTERS",
      heading: "A Practical Part of a More Sustainable Future.",
      description:
        "Biogas is one option among many. Its suitability depends on local resources, system design, maintenance and safe operation.",
      items: [
        { title: "Energy awareness", description: "Build understanding of renewable and non-conventional energy options.", icon: "light" },
        { title: "Resource use", description: "Organic material can become a useful input when a suitable system is available.", icon: "recycle" },
        { title: "Household options", description: "Biogas may provide cooking energy with correctly designed and operated appliances.", icon: "house" },
        { title: "Environmental care", description: "Responsible energy choices can be part of broader environmental awareness.", icon: "leaf" },
      ],
      disclosure:
        "These are general technology considerations, not independently verified Synergy Organization impact claims.",
    },
    heritageStory: {
      image: ruralPortrait,
      caption: "Rural context / supplied photograph of daily firewood gathering before clean cooking transition.",
      fig: "FIG. 02 — RURAL CONTEXT",
      tag: "OUR VISION & HERITAGE",
      title: "A Cleaner Energy Future for Every Rural Household.",
      text: "Synergy Organization's stated vision is to promote non-conventional energy and environmental awareness in rural households. The organization was established in 2010 by Mr. Nandkumar Patil, whose dedicated grassroots work began in 1990.",
      quote: "“Promoting non-conventional energy and environmental awareness in rural households.”",
      cite: "— Mr. Nandkumar Patil, Founder (Work began 1990, Synergy established 2010)",
    },
    cta: {
      tag: "BE PART OF THE ENERGY TRANSFORMATION",
      heading: "Support a Cleaner Energy Future.",
      description:
        "Explore how clean energy awareness fits into Synergy Organization's wider rural development focus across Karnataka and Maharashtra.",
      primaryBtn: "Donate Now",
      secondaryBtn: "Back to Initiatives",
    },
  },

  // =========================================================================
  // 02. SUSTAINABLE AGRICULTURE SUPPORT
  // =========================================================================
  "initiative-agriculture": {
    key: "agriculture",
    index: "02",
    title: "SUSTAINABLE AGRICULTURE SUPPORT",
    subtitle: "Regenerative Farming, Bio-Slurry Topsoil Enrichment & Farmer Resilience",
    motto: "“Restoring Soil Health. Empowering Rural Farmers.”",
    categoryTag: "SYNERGY ORGANISATION · RURAL AGRICULTURE INITIATIVE",
    metadata: {
      domain: "Organic Farming & Soil Conservation",
      activeRegion: "Farming Belts of Maharashtra & Karnataka",
      timeline: "Continuous Grassroots Extension Since 2010",
      coreFocus: "Bio-Slurry Manure, Vermiculture & Crop Health",
    },
    summaryLead:
      "Empowering smallholder farmers to transition away from expensive chemical fertilizers toward organic bio-slurry, natural soil replenishment, and climate-resilient farming techniques.",
    photos: {
      primary: {
        src: agriTraining,
        caption:
          "Agricultural specialist providing practical training on organic farming and soil health to rural Indian farmers.",
        fig: "FIG. 01 — FARMER EDUCATION & TRAINING",
        stripHeading: "REGENERATIVE AGRICULTURE & SOIL RESTORATION",
      },
      field: {
        src: agriBioSlurry,
        caption:
          "Indian farmer applying organic biogas slurry fertilizer to enrich soil and nourish healthy crops.",
        fig: "FIG. 02 — BIO-SLURRY SOIL ENRICHMENT",
        stripHeading: "BIO-SLURRY SOIL ENRICHMENT",
      },
      conclusion: {
        src: agriHarvest,
        caption:
          "Rural Indian farming couple celebrating a bountiful organic harvest in verdant agricultural field.",
        fig: "FIG. 03 — BOUNTIFUL ORGANIC HARVEST",
        stripHeading: "BOUNTIFUL ORGANIC HARVEST & RESILIENCE",
      },
    },
    editorialBanner: {
      headline: "HEALTHY SOIL. RESILIENT HARVEST.",
      sub: "Natural agro-inputs for sustainable rural prosperity.",
    },
    fieldCard: {
      title: "Authentic Rural Field Reality",
      text: "Documented across rural farming clusters where bio-slurry replaces synthetic urea and DAP, restoring earthworm activity and boosting agricultural output.",
    },
    conclusion: {
      tag: "PROGRAMME COMMITMENT",
      title: "Conclusion",
      text: "Sustainable agriculture support programs represent a forward-thinking approach to farming—one that balances productivity with environmental responsibility. By reducing reliance on chemical inputs, promoting organic practices, and utilizing natural resources such as biogas slurry, these initiatives create a healthier agricultural ecosystem. In the long run, they ensure food security, economic stability, and environmental preservation, enabling rural farmers to thrive while protecting the land for future generations.",
    },
    story: {
      kickerNum: "01",
      kickerTag: "EDITORIAL STORY & FIELD INITIATIVE",
      title: "Nurturing Soil Health & Empowering Rural Farmers.",
      subheadings: [
        "Farmer Education & Capacity Building",
        "Bio-Slurry as Natural Fertilizer",
      ],
      lead: "Sustainable agriculture support programs play a vital role in strengthening rural livelihoods while protecting the environment. These initiatives encourage farmers to transition toward organic and eco-friendly farming practices, reducing their dependence on harmful chemical fertilizers and pesticides. By promoting sustainable methods, the programs aim to create a balanced agricultural system that improves productivity without degrading natural resources.",
      paragraphs: [
        "A key focus of these programs is farmer education and capacity building. Through structured training sessions, field demonstrations, and practical workshops, farmers learn effective techniques such as crop rotation, intercropping, composting, vermiculture, and natural pest management. These methods not only enhance soil health but also reduce the long-term costs associated with chemical inputs. By understanding the science behind sustainable farming, farmers are empowered to make informed decisions that benefit both their crops and the environment.",
        "One of the most impactful components of these initiatives is the use of biogas slurry as a natural fertilizer. Biogas slurry, a by-product of biogas production, is rich in essential nutrients and organic matter. When applied to fields, it helps restore soil fertility, improve soil structure, and increase moisture retention capacity. Unlike chemical fertilizers, it releases nutrients gradually, ensuring sustained crop growth and minimizing the risk of soil degradation. Additionally, the use of organic inputs significantly reduces chemical runoff into water bodies, protecting local ecosystems and groundwater quality.",
      ],
      contextBox: {
        title: "Agro-Ecological Principles",
        items: [
          "Anaerobic digestate slurry contains readily bioavailable nitrogen, phosphorus, and potassium, plus active beneficial soil microbial flora.",
          "Organic farming significantly cuts farm debt by eliminating dependence on high-cost commercial fertilizers and chemical pesticides.",
          "Soil enriched with organic matter retains up to 30% more moisture, imparting critical drought resistance to rain-fed rural crops.",
        ],
      },
    },
    featureRow: {
      subheading: "Agro-Biodiversity & Climate Resilience",
      paragraphs: [
        "Sustainable agriculture programs also promote biodiversity and climate resilience. By encouraging diverse cropping patterns and reducing chemical dependency, farms become more resistant to pests, diseases, and changing weather conditions. Healthy soil with improved organic content is better equipped to withstand droughts and heavy rainfall, ensuring stable yields even in challenging conditions. This resilience is critical for rural communities that rely heavily on agriculture for their income and food supply.",
        "Beyond environmental benefits, these programs contribute to economic stability for farmers. Reduced input costs, improved crop quality, and higher market demand for organic produce create better income opportunities. Farmers can access new markets and premium pricing for organically grown products, enhancing their financial security. In turn, this supports local economies and strengthens rural development.",
        "By integrating sustainable practices with modern agricultural knowledge, these programs ensure that farming remains viable and productive in the long term. They safeguard the land, improve soil health, conserve water resources, and promote responsible resource management. Most importantly, they empower farmers to become stewards of the environment while securing their livelihoods.",
      ],
      photo: {
        src: agriResilience,
        caption: "Diverse agroecological intercropping and organic farming patterns across rural agricultural clusters.",
        stripHeading: "AGRO-BIODIVERSITY & CLIMATE RESILIENCE",
      },
    },
    process: {
      kickerNum: "02",
      kickerTag: "FIELD ARCHITECTURE & WORKFLOW",
      categoryTag: "A SYSTEMATIC FARMING PATHWAY",
      heading: "From Soil Assessment to Bountiful Organic Harvest.",
      description:
        "A structured transition framework guiding rural cultivators through every phase of organic soil rejuvenation and crop management.",
      steps: [
        { title: "Soil Health Audit", description: "Analyzing field soil texture, pH, organic carbon content, and nutrient deficiencies.", icon: "leaf" },
        { title: "Slurry Enrichment", description: "Harvesting and conditioning nutrient-rich bio-slurry from household digesters.", icon: "sprout" },
        { title: "Field Demonstration", description: "Hands-on application workshops demonstrating proper dilution and root-zone feeding.", icon: "recycle" },
        { title: "Natural Pest Control", description: "Introducing bio-pesticides, neem decoctions, and companion planting defenses.", icon: "shield" },
        { title: "Crop Diversification", description: "Adopting multi-cropping, intercropping, and leguminous nitrogen-fixing rotations.", icon: "light" },
        { title: "Market Linkages", description: "Connecting organic producer groups with fair-price aggregators and consumers.", icon: "house" },
      ],
    },
    learningModules: {
      categoryTag: "EXPLORE THE SUBJECT IN DEPTH",
      heading: "Technical Learning Modules & Farming Guides",
      description:
        "Practical instructional guides detailing natural soil enrichment, composting, microbial balance, and climate-resilient field planning.",
      items: [
        { badge: "MODULE 01", title: "Bio-Slurry Fertilizer Dynamics", page: "home" },
        { badge: "MODULE 02", title: "Composting & Vermiculture", page: "home" },
        { badge: "MODULE 03", title: "Organic Soil Microbiology", page: "home" },
        { badge: "MODULE 04", title: "Crop Rotation & Pest Defense", page: "home" },
      ],
    },
    applications: {
      kickerNum: "03",
      kickerTag: "PRACTICAL APPLICATIONS & IMPACT",
      heading: "Design the Farming System for Maximum Ecological Yield.",
      description:
        "Practical agronomic applications tailored to family farming plots, intercropped orchards, and rain-fed rural acreage.",
      items: [
        { title: "Basal Soil Dressing", description: "Broadcasting cured organic slurry prior to sowing to establish rich seedbed fertility.", icon: "leaf" },
        { title: "Foliar & Liquid Feeding", description: "Applying diluted slurry tea to crops during active vegetative and flowering cycles.", icon: "sprout" },
        { title: "Moisture Conservation", description: "Increasing humus content to maintain root hydration during unseasonal dry spells.", icon: "recycle" },
        { title: "Premium Produce Sale", description: "Branding certified residue-free crops to command higher retail market returns.", icon: "light" },
      ],
    },
    benefits: {
      categoryTag: "WHY SUSTAINABLE AGRICULTURE MATTERS",
      heading: "Ecological Restoration Meets Long-Term Farm Prosperity.",
      description:
        "Chemical-free farming restores the living fertility of rural lands while providing stable economic security for generations.",
      items: [
        { title: "Soil Microbiome Revival", description: "Restores natural earthworm colonies and beneficial bacterial fungi networks.", icon: "sprout" },
        { title: "Reduced Input Expenditure", description: "Saves farming families thousands of rupees previously spent on synthetic inputs.", icon: "check" },
        { title: "Groundwater Protection", description: "Eliminates toxic chemical leaching into community wells and drinking water sources.", icon: "leaf" },
        { title: "Long-Term Yield Stability", description: "Resilient soil buffers crops against extreme rainfall and prolonged droughts.", icon: "light" },
      ],
      disclosure:
        "Synergy Organisation field initiatives are implemented in direct partnership with village agricultural collectives.",
    },
    heritageStory: {
      image: agriTraining,
      caption: "Rural agricultural extension workshop: Farmers learning organic soil management in Maharashtra.",
      fig: "FIG. 02 — COMMUNITY EXTENSION",
      tag: "OUR VISION & HERITAGE",
      title: "Protecting the Land for Future Generations.",
      text: "Synergy Organisation believes that farming must remain both ecologically sound and financially viable. Our founder's decades-long fieldwork across rural villages proves that healthy soils lead directly to healthy, prosperous communities.",
      quote: "“Farming is not merely an occupation; it is the vital foundation of rural self-reliance and ecological preservation.”",
      cite: "— Mr. Nandkumar Patil, Founder (Work began 1990, Synergy established 2010)",
    },
    cta: {
      tag: "SUPPORT REGENERATIVE AGRICULTURE",
      heading: "Help Rural Farmers Thrive Naturally.",
      description:
        "Support farmer training camps, bio-slurry distribution networks, and organic certification drives across rural communities.",
      primaryBtn: "Donate Now",
      secondaryBtn: "Back to Initiatives",
    },
  },

  // =========================================================================
  // 03. ENVIRONMENTAL AWARENESS CAMPAIGNS
  // =========================================================================
  "initiative-environment": {
    key: "environment",
    index: "03",
    title: "ENVIRONMENTAL AWARENESS CAMPAIGNS",
    subtitle: "Community Waste Segregation, Afforestation & Ecosystem Stewardship",
    motto: "“Protecting Ecosystems. Inspiring Community Action.”",
    categoryTag: "SYNERGY ORGANISATION · ENVIRONMENTAL ACTION INITIATIVE",
    metadata: {
      domain: "Waste Management & Afforestation",
      activeRegion: "Rural Villages, Schools & Watersheds",
      timeline: "Active Grassroots Campaigns Since 2010",
      coreFocus: "Source Segregation, Tree Planting & Cleanliness",
    },
    summaryLead:
      "Educating and mobilizing rural communities on sustainable living, zero-waste habits, native tree plantation, and collective environmental stewardship.",
    photos: {
      primary: {
        src: envWaste,
        caption:
          "Synergy Organisation environmental campaign volunteers conducting waste segregation and clean-up.",
        fig: "FIG. 01 — COMMUNITY WASTE MANAGEMENT",
        stripHeading: "COMMUNITY WASTE MANAGEMENT & STEWARDSHIP",
      },
      field: {
        src: envWorkshop,
        caption:
          "Community environmental awareness workshop on sustainable practices and conservation.",
        fig: "FIG. 02 — CONSERVATION WORKSHOP",
        stripHeading: "GRASSROOTS CONSERVATION WORKSHOP",
      },
      conclusion: {
        src: envPlantation,
        caption:
          "Community members and volunteers planting trees in a rural green plantation drive.",
        fig: "FIG. 03 — TREE PLANTATION DRIVE",
        stripHeading: "COMMUNITY TREE PLANTATION DRIVE",
      },
    },
    editorialBanner: {
      headline: "CLEAN COMMUNITIES. THRIVING ECOSYSTEMS.",
      sub: "Grassroots stewardship for enduring environmental health.",
    },
    fieldCard: {
      title: "Authentic Rural Field Reality",
      text: "Photographed during active village sanitation campaigns and community greening drives where local youth and village councils lead hands-on cleanup efforts.",
    },
    conclusion: {
      tag: "PROGRAMME COMMITMENT",
      title: "Conclusion",
      text: "Environmental awareness campaigns are more than educational initiatives—they are movements toward a sustainable future. By promoting responsible waste management, conservation, and eco-friendly living, these programs inspire individuals and communities to become active guardians of the environment. Through continued engagement and collective effort, they pave the way for a cleaner, greener, and more sustainable world for present and future generations.",
    },
    story: {
      kickerNum: "01",
      kickerTag: "EDITORIAL STORY & FIELD INITIATIVE",
      title: "Inspiring Grassroots Action for Environmental Preservation.",
      subheadings: [
        "Waste Management & Segregation",
        "Eco-Friendly Technologies & Sustainable Practices",
      ],
      lead: "Environmental awareness campaigns play a crucial role in building informed, responsible, and environmentally conscious communities. These initiatives are designed to educate individuals about sustainable living practices, effective waste management, and conservation efforts that protect natural resources. By spreading knowledge and encouraging positive behavioral change, such campaigns lay the foundation for long-term environmental sustainability.",
      paragraphs: [
        "A central objective of these programs is to promote responsible waste management. Communities are guided on how to reduce waste at the source, segregate biodegradable and non-biodegradable materials, recycle reusable items, and safely dispose of hazardous waste. Awareness sessions highlight the harmful impact of unmanaged waste on soil, water, and air quality, while demonstrating practical solutions that can be adopted at household and community levels.",
        "In addition to waste management, environmental awareness campaigns emphasize the adoption of eco-friendly technologies and sustainable practices. Participants learn about renewable energy solutions, water conservation methods, tree plantation drives, and energy-efficient appliances. Through real-life examples and case studies, communities understand how sustainable practices not only protect the environment but also lead to cost savings and improved quality of life. This approach bridges the gap between environmental responsibility and everyday living.",
      ],
      contextBox: {
        title: "Grassroots Conservation Standards",
        items: [
          "Segregating wet biodegradable waste feeds household composters, removing over 60% of rural municipal waste streams.",
          "Planting native drought-tolerant trees restores local bird habitats, increases soil carbon, and cools village microclimates.",
          "Youth-led eco-clubs in rural schools ensure environmental stewardship becomes an embedded cultural habit across generations.",
        ],
      },
    },
    featureRow: {
      subheading: "Community Engagement & Collective Stewardship",
      paragraphs: [
        "Community engagement is at the heart of these campaigns. Workshops, seminars, awareness rallies, school programs, and hands-on activities provide interactive platforms for learning and participation. Children, youth, and adults alike are encouraged to become environmental ambassadors within their families and neighborhoods. Practical demonstrations—such as compost preparation, recycling crafts, rainwater harvesting models, and plantation drives—make learning engaging and impactful.",
        "These initiatives also foster a strong sense of collective responsibility. By bringing people together around a shared goal of environmental protection, the campaigns strengthen community bonds and encourage collaborative action. Local leaders, volunteers, and partner organizations often play an active role in spreading awareness and sustaining momentum beyond the campaign period.",
        "The long-term vision of environmental awareness campaigns is to inspire a lasting shift toward sustainable behaviors. Rather than temporary change, the aim is to cultivate habits and values that prioritize environmental stewardship. When individuals consistently make conscious choices—such as conserving water, reducing energy consumption, and supporting eco-friendly products—the cumulative impact becomes significant.",
        "By empowering communities with knowledge, practical skills, and motivation, environmental awareness campaigns contribute to cleaner surroundings, healthier ecosystems, and improved public well-being.",
      ],
      photo: {
        src: envEngagement,
        caption: "Rural Indian community members, students, and volunteers participating in an interactive eco-stewardship workshop.",
        stripHeading: "COMMUNITY ENGAGEMENT & ECO-STEWARDSHIP",
      },
    },
    process: {
      kickerNum: "02",
      kickerTag: "FIELD ARCHITECTURE & WORKFLOW",
      categoryTag: "COMMUNITY-LED CONSERVATION",
      heading: "From Awareness Workshops to Enduring Eco-Habits.",
      description:
        "A proven 6-step community mobilization model transforming village waste disposal and native tree canopy.",
      steps: [
        { title: "Community Dialogue", description: "Convening village meetings (Gram Sabhas) to identify acute local environmental bottlenecks.", icon: "light" },
        { title: "Waste Segregation Training", description: "Demonstrating two-bin sorting: wet biodegradable organics versus dry plastics and recyclables.", icon: "recycle" },
        { title: "Village Clean-Up Drives", description: "Mobilizing youth groups and volunteers for coordinated village lane and canal cleanups.", icon: "house" },
        { title: "Native Afforestation", description: "Planting indigenous drought-hardy saplings along roadsides, barren land, and school grounds.", icon: "sprout" },
        { title: "Grassroots Committees", description: "Forming local citizen monitoring groups to maintain saplings and prevent open waste dumping.", icon: "shield" },
        { title: "Impact Verification", description: "Measuring tree survival rates, plastic diversion metrics, and community health indicators.", icon: "leaf" },
      ],
    },
    learningModules: {
      categoryTag: "EXPLORE THE SUBJECT IN DEPTH",
      heading: "Environmental Toolkits & Community Guides",
      description:
        "Structured community action frameworks covering decentralized composting, afforestation survival, and plastic elimination.",
      items: [
        { badge: "MODULE 01", title: "Source Waste Segregation", page: "home" },
        { badge: "MODULE 02", title: "Decentralized Village Composting", page: "home" },
        { badge: "MODULE 03", title: "Native Tree Plantation Techniques", page: "home" },
        { badge: "MODULE 04", title: "Water Body Protection & Cleanliness", page: "home" },
      ],
    },
    applications: {
      kickerNum: "03",
      kickerTag: "PRACTICAL APPLICATIONS & IMPACT",
      heading: "Design Community Action for Measurable Conservation.",
      description:
        "Ground-level environmental practices adapted to rural village councils, schools, and agricultural water bodies.",
      items: [
        { title: "Household Waste Sorting", description: "Equipping rural homes with separate collection bins for organic kitchen and dry waste.", icon: "recycle" },
        { title: "School Eco-Clubs", description: "Engaging students in environmental science experiments, herbal gardens, and tree adoption.", icon: "light" },
        { title: "Green Canopy Planting", description: "Creating village green corridors along canal banks and roads to prevent topsoil erosion.", icon: "sprout" },
        { title: "Water Canal Stewardship", description: "Organizing seasonal clearing of irrigation canals to restore unblocked natural runoff.", icon: "leaf" },
      ],
    },
    benefits: {
      categoryTag: "WHY ENVIRONMENTAL ACTION MATTERS",
      heading: "A Cleaner Village, A Healthier Future Generation.",
      description:
        "Grassroots environmental action directly prevents disease, cleans groundwater, and protects rural ecosystems.",
      items: [
        { title: "Pollution Prevention", description: "Stops open garbage burning and prevents toxic smoke and water contamination.", icon: "check" },
        { title: "Canopy & Shade Restoration", description: "Thousands of native trees create local shade, lower temperatures, and support wildlife.", icon: "sprout" },
        { title: "Civic Empowerment", description: "Instills deep communal pride and collective ownership of village public spaces.", icon: "light" },
        { title: "Reduced Disease Vectors", description: "Clean surroundings drastically cut mosquito breeding and waterborne illnesses.", icon: "leaf" },
      ],
      disclosure:
        "All awareness drives are designed for long-term sustainability in coordination with local village committees.",
    },
    heritageStory: {
      image: envWorkshop,
      caption: "Grassroots conservation workshop: Village leaders and students learning sustainable waste practices.",
      fig: "FIG. 02 — COMMUNITY DIALOGUE",
      tag: "OUR VISION & HERITAGE",
      title: "Environmental Care as a Way of Life.",
      text: "Since 1990, Synergy Organisation's founders have advocated that true development cannot happen at the cost of the environment. Clean air, fertile soil, and living trees are fundamental human rights for rural communities.",
      quote: "“Environmental awareness is not just an activity—it is a continuous commitment to future generations.”",
      cite: "— Mr. Nandkumar Patil, Founder (Work began 1990, Synergy established 2010)",
    },
    cta: {
      tag: "JOIN OUR GREEN MOVEMENT",
      heading: "Champion a Cleaner, Greener Tomorrow.",
      description:
        "Your contribution helps fund native saplings, school waste segregation kits, and village sanitation workshops across rural districts.",
      primaryBtn: "Donate Now",
      secondaryBtn: "Back to Initiatives",
    },
  },

  // =========================================================================
  // 04. WOMEN EMPOWERMENT PROGRAMS
  // =========================================================================
  "initiative-women-empowerment": {
    key: "women-empowerment",
    index: "04",
    title: "WOMEN EMPOWERMENT PROGRAMS",
    subtitle: "Vocational Craftsmanship, Self-Help Groups & Economic Leadership",
    motto: "“Empowering Women. Strengthening Communities.”",
    categoryTag: "SYNERGY ORGANISATION · WOMEN'S EMPOWERMENT INITIATIVE",
    metadata: {
      domain: "Vocational Skills & Micro-Finance",
      activeRegion: "Rural Communities of Maharashtra & Karnataka",
      timeline: "Empowering Village Women Since 2010",
      coreFocus: "Tailoring, Self-Help Groups (Bachat Gat) & Leadership",
    },
    summaryLead:
      "Enabling rural women to achieve financial independence, master market-ready vocational crafts, manage collective community savings, and step forward as influential leaders.",
    photos: {
      primary: {
        src: womenTailoring,
        caption:
          "Rural Indian women learning vocational garment tailoring, embroidery, and textile design craftsmanship.",
        fig: "FIG. 01 — VOCATIONAL CRAFTSMANSHIP",
        stripHeading: "WOMEN'S ECONOMIC INDEPENDENCE & CRAFT",
      },
      field: {
        src: womenBachatGat,
        caption:
          "Rural Indian women participating in self-help group (Mahila Bachat Gat) meeting reviewing microfinance savings.",
        fig: "FIG. 02 — MAHILA BACHAT GAT & MICROFINANCE",
        stripHeading: "SELF-HELP GROUPS & MICRO-ENTERPRISE",
      },
      conclusion: {
        src: womenLeaders,
        caption:
          "Confident rural Indian women community leaders standing proudly outside village centre.",
        fig: "FIG. 03 — COMMUNITY LEADERSHIP & SOCIAL EQUALITY",
        stripHeading: "COMMUNITY LEADERSHIP & SOCIAL EQUALITY",
      },
    },
    editorialBanner: {
      headline: "WOMEN'S INDEPENDENCE. STRONGER FAMILIES.",
      sub: "Skills and collective leadership for transformative equality.",
    },
    fieldCard: {
      title: "Authentic Rural Field Reality",
      text: "Photographed inside village community training centers where women gain marketable tailoring skills and take charge of family economic decisions through micro-enterprises.",
    },
    conclusion: {
      tag: "PROGRAMME COMMITMENT",
      title: "Conclusion",
      text: "Synergy Organisation's Women Empowerment Programs are centered on creating lasting empowerment by equipping women with the skills, knowledge, and confidence needed to shape their own futures. By strengthening economic independence, leadership capacity, and social awareness, the initiatives contribute to improved family well-being, stronger communities, and greater gender equality. Through sustained support and inclusive development efforts, Synergy Organisation remains committed to empowering women as catalysts of positive and sustainable change.",
    },
    story: {
      kickerNum: "01",
      kickerTag: "EDITORIAL STORY & FIELD INITIATIVE",
      title: "Building Independence Through Craft & Collective Strength.",
      subheadings: [
        "Vocational Skills & Micro-Enterprises",
        "Financial Literacy & Savings Management",
      ],
      lead: "Synergy Organisation's Women Empowerment Programs are dedicated to strengthening the social, economic, and personal empowerment of women by providing them with practical skills, confidence, and opportunities for sustainable growth. These initiatives focus on enabling women to recognize their potential, assert their rights, and actively participate in decision-making processes within their families and communities.",
      paragraphs: [
        "The programs offer skill-based and vocational training in areas such as tailoring, handicrafts, food processing, digital literacy, and other locally relevant trades with strong income-generating potential. Through structured and hands-on training modules, women develop technical expertise, product development capabilities, and quality enhancement skills. This approach enables them to pursue self-employment, establish micro-enterprises, or secure meaningful employment opportunities.",
        "Beyond vocational skills, the programs place strong emphasis on building self-confidence, leadership abilities, and awareness. Women are trained in financial literacy, savings management, budgeting, and small business planning, empowering them to make informed financial decisions and contribute meaningfully to household income. Awareness sessions on legal rights, health, education, and government welfare schemes further strengthen their ability to advocate for themselves and their families.",
      ],
      contextBox: {
        title: "Community Self-Help Framework",
        items: [
          "Self-Help Groups (Mahila Bachat Gat) pool collective monthly savings, granting low-interest emergency loans to members without predatory moneylenders.",
          "Vocational tailoring equips rural homemakers to earn steady supplementary monthly income from local school uniform and bridal garment orders.",
          "Women trained in financial literacy reinvest over 90% of their earnings into children's nutrition, healthcare, and higher education.",
        ],
      },
    },
    featureRow: {
      subheading: "Community Networks & Collective Leadership",
      paragraphs: [
        "A key component of the initiative is fostering collective strength through self-help groups and community networks. These platforms provide women with a supportive environment to share experiences, exchange ideas, and collaborate on economic and social initiatives. By encouraging peer learning and group-based enterprises, the programs enhance solidarity and amplify women's voices within the community.",
        "The empowerment focus extends beyond income generation. It aims to transform mindsets by challenging traditional gender roles and promoting equal participation in community development activities. Women are encouraged to take leadership roles, participate in local governance, and become active contributors to social progress. As a result, they emerge not only as earners but also as confident decision-makers, mentors, and role models for future generations.",
      ],
      photo: {
        src: womenCollectiveStrength,
        caption: "Rural Indian women community members and leaders gathering for collective decision-making and empowerment.",
        stripHeading: "COLLECTIVE STRENGTH & COMMUNITY NETWORKS",
      },
    },
    process: {
      kickerNum: "02",
      kickerTag: "FIELD ARCHITECTURE & WORKFLOW",
      categoryTag: "EMPOWERMENT IN ACTION",
      heading: "A Pathway From Skill Acquisition to Economic Agency.",
      description:
        "Step-by-step guidance moving women from novice training through group solidarity to self-sustaining micro-enterprises.",
      steps: [
        { title: "Skill Assessment", description: "Surveying local village market demands and women's existing craftsmanship interests.", icon: "light" },
        { title: "Hands-On Training", description: "Intensive 3-month practical course in cutting, machine stitching, finishing, and embroidery.", icon: "sprout" },
        { title: "Bachat Gat Formation", description: "Organizing 10–15 women into registered Self-Help Groups with collective bank accounts.", icon: "house" },
        { title: "Financial Literacy", description: "Teaching budgeting, digital UPI banking, passbook auditing, and credit management.", icon: "shield" },
        { title: "Enterprise Incubation", description: "Assisting skilled artisans to obtain sewing machines and fulfill institutional bulk garment orders.", icon: "recycle" },
        { title: "Leadership & Rights", description: "Workshops on women's legal rights, health, and active participation in local village panchayats.", icon: "leaf" },
      ],
    },
    learningModules: {
      categoryTag: "EXPLORE THE SUBJECT IN DEPTH",
      heading: "Women's Enterprise Modules & Guides",
      description:
        "Reference guides covering self-help group constitution, micro-finance accounting, legal safeguards, and enterprise management.",
      items: [
        { badge: "MODULE 01", title: "Vocational Tailoring & Design", page: "home" },
        { badge: "MODULE 02", title: "Self-Help Group Bookkeeping", page: "home" },
        { badge: "MODULE 03", title: "Micro-Enterprise Business Planning", page: "home" },
        { badge: "MODULE 04", title: "Women's Legal Rights & Welfare Schemes", page: "home" },
      ],
    },
    applications: {
      kickerNum: "03",
      kickerTag: "PRACTICAL APPLICATIONS & IMPACT",
      heading: "Design Economic Opportunities for Lasting Independence.",
      description:
        "Proven livelihood pathways helping rural women convert acquired skills into reliable, multi-stream family income.",
      items: [
        { title: "Apparel & Uniform Making", description: "Fulfilling local school uniforms, hospital linen, and festival apparel contracts.", icon: "sprout" },
        { title: "Collective Micro-Loans", description: "Providing members with seed funding for livestock, grocery kiosks, and equipment.", icon: "recycle" },
        { title: "Digital Banking Access", description: "Enabling women to operate bank accounts, direct welfare transfers, and mobile payments.", icon: "light" },
        { title: "Civic Village Leadership", description: "Mentoring women to represent their hamlets in village councils and school boards.", icon: "leaf" },
      ],
    },
    benefits: {
      categoryTag: "WHY WOMEN'S EMPOWERMENT MATTERS",
      heading: "Dignity, Financial Security, and Social Transformation.",
      description:
        "Empowering women yields the highest social return of any development intervention, breaking generational cycles of poverty.",
      items: [
        { title: "Direct Household Income", description: "Provides predictable, dignified earnings that women directly control and budget.", icon: "check" },
        { title: "Freedom from Debt Traps", description: "Internal group lending liberates poor families from predatory private money lenders.", icon: "shield" },
        { title: "Domestic & Social Dignity", description: "Financial contribution dramatically improves respect and decision-making authority at home.", icon: "light" },
        { title: "Generational Progress", description: "Children of empowered mothers show significantly higher school retention rates.", icon: "sprout" },
      ],
      disclosure:
        "Programs are run at the grassroots level with active village women's collectives and registered Mahila Mandals.",
    },
    heritageStory: {
      image: womenLeaders,
      caption: "Community leadership: Confident rural women leaders and mentors outside village community center.",
      fig: "FIG. 02 — WOMEN LEADERSHIP",
      tag: "OUR VISION & HERITAGE",
      title: "When Women Rise, Whole Villages Flourish.",
      text: "Synergy Organisation has witnessed first-hand that investing in a woman's skill and confidence produces an immediate multiplier effect across her entire family and village.",
      quote: "“When you educate and economically empower a woman, you build the foundation for a resilient, just society.”",
      cite: "— Mr. Nandkumar Patil, Founder (Work began 1990, Synergy established 2010)",
    },
    cta: {
      tag: "SUPPORT WOMEN'S EMPOWERMENT",
      heading: "Invest in a Woman's Future Today.",
      description:
        "Your donation helps sponsor sewing machines, provide vocational instructors, and seed fund new rural women's self-help groups.",
      primaryBtn: "Donate Now",
      secondaryBtn: "Back to Initiatives",
    },
  },

  // =========================================================================
  // 05. YOUTH SKILL DEVELOPMENT
  // =========================================================================
  "initiative-skill-development": {
    key: "skill-development",
    index: "05",
    title: "YOUTH SKILL DEVELOPMENT",
    subtitle: "Industry-Relevant Technical Trades, Digital Literacy & Entrepreneurship",
    motto: "“Building Skills. Creating Opportunities. Shaping Futures.”",
    categoryTag: "SYNERGY ORGANISATION · YOUTH VOCATIONAL INITIATIVE",
    metadata: {
      domain: "Technical Training & Digital Skills",
      activeRegion: "Rural & Semi-Urban Hubs",
      timeline: "Empowering Youth Since 2010",
      coreFocus: "Electrical, Mechanical, Computers & Small Business",
    },
    summaryLead:
      "Bridging the gap between rural education and gainful employment through certified hands-on vocational trades, computer education, and small-business mentorship.",
    photos: {
      primary: {
        src: skillsDigital,
        caption:
          "Young Indian students learning computer applications and digital skills in a modern community learning centre.",
        fig: "FIG. 01 — DIGITAL EDUCATION & COMPUTER LAB",
        stripHeading: "INDUSTRY-RELEVANT VOCATIONAL TRAINING",
      },
      field: {
        src: skillsVocational,
        caption:
          "Young Indian vocational trainees receiving hands-on electrical wiring and technical equipment maintenance instruction.",
        fig: "FIG. 02 — VOCATIONAL TECHNICAL TRAINING",
        stripHeading: "TECHNICAL & VOCATIONAL TRADE TRAINING",
      },
      conclusion: {
        src: skillsWorkshop,
        caption:
          "Skilled young Indian professional working with confidence in a modern workshop enterprise.",
        fig: "FIG. 03 — YOUTH ENTREPRENEURSHIP & ENTERPRISE",
        stripHeading: "YOUTH ENTREPRENEURSHIP & ENTERPRISE",
      },
    },
    editorialBanner: {
      headline: "VOCATIONAL MASTERY. SUSTAINABLE LIVELIHOODS.",
      sub: "Practical technical expertise for tomorrow's workforce.",
    },
    fieldCard: {
      title: "Authentic Rural Field Reality",
      text: "Photographed inside active vocational workshops where unskilled youth and school dropouts learn specialized trades that unlock high-demand jobs and dignified livelihoods.",
    },
    conclusion: {
      tag: "PROGRAMME COMMITMENT",
      title: "Conclusion",
      text: "Youth Skill Development is a powerful tool for social and economic transformation. By training unskilled labourers and young individuals, we create pathways to employment, financial independence, and personal growth. Empowered with the right skills and opportunities, youth become productive contributors to their families, communities, and the nation's development.",
    },
    story: {
      kickerNum: "01",
      kickerTag: "EDITORIAL STORY & FIELD INITIATIVE",
      title: "Transforming Potential Into Employable Competence.",
      subheadings: [
        "Technical Training & Livelihood Skills",
        "Specialized Skill Building for Unskilled Labourers",
      ],
      lead: "Youth Skill Development programs are designed to empower young individuals and unskilled labourers with practical knowledge, technical abilities, and confidence to build sustainable livelihoods. These initiatives focus on bridging the gap between education and employment by providing industry-relevant training that enhances employability and self-reliance.",
      paragraphs: [
        "Through structured training modules, we provide skill-based education to youths and unskilled workers, enabling them to upgrade their capabilities and access better job opportunities. The program covers various vocational and technical skills tailored to local market demands. Participants receive hands-on training, practical exposure, and mentorship to ensure they gain real-world experience and workplace readiness.",
        "Special emphasis is placed on supporting unskilled labourers by equipping them with specialized skills that increase their earning potential and job stability. By transforming unskilled workers into skilled professionals, we help improve their confidence, productivity, and long-term career prospects.",
      ],
      contextBox: {
        title: "Workforce Readiness Standards",
        items: [
          "Industry-certified electrical and mechanical trade courses provide over 80% practical workshop training versus theory.",
          "Basic computer literacy enables rural youth to operate billing software, data entry portals, and online banking kiosks.",
          "Entrepreneurship training guides graduates on registering GST, securing government Mudra loans, and managing workshop cash flow.",
        ],
      },
    },
    featureRow: {
      subheading: "Soft Skills & Entrepreneurship Development",
      paragraphs: [
        "In addition to technical training, the program also includes soft skills development such as communication skills, teamwork, time management, financial literacy, and basic digital awareness. These complementary skills enhance overall personality development and prepare youth to adapt successfully to professional environments or entrepreneurial ventures.",
        "We also encourage entrepreneurship by guiding participants on starting small businesses, accessing government schemes, and managing finances effectively. This holistic approach not only creates employment opportunities but also promotes self-employment and local economic growth.",
      ],
      photo: {
        src: skillsEntrepreneurship,
        caption: "Young Indian trainees collaborating in an interactive soft skills and business entrepreneurship workshop.",
        stripHeading: "SOFT SKILLS & ENTREPRENEURIAL VENTURES",
      },
    },
    process: {
      kickerNum: "02",
      kickerTag: "FIELD ARCHITECTURE & WORKFLOW",
      categoryTag: "PRACTICAL VOCATIONAL BLUEPRINT",
      heading: "From Unskilled Youth to Confident Professional.",
      description:
        "A rigorous, industry-tested curriculum preparing ambitious young people for career success and micro-business ownership.",
      steps: [
        { title: "Aptitude Counseling", description: "Evaluating individual candidate interests, mechanical aptitude, and local employment demand.", icon: "light" },
        { title: "Core Trade Training", description: "Hands-on instruction in electrical maintenance, appliance repairs, motor rewinding, or plumbing.", icon: "sprout" },
        { title: "Digital Literacy", description: "Computer operating fundamentals, office productivity software, internet research, and email.", icon: "book" },
        { title: "Soft Skills & Etiquette", description: "Customer communication, workplace safety standards, punctuality, and ethical conduct.", icon: "people" },
        { title: "Apprenticeship Exposure", description: "On-the-job internships with regional commercial workshops and infrastructure contractors.", icon: "shield" },
        { title: "Placement & Startup Help", description: "Direct job placement assistance or micro-finance guidance to launch an independent repair enterprise.", icon: "house" },
      ],
    },
    learningModules: {
      categoryTag: "EXPLORE THE SUBJECT IN DEPTH",
      heading: "Vocational Toolkits & Trade Curricula",
      description:
        "Practical instructional modules aligned with national skill standards for trade mastery, workplace safety, and digital competency.",
      items: [
        { badge: "MODULE 01", title: "Electrical Circuits & Wiring", page: "home" },
        { badge: "MODULE 02", title: "Appliance & Motor Maintenance", page: "home" },
        { badge: "MODULE 03", title: "Computer Applications & Data Literacy", page: "home" },
        { badge: "MODULE 04", title: "Small Business & Workshop Management", page: "home" },
      ],
    },
    applications: {
      kickerNum: "03",
      kickerTag: "PRACTICAL APPLICATIONS & IMPACT",
      heading: "Design Technical Skills for Local Rural Employment.",
      description:
        "High-demand technical trades that provide immediate employment and empower self-reliant rural enterprises.",
      items: [
        { title: "Domestic & Agri Electricals", description: "Servicing farm pumpsets, household wiring, and rural solar and biogas installations.", icon: "light" },
        { title: "Computer Service Kiosks", description: "Managing community digital service centers (CSC), government document portals, and billing.", icon: "book" },
        { title: "Mechanical Repair Units", description: "Repairing two-wheelers, diesel engines, water pumps, and agro-processing equipment.", icon: "recycle" },
        { title: "Independent Contracting", description: "Forming skilled technician syndicates for civil and electrical infrastructure work.", icon: "sprout" },
      ],
    },
    benefits: {
      categoryTag: "WHY YOUTH SKILLING MATTERS",
      heading: "From Vulnerability to Dignified Self-Reliance.",
      description:
        "Technical upskilling transforms youths into productive, confident contributors to their families and national growth.",
      items: [
        { title: "Triple Earning Capacity", description: "Graduates earn significantly higher wages compared to uncertain manual daily labour.", icon: "check" },
        { title: "Local Economic Retention", description: "Young professionals find viable livelihoods locally, curbing distress rural-to-urban migration.", icon: "shield" },
        { title: "Self-Reliance & Confidence", description: "Mastering a technical craft fosters lifelong professional pride and self-worth.", icon: "light" },
        { title: "Village Service Quality", description: "Communities gain immediate local access to reliable technical repair and maintenance services.", icon: "sprout" },
      ],
      disclosure:
        "Certificates and training modules are oriented toward genuine employment readiness and trade mastery.",
    },
    heritageStory: {
      image: skillsWorkshop,
      caption: "Youth entrepreneurship: Skilled graduate operating an independent technical repair workshop.",
      fig: "FIG. 02 — ENTERPRISE IN ACTION",
      tag: "OUR VISION & HERITAGE",
      title: "Investing in Rural India's Greatest Asset: Our Youth.",
      text: "Synergy Organisation has dedicated decades to demonstrating that rural youth have immense talent and determination. Given practical skills and trust, they become the driving force of local innovation.",
      quote: "“Give youth the tools of modern knowledge, and they will build the future of their communities with dignity.”",
      cite: "— Mr. Nandkumar Patil, Founder (Work began 1990, Synergy established 2010)",
    },
    cta: {
      tag: "EMPOWER THE NEXT GENERATION",
      heading: "Equip Ambitious Youths with Lifelong Skills.",
      description:
        "Support tools, workshop materials, computer lab equipment, and scholarship stipends for rural trainees.",
      primaryBtn: "Donate Now",
      secondaryBtn: "Back to Initiatives",
    },
  },
};

// Map route alias keys
initiativePages["initiative-sustainable-agriculture"] = initiativePages["initiative-agriculture"];
initiativePages["initiative-environmental-campaign"] = initiativePages["initiative-environment"];
initiativePages["initiative-smoke-free-homes"] = initiativePages["initiative-biogas-clean-energy"];
