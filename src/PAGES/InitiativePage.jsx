import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Flame,
  HandHeart,
  HeartPulse,
  House,
  Leaf,
  Lightbulb,
  Recycle,
  ShieldCheck,
  Sprout,
  UsersRound,
} from "lucide-react";
import AnimatedText from "../COMPONENT/AnimatedText.jsx";
import "./InitiativePage.css";

const icons = {
  book: BookOpen,
  flame: Flame,
  heart: HeartPulse,
  house: House,
  leaf: Leaf,
  light: Lightbulb,
  recycle: Recycle,
  shield: ShieldCheck,
  sprout: Sprout,
  people: UsersRound,
  hand: HandHeart,
};

function PageLink({ children, onClick, variant = "primary" }) {
  const Icon = variant === "light" ? ArrowUpRight : ArrowRight;
  return (
    <button className={`initiative-action initiative-action--${variant}`} type="button" onClick={onClick}>
      <span>{children}</span>
      <Icon size={17} aria-hidden="true" />
    </button>
  );
}

function InitiativeHero({ page }) {
  return (
    <section className={`initiative-hero initiative-hero--${page.key}`} aria-labelledby={`${page.key}-title`}>
      <div
        className="initiative-hero__photo"
        role="img"
        aria-label={page.heroAlt}
        style={{ "--initiative-hero-image": `url("${page.heroImage}")` }}
      />
      <div className="initiative-hero__shade" />
      <div className="initiative-hero__content">
        <AnimatedText as="span" variant="underline" className="initiative-eyebrow initiative-eyebrow--light">
          Synergy Organization <span aria-hidden="true">/</span> {page.title}
        </AnimatedText>
        <AnimatedText
          as="h1"
          id={`${page.key}-title`}
          variant="word"
          stagger={70}
          highlightWords={page.highlightWords}
          className="initiative-hero__title"
        >
          {page.headline}
        </AnimatedText>
        <AnimatedText as="p" variant="fade" delay={140} className="initiative-hero__summary">
          {page.summary}
        </AnimatedText>
        <div className="initiative-hero__actions">
          <PageLink onClick={() => document.getElementById(`${page.key}-purpose`)?.scrollIntoView({
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
          })}>
            Explore Our Purpose
          </PageLink>
          <a className="initiative-hero__scroll" href={`#${page.key}-purpose`}>
            <span>Discover the initiative</span><ArrowDown size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
      <span className="initiative-hero__index" aria-hidden="true">{page.index} / 04</span>
    </section>
  );
}

function PageIntro({ page }) {
  return (
    <section className="initiative-intro initiative-section" id={`${page.key}-purpose`}>
      <div className="initiative-intro__copy">
        <AnimatedText as="span" variant="underline" className="initiative-eyebrow">{page.intro.eyebrow}</AnimatedText>
        <AnimatedText as="h2" variant="line" className="initiative-heading">{page.intro.heading}</AnimatedText>
        {page.intro.paragraphs.map((paragraph, index) => (
          <AnimatedText as="p" variant="fade" delay={index * 80 + 80} className="initiative-copy" key={paragraph}>
            {paragraph}
          </AnimatedText>
        ))}
      </div>
      <div className="initiative-intro__visual">
        <img src={page.intro.image} alt={page.intro.imageAlt} loading="lazy" />
        <span className="initiative-intro__image-label">{page.intro.imageLabel}</span>
      </div>
    </section>
  );
}

function BenefitGrid({ page }) {
  return (
    <section className="initiative-benefits initiative-section" aria-labelledby={`${page.key}-benefits`}>
      <div className="initiative-section__header">
        <AnimatedText as="span" variant="underline" className="initiative-eyebrow">{page.benefits.eyebrow}</AnimatedText>
        <AnimatedText as="h2" id={`${page.key}-benefits`} variant="word" className="initiative-heading">
          {page.benefits.heading}
        </AnimatedText>
        <AnimatedText as="p" variant="fade" delay={90} className="initiative-copy">{page.benefits.intro}</AnimatedText>
      </div>
      <div className="initiative-benefit-grid">
        {page.benefits.items.map((item, index) => {
          const Icon = icons[item.icon];
          return (
            <article className="initiative-benefit" key={item.title}>
              <span className="initiative-benefit__number">0{index + 1}</span>
              <span className="initiative-benefit__icon"><Icon size={21} strokeWidth={1.6} aria-hidden="true" /></span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          );
        })}
      </div>
      {page.benefits.note && <p className="initiative-note">{page.benefits.note}</p>}
    </section>
  );
}

function LearningLibrary({ page, onNavigate }) {
  if (!page.learningLinks) return null;

  return (
    <section className="initiative-learning-library initiative-section" aria-labelledby={`${page.key}-learning-title`}>
      <div className="initiative-learning-library__intro">
        <AnimatedText as="span" variant="underline" className="initiative-eyebrow">Explore the subject</AnimatedText>
        <AnimatedText as="h2" id={`${page.key}-learning-title`} variant="line" className="initiative-heading">
          A closer look at biogas.
        </AnimatedText>
        <p>Four short guides explore biogas fundamentals, the digestion process, possible applications and general considerations.</p>
      </div>
      <div className="initiative-learning-library__links">
        {page.learningLinks.map((item, index) => (
          <button type="button" key={item.page} onClick={() => onNavigate(item.page)}>
            <span className="initiative-learning-library__number">0{index + 1}</span>
            <span>{item.label}</span>
            <ArrowRight size={17} aria-hidden="true" />
          </button>
        ))}
      </div>
    </section>
  );
}

