import Link from "next/link";
import { BackToTop } from "@/components/back-to-top";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "4E — Final Redesign",
};

/* ── helpers ── */

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
function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-3 text-base font-semibold text-foreground">{children}</h3>;
}
function Rationale({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 rounded-md border-l-2 border-accent bg-secondary/30 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
      {children}
    </div>
  );
}
function WF({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-lg border-2 border-dashed border-muted-foreground/25 bg-secondary/10 text-xs text-muted-foreground", className)}>
      {children}
    </div>
  );
}
function WFLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-b border-dashed border-muted-foreground/20 bg-secondary/30 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
      {children}
    </div>
  );
}
function DeltaBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded border border-emerald-300 bg-emerald-50 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-700 dark:border-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400">
      {children}
    </span>
  );
}
function NewBadge() {
  return (
    <span className="rounded border border-violet-300 bg-violet-50 px-1.5 py-0.5 text-[9px] font-semibold text-violet-700 dark:border-violet-700 dark:bg-violet-900/20 dark:text-violet-400">
      NEW in V2
    </span>
  );
}

/* ── V2 wireframes ── */

function WF2A() {
  return (
    <WF>
      <WFLabel>V2a — Sidebar with first-use tooltip + editor toolbar Tables button (FINAL)</WFLabel>
      <div className="flex overflow-hidden rounded-b-lg text-[11px]">
        {/* Sidebar */}
        <div className="w-44 shrink-0 border-r border-dashed border-muted-foreground/20 bg-secondary/40 p-2 flex flex-col gap-0.5">
          <div className="mb-1 px-2 text-[9px] font-bold uppercase tracking-widest text-muted-foreground/50">n8n</div>
          {[
            { icon: "🏠", label: "Overview" },
            { icon: "👤", label: "Personal" },
            { icon: "💬", label: "Chat" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 rounded px-2 py-1.5 text-muted-foreground">
              <span>{item.icon}</span><span>{item.label}</span>
            </div>
          ))}
          {/* Data Tables with tooltip */}
          <div className="relative">
            <div className="flex items-center gap-2 rounded border border-emerald-400 bg-emerald-50 px-2 py-1.5 text-emerald-700 dark:border-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400">
              <span>📋</span>
              <span className="font-semibold">Data Tables</span>
              <DeltaBadge>NEW</DeltaBadge>
            </div>
            {/* First-use tooltip */}
            <div className="absolute left-44 top-0 z-10 ml-1 w-48 rounded border border-amber-300 bg-amber-50 p-2 text-[9px] leading-relaxed text-amber-800 shadow dark:border-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
              <div className="mb-1 font-semibold">👋 Data Tables moved here</div>
              Previously in Personal → Data tables tab. Now always accessible from the sidebar.
              <div className="mt-1 flex justify-end">
                <button className="rounded bg-amber-200 px-1.5 py-0.5 text-[9px] font-semibold text-amber-800 dark:bg-amber-800 dark:text-amber-200">Got it</button>
              </div>
            </div>
          </div>
          <div className="mt-1 border-t border-dashed border-muted-foreground/15 pt-1">
            {["📄 Templates","📊 Insights","❓ Help","⚙ Settings"].map((item) => (
              <div key={item} className="flex items-center gap-2 rounded px-2 py-1.5 text-muted-foreground">
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Editor area */}
        <div className="flex-1 p-3">
          {/* Toolbar */}
          <div className="mb-2 flex items-center justify-between rounded border border-muted-foreground/20 bg-card px-2 py-1.5">
            <span className="text-[10px] font-semibold text-foreground/70">My Workflow</span>
            <div className="flex items-center gap-1">
              <div className="rounded border border-muted-foreground/20 px-1.5 py-0.5 text-[9px]">➕</div>
              <div className="rounded border border-muted-foreground/20 px-1.5 py-0.5 text-[9px]">🔍</div>
              <div className="rounded border-2 border-dashed border-violet-400 bg-violet-50 px-1.5 py-0.5 text-[9px] font-semibold text-violet-700 dark:bg-violet-900/20 dark:text-violet-400">
                📋 Tables <DeltaBadge>SHORTCUT</DeltaBadge>
              </div>
              <div className="rounded border border-muted-foreground/20 bg-secondary px-1.5 py-0.5 text-[9px]">Run from ▶</div>
              <div className="rounded bg-accent px-1.5 py-0.5 text-[9px] text-accent-foreground">Execute ▶</div>
            </div>
          </div>
          {/* Canvas nodes */}
          <div className="flex items-center gap-2 rounded border border-muted-foreground/20 bg-card/50 px-3 py-4">
            {[
              { label: "Schedule", dot: "bg-emerald-500", txt: "cached" },
              { label: "Data Table", dot: "bg-emerald-500", txt: "cached" },
              { label: "Filter", dot: "bg-orange-400", txt: "modified", hl: true },
              { label: "Output", dot: "bg-muted-foreground/30", txt: "not run" },
            ].map((n, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className="flex flex-col items-center gap-1">
                  <div className={cn("rounded border px-2 py-1 text-[9px] font-medium", n.hl ? "border-orange-400 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400" : "border-muted-foreground/20 bg-card text-foreground/70")}>{n.label}</div>
                  <div className="flex items-center gap-0.5 text-[8px]">
                    <span className={cn("size-1.5 rounded-full", n.dot)} />
                    <span className="text-muted-foreground/60">{n.txt}</span>
                  </div>
                </div>
                {i < 3 && <span className="text-[8px] text-muted-foreground/30">──▶</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </WF>
  );
}

function WF2B() {
  return (
    <WF>
      <WFLabel>V2b — CSV import wizard: Step 2 preview now included (FINAL)</WFLabel>
      <div className="p-4">
        <div className="rounded border border-muted-foreground/20 bg-background/60 p-4 text-[11px]">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-semibold text-foreground/80">Import CSV into "Articles"</span>
            <span className="text-muted-foreground/40">✕</span>
          </div>
          {/* Step indicator */}
          <div className="mb-4 flex items-center gap-2 text-[10px]">
            <div className="flex items-center gap-1 rounded border border-muted-foreground/20 px-2 py-0.5 text-muted-foreground">
              <span className="flex size-4 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-[8px] font-bold text-emerald-700 dark:text-emerald-400">✓</span>
              Map Columns
            </div>
            <span className="text-muted-foreground/30">──</span>
            <div className="flex items-center gap-1 rounded bg-accent/80 px-2 py-0.5 text-accent-foreground font-semibold">
              <span className="flex size-4 items-center justify-center rounded-full bg-accent text-[8px] font-bold text-accent-foreground">2</span>
              Preview &amp; Import <NewBadge />
            </div>
          </div>
          {/* Preview table */}
          <div className="mb-2 text-[10px] font-semibold text-foreground/60">Data preview (first 3 of 10 rows)</div>
          <div className="mb-3 overflow-hidden rounded border border-muted-foreground/20 text-[10px]">
            <div className="grid grid-cols-4 border-b border-muted-foreground/15 bg-secondary/40 px-2 py-1 font-semibold text-foreground/60">
              {["Title (text)","URL (text)","Date (date)","Score (num)"].map(h => <div key={h}>{h}</div>)}
            </div>
            {[
              ["HCI Paper 1","arxiv/1234","2025-01-10","8"],
              ["UX Study 2","doi/5678","2025-02-15","9"],
              ["Design Rev","acm/9012","2025-03-01","6"],
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-4 border-b border-muted-foreground/10 px-2 py-1 last:border-0">
                {row.map((cell, j) => (
                  <div key={j} className="text-muted-foreground">{cell}</div>
                ))}
              </div>
            ))}
          </div>
          {/* Unmapped column prompt */}
          <div className="mb-3 rounded border border-blue-200 bg-blue-50 px-2 py-1.5 text-[10px] text-blue-700 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
            <NewBadge /> "author" in CSV has no matching column.{" "}
            <span className="underline cursor-pointer">Create new column "author" (text)?</span>
            {" "}or{" "}
            <span className="underline cursor-pointer">Skip this column</span>
          </div>
          {/* Summary */}
          <div className="mb-3 flex gap-4 text-[10px] text-muted-foreground">
            <span><strong className="text-foreground">10</strong> rows to import</span>
            <span><strong className="text-foreground">4</strong> columns matched</span>
            <span className="text-amber-600 dark:text-amber-400"><strong>2</strong> type conversions</span>
          </div>
          <div className="flex justify-end gap-2">
            <div className="rounded border border-muted-foreground/20 px-2 py-0.5 text-[10px] text-muted-foreground">← Back</div>
            <div className="rounded bg-accent px-3 py-0.5 text-[10px] font-semibold text-accent-foreground">Import 10 rows ✓</div>
          </div>
        </div>
      </div>
    </WF>
  );
}

function WF2C() {
  return (
    <WF>
      <WFLabel>V2c — Cache status + pre-execution cost estimation modal (NEW)</WFLabel>
      <div className="p-4">
        <div className="relative">
          {/* Background canvas hint */}
          <div className="mb-2 flex items-center gap-2 rounded border border-muted-foreground/20 bg-card/50 px-3 py-3 opacity-30 text-[10px]">
            <div className="rounded border border-muted-foreground/20 bg-card px-2 py-1">Schedule</div>
            <span className="text-muted-foreground/40">──▶</span>
            <div className="rounded border border-muted-foreground/20 bg-card px-2 py-1">OpenAI</div>
            <span className="text-muted-foreground/40">──▶</span>
            <div className="rounded border border-muted-foreground/20 bg-card px-2 py-1">Filter</div>
            <span className="text-muted-foreground/40">──▶</span>
            <div className="rounded border border-muted-foreground/20 bg-card px-2 py-1">Output</div>
          </div>
          {/* Modal */}
          <div className="rounded-lg border border-muted-foreground/30 bg-background/95 shadow-lg text-[11px]">
            <div className="border-b border-muted-foreground/15 px-4 py-3 flex items-center justify-between">
              <span className="font-semibold text-foreground">💰 Estimated Execution Cost</span>
              <span className="text-muted-foreground/40 text-[10px]">✕</span>
            </div>
            <div className="p-4">
              <div className="mb-3 overflow-hidden rounded border border-muted-foreground/20 text-[10px]">
                <div className="grid grid-cols-3 border-b border-muted-foreground/15 bg-secondary/40 px-2 py-1 font-semibold text-foreground/60">
                  <div>Node</div><div>Est. tokens</div><div>Est. cost</div>
                </div>
                {[
                  { node: "OpenAI GPT-4o", tok: "~2,500 tokens", cost: "~$0.04", warn: true },
                  { node: "Schedule Trigger", tok: "—", cost: "Free", warn: false },
                  { node: "Filter", tok: "—", cost: "Free", warn: false },
                ].map((r, i) => (
                  <div key={i} className={cn("grid grid-cols-3 border-b border-muted-foreground/10 px-2 py-1 last:border-0",
                    r.warn ? "bg-amber-50/50 dark:bg-amber-900/10" : ""
                  )}>
                    <div className={cn(r.warn ? "font-semibold text-foreground/80" : "text-muted-foreground")}>{r.node}</div>
                    <div className="text-muted-foreground">{r.tok}</div>
                    <div className={cn(r.warn ? "text-amber-600 dark:text-amber-400 font-semibold" : "text-muted-foreground")}>{r.cost}</div>
                  </div>
                ))}
                <div className="grid grid-cols-3 border-t border-muted-foreground/20 bg-secondary/30 px-2 py-1.5 font-semibold text-foreground/80">
                  <div>Total</div><div></div><div className="text-amber-600 dark:text-amber-400">~$0.04</div>
                </div>
              </div>
              <div className="mb-4 flex items-center gap-2 text-[10px] text-muted-foreground">
                <span className="flex size-3 items-center justify-center rounded border border-muted-foreground/30 text-[8px]">□</span>
                Don&apos;t show for free-only workflows
              </div>
              <div className="flex justify-end gap-2">
                <div className="rounded border border-muted-foreground/20 px-3 py-1 text-[10px] text-muted-foreground">Cancel</div>
                <div className="rounded bg-accent px-3 py-1 text-[10px] font-semibold text-accent-foreground">Run Workflow (~$0.04) ▶</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WF>
  );
}

function WF2D() {
  return (
    <WF>
      <WFLabel>V2d — Input Mode switch: confirmation before silent data loss (NEW)</WFLabel>
      <div className="p-4">
        <div className="relative">
          {/* Node config panel */}
          <div className="rounded border border-muted-foreground/20 bg-background/60 p-4 text-[11px]">
            <div className="mb-3 font-semibold text-foreground/70">HTTP Request — Configure</div>
            {/* Mode selector */}
            <div className="mb-3">
              <div className="mb-1 text-[10px] text-muted-foreground">Profile ID</div>
              <div className="mb-1.5 flex overflow-hidden rounded border border-muted-foreground/20 text-[10px]">
                <button className="flex-1 border-r border-muted-foreground/20 bg-secondary/60 px-2 py-1 text-muted-foreground">Fixed Value</button>
                <button className="flex-1 bg-accent/80 px-2 py-1 font-semibold text-accent-foreground">Expression ← clicking this</button>
              </div>
              <div className="rounded border border-muted-foreground/20 bg-secondary/30 px-2 py-1.5 text-[10px] text-foreground/70">
                12345  <span className="text-muted-foreground/40">(current fixed value)</span>
              </div>
            </div>
            {/* Confirmation popover */}
            <div className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-[10px] dark:border-amber-700 dark:bg-amber-900/20">
              <div className="mb-1.5 flex items-center gap-2 font-semibold text-amber-800 dark:text-amber-300">
                <NewBadge /> ⚠ Switching to Expression will clear &ldquo;12345&rdquo;
              </div>
              <p className="mb-2.5 leading-relaxed text-amber-700 dark:text-amber-400">
                Your fixed value will be lost. You can restore it manually. Continue?
              </p>
              <div className="flex gap-2">
                <button className="rounded border border-amber-400 bg-white px-2 py-0.5 font-semibold text-amber-800 dark:border-amber-600 dark:bg-amber-900/40 dark:text-amber-300">
                  Keep value, cancel
                </button>
                <button className="rounded bg-amber-500 px-2 py-0.5 font-semibold text-white dark:bg-amber-600">
                  Switch (clear value)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WF>
  );
}

function WF2E() {
  return (
    <WF>
      <WFLabel>V2e — Data Table node: actions grouped with search (H8 fix, NEW)</WFLabel>
      <div className="p-4">
        <div className="w-64 rounded border border-muted-foreground/20 bg-background/60 p-3 text-[11px]">
          <div className="mb-2 font-semibold text-foreground/70">Data table node — Action</div>
          {/* Search */}
          <div className="mb-3 flex items-center gap-1.5 rounded border border-muted-foreground/20 bg-secondary/30 px-2 py-1 text-[10px] text-muted-foreground">
            <span>🔍</span>
            <span className="text-muted-foreground/40">Search actions…</span>
            <NewBadge />
          </div>
          {/* Row actions group */}
          <div className="mb-2">
            <div className="mb-1 text-[9px] font-bold uppercase tracking-wider text-muted-foreground/50">Row Actions <NewBadge /></div>
            {["Get row","Get many rows","Insert row","Update row","Update many rows","Upsert row","Delete row"].map((a, i) => (
              <div key={i} className={cn("rounded px-2 py-1 text-[10px] cursor-pointer", i === 1 ? "bg-accent/20 font-semibold text-foreground" : "text-muted-foreground hover:bg-secondary/40")}>
                {a} {i === 1 && <span className="ml-1 text-[8px] text-muted-foreground/50">(selected)</span>}
              </div>
            ))}
          </div>
          {/* Table actions group */}
          <div>
            <div className="mb-1 mt-2 border-t border-dashed border-muted-foreground/15 pt-2 text-[9px] font-bold uppercase tracking-wider text-muted-foreground/50">Table Actions <NewBadge /></div>
            {["Create table","Delete table","Get many tables","Get schema"].map((a, i) => (
              <div key={i} className="rounded px-2 py-1 text-[10px] text-muted-foreground hover:bg-secondary/40 cursor-pointer">{a}</div>
            ))}
          </div>
        </div>
      </div>
    </WF>
  );
}

function WF2F() {
  return (
    <WF>
      <WFLabel>V2f — Filter node: AND/OR toggle + reset + per-workflow presets (FINAL)</WFLabel>
      <div className="p-4">
        <div className="rounded border border-muted-foreground/20 bg-background/60 p-3 text-[11px]">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-semibold text-foreground/70">Filter conditions</span>
            <div className="flex items-center gap-2">
              {/* AND/OR toggle */}
              <div className="flex overflow-hidden rounded border border-muted-foreground/20 text-[10px]">
                <button className="border-r border-muted-foreground/20 bg-accent/80 px-2 py-0.5 font-semibold text-accent-foreground">AND</button>
                <button className="px-2 py-0.5 text-muted-foreground">OR</button>
              </div>
              <NewBadge />
              <button className="flex items-center gap-1 rounded border border-dashed border-red-300 px-2 py-0.5 text-[10px] text-red-500 dark:border-red-700 dark:text-red-400">
                ↺ Reset
              </button>
            </div>
          </div>
          <div className="mb-2 flex flex-col gap-1.5">
            {[
              { field: "Score", op: "> (greater than)", val: "7" },
              { field: "Date", op: "is after", val: "2025-01-01" },
            ].map((c, i) => (
              <div key={i} className="flex items-center gap-1.5 rounded border border-muted-foreground/20 bg-card px-2 py-1.5">
                {i > 0 && (
                  <span className="mr-0.5 rounded bg-accent/30 px-1 py-0.5 text-[9px] font-bold text-foreground/60">AND</span>
                )}
                <div className="rounded border border-muted-foreground/15 bg-secondary/40 px-1.5 py-0.5 text-[10px] text-foreground/70">{c.field}</div>
                <div className="rounded border border-muted-foreground/15 bg-secondary/40 px-1.5 py-0.5 text-[10px] text-muted-foreground">{c.op}</div>
                <div className="rounded border border-muted-foreground/15 bg-secondary/40 px-1.5 py-0.5 text-[10px] text-foreground/70">{c.val}</div>
                <span className="ml-auto cursor-pointer text-[10px] text-muted-foreground/40">✕</span>
              </div>
            ))}
          </div>
          <div className="mb-3 cursor-pointer text-[10px] text-muted-foreground/60 hover:text-foreground">+ Add condition</div>
          <div className="border-t border-dashed border-muted-foreground/15 pt-2">
            <div className="mb-1 flex items-center justify-between text-[10px] text-muted-foreground/50">
              <span>Saved presets (this workflow)</span>
              <NewBadge />
              <span className="cursor-pointer text-foreground/60">💾 Save</span>
            </div>
            {["High score only (Score > 7)", "Recent (Date > 2025)"].map((p, i) => (
              <div key={i} className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-[10px] text-muted-foreground hover:bg-secondary/40">
                <span>📋</span>{p}<span className="ml-auto text-muted-foreground/30">Apply</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </WF>
  );
}

/* ── page data ── */

const resolvedQuestions = [
  {
    q: "Cache invalidation granularity",
    resolution: "Modifying a node's configuration invalidates only that node's cache. Upstream nodes stay green. This means \"Run from Filter\" still uses the cached Data Table output even if Filter itself was edited.",
    decision: "Configuration changes invalidate; connection re-routing invalidates the re-routed node and all downstream nodes.",
  },
  {
    q: "Filter presets scope",
    resolution: "Per-workflow scope. Each workflow maintains its own preset list. Cross-workflow reuse is not needed for the target user profile (single-workflow builders); global presets add complexity with minimal benefit.",
    decision: "Per-workflow. If demand emerges, can be promoted to global later.",
  },
  {
    q: "Tables panel placement",
    resolution: "Slide-out overlay wins over persistent sidebar panel and modal. Slide-out preserves canvas space for most editing sessions; appears only on demand; does not block editing while open.",
    decision: "Slide-out panel triggered by the 'Tables' toolbar button.",
  },
  {
    q: "Cost warning for LLM nodes",
    resolution: "Implemented as V2c. Cost modal appears before execution when any node has a known per-call cost (OpenAI, Anthropic, etc.). The user can opt out per-workflow. This uses per-provider static pricing data embedded in n8n.",
    decision: "Show modal by default; add 'Don't show for free-only workflows' toggle.",
  },
  {
    q: "Mobile / responsive indicators",
    resolution: "Deprioritized. The target users (workflow builders) work on desktop. Cache status indicators in the execution log are sufficient for occasional mobile checks. Not included in V2.",
    decision: "Not in scope for this redesign cycle.",
  },
];

const evolutionLog = [
  { v: "V0", phase: "Baseline", change: "Documented current n8n UI screenshots (4D)", motivation: "Establish comparison point" },
  { v: "V1a", phase: "4D first draft", change: "Sidebar: Data Tables as top-level item", motivation: "UP1 (sev. 3): all 3 participants looked in sidebar first" },
  { v: "V1b", phase: "4D first draft", change: "Editor: cache status dots + Run from here + Tables toolbar button", motivation: "UP6 (sev. 4): highest-impact problem; LLM cost waste" },
  { v: "V1c", phase: "4D first draft", change: "CSV import: two-step column-mapping wizard (Step 1 only)", motivation: "UP3, UP4, UP5: all participants struggled with silent failures" },
  { v: "V1d", phase: "4D first draft", change: "Filter: reset button + saved presets", motivation: "UP7: minor fix + H7 efficiency for experts" },
  { v: "V1e", phase: "4D first draft", change: "Pinned data: table editor + staleness warning + refresh", motivation: "UP8, UP9: stale data confusion and JSON barrier" },
  { v: "V1f", phase: "4D first draft", change: "Duplicate table: auto-append (copy) + ID in dropdowns", motivation: "UP10 (sev. 3): all participants confused by identical names" },
  { v: "V2a", phase: "4E final", change: "Sidebar: added first-use tooltip explaining the move; Tables shortcut promoted to toolbar button", motivation: "Open question #3 resolved; UP2 closed (editor now has Tables path)" },
  { v: "V2b", phase: "4E final", change: "CSV import: Step 2 preview + unmapped column prompt added", motivation: "Wizard was incomplete in V1c; Step 2 is where commits happen — show data before confirming" },
  { v: "V2c", phase: "4E final", change: "NEW: Cost estimation modal before executing LLM-heavy workflows", motivation: "Open question #4 resolved; critical for LLM users (no cost surprises)" },
  { v: "V2d", phase: "4E final", change: "NEW: Input mode switch confirmation popover", motivation: "H3 violation (switching mode silently clears field values); observed in P1" },
  { v: "V2e", phase: "4E final", change: "NEW: Data Table node actions grouped with search", motivation: "H8 (11 flat items → 2 labeled groups + search reduces cognitive load)" },
  { v: "V2f", phase: "4E final", change: "Filter: AND/OR logic toggle added; presets confirmed as per-workflow", motivation: "Open question #2 resolved; AND/OR toggle is the next most-requested filter feature" },
];

const rationale = [
  {
    principle: "Nielsen H6 — Recognition Over Recall",
    evolution: "V1a moved Data Tables to the sidebar (visible). V2a adds a first-use tooltip and a toolbar shortcut in the editor. Both surfaces now surface the feature without requiring the user to remember where it is.",
  },
  {
    principle: "Nielsen H1 — Visibility of System Status",
    evolution: "V1b introduced per-node cache dots. V2a refines the labels (cached / modified / not run). V2c adds the cost modal which makes API cost visible before it is incurred — a form of 'financial status visibility.'",
  },
  {
    principle: "Nielsen H5 — Error Prevention",
    evolution: "V1c wizard prevents bad imports. V2b's Step 2 preview prevents committing a wrong dataset. V2d's confirmation popover prevents accidental field value loss. V1f's auto-naming prevents table confusion in dropdowns.",
  },
  {
    principle: "Nielsen H3 — User Control and Freedom",
    evolution: "V1d reset button restores control in filters. V2d's 'Keep value, cancel' button is the emergency exit for mode switching. V2c's 'Cancel' stops costly execution before it starts.",
  },
  {
    principle: "Nielsen H7 — Flexibility and Efficiency of Use",
    evolution: "V1b's 'Run from here' lets experts skip unchanged upstream nodes. V2f's AND/OR toggle and presets accelerate complex filter authoring. V2e's action search lets power users jump directly to the action they need.",
  },
  {
    principle: "Norman — Affordance and Constraints",
    evolution: "V2e groups node actions with labeled categories, so the visual structure constrains choice and guides scanning. V2c's per-node cost table makes the cost source transparent, not just the total.",
  },
];

const references = [
  { c: "Krug, S. (2014).", w: "Don't Make Me Think, Revisited.", p: "New Riders." },
  { c: "Nielsen, J. (1994).", w: '"10 Usability Heuristics for User Interface Design."', p: "Nielsen Norman Group." },
  { c: "Norman, D. (2013).", w: "The Design of Everyday Things: Revised and Expanded Edition.", p: "Basic Books." },
  { c: "Shneiderman, B. (1983).", w: '"Direct Manipulation: A Step Beyond Programming Languages."', p: "IEEE Computer, 16(8), 57–69." },
  { c: "Snyder, C. (2003).", w: "Paper Prototyping: The Fast and Easy Way to Design and Refine User Interfaces.", p: "Morgan Kaufmann." },
];

/* ── page ── */

export default function Page4E() {
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
            Phase 4E
          </Badge>
          <Badge variant="outline" className="bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800">
            Done
          </Badge>
          <span className="text-sm text-muted-foreground">April 2026</span>
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground">
          Final Redesign — Version 2
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
          Final iteration of the n8n redesign. Builds on the six first-draft wireframes from Phase 4D,
          resolves all five open questions, and introduces three new design components not addressed in
          the first draft. Includes a full design rationale tracing the evolution from V0 (baseline)
          through V1 (4D) to V2 (this final version).
        </p>
      </div>

      {/* Version timeline strip */}
      <div className="mb-10 flex items-stretch gap-0 overflow-hidden rounded-lg border text-sm">
        {[
          { label: "V0", desc: "Baseline screenshots", phase: "Pre-4D", color: "bg-secondary/40" },
          { label: "V1", desc: "6 wireframes (4D)", phase: "First Draft", color: "bg-amber-50 dark:bg-amber-900/20" },
          { label: "V2", desc: "6 refined + 3 new (4E)", phase: "Final", color: "bg-emerald-50 dark:bg-emerald-900/20", active: true },
        ].map((v, i) => (
          <div key={i} className={cn("flex-1 border-r px-4 py-4 last:border-0", v.color)}>
            <div className={cn("text-xs font-bold uppercase tracking-wider mb-0.5", v.active ? "text-emerald-700 dark:text-emerald-400" : "text-muted-foreground")}>
              {v.label} {v.active && "← current"}
            </div>
            <div className="font-semibold text-foreground text-sm">{v.phase}</div>
            <div className="text-xs text-muted-foreground">{v.desc}</div>
          </div>
        ))}
      </div>

      {/* §1 Resolved Open Questions */}
      <section className="mb-14" id="resolved">
        <SectionTitle>1 · Resolved Open Questions from 4D</SectionTitle>
        <Sub>All five design decisions left open after the first draft are now resolved.</Sub>
        <div className="flex flex-col gap-4">
          {resolvedQuestions.map((item, i) => (
            <div key={i} className="rounded-lg border bg-card p-5">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  ✓
                </div>
                <p className="font-semibold text-foreground">{item.q}</p>
              </div>
              <p className="mb-2 text-sm leading-relaxed text-muted-foreground">{item.resolution}</p>
              <div className="rounded bg-secondary/50 px-3 py-1.5 text-xs text-muted-foreground">
                <strong className="text-foreground">Decision: </strong>{item.decision}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* §2 Final Designs */}
      <section className="mb-14" id="designs">
        <SectionTitle>2 · Final Design Components (V2)</SectionTitle>
        <Sub>
          Six refined components from V1 and three new components first introduced in V2.
          Each wireframe is annotated with what changed from the previous version and why.
        </Sub>

        {/* V2a */}
        <div className="mb-10">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="font-mono text-xs">V2a</Badge>
            <H3>Sidebar + Editor Integration — First-Use Tooltip and Toolbar Shortcut</H3>
            <DeltaBadge>Refined from V1a + V1b</DeltaBadge>
          </div>
          <div className="mb-1 flex flex-wrap gap-2 text-xs text-muted-foreground">
            <span><strong className="text-foreground">Added in V2:</strong> First-use tooltip explaining the move; Tables button promoted to editor toolbar.</span>
          </div>
          <div className="mb-4">
            <WF2A />
          </div>
          <Rationale>
            <strong>What changed from V1:</strong> V1a added Data Tables to the sidebar but left a gap: users already inside the workflow editor still had no quick path. V2a closes this by placing a persistent &ldquo;Tables&rdquo; button directly in the editor toolbar. The first-use tooltip addresses the transition cost — existing users who were accustomed to the old location receive a one-time explanation rather than being silently confused.
            <br /><br />
            The tooltip follows <strong>Norman&rsquo;s principle of affordance</strong>: the system signals what changed and why, reducing the search cost from ~3 minutes (4C study average for Task 1) toward near-zero for returning users.
          </Rationale>
        </div>

        {/* V2b */}
        <div className="mb-10">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="font-mono text-xs">V2b</Badge>
            <H3>CSV Import Wizard — Step 2: Preview and Commit</H3>
            <DeltaBadge>Refined from V1c</DeltaBadge>
          </div>
          <div className="mb-1 text-xs text-muted-foreground">
            <strong className="text-foreground">Added in V2:</strong> Step 2 now shows a data preview table and an unmapped-column resolution prompt. V1c only showed Step 1 (column mapping).
          </div>
          <div className="mb-4">
            <WF2B />
          </div>
          <Rationale>
            <strong>What changed from V1:</strong> The V1c wizard stopped at column mapping (Step 1). Users still had to commit the import &ldquo;blind.&rdquo; V2b adds Step 2: a preview of the first three rows in the target schema before committing, and an explicit prompt for columns in the CSV that have no matching table column (&ldquo;Create new / Skip?&rdquo;).
            <br /><br />
            This completes the <strong>Nielsen H5 (Error Prevention)</strong> story: the user sees exactly what will be written to the table, with type annotations, before clicking &ldquo;Import.&rdquo; The unmapped-column prompt also addresses P2&rsquo;s experience in the study where header mismatches silently dropped data.
          </Rationale>
        </div>

        {/* V2c */}
        <div className="mb-10">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="font-mono text-xs">V2c</Badge>
            <H3>Pre-Execution Cost Estimation Modal</H3>
            <NewBadge />
          </div>
          <div className="mb-1 text-xs text-muted-foreground">
            <strong className="text-foreground">New in V2:</strong> Resolves open question #4. Modal appears before executing any workflow containing LLM or paid-API nodes.
          </div>
          <div className="mb-4">
            <WF2C />
          </div>
          <Rationale>
            <strong>Motivation:</strong> The 4D open question asked whether &ldquo;Run from here&rdquo; should estimate API cost before executing. The answer is yes — but the estimate belongs at the global execution level (the Execute button), not per-node. The modal intercepts only workflows with at least one paid node.
            <br /><br />
            <strong>Design decisions:</strong> Per-node cost table (not just a total) helps users identify which node drives cost. The &ldquo;Don&rsquo;t show for free-only workflows&rdquo; checkbox respects expert users who build purely free workflows. This follows <strong>Nielsen H1 (Visibility of Status)</strong> applied to financial status — the system makes invisible costs visible before they are incurred.
            <br /><br />
            <strong>Pricing data source:</strong> n8n already detects which AI nodes are configured; static pricing tables per provider (OpenAI, Anthropic, etc.) can be bundled with the app and updated via node package versions.
          </Rationale>
        </div>

        {/* V2d */}
        <div className="mb-10">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="font-mono text-xs">V2d</Badge>
            <H3>Input Mode Switch Confirmation</H3>
            <NewBadge />
          </div>
          <div className="mb-1 text-xs text-muted-foreground">
            <strong className="text-foreground">New in V2:</strong> Addresses H3 violation identified in 4B — switching &ldquo;Input Data Mode&rdquo; silently discards entered field values.
          </div>
          <div className="mb-4">
            <WF2D />
          </div>
          <Rationale>
            <strong>Motivation:</strong> A user types a Profile ID (&ldquo;12345&rdquo;) into a Fixed Value field, then accidentally clicks Expression mode — the value silently disappears. There is no undo. This was observed with P1 during the 4C user study (Task 3) and is a textbook <strong>Nielsen H3 (User Control and Freedom)</strong> violation.
            <br /><br />
            <strong>Design decisions:</strong> A simple inline popover (not a full modal) keeps the confirmation close to the action. Two asymmetric buttons — &ldquo;Keep value, cancel&rdquo; (safe, default-styled) and &ldquo;Switch (clear value)&rdquo; (destructive, filled) — make the safer choice easier to click. This follows <strong>Norman&rsquo;s principle of forcing functions</strong>: the system forces a deliberate choice before the irreversible action.
            <br /><br />
            <strong>Tradeoff:</strong> The confirmation adds one click for users who intentionally switch modes. Mitigated by making &ldquo;Switch&rdquo; the smaller button so it is slightly harder to click accidentally but still accessible.
          </Rationale>
        </div>

        {/* V2e */}
        <div className="mb-10">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="font-mono text-xs">V2e</Badge>
            <H3>Data Table Node — Grouped Actions with Search</H3>
            <NewBadge />
          </div>
          <div className="mb-1 text-xs text-muted-foreground">
            <strong className="text-foreground">New in V2:</strong> Addresses H8 finding — 11 actions in a flat list replaced by two labeled groups + search field.
          </div>
          <div className="mb-4">
            <WF2E />
          </div>
          <Rationale>
            <strong>Motivation:</strong> The heuristic analysis (4B, H8) flagged that the Data Table node lists 11 actions in a flat, undifferentiated list. New users spend significant time scanning it. The natural split — 7 Row Actions + 4 Table Actions — already exists conceptually in n8n&rsquo;s documentation.
            <br /><br />
            <strong>Design decisions:</strong> Two labeled groups with visual separators follow the <strong>Gestalt principle of common region</strong>. The search field accelerates expert access without removing the structure for beginners. This is a pure <strong>Nielsen H8 (Aesthetic and Minimalist Design)</strong> win — no functionality is removed, only organized.
            <br /><br />
            <strong>Implementation cost:</strong> Very low — this is a configuration change in the node&rsquo;s action dropdown definition. No backend changes required.
          </Rationale>
        </div>

        {/* V2f */}
        <div className="mb-10">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="font-mono text-xs">V2f</Badge>
            <H3>Filter Node — AND/OR Logic Toggle, Presets Final</H3>
            <DeltaBadge>Refined from V1d</DeltaBadge>
          </div>
          <div className="mb-1 text-xs text-muted-foreground">
            <strong className="text-foreground">Added in V2:</strong> AND/OR logic toggle between conditions; presets confirmed as per-workflow scope (resolves open question #2).
          </div>
          <div className="mb-4">
            <WF2F />
          </div>
          <Rationale>
            <strong>What changed from V1:</strong> V1d added a reset button and presets. V2f adds the AND/OR toggle. n8n&rsquo;s current Filter node supports AND/OR logic but exposes it deep in the node settings — it is not visible on the main conditions list. Promoting it to the top of the conditions panel makes the logic explicit and adjustable without digging.
            <br /><br />
            <strong>Open question #2 resolved:</strong> Presets are per-workflow. The decision is based on n8n&rsquo;s primary usage pattern — each workflow has a distinct domain and data schema, so a preset built around one table&rsquo;s columns is unlikely to be reusable in another workflow. Per-workflow scope keeps presets relevant and avoids a long shared list.
          </Rationale>
        </div>
      </section>

      {/* §3 Evolution Table */}
      <section className="mb-14" id="evolution">
        <SectionTitle>3 · Complete Design Evolution Log</SectionTitle>
        <Sub>Full version history from baseline through first draft to final redesign.</Sub>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b bg-secondary/50">
                <th className="px-3 py-2.5 text-left font-semibold text-foreground">Version</th>
                <th className="px-3 py-2.5 text-left font-semibold text-foreground">Phase</th>
                <th className="px-3 py-2.5 text-left font-semibold text-foreground">Change</th>
                <th className="px-3 py-2.5 text-left font-semibold text-foreground">Motivation</th>
              </tr>
            </thead>
            <tbody>
              {evolutionLog.map((r) => (
                <tr key={r.v} className={cn("border-b last:border-0", r.phase === "4E final" ? "bg-emerald-50/40 dark:bg-emerald-900/10" : "")}>
                  <td className="px-3 py-2.5 font-mono text-xs font-semibold text-foreground">{r.v}</td>
                  <td className="px-3 py-2.5 text-xs text-muted-foreground whitespace-nowrap">{r.phase}</td>
                  <td className="px-3 py-2.5 text-sm text-muted-foreground">{r.change}</td>
                  <td className="px-3 py-2.5 text-sm text-muted-foreground">{r.motivation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* §4 Design Rationale */}
      <section className="mb-14" id="rationale">
        <SectionTitle>4 · Design Rationale — Principles Behind the Evolution</SectionTitle>
        <Sub>How each core design principle shaped decisions across all three versions.</Sub>
        <div className="flex flex-col gap-4">
          {rationale.map((r, i) => (
            <div key={i} className="rounded-lg border bg-card p-5">
              <p className="mb-2 font-semibold text-foreground">{r.principle}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{r.evolution}</p>
            </div>
          ))}
        </div>
      </section>

      {/* §5 References */}
      <section className="mb-12" id="references">
        <SectionTitle>References</SectionTitle>
        <div className="flex flex-col gap-2 rounded-lg border bg-card p-5">
          {references.map((ref, i) => (
            <p key={i} className="text-sm leading-relaxed text-muted-foreground">
              {ref.c} <em className="text-foreground">{ref.w}</em> {ref.p}
            </p>
          ))}
        </div>
      </section>

      {/* Footer nav */}
      <div className="flex items-center justify-between border-t pt-6">
        <Link href="/4d" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="size-3.5" /> 4D — First Draft
        </Link>
        <span className="text-sm text-muted-foreground">Assignment 4 complete</span>
      </div>

      <BackToTop />
    </div>
  );
}
