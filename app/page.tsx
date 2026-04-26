import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BackToTop } from "@/components/back-to-top";
import {
  ArrowRight,
  CheckCircle2,
  Circle,
  Clock,
  ExternalLink,
  Layers,
  Search,
  Users,
} from "lucide-react";

const phases = [
  {
    id: "4A",
    label: "Application Pick",
    status: "done" as const,
    href: "/",
    summary:
      "Chose n8n's workflow editor and Data Tables as the focus. Initial problems identified: poor Data Table discoverability, fragile CSV import, no execution caching, and inconsistent test-data support.",
  },
  {
    id: "4B",
    label: "State of the Art Analysis",
    status: "done" as const,
    href: "/4b",
    summary:
      "Heuristic evaluation (10 Nielsen heuristics, 14 issues found) + competitive analysis against Zapier and Make. 7 priority redesign opportunities identified.",
  },
  {
    id: "4C",
    label: "User Study",
    status: "upcoming" as const,
    href: null,
    summary:
      "Observational study: real users performing data-heavy workflow tasks in n8n. Individual sessions, think-aloud protocol.",
  },
  {
    id: "4D",
    label: "Redesign",
    status: "upcoming" as const,
    href: null,
    summary:
      "Iterative prototypes addressing highest-severity findings. Multiple rounds; paper sketches through mid-fi mockups.",
  },
];

const problems = [
  {
    severity: 3,
    title: "No execution caching",
    desc: "Every edit forces a full re-run — including expensive LLM/API calls — with no cost warning.",
  },
  {
    severity: 3,
    title: "Duplicate table names on copy",
    desc: "Duplicated Data Tables keep the same name, making them indistinguishable in dropdowns across the workflow.",
  },
  {
    severity: 3,
    title: "Stale pinned data silently persists",
    desc: "Unpinning test data reverts silently; users can work with stale data for long stretches without realising it.",
  },
  {
    severity: 2,
    title: "Data Tables buried in home screen",
    desc: "Not findable in the workflow editor — users must navigate back to the home screen to manage tables.",
  },
  {
    severity: 2,
    title: "Silent CSV import failures",
    desc: "Type mismatches during import produce no warning; columns silently fail or receive the wrong type.",
  },
  {
    severity: 2,
    title: "Destructive mode switch",
    desc: 'Switching "Input Data Mode" discards existing field content without any confirmation prompt.',
  },
];

function StatusIcon({ status }: { status: "done" | "upcoming" }) {
  if (status === "done")
    return <CheckCircle2 className="size-5 shrink-0 text-emerald-500" />;
  return <Circle className="size-5 shrink-0 text-muted-foreground/40" />;
}

function SeverityDot({ level }: { level: number }) {
  const colors =
    level === 3
      ? "bg-red-500"
      : level === 2
        ? "bg-amber-400"
        : "bg-muted-foreground/40";
  return <span className={`mt-1.5 size-2 shrink-0 rounded-full ${colors}`} />;
}

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* ── Hero ── */}
      <section className="border-b bg-secondary/20">
        <div className="mx-auto max-w-5xl px-4 py-16 lg:px-6 lg:py-24">
          <div className="max-w-2xl">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge
                variant="outline"
                className="bg-violet-100 text-violet-800 border-violet-200 dark:bg-violet-900/30 dark:text-violet-400 dark:border-violet-800 font-semibold"
              >
                Assignment 4
              </Badge>
              <span className="text-sm text-muted-foreground">
                Usability Engineering · UIUC
              </span>
            </div>

            <h1 className="mb-4 text-balance text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
              Analyzing &amp; Redesigning{" "}
              <a
                href="https://n8n.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-dotted underline-offset-4 hover:decoration-solid"
              >
                n8n
              </a>
              's Workflow Editor
            </h1>

            <p className="mb-8 text-base leading-relaxed text-muted-foreground">
              A solo usability study targeting the{" "}
              <strong className="text-foreground">
                workflow editor and Data Tables feature
              </strong>{" "}
              — data setup, CSV import, node testing, and execution flow for
              AI-assisted pipelines. Audience: novice-to-intermediate n8n users.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/4b">
                  4B — Analysis
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <a href="https://n8n.io/" target="_blank" rel="noopener noreferrer">
                  Visit n8n
                  <ExternalLink className="size-3.5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Phase Progress ── */}
      <section className="border-b">
        <div className="mx-auto max-w-5xl px-4 py-10 lg:px-6">
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Project Phases
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {phases.map((phase) => (
              <div
                key={phase.id}
                className={`rounded-lg border bg-card p-5 ${
                  phase.status === "upcoming" ? "opacity-55" : ""
                }`}
              >
                <div className="mb-3 flex items-start gap-3">
                  <StatusIcon status={phase.status} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge
                        variant="outline"
                        className="shrink-0 text-xs font-semibold bg-violet-100 text-violet-800 border-violet-200 dark:bg-violet-900/30 dark:text-violet-400 dark:border-violet-800"
                      >
                        {phase.id}
                      </Badge>
                      <span className="text-sm font-semibold text-foreground">
                        {phase.label}
                      </span>
                      {phase.status === "done" && (
                        <Badge
                          variant="outline"
                          className="shrink-0 text-xs bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800"
                        >
                          Done
                        </Badge>
                      )}
                      {phase.status === "upcoming" && (
                        <Badge variant="outline" className="shrink-0 text-xs text-muted-foreground">
                          Upcoming
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground pl-8">
                  {phase.summary}
                </p>
                {phase.href && (
                  <div className="pl-8">
                    <Button asChild variant="outline" size="sm">
                      <Link href={phase.href}>
                        View {phase.id}
                        <ArrowRight className="size-3.5" />
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Top Problems ── */}
      <section className="border-b">
        <div className="mx-auto max-w-5xl px-4 py-10 lg:px-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Top Issues Found (4B)
            </h2>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-red-500" /> High
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-amber-400" /> Medium
              </span>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {problems.map((p, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg border bg-card p-4">
                <SeverityDot level={p.severity} />
                <div>
                  <p className="text-sm font-semibold text-foreground">{p.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-right">
            <Link
              href="/4b"
              className="text-sm text-muted-foreground underline-offset-4 hover:underline hover:text-foreground transition-colors"
            >
              See full analysis →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Context Strip ── */}
      <section className="bg-secondary/20">
        <div className="mx-auto max-w-5xl px-4 py-10 lg:px-6">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent">
                <Search className="size-5 text-accent-foreground" />
              </div>
              <div>
                <h3 className="mb-1 text-sm font-semibold text-foreground">Focus Area</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Workflow Editor · Data Tables · CSV import · node testing · execution flow
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent">
                <Users className="size-5 text-accent-foreground" />
              </div>
              <div>
                <h3 className="mb-1 text-sm font-semibold text-foreground">Target Users</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Novice-to-intermediate builders of data-heavy or AI-assisted n8n workflows
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent">
                <Layers className="size-5 text-accent-foreground" />
              </div>
              <div>
                <h3 className="mb-1 text-sm font-semibold text-foreground">Methods</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Heuristic eval · Competitive analysis · Think-aloud user study · Iterative redesign
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BackToTop />
    </div>
  );
}
