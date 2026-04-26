import Link from "next/link";
import { BackToTop } from "@/components/back-to-top";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "4C — Observational Study",
};

/* ── small helpers ── */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-1 text-xl font-bold tracking-tight text-foreground">
      {children}
    </h2>
  );
}

function Sub({ children }: { children: React.ReactNode }) {
  return <p className="mb-6 text-sm text-muted-foreground">{children}</p>;
}

function SeverityBadge({ level }: { level: number }) {
  const s =
    level >= 4
      ? "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800"
      : level === 3
        ? "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800"
        : level === 2
          ? "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800"
          : "bg-secondary text-muted-foreground border-border";
  return (
    <Badge variant="outline" className={cn("shrink-0 text-xs font-semibold", s)}>
      {level}/4
    </Badge>
  );
}

/* ── data ── */

const participants = [
  { id: "P1", background: "Graduate student, Information Science", n8n: "None", automation: "Used Zapier briefly" },
  { id: "P2", background: "Junior software developer", n8n: "None", automation: "Built scripts, no visual automation" },
  { id: "P3", background: "Marketing analyst", n8n: "None", automation: "Heavy Zapier user, some Make" },
];

const tasks = [
  {
    num: "Task 1",
    title: "Find and Create a Data Table",
    desc: 'Create a new Data Table called "Articles" with columns: Title (text), URL (text), Date (date), and Score (number).',
  },
  {
    num: "Task 2",
    title: "Import CSV into Data Table",
    desc: "Import the provided CSV file (10 rows of article data) into your Articles table.",
  },
  {
    num: "Task 3",
    title: "Build a Workflow with Filter and Test",
    desc: "Create a workflow that reads from the Articles table, filters rows where Score > 7, and outputs the results. Test it with pinned data first, then run it live.",
  },
  {
    num: "Task 4",
    title: "Duplicate and Modify a Table",
    desc: 'Duplicate the Articles table, rename the copy, and add a new column "Category" to the copy.',
  },
];

const consolidatedUPs = [
  { id: "UP1", problem: "Data Tables tab not in sidebar; poor discoverability", severity: 3, heuristic: "H2, H6", source: "All participants" },
  { id: "UP2", problem: "No path from workflow editor to Data Tables management", severity: 3, heuristic: "H6, H7", source: "P1" },
  { id: "UP3", problem: "No CSV import preview or column mapping step", severity: 3, heuristic: "H5, H1", source: "All participants" },
  { id: "UP4", problem: "Cannot change column type after data exists", severity: 3, heuristic: "H3, H5", source: "All participants" },
  { id: "UP5", problem: "No auto-mapping of CSV headers to table columns", severity: 2, heuristic: "H5", source: "P2" },
  { id: "UP6", problem: "No per-node re-execution; must re-run entire workflow", severity: 4, heuristic: "H7", source: "P1, P2" },
  { id: "UP7", problem: "No filter reset button", severity: 2, heuristic: "H7", source: "P2" },
  { id: "UP8", problem: "No pinned data staleness indicator", severity: 3, heuristic: "H1, H5", source: "P3" },
  { id: "UP9", problem: "Pinned data requires manual JSON input", severity: 2, heuristic: "H6, H7", source: "P1" },
  { id: "UP10", problem: "Duplicated tables have identical names", severity: 3, heuristic: "H5, H6", source: "All participants" },
];

const lowCostFixes = [
  { fix: 'Add Data Tables to the left sidebar', detail: 'Move it from a content-area tab to the persistent sidebar navigation, consistent with where all three participants expected to find major features.', fixes: 'UP1' },
  { fix: 'Auto-append "(copy)" to duplicated table names', detail: 'When duplicating a table, automatically name the copy "[Original Name] (copy)." Industry-standard pattern used by Zapier, Google Sheets, and most file managers.', fixes: 'UP10' },
  { fix: 'Add a Reset All button to the Filter node', detail: 'A small "Clear all conditions" link or button at the bottom of the filter configuration panel. Trivial to implement; observed frustration from P2.', fixes: 'UP7' },
  { fix: 'Add a staleness indicator for pinned data', detail: 'When upstream nodes have changed since data was pinned, show a yellow ⚠ badge on the pin icon with tooltip: "Pinned data may be outdated. Re-run to refresh."', fixes: 'UP8' },
  { fix: 'Allow column type changes after creation', detail: 'When a user clicks a column header in the table view, allow changing the type with a confirmation: "Convert Score from Text to Number? Non-numeric values will become empty."', fixes: 'UP4' },
];

const mediumFixes = [
  { fix: 'Add a CSV import preview and column-mapping wizard', detail: 'Step 1: preview the first 5 rows alongside the table columns; allow drag-and-drop mapping. Step 2: show detected vs. expected types with conversion options. Modelled after Zapier\'s import flow.', fixes: 'UP3, UP5' },
  { fix: 'Add a Data Tables slide-out panel in the workflow editor', detail: 'A Tables button in the editor toolbar that opens a side panel showing all tables — view, edit, or create without leaving the editor context.', fixes: 'UP2' },
  { fix: 'Add per-node execution with upstream caching', detail: 'Cache unchanged upstream node outputs. When a user clicks a downstream node, only re-execute nodes that are dirty (modified since last run). Show per-node status: green = cached, gray = stale, orange = modified. Make\'s "Run this module only" is a simpler version of this.', fixes: 'UP6' },
];

