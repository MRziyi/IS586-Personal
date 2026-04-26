import Link from "next/link";
import { getContentFiles } from "@/lib/content";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BackToTop } from "@/components/back-to-top";
import { StatusBadge, PhaseBadge } from "@/components/status-badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Versions",
};

export default function VersionsPage() {
  const versions = getContentFiles("versions");

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <Breadcrumbs items={[{ label: "Versions" }]} />

      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">
          Design Versions
        </h1>
        <p className="text-lg text-muted-foreground">
          Significant redesign iterations across all phases. Each version
          documents what changed and why.
        </p>
      </div>

      {versions.length === 0 ? (
        <div className="rounded-lg border border-dashed p-12 text-center">
          <p className="text-muted-foreground">
            No versions published yet. Versions will appear here starting from
            Phase 3C.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {versions.map((version) => (
            <Card key={version.slug} className="group transition-colors hover:border-foreground/20">
              <CardHeader>
                <div className="flex flex-wrap items-center gap-2">
                  {version.frontmatter.phase && (
                    <PhaseBadge phase={version.frontmatter.phase} />
                  )}
                  {version.frontmatter.status && (
                    <StatusBadge status={version.frontmatter.status} />
                  )}
                  {version.frontmatter.date && (
                    <span className="text-xs text-muted-foreground">
                      {version.frontmatter.date}
                    </span>
                  )}
                </div>
                <CardTitle className="text-lg">
                  {version.frontmatter.title}
                </CardTitle>
                <CardDescription>
                  {version.content.trim().slice(0, 160).replace(/^#+\s.*$/m, "").trim()}...
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {version.frontmatter.tags?.map((tag: string) => (
                    <span
                      key={tag}
                      className="rounded bg-secondary px-2 py-0.5 text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="mt-4 -ml-3"
                >
                  <Link href={`/versions/${version.slug}`}>
                    View Details
                    <ArrowRight className="size-3.5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <BackToTop />
    </div>
  );
}
