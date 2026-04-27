import Link from "next/link";
import { BackToTop } from "@/components/back-to-top";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "4D — Redesign: First Draft",
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
  return (
    <h3 className="mb-3 text-base font-semibold text-foreground">{children}</h3>
  );
}

function Rationale({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 rounded-md border-l-2 border-accent bg-secondary/30 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
      {children}
    </div>
  );
}

function ScreenshotFrame({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  return (
    <figure className="overflow-hidden rounded-lg border bg-secondary/20">
      <img
        src={src}
        alt={alt}
        className="w-full object-cover"
      />
      <figcaption className="border-t px-4 py-2 text-xs text-muted-foreground italic">
        {caption}
      </figcaption>
    </figure>
  );
}

/* ── inline wireframe components ── */

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

function Wireframe1A() {
  return (
    <WF>
      <WFLabel>Wireframe 1A — Redesigned sidebar navigation</WFLabel>
      <div className="flex overflow-hidden rounded-b-lg text-[11px]">
        <div className="w-44 shrink-0 border-r border-dashed border-muted-foreground/20 bg-secondary/40 p-2 flex flex-col gap-0.5">
          <div className="mb-1 px-2 text-[9px] font-bold uppercase tracking-widest text-muted-foreground/50">n8n</div>
          {[
            { icon: "🏠", label: "Overview" },
            { icon: "👤", label: "Personal" },
            { icon: "💬", label: "Chat" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 rounded px-2 py-1.5 text-muted-foreground hover:bg-secondary/60">
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 rounded border border-dashed border-emerald-400 bg-emerald-50 px-2 py-1.5 text-emerald-700 dark:border-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400">
            <span>📋</span>
            <span className="font-semibold">Data Tables</span>
            <span className="ml-auto text-[9px] bg-emerald-200 dark:bg-emerald-800 px-1 rounded text-emerald-700 dark:text-emerald-300">NEW</span>
          </div>
          <div className="mt-1 border-t border-dashed border-muted-foreground/15 pt-1">
            {[
              { icon: "📄", label: "Templates" },
              { icon: "📊", label: "Insights" },
              { icon: "❓", label: "Help" },
              { icon: "⚙", label: "Settings" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 rounded px-2 py-1.5 text-muted-foreground hover:bg-secondary/60">
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 p-4">
          <div className="mb-2 text-[11px] font-semibold text-foreground/70">Data Tables</div>
          <div className="mb-3 flex gap-2">
            <div className="rounded border border-muted-foreground/20 bg-card px-2 py-1 text-[10px]">+ New table</div>
            <div className="rounded border border-muted-foreground/20 bg-card px-2 py-1 text-[10px]">Import CSV</div>
          </div>
          <div className="rounded border border-muted-foreground/20 overflow-hidden text-[10px]">
            <div className="grid grid-cols-4 border-b border-muted-foreground/15 bg-secondary/40 px-3 py-1.5 font-semibold text-foreground/60">
              <span className="col-span-2">Name</span>
              <span>Rows</span>
              <span>Modified</span>
            </div>
            {[
              { name: "Articles", rows: "10", mod: "Just now" },
              { name: "Products", rows: "42", mod: "2 days ago" },
            ].map((t) => (
              <div key={t.name} className="grid grid-cols-4 border-b border-muted-foreground/10 px-3 py-1.5 last:border-0 text-muted-foreground">
                <span className="col-span-2 flex items-center gap-1.5"><span>📋</span>{t.name}</span>
                <span>{t.rows}</span>
                <span>{t.mod}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </WF>
  );
}

function Wireframe1B() {
  return (
    <WF>
      <WFLabel>Wireframe 1B — Workflow editor with cache indicators and Tables panel</WFLabel>
      <div className="p-4 text-[11px]">
        {/* Toolbar */}
        <div className="mb-3 flex items-center justify-between rounded border border-muted-foreground/20 bg-card px-3 py-2">
          <span className="font-semibold text-foreground/70">My Workflow</span>
          <div className="flex items-center gap-1.5">
            {["➕", "🔍", "📋"].map((icon) => (
              <div key={icon} className="rounded border border-muted-foreground/20 px-2 py-1 text-[10px]">{icon}</div>
            ))}
            <div className="rounded border-2 border-dashed border-violet-400 bg-violet-50 dark:bg-violet-900/20 px-2 py-1 text-[10px] text-violet-700 dark:text-violet-400 font-semibold">
              📋 Tables
            </div>
            <div className="ml-1 rounded border border-muted-foreground/20 bg-foreground/10 px-2 py-1 text-[10px]">✨ AI</div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="rounded bg-secondary px-3 py-1 text-[10px]">Run from selected ▶</div>
            <div className="rounded bg-accent px-3 py-1 text-[10px] text-accent-foreground">Execute ▶</div>
          </div>
        </div>
        {/* Canvas */}
        <div className="mb-3 flex items-center gap-2 rounded border border-muted-foreground/20 bg-card/50 px-4 py-6">
          {[
            { label: "Schedule", status: "green", cached: "Cached" },
            { label: "Data Table", status: "green", cached: "Cached" },
            { label: "Filter", status: "orange", cached: "Modified" },
            { label: "Output", status: "gray", cached: "Not run" },
          ].map((node, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="flex flex-col items-center gap-1.5">
                <div className={cn(
                  "rounded border px-3 py-2 text-[10px] font-medium",
                  node.status === "orange" ? "border-orange-400 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400" : "border-muted-foreground/20 bg-card text-foreground/70"
                )}>
                  {node.label}
                </div>
                <div className="flex items-center gap-1 text-[9px]">
                  <span className={cn("size-2 rounded-full",
                    node.status === "green" ? "bg-emerald-500" :
                    node.status === "orange" ? "bg-orange-400" : "bg-muted-foreground/30"
                  )} />
                  <span className={cn(
                    node.status === "green" ? "text-emerald-600 dark:text-emerald-400" :
                    node.status === "orange" ? "text-orange-600 dark:text-orange-400" : "text-muted-foreground/50"
                  )}>{node.cached}</span>
                </div>
              </div>
              {i < 3 && <span className="text-muted-foreground/30 text-[10px]">──▶</span>}
            </div>
          ))}
        </div>
        {/* Bottom panel */}
        <div className="rounded border border-muted-foreground/20 bg-card text-[10px]">
          <div className="flex border-b border-muted-foreground/15">
            {["Logs", "Output", "Cache"].map((tab, i) => (
              <div key={tab} className={cn("px-3 py-1.5", i === 2 ? "border-b-2 border-foreground/70 font-semibold text-foreground" : "text-muted-foreground")}>{tab}</div>
            ))}
          </div>
          <div className="p-3 text-muted-foreground">
            <div className="mb-1 flex items-center gap-2">
              <span className="size-2 rounded-full bg-orange-400" />
              <span className="font-semibold text-foreground/70">Filter node — cache stale (modified 1 min ago)</span>
            </div>
            <div className="flex items-center gap-2 text-[9px]">
              <div className="rounded border border-muted-foreground/20 px-2 py-0.5">View cached output</div>
              <div className="rounded bg-accent/80 px-2 py-0.5 text-accent-foreground">Run from Filter ▶</div>
            </div>
          </div>
        </div>
        {/* Tables slide-out hint */}
        <div className="mt-2 rounded border border-dashed border-violet-300 dark:border-violet-700 bg-violet-50/50 dark:bg-violet-900/10 p-2 text-[10px] text-violet-600 dark:text-violet-400">
          📋 Tables panel (slide-out): Articles (10 rows) · Products (42 rows) · + New table
        </div>
      </div>
    </WF>
  );
}

function Wireframe1C() {
  return (
    <WF>
      <WFLabel>Wireframe 1C — Two-step CSV import wizard</WFLabel>
      <div className="p-4">
        <div className="rounded border border-muted-foreground/20 bg-background/60 p-4 text-[11px]">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-semibold text-foreground/80">Import CSV into Articles</span>
            <span className="text-muted-foreground/40">✕</span>
          </div>
          <div className="mb-3 flex items-center gap-2 text-[10px]">
            <div className="flex items-center gap-1 rounded bg-accent/80 px-2 py-0.5 text-accent-foreground font-semibold">
              <span className="flex size-4 items-center justify-center rounded-full bg-accent text-[8px] font-bold text-accent-foreground">1</span>
              Map Columns
            </div>
            <span className="text-muted-foreground/30">──</span>
            <div className="flex items-center gap-1 rounded border border-muted-foreground/20 px-2 py-0.5 text-muted-foreground">
              <span className="flex size-4 items-center justify-center rounded-full border border-muted-foreground/30 text-[8px]">2</span>
              Preview & Import
            </div>
          </div>
          <div className="mb-3">
            <div className="mb-1.5 text-[10px] font-semibold text-foreground/60">Column mapping</div>
            <div className="grid grid-cols-3 gap-1 text-[10px]">
              <div className="font-semibold text-muted-foreground/60">CSV column</div>
              <div className="font-semibold text-muted-foreground/60">Table column</div>
              <div className="font-semibold text-muted-foreground/60">Type check</div>
              {[
                { csv: "article_title", tbl: "Title ✏", check: "Text ✓", ok: true },
                { csv: "url", tbl: "URL ✏", check: "Text ✓", ok: true },
                { csv: "pub_date", tbl: "Date ✏", check: "Date ⚠ convert", ok: false },
                { csv: "score", tbl: "Score ✏", check: "Number ⚠ 0 errors", ok: false },
                { csv: "author", tbl: "— unmapped —", check: "+ Create column", ok: null },
              ].map(({ csv, tbl, check, ok }, i) => (
                <>
                  <div key={`csv-${i}`} className="rounded border border-muted-foreground/15 px-1.5 py-0.5 text-muted-foreground">{csv}</div>
                  <div key={`tbl-${i}`} className="rounded border border-muted-foreground/15 px-1.5 py-0.5 text-foreground/70">{tbl}</div>
                  <div key={`chk-${i}`} className={cn("px-1.5 py-0.5 rounded text-[9px]",
                    ok === true ? "text-emerald-600 dark:text-emerald-400" :
                    ok === false ? "text-amber-600 dark:text-amber-400" :
                    "text-blue-600 dark:text-blue-400"
                  )}>{check}</div>
                </>
              ))}
            </div>
          </div>
          <div className="mb-3 rounded bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 px-2 py-1.5 text-[10px] text-amber-700 dark:text-amber-400">
            ⚠ pub_date: values like &ldquo;2025-01-15&rdquo; will be auto-converted to Date.<br />
            ⚠ score: all 10 values are numeric — safe to import as Number.
          </div>
          <div className="flex justify-end gap-2">
            <div className="rounded border border-muted-foreground/20 px-2 py-0.5 text-[10px] text-muted-foreground">Cancel</div>
            <div className="rounded bg-accent px-3 py-0.5 text-[10px] text-accent-foreground">Next: Preview →</div>
          </div>
        </div>
      </div>
    </WF>
  );
}

function Wireframe1D() {
  return (
    <WF>
      <WFLabel>Wireframe 1D — Filter node with reset button and presets</WFLabel>
      <div className="p-4">
        <div className="rounded border border-muted-foreground/20 bg-background/60 p-3 text-[11px]">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-semibold text-foreground/70">Filter conditions</span>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1 rounded border border-dashed border-red-300 dark:border-red-700 px-2 py-0.5 text-[10px] text-red-500 dark:text-red-400">
                ↺ Reset all
              </button>
            </div>
          </div>
          {/* Conditions */}
          <div className="mb-2 flex flex-col gap-1.5">
            {[
              { field: "Score", op: "> (greater than)", val: "7" },
              { field: "Date", op: "is after", val: "2025-01-01" },
            ].map((c, i) => (
              <div key={i} className="flex items-center gap-1.5 rounded border border-muted-foreground/20 bg-card px-2 py-1.5">
                <div className="rounded border border-muted-foreground/15 bg-secondary/40 px-1.5 py-0.5 text-[10px] text-foreground/70">{c.field}</div>
                <div className="rounded border border-muted-foreground/15 bg-secondary/40 px-1.5 py-0.5 text-[10px] text-muted-foreground">{c.op}</div>
                <div className="rounded border border-muted-foreground/15 bg-secondary/40 px-1.5 py-0.5 text-[10px] text-foreground/70">{c.val}</div>
                <span className="ml-auto text-[10px] text-muted-foreground/40 cursor-pointer">✕</span>
              </div>
            ))}
          </div>
          <div className="mb-3 text-[10px] text-muted-foreground/60 cursor-pointer hover:text-foreground">
            + Add condition
          </div>
          {/* Presets — below separator */}
          <div className="border-t border-dashed border-muted-foreground/15 pt-2">
            <div className="mb-1 flex items-center justify-between text-[10px] text-muted-foreground/50">
              <span>Saved presets</span>
              <span className="cursor-pointer text-foreground/60">💾 Save current</span>
            </div>
            {["High score only (Score > 7)", "Recent articles (Date > 2025)"].map((p, i) => (
              <div key={i} className="flex items-center gap-2 rounded px-2 py-1 text-[10px] text-muted-foreground hover:bg-secondary/40 cursor-pointer">
                <span>📋</span>{p}
                <span className="ml-auto text-muted-foreground/30">Apply</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </WF>
  );
}

function Wireframe1E() {
  return (
    <WF>
      <WFLabel>Wireframe 1E — Pinned data: table view editor with staleness warning</WFLabel>
      <div className="p-4">
        <div className="rounded border border-muted-foreground/20 bg-background/60 p-3 text-[11px]">
          <div className="mb-2 flex items-center gap-2">
            <span className="font-semibold text-foreground/70">📌 Pinned test data</span>
            <span className="ml-auto flex items-center gap-1.5 rounded bg-amber-100 dark:bg-amber-900/30 px-2 py-0.5 text-[10px] font-semibold text-amber-700 dark:text-amber-400">
              ⚠ STALE
            </span>
          </div>
          {/* Staleness alert */}
          <div className="mb-3 rounded border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20 px-2 py-2 text-[10px] text-amber-700 dark:text-amber-400">
            Upstream node &ldquo;Data Table&rdquo; was modified 2 min ago. Pinned data may not reflect current table schema.
            <div className="mt-1.5 flex gap-2">
              <div className="rounded border border-amber-400 dark:border-amber-600 px-2 py-0.5 text-[9px] cursor-pointer">↺ Refresh from last run</div>
              <div className="rounded border border-muted-foreground/20 px-2 py-0.5 text-[9px] text-muted-foreground cursor-pointer">Keep stale data</div>
            </div>
          </div>
          {/* View toggle */}
          <div className="mb-2 flex items-center gap-1 text-[10px]">
            <div className="rounded border-b-2 border-foreground/70 px-2 py-0.5 font-semibold text-foreground">Table view</div>
            <div className="rounded px-2 py-0.5 text-muted-foreground">JSON view</div>
            <div className="ml-auto flex gap-1">
              <div className="rounded border border-muted-foreground/20 px-1.5 py-0.5 text-[9px] text-muted-foreground">📋 Paste from clipboard</div>
            </div>
          </div>
          {/* Editable table */}
          <div className="rounded border border-muted-foreground/20 overflow-hidden text-[10px]">
            <div className="grid grid-cols-4 border-b border-muted-foreground/15 bg-secondary/40 px-2 py-1">
              {["Title", "URL", "Date", "Score"].map((h) => (
                <div key={h} className="font-semibold text-foreground/60">{h}</div>
              ))}
            </div>
            {[
              ["HCI Paper 1", "arxiv/1234", "2025-01-10", "8"],
              ["UX Study 2", "doi/5678", "2025-02-15", "9"],
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-4 border-b border-muted-foreground/10 px-2 py-1 last:border-0">
                {row.map((cell, j) => (
                  <div key={j} className="rounded bg-secondary/30 px-1 py-0.5 text-muted-foreground">{cell}</div>
                ))}
              </div>
            ))}
            <div className="px-2 py-1 text-[9px] text-muted-foreground/40 cursor-pointer">+ Add row</div>
          </div>
        </div>
      </div>
    </WF>
  );
}

function Wireframe1F() {
  return (
    <WF>
      <WFLabel>Wireframe 1F — Duplicate table auto-naming and disambiguation</WFLabel>
      <div className="p-4 grid grid-cols-2 gap-4 text-[11px]">
        <div>
          <div className="mb-2 font-semibold text-red-600 dark:text-red-400 text-[10px]">Before — both named &ldquo;Articles&rdquo;</div>
          <div className="rounded border border-muted-foreground/20 bg-background/60 divide-y divide-muted-foreground/10 text-[10px]">
            {[
              { name: "Articles", sub: "10 rows · ID: tb_091" },
              { name: "Articles", sub: "10 rows · ID: tb_092" },
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-2">
                <span>📋</span>
                <div>
                  <div className="text-muted-foreground">{t.name}</div>
                  <div className="text-[9px] text-muted-foreground/50">{t.sub}</div>
                </div>
                <span className="ml-auto text-muted-foreground/30">⋯</span>
              </div>
            ))}
          </div>
          <div className="mt-2 text-[9px] text-red-500 dark:text-red-400">
            ⚠ Workflow dropdowns show two identical names
          </div>
        </div>
        <div>
          <div className="mb-2 font-semibold text-emerald-600 dark:text-emerald-400 text-[10px]">After — auto-differentiated</div>
          <div className="rounded border border-muted-foreground/20 bg-background/60 divide-y divide-muted-foreground/10 text-[10px]">
            {[
              { name: "Articles", sub: "10 rows · original" },
              { name: "Articles (copy)", sub: "10 rows · copied just now" },
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-2">
                <span>📋</span>
                <div>
                  <div className={cn(i === 1 ? "text-emerald-700 dark:text-emerald-400" : "text-muted-foreground")}>{t.name}</div>
                  <div className="text-[9px] text-muted-foreground/50">{t.sub}</div>
                </div>
                <span className="ml-auto text-muted-foreground/30">⋯</span>
              </div>
            ))}
          </div>
          <div className="mt-2 rounded border border-muted-foreground/20 bg-background/60 p-2 text-[10px]">
            <div className="text-[9px] text-muted-foreground/50 mb-1">In workflow node dropdown:</div>
            <div className="flex items-center gap-1.5 text-muted-foreground">📋 Articles <span className="text-[9px] text-muted-foreground/40">10 rows</span></div>
            <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">📋 Articles (copy) <span className="text-[9px] text-muted-foreground/40">10 rows · new</span></div>
          </div>
        </div>
      </div>
    </WF>
  );
}

/* ── evolution log ── */

const evolutionLog = [
  { version: "V0", date: "Baseline", change: "Documented current n8n interface screenshots", motivation: "Establish comparison point; make existing problems concrete" },
  { version: "V1a", date: "First draft", change: "Sidebar: added Data Tables as top-level item", motivation: "UP1 (severity 3): all 3 participants looked in sidebar first" },
  { version: "V1b", date: "First draft", change: "Editor: cache indicators + run-from-here button + Tables panel", motivation: "UP6 (severity 4): most impactful problem found in user study" },
  { version: "V1c", date: "First draft", change: "CSV import: two-step column-mapping wizard", motivation: "UP3, UP4, UP5: all participants struggled with silent import failures" },
  { version: "V1d", date: "First draft", change: "Filter: reset button + saved presets", motivation: "UP7: minor fix; presets added for expert efficiency (H7)" },
  { version: "V1e", date: "First draft", change: "Pinned data: table editor + staleness warning + refresh", motivation: "UP8, UP9: confusion with stale data and JSON format requirement" },
  { version: "V1f", date: "First draft", change: "Duplicate table: auto-append (copy) + ID in dropdowns", motivation: "UP10 (severity 3): all participants confused by identical names" },
];

const openQuestions = [
  { q: "Cache invalidation granularity", detail: "Should modifying a node's configuration invalidate its cache, or only modifying its connections? What about a node two steps upstream?" },
  { q: "Filter presets scope", detail: "Should presets be per-workflow or global? Per-workflow is simpler but limits reuse across similar pipelines." },
  { q: "Tables panel placement", detail: "Slide-out (overlay), sidebar panel (persistent), or modal? Slide-out avoids obscuring the canvas; sidebar always visible but reduces space; modal focuses interaction but blocks editing." },
  { q: "Cost warning for LLM nodes", detail: 'Should "Run from here" estimate API cost before executing? Powerful for cost-conscious users but requires per-provider pricing data.' },
  { q: "Mobile/responsive indicators", detail: "Should cache status indicators appear in a mobile-friendly execution log view for users checking workflow status on mobile?" },
];

const references = [
  { citation: "Krug, S. (2014).", work: "Don't Make Me Think, Revisited.", publisher: "New Riders." },
  { citation: "Nielsen, J. (1994).", work: '"10 Usability Heuristics for User Interface Design."', publisher: "Nielsen Norman Group." },
  { citation: "Norman, D. (2013).", work: "The Design of Everyday Things: Revised and Expanded Edition.", publisher: "Basic Books." },
  { citation: "Shneiderman, B. (1983).", work: '"Direct Manipulation: A Step Beyond Programming Languages."', publisher: "IEEE Computer, 16(8), 57–69." },
  { citation: "Snyder, C. (2003).", work: "Paper Prototyping: The Fast and Easy Way to Design and Refine User Interfaces.", publisher: "Morgan Kaufmann." },
];

/* ── page ── */

export default function Page4D() {
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
            Phase 4D
          </Badge>
          <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800">
            First Draft
          </Badge>
          <span className="text-sm text-muted-foreground">April 2026</span>
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground">
          Rapid Prototyping — First Draft
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
          Low-fidelity wireframes and annotated sketches addressing the five highest-priority
          usability problems identified in Phases 4B and 4C. Design rationale is grounded in
          Nielsen&apos;s heuristics, Norman&apos;s design principles, and competitive analysis of
          Zapier and Make.
        </p>
      </div>

      {/* Design Scope */}
      <section className="mb-12" id="scope">
        <SectionTitle>Design Scope</SectionTitle>
        <Sub>Five problem areas selected based on severity and breadth of user impact.</Sub>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { num: 1, label: "Data Tables discoverability and access", ups: "UP1, UP2" },
            { num: 2, label: "CSV import experience", ups: "UP3, UP4, UP5" },
            { num: 3, label: "Per-node execution and caching", ups: "UP6" },
            { num: 4, label: "Pinned/test data management", ups: "UP8, UP9" },
            { num: 5, label: "Filter node usability", ups: "UP7" },
          ].map((s) => (
            <div key={s.num} className="flex items-start gap-3 rounded-lg border bg-card p-3">
              <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                {s.num}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{s.label}</p>
                <p className="text-xs text-muted-foreground font-mono mt-0.5">{s.ups}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          This first draft uses low-fidelity wireframes following the rapid paper-prototyping
          approach (Snyder, 2003). Each redesign component is accompanied by a design rationale
          citing course readings and observed user behavior. Subsequent versions will increase
          fidelity.
        </p>
      </section>

      {/* Section 0: Baseline */}
      <section className="mb-14" id="baseline">
        <SectionTitle>Version 0 — Current Interface Baseline</SectionTitle>
        <Sub>Screenshots of the current n8n interface, documented before proposing any changes.</Sub>

        <div className="mb-6">
          <H3>Current n8n Sidebar</H3>
          <ScreenshotFrame
            src="/media/4-1.png"
            alt="Current n8n sidebar showing Overview, Personal, Chat, Templates sections with no Data Tables entry"
            caption="Fig. 4-1 — Current n8n home screen sidebar (v2.17.7). Data Tables is absent; it exists only as a tab within the Overview content area."
          />
          <Rationale>
            Data Tables is completely absent from the sidebar. It exists only as a tab within the
            Overview page content area — users must navigate to Personal, then notice and click
            the &ldquo;Data tables&rdquo; tab in the content header. This violates{" "}
            <strong>Nielsen H6 (Recognition over Recall)</strong> and the principle of placing
            high-frequency features in persistent navigation (Krug, 2014,{" "}
            <em>Don&apos;t Make Me Think</em>). All three study participants looked in the sidebar
            first and took 3–4 minutes to find the feature.
          </Rationale>
        </div>

        <div className="mb-6">
          <H3>Current Workflow Editor Toolbar</H3>
          <ScreenshotFrame
            src="/media/4-2.png"
            alt="Current n8n workflow editor toolbar showing only Execute workflow button with no per-node run option"
            caption="Fig. 4-2 — Current workflow editor toolbar. The only execution option runs the entire workflow from the trigger node."
          />
          <Rationale>
            The right toolbar provides add, search, copy, split-view, and AI buttons, but{" "}
            <strong>no Data Tables shortcut</strong> and{" "}
            <strong>no &ldquo;run from here&rdquo; option</strong>. The Logs panel at the bottom
            is empty until full execution — no cached intermediate results are visible. This
            violates <strong>Nielsen H1 (Visibility of System Status)</strong>: users cannot see
            what each node produced without re-running everything. For LLM-connected workflows,
            this has direct monetary cost implications (UP6, severity 4).
          </Rationale>
        </div>
      </section>

      {/* Section 1: First Draft */}
      <section className="mb-14" id="v1">
        <SectionTitle>Version 1 — First Draft Redesign</SectionTitle>
        <Sub>
          Six redesign components, each grounded in a specific design principle and tested
          assumption from the user study.
        </Sub>

        {/* 1A */}
        <div className="mb-10">
          <div className="mb-1 flex items-center gap-2">
            <Badge variant="outline" className="font-mono text-xs">V1a</Badge>
            <H3>1A — Redesigned Sidebar: Data Tables as First-Class Citizen</H3>
          </div>
          <div className="mb-4 grid gap-4 sm:grid-cols-2">
            <ScreenshotFrame
              src="/media/4-3.png"
              alt="Hand-drawn sketch of redesigned n8n sidebar with Data Tables added as a persistent navigation item"
              caption="Fig. 4-3 — Paper sketch of the redesigned sidebar."
            />
            <Wireframe1A />
          </div>
          <Rationale>
            <strong>Rationale:</strong> All three user study participants looked in the sidebar
            first. Moving Data Tables here follows the{" "}
            <strong>principle of consistency</strong> (Nielsen H4) — it mirrors Zapier Tables and
            Make Data Stores. It also respects <strong>Fitts&apos;s Law</strong>: sidebar items
            are one click away versus two navigational steps in the current design.
            <br /><br />
            <strong>Placement decision:</strong> Data Tables is grouped with creation tools
            (Workflows, Chat, Tables) rather than with utility tools (Templates, Settings),
            following the <strong>Gestalt principle of proximity</strong>.
            <br /><br />
            <strong>Tradeoff:</strong> Adding a sidebar item increases visual clutter. However,
            the sidebar currently has only 3 primary + 5 utility items, well within Miller&apos;s
            7±2 rule. The discoverability benefit outweighs the minor clutter cost.
          </Rationale>
        </div>

        {/* 1B */}
        <div className="mb-10">
          <div className="mb-1 flex items-center gap-2">
            <Badge variant="outline" className="font-mono text-xs">V1b</Badge>
            <H3>1B — Workflow Editor: Cache Indicators and Per-Node Execution</H3>
          </div>
          <div className="mb-4 grid gap-4 sm:grid-cols-2">
            <ScreenshotFrame
              src="/media/4-4.png"
              alt="Sketch of workflow editor with colored cache status dots under each node and a run-from-here button"
              caption="Fig. 4-4 — Paper sketch of workflow editor with cache indicators and Tables panel."
            />
            <Wireframe1B />
          </div>
          <Rationale>
            <strong>Key changes:</strong> (1) Node cache status dots (green = cached, orange =
            modified/stale, gray = never run). (2) &ldquo;Run from selected node&rdquo; secondary
            execution option using cached upstream data. (3) Tables slide-out button in toolbar.
            (4) Enhanced Logs/Cache panel showing cached output for the selected node.
            <br /><br />
            <strong>Rationale:</strong> Inspired by Make&apos;s &ldquo;Run this module only&rdquo;
            but extended with visual cache feedback. This follows{" "}
            <strong>direct manipulation</strong> (Shneiderman, 1983) — users see the state of each
            node and act on it directly. Addresses UP6 (severity 4, the highest-impact problem
            found in the study).
            <br /><br />
            <strong>Tradeoff:</strong> Caching adds complexity. Users might not understand why a
            downstream node shows &ldquo;old&rdquo; results. Color indicators mitigate this, but
            tooltips explaining cache semantics should be added in the next iteration.
          </Rationale>
        </div>

        {/* 1C */}
        <div className="mb-10">
          <div className="mb-1 flex items-center gap-2">
            <Badge variant="outline" className="font-mono text-xs">V1c</Badge>
            <H3>1C — CSV Import: Two-Step Preview and Mapping Wizard</H3>
          </div>
          <div className="mb-4 grid gap-4 sm:grid-cols-2">
            <ScreenshotFrame
              src="/media/4-5.png"
              alt="Sketch of two-step CSV import wizard showing column mapping and preview steps"
              caption="Fig. 4-5 — Paper sketch of the CSV import wizard."
            />
            <Wireframe1C />
          </div>
          <Rationale>
            <strong>Rationale:</strong> The wizard addresses three UP problems simultaneously:
            UP3 (no preview → Step 2 shows exactly what will be imported), UP4 (cannot change
            type → Step 1 shows type conversions with validation), and UP5 (no auto-mapping →
            fuzzy matching suggests column assignments). Modelled after Zapier&apos;s import
            flow. Follows <strong>Nielsen H5 (Error Prevention)</strong>.
            <br /><br />
            <strong>Alternative considered:</strong> One-click import with an &ldquo;Undo
            import&rdquo; button. Rejected because it doesn&apos;t solve type conversion — users
            still end up with text columns where they wanted numbers. Preview (prevention) is
            more effective than undo (correction).
            <br /><br />
            <strong>Tradeoff:</strong> The wizard adds friction. But the user study showed the
            current one-click approach causes more frustration (failed imports, wrong types,
            having to redo everything) than the wizard would. Net time saving is significant.
          </Rationale>
        </div>

        {/* 1D */}
        <div className="mb-10">
          <div className="mb-1 flex items-center gap-2">
            <Badge variant="outline" className="font-mono text-xs">V1d</Badge>
            <H3>1D — Filter Node: Reset Button and Condition Presets</H3>
          </div>
          <div className="mb-4 grid gap-4 sm:grid-cols-2">
            <ScreenshotFrame
              src="/media/4-6.png"
              alt="Sketch of redesigned filter node panel with reset all button and saved presets section"
              caption="Fig. 4-6 — Paper sketch of the filter node redesign."
            />
            <Wireframe1D />
          </div>
          <Rationale>
            <strong>Key changes:</strong> (1) &ldquo;Reset all&rdquo; (↺) button — one-click
            clears all conditions. (2) &ldquo;Save as preset&rdquo; and a preset list tucked
            below a separator line.
            <br /><br />
            <strong>Rationale:</strong> Reset button follows <strong>Nielsen H3 (User Control
            and Freedom)</strong>. Presets follow <strong>Nielsen H7 (Flexibility and Efficiency
            of Use)</strong> — accelerators for experts that remain invisible to novices (Nielsen,
            1994). The separator visually groups basic and advanced functionality.
            <br /><br />
            <strong>Open question:</strong> Presets may be underused if users rarely have the
            same filter configuration twice. This is an exploration to validate in the next round
            of user testing.
          </Rationale>
        </div>

        {/* 1E */}
        <div className="mb-10">
          <div className="mb-1 flex items-center gap-2">
            <Badge variant="outline" className="font-mono text-xs">V1e</Badge>
            <H3>1E — Pinned Data: Table View Editor with Staleness Warning</H3>
          </div>
          <div className="mb-4 grid gap-4 sm:grid-cols-2">
            <ScreenshotFrame
              src="/media/4-7.png"
              alt="Sketch of redesigned pinned data panel with table view toggle and staleness warning banner"
              caption="Fig. 4-7 — Paper sketch of the pinned data redesign."
            />
            <Wireframe1E />
          </div>
          <Rationale>
            <strong>Key changes:</strong> (1) Table view toggle replacing raw JSON input.
            (2) Staleness warning (⚠ STALE) when upstream nodes change after pinning.
            (3) &ldquo;Refresh from last run&rdquo; one-click update.
            (4) &ldquo;Paste from clipboard&rdquo; for tabular data from Excel/Sheets.
            <br /><br />
            <strong>Rationale:</strong> The dual-view (table + JSON) follows{" "}
            <strong>Nielsen H7 (Flexibility)</strong> — novices get the table, developers keep
            JSON. The staleness warning follows <strong>Nielsen H1 (Visibility of Status)</strong>.
            <br /><br />
            <strong>Alternative rejected:</strong> Auto-refreshing pinned data when upstream nodes
            change. Rejected because pinned data is sometimes intentionally different from live
            data (edge cases, error scenarios). Auto-refresh would destroy intentional test cases.
            The warning + manual refresh approach respects user autonomy.
          </Rationale>
        </div>

        {/* 1F */}
        <div className="mb-10">
          <div className="mb-1 flex items-center gap-2">
            <Badge variant="outline" className="font-mono text-xs">V1f</Badge>
            <H3>1F — Duplicate Table: Auto-Naming and Disambiguation</H3>
          </div>
          <div className="mb-4 grid gap-4 sm:grid-cols-2">
            <ScreenshotFrame
              src="/media/4-8.png"
              alt="Sketch showing before and after comparison of duplicate table naming with auto-appended copy suffix"
              caption="Fig. 4-8 — Paper sketch of auto-naming and dropdown disambiguation."
            />
            <Wireframe1F />
          </div>
          <Rationale>
            <strong>Key changes:</strong> (1) Auto-append &ldquo;(copy)&rdquo; on duplicate —
            subsequent copies become &ldquo;(copy 2),&rdquo; &ldquo;(copy 3),&rdquo; etc.
            (2) Show row count and creation context in the table list.
            (3) Show ID and creation hint in workflow node dropdowns.
            <br /><br />
            <strong>Rationale:</strong> Follows <strong>Nielsen H5 (Error Prevention)</strong>
            and <strong>H6 (Recognition over Recall)</strong>. The auto-naming convention is an
            industry standard in Zapier, Google Drive, macOS Finder, and virtually every file
            management system. All three study participants immediately expected this behavior —
            two explicitly called the current behavior a &ldquo;bug.&rdquo;
            <br /><br />
            <strong>Cost:</strong> This is the lowest-cost change in the entire redesign — likely
            a single-line code change in n8n&apos;s table duplication logic. The impact-to-effort
            ratio is extremely favorable.
          </Rationale>
        </div>
      </section>

      {/* Evolution Log */}
      <section className="mb-14" id="evolution">
        <SectionTitle>Design Evolution Log</SectionTitle>
        <Sub>Version history showing what changed, when, and why.</Sub>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b bg-secondary/50">
                <th className="px-3 py-2.5 text-left font-semibold text-foreground">Version</th>
                <th className="px-3 py-2.5 text-left font-semibold text-foreground">Date</th>
                <th className="px-3 py-2.5 text-left font-semibold text-foreground">Change</th>
                <th className="px-3 py-2.5 text-left font-semibold text-foreground">Motivation</th>
              </tr>
            </thead>
            <tbody>
              {evolutionLog.map((r) => (
                <tr key={r.version} className="border-b last:border-0">
                  <td className="px-3 py-2.5 font-mono text-xs font-semibold text-foreground">{r.version}</td>
                  <td className="px-3 py-2.5 text-xs text-muted-foreground">{r.date}</td>
                  <td className="px-3 py-2.5 text-sm text-muted-foreground">{r.change}</td>
                  <td className="px-3 py-2.5 text-sm text-muted-foreground">{r.motivation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Open Questions */}
      <section className="mb-14" id="open-questions">
        <SectionTitle>Open Questions for Next Iteration</SectionTitle>
        <Sub>Design decisions to revisit with further user testing.</Sub>
        <div className="flex flex-col gap-3">
          {openQuestions.map((item, i) => (
            <div key={i} className="flex items-start gap-4 rounded-lg border bg-card p-4">
              <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-bold text-muted-foreground">
                {i + 1}
              </div>
              <div>
                <p className="font-semibold text-foreground">{item.q}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* References */}
      <section className="mb-12" id="references">
        <SectionTitle>References</SectionTitle>
        <div className="flex flex-col gap-2 rounded-lg border bg-card p-5">
          {references.map((ref, i) => (
            <p key={i} className="text-sm leading-relaxed text-muted-foreground">
              {ref.citation}{" "}
              <em className="text-foreground">{ref.work}</em>{" "}
              {ref.publisher}
            </p>
          ))}
        </div>
      </section>

      {/* Footer nav */}
      <div className="flex items-center justify-between border-t pt-6">
        <Link href="/4c" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="size-3.5" /> 4C — User Study
        </Link>
        <span className="text-sm text-muted-foreground">
          Further iterations to follow
        </span>
      </div>

      <BackToTop />
    </div>
  );
}
