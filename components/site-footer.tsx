import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t bg-secondary/30">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8 lg:px-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-foreground">n8n Usability Study</p>
          <p className="text-xs text-muted-foreground">
            Ziyi Zhang · Usability Engineering · UIUC · Assignment 4
          </p>
        </div>
        <nav className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">Overview</Link>
          <Link href="/4b" className="transition-colors hover:text-foreground">4B — Analysis</Link>
          <Link href="/4c" className="transition-colors hover:text-foreground">4C — User Study</Link>
          <a
            href="https://n8n.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            n8n
          </a>
        </nav>
      </div>
    </footer>
  );
}
