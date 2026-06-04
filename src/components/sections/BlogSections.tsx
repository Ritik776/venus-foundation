import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/primitives/Button";
import { Chip } from "@/components/primitives/Chip";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal, type RevealDelay, type RevealVariant } from "@/components/primitives/Reveal";
import { SplitText } from "@/components/primitives/SplitText";
import {
  type BlogCategory,
  type BlogPost,
  categoryFilters,
  getFeatured,
  posts,
} from "@/content/blog";

function postUrl(post: BlogPost): string {
  return `/blog/${post.slug}`;
}

function PostMeta({ post }: { post: BlogPost }) {
  return (
    <div className="post-meta">
      {post.author.name} <span className="dotsep" /> {post.dateLabel}
    </div>
  );
}

export function BlogCard({ post, delay }: { post: BlogPost; delay?: RevealDelay }) {
  return (
    <Reveal as={Link} to={postUrl(post)} className="bcard" delay={delay}>
      <div className="bcard-img">
        <img src={post.image.src} alt="" loading="lazy" />
      </div>
      <div className="bcard-body">
        <Chip tone={post.categoryTone}>{post.categoryLabel}</Chip>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <PostMeta post={post} />
      </div>
    </Reveal>
  );
}

function FeaturedPost({
  post,
  small,
  variant,
  delay,
}: {
  post: BlogPost;
  small?: boolean;
  variant?: RevealVariant;
  delay?: RevealDelay;
}) {
  return (
    <Reveal
      as={Link}
      to={postUrl(post)}
      className={`fpost${small ? " small" : ""}`}
      variant={variant}
      delay={delay}
    >
      <img src={post.image.src} alt="" loading={small ? "lazy" : "eager"} />
      <div className="fpost-body">
        <Chip tone={small ? post.categoryTone : "gold"}>
          {small ? post.categoryLabel : "Venus Foundation"}
        </Chip>
        <h3>{post.title}</h3>
        {small ? null : <p>{post.excerpt}</p>}
        <PostMeta post={post} />
      </div>
    </Reveal>
  );
}

export function FeaturedPosts() {
  const { lead, rest } = getFeatured();
  return (
    <section className="pad surface-cream">
      <div className="wrap">
        <div style={{ marginBottom: "clamp(24px,3vw,40px)" }}>
          <Eyebrow>Featured</Eyebrow>
          <SplitText as="h2" className="h2" text="Editor's picks" />
        </div>
        <div className="featured">
          <FeaturedPost post={lead} variant="left" />
          <div className="featured-side">
            {rest.map((post, i) => (
              <FeaturedPost
                key={post.slug}
                post={post}
                small
                variant="right"
                delay={(i + 1) as RevealDelay}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function LatestPosts() {
  const [active, setActive] = useState<BlogCategory | "all">("all");
  const visible = active === "all" ? posts : posts.filter((post) => post.category === active);

  return (
    <section className="pad surface-cream" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div style={{ marginBottom: "clamp(24px,3vw,36px)" }}>
          <Eyebrow>Latest posts</Eyebrow>
          <SplitText as="h2" className="h2" text="News & press releases" />
        </div>
        <Reveal className="filters">
          {categoryFilters.map((filter) => (
            <button
              type="button"
              key={filter.value}
              className={`filter-pill${active === filter.value ? " active" : ""}`}
              onClick={() => setActive(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </Reveal>
        <div className="blog-grid">
          {visible.map((post, i) => (
            <BlogCard key={post.slug} post={post} delay={((i % 3) + 1) as RevealDelay} />
          ))}
        </div>
        <div className="center" style={{ marginTop: "clamp(36px,5vw,56px)" }}>
          <Reveal>
            <Button to="/blog" variant="navy" arrow>
              View all posts
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function NewsletterCta() {
  const [done, setDone] = useState(false);
  return (
    <section className="pad surface-navy grain curve-top">
      <div className="wrap center" style={{ maxWidth: 680 }}>
        <Eyebrow onDark center>
          Stay in the loop
        </Eyebrow>
        <SplitText as="h2" className="h1" text="Get our stories in your inbox." />
        <Reveal
          as="p"
          delay={2}
          className="lead"
          style={{ color: "#cfe0ee", marginBottom: "1.6em" }}
        >
          One thoughtful note a month — impact updates, volunteer calls and the moments that move
          us.
        </Reveal>
        <Reveal
          as="form"
          delay={3}
          onSubmit={(event) => {
            event.preventDefault();
            setDone(true);
          }}
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
            maxWidth: 480,
            marginInline: "auto",
          }}
        >
          <label
            htmlFor="news-email"
            className="sr-only"
            style={{ position: "absolute", left: "-9999px" }}
          >
            Email address
          </label>
          <input
            id="news-email"
            type="email"
            required
            placeholder="your@email.com"
            style={{
              flex: 1,
              minWidth: 220,
              padding: "14px 18px",
              borderRadius: 100,
              border: "1.5px solid rgba(255,255,255,.2)",
              background: "rgba(255,255,255,.06)",
              color: "#fff",
              fontFamily: "inherit",
              fontSize: "1rem",
            }}
          />
          <button className="btn btn-gold" type="submit">
            Subscribe
          </button>
          {done ? (
            <p style={{ width: "100%", color: "var(--gold)", marginTop: 10 }}>
              🌱 Thank you — you're on the list!
            </p>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}

export function RelatedPosts({ related }: { related: BlogPost[] }) {
  return (
    <section className="pad surface-cream" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <SplitText as="h2" className="h2" text="Keep reading" />
        <div className="blog-grid" style={{ marginTop: "clamp(24px,3vw,40px)" }}>
          {related.map((post, i) => (
            <BlogCard key={post.slug} post={post} delay={((i % 3) + 1) as RevealDelay} />
          ))}
        </div>
      </div>
    </section>
  );
}