function ApplicationsSection({ page }) {
  if (!page.applications) return null;

  return (
    <section className="initiative-applications initiative-section" aria-labelledby={`${page.key}-applications-title`}>
      <div className="initiative-section__header">
        <AnimatedText as="span" variant="underline" className="initiative-eyebrow">{page.applications.eyebrow}</AnimatedText>
        <AnimatedText as="h2" id={`${page.key}-applications-title`} variant="word" className="initiative-heading">
          {page.applications.heading}
        </AnimatedText>
        <AnimatedText as="p" variant="fade" delay={90} className="initiative-copy">
          {page.applications.intro}
        </AnimatedText>
      </div>
      <div className="initiative-applications__grid">
        {page.applications.items.map((item, index) => {
          const Icon = icons[item.icon];
          return (
            <article className="initiative-application" key={item.title}>
              <span className="initiative-application__number">0{index + 1}</span>
              <span className="initiative-application__icon"><Icon size={20} strokeWidth={1.5} aria-hidden="true" /></span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ProcessSection({ page }) {
  return (
    <section className="initiative-process initiative-section" aria-labelledby={`${page.key}-process-title`}>
      <div className="initiative-section__header">
        <AnimatedText as="span" variant="underline" className="initiative-eyebrow initiative-eyebrow--light">A simple process</AnimatedText>
        <AnimatedText as="h2" id={`${page.key}-process-title`} variant="word" className="initiative-heading initiative-heading--light">
          From organic matter to useful energy.
        </AnimatedText>
        <AnimatedText as="p" variant="fade" delay={90} className="initiative-copy initiative-copy--light">
          A general overview of anaerobic digestion. Actual systems vary by design, feedstock and operating conditions.
        </AnimatedText>
      </div>
      <ol className="initiative-process__steps">
        {page.process.map((step, index) => {
          const Icon = icons[step.icon];
          return (
            <li className="initiative-process__step" key={step.title}>
              <span className="initiative-process__number">0{index + 1}</span>
              <span className="initiative-process__icon"><Icon size={21} strokeWidth={1.5} aria-hidden="true" /></span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function StorySection({ page }) {
  const Icon = icons[page.story.icon];
  return (
    <section className={`initiative-story initiative-section initiative-story--${page.key}`}>
      <div className="initiative-story__visual">
        <img src={page.story.image} alt={page.story.imageAlt} loading="lazy" />
        <span>{page.story.caption}</span>
      </div>
      <div className="initiative-story__copy">
        <AnimatedText as="span" variant="underline" className="initiative-eyebrow">{page.story.eyebrow}</AnimatedText>
        <AnimatedText as="h2" variant="line" className="initiative-heading">{page.story.heading}</AnimatedText>
        <AnimatedText as="p" variant="fade" delay={90} className="initiative-copy">{page.story.description}</AnimatedText>
        <blockquote>
          <Icon size={21} strokeWidth={1.6} aria-hidden="true" />
          <span>{page.story.quote}</span>
        </blockquote>
      </div>
    </section>
  );
}

function GallerySection({ page }) {
  return (
    <section className="initiative-gallery initiative-section" aria-labelledby={`${page.key}-gallery-title`}>
      <div className="initiative-section__header">
        <AnimatedText as="span" variant="underline" className="initiative-eyebrow">A closer look</AnimatedText>
        <AnimatedText as="h2" id={`${page.key}-gallery-title`} variant="word" className="initiative-heading">
          {page.gallery.heading}
        </AnimatedText>
        <p className="initiative-gallery__disclaimer">{page.gallery.disclaimer}</p>
      </div>
      <div className="initiative-gallery__grid">
        {page.gallery.images.map((image, index) => (
          <figure className={`initiative-gallery__image initiative-gallery__image--${index + 1}`} key={image.src}>
            <img src={image.src} alt={image.alt} loading="lazy" />
            <figcaption><span>0{index + 1}</span>{image.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function InitiativeCTA({ page, onNavigate }) {
  return (
    <section className={`initiative-cta initiative-cta--${page.key}`}>
      <div
        className="initiative-cta__image"
        role="img"
        aria-label={page.cta.imageAlt}
        style={{ "--initiative-cta-image": `url("${page.cta.image}")` }}
      />
      <div className="initiative-cta__content">
        <AnimatedText as="span" variant="underline" className="initiative-eyebrow initiative-eyebrow--light">Be part of the change</AnimatedText>
        <AnimatedText as="h2" variant="word" className="initiative-heading initiative-heading--light">{page.cta.heading}</AnimatedText>
        <p>{page.cta.description}</p>
        <div className="initiative-cta__actions">
          <PageLink onClick={() => onNavigate(page.cta.primaryPage)}>{page.cta.primary}</PageLink>
          <PageLink variant="light" onClick={() => onNavigate(page.cta.secondaryPage)}>{page.cta.secondary}</PageLink>
        </div>
      </div>
    </section>
  );
}

export default function InitiativePage({ page, onNavigate }) {
  return (
    <div className={`initiative-page initiative-page--${page.key}`}>
      <InitiativeHero page={page} onNavigate={onNavigate} />
      <PageIntro page={page} />
      {page.process && <ProcessSection page={page} />}
      <LearningLibrary page={page} onNavigate={onNavigate} />
      <ApplicationsSection page={page} />
      <BenefitGrid page={page} />
      <StorySection page={page} />
      {page.gallery && <GallerySection page={page} />}
      <InitiativeCTA page={page} onNavigate={onNavigate} />
    </div>
  );
}
