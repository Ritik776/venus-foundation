import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/primitives/Button";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Icon } from "@/components/primitives/Icon";
import { InstantReveal } from "@/components/primitives/InstantReveal";
import { Reveal, type RevealDelay } from "@/components/primitives/Reveal";
import { SplitText } from "@/components/primitives/SplitText";
import type { Cta, DidYouKnow, ImageRef, RichLine } from "@/types/content";

/** Inline rich text with optional bold runs. */
export function RichText({ line }: { line: RichLine }) {
  return (
    <>
      {line.map((seg, i) =>
        seg.bold ? <b key={i}>{seg.text}</b> : <span key={i}>{seg.text}</span>,
      )}
    </>
  );
}

/** Renders a list of CTAs as Buttons. */
export function CtaGroup({ actions }: { actions: readonly Cta[] }) {
  return (
    <>
      {actions.map((cta) => (
        <Button
          key={cta.label}
          to={cta.to}
          href={cta.href}
          variant={cta.variant}
          onDark={cta.onDark}
          arrow={cta.arrow}
        >
          {cta.label}
        </Button>
      ))}
    </>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  body?: string;
  center?: boolean;
  onDark?: boolean;
  titleClass?: string;
  bodyDelay?: RevealDelay;
}

/** Eyebrow + animated split title + optional lead paragraph. */
export function SectionHeading({
  eyebrow,
  title,
  body,
  center = false,
  onDark = false,
  titleClass = "h1",
  bodyDelay = 2,
}: SectionHeadingProps) {
  return (
    <>
      {eyebrow ? (
        <Eyebrow onDark={onDark} center={center}>
          {eyebrow}
        </Eyebrow>
      ) : null}
      <SplitText as="h2" className={titleClass} text={title} />
      {body ? (
        <Reveal as="p" delay={bodyDelay} className="lead">
          {body}
        </Reveal>
      ) : null}
    </>
  );
}

export function DidYouKnowBand({ data }: { data: DidYouKnow }) {
  return (
    <section className="dyk grain">
      <div className="wrap">
        <Reveal variant="left" className="dyk-label">
          {data.label}
        </Reveal>
        <Reveal as="p" delay={1} className="dyk-text">
          {data.text}
        </Reveal>
      </div>
    </section>
  );
}

export function MarqueeBand({ items }: { items: readonly string[] }) {
  const track = (hidden: boolean) => (
    <div className="marquee__track" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <span className="marquee__item" key={item}>
          {item}
          <span className="marquee__star">✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <section className="marquee-band surface-navy">
      <div className="marquee">
        {track(false)}
        {track(true)}
      </div>
    </section>
  );
}

interface PlayButtonProps {
  onClick?: () => void;
  className?: string;
  label?: string;
}

export function PlayButton({ onClick, className, label = "Play film" }: PlayButtonProps) {
  return (
    <button
      type="button"
      className={`play-btn${className ? ` ${className}` : ""}`}
      aria-label={label}
      onClick={onClick}
    >
      <span className="play-ring" />
      <Icon name="play" />
    </button>
  );
}

interface Cta2Data {
  image: ImageRef;
  title: string;
  body: string;
  actions: readonly Cta[];
}

export function Cta2Band({ data }: { data: Cta2Data }) {
  return (
    <section className="pad surface-cream" style={{ paddingTop: 0 }}>
      <div className="wrap-wide">
        <Reveal variant="scale" className="cta2 grain">
          <div className="cta2-img">
            <img src={data.image.src} alt={data.image.alt} loading="lazy" />
          </div>
          <div className="cta2-inner">
            <div>
              <h2 className="h2">{data.title}</h2>
              <p>{data.body}</p>
            </div>
            <div className="cta2-actions">
              <CtaGroup actions={data.actions} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

interface WordmarkWord {
  text: string;
  tone: string;
}

interface InnerHeroProps {
  image: ImageRef;
  breadcrumb: string;
  eyebrow: string;
  title?: string;
  words?: readonly WordmarkWord[];
  subtitle?: string;
  pills?: readonly { value: string; label: string }[];
  /** Render a play button and make the hero clickable (media page). */
  onPlay?: () => void;
  children?: ReactNode;
}

const WORD_DELAYS: (RevealDelay | undefined)[] = [undefined, 2, 4];

/** Immersive full-bleed hero shared by the inner pages. */
export function InnerHero({
  image,
  breadcrumb,
  eyebrow,
  title,
  words,
  subtitle,
  pills,
  onPlay,
  children,
}: InnerHeroProps) {
  return (
    <InstantReveal>
      {/* biome-ignore lint/a11y/noStaticElementInteractions: decorative full-bleed hero doubles as a play trigger on the media page. */}
      <section
        className="ihero"
        style={onPlay ? { cursor: "pointer" } : undefined}
        onClick={onPlay}
      >
        <img className="ihero-bg" src={image.src} alt={image.alt} data-parallax="-0.06" />
        <div className="ihero-veil" />
        <span className="ihero-grain grain" />
        <div className="wrap ihero-inner">
          <div className="breadcrumb">
            <Link to="/">Home</Link> / <span>{breadcrumb}</span>
          </div>
          <Eyebrow>{eyebrow}</Eyebrow>
          {words ? (
            <h1 className="display wordmark-title">
              {words.map((word, i) => (
                <Reveal
                  as="span"
                  key={word.text}
                  delay={WORD_DELAYS[i]}
                  className={word.tone || undefined}
                >
                  {word.text}
                </Reveal>
              ))}
            </h1>
          ) : (
            <SplitText as="h1" className="display" text={title ?? ""} />
          )}
          {subtitle ? (
            <Reveal as="p" delay={2} className="lead">
              {subtitle}
            </Reveal>
          ) : null}
          {pills ? (
            <Reveal delay={3} className="ihero-chips">
              {pills.map((pill) => (
                <div className="ihero-chip" key={pill.label}>
                  <b>{pill.value}</b>
                  <span>{pill.label}</span>
                </div>
              ))}
            </Reveal>
          ) : null}
          {children}
        </div>
        {onPlay ? <PlayButton className="ihero-play" onClick={onPlay} /> : null}
      </section>
    </InstantReveal>
  );
}
