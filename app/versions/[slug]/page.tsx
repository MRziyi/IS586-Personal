import { notFound } from "next/navigation";
import Link from "next/link";
import { getContentFile, getContentFiles } from "@/lib/content";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BackToTop } from "@/components/back-to-top";
import { StatusBadge, PhaseBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";

export function generateStaticParams() {
  const versions = getContentFiles("versions");
  return versions.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const content = getContentFile(`versions/${slug}.md`);
  return {
    title: content?.frontmatter.title ?? "Version",
  };
}

export default async function VersionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = getContentFile(`versions/${slug}.md`);
  if (!content) notFound();

  const relatedLinks = content.frontmatter.relatedLinks ?? [];

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 lg:px-6">
      <Breadcrumbs
        items={[
          { label: "Versions", href: "/versions" },
          { label: content.frontmatter.title },
        ]}
      />

      <div className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {content.frontmatter.phase && (
            <PhaseBadge phase={content.frontmatter.phase} />
          )}
          {content.frontmatter.status && (
            <StatusBadge status={content.frontmatter.status} />
          )}
          {content.frontmatter.date && (
            <span className="text-sm text-muted-foreground">
              {content.frontmatter.date}
            </span>
          )}
        </div>
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">
          {content.frontmatter.title}
        </h1>
        {content.frontmatter.tags && (
          <div className="mt-3 flex flex-wrap gap-2">
            {content.frontmatter.tags.map((tag: string) => (
              <span
                key={tag}
                className="rounded bg-secondary px-2 py-0.5 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {relatedLinks.length > 0 && (
        <div className="mb-8 rounded-lg border bg-card p-4">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Artifacts & Links
          </h2>
          <div className="flex flex-wrap gap-2">
            {relatedLinks.map((link: { label: string; url: string }) => (
              <Button key={link.label} asChild variant="outline" size="sm">
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

      <MarkdownRenderer content={content.content} />

      <div className="mt-12 border-t pt-6">
        <Button asChild variant="ghost" size="sm">
          <Link href="/versions">Back to All Versions</Link>
        </Button>
      </div>

      <BackToTop />
    </div>
  );
}
