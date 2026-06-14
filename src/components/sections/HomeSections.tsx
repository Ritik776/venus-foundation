import { useRef } from "react";
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
import { useHeroSlides, useSparkScenes } from "@/hooks/useScrollScenes";
import { CtaGroup } from "./Shared";

const c = homeContent;

export function ImmersiveHero() {
  const { immersiveHero: hero } = c;
  const { index, goTo } = useHeroSlides(hero.slides.length, 5000);

  return (
    <InstantReveal>
      <section className="ihero2">
        <div className="ihero2-slides">
          {hero.slides.map((slide, i) => (
            <div key={slide.src} className={`ihero2-slide${i === index ? " on" : ""}`}>
              <img src={slide.src} alt={slide.alt} fetchPriority={i === 0 ? "high" : "low"} />
            </div>
          ))}
        </div>
        <div className="ihero2-veil" />
        <div className="ihero2-inner">
          <Reveal as="span" className="ihero2-eyebrow">
            {hero.eyebrow}
          </Reveal>
          <SplitText as="h1" className="ihero2-title" text={hero.title} />
          <Reveal as="p" delay={2} className="ihero2-sub">
            {hero.subtitle}
          </Reveal>
          <Reveal delay={3} className="ihero2-actions">
            <Button to={hero.action.to} variant={hero.action.variant} arrow={hero.action.arrow}>
              {hero.action.label}
            </Button>
          </Reveal>
        </div>
        <div className="ihero2-dots">
          {hero.slides.map((slide, i) => (
            <button
              type="button"
              key={slide.src}
              className={i === index ? "on" : undefined}
              aria-label={`Show slide ${i + 1}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
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
              <Button to={w.action.to} variant={w.action.variant} arrow={w.action.arrow}>
                {w.action.label}
              </Button>
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

export function SparkJourney() {
  const { spark: s } = c;
  const sceneRef = useRef<HTMLElement>(null);
  const active = useSparkScenes(sceneRef);

  return (
    <section className="pad surface-cream spark" id="milestones" ref={sceneRef}>
      <div className="wrap spark-head">
        <div>
          <Eyebrow>{s.eyebrow}</Eyebrow>
          <SplitText as="h2" className="h1" text={s.title} />
        </div>
        <Reveal as="p" delay={2} className="spark-sub">
          {s.sub}
        </Reveal>
      </div>
      <div className="wrap spark-body">
        <Reveal className="spark-media">
          <div className="spark-frame">
            {s.cards.map((card, i) => (
              <img
                key={card.image}
                className={`spark-img${i === active ? " active" : ""}`}
                src={card.image}
                alt={card.title}
                loading="lazy"
              />
            ))}
          </div>
        </Reveal>
        <div className="spark-list">
          {s.cards.map((card, i) => (
            <Reveal
              as="article"
              key={`${card.title}-${card.date}`}
              className={`spark-card${i === active ? " active" : ""}`}
            >
              <Chip>{card.date}</Chip>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
      <Reveal className="wrap tl-end">
        <div className="tl-end-badge">🌱</div>
        <h3 className="h3">
          <em>The journey continues…</em>
        </h3>
        <p className="mw-lg mx-auto tl-end-note">{s.endNote}</p>
      </Reveal>
    </section>
  );
}

export function ImpactSection() {
  const { impact: im } = c;
  const { open } = useLightbox();
  return (
    <section className="impact-sec" id="impact">
      <div className="wrap">
        <div className="impact-panel grain">
          <div className="impact-head">
            <Eyebrow>{im.eyebrow}</Eyebrow>
            <SplitText as="h2" className="h1" text={im.title} />
            <Reveal as="p" delay={2} className="lead">
              {im.body}
            </Reveal>
          </div>

          <div className="impact-stats">
            {im.stats.map((stat, i) => (
              <Reveal className="istat" key={stat.label} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
                <div className="istat-num">
                  <Counter to={stat.value} suffix={stat.suffix} />
                </div>
                <div className="istat-label">{stat.label}</div>
              </Reveal>
            ))}
          </div>

          <Reveal
            variant="clip"
            className="video-stage img-mask"
            onClick={() => open({ kind: "youtube", id: im.video.videoId })}
            role="button"
            tabIndex={0}
            aria-label="Play film"
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                open({ kind: "youtube", id: im.video.videoId });
              }
            }}
          >
            <img
              src={im.video.image.src}
              alt={im.video.image.alt}
              className="cover"
              loading="lazy"
            />
            <div className="video-overlay" />
            <button type="button" className="play-btn" aria-label="Play film">
              <span className="play-ring" />
              <Icon name="play" />
            </button>
            <div className="video-caption">
              <Chip tone="gold">{im.video.chip}</Chip>
              <h3 className="h3">{im.video.caption}</h3>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function HappyWall() {
  const { happyWall: h } = c;
  const directions = ["gallery-row--ltr", "gallery-row--rtl"] as const;
  return (
    <section className="pad surface-cream happy">
      <div className="wrap happy-head center">
        <Eyebrow center>{h.eyebrow}</Eyebrow>
        <SplitText as="h2" className="h1" text={h.title} />
      </div>
      <Reveal className="gallery-marquee">
        {h.rows.map((row, r) => (
          <div className={`gallery-row ${directions[r] ?? directions[0]}`} key={directions[r]}>
            <div className="gallery-track">
              {[...row, ...row].map((image, i) => (
                <figure className="gphoto" key={`${image.src}-${i}`}>
                  <img
                    src={image.src}
                    alt={i < row.length ? image.alt : ""}
                    aria-hidden={i >= row.length || undefined}
                    loading="lazy"
                  />
                </figure>
              ))}
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

export function HomeCta() {
  const { cta } = c;
  return (
    <section className="cta-wrap">
      <div className="wrap-wide">
        <Reveal variant="scale" className="cta-card surface-green grain">
          <span className="cta-leaf l1 float" aria-hidden="true">
            🌿
          </span>
          <span className="cta-leaf l2 float" aria-hidden="true">
            🌱
          </span>
          <div className="cta-inner">
            <SplitText as="h2" className="display" text={cta.title} />
            <Reveal as="p" delay={2} className="lead">
              {cta.body}
            </Reveal>
            <Reveal delay={3} className="cta-actions">
              <CtaGroup actions={cta.actions} />
            </Reveal>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
