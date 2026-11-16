import { Flame, MapPin, Users, CheckCircle2 } from "lucide-react";
import AnimatedText, { AnimatedCounter } from "../COMPONENT/AnimatedText.jsx";
import "./Impact.css";

export default function Impact({ impactStats = {} }) {
  const biogasCount = 10000;
  const districtsCount = 10;
  const peopleCount = 50000;

  return (
    <div className="impact-page w-100">
      <div className="container-fluid px-4 px-md-5 synergy-section-padding">
        {/* 1. SECTION HEADING & IMPACT STATISTICS */}
        <section className="impact-overview-section" aria-labelledby="impact-overview-title">
          <div className="impact-overview-container">
            <header className="impact-overview-header text-center">
              <AnimatedText
                as="span"
                variant="character"
                className="impact-overview-eyebrow"
              >
                OUR IMPACT
              </AnimatedText>
              <AnimatedText
                as="h1"
                id="impact-overview-title"
                variant="word"
                className="impact-overview-title"
              >
                Creating Real Change, One Community at a Time
              </AnimatedText>
              <AnimatedText
                as="p"
                variant="fade"
                delay={100}
                className="impact-overview-subtitle"
              >
                Together, we are building healthier households and sustainable communities.
              </AnimatedText>
            </header>

            {/* 2. IMPACT STATISTICS: 3 EQUAL-WIDTH CARDS */}
            <div className="impact-stats-grid" role="list">
              {/* Card 1 */}
              <article className="impact-stat-card" role="listitem">
                <div className="impact-stat-icon-wrap" aria-hidden="true">
                  <Flame size={28} strokeWidth={2.2} />
                </div>
                <div className="impact-stat-number-wrap">
                  <AnimatedCounter
                    value={biogasCount}
                    className="impact-stat-number"
                  />
                </div>
                <h2 className="impact-stat-title">Biogas Plants Installed</h2>
              </article>

              {/* Card 2 */}
              <article className="impact-stat-card" role="listitem">
                <div className="impact-stat-icon-wrap" aria-hidden="true">
                  <MapPin size={28} strokeWidth={2.2} />
                </div>
                <div className="impact-stat-number-wrap">
                  <AnimatedCounter
                    value={districtsCount}
                    className="impact-stat-number"
                  />
                </div>
                <h2 className="impact-stat-title">Districts Impacted</h2>
                <p className="impact-stat-supporting">Maharashtra and Karnataka</p>
              </article>

              {/* Card 3 */}
              <article className="impact-stat-card" role="listitem">
                <div className="impact-stat-icon-wrap" aria-hidden="true">
                  <Users size={28} strokeWidth={2.2} />
                </div>
                <div className="impact-stat-number-wrap">
                  <AnimatedCounter
                    value={peopleCount}
                    className="impact-stat-number"
                  />
                </div>
                <h2 className="impact-stat-title">People Made Smoke-Free and Happy</h2>
              </article>
            </div>

            {/* 3. ACHIEVEMENT HIGHLIGHTS */}
            <div className="impact-achievements" aria-label="Key Achievements">
              <div className="impact-achievement-pill">
                <CheckCircle2 size={22} strokeWidth={2.4} className="impact-achievement-check" aria-hidden="true" />
                <span>10,000 households made smoke-free.</span>
              </div>
              <div className="impact-achievement-pill">
                <CheckCircle2 size={22} strokeWidth={2.4} className="impact-achievement-check" aria-hidden="true" />
                <span>50,000 people are now healthier and happier.</span>
              </div>
            </div>
          </div>
        </section>

        <div className="impact-section-divider" aria-hidden="true" />

        {/* 4. PRESERVED EXISTING CONTENT: DETAILED VERIFIED BREAKDOWN */}
        <section className="impact-detailed-section" aria-labelledby="impact-detailed-title">
          <div className="text-center mb-5">
            <AnimatedText as="h2" id="impact-detailed-title" variant="word" className="fw-bold display-6 mb-2">
              Our Measured Impact
            </AnimatedText>
            <AnimatedText as="p" variant="fade" delay={100} className="text-muted">
              Verified numbers, operational reach, and calculation methodology.
            </AnimatedText>
          </div>

          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="card border-0 shadow-sm text-center p-4 rounded-4 bg-white h-100">
                <div className="fw-bold text-success display-6">
                  <AnimatedCounter value={impactStats?.biogasPlants || "10,000"} />
                </div>
                <AnimatedText as="div" variant="fade" delay={100} className="fw-semibold mt-2">
                  Biogas Plants
                </AnimatedText>
                <AnimatedText as="small" variant="fade" delay={150} className="text-muted mt-1">
                  Installed & operational
                </AnimatedText>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card border-0 shadow-sm text-center p-4 rounded-4 bg-white h-100">
                <div className="fw-bold text-success display-6">
                  <AnimatedCounter value={impactStats?.districts || "10"} />
                </div>
                <AnimatedText as="div" variant="fade" delay={160} className="fw-semibold mt-2">
                  Districts Covered
                </AnimatedText>
                <AnimatedText as="small" variant="fade" delay={210} className="text-muted mt-1">
                  Across MH & KA
                </AnimatedText>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card border-0 shadow-sm text-center p-4 rounded-4 bg-white h-100">
                <div className="fw-bold text-success display-6">
                  <AnimatedCounter value={impactStats?.smokeFreeHomes || "10,000"} />
                </div>
                <AnimatedText as="div" variant="fade" delay={220} className="fw-semibold mt-2">
                  Smoke-Free Homes
                </AnimatedText>
                <AnimatedText as="small" variant="fade" delay={270} className="text-muted mt-1">
                  Using clean biogas stoves
                </AnimatedText>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card border-0 shadow-sm text-center p-4 rounded-4 bg-white h-100">
                <div className="fw-bold text-success display-6">
                  <AnimatedCounter value={impactStats?.peopleBenefited || "50,000"} />
                </div>
                <AnimatedText as="div" variant="fade" delay={280} className="fw-semibold mt-2">
                  People Benefited
                </AnimatedText>
                <AnimatedText as="small" variant="fade" delay={330} className="text-muted mt-1">
                  Healthier household members
                </AnimatedText>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
