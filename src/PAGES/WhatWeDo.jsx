import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Flame,
  HandHeart,
  HeartPulse,
  Lightbulb,
  Sprout,
  UsersRound,
} from "lucide-react";
import AnimatedText from "../COMPONENT/AnimatedText.jsx";
import "./WhatWeDo.css";

const focusAreas = [
  {
    number: "01",
    key: "initiative-biogas-clean-energy",
    title: "Biogas & Clean Energy",
    heading: "Turning Natural Resources Into Clean Energy.",
    description: "Promoting non-conventional energy awareness and sustainable energy solutions that can support rural households and communities.",
    image: "/WhatsApp%20Image%202026-11-08%20at%203.21.33%20PM.jpeg",
    alt: "HomeBiogas branded flexible digester installed in a garden",
    imageNote: "Biogas installation / supplied photograph",
    icon: Flame,
    tone: "energy",
  },
  {
    number: "02",
    key: "initiative-smoke-free-homes",
    title: "Smoke-Free Homes",
    heading: "Working Towards Healthier, Smoke-Free Homes.",
    description: "Encouraging cleaner household energy and greater awareness of healthier cooking environments for rural families.",
    image: "/WhatsApp%20Image%202026-11-08%20at%203.21.32%20PM.jpeg",
    alt: "Two lit gas burners on a kitchen stove, with an LPG cylinder visible at right",
    imageNote: "Supplied kitchen photograph; LPG stove, not biogas",
    icon: HeartPulse,
    tone: "homes",
  },
  {
    number: "03",
    key: "initiative-women-empowerment",
    title: "Women Empowerment",
    heading: "Supporting Women. Strengthening Communities.",
    description: "Supporting women's empowerment as part of a more inclusive and sustainable rural future.",
    image: "/WhatsApp%20Image%202026-11-08%20at%203.21.40%20PM.jpeg",
    alt: "A woman carrying a bundle of gathered firewood outdoors",
    imageNote: "Rural context / supplied photograph",
    icon: HandHeart,
    tone: "women",
  },
  {
    number: "04",
    key: "initiative-skill-development",
    title: "Skill Development",
    heading: "Encouraging Skills and New Opportunities.",
    description: "Supporting skill development programmes that encourage learning, confidence and community growth.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=85",
    alt: "Illustrative collaborative learning environment",
    imageNote: "Illustrative image / not a Synergy programme record",
    icon: UsersRound,
    tone: "skills",
  },
];

const approachSteps = [
  {
    number: "01",
    title: "Awareness",
    description: "Encourage environmental awareness and understanding of non-conventional energy.",
    icon: Lightbulb,
  },
  {
    number: "02",
    title: "Education",
    description: "Communicate the importance of sustainable energy and responsible resource use.",
    icon: Sprout,
  },
  {
    number: "03",
    title: "Empowerment",
    description: "Support women's empowerment and skill development as part of rural community development.",
    icon: HandHeart,
  },
  {
    number: "04",
    title: "Sustainable living",
    description: "Promote the vision of cleaner, healthier and more sustainable rural households.",
    icon: HeartPulse,
  },
];

const widerFocus = [
  {
    number: "A",
    title: "Cleaner Energy",
    description: "Renewable and non-conventional energy options can contribute to sustainable energy choices when suitable to local needs.",
    icon: Sprout,
  },
  {
    number: "B",
    title: "Healthier Homes",
    description: "Cleaner cooking environments and awareness of indoor air quality are important considerations for household well-being.",
    icon: HeartPulse,
  },
  {
    number: "C",
    title: "Empowered Communities",
    description: "Women's participation and empowerment are important parts of inclusive rural development.",
    icon: UsersRound,
  },
  {
    number: "D",
    title: "Knowledge and Skills",
    description: "Learning and skill development can help people explore opportunities and contribute to community growth.",
    icon: Lightbulb,
  },
];

