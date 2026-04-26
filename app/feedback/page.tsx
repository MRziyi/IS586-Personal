import { getContentFiles } from "@/lib/content";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BackToTop } from "@/components/back-to-top";
import { PhaseBadge } from "@/components/status-badge";
import { TbdCallout } from "@/components/tbd-callout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feedback",
};

export default function FeedbackPage() {
  const received = getContentFiles("feedback/received");
  const responses = getContentFiles("feedback/responses");

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <Breadcrumbs items={[{ label: "Feedback" }]} />

      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">
          Feedback
        </h1>
        <p className="text-lg text-muted-foreground">
          Peer comments received (Phase 3D) and our responses (Phase 3E).
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Feedback Received */}
        <div>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
            <PhaseBadge phase="3D" />
            Feedback Received
          </h2>
          {received.length === 0 ? (
            <TbdCallout>
              No feedback received yet. Feedback will appear here during Phase 3D.
            </TbdCallout>
          ) : (
            <div className="flex flex-col gap-6">
              {received.map((item) => (
                <div
                  key={item.slug}
                  className="rounded-lg border bg-card p-5"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-foreground">
                      {item.frontmatter.title}
                    </h3>
                    {item.frontmatter.date && (
                      <span className="text-xs text-muted-foreground">
                        {item.frontmatter.date}
                      </span>
                    )}
                  </div>
                  <MarkdownRenderer content={item.content} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Our Responses */}
        <div>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
            <PhaseBadge phase="3E" />
            Our Responses
          </h2>
          {responses.length === 0 ? (
            <TbdCallout>
              No responses published yet. Responses will appear here during Phase 3E.
            </TbdCallout>
          ) : (
            <div className="flex flex-col gap-6">
              {responses.map((item) => (
                <div
                  key={item.slug}
                  className="rounded-lg border bg-card p-5"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-foreground">
                      {item.frontmatter.title}
                    </h3>
                    {item.frontmatter.date && (
                      <span className="text-xs text-muted-foreground">
                        {item.frontmatter.date}
                      </span>
                    )}
                  </div>
                  <MarkdownRenderer content={item.content} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* What Changed Section */}
      <div className="mt-12 border-t pt-8">
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          What Changed Because of Feedback
        </h2>
        <TbdCallout>
          This section will summarize design changes driven by peer feedback.
          Links to specific versions will be added after Phase 3E/3F.
        </TbdCallout>
      </div>

      <BackToTop />
    </div>
  );
}
