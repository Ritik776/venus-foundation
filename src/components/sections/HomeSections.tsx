import { useRef } from "react";
import { Link } from "react-router-dom";
import { useLightbox } from "@/components/layout/LightboxContext";
import { Button } from "@/components/primitives/Button";
import { Chip } from "@/components/primitives/Chip";
import { Counter } from "@/components/primitives/Counter";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Icon } from "@/components/primitives/Icon";
import { InstantReveal } from "@/components/primitives/InstantReveal";
import { Reveal } from "@/components/primitives/Reveal";
import { SplitText } from "@/components/primitives/SplitText";
import { homeContent } from "@/content/home";
import { seedPreview } from "@/content/seeds";
import { useInView } from "@/hooks/useInView";
import { useDragScroll, useRailControls, useTilt } from "@/hooks/usePointerEffects";
import { useHeroSlides, useJourneyLine } from "@/hooks/useScrollScenes";
import { mergeRefs } from "@/lib/mergeRefs";
import { CtaGroup, RichText, SectionHeading } from "./Shared";

const c = homeContent;

export function ImmersiveHero() {
  const { immersiveHero: hero } = c;
  const { index, goTo } = useHeroSlides(hero.slides.length);

  return (
    <InstantReveal>
      <section className="hero-immersive">
        <div className="hi-bg">
          {hero.slides.map((slide, i) => (
            <img
              key={slide.src}
              className={`hi-slide${i === index ? " active" : ""}`}
              src={slide.src}
              alt={slide.alt}
              fetchPriority={i === 0 ? "high" : "low"}
            />
          ))}
        </div>
        <div className="hi-overlay" />
        <span className="hi-grain grain" />
        <div className="wrap hi-inner">
          <Reveal as="span" className="hi-eyebrow">
            {hero.eyebrow}
          </Reveal>
          <SplitText as="h1" className="hi-title" text={hero.title} />
          <Reveal as="p" delay={2} className="hi-sub">
            {hero.subtitle}
          </Reveal>
          <Reveal delay={3} className="hi-actions">
            <CtaGroup actions={hero.actions} />
          </Reveal>
          <Reveal delay={4} className="hi-stats">
            {hero.pills.map((pill) => (
              <div className="hi-pill" key={pill.label}>
                <b>{pill.value}</b>
                <span>{pill.label}</span>
              </div>
            ))}
          </Reveal>
        </div>
        <div className="hi-dots">
          {hero.slides.map((slide, i) => (
            <button
              type="button"
              key={slide.src}
              className={`hi-dot${i === index ? " active" : ""}`}
              aria-label={`Show slide ${i + 1}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
        <a href="#welcome" className="hi-scroll" aria-label="Scroll down">
          <span>Scroll</span>
          <span className="mouse" />
        </a>
      </section>
    </InstantReveal>
  );
}

export function WelcomeHero() {
  const { welcome: w } = c;
  return (
    <InstantReveal>
      <section className="hero grain" id="welcome">
        <div className="hero-bg" data-parallax="-0.12" />
        <div className="wrap hero-inner">
          <div className="hero-copy">
            <Eyebrow>{w.eyebrow}</Eyebrow>
            <SplitText as="h2" className="display hero-title" text={w.title} />
            <Reveal as="p" delay={2} className="lead hero-sub">
              <strong>Venus Foundation</strong> is shaping brighter futures — nurturing growth
              through education, nourishment and care, one act of kindness at a time.
            </Reveal>
            <Reveal delay={3} className="hero-actions">
              <CtaGroup actions={w.actions} />
            </Reveal>
            <Reveal delay={4} className="hero-trust">
              <div className="trust-avatars">
                {w.trust.avatars.map((src) => (
                  <img key={src} src={src} alt="" loading="lazy" />
                ))}
                <span className="trust-more">+</span>
              </div>
              <p>
                <strong>750+ students</strong> &amp; 20 women supported across Haryana
              </p>
            </Reveal>
          </div>

          <div className="hero-collage">
            <div className="hc-ring spin" aria-hidden="true" />
            {w.collage.images.map((image, i) => (
              <div
                className={`hc-img hc-${i + 1}`}
                key={image.src}
                data-parallax={[0.05, -0.07, 0.1][i]}
              >
                <img src={image.src} alt={image.alt} loading="lazy" />
              </div>
            ))}
            <div className="hero-badge float">
              <div className="hb-num">{w.collage.badgeNumber}</div>
              <div className="hb-label">{w.collage.badgeLabel}</div>
            </div>
            <div className="hero-leaf float" aria-hidden="true">
              🌱
            </div>
          </div>
        </div>
      </section>
    </InstantReveal>
  );
}

export function JourneySection() {
  const { journey: j } = c;
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  useJourneyLine(trackRef, fillRef);

  return (
    <section className="pad surface-cream journey">
      <div className="wrap journey-head center">
        <SectionHeading eyebrow={j.eyebrow} title={j.title} body={j.body} center />
      </div>
      <div className="journey-track wrap" ref={trackRef}>
        <div className="journey-line">
          <span className="journey-fill" ref={fillRef} />
        </div>
        {j.chapters.map((chapter) => (
          <Reveal className={`chapter${chapter.reversed ? " rev" : ""}`} key={chapter.no}>
            <div className="chapter-media img-mask in">
              <img src={chapter.image.src} alt={chapter.image.alt} loading="lazy" />
            </div>
            <div className="chapter-copy">
              <div className="chapter-no">{chapter.no}</div>
              <Chip tone={chapter.tone}>{chapter.tag}</Chip>
              <h3 className="h3">{chapter.title}</h3>
              <p>{chapter.body}</p>
            </div>
            <div className="chapter-node" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function StatsSection() {
  const { stats: s } = c;
  return (
    <section className="pad surface-deep grain stats-sec curve-top">
      <div className="wrap">
        <Reveal className="stats-top">
          <h2 className="h2">{s.title}</h2>
          <p className="mw-md">{s.body}</p>
        </Reveal>
        <div className="stats-grid">
          {s.items.map((stat, i) => (
            <Reveal className="stat" key={stat.label} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
              <div className={`stat-num ${stat.tone ?? ""}`}>
                <Counter to={stat.value} suffix={stat.suffix} />
              </div>
              <div className="stat-label">{stat.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function VideoShowcase() {
  const { video: v } = c;
  const { open } = useLightbox();
  return (
    <section className="pad surface-cream video-sec">
      <div className="wrap-wide">
        <div className="video-head wrap">
          <Eyebrow>{v.eyebrow}</Eyebrow>
          <SplitText as="h2" className="h1" text={v.title} />
        </div>
        <Reveal
          variant="clip"
          className="video-stage img-mask"
          onClick={() => open({ kind: "youtube", id: v.videoId })}
          role="button"
          tabIndex={0}
          aria-label="Play film"
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              open({ kind: "youtube", id: v.videoId });
            }
          }}
        >
          <img src={v.image.src} alt={v.image.alt} className="cover" loading="lazy" />
          <div className="video-overlay" />
          <button type="button" className="play-btn" aria-label="Play film">
            <span className="play-ring" />
            <Icon name="play" />
          </button>
          <div className="video-caption">
            <Chip tone="gold">{v.chip}</Chip>
            <h3 className="h3">{v.caption}</h3>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function PrinciplesSection() {
  const { principles: p } = c;
  return (
    <section className="pad surface-cream principles">
      <div className="wrap">
        <div className="prin-head">
          <Eyebrow>{p.head.eyebrow}</Eyebrow>
          <SplitText as="h2" className="h1" text={p.head.title} />
          <Reveal as="p" delay={2} className="lead">
            {p.head.body}
          </Reveal>
        </div>
        <div className="prin-grid">
          <Reveal variant="left" className="prin-col stand">
            <div className="prin-tag">
              <span className="dot green" />
              {p.stand.heading}
            </div>
            <ul className="prin-list">
              {p.stand.items.map((line) => (
                <li key={line.map((s) => s.text).join("")}>
                  <RichText line={line} />
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal variant="right" className="prin-col refuse">
            <div className="prin-tag refuse-tag">
              <span className="dot red" />
              {p.refuse.heading}
            </div>
            <ul className="prin-list">
              {p.refuse.items.map((line) => (
                <li key={line.map((s) => s.text).join("")}>
                  <RichText line={line} />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function SeedsPreviewRail() {
  const railRef = useDragScroll<HTMLDivElement>();
  const { atStart, atEnd, scrollPrev, scrollNext } = useRailControls(railRef);
  return (
    <section className="pad surface-navy grain seeds-prev curve-top curve-btm">
      <div className="wrap seeds-prev-head">
        <div>
          <Eyebrow onDark>{seedPreview.eyebrow}</Eyebrow>
          <SplitText as="h2" className="h1" text={seedPreview.title} />
        </div>
        <Reveal delay={2}>
          <Button to={seedPreview.cta.to} variant="gold">
            {seedPreview.cta.label}
          </Button>
        </Reveal>
      </div>
      <div className="rail" id="seedsRail" ref={railRef}>
        {seedPreview.cards.map((card) => (
          <Link to="/our-seeds" className="seed-card" key={card.no}>
            <div className="img-mask in">
              <img src={card.image} alt="" loading="lazy" />
            </div>
            <div className="seed-meta">
              <span className="seed-no">{card.no}</span>
              <h3 className="h3">{card.title}</h3>
              <p>{card.body}</p>
            </div>
          </Link>
        ))}
      </div>
      <Reveal className="rail-foot wrap">
        <span className="rail-hint">← Drag or swipe to explore →</span>
        <div className="rail-nav">
          <button
            type="button"
            className="rail-btn"
            aria-label="Previous seeds"
            disabled={atStart}
            onClick={scrollPrev}
          >
            <Icon name="arrow-left" />
          </button>
          <button
            type="button"
            className="rail-btn"
            aria-label="Next seeds"
            disabled={atEnd}
            onClick={scrollNext}
          >
            <Icon name="arrow-right" />
          </button>
        </div>
      </Reveal>
    </section>
  );
}

export function HappyWall() {
  const { happyWall: h } = c;
  return (
    <section className="pad surface-cream happy">
      <div className="wrap happy-head center">
        <Eyebrow center>{h.eyebrow}</Eyebrow>
        <SplitText as="h2" className="h1" text={h.title} />
      </div>
      <div className="happy-grid wrap-wide">
        {h.images.map((image, i) => (
          <Reveal
            as="figure"
            key={image.src}
            className={`happy-item${image.span ? ` h-${image.span}` : ""}`}
            delay={((i % 3) + 1) as 1 | 2 | 3}
          >
            <img src={image.src} alt={image.alt} className="cover" loading="lazy" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function VoicesSection() {
  const { voices: v } = c;
  return (
    <section className="pad surface-cream voices">
      <div className="wrap voices-head center">
        <Eyebrow center>{v.eyebrow}</Eyebrow>
        <SplitText as="h2" className="h1" text={v.title} />
      </div>
      <div className="wrap voices-grid">
        {v.items.map((voice, i) => (
          <Reveal
            as="figure"
            key={voice.name}
            className={`voice${voice.accent ? " accent-green" : ""}`}
            delay={((i % 3) + 1) as 1 | 2 | 3}
          >
            <div className="qmark">"</div>
            <p>{voice.quote}</p>
            <figcaption className="voice-by">
              <img src={voice.image} alt={voice.name} loading="lazy" />
              <div>
                <b>{voice.name}</b>
                <span>{voice.role}</span>
              </div>
            </figcaption>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function InvolveSection() {
  const { involve: inv } = c;
  return (
    <section className="pad surface-deep grain curve-top involve-sec">
      <div className="wrap involve-head">
        <Eyebrow onDark>{inv.eyebrow}</Eyebrow>
        <SplitText as="h2" className="h1" text={inv.title} />
      </div>
      <div className="wrap involve-grid">
        {inv.cards.map((card, i) => (
          <InvolveCardView key={card.no} index={i} card={card} />
        ))}
      </div>
    </section>
  );
}

function InvolveCardView({
  card,
  index,
}: {
  card: (typeof c.involve.cards)[number];
  index: number;
}) {
  const [inViewRef, inView] = useInView<HTMLElement>();
  const tiltRef = useTilt<HTMLElement>();
  return (
    <article
      ref={mergeRefs(inViewRef, tiltRef)}
      className={`involve${inView ? " in" : ""}`}
      data-reveal=""
      data-delay={(index % 3) + 1}
    >
      <img src={card.image} alt="" loading="lazy" />
      <span className="involve-no">{card.no}</span>
      <div className="involve-ico">
        <Icon name={card.icon} />
      </div>
      <h3>{card.title}</h3>
      <p>{card.body}</p>
      <Link to={card.cta.to ?? "/contact"} className="link-arrow">
        {card.cta.label} <Icon name="arrow-right" />
      </Link>
    </article>
  );
}

export function HomeCta() {
  const { cta } = c;
  return (
    <section className="cta-band surface-green grain">
      <div className="wrap cta-inner">
        <SplitText as="h2" className="display" text={cta.title} />
        <Reveal as="p" delay={2} className="lead">
          {cta.body}
        </Reveal>
        <Reveal delay={3} className="cta-actions">
          <CtaGroup actions={cta.actions} />
        </Reveal>
      </div>
    </section>
  );
}