const highLevelIdeas = [
  { title: 'Visual pinned data editor', detail: 'Replace raw JSON input for pinned test data with a form-based editor that matches the node\'s output schema — text inputs, dropdowns, date pickers. A "Generate from last run" button auto-populates the form from the most recent real execution.', fixes: 'UP9' },
  { title: 'Integrated Data Table preview in node config', detail: 'When a user adds a Data table node to a workflow, show an inline preview of the table\'s first 5–10 rows directly in the node configuration panel. Include a "View full table" link that opens a slide-out without leaving the editor.', fixes: 'UP1, UP2' },
];

const reflectionPoints = [
  { heading: 'Task design matters', body: 'By giving participants realistic, goal-oriented tasks rather than open-ended exploration, I observed more targeted and comparable behavior across participants. The tasks revealed problems in sequence — each one exposed a different layer of the interface.' },
  { heading: 'Think-aloud reveals mental models', body: "P3's constant comparisons to Zapier showed that users transfer expectations from familiar tools. This is a powerful insight source — not just what went wrong, but what users expected based on prior experience. Mental model mismatches were the primary driver of most usability problems observed." },
  { heading: 'Severity depends on frequency and impact', body: 'UP6 (no per-node execution) was rated severity 4 because it affects every single workflow edit session and has real cost implications for LLM workflows. UP7 (no filter reset) is only severity 2 because it\'s a minor annoyance that doesn\'t block task completion.' },
  { heading: 'Low-cost fixes can have high impact', body: 'Several of the most impactful improvements — auto-naming duplicates, adding a reset button, staleness indicator — are trivially simple to implement but would save significant frustration. This confirms that heuristic evaluation and user observation together identify the right targets for quick wins.' },
  { heading: 'Competitive analysis informs redesign', body: "The Zapier Tables import preview and Make's per-module execution directly inspired two of the major redesign proposals. None of the participants needed to know about these systems — their expectations organically surfaced the same patterns." },
];

/* ── observation data ── */

const t1obs = [
  { id: 'P1', time: '4 min', obs: [
    `Started in the workflow editor. Clicked the + button expecting to find "Data Table" creation there.`,
    'Browsed node categories (AI, Action in an app, Data transformation, Flow, Core) — no table creation found.',
    `Typed "table" in the search box. Found the "Data table" node. Saw 11 actions listed, said: "Wait, this is a node, not a table. Where do I actually make the table?"`,
    'Selected Create under Table Actions and successfully created the table — but never discovered the home screen Data Tables tab.',
    `Post-task: "I had no idea there was a separate Data Tables section. I thought it was all done through nodes."`,
  ]},
  { id: 'P2', time: '3 min', obs: [
    'Went to the home screen sidebar immediately. Noticed Overview, Personal, Chat — no Data Tables.',
    'Scrolled the sidebar. Did not spot the Data Tables tab in the content-area header.',
    `After 1.5 min noticed the tabs: "Workflows | Data tables." Said: "Oh, it's a tab up here. I was looking in the sidebar the whole time."`,
    'Clicked Create data table. Successfully created with columns. Noted column type selection was clear once found.',
  ]},
  { id: 'P3', time: '3.5 min', obs: [
    `Looked in the left sidebar for "Tables" — as in Zapier. Did not find it. Said: "In Zapier, Tables is right there in the sidebar."`,
    'Clicked Templates thinking there might be a table template. Dead end.',
    `After 2 min noticed the "Data tables" tab. Said: "That's really hidden. It should be in the sidebar like Zapier does it."`,
  ]},
];

const t2obs = [
  { id: 'P1', time: '7 min (incomplete)', obs: [
    `Looked for "Import CSV" in the Data table node. Found no such action. Said: "How do I import a CSV? There's no import button on this node."`,
    'After 2 min of exploring, needed a hint. Was directed to the home screen Data Tables tab.',
    'Found import button. Imported. Date and Score columns imported as text (wrong type).',
    `Tried to change column type — selector grayed out for columns with existing data. Said: "So I have to delete the table and start over? That's terrible."`,
  ]},
  { id: 'P2', time: '8 min', obs: [
    'Went to Data Tables tab. Found import button. Uploaded CSV.',
    `CSV headers didn't match exactly ("article_title" vs. "Title"). Import failed to auto-map.`,
    `Said: "Do I have to rename my CSV headers first?" Re-uploaded with renamed headers. Score column still imported as text.`,
    `Could not change column type for existing data. Said: "I'll have to delete and recreate the table."`,
  ]},
  { id: 'P3', time: '4 min (wrong type)', obs: [
    'CSV headers matched exactly. Import succeeded quickly.',
    `Said: "But there's no preview step? In Zapier I get to map columns and see a preview before importing."`,
    `Noticed Score was text, not number. Could not change type. Said: "In Zapier I can just click the column header and change the type anytime."`,
  ]},
];