const galleryImages = [
  {
    src: "/WhatsApp%20Image%202026-11-08%20at%203.21.33%20PM.jpeg",
    alt: "HomeBiogas branded flexible digester installed in a garden",
    caption: "Biogas & clean energy",
    note: "Supplied photograph",
    layout: "plant",
  },
  {
    src: "/WhatsApp%20Image%202026-11-08%20at%203.21.40%20PM.jpeg",
    alt: "A woman carrying a bundle of gathered firewood outdoors",
    caption: "Rural communities",
    note: "Supplied photograph",
    layout: "rural",
  },
  {
    src: "/WhatsApp%20Image%202026-11-08%20at%203.21.32%20PM.jpeg",
    alt: "Two lit gas burners on a kitchen stove, with an LPG cylinder visible at right",
    caption: "Household cooking",
    note: "Supplied kitchen photograph; LPG stove, not biogas",
    layout: "cooking",
  },
  {
    src: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=85",
    alt: "Illustrative image of a green natural landscape",
    caption: "Environmental awareness",
    note: "Illustrative image",
    layout: "environment",
  },
  {
    src: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1000&q=85",
    alt: "Illustrative portrait representing women's participation",
    caption: "Women & participation",
    note: "Illustrative image",
    layout: "women",
  },
  {
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=85",
    alt: "Illustrative collaborative learning environment",
    caption: "Learning & skills",
    note: "Illustrative image",
    layout: "learning",
  },
];

function WorkLink({ children, onClick, href, variant = "text" }) {
  if (href) {
    return (
      <a className={`what-work-link what-work-link--${variant}`} href={href} target="_blank" rel="noreferrer">
        <span>{children}</span><ArrowUpRight size={16} aria-hidden="true" />
      </a>
    );
  }

  return (
    <button className={`what-work-link what-work-link--${variant}`} type="button" onClick={onClick}>
      <span>{children}</span><ArrowRight size={16} aria-hidden="true" />
    </button>
  );
}

function WorkHero({ onNavigate }) {
  const scrollToFocus = () => {
    document.getElementById("what-we-do-focus")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };

  return (
    <section className="what-hero" aria-labelledby="what-hero-title">
      <div className="what-hero__image" role="img" aria-label="HomeBiogas branded flexible digester installed in a garden" />
      <div className="what-hero__content">
        <AnimatedText as="span" variant="underline" className="what-eyebrow what-eyebrow--light">Our Work</AnimatedText>
        <AnimatedText
          as="h1"
          id="what-hero-title"
          variant="word"
          stagger={70}
          highlightWords={["Community", "Time."]}
          className="what-hero__title"
        >
          Creating Sustainable Change, One Community at a Time.
        </AnimatedText>
        <AnimatedText as="p" variant="fade" delay={130} className="what-hero__summary">
          Synergy Organization works towards improving rural communities through sustainable energy solutions, environmental awareness, women's empowerment and skill development.
        </AnimatedText>
        <div className="what-hero__actions">
          <WorkLink variant="solid" onClick={scrollToFocus}>Explore Our Work</WorkLink>
          <WorkLink variant="outline" onClick={() => onNavigate("contact")}>Support Our Mission</WorkLink>
        </div>
      </div>
      <button className="what-hero__scroll" type="button" onClick={scrollToFocus} aria-label="Scroll to explore our work">
        <span>Scroll to explore</span><ArrowDown size={15} aria-hidden="true" />
      </button>
      <span className="what-hero__index" aria-hidden="true">RURAL DEVELOPMENT / CLEAN ENERGY</span>
      <span className="what-hero__orb what-hero__orb--one" aria-hidden="true" />
      <span className="what-hero__orb what-hero__orb--two" aria-hidden="true" />
      <span className="what-hero__corner" aria-hidden="true">01 — 04</span>
    </section>
  );
}

