import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Flame,
  House,
  Leaf,
  Lightbulb,
  Recycle,
  ShieldCheck,
  Sprout,
  UsersRound,
} from "lucide-react";
import AnimatedText from "../COMPONENT/AnimatedText.jsx";
import { biogasLearningNavigation } from "./biogasLearningContent.js";
import "./BiogasLearningPage.css";

const icons = {
  flame: Flame,
  house: House,
  leaf: Leaf,
  light: Lightbulb,
  recycle: Recycle,
  shield: ShieldCheck,
  sprout: Sprout,
  people: UsersRound,
};

function LearningLink({ label, onClick, variant = "text" }) {
  return (
    <button className={`biogas-learning-link biogas-learning-link--${variant}`} type="button" onClick={onClick}>
      <span>{label}</span>
      <ArrowRight size={16} aria-hidden="true" />
    </button>
  );
}

function LearningHero({ page, onNavigate }) {
  return (
    <section className={`biogas-learning-hero biogas-learning-hero--${page.variant}`} aria-labelledby={`${page.key}-title`}>
      <div
        className="biogas-learning-hero__image"
        role="img"
        aria-label={page.heroAlt}
        style={{ "--biogas-learning-hero-image": `url("${page.heroImage}")` }}
      />
      <div className="biogas-learning-hero__content">
        <AnimatedText as="span" variant="underline" className="biogas-learning-eyebrow biogas-learning-eyebrow--light">
          Biogas & Clean Energy <span aria-hidden="true">/</span> {page.title}
        </AnimatedText>
        <AnimatedText
          as="h1"
          id={`${page.key}-title`}
          variant="word"
          stagger={70}
          highlightWords={page.highlightWords}
          className="biogas-learning-hero__title"
        >
          {page.headline}
        </AnimatedText>
        <AnimatedText as="p" variant="fade" delay={130} className="biogas-learning-hero__summary">
          {page.summary}
        </AnimatedText>
        <div className="biogas-learning-hero__actions">
          <a className="biogas-learning-action" href="#learning-intro">
            Explore the guide <ArrowDown size={16} aria-hidden="true" />
          </a>
          <LearningLink
            variant="outline"
            label="Biogas & Clean Energy"
            onClick={() => onNavigate("initiative-biogas-clean-energy")}
          />
        </div>
      </div>
      <span className="biogas-learning-hero__index" aria-hidden="true">{page.number} / 04</span>
    </section>
  );
}

function LearningIntro({ page }) {
  return (
    <section className={`biogas-learning-intro biogas-learning-section biogas-learning-intro--${page.variant}`} id="learning-intro">
      <div className="biogas-learning-intro__copy">
        <AnimatedText as="span" variant="underline" className="biogas-learning-eyebrow">{page.introLabel}</AnimatedText>
        <AnimatedText as="h2" variant="line" className="biogas-learning-heading">{page.introHeading}</AnimatedText>
        {page.introParagraphs.map((paragraph, index) => (
          <AnimatedText as="p" variant="fade" delay={index * 70 + 80} className="biogas-learning-copy" key={paragraph}>
            {paragraph}
          </AnimatedText>
        ))}
      </div>
      <figure className="biogas-learning-intro__visual">
        <img src={page.introImage} alt={page.introImageAlt} loading="lazy" />
        <figcaption>{page.introImageLabel}</figcaption>
      </figure>
    </section>
  );
}

