import {
  ArrowDown,
  ArrowRight,
  Droplets,
  Leaf,
  Sprout,
  Sun,
  UsersRound,
  UserRound,
  Wind,
  Zap,
} from "lucide-react";
import AnimatedText from "../COMPONENT/AnimatedText.jsx";
import "./About.css";

const visionMissionProgrammes = [
  {
    id: "environmental-campaigns",
    title: "Environmental Campaigns",
    badge: "Eco Awareness",
    description: "Grassroots village and school drives for waste segregation, plastic reduction, water conservation, and native tree plantations across rural districts.",
    image: "https://images.unsplash.com/photo-1542601098-3adb3baeb1ec?auto=format&fit=crop&w=800&q=80",
    page: "what-we-do",
    icon: Leaf,
  },
  {
    id: "women-empowerment",
    title: "Women Empowerment",
    badge: "Livelihoods & SHGs",
    description: "Empowering rural women through Self-Help Groups (SHGs), vocational tailoring and handicraft training, financial literacy, and healthy smoke-free homes.",
    image: "/WhatsApp%20Image%202026-11-08%20at%203.21.40%20PM.jpeg",
    page: "initiative-women-empowerment",
    icon: UsersRound,
  },
  {
    id: "biogas-sustainable-energy",
    title: "Biogas & Sustainable Energy",
    badge: "Clean Energy",
    description: "Setting up household biogas plants using daily cattle dung and wet waste to deliver smoke-free cooking fuel and organic bio-fertiliser for farming.",
    image: "/images/story/IMG3BIOGAS.jpeg",
    page: "initiative-biogas-clean-energy",
    icon: Zap,
  },
  {
    id: "youth-skill-development",
    title: "Youth Skill Development",
    badge: "Employability",
    description: "Equipping rural youth and labourers with green-tech trades, biogas technician skills, digital literacy, and rural entrepreneurship mentoring.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    page: "initiative-skill-development",
    icon: Sprout,
  },
];

const environmentalFocus = [
  {
    number: "01",
    title: "Ecology Today",
    description: "Promoting environmental awareness and sustainable practices for a greener future.",
    icon: Leaf,
  },
  {
    number: "02",
    title: "Clean Energy",
    description: "Empowering rural communities with renewable energy solutions and solar initiatives.",
    icon: Sun,
  },
  {
    number: "03",
    title: "Green Growth",
    description: "Supporting afforestation and eco-friendly programs to protect our planet.",
    icon: Sprout,
  },
];

const impactfulChange = [
  {
    number: "01",
    title: "Reduces Greenhouse Gas Emissions",
    description: "By using biogas, we prevent additional fossil fuel consumption, significantly lowering greenhouse gas emissions and supporting a cleaner environment.",
    icon: Wind,
  },
  {
    number: "02",
    title: "Improves Water, Air, and Soil Quality",
    description: "Diverting waste for biogas production reduces contamination, helping improve local water and soil quality while contributing to better air purity.",
    icon: Droplets,
  },
  {
    number: "03",
    title: "Generates Free, Sustainable Energy",
    description: "Transform kitchen waste, cattle dung, and other organic materials into free energy.",
    icon: Zap,
  },
  {
    number: "04",
    title: "Creates Organic Fertilizer",
    description: "Biogas production yields nutrient-rich organic fertilizer as a byproduct, promoting healthier soil and boosting agricultural productivity.",
    icon: Sprout,
  },
  {
    number: "05",
    title: "Empowers Local Communities",
    description: "Biogas systems provide a localized energy source that fosters self-sufficiency in rural areas, supports community resilience, and helps households to save money.",
    icon: UsersRound,
  },
];

function AboutAction({ children, href, onClick, variant = "light", external = false }) {
  const className = `about-action about-action--${variant}`;
  const content = (
    <>
      <span>{children}</span>
      <span className="about-action__icon" aria-hidden="true">
        <ArrowRight size={17} strokeWidth={1.8} />
      </span>
    </>
  );

  if (onClick) {
    return (
      <button className={className} type="button" onClick={onClick}>
        {content}
      </button>
    );
  }

  return (
    <a
      className={className}
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {content}
    </a>
  );
}

