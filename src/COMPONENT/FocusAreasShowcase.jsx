import { useState, useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { assetUrl } from "../utils/assetUrl";
import "./FocusAreasShowcase.css";

const focusAreas = [
  {
    number: "01",
    id: "clean-cooking",
    aliases: ["smoke-free-homes", "clean-energy", "biogas-clean-energy"],
    label: "",
    title: "Biogas for Clean Energy",
    stripHeading: "CLEAN ENERGY & HEALTHIER COMMUNITIES",
    content: {
      paragraphs: [
        "Synergy Organisation actively promotes the adoption of biogas technology as a sustainable and eco-friendly energy solution, particularly in rural and semi-urban communities where traditional cooking relies heavily on firewood, coal, or other biomass fuels. By converting organic waste—such as food waste, agricultural residues, and animal dung—into clean energy, the programme provides households with a reliable and environmentally responsible alternative to conventional fuels. This reduces indoor air pollution, mitigates deforestation, and lowers greenhouse gas emissions, contributing directly to improved health and environmental protection.",
        "The benefits of biogas extend beyond energy production. The anaerobic digestion process generates nutrient-rich slurry as a by-product, which can be used as an effective organic fertilizer for farming. This dual advantage addresses both energy and agricultural needs, promoting sustainable farming practices, enhancing soil fertility, improving crop yields, and reducing dependency on chemical fertilizers. By integrating clean energy solutions with agriculture, the programme supports holistic rural development that is environmentally sound and economically viable.",
        "Through this integrated approach, the Biogas for Clean Energy programme contributes to improved rural livelihoods, economic empowerment, and environmental stewardship. Households benefit from reduced energy costs, cleaner cooking environments, and increased agricultural productivity, while communities as a whole become more self-reliant and environmentally conscious.",
      ],
      conclusion: "Synergy Organisation's Biogas for Clean Energy initiative demonstrates how innovative, sustainable technologies can transform rural communities. By providing access to clean energy and promoting organic farming practices, the programme enhances health, livelihoods, and ecological well-being simultaneously. Through continued awareness, training, and community engagement, Synergy Organisation strives to create healthier, self-reliant, and eco-conscious communities, laying the foundation for a cleaner, greener, and more sustainable future for generations to come.",
    },
    image: assetUrl("/images/biogas/IMG2%20BIO%20GAS.jpeg"),
    alt: "Resident beside a flexible biogas digester and connected equipment",
    page: "initiative-biogas-clean-energy",
    tone: "energy",
  },
  {
    number: "02",
    id: "sustainable-agriculture",
    aliases: ["agriculture"],
    label: "",
    title: "Sustainable Agriculture Support Programs",
    stripHeading: "REGENERATIVE AGRICULTURE & SOIL RESTORATION",
    content: {
      paragraphs: [
        "Sustainable agriculture support programs play a vital role in strengthening rural livelihoods while protecting the environment. These initiatives encourage farmers to transition toward organic and eco-friendly farming practices, reducing their dependence on harmful chemical fertilizers and pesticides. By promoting sustainable methods, the programs aim to create a balanced agricultural system that improves productivity without degrading natural resources.",
        "A key focus of these programs is farmer education and capacity building. Through structured training sessions, field demonstrations, and practical workshops, farmers learn effective techniques such as crop rotation, intercropping, composting, vermiculture, and natural pest management. These methods not only enhance soil health but also reduce the long-term costs associated with chemical inputs. By understanding the science behind sustainable farming, farmers are empowered to make informed decisions that benefit both their crops and the environment.",
        "One of the most impactful components of these initiatives is the use of biogas slurry as a natural fertilizer. Biogas slurry, a by-product of biogas production, is rich in essential nutrients and organic matter. When applied to fields, it helps restore soil fertility, improve soil structure, and increase moisture retention capacity. Unlike chemical fertilizers, it releases nutrients gradually, ensuring sustained crop growth and minimizing the risk of soil degradation. Additionally, the use of organic inputs significantly reduces chemical runoff into water bodies, protecting local ecosystems and groundwater quality.",
        "Sustainable agriculture programs also promote biodiversity and climate resilience. By encouraging diverse cropping practices and reducing chemical dependency, farms become more resistant to pests, diseases, and changing weather conditions. Healthy soil with improved organic content is better equipped to withstand droughts and heavy rainfall, ensuring stable yields even in challenging conditions. This resilience is critical for rural communities that rely heavily on agriculture for their income and food supply.",
        "Beyond environmental benefits, these programs contribute to economic stability for farmers. Reduced input costs, improved crop quality, and higher market demand for organic produce create better income opportunities. Farmers can access new markets and premium pricing for organically grown products, enhancing their financial security. In turn, this supports local economies and strengthens rural development.",
        "By integrating sustainable practices with modern agricultural knowledge, these programs ensure that farming remains viable and productive in the long term. They safeguard the land, improve soil health, conserve water resources, and promote responsible resource management. Most importantly, they empower farmers to become stewards of the environment while securing their livelihoods.",
      ],
      conclusion: "Sustainable agriculture support programs represent a forward-thinking approach to farming—one that balances productivity with environmental responsibility. By reducing reliance on chemical inputs, promoting organic practices, and utilizing natural resources such as biogas slurry, these initiatives create a healthier agricultural ecosystem. In the long run, they ensure food security, economic stability, and environmental preservation, enabling rural farmers to thrive while protecting the land for future generations.",
    },
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1400&q=85",
    alt: "Rural agricultural landscape",
    page: "what-we-do",
    tone: "agriculture",
  },
  {
    number: "03",
    id: "environmental-campaign",
    aliases: ["environmental-awareness", "environment"],
    label: "",
    title: "Environmental Awareness Campaigns",
    stripHeading: "COMMUNITY WASTE MANAGEMENT & STEWARDSHIP",
    content: {
      paragraphs: [
        "Environmental awareness campaigns play a crucial role in building informed, responsible, and environmentally conscious communities. These initiatives are designed to educate individuals about sustainable living practices, effective waste management, and conservation efforts that protect natural resources. By spreading knowledge and encouraging positive behavioral change, such campaigns lay the foundation for long-term environmental sustainability.",
        "A central objective of these programs is to promote responsible waste management. Communities are guided on how to reduce waste at the source, segregate biodegradable and non-biodegradable materials, recycle reusable items, and safely dispose of hazardous waste. Awareness sessions highlight the harmful impact of unmanaged waste on soil, water, and air quality, while demonstrating practical solutions that can be adopted at household and community levels. By establishing continuous review mechanisms, this allows us to identify achievements, address gaps, and implement improvements in a timely and efficient manner.",
        "Community participation is a key element of our monitoring strategy. We actively engage beneficiaries, local leaders, and stakeholders through feedback sessions, meetings, and interactive discussions. By listening to community voices, we ensure that our programs remain responsive to real needs and evolving challenges. This participatory approach strengthens trust, accountability, and ownership at the grassroots level.",
        "In addition to monitoring, our commitment to ongoing support ensures that beneficiaries are never left without guidance after project implementation. We provide continuous technical assistance, training programs, capacity-building workshops, and troubleshooting support to ensure smooth operation and sustainability. Whether it is maintaining infrastructure, enhancing skills, or resolving operational challenges, our team remains accessible and proactive.",
        "We also emphasize transparency and accountability through proper documentation, reporting, and evaluation mechanisms. Detailed reports and impact assessments enable us to share progress with stakeholders, partners, and donors while continuously refining our strategies for greater effectiveness.",
        "By combining systematic monitoring with consistent follow-up support, we create a framework that promotes sustainability, efficiency, and resilience. Our approach ensures that projects do not fade after initial implementation but continue to evolve and strengthen over time.",
      ],
      conclusion: "Monitoring and ongoing support are not just processes for Synergy Organization—they are commitments to excellence, responsibility, and long-term community empowerment. Through continuous evaluation, responsive action, and dedicated support, we ensure that every initiative delivers sustainable impact and contributes meaningfully to the growth, stability, and self-reliance of the communities we serve.",
    },
    image: "https://images.unsplash.com/photo-1542601098-3adb3baeb1ec?auto=format&fit=crop&w=1400&q=85",
    alt: "Green landscape",
    page: "what-we-do",
    tone: "environment",
  },
  {
    number: "04",
    id: "women-empowerment",
    aliases: ["women-empowerment-programs"],
    label: "",
    title: "Women empowerment programs",
    stripHeading: "WOMEN'S ECONOMIC INDEPENDENCE & LEADERSHIP",
    content: {
      paragraphs: [
        "Synergy Organisation's Women Empowerment Programs are dedicated to strengthening the social, economic, and personal empowerment of women by providing them with practical skills, confidence, and opportunities for sustainable growth. These initiatives focus on enabling women to recognize their potential, assert their rights, and actively participate in decision-making processes within their families and communities.",
        "The programs offer skill-based and vocational training in areas such as tailoring, handicrafts, food processing, digital literacy, and other locally relevant trades with strong income-generating potential. Through structured and hands-on training modules, women develop technical expertise, product development capabilities, and quality enhancement skills. This approach enables them to pursue self-employment, establish micro-enterprises, or secure meaningful employment opportunities.",
        "Beyond vocational skills, the programs place strong emphasis on building self-confidence, leadership abilities, and awareness. Women are trained in financial literacy, savings management, budgeting, and small business planning, empowering them to make informed financial decisions and contribute meaningfully to household income. Awareness sessions on legal rights, health, education, and government welfare schemes further strengthen their ability to advocate for themselves and their families.",
        "A key component of the initiative is fostering collective strength through self-help groups and community networks. These platforms provide women with a supportive environment to share experiences, exchange ideas, and collaborate on economic and social initiatives. By encouraging peer learning and group-based enterprises, the programs enhance solidarity and amplify women's voices within the community.",
        "The empowerment focus extends beyond income generation. It aims to transform mindsets by challenging traditional gender roles and promoting equal participation in community development activities. Women are encouraged to take leadership roles, participate in local governance, and become active contributors to social progress. As a result, they emerge not only as earners but also as confident decision-makers, mentors, and role models for future generations.",
      ],
      conclusion: "Synergy Organisation's Women Empowerment Programs are centered on creating lasting empowerment by equipping women with the skills, knowledge, and confidence needed to shape their own futures. By strengthening economic independence, leadership capacity, and social awareness, the initiatives contribute to improved family well-being, stronger communities, and greater gender equality. Through sustained support and inclusive development efforts, Synergy Organisation remains committed to empowering women as catalysts of positive and sustainable change.",
    },
    image: assetUrl("/WhatsApp%20Image%202026-11-08%20at%203.21.40%20PM.jpeg"),
    alt: "A woman carrying a bundle of gathered firewood outdoors",
    page: "initiative-women-empowerment",
    tone: "women",
  },
  {
    number: "05",
    id: "skill-development",
    aliases: ["skills-training", "skills", "youth-skill-development"],
    label: "",
    title: "Youth Skill Development",
    stripHeading: "INDUSTRY-RELEVANT VOCATIONAL TRAINING",
    content: {
      paragraphs: [
        "Youth Skill Development programs are designed to empower young individuals and unskilled labourers with practical knowledge, technical abilities, and confidence to build sustainable livelihoods. These initiatives focus on bridging the gap between education and employment by providing industry-relevant training that enhances employability and self-reliance.",
        "Through structured training modules, we provide skill-based education to youths and unskilled workers, enabling them to upgrade their capabilities and access better job opportunities. The program covers various vocational and technical skills tailored to local market demands. Participants receive hands-on training, practical exposure, and mentorship to ensure they gain real-world experience and workplace readiness.",
        "Special emphasis is placed on supporting unskilled labourers by equipping them with specialized skills that increase their earning potential and job stability. By transforming unskilled workers into skilled professionals, we help improve their confidence, productivity, and long-term career prospects.",
        "In addition to technical training, the program also includes soft skills development such as communication skills, teamwork, time management, financial literacy, and basic digital awareness. These complementary skills enhance overall personality development and prepare youth to adapt successfully to professional environments or entrepreneurial ventures.",
        "We also encourage entrepreneurship by guiding participants on starting small businesses, accessing government schemes, and managing finances effectively. This holistic approach not only creates employment opportunities but also promotes self-employment and local economic growth.",
        "Youth Skill Development is a powerful tool for social and economic transformation. By training unskilled labourers and young individuals, we create pathways to employment, financial independence, and personal growth. Empowered with the right skills and opportunities, youth become productive contributors to their families, communities, and the nation's development.",
      ],
    },
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=85",
    alt: "People collaborating in a learning environment",
    page: "initiative-skill-development",
    tone: "skills",
  },
];

function InitiativeStrip({ heading }) {
  if (!heading) return null;
  return (
    <div className="focus-showcase__initiative-strip" aria-label={heading}>
      <h2 className="focus-showcase__strip-heading">
        <span className="focus-showcase__strip-animated-text">{heading}</span>
      </h2>
    </div>
  );
}

export default function FocusAreasShowcase({ onNavigate }) {
  const [expandedNumbers, setExpandedNumbers] = useState([]);
  const isExpanded = (number) => expandedNumbers.includes(number);
  const toggleExpanded = (number) => setExpandedNumbers((current) => (
    current.includes(number) ? current.filter((item) => item !== number) : [...current, number]
  ));

  return (
    <section id="main-focus-areas" className="focus-showcase" aria-labelledby="focus-showcase-heading">
      <div className="focus-showcase__shell">
        <header className="focus-showcase__intro">
          <span>Main Focus Areas</span>
          <h2 id="focus-showcase-heading">Our Main Focus Areas</h2>
        </header>
        <div className="focus-showcase__list">
          {focusAreas.map((area) => {
            const copyElement = (
              <div className="focus-showcase__copy">
                <span className="focus-showcase__label"><span>{area.number}</span></span>
                <h3>{area.title}</h3>
                {area.content ? (
                  <p>{area.content.paragraphs[0]}</p>
                ) : (
                  <p>{area.description}</p>
                )}
                {area.content ? (
                  <button
                    type="button"
                    aria-expanded={isExpanded(area.number)}
                    aria-controls={`focus-area-content-${area.number}`}
                    onClick={() => toggleExpanded(area.number)}
                  >
                    <span>{isExpanded(area.number) ? "Read Less" : "Read More \u2192"}</span>
                    <ArrowRight className={isExpanded(area.number) ? "is-expanded" : ""} size={17} aria-hidden="true" />
                  </button>
                ) : (
                  <button type="button" onClick={() => onNavigate(area.page)}>
                    <span>Explore more</span><ArrowRight size={17} aria-hidden="true" />
                  </button>
                )}
              </div>
            );

            const mediaElement = (
              <div className="focus-showcase__media-frame">
                <figure className="focus-showcase__media">
                  <img src={area.image} alt={area.alt} loading="lazy" />
                </figure>
                {area.stripHeading && (
                  <InitiativeStrip heading={area.stripHeading} />
                )}
              </div>
            );

            return (
              <article
                id={area.id}
                className={`focus-showcase__row focus-showcase__row--${area.tone}${area.content && isExpanded(area.number) ? " is-expanded" : ""}`}
                key={area.number}
              >
                {area.aliases?.map((alias) => (
                  <span key={alias} id={alias} className="synergy-anchor-target" aria-hidden="true" />
                ))}
                {copyElement}
                {mediaElement}
                {area.content && (
                  <div
                    id={`focus-area-content-${area.number}`}
                    className={`focus-showcase__expanded-content ${area.number === "01" || area.id === "clean-cooking" ? "focus-showcase__expanded-content--biogas" : ""} ${area.number === "03" || area.id === "environmental-campaign" ? "focus-showcase__expanded-content--environment" : ""} ${area.number === "02" || area.id === "sustainable-agriculture" ? "focus-showcase__expanded-content--agriculture" : ""} ${area.number === "04" || area.id === "women-empowerment" ? "focus-showcase__expanded-content--women" : ""} ${area.number === "05" || area.id === "skill-development" ? "focus-showcase__expanded-content--skills" : ""}`}
                    hidden={!isExpanded(area.number)}
                  >
                    {area.number === "01" || area.id === "clean-cooking" ? (
                      <div className="focus-showcase__biogas-expanded-editorial">
                        {/* Section 1: Farming & Bio-Slurry (Image Left, Text Right) */}
                        <div className="focus-showcase__biogas-editorial-grid focus-showcase__biogas-editorial-grid--section1">
                          <div className="focus-showcase__editorial-media-wrapper">
                            <figure className="focus-showcase__biogas-editorial-media">
                              <img
                                src={assetUrl("/images/biogas/biogas-sustainable-agriculture.jpg")}
                                alt="Rural Indian farmer applying organic bio-slurry fertilizer beside a biogas plant"
                                loading="lazy"
                              />
                            </figure>
                            <InitiativeStrip heading="ORGANIC BIO-SLURRY APPLICATION" />
                          </div>
                          <div className="focus-showcase__biogas-editorial-text">
                            <h4>Bio-Slurry & Organic Agriculture</h4>
                            <p>{area.content.paragraphs[1]}</p>
                            <h4>Rural Livelihoods & Economic Empowerment</h4>
                            <p>{area.content.paragraphs[2]}</p>
                          </div>
                        </div>

                        {/* Section 2: Conclusion & Community (Text Left, Image Right) */}
                        {area.content.conclusion && (
                          <div className="focus-showcase__biogas-editorial-grid focus-showcase__biogas-editorial-grid--section2">
                            <div className="focus-showcase__biogas-editorial-text focus-showcase__biogas-editorial-text--conclusion">
                              <h4>Conclusion</h4>
                              <p>{area.content.conclusion}</p>
                            </div>
                            <div className="focus-showcase__editorial-media-wrapper">
                              <figure className="focus-showcase__biogas-editorial-media focus-showcase__biogas-editorial-media--conclusion">
                                <img
                                  src={assetUrl("/images/biogas/biogas-community-empowerment.jpg")}
                                  alt="Rural Indian woman cooking with clean blue biogas flame on veranda with village community"
                                  loading="lazy"
                                />
                              </figure>
                              <InitiativeStrip heading="SMOKELESS COOKING & CLEAN FLAME" />
                            </div>
                          </div>
                        )}
                      </div>
                    ) : area.number === "03" || area.id === "environmental-campaign" ? (
                      <div className="focus-showcase__environment-expanded-editorial">
                        {/* Section 1: Waste Management (Image Left, Content Right) */}
                        <div className="focus-showcase__environment-editorial-grid focus-showcase__environment-editorial-grid--section1">
                          <div className="focus-showcase__editorial-media-wrapper">
                            <figure className="focus-showcase__environment-editorial-media">
                              <img
                                src={assetUrl("/images/environment/environmental_waste_management_campaign_clean_1795026100792.jpg")}
                                alt="Synergy Organisation environmental campaign volunteers conducting waste segregation and clean-up"
                                loading="lazy"
                              />
                            </figure>
                            <InitiativeStrip heading="COMMUNITY WASTE SEGREGATION & CLEAN-UP" />
                          </div>
                          <div className="focus-showcase__environment-editorial-text">
                            <h4>Waste Management</h4>
                            <p>{area.content.paragraphs[1]}</p>
                          </div>
                        </div>

                        {/* Section 2: Awareness Workshop (Content Left, Image Right) */}
                        <div className="focus-showcase__environment-editorial-grid focus-showcase__environment-editorial-grid--section2">
                          <div className="focus-showcase__environment-editorial-text">
                            <h4>Awareness Workshops</h4>
                            <p>{area.content.paragraphs[2]}</p>
                            <p>{area.content.paragraphs[3]}</p>
                          </div>
                          <div className="focus-showcase__editorial-media-wrapper">
                            <figure className="focus-showcase__environment-editorial-media">
                              <img
                                src={assetUrl("/images/environment/environmental_awareness_workshop_1795026156562.jpg")}
                                alt="Community environmental awareness workshop on sustainable practices and conservation"
                                loading="lazy"
                              />
                            </figure>
                            <InitiativeStrip heading="GRASSROOTS CONSERVATION WORKSHOP" />
                          </div>
                        </div>

                        {/* Section 3: Tree Plantation & Conclusion (Image Left, Content Right) */}
                        <div className="focus-showcase__environment-editorial-grid focus-showcase__environment-editorial-grid--section3">
                          <div className="focus-showcase__editorial-media-wrapper">
                            <figure className="focus-showcase__environment-editorial-media">
                              <img
                                src={assetUrl("/images/environment/environmental_community_tree_plantation_1795026126588.jpg")}
                                alt="Community members and volunteers planting trees in a rural green plantation drive"
                                loading="lazy"
                              />
                            </figure>
                            <InitiativeStrip heading="COMMUNITY TREE PLANTATION DRIVE" />
                          </div>
                          <div className="focus-showcase__environment-editorial-text focus-showcase__environment-editorial-text--conclusion">
                            <h4>Tree Plantation</h4>
                            <p>{area.content.paragraphs[4]}</p>
                            <p>{area.content.paragraphs[5]}</p>
                            {area.content.conclusion && (
                              <>
                                <h4>Conclusion</h4>
                                <p>{area.content.conclusion}</p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : area.number === "02" || area.id === "sustainable-agriculture" ? (
                      <div className="focus-showcase__initiative-expanded-editorial">
                        {/* Section 1: Farmer Education (Text Left, Image Right) */}
                        <div className="focus-showcase__initiative-editorial-grid focus-showcase__initiative-editorial-grid--image-right">
                          <div className="focus-showcase__initiative-editorial-text">
                            <h4>Farmer Education & Capacity Building</h4>
                            <p>{area.content.paragraphs[1]}</p>
                          </div>
                          <div className="focus-showcase__editorial-media-wrapper">
                            <figure className="focus-showcase__initiative-editorial-media">
                              <img
                                src={assetUrl("/images/agriculture/rural_agri_training_session_1795029129506.jpg")}
                                alt="Agricultural specialist providing practical training on organic farming and soil health to rural Indian farmers"
                                loading="lazy"
                              />
                            </figure>
                            <InitiativeStrip heading="FARMER EDUCATION & FIELD TRAINING" />
                          </div>
                        </div>

                        {/* Section 2: Bio-Slurry Fertilizer (Image Left, Text Right) */}
                        <div className="focus-showcase__initiative-editorial-grid focus-showcase__initiative-editorial-grid--image-left">
                          <div className="focus-showcase__editorial-media-wrapper">
                            <figure className="focus-showcase__initiative-editorial-media">
                              <img
                                src={assetUrl("/images/agriculture/farmer_applying_bio_slurry_1795029135211.jpg")}
                                alt="Indian farmer applying organic biogas slurry fertilizer to enrich soil and nourish healthy crops"
                                loading="lazy"
                              />
                            </figure>
                            <InitiativeStrip heading="BIO-SLURRY SOIL ENRICHMENT" />
                          </div>
                          <div className="focus-showcase__initiative-editorial-text">
                            <h4>Bio-Slurry & Soil Enrichment</h4>
                            <p>{area.content.paragraphs[2]}</p>
                            <p>{area.content.paragraphs[3]}</p>
                          </div>
                        </div>

                        {/* Section 3: Economic Resilience & Conclusion (Text Left, Image Right) */}
                        <div className="focus-showcase__initiative-editorial-grid focus-showcase__initiative-editorial-grid--image-right">
                          <div className="focus-showcase__initiative-editorial-text focus-showcase__initiative-editorial-text--conclusion">
                            <h4>Economic Resilience & Stewardship</h4>
                            <p>{area.content.paragraphs[4]}</p>
                            <p>{area.content.paragraphs[5]}</p>
                            {area.content.conclusion && (
                              <>
                                <h4>Conclusion</h4>
                                <p>{area.content.conclusion}</p>
                              </>
                            )}
                          </div>
                          <div className="focus-showcase__editorial-media-wrapper">
                            <figure className="focus-showcase__initiative-editorial-media">
                              <img
                                src={assetUrl("/images/agriculture/indian_farmers_organic_harvest_1795029142115.jpg")}
                                alt="Rural Indian farming couple celebrating a bountiful organic harvest in verdant agricultural field"
                                loading="lazy"
                              />
                            </figure>
                            <InitiativeStrip heading="BOUNTIFUL ORGANIC HARVEST & RESILIENCE" />
                          </div>
                        </div>
                      </div>
                    ) : area.number === "04" || area.id === "women-empowerment" ? (
                      <div className="focus-showcase__initiative-expanded-editorial">
                        {/* Section 1: Vocational Skills (Text Left, Image Right) */}
                        <div className="focus-showcase__initiative-editorial-grid focus-showcase__initiative-editorial-grid--image-right">
                          <div className="focus-showcase__initiative-editorial-text">
                            <h4>Vocational Skills & Micro-Enterprise</h4>
                            <p>{area.content.paragraphs[1]}</p>
                          </div>
                          <div className="focus-showcase__editorial-media-wrapper">
                            <figure className="focus-showcase__initiative-editorial-media">
                              <img
                                src={assetUrl("/images/women/rural_women_tailoring_training_1795029146013.jpg")}
                                alt="Rural Indian women participating in vocational tailoring and garment craftsmanship training"
                                loading="lazy"
                              />
                            </figure>
                            <InitiativeStrip heading="VOCATIONAL TAILORING & CRAFTSMANSHIP" />
                          </div>
                        </div>

                        {/* Section 2: Self-Help Groups (Image Left, Text Right) */}
                        <div className="focus-showcase__initiative-editorial-grid focus-showcase__initiative-editorial-grid--image-left">
                          <div className="focus-showcase__editorial-media-wrapper">
                            <figure className="focus-showcase__initiative-editorial-media">
                              <img
                                src={assetUrl("/images/women/mahila_bachat_gat_meeting_1795029152941.jpg")}
                                alt="Members of Mahila Bachat Gat self-help group gathering in village courtyard to manage community savings"
                                loading="lazy"
                              />
                            </figure>
                            <InitiativeStrip heading="MAHILA BACHAT GAT & SAVINGS GROUPS" />
                          </div>
                          <div className="focus-showcase__initiative-editorial-text">
                            <h4>Financial Literacy & Collective Leadership</h4>
                            <p>{area.content.paragraphs[2]}</p>
                            <p>{area.content.paragraphs[3]}</p>
                          </div>
                        </div>

                        {/* Section 3: Community Leadership & Conclusion (Text Left, Image Right) */}
                        <div className="focus-showcase__initiative-editorial-grid focus-showcase__initiative-editorial-grid--image-right">
                          <div className="focus-showcase__initiative-editorial-text focus-showcase__initiative-editorial-text--conclusion">
                            <h4>Community Leadership & Social Equality</h4>
                            <p>{area.content.paragraphs[4]}</p>
                            {area.content.conclusion && (
                              <>
                                <h4>Conclusion</h4>
                                <p>{area.content.conclusion}</p>
                              </>
                            )}
                          </div>
                          <div className="focus-showcase__editorial-media-wrapper">
                            <figure className="focus-showcase__initiative-editorial-media">
                              <img
                                src={assetUrl("/images/women/rural_women_community_leaders_1795029155069.jpg")}
                                alt="Confident rural Indian women community leaders standing proudly outside village centre"
                                loading="lazy"
                              />
                            </figure>
                            <InitiativeStrip heading="COMMUNITY LEADERSHIP & SOCIAL EQUALITY" />
                          </div>
                        </div>
                      </div>
                    ) : area.number === "05" || area.id === "skill-development" ? (
                      <div className="focus-showcase__initiative-expanded-editorial">
                        {/* Section 1: Technical & Vocational Training (Image Left, Text Right) */}
                        <div className="focus-showcase__initiative-editorial-grid focus-showcase__initiative-editorial-grid--image-left">
                          <div className="focus-showcase__editorial-media-wrapper">
                            <figure className="focus-showcase__initiative-editorial-media">
                              <img
                                src={assetUrl("/images/skills/vocational_skills_training_india_1795029167099.jpg")}
                                alt="Young Indian vocational trainees learning technical electrical wiring and mechanical skills from an instructor"
                                loading="lazy"
                              />
                            </figure>
                            <InitiativeStrip heading="TECHNICAL & VOCATIONAL TRADE TRAINING" />
                          </div>
                          <div className="focus-showcase__initiative-editorial-text">
                            <h4>Technical Training & Livelihood Skills</h4>
                            <p>{area.content.paragraphs[1]}</p>
                            <p>{area.content.paragraphs[2]}</p>
                          </div>
                        </div>

                        {/* Section 2: Soft Skills & Digital Literacy (Text Left, Image Right) */}
                        <div className="focus-showcase__initiative-editorial-grid focus-showcase__initiative-editorial-grid--image-right">
                          <div className="focus-showcase__initiative-editorial-text">
                            <h4>Soft Skills & Digital Capabilities</h4>
                            <p>{area.content.paragraphs[3]}</p>
                          </div>
                          <div className="focus-showcase__editorial-media-wrapper">
                            <figure className="focus-showcase__initiative-editorial-media">
                              <img
                                src={assetUrl("/images/skills/digital_literacy_classroom_1795029180903.jpg")}
                                alt="Young Indian students learning computer applications and digital skills in a modern community learning centre"
                                loading="lazy"
                              />
                            </figure>
                            <InitiativeStrip heading="DIGITAL LITERACY & COMPUTER EDUCATION" />
                          </div>
                        </div>

                        {/* Section 3: Entrepreneurship & Economic Transformation (Image Left, Text Right) */}
                        <div className="focus-showcase__initiative-editorial-grid focus-showcase__initiative-editorial-grid--image-left">
                          <div className="focus-showcase__editorial-media-wrapper">
                            <figure className="focus-showcase__initiative-editorial-media">
                              <img
                                src={assetUrl("/images/skills/indian_entrepreneur_workshop_1795029177202.jpg")}
                                alt="Skilled young Indian professional working with confidence in a modern workshop enterprise"
                                loading="lazy"
                              />
                            </figure>
                            <InitiativeStrip heading="YOUTH ENTREPRENEURSHIP & ENTERPRISE" />
                          </div>
                          <div className="focus-showcase__initiative-editorial-text focus-showcase__initiative-editorial-text--conclusion">
                            <h4>Entrepreneurship & Self-Reliance</h4>
                            <p>{area.content.paragraphs[4]}</p>
                            <h4>Economic Transformation</h4>
                            <p>{area.content.paragraphs[5]}</p>
                            {area.content.conclusion && (
                              <>
                                <h4>Conclusion</h4>
                                <p>{area.content.conclusion}</p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        {area.content.paragraphs.slice(1).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                        {area.content.conclusion && (
                          <>
                            <h4>Conclusion</h4>
                            <p>{area.content.conclusion}</p>
                          </>
                        )}
                      </>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
