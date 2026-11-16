import  { useState } from "react";

export default function Gallery({ galleryItems }) {
  const [galleryCategory, setGalleryCategory] = useState("All");

  return (
    <div className="container-fluid px-4 px-md-5 py-5 w-100">
      <div className="text-center mb-5">
        <h1 className="fw-bold display-5 mb-2">Our Gallery</h1>
        <p className="text-muted">Moments that reflect our work and impact.</p>
      </div>

      <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
        {["All", ...new Set(galleryItems.map((item) => item.category).filter(Boolean))].map(
          (cat) => (
            <button
              key={cat}
              className={`btn btn-sm px-3 py-2 rounded-pill ${
                galleryCategory === cat ? "btn-success shadow-sm" : "btn-outline-secondary bg-white"
              }`}
              onClick={() => setGalleryCategory(cat)}
            >
              {cat}
            </button>
          )
        )}
      </div>

      <div className="row g-4">
        {galleryItems
          .filter((item) => galleryCategory === "All" || item.category === galleryCategory)
          .map((item) => (
            <div className="col-md-4" key={item.id}>
              <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.caption}
                  style={{ height: 240, objectFit: "cover" }}
                  className="card-img-top"
                  loading="lazy"
                />
                <div className="card-body p-4">
                  <span className="badge bg-success-subtle text-success mb-2 px-3 py-1">{item.category}</span>
                  <h6 className="fw-bold mb-2">{item.caption}</h6>
                  {item.location || item.date ? <p className="small text-muted mb-0">{item.location ? <span><i className="bi bi-geo-alt me-1 text-danger"></i>{item.location}</span> : null}{item.location && item.date ? " · " : null}{item.date}</p> : null}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
