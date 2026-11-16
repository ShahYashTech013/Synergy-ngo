import { useState } from "react";
import FindOurLocation from "../COMPONENT/FindOurLocation.jsx";

export default function Contact() {
  const [contactForm, setContactForm] = useState({ name: "", phone: "", message: "" });
  const [contactSuccess, setContactSuccess] = useState(false);

  return (
    <div className="container-fluid px-4 px-md-5 py-5 w-100">
      <div className="row g-5">
        <div className="col-lg-6">
          <h2 className="fw-bold mb-3">Interested in discussing?</h2>
          <p className="text-muted mb-4">Have questions about biogas installation or volunteering? Send us an enquiry.</p>
          {contactSuccess && (
            <div className="alert alert-success rounded-3 mb-4">
              Thank you! Your enquiry has been received by our team.
            </div>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setContactSuccess(true);
            }}
            className="card border-0 shadow-sm rounded-4 p-4"
          >
            <div className="mb-3">
              <label className="form-label small fw-bold">Your Name *</label>
              <input
                type="text"
                className="form-control"
                required
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label small fw-bold">Phone / WhatsApp *</label>
              <input
                type="tel"
                className="form-control"
                required
                value={contactForm.phone}
                onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label small fw-bold">Message / Village Location *</label>
              <textarea
                className="form-control"
                rows="4"
                required
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-success fw-bold py-2 rounded-pill">
              Submit Enquiry
            </button>
          </form>
        </div>

        <div className="col-lg-6">
          <h2 className="fw-bold mb-3">Frequently Asked Questions</h2>
          <div className="accordion" id="faqAcc">
            {[
              {
                q: "What is Synergy Organization and where does it work?",
                a: "Synergy Organization is an NGO working in rural Karnataka and Maharashtra focusing on biogas clean energy, sustainable agriculture, environmental awareness, women empowerment, and youth skill development.",
              },
              {
                q: "What is a biogas plant and how does it work?",
                a: "A biogas plant processes cattle dung and household organic wet waste inside an oxygen-free tank to generate clean cooking gas and nutrient-rich organic manure slurry.",
              },
              {
                q: "Does the organisation provide training or follow-up support?",
                a: "Yes. Synergy follows a 5-step approach: Plan, Train, Monitor, Support, and Report—providing ongoing guidance after installation.",
              },
            ].map((f, i) => (
              <div className="accordion-item mb-3 border-0 shadow-sm rounded-4 overflow-hidden" key={i}>
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed fw-semibold bg-white py-3" type="button">
                    {f.q}
                  </button>
                </h2>
                <div className="accordion-body small text-muted bg-white pb-3">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 pt-3">
        <FindOurLocation />
      </div>
    </div>
  );
}