const t3obs = [
  { id: 'P1', time: '12 min', obs: [
    `Created workflow. Added Data table + Filter nodes. Tried to pin test data — said: "How do I pin data? It wants JSON. I don't know the JSON format for my table."`,
    'Gave up on pinned data and ran the full workflow. Got results. Changed filter threshold from Score > 7 to Score > 5.',
    `Previous output disappeared. Had to re-execute the entire workflow. Said: "Why can't it just re-run from the filter? The data from the table hasn't changed."`,
  ]},
  { id: 'P2', time: '8 min', obs: [
    'Created workflow efficiently. Tried to test just the filter node — no such button found.',
    'Executed full workflow. Got results. Tried to add a second condition and clear the first.',
    `Said: "I want to clear the filter and start fresh. Is there a Reset button?" Found none. Had to delete condition manually. "If I had five conditions I'd have to delete them one by one."`,
  ]},
  { id: 'P3', time: '10 min', obs: [
    'Built workflow quickly. Successfully pinned JSON test data. Ran workflow — filter worked.',
    'Modified filter threshold. Re-ran — got old results because pinned data was still active.',
    `Said: "Why is it showing the old data? Oh, I have pinned data from before." Found unpin button. Re-ran successfully.`,
    '"There should be a warning that pinned data is stale, or it should auto-refresh when I change something upstream."',
  ]},
];

const t4obs = [
  { id: 'P1', time: '6 min', obs: [
    `Found Duplicate in the three-dot menu. A new table appeared with the exact same name "Articles."`,
    `Said: "Wait, which one is the copy? They both say 'Articles.' I can't tell them apart."`,
    'Opened both to check which had data — both did. Renamed one via the three-dot menu. Added Category column.',
    `"The duplicate naming is a real problem. If I had 10 tables, I'd have no idea which is which."`,
  ]},
  { id: 'P2', time: '3 min', obs: [
    'Found Duplicate option quickly.',
    `Immediately noticed the duplicate name. Said: "Same name? That's a bug, right? Every other tool I've used adds '(copy)' to the name."`,
    'Renamed the copy and added the column successfully.',
  ]},
  { id: 'P3', time: '4 min', obs: [
    'Duplicated the table. Noticed the same name.',
    `"In Zapier, when you duplicate it says 'Articles (copy)'. Here they're identical."`,
    `"In my workflows, if I have a dropdown selecting a table, I'll see two 'Articles' and not know which is which."`,
    'Renamed and added column.',
  ]},
];

/* ── wireframe components ── */

function WireframeBox({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-lg border-2 border-dashed border-muted-foreground/30 bg-secondary/20 font-mono text-xs leading-relaxed text-muted-foreground", className)}>
      {children}
    </div>
  );
}

function Sketch1() {
  return (
    <WireframeBox className="p-4">
      <div className="mb-2 text-xs font-semibold text-foreground/70 not-italic">Sketch 1 — Data Tables in sidebar navigation</div>
      <div className="flex gap-0 rounded border border-muted-foreground/20 overflow-hidden text-[11px]">
        <div className="w-36 shrink-0 border-r border-muted-foreground/20 bg-secondary/40 p-2 flex flex-col gap-0.5">
          <div className="px-2 py-1 rounded text-muted-foreground hover:bg-secondary/60">🏠 Overview</div>
          <div className="px-2 py-1 rounded text-muted-foreground hover:bg-secondary/60">👤 Personal</div>
          <div className="px-2 py-1 rounded text-muted-foreground hover:bg-secondary/60">💬 Chat</div>
          <div className="px-2 py-1 rounded bg-accent/40 text-foreground font-semibold border-l-2 border-accent">
            📋 Data Tables
          </div>
          <div className="mt-0.5 ml-4 text-[10px] text-emerald-600 dark:text-emerald-400">← NEW: top-level</div>
          <div className="px-2 py-1 rounded text-muted-foreground">📄 Templates</div>
          <div className="px-2 py-1 rounded text-muted-foreground">📊 Insights</div>
          <div className="px-2 py-1 rounded text-muted-foreground">⚙ Settings</div>
        </div>
        <div className="flex-1 p-3 text-muted-foreground">
          <div className="text-xs font-semibold text-foreground/70 mb-2">Data Tables</div>
          <div className="flex gap-2 mb-3">
            <div className="rounded border border-muted-foreground/30 px-2 py-1 text-[10px]">+ New table</div>
            <div className="rounded border border-muted-foreground/30 px-2 py-1 text-[10px]">Import CSV</div>
          </div>
          <div className="border border-muted-foreground/20 rounded text-[10px]">
            <div className="border-b border-muted-foreground/20 px-2 py-1 font-semibold text-foreground/60">Name</div>
            <div className="px-2 py-1">📋 Articles</div>
            <div className="px-2 py-1">📋 Products</div>
          </div>
        </div>
      </div>
    </WireframeBox>
  );
}