function WorkIntroduction() {
  return (
    <section className="what-intro what-section" aria-labelledby="what-intro-title">
      <div className="what-intro__visual">
        <div className="what-intro__frame">
          <img
            src="/WhatsApp%20Image%202026-11-08%20at%203.21.40%20PM.jpeg"
            alt="A woman carrying a bundle of gathered firewood outdoors"
            loading="lazy"
          />
        </div>
        <span className="what-intro__year" aria-hidden="true">1990</span>
        <span className="what-intro__caption">A journey rooted in rural communities</span>
      </div>
      <div className="what-intro__copy">
        <AnimatedText as="span" variant="underline" className="what-eyebrow">What We Do</AnimatedText>
        <AnimatedText as="h2" id="what-intro-title" variant="line" className="what-heading">
          Working Towards a Greener, Healthier and Stronger Rural Future.
        </AnimatedText>
        <AnimatedText as="p" variant="fade" delay={100} className="what-copy what-copy--lead">
          At Synergy Organization, our focus is on encouraging sustainable energy, environmental awareness and opportunities for rural communities.
        </AnimatedText>
        <AnimatedText as="p" variant="fade" delay={170} className="what-copy">
          We believe that responsible use of natural resources, community awareness and skill development can contribute to a more sustainable future, while keeping source-date details transparent where verification is pending.
        </AnimatedText>
        <div className="what-intro__signature">
          <span aria-hidden="true" />
          <p>Work began in 1990<small>Synergy Organization was established in 2010</small></p>
        </div>
      </div>
    </section>
  );
}

