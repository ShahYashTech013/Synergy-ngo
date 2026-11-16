import React from "react";
import AnimatedText from "./AnimatedText.jsx";

export default function FindOurLocation() {
  const directionsUrl =
    "https://www.google.com/maps/search/?api=1&query=Synergy+Organization+Kolhapur+Maharashtra";

  return (
    <section
      id="find-our-location"
      className="find-our-location-section py-4"
      style={{
        background: "#ffffff",
        borderTop: "1px solid rgba(32, 60, 43, 0.08)",
      }}
    >
      <div
        className="container px-3 px-md-4"
        style={{ maxWidth: "1060px", margin: "0 auto" }}
      >
        <div className="card border-0 shadow-sm rounded-4 p-3 p-md-4 bg-white">
          <div className="row align-items-center g-4">
            {/* Left: Location Details & Directions */}
            <div className="col-lg-5 col-md-6">
              <div className="d-flex align-items-center gap-2 mb-1">
                <span
                  className="badge bg-success-subtle text-success px-2 py-1 small fw-semibold"
                  style={{ fontSize: "0.72rem", letterSpacing: "0.06em" }}
                >
                  VISIT OR CONNECT
                </span>
                <span className="text-muted small">·</span>
                <span className="small text-muted">Kolhapur Hub</span>
              </div>

              <AnimatedText
                as="h3"
                variant="line"
                className="fw-bold mb-2 h4"
                style={{ color: "#203C2B" }}
              >
                Find Our Location
              </AnimatedText>

              <p className="small text-muted mb-3" style={{ lineHeight: "1.45" }}>
                Synergy Organization operates across rural communities in Maharashtra &amp; Karnataka with central field coordination in Kolhapur.
              </p>

              <div className="d-flex flex-column gap-2 mb-3">
                {/* Address */}
                <div className="d-flex align-items-start gap-2">
                  <i className="bi bi-geo-alt-fill text-success fs-6 mt-1 flex-shrink-0"></i>
                  <span className="small text-dark">
                    <strong>Synergy Organization (India)</strong>
                    <br />
                    Kolhapur, Maharashtra 416001, India
                  </span>
                </div>

                {/* Phone & Email inline */}
                <div className="d-flex flex-wrap align-items-center gap-3 pt-1">
                  <div className="d-flex align-items-center gap-2">
                    <i className="bi bi-telephone-fill text-success small"></i>
                    <a
                      href="tel:+918861953047"
                      className="small text-decoration-none text-dark fw-medium"
                    >
                      +91 8861953047
                    </a>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <i className="bi bi-envelope-fill text-success small"></i>
                    <a
                      href="mailto:nspatilsynergyorg@gmail.com"
                      className="small text-decoration-none text-dark fw-medium"
                    >
                      nspatilsynergyorg@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-success btn-sm fw-semibold px-3 py-2 rounded-pill shadow-sm d-inline-flex align-items-center gap-2"
                style={{ backgroundColor: "#168653", borderColor: "#168653" }}
              >
                <i className="bi bi-compass-fill"></i>
                <span>Get Directions on Google Maps</span>
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>

            {/* Right: Compact Map */}
            <div className="col-lg-7 col-md-6">
              <div
                className="rounded-3 overflow-hidden border position-relative"
                style={{ height: "205px", background: "#f1f3f0" }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d122283.78508779679!2d74.16882655!3d16.7086212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc1000cdec07a29%3A0xece8dda6aa266eb8!2sKolhapur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  title="Synergy Organization Location Map"
                  style={{ border: 0, width: "100%", height: "100%" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-light position-absolute bottom-0 end-0 m-2 px-2 py-1 shadow-sm small text-dark fw-medium"
                  style={{ fontSize: "0.74rem", opacity: 0.95 }}
                >
                  <i className="bi bi-box-arrow-up-right me-1 text-success"></i> Open Map
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
