import type { MouseEventHandler, ReactNode } from "react";
import { Link } from "react-router-dom";
import { useMagnetic } from "@/hooks/usePointerEffects";
import { Icon } from "./Icon";

export type ButtonVariant = "primary" | "navy" | "ghost" | "gold";

interface ButtonProps {
  children: ReactNode;
  /** Internal route — renders a router `<Link>`. */
  to?: string;
  /** External URL or `mailto:`/`tel:`/anchor — renders an `<a>`. */
  href?: string;
  variant?: ButtonVariant;
  onDark?: boolean;
  /** Append a trailing arrow icon. */
  arrow?: boolean;
  /** Magnetic pull strength (0 disables). */
  magnetic?: number;
  className?: string;
  ariaLabel?: string;
  onClick?: MouseEventHandler<HTMLElement>;
}

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  navy: "btn-navy",
  ghost: "btn-ghost",
  gold: "btn-gold",
};

function isExternal(href: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(href);
}

/** Brand call-to-action: routes internally, links externally, with optional magnetic + arrow. */
export function Button({
  children,
  to,
  href,
  variant = "primary",
  onDark = false,
  arrow = false,
  magnetic = 0.3,
  className,
  ariaLabel,
  onClick,
}: ButtonProps) {
  const ref = useMagnetic<HTMLAnchorElement>(magnetic);
  const classes = [
    "btn",
    VARIANT_CLASS[variant],
    onDark ? "on-dark" : null,
    magnetic > 0 ? "magnetic" : null,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {children}
      {arrow ? <Icon name="arrow-right" /> : null}
    </>
  );

  if (to) {
    return (
      <Link ref={ref} to={to} className={classes} aria-label={ariaLabel} onClick={onClick}>
        {content}
      </Link>
    );
  }

  const external = href ? isExternal(href) : false;
  return (
    <a
      ref={ref}
      href={href ?? "#"}
      className={classes}
      aria-label={ariaLabel}
      onClick={onClick}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {content}
    </a>
  );
}