function FocusAreas({ onNavigate }) {
  return (
    <section className="what-focus what-section" id="what-we-do-focus" aria-labelledby="what-focus-title">
      <div className="what-focus__header">
        <div>
          <AnimatedText as="span" variant="underline" className="what-eyebrow">Our Focus Areas</AnimatedText>
          <AnimatedText as="h2" id="what-focus-title" variant="word" className="what-heading">
            Four Areas. One Shared Purpose.
          </AnimatedText>
        </div>
        <p>Explore the areas that shape Synergy Organization's stated vision for rural communities.</p>
      </div>
      <div className="what-focus__list">
        {focusAreas.map((area) => {
          const Icon = area.icon;
          return (
            <article className={`what-focus__item what-focus__item--${area.tone}`} key={area.number}>
              <div className="what-focus__visual">
                <div className="what-focus__image">
                  <img src={area.image} alt={area.alt} loading="lazy" />
                </div>
                <span className="what-focus__image-note">{area.imageNote}</span>
              </div>
              <div className="what-focus__copy">
                <div className="what-focus__meta">
                  <span>{area.number} / 04</span>
                  <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <span className="what-focus__title">{area.title}</span>
                <h3>{area.heading}</h3>
                <p>{area.description}</p>
                <WorkLink onClick={() => onNavigate(area.key)}>Explore {area.title}</WorkLink>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Approach() {
  return (
    <section className="what-approach what-section" aria-labelledby="what-approach-title">
      <div className="what-approach__header">
        <AnimatedText as="span" variant="underline" className="what-eyebrow what-eyebrow--light">Our Approach</AnimatedText>
        <AnimatedText as="h2" id="what-approach-title" variant="word" className="what-heading what-heading--light">
          Real Change Begins With Awareness and Action.
        </AnimatedText>
        <p>This describes the organization's intended approach, not a verified chronological programme process.</p>
      </div>
      <ol className="what-approach__steps">
        {approachSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <li className="what-approach__step" key={step.number}>
              <span className="what-approach__number">{step.number}</span>
              <span className="what-approach__icon"><Icon size={21} strokeWidth={1.5} aria-hidden="true" /></span>
              <AnimatedText as="h3" variant="line" delay={index * 70}>{step.title}</AnimatedText>
              <AnimatedText as="p" variant="fade" delay={index * 70 + 90}>{step.description}</AnimatedText>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function WiderPurpose() {
  return (
    <section className="what-purpose what-section" aria-labelledby="what-purpose-title">
      <div className="what-purpose__header">
        <AnimatedText as="span" variant="underline" className="what-eyebrow">A Shared Future</AnimatedText>
        <AnimatedText as="h2" id="what-purpose-title" variant="word" className="what-heading">
          Building a Better Future Through Sustainable Choices.
        </AnimatedText>
      </div>
      <div className="what-purpose__grid">
        {widerFocus.map((item, index) => {
          const Icon = item.icon;
          return (
            <article className="what-purpose__item" key={item.number}>
              <span className="what-purpose__number">{item.number}</span>
              <span className="what-purpose__icon"><Icon size={21} strokeWidth={1.5} aria-hidden="true" /></span>
              <AnimatedText as="h3" variant="line" delay={index * 70}>{item.title}</AnimatedText>
              <AnimatedText as="p" variant="fade" delay={index * 70 + 90}>{item.description}</AnimatedText>
            </article>
          );
        })}
      </div>
      <p className="what-purpose__note">These are general areas of potential benefit, not claims that specific outcomes have already been achieved by Synergy Organization.</p>
    </section>
  );
}

function Contribution() {
  const statistics = [
    { value: "TBD", label: "Source figures under review", icon: HandHeart },
    { value: "TBD", label: "Operational reach to confirm", icon: UsersRound },
    { value: "TBD", label: "Outcomes pending validation", icon: Sprout },
  ];

  return (
    <section className="what-impact what-section" aria-labelledby="what-impact-title">
      <div className="what-impact__intro">
        <AnimatedText as="span" variant="underline" className="what-eyebrow what-eyebrow--light">Our Contribution</AnimatedText>
        <AnimatedText as="h2" id="what-impact-title" variant="line" className="what-heading what-heading--light">
          Every Effort Creates a Lasting Difference.
        </AnimatedText>
      </div>
      <div className="what-impact__stats">
        {statistics.map((stat) => {
          const Icon = stat.icon;
          return (
            <div className="what-impact__stat" key={stat.label}>
              <Icon size={21} strokeWidth={1.4} aria-hidden="true" />
              <span className="what-impact__number">{stat.value}</span>
              <span>{stat.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function PurposeGallery() {
  return (
    <section className="what-gallery what-section" aria-labelledby="what-gallery-title">
      <div className="what-gallery__header">
        <AnimatedText as="span" variant="underline" className="what-eyebrow">A Visual Perspective</AnimatedText>
        <AnimatedText as="h2" id="what-gallery-title" variant="word" className="what-heading">
          See the Purpose Behind Our Work.
        </AnimatedText>
      </div>
      <div className="what-gallery__grid">
        {galleryImages.map((image, index) => (
          <figure className={`what-gallery__item what-gallery__item--${image.layout}`} key={image.layout}>
            <img src={image.src} alt={image.alt} loading="lazy" />
            <figcaption>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span>{image.caption}<small>{image.note}</small></span>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="what-gallery__disclaimer">
        Supplied photographs show a HomeBiogas branded digester, a kitchen gas stove and a woman carrying firewood. They are not independently verified as records of Synergy Organization programmes or beneficiaries; other images are illustrative.
      </p>
    </section>
  );
}

function WorkCTA({ onNavigate }) {
  return (
    <section className="what-cta what-section" aria-labelledby="what-cta-title">
      <div className="what-cta__image" role="img" aria-label="HomeBiogas branded flexible digester installed in a garden" />
      <div className="what-cta__content">
        <AnimatedText as="span" variant="underline" className="what-eyebrow what-eyebrow--light">Be Part of the Change</AnimatedText>
        <AnimatedText as="h2" id="what-cta-title" variant="word" className="what-heading what-heading--light">
          Together, We Can Create a More Sustainable Tomorrow.
        </AnimatedText>
        <p>Your support can help encourage sustainable energy, environmental awareness and opportunities for rural communities.</p>
        <div className="what-cta__actions">
          <WorkLink variant="gold" onClick={() => onNavigate("contact")}>Contact the Team</WorkLink>
          <a className="what-work-link what-work-link--outline" href="#what-we-do-focus" onClick={(event) => {
            event.preventDefault();
            document.getElementById("what-we-do-focus")?.scrollIntoView({
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
            });
          }}>
            <span>Explore Our Initiatives</span><ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default function WhatWeDo({ onNavigate }) {
  return (
    <div className="what-page">
      <WorkHero onNavigate={onNavigate} />
      <WorkIntroduction />
      <FocusAreas onNavigate={onNavigate} />
      <Approach />
      <WiderPurpose />
      <Contribution />
      <PurposeGallery />
      <WorkCTA onNavigate={onNavigate} />
    </div>
  );
}