function LearningStages({ page }) {
  if (!page.process) return null;

  return (
    <section className="biogas-learning-stages biogas-learning-section" aria-labelledby={`${page.key}-stages-title`}>
      <div className="biogas-learning-section__header">
        <AnimatedText as="span" variant="underline" className="biogas-learning-eyebrow biogas-learning-eyebrow--light">The process</AnimatedText>
        <AnimatedText as="h2" id={`${page.key}-stages-title`} variant="word" className="biogas-learning-heading biogas-learning-heading--light">
          Six stages. One connected system.
        </AnimatedText>
        <p>Specific designs, operating requirements and safety procedures vary by plant.</p>
      </div>
      <ol className="biogas-learning-stages__list">
        {page.process.map((stage, index) => (
          <li className="biogas-learning-stage" key={stage.title}>
            <span className="biogas-learning-stage__number">0{index + 1}</span>
            <h3>{stage.title}</h3>
            <p>{stage.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function LearningTopics({ page }) {
  return (
    <section className={`biogas-learning-topics biogas-learning-section biogas-learning-topics--${page.variant}`} aria-labelledby={`${page.key}-topics-title`}>
      <div className="biogas-learning-section__header">
        <AnimatedText as="span" variant="underline" className="biogas-learning-eyebrow">{page.sectionsHeading}</AnimatedText>
        <AnimatedText as="h2" id={`${page.key}-topics-title`} variant="word" className="biogas-learning-heading">
          {page.variant === "solutions" ? "Match the system to its intended use." : page.variant === "benefits" ? "Potential value, considered carefully." : "The ideas behind the process."}
        </AnimatedText>
      </div>
      <div className="biogas-learning-topics__grid">
        {page.sections.map((section, index) => {
          const Icon = icons[section.icon];
          return (
            <article className="biogas-learning-topic" key={section.title}>
              <span className="biogas-learning-topic__number">0{index + 1}</span>
              <span className="biogas-learning-topic__icon"><Icon size={20} strokeWidth={1.5} aria-hidden="true" /></span>
              <h3>{section.title}</h3>
              <p>{section.text}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function LearningFeature({ page }) {
  if (!page.featurePoints) return null;
  return (
    <section className="biogas-learning-feature biogas-learning-section">
      <div className="biogas-learning-feature__copy">
        <AnimatedText as="span" variant="underline" className="biogas-learning-eyebrow">{page.featureLabel}</AnimatedText>
        <AnimatedText as="h2" variant="line" className="biogas-learning-heading">{page.featureHeading}</AnimatedText>
        <ul>
          {page.featurePoints.map((point, index) => (
            <AnimatedText as="li" variant="fade" delay={index * 65} key={point}>
              <span>{String(index + 1).padStart(2, "0")}</span>{point}
            </AnimatedText>
          ))}
        </ul>
      </div>
      <div className="biogas-learning-feature__visual">
        <img src={page.closingImage} alt={page.closingImageAlt} loading="lazy" />
      </div>
    </section>
  );
}

function LearningQuote({ page }) {
  return (
    <section className="biogas-learning-quote biogas-learning-section">
      <span className="biogas-learning-quote__mark" aria-hidden="true">“</span>
      <AnimatedText as="blockquote" variant="blur">{page.quote}</AnimatedText>
      <p>{page.quoteBy}</p>
    </section>
  );
}

function LearningNavigation({ page, onNavigate }) {
  const links = biogasLearningNavigation.filter((item) => item.page !== page.page);
  return (
    <section className="biogas-learning-navigation biogas-learning-section" aria-labelledby={`${page.key}-navigation-title`}>
      <div className="biogas-learning-navigation__heading">
        <AnimatedText as="span" variant="underline" className="biogas-learning-eyebrow">Continue learning</AnimatedText>
        <AnimatedText as="h2" id={`${page.key}-navigation-title`} variant="line" className="biogas-learning-heading">
          More about biogas.
        </AnimatedText>
      </div>
      <div className="biogas-learning-navigation__links">
        {links.map((item, index) => (
          <button type="button" key={item.page} onClick={() => onNavigate(item.page)}>
            <span className="biogas-learning-navigation__number">0{index + 1}</span>
            <span>{item.label}</span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </button>
        ))}
      </div>
    </section>
  );
}

function LearningCTA({ page, onNavigate }) {
  return (
    <section
      className={`biogas-learning-cta biogas-learning-cta--${page.variant}`}
      style={{ "--biogas-learning-cta-image": `url("${page.closingImage}")` }}
    >
      <div className="biogas-learning-cta__content">
        <AnimatedText as="span" variant="underline" className="biogas-learning-eyebrow biogas-learning-eyebrow--light">Synergy Organization</AnimatedText>
        <AnimatedText as="h2" variant="word" className="biogas-learning-heading biogas-learning-heading--light">{page.closingHeading}</AnimatedText>
        <p>{page.closingText}</p>
        <LearningLink variant="primary" label={page.ctaLabel} onClick={() => onNavigate(page.ctaPage)} />
      </div>
    </section>
  );
}

export default function BiogasLearningPage({ page, onNavigate }) {
  return (
    <div className={`biogas-learning-page biogas-learning-page--${page.variant}`}>
      <LearningHero page={page} onNavigate={onNavigate} />
      <LearningIntro page={page} />
      <LearningStages page={page} />
      <LearningTopics page={page} />
      <LearningFeature page={page} />
      <LearningQuote page={page} />
      <LearningNavigation page={page} onNavigate={onNavigate} />
      <LearningCTA page={page} onNavigate={onNavigate} />
    </div>
  );
}
