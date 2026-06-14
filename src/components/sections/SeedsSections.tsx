import type { CSSProperties } from "react";
import { Reveal } from "@/components/primitives/Reveal";
import { SplitText } from "@/components/primitives/SplitText";
import { type Feature, seedsContent } from "@/content/seeds";
import { useInView } from "@/hooks/useInView";

const ACCENT: Record<Feature["accent"], string> = {
  navy: "var(--navy)",
  brown: "#a86b4c",
  sky: "var(--sky)",
  green: "var(--green-deep)",
};

function FeatureSection({ feature }: { feature: Feature }) {
  const [ref, inView] = useInView<HTMLElement>();
  const className = [
    "feat",
    feature.story ? "feat--story" : null,
    feature.reversed ? "rev" : null,
    feature.alt ? "alt" : null,
    inView ? "in" : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={className} id={feature.id} ref={ref}>
      <span className="feat-watermark" aria-hidden="true">
        {feature.no}
      </span>
      <div className="wrap feat-grid">
        <div className="feat-copy">
          <div className="feat-tagrow">
            <div
              className="feat-medallion"
              style={{ background: ACCENT[feature.accent] } as CSSProperties}
            >
              {feature.no}
            </div>
            <span className="feat-kicker">{feature.kicker}</span>
          </div>
          <SplitText as="h2" text={feature.title} />
          <Reveal as="p" delay={2} className="lead">
            {feature.lead}
          </Reveal>
          {feature.blocks?.map((block) =>
            block.pull ? (
              <Reveal as="p" key={block.text} className="feat-pull">
                {block.text}
              </Reveal>
            ) : (
              <Reveal as="p" key={block.text} delay={2}>
                {block.text}
              </Reveal>
            ),
          )}
          {feature.tags ? (
            <Reveal delay={3} className="feat-tags">
              {feature.tags.map((tag) => (
                <span className="chip" key={tag}>
                  {tag}
                </span>
              ))}
            </Reveal>
          ) : null}
        </div>
        <Reveal className="feat-art" variant={feature.reversed ? "left" : "right"}>
          <span className="feat-art-accent" aria-hidden="true" />
          <div className="feat-art-main">
            <img src={feature.image.src} alt={feature.image.alt} loading="lazy" />
          </div>
          {feature.stat ? (
            <div className="feat-stat">
              <b>{feature.stat.value}</b>
              <span>{feature.stat.label}</span>
            </div>
          ) : null}
        </Reveal>
      </div>

      {feature.eduSteps ? (
        <div className="wrap">
          <div className="edu-steps">
            {feature.eduSteps.map((step) => (
              <Reveal as="article" className="edu-step" key={step.label}>
                <div className="edu-step-no">
                  <b>{step.badge}</b>
                  <span className="esl">{step.label}</span>
                </div>
                <div>
                  <h4>
                    <span className="ico">{step.icon}</span>
                    {step.title}
                  </h4>
                  {step.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

export function FeaturesSection() {
  return (
    <>
      {seedsContent.features.map((feature) => (
        <FeatureSection feature={feature} key={feature.id} />
      ))}
    </>
  );
}
