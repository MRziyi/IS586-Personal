import { getContentFile } from "@/lib/content";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BackToTop } from "@/components/back-to-top";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources",
};

export default function ResourcesPage() {
  const content = getContentFile("resources.md");

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 lg:px-6">
      <Breadcrumbs items={[{ label: "Resources" }]} />

      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">
          Resources
        </h1>
        <p className="text-lg text-muted-foreground">
          Links to course materials, tools, and team resources.
        </p>
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
