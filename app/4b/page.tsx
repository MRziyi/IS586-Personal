import Link from "next/link";
import { BackToTop } from "@/components/back-to-top";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "4B — State of the Art Analysis",
};

/* ── helpers ── */

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

/* ── data ── */

const heuristics = [
  {
    id: "H1",
    title: "Visibility of System Status",
    issues: [
      {
        severity: 3 as const,
        text: "No execution caching. Even minor edits require re-running the entire workflow. There is no indication of which nodes have stale vs. fresh data. LLM nodes re-run at real cost with no warning.",
      },
      {
        severity: 2 as const,
        text: "When importing CSV data into a Data Table, columns silently fail or receive the wrong type if the format doesn't match — no preview or validation feedback before committing.",
      },
    ],
  },
  {
    id: "H2",
    title: "Match Between System and the Real World",
    issues: [
      {
        severity: 2 as const,
        text: 'The "Data Tables" feature is hidden behind a small sidebar tab on the home screen. In the workflow editor it only appears when you search "data table" in the node picker — not under any intuitive category (not Data Transformation, Core, or Action in an app).',
      },
    ],
  },
  {
    id: "H3",
    title: "User Control and Freedom",
    issues: [
      {
        severity: 3 as const,
        text: "Duplicating a Data Table gives the copy the same name as the original — indistinguishable in dropdown selectors. To rename or fix a table users must re-import from scratch; all manual edits are lost. No undo or versioning.",
      },
      {
        severity: 2 as const,
        text: 'Switching "Input Data Mode" (e.g., expression → fixed) silently discards previously entered content — a Profile ID, for example — with no warning or confirmation prompt.',
      },
      {
        severity: 2 as const,
        text: 'The Filter node has no "Reset / Clear all" button. Users must delete each condition individually.',
      },
    ],
  },
  {
    id: "H4",
    title: "Consistency and Standards",
    issues: [
      {
        severity: 2 as const,
        text: "The Switch node only works with live trigger data — it cannot be tested with mock or pinned data to simulate different branches. This is inconsistent with other nodes that support pinned test data.",
      },
    ],
  },
  {
    id: "H5",
    title: "Error Prevention",
    issues: [
      {
        severity: 3 as const,
        text: "Unpinning test data on a node silently reverts to requiring a manual re-run, with no prompt to update. Users can work with stale data for long stretches without noticing.",
      },
      {
        severity: 2 as const,
        text: "Importing a CSV into an existing Data Table with a conflicting schema produces no warning — the import silently fails or yields unexpected results.",
      },
    ],
  },
  {
    id: "H6",
    title: "Recognition Rather Than Recall",
    issues: [
      {
        severity: 2 as const,
        text: "Data Tables are only accessible from the home screen sidebar, not from within the workflow editor. Users must remember to navigate away from the editor to manage tables, breaking flow.",
      },
    ],
  },
  {
    id: "H7",
    title: "Flexibility and Efficiency of Use",
    issues: [
      {
        severity: 3 as const,
        text: "No execution caching: any change to a downstream node forces a full re-execution from the trigger. For API-heavy or LLM workflows this wastes time and money. There is no shortcut to re-run from a specific node.",
      },
    ],
  },
  {
    id: "H8",
    title: "Aesthetic and Minimalist Design",
    issues: [
      {
        severity: 1 as const,
        text: "The Data Table node configuration panel lists 11 actions (7 Row + 4 Table) in a single flat list. For new users it is overwhelming to locate the right action.",
      },
    ],
  },
  {
    id: "H9",
    title: "Help Users Recognize, Diagnose, and Recover from Errors",
    issues: [
      {
        severity: 2 as const,
        text: "When a CSV import fails due to a type mismatch, the error message does not identify which column or value caused the problem, nor suggest a remedy.",
      },
    ],
  },
  {
    id: "H10",
    title: "Help and Documentation",
    issues: [
      {
        severity: 1 as const,
        text: "Data Table documentation is sparse. Help links inside the node panel are generic and omit common pitfalls such as duplicate table names or CSV format requirements.",
      },
    ],
  },
];