export default function About({ onNavigate }) {
  const discoverStory = () => {
    document.getElementById("about-story")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <div className="about-page">
      <section className="about-hero" aria-labelledby="about-hero-title">
        <div className="about-hero__image" role="img" aria-label="HomeBiogas branded flexible digester installed in a garden" />
        <div className="about-hero__grain" aria-hidden="true" />
        <div className="about-hero__content">
          <AnimatedText as="span" variant="underline" className="about-eyebrow about-eyebrow--light">
            About Us
          </AnimatedText>
          <AnimatedText
            as="h1"
            id="about-hero-title"
            variant="word"
            className="about-display about-hero__title"
            delay={80}
            stagger={95}
            highlightWords={["Clean", "Energy."]}
          >
            Synergy Organization
          </AnimatedText>
          <AnimatedText as="p" variant="fade" delay={360} className="about-hero__description">
            Improving the lives of rural communities through sustainable energy solutions.
          </AnimatedText>
          <AnimatedText as="div" variant="fade" delay={500} className="about-hero__actions">
            <AboutAction href="#about-story" onClick={discoverStory}>Discover Our Story</AboutAction>
            <AboutAction onClick={() => onNavigate("contact")}>Contact the Team</AboutAction>
          </AnimatedText>
        </div>
        <a
          className="about-scroll-cue"
          href="#about-story"
          onClick={(event) => {
            event.preventDefault();
            discoverStory();
          }}
        >
          <span>Scroll to discover</span>
          <ArrowDown size={16} aria-hidden="true" />
        </a>
        <span className="about-hero__index" aria-hidden="true">01 / OUR STORY</span>
      </section>

      <section className="about-story about-section" id="about-story" aria-labelledby="about-story-title">
        <div className="about-story__visual">
          <div className="about-image-frame about-image-frame--story">
            <img
              src="/WhatsApp%20Image%202026-11-08%20at%203.21.40%20PM.jpeg"
              alt="A woman carrying a bundle of gathered firewood outdoors"
              loading="lazy"
            />
          </div>
          <div className="about-story__image-note">
            <span className="about-story__note-mark" aria-hidden="true" />
            <span>Rooted in rural life</span>
          </div>
          <span className="about-story__year" aria-hidden="true">1990</span>
        </div>
        <div className="about-story__copy">
          <AnimatedText as="span" variant="underline" className="about-eyebrow">About Us</AnimatedText>
          <AnimatedText as="h2" id="about-story-title" variant="line" className="about-heading">
            Synergy Organization
          </AnimatedText>
          <AnimatedText as="p" variant="fade" delay={100} className="about-lead">
            Synergy Organization was established in <strong>2010</strong> by Mr. Nandkumar Patil, a visionary dedicated to improving the lives of rural communities through sustainable energy solutions. With a deep understanding of rural challenges, Mr. Patil began his work in <strong>1990</strong>, driven by the belief that natural resources could help rural populations lead better, more prosperous lives.
          </AnimatedText>
          <div className="about-story__signature">
            <span className="about-story__signature-line" aria-hidden="true" />
            <span>Mr. Nandkumar Patil <small>Founder, Synergy Organization</small></span>
          </div>
        </div>
      </section>

      <section className="about-team about-section" id="about-team" aria-labelledby="about-team-title">
        <div className="about-team__copy">
          <AnimatedText as="span" variant="underline" className="about-eyebrow">Our team</AnimatedText>
          <AnimatedText as="h2" id="about-team-title" variant="line" className="about-heading">
            Our Team &amp; Community
          </AnimatedText>
          <AnimatedText as="h3" variant="fade" delay={80} className="about-team__name">
            Mr. Nandkumar Patil
          </AnimatedText>
          <AnimatedText as="p" variant="fade" delay={120} className="about-team__designation">
            Founder, Synergy Organization
          </AnimatedText>
          <AnimatedText as="p" variant="fade" delay={180} className="about-team__bio">
            Mr. Nandkumar Patil is a visionary leader dedicated to improving the lives of rural communities through sustainable energy solutions. Since beginning his grassroots work in 1990 and establishing Synergy Organization in 2010, he has been driven by the belief that natural resources can empower rural populations to lead cleaner, healthier, and more prosperous lives.
          </AnimatedText>
        </div>
        <AnimatedText as="div" variant="fade" delay={160} className="about-team__portrait" role="img" aria-label="Founder portrait placeholder for Mr. Nandkumar Patil">
          <div className="about-team__portrait-art" aria-hidden="true">
            <UserRound size={118} strokeWidth={0.8} />
          </div>
          <div className="about-team__portrait-caption">
            <span>Founder portrait</span>
            <strong>Mr. Nandkumar Patil</strong>
          </div>
          <span className="about-team__badge">Rooted in rural life</span>
        </AnimatedText>
      </section>

      <section className="about-support about-section about-support--training" aria-labelledby="about-training-title">
        <AnimatedText as="div" variant="fade" className="about-support__icon" aria-hidden="true">
          <Sprout size={34} strokeWidth={1.4} />
        </AnimatedText>
        <div className="about-support__copy">
          <AnimatedText as="span" variant="underline" className="about-eyebrow">Training Teams to</AnimatedText>
          <AnimatedText as="h2" id="about-training-title" variant="line" className="about-heading">
            Training and Support for Sustainable Use
          </AnimatedText>
          <AnimatedText as="p" variant="fade" delay={100}>
            We equip beneficiaries with skills to operate and maintain their biogas stoves and plants efficiently. Our training covers everything from pipe fittings to daily maintenance practices, empowering villagers to sustain and maximize the benefits of their new energy resources.
          </AnimatedText>
        </div>
      </section>

      <section className="about-support about-section about-support--monitoring" aria-labelledby="about-monitoring-title">
        <AnimatedText as="div" variant="fade" className="about-support__icon" aria-hidden="true">
          <Wind size={34} strokeWidth={1.4} />
        </AnimatedText>
        <div className="about-support__copy">
          <AnimatedText as="span" variant="underline" className="about-eyebrow">Ongoing support</AnimatedText>
          <AnimatedText as="h2" id="about-monitoring-title" variant="line" className="about-heading">
            Monitoring and Ongoing Support
          </AnimatedText>
          <AnimatedText as="p" variant="fade" delay={100}>
            Our commitment doesn't end with installation. We provide continuous monitoring and support to ensure each biogas plant operates smoothly and efficiently. Regular check-ups, troubleshooting, and periodic maintenance assessments are conducted by our team to help address any technical issues and keep the plants in optimal condition. This ongoing support fosters confidence among beneficiaries and reinforces long-term sustainability.
          </AnimatedText>
        </div>
      </section>

      <section className="about-purpose about-section" id="about-vision" aria-labelledby="about-purpose-title">
        <div className="about-purpose__visual">
          <div className="about-image-frame about-image-frame--purpose">
            <img
              src="/WhatsApp%20Image%202026-11-08%20at%203.21.33%20PM.jpeg"
              alt="HomeBiogas branded flexible digester installed in a garden"
              loading="lazy"
            />
          </div>
          <div className="about-purpose__stamp" aria-hidden="true">
            <Sprout size={24} strokeWidth={1.35} />
            <span>Nature into energy</span>
          </div>
        </div>
        <div className="about-purpose__copy">
          <AnimatedText as="span" variant="underline" className="about-eyebrow">Our Purpose</AnimatedText>
          <AnimatedText as="h2" id="about-purpose-title" variant="line" className="about-heading">
            Vision &amp; Mission
          </AnimatedText>
          <span className="about-purpose__label">Our vision</span>
          <AnimatedText as="blockquote" variant="blur" delay={100} className="about-purpose__vision">
            To promote non-conventional energy and environmental awareness in every rural household. To make every house smoke-free. Also supports women empowerment and skill development programmes.
          </AnimatedText>
          <div className="about-purpose__divider" />
          <span className="about-purpose__label" id="about-values">Our mission</span>
          <AnimatedText as="p" variant="fade" delay={160} className="about-purpose__vision">
            To set up a biogas plant in every household of Rural Karnataka &amp; Maharashtra using the everyday cattle dung and wet waste from households. Promotion of organic farming in rural areas by using the slurry/residuals obtained from biogas plants.
          </AnimatedText>
        </div>

        {/* 4 Programme Cards inside Existing Vision & Mission Section */}
        <div className="about-purpose__programmes">
          <div className="about-purpose__programmes-heading">
            <span className="about-purpose__label">Core Programmes</span>
            <AnimatedText as="h3" variant="line" className="about-purpose__programmes-title">
              Our Pillars of Rural Action
            </AnimatedText>
          </div>
          <div className="about-purpose__programmes-grid">
            {visionMissionProgrammes.map(({ id, title, badge, description, image, page, icon: Icon }, index) => (
              <AnimatedText
                as="article"
                variant="fade"
                delay={index * 60}
                className="about-purpose__programme-card"
                key={id}
              >
                <div className="about-purpose__programme-media">
                  <img src={image} alt={title} loading="lazy" />
                  <span className="about-purpose__programme-tag">{badge}</span>
                </div>
                <div className="about-purpose__programme-content">
                  <div className="about-purpose__programme-icon-title">
                    <Icon size={17} strokeWidth={1.8} aria-hidden="true" />
                    <h4>{title}</h4>
                  </div>
                  <p>{description}</p>
                  {typeof onNavigate === "function" && (
                    <button
                      type="button"
                      className="about-purpose__programme-btn"
                      onClick={() => onNavigate(page)}
                    >
                      <span>Learn more</span>
                      <ArrowRight size={13} aria-hidden="true" />
                    </button>
                  )}
                </div>
              </AnimatedText>
            ))}
          </div>
        </div>
      </section>

      <section className="about-environment about-section" aria-labelledby="about-environment-title">
        <header className="about-environment__header">
          <AnimatedText as="h2" id="about-environment-title" variant="word" className="about-heading">
            Our Environmental Focus
          </AnimatedText>
          <AnimatedText as="p" variant="fade" delay={90}>
            We are committed to sustainability, innovation, and community empowerment.
          </AnimatedText>
        </header>
        <div className="about-environment__grid">
          {environmentalFocus.map(({ number, title, description, icon: Icon }, index) => (
            <AnimatedText as="article" variant="fade" delay={index * 80} className="about-environment__card" key={number}>
              <div className="about-environment__meta"><span>{number}</span><Icon size={23} strokeWidth={1.6} aria-hidden="true" /></div>
              <h3>{title}</h3>
              <p>{description}</p>
            </AnimatedText>
          ))}
        </div>
        <AnimatedText as="p" variant="fade" delay={180} className="about-conservation">
          A partnership approach to sustainable conservation
        </AnimatedText>
      </section>

      <section className="about-change about-section" aria-labelledby="about-change-title">
        <header className="about-change__header">
          <AnimatedText as="h2" id="about-change-title" variant="word" className="about-heading">
            Choose us for impactful change in global communities
          </AnimatedText>
        </header>
        <div className="about-change__grid">
          {impactfulChange.map(({ number, title, description, icon: Icon }, index) => (
            <AnimatedText as="article" variant="fade" delay={index * 70} className="about-change__card" key={number}>
              <div className="about-change__meta"><span>{number}</span><Icon size={22} strokeWidth={1.6} aria-hidden="true" /></div>
              <h3>{title}</h3>
              {description && <p>{description}</p>}
            </AnimatedText>
          ))}
        </div>
      </section>

      <section className="about-cta about-section" aria-labelledby="about-cta-title">
        <div className="about-cta__image" role="img" aria-label="Rural community landscape" />
        <div className="about-cta__content">
          <AnimatedText as="span" variant="underline" className="about-eyebrow about-eyebrow--light">Get Involved</AnimatedText>
          <AnimatedText as="h2" id="about-cta-title" variant="word" className="about-heading about-heading--light">
            Join Thousands of Others Across the Country
          </AnimatedText>
          <AnimatedText as="p" variant="fade" delay={120}>
          Giving your time means helping to give those most vulnerable a chance at the future they deserve.
          </AnimatedText>
          <div className="about-cta__actions">
            <AboutAction variant="gold" onClick={() => onNavigate("donate")}>
              Donate Now
            </AboutAction>
            <AboutAction variant="outline" onClick={() => onNavigate("programmes")}>
              Explore Our Initiatives
            </AboutAction>
          </div>
        </div>
        <span className="about-cta__leaf about-cta__leaf--one" aria-hidden="true"><Leaf /></span>
        <span className="about-cta__leaf about-cta__leaf--two" aria-hidden="true"><Sprout /></span>
      </section>
    </div>
  );
}
