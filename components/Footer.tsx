import FooterShareButtons from "./FooterShareButtons";
import Link from "next/link";

// Sentence-case headings, Inter, no // chrome. Cleaner grid layout.
export default function Footer() {
  return (
    <footer
      id="footer"
      className="mt-16 border-t border-border bg-panel/30 px-6 py-12"
    >
      <div className="max-w-[1480px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-8">
          <div>
            <div className="text-[14px] font-semibold text-text mb-3">
              About this mirror
            </div>
            <p className="text-[13px] leading-relaxed text-text-dim max-w-[42ch]">
              UAP.WATCH is an independent visualization layer for public
              records released by the U.S. Department of War on 2026-05-08
              under the Presidential Unsealing &amp; Reporting System for UAP
              Encounters (PURSUE) program. Source material remains hosted at
              war.gov/UFO/. Not affiliated with any U.S. government agency.
            </p>
            <div className="mt-3 text-[11px] font-medium tracking-[0.04em] uppercase text-text-mute">
              For informational purposes only
            </div>
          </div>

          <FooterColumn heading="Source">
            <FooterLink href="https://www.war.gov/UFO/" external>
              war.gov/UFO/
            </FooterLink>
            <FooterLink
              href="https://www.war.gov/News/Releases/Release/Article/4480582/"
              external
            >
              DoD press release
            </FooterLink>
            <FooterLink href="https://www.dvidshub.net/" external>
              DVIDS · video archive
            </FooterLink>
            <FooterLink href="https://vault.fbi.gov/UFO" external>
              FBI Vault · UFO files
            </FooterLink>
            <FooterLink
              href="https://huggingface.co/datasets/reducto/ufocr"
              external
            >
              OCR · Reducto UFOCR (CC BY 4.0)
            </FooterLink>
          </FooterColumn>

          <FooterColumn heading="Browse">
            <FooterLink href="/wiki/ufo-sightings">All sightings</FooterLink>
            <FooterLink href="/wiki/pentagon-ufo-files">PURSUE catalog</FooterLink>
            <FooterLink href="/agency/fbi">By agency</FooterLink>
            <FooterLink href="/year/2023">By year</FooterLink>
            <FooterLink href="/compare/gofast-vs-gimbal">Compare</FooterLink>
          </FooterColumn>

          <div>
            <div className="text-[14px] font-semibold text-text mb-3">
              Share this dossier
            </div>
            <FooterShareButtons />
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
          <div className="text-[11px] font-medium tracking-[0.04em] uppercase text-text-mute">
            © Independently operated · 2026 · No affiliation claimed
          </div>
          <div className="text-[11px] font-medium tracking-[0.04em] uppercase text-text-mute">
            Unclassified · UAP-Watch mirror · OBS-001
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-[14px] font-semibold text-text mb-3">{heading}</div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function FooterLink({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-[13px] text-text-dim hover:text-accent py-0.5"
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      href={href}
      className="block text-[13px] text-text-dim hover:text-accent py-0.5"
    >
      {children}
    </Link>
  );
}