const comparisonRows = [
  { feature: "Data Table discoverability", n8n: "Hidden in sidebar tab", zapier: "Top-level navigation item", make: "Top-level sidebar + in-scenario access", n8nS: "bad", zapierS: "good", makeS: "good" },
  { feature: "Table creation UX", n8n: "Manual, rigid CSV import", zapier: "Spreadsheet UI with preview", make: "Wizard with explicit schema", n8nS: "bad", zapierS: "good", makeS: "good" },
  { feature: "Duplicate naming", n8n: "Same name, no distinction", zapier: 'Auto-appends "(copy)"', make: 'Auto-appends "(copy)"', n8nS: "bad", zapierS: "good", makeS: "good" },
  { feature: "Schema editing after creation", n8n: "Must re-import (lose edits)", zapier: "Inline column type changes", make: "Modify structure anytime", n8nS: "bad", zapierS: "good", makeS: "good" },
  { feature: "Per-node / step testing", n8n: "Must re-run entire workflow", zapier: "Test each step individually", make: "Run individual modules", n8nS: "bad", zapierS: "good", makeS: "good" },
  { feature: "Execution caching", n8n: "None", zapier: "Persists test results", make: "Partial (per-module)", n8nS: "bad", zapierS: "good", makeS: "mid" },
  { feature: "Filter reset", n8n: "No reset button", zapier: "Clear all filters", make: "Reset option available", n8nS: "bad", zapierS: "good", makeS: "good" },
  { feature: "Workflow model flexibility", n8n: "Flexible node graph", zapier: "Linear steps only", make: "Circular graph", n8nS: "good", zapierS: "bad", makeS: "mid" },
  { feature: "Cost model", n8n: "Free (self-hosted)", zapier: "Per-task pricing", make: "Per-operation pricing", n8nS: "good", zapierS: "bad", makeS: "bad" },
  { feature: "Target user", n8n: "Power users / developers", zapier: "Non-technical users", make: "Intermediate users", n8nS: "mid", zapierS: "good", makeS: "mid" },
];

function cellStyle(s: string) {
  if (s === "good") return "bg-emerald-50 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300";
  if (s === "bad") return "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300";
  return "bg-amber-50 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300";
}

const takeaways = [
  { title: "Make Data Tables a first-class citizen", detail: "Add Data Tables to the workflow editor sidebar and node picker categories — not just the home screen." },
  { title: "Add CSV import preview and schema validation", detail: "Show a column-mapping step with type detection before committing an import." },
  { title: "Auto-differentiate duplicated table names", detail: 'Append "(copy)" or an incrementing number to duplicated table names.' },
  { title: "Add per-node execution / caching", detail: "Allow re-running from a specific node onward with cached upstream results. Critical for LLM workflows." },
  { title: 'Add "Reset filters" button', detail: "Small quality-of-life fix with measurable impact for power users building complex filter chains." },
  { title: "Warn before destructive mode switch", detail: 'Prompt before switching "Input Data Mode" so users don\'t silently lose entered field values.' },
  { title: "Support mock data for Switch nodes", detail: "Allow simulating branch conditions with pinned/test data — consistent with how other nodes behave." },
];

/* ── page ── */

