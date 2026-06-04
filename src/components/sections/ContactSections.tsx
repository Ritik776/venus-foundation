import { type CSSProperties, type FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/primitives/Button";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Icon } from "@/components/primitives/Icon";
import { InstantReveal } from "@/components/primitives/InstantReveal";
import { Reveal } from "@/components/primitives/Reveal";
import { SplitText } from "@/components/primitives/SplitText";
import { contactContent, type InfoCard } from "@/content/contact";
import { site } from "@/content/site";

const ICON_TONE: Record<InfoCard["iconTone"], CSSProperties | undefined> = {
  green: undefined,
  red: { background: "rgba(231,76,60,.12)", color: "var(--red-deep)" },
  gold: { background: "rgba(244,185,66,.18)", color: "#a9760b" },
  sky: { background: "rgba(41,182,246,.14)", color: "#0d83bd" },
};

function ContactForm() {
  const { form } = contactContent;
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <Reveal as="form" variant="right" className="form" onSubmit={onSubmit}>
      {sent ? (
        <div className="form-success show">
          <div className="ok-ring">
            <Icon name="check" strokeWidth={3} />
          </div>
          <h3 className="h3">{form.success.title}</h3>
          <p style={{ color: "#5a6b78", marginTop: 8 }}>{form.success.body}</p>
        </div>
      ) : (
        <div className="form-body">
          <h3 className="h3" style={{ marginBottom: 6 }}>
            {form.title}
          </h3>
          <p style={{ color: "#8194a3", marginBottom: 24, fontSize: ".95rem" }}>{form.intro}</p>
          <div className="field-row">
            <div className="field">
              <label htmlFor="first-name">First name</label>
              <input id="first-name" type="text" required placeholder="Your name" />
            </div>
            <div className="field">
              <label htmlFor="last-name">Last name</label>
              <input id="last-name" type="text" placeholder="Surname" />
            </div>
          </div>
          <div className="field-row">
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" required placeholder="you@email.com" />
            </div>
            <div className="field">
              <label htmlFor="phone">Phone</label>
              <input id="phone" type="tel" placeholder="+91" />
            </div>
          </div>
          <div className="field">
            <label htmlFor="intent">I'd like to…</label>
            <select id="intent" required defaultValue="">
              <option value="" disabled>
                Select an option
              </option>
              {form.intents.map((intent) => (
                <option key={intent}>{intent}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              required
              placeholder="Tell us a little about how you'd like to contribute…"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", justifyContent: "center" }}
          >
            Send message <Icon name="arrow-right" />
          </button>
          <p className="form-note">{form.note}</p>
        </div>
      )}
    </Reveal>
  );
}

export function ContactHero() {
  const { hero, info } = contactContent;
  return (
    <InstantReveal>
      <section className="phero grain" style={{ paddingBottom: "clamp(40px,5vw,70px)" }}>
        <div className="phero-bg" data-parallax="-0.1" />
        <div className="wrap">
          <div className="breadcrumb">
            <Link to="/">Home</Link> / <span>{hero.breadcrumb}</span>
          </div>
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <SplitText as="h1" className="display" text={hero.title} />
        </div>
        <div className="wrap" style={{ marginTop: "clamp(30px,4vw,50px)" }}>
          <div className="contact-grid">
            <Reveal variant="left" className="contact-info">
              {info.map((card) => (
                <div className="info-card" key={card.title}>
                  <div className="info-ico" style={ICON_TONE[card.iconTone]}>
                    <Icon name={card.icon} />
                  </div>
                  <div>
                    <h4>{card.title}</h4>
                    {card.lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                    {card.link ? (
                      <a
                        href={card.link.href}
                        className={card.link.arrow ? "link-arrow" : undefined}
                        style={card.link.arrow ? { fontSize: ".9rem", marginTop: 6 } : undefined}
                      >
                        {card.link.label}
                        {card.link.arrow ? <Icon name="arrow-right" /> : null}
                      </a>
                    ) : null}
                  </div>
                </div>
              ))}
            </Reveal>
            <ContactForm />
          </div>
        </div>
      </section>
    </InstantReveal>
  );
}

export function MapEmbed() {
  return (
    <section className="pad surface-cream" style={{ paddingTop: 0 }}>
      <div className="wrap-wide">
        <Reveal variant="clip" className="map-embed">
          <iframe
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={site.contact.mapsEmbed}
            title="Venus Foundation location"
          />
        </Reveal>
      </div>
    </section>
  );
}

export function FaqSection() {
  const { faq } = contactContent;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="pad surface-cream" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="center" style={{ marginBottom: "clamp(30px,4vw,48px)" }}>
          <Eyebrow center>{faq.eyebrow}</Eyebrow>
          <SplitText as="h2" className="h1" text={faq.title} />
        </div>
        <Reveal className="faq">
          {faq.items.map((item, i) => {
            const open = openIndex === i;
            return (
              <div className={`acc${open ? " open" : ""}`} key={item.question}>
                <button
                  type="button"
                  className="acc-head"
                  aria-expanded={open}
                  onClick={() => setOpenIndex(open ? null : i)}
                >
                  {item.question}
                  <span className="acc-icon" />
                </button>
                <div className="acc-body" style={{ maxHeight: open ? 320 : 0 }}>
                  <p>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

export function ClosingCta() {
  const { closing } = contactContent;
  return (
    <section className="pad surface-navy grain curve-top">
      <div className="wrap center" style={{ maxWidth: 680 }}>
        <Eyebrow onDark center>
          {closing.eyebrow}
        </Eyebrow>
        <SplitText as="h2" className="display" text={closing.title} />
        <Reveal
          as="p"
          delay={2}
          className="lead"
          style={{ color: "#cfe0ee", marginBottom: "1.8em" }}
        >
          {closing.body}
        </Reveal>
        <Reveal delay={3} className="cta-actions">
          <Button href={`mailto:${site.contact.email}`} variant="gold">
            Email us
          </Button>
          <Button href={`tel:${site.contact.phone}`} variant="ghost" onDark>
            Call {site.contact.phone}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
