import Link from "next/link";
import { getSiteConfig } from "@/lib/content";

export function SiteFooter() {
  const config = getSiteConfig();

  return (
    <footer className="border-t bg-secondary/30">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 lg:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              {config.teamName}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              UX consulting team analyzing and redesigning {config.targetName} for Usability Engineering, Assignment 3.
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              Pages
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-foreground transition-colors">Overview</Link></li>
              <li><Link href="/target-site" className="hover:text-foreground transition-colors">Target Site</Link></li>
              <li><Link href="/versions" className="hover:text-foreground transition-colors">Versions</Link></li>
              <li><Link href="/feedback" className="hover:text-foreground transition-colors">Feedback</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              Phases
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li><Link href="/phases/3a" className="hover:text-foreground transition-colors">3A — Setup</Link></li>
              <li><Link href="/phases/3b" className="hover:text-foreground transition-colors">3B — User Study</Link></li>
              <li><Link href="/phases/3c" className="hover:text-foreground transition-colors">3C — Redesigns</Link></li>
              <li><Link href="/phases/3f" className="hover:text-foreground transition-colors">3F — Final</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              Links
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li><Link href="/billing" className="hover:text-foreground transition-colors">Billing</Link></li>
              <li><Link href="/team" className="hover:text-foreground transition-colors">Team</Link></li>
              <li><Link href="/resources" className="hover:text-foreground transition-colors">Resources</Link></li>
              <li><a href={config.targetUrl} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Google Looker Studio</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t pt-6 text-center text-xs text-muted-foreground">
          Team {config.teamName} &middot; Usability Engineering &middot; Assignment 3
        </div>
      </div>
    </footer>
  );
}
