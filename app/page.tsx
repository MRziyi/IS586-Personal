import Link from "next/link";
import { getSiteConfig, getAllPhases, getLatestUpdate } from "@/lib/content";
import { StatusBadge, PhaseBadge } from "@/components/status-badge";
import { BackToTop } from "@/components/back-to-top";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ArrowRight,
  ExternalLink,
  FileText,
  Users,
  Clock,
  BarChart3,
} from "lucide-react";

export default function HomePage() {
  const config = getSiteConfig();
  const phases = getAllPhases();
  const latestUpdate = getLatestUpdate();

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="border-b bg-secondary/20">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-6 lg:py-24">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-2">
              <span className="inline-block rounded-md bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground">
                Assignment 3
              </span>
              <span className="text-sm text-muted-foreground">
                Usability Engineering
              </span>
            </div>
            <h1 className="mb-4 text-balance text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
              {config.title}
            </h1>
            <p className="mb-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              We operate as a UX consulting team analyzing a legacy product and
              iteratively redesigning it. Our focus: the report creation &amp;
              editing flow in Google Looker Studio.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild>
                <Link href="/phases/3c">
                  Read Plan (3C)
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/versions">Jump to Latest Version</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="/billing">Billing Summary</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Phase Status Strip */}
      <section className="border-b">
        <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Phase Progress
          </h2>
          <div className="flex flex-wrap gap-3">
            {phases.map((phase) => (
              <Link
                key={phase.slug}
                href={`/phases/${phase.slug}`}
                className="group flex items-center gap-2 rounded-lg border bg-card p-3 transition-colors hover:border-foreground/20 hover:bg-secondary/50"
              >
                <PhaseBadge phase={phase.frontmatter.phase!} />
                <span className="text-sm font-medium text-foreground">
                  {phase.frontmatter.title?.replace(/^Phase \w+ — /, "")}
                </span>
                <StatusBadge status={phase.frontmatter.status!} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Cards */}
      <section className="mx-auto w-full max-w-7xl px-4 py-12 lg:px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Target Product */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <BarChart3 className="size-4 text-accent" />
                Target Product
              </CardTitle>
              <CardDescription>The product we are redesigning</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                <strong className="text-foreground">{config.targetName}</strong>{" "}
                — A web-based data visualization and reporting tool by Google.
              </p>
              <div className="flex items-center gap-3">
                <Button asChild variant="outline" size="sm">
                  <a
                    href={config.targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Site
                    <ExternalLink className="size-3" />
                  </a>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/target-site">Learn More</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* How We Work */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Users className="size-4 text-accent" />
                How We Work
              </CardTitle>
              <CardDescription>
                Our collaboration approach
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="size-1.5 shrink-0 rounded-full bg-accent" />
                  GitHub for version control
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-1.5 shrink-0 rounded-full bg-accent" />
                  WhatsApp for communication
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-1.5 shrink-0 rounded-full bg-accent" />
                  Google Sheet timesheet
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-1.5 shrink-0 rounded-full bg-accent" />
                  Weekly meetings with logged notes
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Latest Update */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Clock className="size-4 text-accent" />
                Latest Update
              </CardTitle>
              <CardDescription>
                {latestUpdate?.frontmatter.date ?? "No updates yet"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {latestUpdate ? (
                <>
                  <p className="mb-3 text-sm font-medium text-foreground">
                    {latestUpdate.frontmatter.title}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {latestUpdate.content.trim().slice(0, 200)}
                    {latestUpdate.content.trim().length > 200 ? "..." : ""}
                  </p>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Updates will appear here as the project progresses.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Team Members Strip */}
      <section className="border-t bg-secondary/20">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Team {config.teamName}
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {config.members.map((member) => (
                <span
                  key={member.name}
                  className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm font-medium text-foreground"
                >
                  <span className="flex size-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                    {member.name.charAt(0)}
                  </span>
                  {member.name}
                </span>
              ))}
            </div>
            <Button asChild variant="link" size="sm">
              <Link href="/team">
                View Team Details
                <ArrowRight className="size-3" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <BackToTop />
    </div>
  );
}
