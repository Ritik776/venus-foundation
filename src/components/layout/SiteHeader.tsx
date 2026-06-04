import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@/components/primitives/Icon";
import { mobileNavLinks, navLinks, site, socials } from "@/content/site";
import { useMagnetic } from "@/hooks/usePointerEffects";

/** Maps a pathname to the `data-page` key used by the active-state CSS. */
function pageKeyFor(pathname: string): string {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/about")) return "about";
  if (pathname.startsWith("/our-seeds")) return "seeds";
  if (pathname.startsWith("/blog/")) return "post";
  if (pathname.startsWith("/blog")) return "blog";
  if (pathname.startsWith("/media")) return "media";
  if (pathname.startsWith("/contact")) return "contact";
  return "home";
}

/** Pages whose hero is a dark, full-bleed image — the nav sits transparent/light over them. */
const HERO_DARK = new Set(["home", "about", "seeds", "blog", "media"]);

/** Which desktop / mobile nav key is "active" for a given page. */
const DESKTOP_ACTIVE: Record<string, string> = {
  home: "home",
  about: "about",
  seeds: "seeds",
  blog: "media",
  post: "media",
  media: "media",
  contact: "contact",
};
const MOBILE_ACTIVE: Record<string, string> = {
  home: "home",
  about: "about",
  seeds: "seeds",
  blog: "blog",
  post: "blog",
  media: "media",
  contact: "contact",
};

export function SiteHeader() {
  const { pathname } = useLocation();
  const page = pageKeyFor(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const getInvolvedRef = useMagnetic<HTMLAnchorElement>(0.25);

  // Drive the active-state + hero-dark CSS from the route via the <body> element.
  useEffect(() => {
    document.body.setAttribute("data-page", page);
    document.body.classList.toggle("hero-dark", HERO_DARK.has(page));
  }, [page]);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 44);
      setHidden(y > lastY && y > 560);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu on navigation.
  // biome-ignore lint/correctness/useExhaustiveDependencies: close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Escape closes the mobile menu.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const headerClasses = ["nav", scrolled ? "scrolled" : null, hidden ? "hide" : null]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <header className={headerClasses} id="nav">
        <div className="wrap-wide nav-inner">
          <Link to="/" className="nav-logo" aria-label={`${site.name} home`}>
            <img src={site.logo.dark} alt={site.name} height={56} />
          </Link>

          <nav className="nav-links" aria-label="Primary">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div className="has-drop" key={link.to}>
                  <Link
                    to={link.to}
                    className="nav-link"
                    data-nav={link.dataNav}
                    aria-current={DESKTOP_ACTIVE[page] === link.dataNav ? "page" : undefined}
                  >
                    {link.label} ▾
                  </Link>

                  <div className="drop">
                    {link.dropdown.map((item) => (
                      <Link to={item.to} key={item.to}>
                        <b>{item.label}</b>
                        <span>{item.description}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  to={link.to}
                  key={link.to}
                  className="nav-link"
                  data-nav={link.dataNav}
                  aria-current={DESKTOP_ACTIVE[page] === link.dataNav ? "page" : undefined}
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>

          <div className="nav-cta">
            <Link ref={getInvolvedRef} to="/contact" className="nav-getinvolved magnetic">
              Get Involved
              <Icon name="arrow-right" />
            </Link>
          </div>

          <button
            type="button"
            className={`burger${menuOpen ? " open" : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        <div className="mm-head">
          <button
            type="button"
            className="mm-close"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          />
        </div>

        <nav className="mm-links" aria-label="Mobile">
          {mobileNavLinks.map((link) => (
            <Link
              to={link.to}
              key={link.to}
              data-nav={link.dataNav}
              aria-current={MOBILE_ACTIVE[page] === link.dataNav ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              <span className="mm-no">{link.no}</span>
              {link.label}
              <span className="mm-arrow">
                <Icon name="arrow-right" />
              </span>
            </Link>
          ))}
        </nav>

        <Link to="/contact" className="mm-donate" onClick={() => setMenuOpen(false)}>
          Get Involved <Icon name="arrow-right" />
        </Link>

        <div className="mm-foot">
          <div className="mm-contact">
            Plot No: 51, 52, Industrial Area Phase 1,
            <br />
            Panchkula, Haryana 134113
            <br />
            <a href={`tel:${site.contact.phone}`}>{site.contact.phone}</a> ·{" "}
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          </div>
          <div className="mm-socials">
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
      </div>
    </>
  );
}
