import Link from "next/link";
import { BackToTop } from "@/components/back-to-top";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, ExternalLink, Search, User } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Assignment 4 — n8n Usability Redesign",
};

const phases = [
  {
    id: "4A",
    title: "Application Pick",
    status: "Done",
    href: "/assignment4",
    description:
      "Chose n8n's workflow editor and Data Tables feature as the subject for redesign. Identified key usability problems: poor Data Table discoverability, fragile CSV import, and no execution caching.",
    color:
      "bg-violet-100 text-violet-800 border-violet-200 dark:bg-violet-900/30 dark:text-violet-400 dark:border-violet-800",
  },
  {
    id: "4B",
    title: "State of the Art Analysis",
    status: "Done",
    href: "/assignment4/4b",
    description:
      "Heuristic evaluation of n8n using Nielsen's 10 heuristics, plus competitive analysis against Zapier and Make. Identified 14 usability problems and 7 priority redesign opportunities.",
    color:
      "bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200 dark:bg-fuchsia-900/30 dark:text-fuchsia-400 dark:border-fuchsia-800",
  },
  {
    id: "4C",
    title: "User Study",
    status: "In progress",
    href: "#",
    description:
      "Observational study with real users performing data-heavy workflow tasks in n8n. Each team member conducts their own study session.",
    color:
      "bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-900/30 dark:text-sky-400 dark:border-sky-800",
  },
  {
    id: "4D",
    title: "Redesign",
    status: "Not started",
    href: "#",
    description:
      "Iterative redesign prototypes addressing the highest-severity issues found in the heuristic evaluation and user study.",
    color:
      "bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-900/30 dark:text-teal-400 dark:border-teal-800",
  },
];

const statusStyle: Record<string, string> = {
  Done: "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800",
  "In progress":
    "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800",
  "Not started": "bg-secondary text-muted-foreground border-border",
};

export default function Assignment4Page() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="border-b bg-secondary/20">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-6 lg:py-20">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-2">
              <span className="inline-block rounded-md bg-violet-100 px-2.5 py-1 text-xs font-semibold text-violet-800 dark:bg-violet-900/30 dark:text-violet-300">
                Assignment 4
              </span>
              <span className="text-sm text-muted-foreground">Usability Engineering</span>
            </div>
            <h1 className="mb-4 text-balance text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
              Analyzing &amp; Redesigning n8n's Workflow Editor
            </h1>
            <p className="mb-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              A solo usability study of{" "}
              <a
                href="https://n8n.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                n8n
              </a>
              , focusing on the workflow editor's data setup and testing experience — particularly
              the Data Tables feature, CSV import, node testing, and execution flow.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild>
                <Link href="/assignment4/4b">
                  Read 4B Analysis
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

      {/* Phase Progress */}
      <section className="border-b">
        <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Phase Progress
          </h2>
          <div className="flex flex-wrap gap-3">
            {phases.map((phase) => (
              <Link
                key={phase.id}
                href={phase.href}
                className="group flex items-center gap-2 rounded-lg border bg-card p-3 transition-colors hover:border-foreground/20 hover:bg-secondary/50"
              >
                <Badge variant="outline" className={`text-xs font-semibold ${phase.color}`}>
                  {phase.id}
                </Badge>
                <span className="text-sm font-medium text-foreground">{phase.title}</span>
                <Badge
                  variant="outline"
                  className={`text-xs font-medium ${statusStyle[phase.status]}`}
                >
                  {phase.status}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Phase Cards */}
      <section className="mx-auto w-full max-w-7xl px-4 py-12 lg:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          {phases.map((phase) => (
            <Card key={phase.id} className={phase.href === "#" ? "opacity-60" : ""}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-2 text-base">
                  <span className="flex items-center gap-2">
                    <Badge variant="outline" className={`text-xs font-semibold ${phase.color}`}>
                      {phase.id}
                    </Badge>
                    {phase.title}
                  </span>
                  <Badge
                    variant="outline"
                    className={`text-xs font-medium ${statusStyle[phase.status]}`}
                  >
                    {phase.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {phase.description}
                </p>
                {phase.href !== "#" && (
                  <Button asChild variant="outline" size="sm">
                    <Link href={phase.href}>
                      View {phase.id}
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Context strip */}
      <section className="border-t bg-secondary/20">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent">
                <Search className="size-5 text-accent-foreground" />
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-foreground">Focus Area</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Workflow editor for setting up data and testing workflows — specifically Data
                  Tables, CSV import, node testing with pinned/mock data, and execution flow for
                  AI/LLM-assisted pipelines.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent">
                <User className="size-5 text-accent-foreground" />
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-foreground">Target Users</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Novice to intermediate users who build data-heavy or AI-assisted workflows in
                  n8n. Not expert developers — users who rely on the GUI and expect familiar
                  spreadsheet-like interactions.
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