export default function Page4B() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 lg:px-6">
      {/* Breadcrumb */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" /> Overview
        </Link>
      </div>

      {/* Header */}
      <div className="mb-10">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className="bg-violet-100 text-violet-800 border-violet-200 dark:bg-violet-900/30 dark:text-violet-400 dark:border-violet-800 font-semibold"
          >
            Phase 4B
          </Badge>
          <Badge
            variant="outline"
            className="bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800"
          >
            Done
          </Badge>
          <span className="text-sm text-muted-foreground">April 2026</span>
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground">
          State of the Art Analysis
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
          A heuristic evaluation of n8n's workflow editor and Data Tables feature using Nielsen's
          10 heuristics, followed by a competitive analysis against Zapier and Make.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {[
            { label: "n8n", href: "https://n8n.io/" },
            { label: "Zapier", href: "https://zapier.com/" },
            { label: "Make", href: "https://www.make.com/" },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border bg-card px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              {s.label} <ExternalLink className="size-3 text-muted-foreground" />
            </a>
          ))}
        </div>
      </div>

      {/* Severity legend */}
      <div className="mb-8 flex flex-wrap items-center gap-4 rounded-lg border bg-secondary/30 px-4 py-3 text-sm">
        <span className="font-medium text-foreground">Severity:</span>
        <span className="flex items-center gap-1.5"><SeverityBadge level={1} /> Low — minor inconvenience</span>
        <span className="flex items-center gap-1.5"><SeverityBadge level={2} /> Medium — disrupts workflow</span>
        <span className="flex items-center gap-1.5"><SeverityBadge level={3} /> High — causes failures or wastes money</span>
      </div>

      {/* §1 Heuristic Analysis */}
      <section className="mb-14" id="heuristic">
        <h2 className="mb-1 text-xl font-bold tracking-tight text-foreground">
          1 · Heuristic Analysis of n8n
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Evaluated using Nielsen's 10 Usability Heuristics, focusing on the workflow editor, Data
          Tables, and node testing experience.
        </p>
        <div className="flex flex-col gap-4">
          {heuristics.map((h) => (
            <HeuristicCard key={h.id} id={h.id} title={h.title} issues={h.issues} />
          ))}
        </div>
      </section>

      {/* §2 Competitive Analysis */}
      <section className="mb-14" id="competitors">
        <h2 className="mb-1 text-xl font-bold tracking-tight text-foreground">
          2 · Competitive Analysis
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Two direct competitors analyzed: Zapier (no-code, linear) and Make (visual graph,
          intermediate). Both offer persistent data storage analogous to n8n's Data Tables.
        </p>

        {/* Zapier */}
        <div className="mb-6 rounded-lg border bg-card p-6">
          <div className="mb-1 flex items-center justify-between gap-4">
            <h3 className="text-base font-semibold text-foreground">
              Competitor 1 — Zapier: Tables + Zap Editor
            </h3>
            <a href="https://zapier.com/" target="_blank" rel="noopener noreferrer"
              className="shrink-0 text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
              zapier.com <ExternalLink className="size-3" />
            </a>
          </div>
          <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
            No-code automation with a linear step-based editor ("Zaps"). Zapier Tables is a
            built-in spreadsheet-style database integrated at the top level of the platform,
            targeting non-technical users.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-md border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-900/20">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                <ThumbsUp className="size-4" /> Better than n8n
              </div>
              <ul className="flex flex-col gap-2 text-sm text-emerald-700 dark:text-emerald-400">
                {[
                  "Tables is a top-level nav item — always accessible (H2, H6)",
                  "Inline spreadsheet UI; CSV import with visual column-mapping preview (H3, H5)",
                  'Duplicated tables auto-get "(copy)" suffix — no naming collisions',
                  "Test results persist across edits; each step testable independently (H4)",
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-current" /> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-md border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-red-800 dark:text-red-300">
                <ThumbsDown className="size-4" /> Worse than n8n
              </div>
              <ul className="flex flex-col gap-2 text-sm text-red-700 dark:text-red-400">
                {[
                  "Linear step model can't handle complex branching, merging, or parallel flows",
                  "No code nodes, limited expressions, no self-hosting option",
                  "Per-task pricing becomes expensive at scale",
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-current" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-4 rounded bg-secondary/50 px-3 py-2 text-xs text-muted-foreground">
            <strong className="text-foreground">Design tradeoff:</strong> Zapier prioritizes
            simplicity and discoverability at the expense of flexibility. n8n prioritizes power
            and flexibility at the expense of learnability.
          </p>
        </div>

        {/* Make */}
        <div className="rounded-lg border bg-card p-6">
          <div className="mb-1 flex items-center justify-between gap-4">
            <h3 className="text-base font-semibold text-foreground">
              Competitor 2 — Make (formerly Integromat): Scenarios + Data Stores
            </h3>
            <a href="https://www.make.com/" target="_blank" rel="noopener noreferrer"
              className="shrink-0 text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
              make.com <ExternalLink className="size-3" />
            </a>
          </div>
          <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
            Visual automation with a circular/graph scenario editor. "Data Stores" provide
            persistent storage analogous to n8n's Data Tables, targeting intermediate users.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-md border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-900/20">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                <ThumbsUp className="size-4" /> Better than n8n
              </div>
              <ul className="flex flex-col gap-2 text-sm text-emerald-700 dark:text-emerald-400">
                {[
                  "Data Stores accessible from top-level sidebar AND from within a scenario module (H2, H6)",
                  "Clear creation wizard: name → columns with types → size limit; schema modifiable anytime (H3, H5)",
                  '"Run this module only" via right-click — no need to re-execute the whole scenario (H7)',
                  'Filter modules have a clear "Reset" option',
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-current" /> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-md border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-red-800 dark:text-red-300">
                <ThumbsDown className="size-4" /> Worse than n8n
              </div>
              <ul className="flex flex-col gap-2 text-sm text-red-700 dark:text-red-400">
                {[
                  "Circular connectors and routing bubbles harder to read for long scenarios",
                  "Data Stores are key-value style — less familiar than n8n's spreadsheet-style table view",
                  "No full table-browsing UI; records viewed one at a time or exported",
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-current" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-4 rounded bg-secondary/50 px-3 py-2 text-xs text-muted-foreground">
            <strong className="text-foreground">Design tradeoff:</strong> Make prioritizes modular
            testing and schema flexibility but sacrifices the visual simplicity of a spreadsheet
            metaphor. n8n offers a more familiar table UI but lacks Make's operational flexibility.
          </p>
        </div>
      </section>

      {/* §3 Comparison Table */}
      <section className="mb-14" id="comparison">
        <h2 className="mb-1 text-xl font-bold tracking-tight text-foreground">
          3 · Summary Comparison
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Green = advantage · Red = disadvantage · Amber = neutral / tradeoff
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
                  <td className={cn("px-4 py-3", cellStyle(row.n8nS))}>{row.n8n}</td>
                  <td className={cn("px-4 py-3", cellStyle(row.zapierS))}>{row.zapier}</td>
                  <td className={cn("px-4 py-3", cellStyle(row.makeS))}>{row.make}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* §4 Takeaways */}
      <section className="mb-12" id="takeaways">
        <h2 className="mb-1 text-xl font-bold tracking-tight text-foreground">
          4 · Key Takeaways for Redesign
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Priority redesign opportunities identified from the heuristic evaluation and competitive
          analysis, ranked by severity and breadth of user impact.
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

      {/* Footer nav */}
      <div className="flex items-center justify-between border-t pt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" /> Overview
        </Link>
        <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <CheckCircle2 className="size-4 text-emerald-500" />
          4C user study coming next
        </span>
      </div>

      <BackToTop />
    </div>
  );
}
