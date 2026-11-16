import React from "react";
import AnimatedText from "./AnimatedText.jsx";
import "./OurProgrammes.css";

export const fourProgrammesData = [
  {
    id: "environmental-campaigns",
    title: "Environmental Campaigns",
    badge: "Eco Awareness",
    shortDesc:
      "Community and school drives promoting waste segregation, plastic reduction, water conservation, and native tree plantations across rural districts.",
    image:
      "https://images.unsplash.com/photo-1542601098-3adb3baeb1ec?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Community environmental awareness and tree planting initiative",
    page: "initiative-environmental-campaign",
    focus: "Tree Plantation · Waste Segregation · Water Conservation",
  },
  {
    id: "women-empowerment",
    title: "Women Empowerment",
    badge: "Livelihoods & SHGs",
    shortDesc:
      "Supporting rural women through Self-Help Groups (SHGs), vocational tailoring and handicraft training, financial literacy, and smoke-free healthy household environments.",
    image: "/WhatsApp%20Image%202026-11-08%20at%203.21.40%20PM.jpeg",
    imageAlt: "Rural women empowerment and livelihoods training",
    page: "initiative-women-empowerment",
    focus: "Self-Help Groups · Micro-Enterprise · Smoke-Free Living",
  },
  {
    id: "biogas-sustainable-energy",
    title: "Biogas & Sustainable Energy",
    badge: "Flagship Clean Energy",
    shortDesc:
      "Deploying household biogas plants using daily cattle dung and wet kitchen waste, delivering clean cooking fuel and organic bio-slurry for chemical-free farming.",
    image: "/images/story/IMG3BIOGAS.jpeg",
    imageAlt: "Rural household biogas digester installation",
    page: "initiative-biogas-clean-energy",
    focus: "Smoke-Free Kitchens · Organic Bio-Slurry · Renewable Energy",
  },
  {
    id: "youth-skill-development",
    title: "Youth Skill Development",
    badge: "Employability & Skills",
    shortDesc:
      "Providing industry-relevant technical trades, biogas technician apprenticeships, computer skills, and rural entrepreneurship mentoring for young individuals.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Rural youth skill development and vocational training session",
    page: "initiative-skill-development",
    focus: "Green-Tech Trades · Digital Literacy · Career Mentorship",
  },
];

export default function OurProgrammes({ onNavigate }) {
  const handleMoreProgrammes = () => {
    if (typeof onNavigate === "function") {
      onNavigate("initiatives");
    } else {
      window.location.hash = "initiatives";
    }
  };

  const handleCardClick = (page) => {
    if (typeof onNavigate === "function") {
      onNavigate(page || "initiatives");
    } else {
      window.location.hash = page || "initiatives";
    }
  };

  return (
    <section id="our-programmes" className="our-programmes-section py-5" style={{ background: "#f8faf7" }}>
      <div className="container-fluid px-4 px-md-5 py-4">
        {/* Header with Heading & Beside 'More Programmes →' Button */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 mb-md-5 gap-3 border-bottom pb-4">
          <div>
            <AnimatedText
              as="span"
              variant="character"
              className="text-success fw-bold text-uppercase small tracking-wider d-block mb-1"
            >
              OUR PROGRAMMES
            </AnimatedText>
            <AnimatedText
              as="h2"
              variant="word"
              className="fw-bold display-6 mb-0"
              style={{ color: "#203C2B" }}
            >
              Making Impact Together
            </AnimatedText>
          </div>
          <div>
            <button
              type="button"
              className="more-programmes-btn d-inline-flex align-items-center gap-2"
              onClick={handleMoreProgrammes}
              aria-label="View more programmes in our initiatives section"
            >
              <span>More Programmes</span>
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </div>

        {/* 4 Attractive Cards Grid */}
        <div className="row g-4">
          {fourProgrammesData.map((prog, index) => (
            <div className="col-lg-6 col-md-12" key={prog.id}>
              <article className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden programme-feature-card">
                <div className="row g-0 h-100">
                  <div className="col-sm-5 position-relative">
                    <div className="programme-feature-img-wrapper h-100">
                      <img
                        src={prog.image}
                        alt={prog.imageAlt || prog.title}
                        className="programme-feature-img"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="col-sm-7">
                    <div className="card-body p-4 d-flex flex-column h-100">
                      <span className="programme-badge align-self-start mb-2">
                        {prog.badge}
                      </span>
                      <AnimatedText
                        as="h3"
                        variant="line"
                        delay={index * 60}
                        className="programme-title mb-2"
                      >
                        {prog.title}
                      </AnimatedText>
                      <AnimatedText
                        as="p"
                        variant="fade"
                        delay={index * 60 + 70}
                        className="programme-desc flex-grow-1 mb-3"
                      >
                        {prog.shortDesc}
                      </AnimatedText>
                      <div className="programme-meta pt-2 mb-3">
                        <i className="bi bi-check2-circle text-success me-1"></i>
                        <span>{prog.focus}</span>
                      </div>
                      <button
                        type="button"
                        className="programme-cta-btn align-self-start"
                        onClick={() => handleCardClick(prog.page)}
                      >
                        <span>Explore Initiative</span>
                        <span aria-hidden="true">&rarr;</span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
