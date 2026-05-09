// Shared shell for all programmatic SEO pages — incident, document, video,
// year, region, agency, FAQ, wiki. Consistent header, breadcrumbs, related-
// links footer. Matches the Palantir Blueprint dark aesthetic of the home
// page so the site reads as one coherent product to both humans and crawlers.

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = { name: string; href: string };

type Props = {
  title: string;
  eyebrow?: string;
  subtitle?: string;
  crumbs: Crumb[];
  children: React.ReactNode;
  asideRight?: React.ReactNode;
};

export default function PageShell({
  title,
  eyebrow,
  subtitle,
  crumbs,
  children,
  asideRight,
}: Props) {
  return (
    <article className="mx-auto max-w-[1480px] px-6 pt-16 pb-24">
      <nav
        aria-label="Breadcrumb"
        className="text-text-mute text-[10px] tracking-[0.25em] flex items-center flex-wrap gap-x-1.5 gap-y-1 pt-2 pb-6"
      >
        {crumbs.map((c, i) => (
          <span key={c.href} className="flex items-center gap-x-1.5">
            {i > 0 && <ChevronRight size={10} className="opacity-50" />}
            {i === crumbs.length - 1 ? (
              <span className="text-text-dim">{c.name.toUpperCase()}</span>
            ) : (
              <Link href={c.href} className="hover:text-accent">
                {c.name.toUpperCase()}
              </Link>
            )}
          </span>
        ))}
      </nav>

      <header className="hairline-b pb-8 mb-10">
        {eyebrow && (
          <div className="text-accent text-[10px] tracking-[0.3em] mb-3">
            // {eyebrow.toUpperCase()} //
          </div>
        )}
        <h1
          className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-text"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-text-dim text-base sm:text-lg leading-relaxed max-w-[72ch]">
            {subtitle}
          </p>
        )}
      </header>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 prose-uap">{children}</div>
        {asideRight && (
          <aside className="col-span-12 lg:col-span-4">{asideRight}</aside>
        )}
      </div>
    </article>
  );
}

export function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="border-l-2 border-accent pl-5 my-8 py-2">
      <p
        className="text-text text-lg sm:text-xl leading-snug italic"
        style={{ fontFamily: "var(--font-display)" }}
      >
        “{children}”
      </p>
    </blockquote>
  );
}

export function FactRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[120px_1fr] gap-4 py-2.5 hairline-b last:border-b-0 text-sm">
      <div className="text-text-mute text-[10px] tracking-[0.2em] pt-0.5">
        {label.toUpperCase()}
      </div>
      <div className="text-text-dim">{value}</div>
    </div>
  );
}

export function RelatedLinks({
  heading = "Related",
  items,
}: {
  heading?: string;
  items: Array<{ href: string; title: string; sub?: string }>;
}) {
  if (items.length === 0) return null;
  return (
    <section className="mt-12 pt-8 hairline-t">
      <div className="text-text-mute text-[10px] tracking-[0.25em] mb-4">
        // {heading.toUpperCase()} //
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="block bg-panel border border-border hover:border-accent rounded-sm p-4 transition-colors group"
            >
              <div className="text-text-dim group-hover:text-accent text-sm tracking-wide">
                {item.title}
              </div>
              {item.sub && (
                <div className="text-text-mute text-[10px] tracking-widest mt-1.5">
                  {item.sub}
                </div>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function SourceList({
  sources,
}: {
  sources: Array<{ label: string; url: string }>;
}) {
  if (sources.length === 0) return null;
  return (
    <section className="mt-10 pt-6 hairline-t">
      <div className="text-text-mute text-[10px] tracking-[0.25em] mb-3">
        // PRIMARY SOURCES //
      </div>
      <ul className="space-y-1.5 text-sm">
        {sources.map((s) => (
          <li key={s.url}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-dim hover:text-accent inline-flex items-center gap-2"
            >
              <span className="text-accent">▸</span>
              <cite className="not-italic">{s.label}</cite>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
