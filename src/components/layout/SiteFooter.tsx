import { type FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@/components/primitives/Icon";
import { footerColumns, site, socials } from "@/content/site";

export function SiteFooter() {
  const [subscribed, setSubscribed] = useState(false);

  const onSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubscribed(true);
  };

  return (
    <footer className="footer grain">
      <div className="footer-glow" />
      <div className="wrap-wide">
        <div className="footer-grid">
          <div className="footer-brand">
            <img className="footer-logo" src={site.logo.light} alt={site.name} height={54} />
            <p>{site.blurb}</p>
            <div className="socials">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name={social.icon} />
                </a>
              ))}
            </div>
          </div>

          {footerColumns.map((col) => (
            <div className="footer-col" key={col.title}>
              <h5>{col.title}</h5>
              {col.links.map((link) =>
                "to" in link && link.to ? (
                  <Link to={link.to} key={link.label}>
                    {link.label}
                  </Link>
                ) : (
                  <a href={"href" in link ? link.href : "#"} key={link.label}>
                    {link.label}
                  </a>
                ),
              )}
            </div>
          ))}

          <div className="footer-contact">
            <h5>Reach us</h5>
            <p>{site.contact.address}</p>
            <a className="fc-line" href={`tel:${site.contact.phone}`}>
              <Icon name="phone" />
              {site.contact.phone}
            </a>
            <a className="fc-line" href={`mailto:${site.contact.email}`}>
              <Icon name="mail" />
              {site.contact.email}
            </a>
            <div className={`footer-news${subscribed ? " sent" : ""}`}>
              <label htmlFor="footer-news-email">Get our stories</label>
              <form onSubmit={onSubscribe}>
                <input
                  id="footer-news-email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  aria-label="Email"
                />
                <button type="submit" aria-label="Subscribe">
                  <Icon name="arrow-right" />
                </button>
              </form>
              <p className="nl-done">🌱 Thank you — you're on the list!</p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-huge">{site.name}</div>

      <div className="wrap-wide">
        <div className="footer-bottom">
          <span>{site.copyright}</span>
          <div className="footer-bottom-links">
            <Link to="/contact">Privacy</Link>
            <Link to="/contact">Terms</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <button
            type="button"
            className="back-top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Back to top
            <span>
              <Icon name="arrow-up" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
