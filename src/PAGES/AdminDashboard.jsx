import { useState } from "react";

export default function AdminDashboard({
  impactStats,
  setImpactStats,
  programmesList,
  setProgrammesList,
  galleryItems,
  setGalleryItems,
  donationsList,
  onExportCSV,
}) {
  const [newProg, setNewProg] = useState({ title: "", badge: "", shortDesc: "", image: "" });
  const [newPhoto, setNewPhoto] = useState({
    category: "Biogas installations",
    caption: "",
    location: "",
    date: "2026",
    image: "",
  });

  return (
    <div className="container-fluid px-4 px-md-5 py-5 w-100">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div>
          <span className="badge bg-info text-dark mb-1 px-3 py-1">STAFF PORTAL</span>
          <h2 className="fw-bold mb-0">NGO Dynamic Admin Dashboard</h2>
        </div>
        <button className="btn btn-success fw-bold px-4 py-2 shadow-sm rounded-pill" onClick={onExportCSV}>
          <i className="bi bi-download me-1"></i> Export Donations CSV
        </button>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
            <div className="text-muted small mb-1">Total Confirmed Donations (PAID)</div>
            <div className="fs-2 fw-bold text-success">
              ₹
              {(
                donationsList
                  .filter((d) => d.status === "PAID")
                  .reduce((acc, curr) => acc + curr.amountPaise, 0) / 100
              ).toLocaleString("en-IN")}
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card border-0 shadow-sm rounded-4 p-4">
            <h6 className="fw-bold mb-3">Live Impact Counters Editor (Updates Public Site Instantly)</h6>
            <div className="row g-3">
              <div className="col-6 col-md-3">
                <label className="small text-muted mb-1">Biogas Plants</label>
                <input
                  className="form-control"
                  value={impactStats.biogasPlants}
                  onChange={(e) => setImpactStats({ ...impactStats, biogasPlants: e.target.value })}
                />
              </div>
              <div className="col-6 col-md-3">
                <label className="small text-muted mb-1">Districts</label>
                <input
                  className="form-control"
                  value={impactStats.districts}
                  onChange={(e) => setImpactStats({ ...impactStats, districts: e.target.value })}
                />
              </div>
              <div className="col-6 col-md-3">
                <label className="small text-muted mb-1">Smoke-Free Homes</label>
                <input
                  className="form-control"
                  value={impactStats.smokeFreeHomes}
                  onChange={(e) => setImpactStats({ ...impactStats, smokeFreeHomes: e.target.value })}
                />
              </div>
              <div className="col-6 col-md-3">
                <label className="small text-muted mb-1">People Benefited</label>
                <input
                  className="form-control"
                  value={impactStats.peopleBenefited}
                  onChange={(e) => setImpactStats({ ...impactStats, peopleBenefited: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DYNAMIC PROGRAMME MANAGEMENT */}
      <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
        <h5 className="fw-bold mb-3 text-success">Add / Manage Programmes Dynamically</h5>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (newProg.title) {
              setProgrammesList([
                ...programmesList,
                {
                  id: "prog-" + Date.now(),
                  title: newProg.title,
                  badge: newProg.badge || "New Initiative",
                  shortDesc: newProg.shortDesc || "Community development program.",
                  problem: "Identified local rural challenge.",
                  solution: "Implementation through community participation.",
                  activities: ["Field assessment", "Community outreach"],
                  image: newProg.image || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=900&q=80",
                },
              ]);
              setNewProg({ title: "", badge: "", shortDesc: "", image: "" });
            }
          }}
          className="row g-3"
        >
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Programme Title"
              value={newProg.title}
              onChange={(e) => setNewProg({ ...newProg, title: e.target.value })}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Badge (e.g. Flagship)"
              value={newProg.badge}
              onChange={(e) => setNewProg({ ...newProg, badge: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Short Description"
              value={newProg.shortDesc}
              onChange={(e) => setNewProg({ ...newProg, shortDesc: e.target.value })}
            />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-success w-100 fw-bold rounded-pill">
              Add Programme
            </button>
          </div>
        </form>
      </div>

      {/* DYNAMIC GALLERY MANAGEMENT */}
      <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
        <h5 className="fw-bold mb-3 text-success">Add Photo to Our Gallery Dynamically</h5>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (newPhoto.caption && newPhoto.image) {
              setGalleryItems([
                {
                  id: Date.now(),
                  category: newPhoto.category,
                  caption: newPhoto.caption,
                  location: newPhoto.location || "Karnataka / Maharashtra",
                  date: newPhoto.date || "2026",
                  image: newPhoto.image,
                },
                ...galleryItems,
              ]);
              setNewPhoto({ category: "Biogas installations", caption: "", location: "", date: "2026", image: "" });
            }
          }}
          className="row g-3"
        >
          <div className="col-md-3">
            <select
              className="form-select"
              value={newPhoto.category}
              onChange={(e) => setNewPhoto({ ...newPhoto, category: e.target.value })}
            >
              <option value="Biogas installations">Biogas installations</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Environment">Environment</option>
              <option value="Women empowerment">Women empowerment</option>
              <option value="Youth development">Youth development</option>
            </select>
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Photo Caption"
              value={newPhoto.caption}
              onChange={(e) => setNewPhoto({ ...newPhoto, caption: e.target.value })}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="url"
              className="form-control"
              placeholder="Image URL"
              value={newPhoto.image}
              onChange={(e) => setNewPhoto({ ...newPhoto, image: e.target.value })}
              required
            />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-success w-100 fw-bold rounded-pill">
              Add to Gallery
            </button>
          </div>
        </form>
      </div>

      {/* DONATIONS TABLE */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="card-header bg-white py-3 fw-bold">
          MongoDB <code>donations</code> Collection (Stored in Integer Paise)
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0 small">
            <thead className="table-light">
              <tr>
                <th className="py-3">Payment ID</th>
                <th className="py-3">Donor Name</th>
                <th className="py-3">Amount (INR)</th>
                <th className="py-3">Amount (Paise)</th>
                <th className="py-3">Campaign</th>
                <th className="py-3">Status</th>
                <th className="py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {donationsList.map((d) => (
                <tr key={d.id}>
                  <td className="py-3"><code>{d.id}</code></td>
                  <td className="fw-semibold py-3">{d.donorName}</td>
                  <td className="py-3">₹{(d.amountPaise / 100).toLocaleString("en-IN")}</td>
                  <td className="py-3"><code>{d.amountPaise}</code></td>
                  <td className="py-3">{d.campaign}</td>
                  <td className="py-3">
                    <span className={`badge ${d.status === "PAID" ? "bg-success" : "bg-warning text-dark"}`}>
                      {d.status}
                    </span>
                  </td>
                  <td className="py-3">{d.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}