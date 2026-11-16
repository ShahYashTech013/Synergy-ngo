import { useState, useEffect } from "react";
import { X, CheckCircle2, ArrowRight } from "lucide-react";
import AnimatedText from "./AnimatedText.jsx";
import { enquiryRepository } from "../services/repositories/enquiryRepository.js";
import { assetUrl } from "../utils/assetUrl";
import "./PartnerWithUs.css";

const partnershipOptions = [
  "Corporate Partnerships",
  "CSR Partnerships",
  "Community Partnerships",
];

const partnerCardsData = [
  {
    id: "corporate-partnerships",
    type: "Corporate Partnerships",
    badge: "Corporate & ESG",
    title: "Corporate Partnerships",
    description:
      "Collaborate with Synergy Organization on ESG alignment, carbon-reduction milestones, and corporate environmental leadership through scalable clean cooking infrastructure.",
    image: assetUrl("/images/biogas/BIOGASIMG4.jpeg"),
    imageAlt: "Corporate and institutional partners exploring biogas technology",
    buttonText: "Explore Partnership",
  },
  {
    id: "csr-partnerships",
    type: "CSR Partnerships",
    badge: "CSR Impact",
    title: "CSR Partnerships",
    description:
      "Channel Schedule VII CSR capital to fund village biogas plants, eliminate indoor smoke for vulnerable families, and empower women with sustainable livelihood training.",
    image: assetUrl("/images/biogas/BIO GAS INSTALL1.jpeg"),
    imageAlt: "Field construction of clean cooking biogas digesters funded through CSR",
    buttonText: "Discuss CSR",
  },
  {
    id: "community-partnerships",
    type: "Community Partnerships",
    badge: "Grassroots & Local Action",
    title: "Community Partnerships",
    description:
      "Mobilize Gram Panchayats, rural cooperatives, self-help groups, and youth leaders to establish community-owned clean-energy digesters and organic farming clusters.",
    image: assetUrl("/images/biogas/IMG3BIOGAS.jpeg"),
    imageAlt: "Community members and local leaders gathered at a rural biogas installation",
    buttonText: "Be a Part of Us",
  },
];