function Sketch2() {
  return (
    <WireframeBox className="p-4">
      <div className="mb-2 text-xs font-semibold text-foreground/70 not-italic">Sketch 2 — CSV import preview & column-mapping wizard</div>
      <div className="rounded border border-muted-foreground/20 bg-background/60 p-3 text-[11px]">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-semibold text-foreground/80">Import CSV into "Articles"</span>
          <span className="text-muted-foreground/60">✕</span>
        </div>
        <div className="mb-2 text-[10px] text-muted-foreground">Step 1 of 2 — Map Columns</div>
        <div className="mb-3 grid grid-cols-3 gap-1 text-[10px]">
          <div className="font-semibold text-foreground/60">CSV column</div>
          <div className="font-semibold text-foreground/60">→ Table column</div>
          <div className="font-semibold text-foreground/60">Type</div>
          {[
            ["article_title", "Title", "Text ✓"],
            ["url", "URL", "Text ✓"],
            ["pub_date", "Date", "Date ⚠"],
            ["score", "Score", "Number ⚠"],
          ].map(([csv, tbl, type]) => (
            <>
              <div className="rounded border border-muted-foreground/20 px-1.5 py-0.5 text-muted-foreground">{csv}</div>
              <div className="rounded border border-muted-foreground/20 px-1.5 py-0.5 text-foreground/70">{tbl}</div>
              <div className={cn("px-1.5 py-0.5 rounded", type.includes("⚠") ? "text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400")}>{type}</div>
            </>
          ))}
        </div>
        <div className="mb-3 rounded bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 px-2 py-1.5 text-[10px] text-amber-700 dark:text-amber-400">
          ⚠ "pub_date": "2025-01-15" will be converted to Date.<br />
          ⚠ "score": 0 non-numeric values found.
        </div>
        <div className="mb-1 text-[10px] font-semibold text-foreground/60">Preview (first 3 rows)</div>
        <div className="mb-3 border border-muted-foreground/20 rounded overflow-hidden text-[10px]">
          <div className="grid grid-cols-4 bg-secondary/50 border-b border-muted-foreground/20">
            {["Title","URL","Date","Score"].map(h => <div key={h} className="px-1.5 py-0.5 font-semibold text-foreground/60">{h}</div>)}
          </div>
          {[["HCI Paper 1","arxiv/…","2025-01","8"],["UX Study","doi/…","2025-02","9"],["Design Rev","acm/…","2025-03","6"]].map((r,i)=>(
            <div key={i} className="grid grid-cols-4 border-b border-muted-foreground/10 last:border-0">
              {r.map((c,j)=><div key={j} className="px-1.5 py-0.5 text-muted-foreground">{c}</div>)}
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-2">
          <div className="rounded border border-muted-foreground/20 px-2 py-0.5 text-[10px]">Cancel</div>
          <div className="rounded bg-accent px-2 py-0.5 text-[10px] text-accent-foreground">Import 10 rows →</div>
        </div>
      </div>
    </WireframeBox>
  );
}

function Sketch3() {
  return (
    <WireframeBox className="p-4">
      <div className="mb-2 text-xs font-semibold text-foreground/70 not-italic">Sketch 3 — Per-node execution with upstream cache indicators</div>
      <div className="rounded border border-muted-foreground/20 bg-background/60 p-4 text-[11px]">
        <div className="mb-4 flex items-center gap-1">
          {[
            { label: "Schedule", status: "cached", color: "bg-emerald-500" },
            { label: "Data Table", status: "cached", color: "bg-emerald-500" },
            { label: "Filter", status: "modified", color: "bg-orange-400" },
            { label: "Output", status: "stale", color: "bg-muted-foreground/40" },
          ].map((node, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className="flex flex-col items-center gap-1">
                <div className="rounded border border-muted-foreground/20 bg-secondary/60 px-2 py-1 text-[10px] text-foreground/70">
                  {node.label}
                </div>
                <div className="flex items-center gap-1 text-[9px]">
                  <span className={cn("size-2 rounded-full", node.color)} />
                  {node.status}
                </div>
              </div>
              {i < 3 && <span className="text-muted-foreground/40 mx-0.5">──</span>}
            </div>
          ))}
        </div>
        <div className="mb-1 text-[10px] text-muted-foreground">Right-click on Filter node:</div>
        <div className="w-44 rounded border border-muted-foreground/30 bg-card shadow-sm text-[10px]">
          <div className="flex items-center gap-2 px-3 py-1.5 hover:bg-secondary/50 text-foreground/80 border-b border-muted-foreground/10">
            <span>▶</span> <span>Run from here</span>
            <span className="ml-auto text-emerald-600 dark:text-emerald-400 text-[9px]">uses cache</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 hover:bg-secondary/50 text-muted-foreground border-b border-muted-foreground/10">
            <span>▶</span> Run entire workflow
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 hover:bg-secondary/50 text-muted-foreground border-b border-muted-foreground/10">
            <span>📌</span> Pin data
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 hover:bg-secondary/50 text-muted-foreground">
            <span>✕</span> Delete node
          </div>
        </div>
      </div>
    </WireframeBox>
  );
}

function Sketch4() {
  return (
    <WireframeBox className="p-4">
      <div className="mb-2 text-xs font-semibold text-foreground/70 not-italic">Sketch 4 — Duplicate table auto-naming (before / after)</div>
      <div className="grid grid-cols-2 gap-4 text-[11px]">
        <div>
          <div className="mb-1 font-semibold text-red-600 dark:text-red-400">Before (current)</div>
          <div className="rounded border border-muted-foreground/20 bg-background/60 divide-y divide-muted-foreground/10 text-[10px]">
            <div className="flex items-center gap-2 px-3 py-2 text-muted-foreground">
              <span>📋</span> Articles
              <span className="ml-auto text-muted-foreground/40">⋯</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 text-muted-foreground">
              <span>📋</span> Articles
              <span className="ml-2 text-[9px] text-red-400">← which is which?</span>
              <span className="ml-auto text-muted-foreground/40">⋯</span>
            </div>
          </div>
        </div>
        <div>
          <div className="mb-1 font-semibold text-emerald-600 dark:text-emerald-400">After (proposed)</div>
          <div className="rounded border border-muted-foreground/20 bg-background/60 divide-y divide-muted-foreground/10 text-[10px]">
            <div className="flex items-center gap-2 px-3 py-2 text-muted-foreground">
              <span>📋</span> Articles
              <span className="ml-auto text-muted-foreground/40">⋯</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 text-muted-foreground">
              <span>📋</span> Articles (copy)
              <span className="ml-auto text-muted-foreground/40">⋯</span>
            </div>
          </div>
        </div>
      </div>
    </WireframeBox>
  );
}

function Sketch5() {
  return (
    <WireframeBox className="p-4">
      <div className="mb-2 text-xs font-semibold text-foreground/70 not-italic">Sketch 5 — Pinned data staleness warning</div>
      <div className="w-72 rounded border border-muted-foreground/20 bg-background/60 p-3 text-[11px]">
        <div className="mb-2 font-semibold text-foreground/70">Data table node</div>
        <div className="rounded border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20 p-3">
          <div className="mb-1.5 flex items-center gap-2">
            <span className="text-amber-600 dark:text-amber-400 font-semibold text-[10px]">📌 Pinned data</span>
            <span className="ml-auto rounded bg-amber-200 dark:bg-amber-800 px-1.5 py-0.5 text-[9px] font-bold text-amber-800 dark:text-amber-300">⚠ STALE</span>
          </div>
          <p className="text-[10px] text-amber-700 dark:text-amber-400 mb-2 leading-relaxed">
            This data was pinned before upstream changes were made. Test results may be outdated.
          </p>
          <div className="flex gap-2">
            <div className="rounded border border-amber-400 px-2 py-0.5 text-[10px] text-amber-700 dark:text-amber-400">Refresh from last run</div>
            <div className="rounded border border-muted-foreground/20 px-2 py-0.5 text-[10px] text-muted-foreground">Keep</div>
          </div>
        </div>
      </div>
    </WireframeBox>
  );
}

/* ── page ── */

export default function Page4C() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 lg:px-6">
      {/* Breadcrumb */}
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="size-3.5" /> Overview
        </Link>
      </div>

      {/* Header */}
      <div className="mb-10">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="bg-violet-100 text-violet-800 border-violet-200 dark:bg-violet-900/30 dark:text-violet-400 dark:border-violet-800 font-semibold">
            Phase 4C
          </Badge>
          <Badge variant="outline" className="bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800">
            Done
          </Badge>
          <span className="text-sm text-muted-foreground">April 2026</span>
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground">Observational Study</h1>
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
          A think-aloud usability study with three participants performing realistic tasks in n8n's
          workflow editor and Data Tables feature. Findings informed 10 usability problems and
          10 design improvement recommendations.
        </p>
      </div>

      {/* §1 Study Design */}
      <section className="mb-14" id="design">
        <SectionTitle>1 · Study Design</SectionTitle>
        <Sub>Methods, participants, tasks, and environment.</Sub>

        {/* Methodology */}
        <div className="mb-6 rounded-lg border bg-card p-5">
          <h3 className="mb-3 text-sm font-semibold text-foreground">Methodology</h3>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: "Concurrent think-aloud", desc: "Participants verbalized thoughts while performing tasks. Verbal expressions captured hesitation, confusion, and expectation mismatches." },
              { label: "Direct observation", desc: "Observed and logged hesitations, errors, backtracking, and emotional reactions. Noted timestamps for each observable event." },
              { label: "Post-task interview", desc: "Semi-structured reflective interview: participants rated difficulty (1–5) and described what confused or surprised them." },
            ].map((m) => (
              <div key={m.label} className="rounded-md bg-secondary/30 p-3">
                <p className="text-xs font-semibold text-foreground mb-1">{m.label}</p>
                <p className="text-xs leading-relaxed text-muted-foreground">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Participants */}
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-semibold text-foreground">Participants</h3>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b bg-secondary/50">
                  <th className="px-4 py-3 text-left font-semibold text-foreground">ID</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Background</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">n8n exp.</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Automation exp.</th>
                </tr>
              </thead>
              <tbody>
                {participants.map((p) => (
                  <tr key={p.id} className="border-b last:border-0">
                    <td className="px-4 py-3 font-mono text-sm font-semibold text-foreground">{p.id}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{p.background}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{p.n8n}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{p.automation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tasks */}
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-semibold text-foreground">Tasks</h3>
          <div className="flex flex-col gap-3">
            {tasks.map((t) => (
              <div key={t.num} className="flex items-start gap-4 rounded-lg border bg-card p-4">
                <Badge variant="outline" className="shrink-0 text-xs font-semibold bg-secondary text-muted-foreground">
                  {t.num}
                </Badge>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.title}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground italic">"{t.desc}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Environment */}
        <div className="rounded-lg border bg-secondary/30 px-4 py-3 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Environment: </span>
          n8n Cloud instance (v2.17.7) · Screen and audio recorded (with consent) · 45-minute session per participant · No assistance during tasks; clarification only if stuck &gt;3 minutes
        </div>
      </section>

      {/* §2 Task Observations */}
      <section className="mb-14" id="observations">
        <SectionTitle>2 · Task Observations</SectionTitle>
        <Sub>Per-task findings, participant-by-participant, with problems identified.</Sub>

        {/* Task 1 */}
        <div className="mb-8">
          <h3 className="mb-4 text-base font-semibold text-foreground">Task 1 — Find and Create a Data Table</h3>
          <div className="mb-4 flex flex-col gap-3">
            {t1obs.map((p) => (
              <div key={p.id} className="rounded-lg border bg-card p-4">
                <div className="mb-2 flex items-center gap-3">
                  <span className="font-mono text-sm font-semibold text-foreground">{p.id}</span>
                  <span className="text-xs text-muted-foreground">Completed in {p.time}</span>
                </div>
                <ul className="flex flex-col gap-1.5">
                  {p.obs.map((o, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {/* summary table */}
          <div className="mb-3 overflow-x-auto rounded-lg border">
            <table className="w-full border-collapse text-sm">
              <thead><tr className="border-b bg-secondary/50">
                <th className="px-3 py-2 text-left font-semibold text-foreground">Participant</th>
                <th className="px-3 py-2 text-left font-semibold text-foreground">Time</th>
                <th className="px-3 py-2 text-left font-semibold text-foreground">Found via</th>
                <th className="px-3 py-2 text-left font-semibold text-foreground">Key difficulty</th>
              </tr></thead>
              <tbody>
                {[
                  { p: "P1", t: "4 min", via: "Node search in editor", diff: "Never found the home screen Data Tables tab" },
                  { p: "P2", t: "3 min", via: "Home screen tab (after sidebar search)", diff: "Tab is in content area, not sidebar" },
                  { p: "P3", t: "3.5 min", via: "Home screen tab (after sidebar search)", diff: "Expected sidebar placement (Zapier mental model)" },
                ].map((r) => (
                  <tr key={r.p} className="border-b last:border-0">
                    <td className="px-3 py-2 font-mono text-sm font-semibold text-foreground">{r.p}</td>
                    <td className="px-3 py-2 text-sm text-muted-foreground">{r.t}</td>
                    <td className="px-3 py-2 text-sm text-muted-foreground">{r.via}</td>
                    <td className="px-3 py-2 text-sm text-muted-foreground">{r.diff}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-2">
            {[
              { id: "UP1", text: "Data Tables tab is not in the sidebar — all three participants looked there first. Unconventional placement in the content-area header." },
              { id: "UP2", text: "No path from workflow editor to Data Tables management — P1 created the table through a workflow node and never discovered the management UI." },
            ].map((up) => (
              <div key={up.id} className="flex items-start gap-3 rounded bg-secondary/40 px-3 py-2 text-sm">
                <Badge variant="outline" className="shrink-0 text-xs font-mono">{up.id}</Badge>
                <span className="text-muted-foreground">{up.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Task 2 */}
        <div className="mb-8">
          <h3 className="mb-4 text-base font-semibold text-foreground">Task 2 — Import CSV into Data Table</h3>
          <div className="mb-4 flex flex-col gap-3">
            {t2obs.map((p) => (
              <div key={p.id} className="rounded-lg border bg-card p-4">
                <div className="mb-2 flex items-center gap-3">
                  <span className="font-mono text-sm font-semibold text-foreground">{p.id}</span>
                  <span className="text-xs text-muted-foreground">{p.time}</span>
                </div>
                <ul className="flex flex-col gap-1.5">
                  {p.obs.map((o, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mb-3 overflow-x-auto rounded-lg border">
            <table className="w-full border-collapse text-sm">
              <thead><tr className="border-b bg-secondary/50">
                <th className="px-3 py-2 text-left font-semibold text-foreground">Participant</th>
                <th className="px-3 py-2 text-left font-semibold text-foreground">Time</th>
                <th className="px-3 py-2 text-left font-semibold text-foreground">CSV matched?</th>
                <th className="px-3 py-2 text-left font-semibold text-foreground">Type issue?</th>
                <th className="px-3 py-2 text-left font-semibold text-foreground">Could fix?</th>
              </tr></thead>
              <tbody>
                {[
                  { p:"P1", t:"7 min", m:"Yes", type:"Date & Score as text", fix:"No" },
                  { p:"P2", t:"8 min", m:"No (header mismatch)", type:"Score as text", fix:"No" },
                  { p:"P3", t:"4 min", m:"Yes", type:"Score as text", fix:"No" },
                ].map(r => (
                  <tr key={r.p} className="border-b last:border-0">
                    <td className="px-3 py-2 font-mono text-sm font-semibold text-foreground">{r.p}</td>
                    <td className="px-3 py-2 text-sm text-muted-foreground">{r.t}</td>
                    <td className="px-3 py-2 text-sm text-muted-foreground">{r.m}</td>
                    <td className="px-3 py-2 text-sm text-amber-600 dark:text-amber-400">{r.type}</td>
                    <td className="px-3 py-2 text-sm text-red-600 dark:text-red-400">{r.fix}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-2">
            {[
              { id: "UP3", text: "No CSV import preview or column-mapping step — all participants expected this. Zapier provides it; n8n commits the import silently." },
              { id: "UP4", text: "Cannot change column type after data exists — only workaround is deleting the table and re-creating it, losing all data." },
              { id: "UP5", text: "No auto-mapping of CSV headers to table columns — when headers differ, import misassigns data or fails silently." },
            ].map((up) => (
              <div key={up.id} className="flex items-start gap-3 rounded bg-secondary/40 px-3 py-2 text-sm">
                <Badge variant="outline" className="shrink-0 text-xs font-mono">{up.id}</Badge>
                <span className="text-muted-foreground">{up.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Task 3 */}
        <div className="mb-8">
          <h3 className="mb-4 text-base font-semibold text-foreground">Task 3 — Build Workflow with Filter and Test</h3>
          <div className="mb-4 flex flex-col gap-3">
            {t3obs.map((p) => (
              <div key={p.id} className="rounded-lg border bg-card p-4">
                <div className="mb-2 flex items-center gap-3">
                  <span className="font-mono text-sm font-semibold text-foreground">{p.id}</span>
                  <span className="text-xs text-muted-foreground">{p.time}</span>
                </div>
                <ul className="flex flex-col gap-1.5">
                  {p.obs.map((o, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mb-3 overflow-x-auto rounded-lg border">
            <table className="w-full border-collapse text-sm">
              <thead><tr className="border-b bg-secondary/50">
                <th className="px-3 py-2 text-left font-semibold text-foreground">Participant</th>
                <th className="px-3 py-2 text-left font-semibold text-foreground">Time</th>
                <th className="px-3 py-2 text-left font-semibold text-foreground">Key difficulty</th>
              </tr></thead>
              <tbody>
                {[
                  { p:"P1", t:"12 min", d:"No per-node execution; stale output after filter change" },
                  { p:"P2", t:"8 min", d:"No filter reset button; no per-step testing option" },
                  { p:"P3", t:"10 min", d:"Stale pinned data — no staleness indicator" },
                ].map(r => (
                  <tr key={r.p} className="border-b last:border-0">
                    <td className="px-3 py-2 font-mono text-sm font-semibold text-foreground">{r.p}</td>
                    <td className="px-3 py-2 text-sm text-muted-foreground">{r.t}</td>
                    <td className="px-3 py-2 text-sm text-muted-foreground">{r.d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-2">
            {[
              { id: "UP6", text: "No per-node re-execution — changing a downstream node requires re-running the entire workflow from the trigger. Wastes time and money for LLM workflows." },
              { id: "UP7", text: "No filter reset button — users must manually delete each condition. Tedious for complex filters." },
              { id: "UP8", text: "No pinned data staleness indicator — users can unknowingly test with outdated data after upstream changes." },
              { id: "UP9", text: "Pinned data requires manual JSON input — non-technical users cannot construct the correct JSON format." },
            ].map((up) => (
              <div key={up.id} className="flex items-start gap-3 rounded bg-secondary/40 px-3 py-2 text-sm">
                <Badge variant="outline" className="shrink-0 text-xs font-mono">{up.id}</Badge>
                <span className="text-muted-foreground">{up.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Task 4 */}
        <div className="mb-8">
          <h3 className="mb-4 text-base font-semibold text-foreground">Task 4 — Duplicate and Modify a Table</h3>
          <div className="mb-4 flex flex-col gap-3">
            {t4obs.map((p) => (
              <div key={p.id} className="rounded-lg border bg-card p-4">
                <div className="mb-2 flex items-center gap-3">
                  <span className="font-mono text-sm font-semibold text-foreground">{p.id}</span>
                  <span className="text-xs text-muted-foreground">{p.time}</span>
                </div>
                <ul className="flex flex-col gap-1.5">
                  {p.obs.map((o, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            {[
              { id: "UP10", text: "Duplicated tables have identical names — no automatic differentiation (e.g., \"(copy)\" suffix). Causes confusion in the table list and in workflow dropdowns." },
            ].map((up) => (
              <div key={up.id} className="flex items-start gap-3 rounded bg-secondary/40 px-3 py-2 text-sm">
                <Badge variant="outline" className="shrink-0 text-xs font-mono">{up.id}</Badge>
                <span className="text-muted-foreground">{up.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §3 Consolidated UP table */}
      <section className="mb-14" id="problems">
        <SectionTitle>3 · Consolidated Usability Problems</SectionTitle>
        <Sub>Severity 4 = critical / blocks task. 3 = significant disruption. 2 = moderate annoyance. 1 = minor.</Sub>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b bg-secondary/50">
                <th className="px-3 py-3 text-left font-semibold text-foreground w-14">ID</th>
                <th className="px-3 py-3 text-left font-semibold text-foreground">Problem</th>
                <th className="px-3 py-3 text-left font-semibold text-foreground w-20">Severity</th>
                <th className="px-3 py-3 text-left font-semibold text-foreground w-24">Heuristic</th>
                <th className="px-3 py-3 text-left font-semibold text-foreground w-32">Source</th>
              </tr>
            </thead>
            <tbody>
              {consolidatedUPs.map((up) => (
                <tr key={up.id} className="border-b last:border-0">
                  <td className="px-3 py-2.5 font-mono text-xs font-semibold text-foreground">{up.id}</td>
                  <td className="px-3 py-2.5 text-sm text-muted-foreground">{up.problem}</td>
                  <td className="px-3 py-2.5"><SeverityBadge level={up.severity} /></td>
                  <td className="px-3 py-2.5 text-xs text-muted-foreground font-mono">{up.heuristic}</td>
                  <td className="px-3 py-2.5 text-xs text-muted-foreground">{up.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* §4 Recommendations */}
      <section className="mb-14" id="recommendations">
        <SectionTitle>4 · Recommendations</SectionTitle>
        <Sub>Improvements organized by implementation cost and complexity.</Sub>

        <h3 className="mb-3 mt-0 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Low-cost quick fixes</h3>
        <div className="mb-8 flex flex-col gap-3">
          {lowCostFixes.map((f, i) => (
            <div key={i} className="flex items-start gap-4 rounded-lg border bg-card p-4">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                {i + 1}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-0.5">
                  <p className="font-semibold text-foreground">{f.fix}</p>
                  <Badge variant="outline" className="font-mono text-xs text-muted-foreground">{f.fixes}</Badge>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{f.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Medium-cost UI changes</h3>
        <div className="mb-8 flex flex-col gap-3">
          {mediumFixes.map((f, i) => (
            <div key={i} className="flex items-start gap-4 rounded-lg border bg-card p-4">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30 text-xs font-bold text-amber-700 dark:text-amber-400">
                {i + 6}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-0.5">
                  <p className="font-semibold text-foreground">{f.fix}</p>
                  <Badge variant="outline" className="font-mono text-xs text-muted-foreground">{f.fixes}</Badge>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{f.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">High-level redesign ideas</h3>
        <div className="flex flex-col gap-3">
          {highLevelIdeas.map((f, i) => (
            <div key={i} className="flex items-start gap-4 rounded-lg border bg-card p-4">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-900/30 text-xs font-bold text-violet-700 dark:text-violet-400">
                {i + 9}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-0.5">
                  <p className="font-semibold text-foreground">{f.title}</p>
                  <Badge variant="outline" className="font-mono text-xs text-muted-foreground">{f.fixes}</Badge>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{f.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* §5 Sketches */}
      <section className="mb-14" id="sketches">
        <SectionTitle>5 · Design Sketches</SectionTitle>
        <Sub>Low-fidelity wireframes illustrating the key proposed improvements.</Sub>
        <div className="flex flex-col gap-6">
          <Sketch1 />
          <Sketch2 />
          <Sketch3 />
          <Sketch4 />
          <Sketch5 />
        </div>
      </section>

      {/* §6 Reflection */}
      <section className="mb-12" id="reflection">
        <SectionTitle>6 · Reflection</SectionTitle>
        <Sub>What this study taught me compared to Assignment 3B.</Sub>
        <div className="flex flex-col gap-4">
          {reflectionPoints.map((r, i) => (
            <div key={i} className="rounded-lg border bg-card p-5">
              <p className="mb-1 font-semibold text-foreground">{r.heading}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{r.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer nav */}
      <div className="flex items-center justify-between border-t pt-6">
        <Link href="/4b" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="size-3.5" /> 4B — Analysis
        </Link>
        <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <CheckCircle2 className="size-4 text-emerald-500" />
          4D redesign coming next
        </span>
      </div>

      <BackToTop />
    </div>
  );
}
