import { getContentFile, getSiteConfig } from "@/lib/content";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BackToTop } from "@/components/back-to-top";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Target Site",
};

export default function TargetSitePage() {
  const config = getSiteConfig();
  const content = getContentFile("target-site.md");

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 lg:px-6">
      <Breadcrumbs items={[{ label: "Target Site" }]} />

      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">
          {config.targetName}
        </h1>
        <p className="mb-4 text-lg text-muted-foreground">
          Our target product for the usability makeover
        </p>
        <Button asChild variant="outline" size="sm">
          <a
            href={config.targetUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open {config.targetName}
            <ExternalLink className="size-3.5" />
          </a>
        </Button>
      </div>

      {content ? (
        <MarkdownRenderer content={content.content} />
      ) : (
        <p className="text-muted-foreground">Content not found.</p>
      )}

      <BackToTop />
    </div>
  );
}