export default function PartnerWithUs() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("Corporate Partnerships");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    organization: "",
    message: "",
  });

  const handleOpenModal = (partnershipType) => {
    setSelectedType(partnershipType);
    setIsSubmitted(false);
    setErrorMessage("");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsSubmitted(false);
    setErrorMessage("");
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      organization: "",
      message: "",
    });
  };

  useEffect(() => {
    if (!isModalOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleCloseModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isModalOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      await enquiryRepository.create({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        location: formData.organization.trim(),
        plantType: selectedType,
        message: formData.message.trim(),
        enquiryStatus: "new",
        assignedStaff: "",
        internalNotes: `Submitted via Partner With Us section (${selectedType})`,
      });
      setIsSubmitted(true);
    } catch (error) {
      setErrorMessage(
        error.message || "Failed to submit your enquiry. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="partner-with-us"
      className="partner-with-us-section"
    >
      <div className="partner-with-us-container">
        <header className="partner-section-header">
          <AnimatedText
            as="span"
            variant="character"
            className="partner-eyebrow"
          >
            PARTNER WITH US
          </AnimatedText>
          <AnimatedText as="h1" variant="word" className="partner-title">
            Collaborate for Sustainable Rural Transformation
          </AnimatedText>
          <AnimatedText
            as="p"
            variant="fade"
            delay={100}
            className="partner-subtitle"
          >
            Join hands with Synergy Organization to scale household biogas access,
            empower rural women, and foster community-led ecological resilience.
          </AnimatedText>
        </header>

        {/* 3 CARDS IN ONE HORIZONTAL ROW (DESKTOP: 3 COLS, TABLET: 2 COLS, MOBILE: 1 COL) */}
        <div className="partner-cards-grid" id="partner-opportunities">
          {partnerCardsData.map((card, index) => (
            <article
              key={card.id}
              className="partner-card"
              id={card.id}
            >
              <div className="partner-card-media">
                <img
                  src={card.image}
                  alt={card.imageAlt}
                  className="partner-card-img"
                  loading="lazy"
                />
              </div>
              <div className="partner-card-body">
                <span className="partner-card-badge">{card.badge}</span>
                <AnimatedText
                  as="h3"
                  variant="line"
                  delay={index * 80}
                  className="partner-card-title"
                >
                  {card.title}
                </AnimatedText>
                <AnimatedText
                  as="p"
                  variant="fade"
                  delay={index * 80 + 70}
                  className="partner-card-desc"
                >
                  {card.description}
                </AnimatedText>
                <button
                  type="button"
                  className="partner-card-cta-btn"
                  onClick={() => handleOpenModal(card.type)}
                  aria-haspopup="dialog"
                >
                  <span>{card.buttonText}</span>
                  <ArrowRight size={17} aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* REUSABLE ENQUIRY POPUP (MODAL) */}
      {isModalOpen && (
        <div
          className="partner-modal-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              handleCloseModal();
            }
          }}
          role="presentation"
        >
          <div
            className="partner-modal-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="partner-modal-title"
          >
            <div className="partner-modal-header">
              <h2 id="partner-modal-title" className="partner-modal-title">
                {isSubmitted ? "Enquiry Received" : "Partnership Enquiry"}
              </h2>
              <button
                type="button"
                className="partner-modal-close"
                onClick={handleCloseModal}
                aria-label="Close enquiry popup"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            <div className="partner-modal-body">
              {isSubmitted ? (
                <div className="partner-success-box">
                  <div className="partner-success-icon">
                    <CheckCircle2 size={32} aria-hidden="true" />
                  </div>
                  <h3 className="partner-success-title">Thank You!</h3>
                  <p className="partner-success-desc">
                    Your partnership enquiry for{" "}
                    <strong>{selectedType}</strong> has been received
                    successfully. Our partnership team will review your details
                    and connect with you shortly.
                  </p>
                  <button
                    type="button"
                    className="partner-btn-primary"
                    onClick={handleCloseModal}
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <p className="partner-modal-subtitle">
                    Share your organization’s details and collaboration goals.
                    Our team will get in touch to discuss mutual impact.
                  </p>

                  {errorMessage && (
                    <div className="alert alert-danger py-2 px-3 small rounded-3 mb-3" role="alert">
                      {errorMessage}
                    </div>
                  )}

                  <div className="partner-form-group">
                    <label htmlFor="partner-type-select">Partnership Type *</label>
                    <select
                      id="partner-type-select"
                      className="partner-form-control"
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      required
                    >
                      {partnershipOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="partner-form-group">
                    <label htmlFor="partner-name-input">Full Name *</label>
                    <input
                      id="partner-name-input"
                      type="text"
                      className="partner-form-control"
                      placeholder="e.g. Rahul Sharma"
                      required
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                    />
                  </div>

                  <div className="row g-3">
                    <div className="col-sm-6 partner-form-group">
                      <label htmlFor="partner-email-input">Work Email *</label>
                      <input
                        id="partner-email-input"
                        type="email"
                        className="partner-form-control"
                        placeholder="name@organization.org"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-sm-6 partner-form-group">
                      <label htmlFor="partner-phone-input">Phone Number *</label>
                      <input
                        id="partner-phone-input"
                        type="tel"
                        className="partner-form-control"
                        placeholder="+91 98765 43210"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="partner-form-group">
                    <label htmlFor="partner-org-input">
                      Organization / Entity Name *
                    </label>
                    <input
                      id="partner-org-input"
                      type="text"
                      className="partner-form-control"
                      placeholder="Company, CSR foundation, or Panchayat name"
                      required
                      value={formData.organization}
                      onChange={(e) =>
                        setFormData({ ...formData, organization: e.target.value })
                      }
                    />
                  </div>

                  <div className="partner-form-group">
                    <label htmlFor="partner-message-input">
                      Brief Message / Collaboration Scope *
                    </label>
                    <textarea
                      id="partner-message-input"
                      rows="3"
                      className="partner-form-control"
                      placeholder="Briefly describe your objectives, target geography, or areas of interest..."
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                    />
                  </div>

                  <div className="partner-modal-actions">
                    <button
                      type="button"
                      className="partner-btn-secondary"
                      onClick={handleCloseModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="partner-btn-primary"
                      disabled={
                        isSubmitting ||
                        !formData.fullName.trim() ||
                        !formData.email.trim() ||
                        !formData.phone.trim() ||
                        !formData.organization.trim() ||
                        !formData.message.trim()
                      }
                    >
                      {isSubmitting ? "Submitting..." : "Submit Enquiry"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
