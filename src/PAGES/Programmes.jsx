import React from "react";
import OurProgrammes, { fourProgrammesData } from "../COMPONENT/OurProgrammes.jsx";

export default function Programmes({
  programmes = fourProgrammesData,
  selectedProgramme,
  setSelectedProgramme,
  onDonateProgramme,
  onNavigate,
}) {
  if (selectedProgramme) {
    return (
      <div className="container-fluid px-4 px-md-5 py-5 w-100">
        <button
          className="btn btn-sm btn-outline-secondary mb-4 px-3 py-2 rounded-pill"
          onClick={() => setSelectedProgramme(null)}
        >
          <i className="bi bi-arrow-left me-1"></i> Back to All Programmes
        </button>
        <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
          <img
            src={selectedProgramme.image}
            alt={selectedProgramme.title}
            style={{ height: 380, objectFit: "cover" }}
          />
          <div className="card-body p-5">
            <span className="badge bg-success mb-3 px-3 py-2">{selectedProgramme.badge}</span>
            <h2 className="fw-bold display-6 mb-3">{selectedProgramme.title}</h2>
            <p className="lead text-muted mb-4">{selectedProgramme.shortDesc}</p>
            {(selectedProgramme.problem || selectedProgramme.solution) && (
              <div className="row g-4 my-3">
                {selectedProgramme.problem && (
                  <div className="col-md-6">
                    <div className="p-4 bg-light rounded-4 border-0 h-100">
                      <h6 className="fw-bold text-danger mb-2">The Problem</h6>
                      <p className="small text-muted mb-0">{selectedProgramme.problem}</p>
                    </div>
                  </div>
                )}
                {selectedProgramme.solution && (
                  <div className="col-md-6">
                    <div className="p-4 bg-light rounded-4 border-0 h-100">
                      <h6 className="fw-bold text-success mb-2">The Solution</h6>
                      <p className="small text-muted mb-0">{selectedProgramme.solution}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
            {selectedProgramme.activities?.length > 0 && (
              <>
                <h5 className="fw-bold mt-5 mb-3">Key Field Activities</h5>
                <ul className="list-group list-group-flush mb-4">
                  {selectedProgramme.activities.map((a, i) => (
                    <li key={i} className="list-group-item bg-transparent px-0 py-2">
                      <i className="bi bi-check-circle-fill text-success me-2"></i> {a}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {onDonateProgramme && (
              <button
                className="btn btn-success btn-lg fw-bold px-4 py-3 rounded-pill"
                onClick={() => onDonateProgramme(selectedProgramme.title)}
              >
                Support This Programme <i className="bi bi-heart-fill ms-2 text-danger"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <OurProgrammes
      onNavigate={onNavigate || ((page) => { window.location.hash = page; })}
    />
  );
}
