import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BackToTop } from "@/components/back-to-top";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "4B — State of the Art Analysis",
};

function SeverityBadge({ level }: { level: 1 | 2 | 3 }) {
  const styles = {
    1: "bg-secondary text-muted-foreground border-border",
    2: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800",
    3: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800",
  };
  return (
    <Badge variant="outline" className={cn("shrink-0 text-xs font-semibold", styles[level])}>
      Severity {level}
    </Badge>
  );
}

function HeuristicCard({
  id,
  title,
  issues,
}: {
  id: string;
  title: string;
  issues: { severity: 1 | 2 | 3; text: string }[];
}) {
  return (
    <div className="rounded-lg border bg-card p-5">
      <div className="mb-4 flex items-start gap-3">
        <span className="shrink-0 rounded bg-accent px-2 py-0.5 text-xs font-bold text-accent-foreground">
          {id}
        </span>
        <h3 className="text-sm font-semibold leading-snug text-foreground">{title}</h3>
      </div>
      <div className="flex flex-col gap-3">
        {issues.map((issue, i) => (
          <div key={i} className="flex items-start gap-3">
            <SeverityBadge level={issue.severity} />
            <p className="text-sm leading-relaxed text-muted-foreground">{issue.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const heuristics = [
  {
    id: "H1",
    title: "Visibility of System Status",
    issues: [
      {
        severity: 3 as const,
        text: "No execution caching. Even minor edits require re-running the entire workflow. There is no indication of which nodes have stale vs. fresh data. LLM nodes re-run costs real money with no warning.",
      },
      {
        severity: 2 as const,
        text: "When importing CSV data into a Data Table, columns silently fail or get the wrong type if the format doesn't match. No preview or validation feedback before committing the import.",
      },
    ],
  },
  {
    id: "H2",
    title: "Match Between System and the Real World",
    issues: [
      {
        severity: 2 as const,
        text: 'The "Data Tables" feature is hidden behind a small sidebar tab on the home screen. In the workflow editor, users must search "data table" in the node picker — it is not under any intuitive category (not Data Transformation, Core, or Action in an app).',
      },
    ],
  },
  {
    id: "H3",
    title: "User Control and Freedom",
    issues: [
      {
        severity: 3 as const,
        text: "Duplicating a Data Table gives the duplicate the same name as the original, making them indistinguishable in dropdown selectors. To rename or fix a table, users must re-import from scratch — all manual edits are lost. No undo or versioning.",
      },
      {
        severity: 2 as const,
        text: 'Switching "Input Data Mode" on a node (e.g., expression → fixed) silently discards previously entered content (such as a Profile ID) with no warning or confirmation.',
      },
      {
        severity: 2 as const,
        text: 'The Filter node has no "Reset" or "Clear all conditions" button. Users must manually delete each condition one by one.',
      },
    ],
  },
  {
    id: "H4",
    title: "Consistency and Standards",
    issues: [
      {
        severity: 2 as const,
        text: "The Switch node only works with live trigger data — it cannot be tested with mock/pinned data to simulate different branches. This is inconsistent with other nodes that support pinned test data.",
      },
    ],
  },
  {
    id: "H5",
    title: "Error Prevention",
    issues: [
      {
        severity: 3 as const,
        text: "Unpinning test data on a node silently reverts to requiring a manual re-run to refresh, with no prompt to update. Users can easily work with stale data without realizing it.",
      },
      {
        severity: 2 as const,
        text: "Importing a CSV into an existing Data Table with a conflicting schema does not warn the user — it simply fails or produces unexpected results.",
      },
    ],
  },
  {
    id: "H6",
    title: "Recognition Rather Than Recall",
    issues: [
      {
        severity: 2 as const,
        text: "Data Tables are only accessible from the home screen sidebar, not from within the workflow editor context. Users must remember to navigate back to the home screen to manage tables, breaking their editing flow.",
      },
    ],
  },
  {
    id: "H7",
    title: "Flexibility and Efficiency of Use",
    issues: [
      {
        severity: 3 as const,
        text: "No execution caching. Any modification to a downstream node forces a complete re-execution from the trigger. For workflows with API calls or LLM nodes, this wastes time and money. No shortcuts to re-run from a specific node onward.",
      },
    ],
  },
  {
    id: "H8",
    title: "Aesthetic and Minimalist Design",
    issues: [
      {
        severity: 1 as const,
        text: "The Data Table node configuration panel lists 11 actions (7 Row Actions + 4 Table Actions) in a flat list. For new users it can be overwhelming to find the right action.",
      },
    ],
  },
  {
    id: "H9",
    title: "Help Users Recognize, Diagnose, and Recover from Errors",
    issues: [
      {
        severity: 2 as const,
        text: "When a CSV import fails due to type mismatch, the error message does not explain which column or value caused the issue, nor does it suggest how to fix it.",
      },
    ],
  },
  {
    id: "H10",
    title: "Help and Documentation",
    issues: [
      {
        severity: 1 as const,
        text: "Data Table documentation is sparse. Help links within the node configuration panel are generic and do not explain common pitfalls (e.g., duplicate names, CSV format requirements).",
      },
    ],
  },
];

const comparisonRows = [
  {
    feature: "Data Table discoverability",
    n8n: "Hidden in sidebar tab",
    zapier: "Top-level navigation item",
    make: "Top-level sidebar + in-scenario access",
    n8nScore: "bad",
    zapierScore: "good",
    makeScore: "good",
  },
  {
    feature: "Table creation UX",
    n8n: "Manual, rigid CSV import",
    zapier: "Spreadsheet UI with preview",
    make: "Wizard with explicit schema",
    n8nScore: "bad",
    zapierScore: "good",
    makeScore: "good",
  },
  {
    feature: "Duplicate naming",
    n8n: "Same name, no distinction",
    zapier: 'Auto-appends "(copy)"',
    make: 'Auto-appends "(copy)"',
    n8nScore: "bad",
    zapierScore: "good",
    makeScore: "good",
  },
  {
    feature: "Schema editing after creation",
    n8n: "Must re-import (lose edits)",
    zapier: "Inline column type changes",
    make: "Modify structure anytime",
    n8nScore: "bad",
    zapierScore: "good",
    makeScore: "good",
  },
  {
    feature: "Per-node/step testing",
    n8n: "Must re-run entire workflow",
    zapier: "Test each step individually",
    make: "Run individual modules",
    n8nScore: "bad",
    zapierScore: "good",
    makeScore: "good",
  },
  {
    feature: "Execution caching",
    n8n: "None",
    zapier: "Persists test results",
    make: "Partial (per-module)",
    n8nScore: "bad",
    zapierScore: "good",
    makeScore: "mid",
  },
  {
    feature: "Filter reset",
    n8n: "No reset button",
    zapier: "Clear all filters",
    make: "Reset option available",
    n8nScore: "bad",
    zapierScore: "good",
    makeScore: "good",
  },
  {
    feature: "Workflow model flexibility",
    n8n: "Flexible node graph",
    zapier: "Linear steps only",
    make: "Circular graph",
    n8nScore: "good",
    zapierScore: "bad",
    makeScore: "mid",
  },
  {
    feature: "Cost model",
    n8n: "Free (self-hosted)",
    zapier: "Per-task pricing",
    make: "Per-operation pricing",
    n8nScore: "good",
    zapierScore: "bad",
    makeScore: "bad",
  },
  {
    feature: "Target user",
    n8n: "Power users / developers",
    zapier: "Non-technical users",
    make: "Intermediate users",
    n8nScore: "mid",
    zapierScore: "good",
    makeScore: "mid",
  },
];

function cellStyle(score: string) {
  if (score === "good")
    return "bg-emerald-50 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300";
  if (score === "bad")
    return "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300";
  return "bg-amber-50 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300";
}

const takeaways = [
  {
    title: "Make Data Tables a first-class citizen",
    detail:
      "Add Data Tables to the workflow editor sidebar and node picker categories, not just the home screen.",
  },
  {
    title: "Add CSV import preview and schema validation",
    detail:
      "Show a mapping step with type detection before committing an import.",
  },
  {
    title: "Auto-differentiate duplicated table names",
    detail: 'Append "(copy)" or a number to duplicated table names.',
  },
  {
    title: "Add per-node execution / caching",
    detail:
      "Allow re-running from a specific node onward, caching upstream results. Critical for cost-sensitive LLM workflows.",
  },
  {
    title: 'Add a "Reset filters" button',
    detail: "A simple quality-of-life improvement with high impact for power users.",
  },
  {
    title: "Warn before destructive actions",
    detail:
      "When switching input data mode, warn the user that existing content will be lost.",
  },
  {
    title: "Support mock data for Switch nodes",
    detail:
      "Allow simulating different branches with pinned/test data, consistent with other node types.",
  },
];

export default function Assignment4BPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 lg:px-6">
      <Breadcrumbs
        items={[
          { label: "Assignment 4", href: "/assignment4" },
          { label: "4B — State of the Art Analysis" },
        ]}
      />

      {/* Header */}
      <div className="mb-10">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className="bg-violet-100 text-violet-800 border-violet-200 dark:bg-violet-900/30 dark:text-violet-400 dark:border-violet-800 text-xs font-semibold"
          >
            Phase 4B
          </Badge>
          <Badge
            variant="outline"
            className="bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800 text-xs font-medium"
          >
            Done
          </Badge>
          <span className="text-sm text-muted-foreground">April 2026</span>
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground">
          Assignment 4B: Analysis of the State of the Art
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
          A heuristic evaluation of n8n's workflow editor and Data Tables feature, followed by a
          competitive analysis comparing n8n against Zapier and Make (formerly Integromat).
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <a
            href="https://n8n.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border bg-card px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            n8n <ExternalLink className="size-3 text-muted-foreground" />
          </a>
          <a
            href="https://zapier.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border bg-card px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Zapier <ExternalLink className="size-3 text-muted-foreground" />
          </a>
          <a
            href="https://www.make.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border bg-card px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Make <ExternalLink className="size-3 text-muted-foreground" />
          </a>
        </div>
      </div>

      {/* Severity Legend */}
      <div className="mb-8 flex flex-wrap items-center gap-4 rounded-lg border bg-secondary/30 px-4 py-3 text-sm">
        <span className="font-medium text-foreground">Severity scale:</span>
        <span className="flex items-center gap-1.5">
          <SeverityBadge level={1} /> Low — minor inconvenience
        </span>
        <span className="flex items-center gap-1.5">
          <SeverityBadge level={2} /> Medium — disrupts workflow
        </span>
        <span className="flex items-center gap-1.5">
          <SeverityBadge level={3} /> High — causes failures or wastes money
        </span>
      </div>

      {/* Section 1: Heuristic Analysis */}
      <section className="mb-12" id="heuristic-analysis">
        <h2 className="mb-1 text-xl font-bold tracking-tight text-foreground">
          1. Heuristic Analysis of n8n
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Evaluated using Nielsen's 10 Usability Heuristics, focused on the workflow editor,
          Data Tables, and node testing experience.
        </p>
        <div className="flex flex-col gap-4">
          {heuristics.map((h) => (
            <HeuristicCard key={h.id} id={h.id} title={h.title} issues={h.issues} />
          ))}
        </div>
      </section>

      {/* Section 2: Competitive Analysis */}
      <section className="mb-12" id="competitive-analysis">
        <h2 className="mb-1 text-xl font-bold tracking-tight text-foreground">
          2. Competitive Analysis
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Two direct competitors analyzed: Zapier (no-code, linear) and Make (visual graph,
          intermediate). Both offer persistent data storage analogous to n8n's Data Tables.
        </p>

        {/* Zapier */}
        <div className="mb-6 rounded-lg border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground">
              Competitor 1: Zapier — Tables + Zap Editor
            </h3>
            <a
              href="https://zapier.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              zapier.com <ExternalLink className="size-3" />
            </a>
          </div>
          <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
            A no-code automation platform with a linear, step-based workflow editor ("Zaps").
            Zapier Tables is a built-in spreadsheet-like database integrated directly into the
            platform, targeting non-technical users.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-md border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-900/20">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                <ThumbsUp className="size-4" /> Better than n8n
              </div>
              <ul className="flex flex-col gap-2 text-sm text-emerald-700 dark:text-emerald-400">
                <li className="flex items-start gap-1.5"><span className="mt-1 size-1.5 shrink-0 rounded-full bg-current" />Tables is a top-level nav item — prominent and always accessible (H2, H6)</li>
                <li className="flex items-start gap-1.5"><span className="mt-1 size-1.5 shrink-0 rounded-full bg-current" />Inline spreadsheet UI with typed columns, CSV import with visual mapping preview (H3, H5)</li>
                <li className="flex items-start gap-1.5"><span className="mt-1 size-1.5 shrink-0 rounded-full bg-current" />Auto-appends "(copy)" to duplicated table names</li>
                <li className="flex items-start gap-1.5"><span className="mt-1 size-1.5 shrink-0 rounded-full bg-current" />Test results persist across edits; each step testable independently (H4)</li>
              </ul>
            </div>
            <div className="rounded-md border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-red-800 dark:text-red-300">
                <ThumbsDown className="size-4" /> Worse than n8n
              </div>
              <ul className="flex flex-col gap-2 text-sm text-red-700 dark:text-red-400">
                <li className="flex items-start gap-1.5"><span className="mt-1 size-1.5 shrink-0 rounded-full bg-current" />Linear step model can't handle complex branching, merging, or parallel flows</li>
                <li className="flex items-start gap-1.5"><span className="mt-1 size-1.5 shrink-0 rounded-full bg-current" />Fewer low-level options; no code nodes, limited expressions, no self-hosting</li>
                <li className="flex items-start gap-1.5"><span className="mt-1 size-1.5 shrink-0 rounded-full bg-current" />Per-task pricing can be expensive at scale</li>
              </ul>
            </div>
          </div>
          <p className="mt-4 rounded bg-secondary/50 px-3 py-2 text-xs text-muted-foreground">
            <strong className="text-foreground">Design tradeoff:</strong> Zapier prioritizes simplicity and discoverability at the expense of flexibility. n8n prioritizes power and flexibility at the expense of learnability.
          </p>
        </div>

        {/* Make */}
        <div className="rounded-lg border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground">
              Competitor 2: Make (formerly Integromat) — Scenarios + Data Stores
            </h3>
            <a
              href="https://www.make.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              make.com <ExternalLink className="size-3" />
            </a>
          </div>
          <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
            A visual automation platform with a circular/graph-based scenario editor. "Data Stores"
            provide persistent storage analogous to n8n's Data Tables, targeting intermediate users.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-md border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-900/20">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                <ThumbsUp className="size-4" /> Better than n8n
              </div>
              <ul className="flex flex-col gap-2 text-sm text-emerald-700 dark:text-emerald-400">
                <li className="flex items-start gap-1.5"><span className="mt-1 size-1.5 shrink-0 rounded-full bg-current" />Data Stores accessible from top-level sidebar AND from within a scenario module (H2, H6)</li>
                <li className="flex items-start gap-1.5"><span className="mt-1 size-1.5 shrink-0 rounded-full bg-current" />Clear creation wizard: name → define columns with types → set size limit; schema modifiable after creation (H3, H5)</li>
                <li className="flex items-start gap-1.5"><span className="mt-1 size-1.5 shrink-0 rounded-full bg-current" />"Run this module only" via right-click — no need to re-execute the entire scenario (H7)</li>
                <li className="flex items-start gap-1.5"><span className="mt-1 size-1.5 shrink-0 rounded-full bg-current" />Filter modules have a clear "Reset" option</li>
              </ul>
            </div>
            <div className="rounded-md border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-red-800 dark:text-red-300">
                <ThumbsDown className="size-4" /> Worse than n8n
              </div>
              <ul className="flex flex-col gap-2 text-sm text-red-700 dark:text-red-400">
                <li className="flex items-start gap-1.5"><span className="mt-1 size-1.5 shrink-0 rounded-full bg-current" />Circular connectors and routing bubbles harder to read for long workflows</li>
                <li className="flex items-start gap-1.5"><span className="mt-1 size-1.5 shrink-0 rounded-full bg-current" />Data Stores are key-value style — less familiar spreadsheet metaphor than n8n's table view</li>
                <li className="flex items-start gap-1.5"><span className="mt-1 size-1.5 shrink-0 rounded-full bg-current" />No built-in table-style browsing UI; records viewed one at a time or exported</li>
              </ul>
            </div>
          </div>
          <p className="mt-4 rounded bg-secondary/50 px-3 py-2 text-xs text-muted-foreground">
            <strong className="text-foreground">Design tradeoff:</strong> Make prioritizes modular testing and schema flexibility but sacrifices the visual simplicity of a spreadsheet metaphor. n8n offers a more familiar table UI but lacks operational flexibility.
          </p>
        </div>
      </section>

      {/* Section 3: Comparison Table */}
      <section className="mb-12" id="comparison-table">
        <h2 className="mb-1 text-xl font-bold tracking-tight text-foreground">
          3. Summary Comparison Table
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Color indicates relative strength: green = advantage, red = disadvantage, amber = neutral / tradeoff.
        </p>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b bg-secondary/50">
                <th className="px-4 py-3 text-left font-semibold text-foreground">Feature</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">n8n</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Zapier</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Make</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr key={i} className="border-b last:border-0">
                  <td className="px-4 py-3 font-medium text-foreground">{row.feature}</td>
                  <td className={cn("px-4 py-3", cellStyle(row.n8nScore))}>{row.n8n}</td>
                  <td className={cn("px-4 py-3", cellStyle(row.zapierScore))}>{row.zapier}</td>
                  <td className={cn("px-4 py-3", cellStyle(row.makeScore))}>{row.make}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 4: Key Takeaways */}
      <section className="mb-12" id="takeaways">
        <h2 className="mb-1 text-xl font-bold tracking-tight text-foreground">
          4. Key Takeaways for Redesign
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          The most impactful redesign opportunities identified from this analysis, in priority order.
        </p>
        <div className="flex flex-col gap-3">
          {takeaways.map((t, i) => (
            <div key={i} className="flex items-start gap-4 rounded-lg border bg-card p-4">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                {i + 1}
              </div>
              <div>
                <p className="font-semibold text-foreground">{t.title}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{t.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Nav */}
      <div className="flex items-center justify-between border-t pt-6">
        <Link
          href="/assignment4"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Assignment 4 Overview
        </Link>
        <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <CheckCircle2 className="size-4 text-emerald-500" />
          4C coming next
        </span>
      </div>

      <BackToTop />
    </div>
  );
}
