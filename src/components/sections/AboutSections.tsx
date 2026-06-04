import type { CSSProperties } from "react";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { SplitText } from "@/components/primitives/SplitText";
import { aboutContent } from "@/content/about";

const a = aboutContent;

export function VisionSplit() {
  const { vision: v } = a;
  return (
    <section className="pad surface-cream">
      <div className="wrap split">
        <div className="split-copy">
          <Eyebrow>{v.eyebrow}</Eyebrow>
          <SplitText as="h2" className="h1" text={v.title} />
          <Reveal as="p" delay={2} className="lead" style={{ color: "var(--navy)" }}>
            {v.body}
          </Reveal>
        </div>
        <Reveal variant="right" className="img-mask split-media">
          <img src={v.image.src} alt={v.image.alt} loading="lazy" />
        </Reveal>
      </div>
    </section>
  );
}

export function ValuesGrid() {
  const { values: v } = a;
  return (
    <section className="pad surface-deep grain curve-top curve-btm">
      <div className="wrap">
        <div className="center" style={{ marginBottom: "clamp(40px,5vw,64px)" }}>
          <Eyebrow onDark center>
            {v.eyebrow}
          </Eyebrow>
          <SplitText as="h2" className="h1" text={v.title} />
        </div>
        <div className="values-grid">
          {v.cards.map((card, i) => (
            <Reveal
              key={card.title}
              className="value-card italic"
              delay={((i % 3) + 1) as 1 | 2 | 3}
              style={{ "--accent-c": `var(--${card.accent})` } as CSSProperties}
            >
              <span className="value-emoji">{card.emoji}</span>
              <h4>{card.title}</h4>
              <p>{card.body}</p>
            </Reveal>
          ))}
          <Reveal
            className="value-card"
            delay={2}
            style={{
              background: "var(--green-deep)",
              color: "#fff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h4 style={{ color: "#fff" }}>{v.mission.title}</h4>
            <p style={{ color: "#dcefd8" }}>{v.mission.body}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function ChairpersonLeader() {
  const { chairperson: ch } = a;
  return (
    <section className="pad surface-cream">
      <div className="wrap">
        <div className="center" style={{ marginBottom: "clamp(34px,4vw,54px)" }}>
          <Eyebrow center>{ch.eyebrow}</Eyebrow>
          <SplitText as="h2" className="h2" text={ch.title} />
        </div>
        <Reveal variant="scale" className="leader">
          <div className="leader-img">
            <img src={ch.image.src} alt={ch.image.alt} loading="lazy" />
          </div>
          <div className="leader-copy">
            <p className="leader-quote">
              <span className="qmark">“</span>
              {ch.quote}
            </p>
            <div className="leader-name">{ch.name}</div>
            <div className="leader-role">{ch.role}</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function TeamGrid() {
  const { team: t } = a;
  return (
    <section className="pad surface-cream" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div style={{ marginBottom: "clamp(34px,4vw,54px)", maxWidth: "60ch" }}>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <SplitText as="h2" className="h1" text={t.title} />
        </div>
        <div className="team-grid">
          {t.members.map((member, i) => (
            <Reveal
              as="article"
              key={member.name}
              className="member"
              delay={((i % 3) + 1) as 1 | 2 | 3}
            >
              <img src={member.image} alt={member.name} loading="lazy" />
              <div className="member-info">
                <h4>{member.name}</h4>
                <p className="member-role">{member.role}</p>
                <p className="member-bio">{member.bio}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PartnersGrid() {
  const { partners: p } = a;
  return (
    <section className="pad surface-cream" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="center" style={{ marginBottom: "clamp(30px,4vw,48px)" }}>
          <Eyebrow center>{p.eyebrow}</Eyebrow>
          <SplitText as="h2" className="h2" text={p.title} />
        </div>
        <div className="partners-grid">
          {p.logos.map((logo, i) => (
            <Reveal key={logo.alt} className="partner-logo" delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
              <img src={logo.src} alt={logo.alt} loading="lazy" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
