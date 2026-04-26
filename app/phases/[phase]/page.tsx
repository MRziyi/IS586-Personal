import { notFound } from "next/navigation";
import Link from "next/link";
import { getContentFile, getSiteConfig } from "@/lib/content";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BackToTop } from "@/components/back-to-top";
import { StatusBadge, PhaseBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Copy, ChevronLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

const phaseOrder = ["3a", "3b", "3c", "3d", "3e", "3f"];
const phaseLabels: Record<string, string> = {
  "3a": "3A — Setup",
  "3b": "3B — User Study",
  "3c": "3C — First Redesigns",
  "3d": "3D — Peer Comments",
  "3e": "3E — Group Reply",
  "3f": "3F — Final Redesigns",
};

export function generateStaticParams() {
  return phaseOrder.map((phase) => ({ phase }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ phase: string }>;
}): Promise<Metadata> {
  const { phase } = await params;
  const content = getContentFile(`phases/${phase}.md`);
  return {
    title: content?.frontmatter.title ?? `Phase ${phase.toUpperCase()}`,
  };
}

export default async function PhasePage({
  params,
}: {
  params: Promise<{ phase: string }>;
}) {
  const { phase } = await params;

  if (!phaseOrder.includes(phase)) notFound();

  const content = getContentFile(`phases/${phase}.md`);
  if (!content) notFound();

  const config = getSiteConfig();
  const currentIndex = phaseOrder.indexOf(phase);
  const prevPhase = currentIndex > 0 ? phaseOrder[currentIndex - 1] : null;
  const nextPhase =
    currentIndex < phaseOrder.length - 1 ? phaseOrder[currentIndex + 1] : null;

  const relatedLinks = content.frontmatter.relatedLinks ?? [];

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 lg:px-6">
      <Breadcrumbs
        items={[
          { label: "Phases", href: "/phases/3a" },
          { label: phaseLabels[phase] ?? phase.toUpperCase() },
        ]}
      />

      {/* Header */}
      <div className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <PhaseBadge phase={phase.toUpperCase()} />
          <StatusBadge status={content.frontmatter.status ?? "Not started"} />
          {content.frontmatter.date && (
            <span className="text-sm text-muted-foreground">
              {content.frontmatter.date}
            </span>
          )}
        </div>
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">
          {content.frontmatter.title}
        </h1>
      </div>

      {/* Artifacts & Links */}
      {relatedLinks.length > 0 && (
        <div className="mb-8 rounded-lg border bg-card p-4">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Artifacts & Links
          </h2>
          <div className="flex flex-wrap gap-2">
            {relatedLinks.map((link: { label: string; url: string }) => (
              <Button
                key={link.label}
                asChild
                variant="outline"
                size="sm"
              >
                <a
                  href={link.url}
                  target={link.url.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.url.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                >
                  {link.label}
                  {link.url.startsWith("http") && (
                    <ExternalLink className="size-3" />
                  )}
                </a>
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Markdown Content */}
      <MarkdownRenderer content={content.content} />

      {/* Phase Navigation */}
      <div className="mt-12 flex items-center justify-between border-t pt-6">
        {prevPhase ? (
          <Button asChild variant="ghost" size="sm">
            <Link href={`/phases/${prevPhase}`}>
              <ChevronLeft className="size-4" />
              {phaseLabels[prevPhase]}
            </Link>
          </Button>
        ) : (
          <span />
        )}
        {nextPhase ? (
          <Button asChild variant="ghost" size="sm">
            <Link href={`/phases/${nextPhase}`}>
              {phaseLabels[nextPhase]}
              <ChevronRight className="size-4" />
            </Link>
          </Button>
        ) : (
          <span />
        )}
      </div>

      <BackToTop />
    </div>
  );
}
