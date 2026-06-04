import { type CSSProperties, useRef } from "react";
import { Link } from "react-router-dom";
import { Chip } from "@/components/primitives/Chip";
import { Counter } from "@/components/primitives/Counter";
import { Icon } from "@/components/primitives/Icon";
import { InstantReveal } from "@/components/primitives/InstantReveal";
import { Reveal } from "@/components/primitives/Reveal";
import { SplitText } from "@/components/primitives/SplitText";
import { RichText } from "@/components/sections/Shared";
import type { ArticleBlock, BlogPost } from "@/content/blog";
import { useTableOfContents } from "@/hooks/useScrollScenes";

const LEAD_STYLE: CSSProperties = {
  fontSize: "1.3rem",
  fontFamily: "var(--display)",
  color: "var(--navy)",
  lineHeight: 1.5,
};

interface TocEntry {
  id: string;
  label: string;
}

function tocEntries(post: BlogPost): TocEntry[] {
  const entries: TocEntry[] = [];
  for (const block of post.body) {
    if ("tocLabel" in block && block.tocLabel && "id" in block && block.id) {
      entries.push({ id: block.id, label: block.tocLabel });
    }
  }
  return entries;
}

function Block({ block, index }: { block: ArticleBlock; index: number }) {
  switch (block.type) {
    case "lead":
      return (
        <Reveal as="p" id={block.id} style={LEAD_STYLE}>
          {block.text}
        </Reveal>
      );
    case "p":
      return (
        <Reveal as="p" id={block.id}>
          {block.text}
        </Reveal>
      );
    case "h2":
      return (
        <Reveal as="h2" id={block.id}>
          {block.text}
        </Reveal>
      );
    case "quote":
      return <Reveal as="blockquote">{block.text}</Reveal>;
    case "callout":
      return (
        <Reveal className="callout">
          <div className="c-ico">
            <Icon name="bulb" />
          </div>
          <p>
            <RichText line={block.rich} />
          </p>
        </Reveal>
      );
    case "figure":
      return (
        <Reveal as="figure" variant="clip" className="article-figure">
          <img src={block.image.src} alt={block.image.alt} loading="lazy" />
          <figcaption>{block.caption}</figcaption>
        </Reveal>
      );
    case "list":
      return (
        <ul className="dotlist">
          {block.items.map((item) => (
            <Reveal as="li" key={item}>
              {item}
            </Reveal>
          ))}
        </ul>
      );
    case "stat":
      return (
        <Reveal className="pull-stat">
          <div className="pn">
            <Counter to={block.value} suffix={block.suffix} />
          </div>
          <p className="pl">{block.label}</p>
        </Reveal>
      );
    case "takeaways":
      return (
        <Reveal className="takeaways" id={block.id}>
          <h4>Key takeaways</h4>
          <ul>
            {block.items.map((item) => (
              <li key={item}>
                <Icon name="check" strokeWidth={2.5} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      );
    default:
      return <p key={index}>{""}</p>;
  }
}

export function Article({ post }: { post: BlogPost }) {
  const articleRef = useRef<HTMLElement>(null);
  const entries = tocEntries(post);
  const ids = entries.map((entry) => entry.id);
  const { activeId, progress } = useTableOfContents(articleRef, ids);
  const shareIcons = ["facebook", "x", "linkedin"] as const;

  return (
    <>
      <InstantReveal>
        <section className="phero grain" style={{ paddingBottom: 0 }}>
          <div className="wrap" style={{ maxWidth: 880 }}>
            <div className="breadcrumb">
              <Link to="/">Home</Link> / <Link to="/blog">Blog</Link> /{" "}
              <span>{post.categoryLabel}</span>
            </div>
            <Reveal as="span" style={{ display: "inline-block" }}>
              <Chip tone={post.categoryTone}>{post.categoryLabel} · Venus Foundation</Chip>
            </Reveal>
            <SplitText as="h1" className="h1" text={post.title} />
            <Reveal
              as="p"
              delay={1}
              className="lead"
              style={{ maxWidth: "60ch", color: "var(--charcoal)" }}
            >
              {post.subtitle}
            </Reveal>
            <Reveal delay={2} className="author-row">
              <img src={post.author.image} alt={post.author.name} loading="lazy" />
              <div>
                <div style={{ fontWeight: 700, color: "var(--navy)" }}>By {post.author.name}</div>
                <div className="post-meta" style={{ marginTop: 2 }}>
                  {post.dateLabel} <span className="dotsep" /> {post.readMinutes} min read
                </div>
              </div>
            </Reveal>
          </div>
          <div className="wrap-wide" style={{ marginTop: "clamp(34px,4vw,54px)" }}>
            <Reveal
              variant="clip"
              className="img-mask"
              style={{ aspectRatio: "16/7", borderRadius: "var(--radius-lg)" }}
            >
              <img
                src={post.image.src}
                alt={post.image.alt}
                className="cover"
                fetchPriority="high"
              />
            </Reveal>
          </div>
        </section>
      </InstantReveal>

      <section className="pad surface-cream" style={{ paddingTop: "clamp(50px,6vw,80px)" }}>
        <div className="wrap article-layout">
          <Reveal as="aside" variant="left" className="toc-wrap">
            <div className="toc-card">
              <div className="toc-title">On this page</div>
              <ul className="toc">
                {entries.map((entry) => (
                  <li key={entry.id}>
                    <a
                      href={`#${entry.id}`}
                      className={activeId === entry.id ? "active" : undefined}
                      onClick={(event) => {
                        event.preventDefault();
                        const target = document.getElementById(entry.id);
                        if (target) {
                          window.scrollTo({ top: target.offsetTop - 110, behavior: "smooth" });
                        }
                      }}
                    >
                      {entry.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="toc-progress">
                <span style={{ width: `${progress * 100}%` }} />
              </div>
              <div className="toc-meta">
                <span>
                  📖 <b>{post.readMinutes} min</b> read
                </span>
                <span>
                  🗓️ Updated <b>{post.updatedLabel}</b>
                </span>
              </div>
            </div>
          </Reveal>

          <article className="article" style={{ margin: 0 }} ref={articleRef}>
            {post.body.map((block, i) => (
              <Block key={`${block.type}-${i}`} block={block} index={i} />
            ))}

            <Reveal className="share-bar">
              <span>Share this story</span>
              {shareIcons.map((icon) => (
                <a key={icon} href="#share" aria-label={icon}>
                  <Icon name={icon} />
                </a>
              ))}
            </Reveal>

            <Reveal className="author-card">
              <img src={post.author.image} alt={post.author.name} loading="lazy" />
              <div>
                <h4>{post.author.name}</h4>
                <div className="ac-role">{post.author.role}</div>
                <p>{post.author.bio}</p>
              </div>
            </Reveal>
          </article>
        </div>
      </section>
    </>
  );
}
