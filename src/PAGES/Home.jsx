

export default function Home({ impactStats, programmes, biogasSteps, onExploreWork, onDonate, onSelectProgramme }) {
  return (
    <div className="w-100">
      <section
        className="text-white py-5 position-relative w-100"
        style={{
          background:
            "linear-gradient(rgba(12, 53, 28, 0.9), rgba(8, 38, 20, 0.95)), url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1600&q=80') center/cover",
          minHeight: "560px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="container-fluid px-4 px-md-5 py-5">
          <div className="row align-items-center">
            <div className="col-lg-8 text-center text-lg-start">
              <h1 className="display-3 fw-bold mb-4 lh-tight">
                Cleaner Energy. Stronger Rural Communities.
              </h1>
              <p className="lead mb-5 text-light opacity-90 col-lg-10">
                Synergy Organization works with rural communities to promote household biogas plants,
                environmental awareness, sustainable organic agriculture, women's empowerment, and youth skill development.
              </p>
              <div className="d-flex flex-wrap justify-content-center justify-content-lg-start gap-3">
                <button
                  className="btn btn-warning btn-lg fw-bold px-4 py-3 shadow rounded-pill"
                  onClick={onDonate}
                >
                  Donate Now <i className="bi bi-arrow-right ms-2"></i>
                </button>
                <button
                  className="btn btn-outline-light btn-lg px-4 py-3 rounded-pill"
                  onClick={onExploreWork}
                >
                  Explore Our Work
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT STRIP */}
      <section className="bg-success text-white py-4 shadow-sm w-100">
        <div className="container-fluid px-4">
          <div className="row text-center g-4">
            <div className="col-6 col-md-3">
              <div className="display-5 fw-bold">{impactStats.biogasPlants}+</div>
              <div className="small text-uppercase tracking-wider mt-1">Biogas Plants Installed</div>
            </div>
            <div className="col-6 col-md-3">
              <div className="display-5 fw-bold">{impactStats.districts}</div>
              <div className="small text-uppercase tracking-wider mt-1">Districts Impacted</div>
            </div>
            <div className="col-6 col-md-3">
              <div className="display-5 fw-bold">{impactStats.smokeFreeHomes}+</div>
              <div className="small text-uppercase tracking-wider mt-1">Smoke-Free Homes</div>
            </div>
            <div className="col-6 col-md-3">
              <div className="display-5 fw-bold">{impactStats.peopleBenefited}+</div>
              <div className="small text-uppercase tracking-wider mt-1">People Benefited</div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="py-5 bg-white w-100">
        <div className="container-fluid px-4 px-md-5 py-4">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="text-success fw-bold text-uppercase tracking-wider small">About Synergy</span>
              <h2 className="fw-bold mb-4 display-6">Empowering Rural Households Since Inception</h2>
              <p className="text-muted lead fs-6 mb-4">
                Established in <strong>2010</strong> by <strong>Mr. Nandkumar Patil</strong>, Synergy
                Organization is dedicated to transforming rural lives across Karnataka and Maharashtra through
                clean energy and sustainable community development.
              </p>
              <button
                className="btn btn-outline-success fw-semibold px-4 py-2 rounded-pill"
                onClick={onExploreWork}
              >
                Read Our Story <i className="bi bi-chevron-right ms-1"></i>
              </button>
            </div>
            <div className="col-lg-6">
              <div className="card border-0 shadow-lg overflow-hidden rounded-4">
                <img
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=900&q=80"
                  alt="Rural Biogas & Agriculture"
                  className="img-fluid w-100"
                  style={{ height: 380, objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMMES GRID */}
      <section className="py-5 bg-light w-100">
        <div className="container-fluid px-4 px-md-5 py-4">
          <div className="text-center mb-5">
            <span className="text-success fw-bold text-uppercase small tracking-wider">Core Focus Areas</span>
            <h2 className="fw-bold display-6 mt-1">Our Five Pillars of Rural Transformation</h2>
            <p className="text-muted">Click any programme card to explore full project details and activities.</p>
          </div>
          <div className="row g-4">
            {programmes.map((prog) => (
              <div className="col-md-6 col-lg-4" key={prog.id}>
                <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                  <img
                    src={prog.image}
                    className="card-img-top"
                    alt={prog.title}
                    style={{ height: 220, objectFit: "cover" }}
                  />
                  <div className="card-body p-4 d-flex flex-column">
                    <span className="badge bg-success-subtle text-success align-self-start mb-2 px-3 py-2 fw-semibold">
                      {prog.badge}
                    </span>
                    <h5 className="card-title fw-bold text-dark mb-2">{prog.title}</h5>
                    <p className="card-text text-muted small flex-grow-1 mb-4">{prog.shortDesc}</p>
                    <button
                      className="btn btn-outline-success fw-semibold btn-sm mt-auto w-100 py-2 rounded-pill"
                      onClick={() => onSelectProgramme(prog)}
                    >
                      Explore Programme <i className="bi bi-arrow-right ms-1"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW BIOGAS WORKS */}
      <section className="py-5 bg-white border-top border-bottom w-100">
        <div className="container-fluid px-4 px-md-5 py-4">
          <div className="text-center mb-5">
            <span className="badge bg-success mb-2 px-3 py-2">CLEAN ENERGY LIFECYCLE</span>
            <h2 className="fw-bold display-6">How a Rural Household Biogas Plant Works</h2>
            <p className="text-muted">Turning daily farm waste into smoke-free cooking fuel and organic fertiliser</p>
          </div>
          <div className="row g-4 text-center">
            {biogasSteps.map((s) => (
              <div className="col-md-4 col-lg" key={s.step}>
                <div className="p-4 rounded-4 bg-light border-0 shadow-sm h-100 d-flex flex-column align-items-center">
                  <div
                    className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3 shadow"
                    style={{ width: 64, height: 64 }}
                  >
                    <i className={`bi ${s.icon} fs-3`}></i>
                  </div>
                  <h6 className="fw-bold mb-2">{s.title}</h6>
                  <p className="small text-muted mb-0">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
