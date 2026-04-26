"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  Download,
  Menu,
  X,
} from "lucide-react";

const phases = [
  { label: "3A — Setup", href: "/phases/3a" },
  { label: "3B — User Study", href: "/phases/3b" },
  { label: "3C — First Redesigns", href: "/phases/3c" },
  { label: "3D — Peer Comments", href: "/phases/3d" },
  { label: "3E — Group Reply", href: "/phases/3e" },
  { label: "3F — Final Redesigns", href: "/phases/3f" },
];

const assignment4Phases = [
  { label: "4A — Application Pick", href: "/assignment4" },
  { label: "4B — State of the Art", href: "/assignment4/4b" },
];

const navItems = [
  { label: "Overview", href: "/" },
  { label: "Target Site", href: "/target-site" },
  { label: "Phases", href: "/phases/3a", dropdown: "phases" as const },
  { label: "Assign. 4", href: "/assignment4", dropdown: "a4" as const },
  { label: "Versions", href: "/versions" },
  { label: "Feedback", href: "/feedback" },
  { label: "Billing", href: "/billing" },
  { label: "Team", href: "/team" },
  { label: "Resources", href: "/resources" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [phasesOpen, setPhasesOpen] = useState(false);
  const [a4Open, setA4Open] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-6">
        {/* Left: Logo */}
        <Link href="/" className="flex flex-col gap-0 shrink-0">
          <span className="text-base font-semibold tracking-tight text-foreground">
            Group 5
          </span>
          <span className="hidden text-xs text-muted-foreground sm:block">
            Usability Makeover: Google Looker Studio
          </span>
        </Link>

        {/* Center: Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => {
            if (item.dropdown === "phases") {
              const isActive = pathname.startsWith("/phases");
              return (
                <div key={item.label} className="relative">
                  <button
                    onClick={() => { setPhasesOpen(!phasesOpen); setA4Open(false); }}
                    onBlur={() => setTimeout(() => setPhasesOpen(false), 150)}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary hover:text-secondary-foreground",
                      isActive ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {item.label}
                    <ChevronDown className="size-3.5" />
                  </button>
                  {phasesOpen && (
                    <div className="absolute left-0 top-full mt-1 w-56 rounded-lg border bg-popover p-1 shadow-lg">
                      {phases.map((phase) => (
                        <Link
                          key={phase.href}
                          href={phase.href}
                          onClick={() => setPhasesOpen(false)}
                          className={cn(
                            "block rounded-md px-3 py-2 text-sm transition-colors hover:bg-secondary",
                            pathname === phase.href
                              ? "font-medium text-foreground bg-secondary"
                              : "text-muted-foreground"
                          )}
                        >
                          {phase.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            if (item.dropdown === "a4") {
              const isActive = pathname.startsWith("/assignment4");
              return (
                <div key={item.label} className="relative">
                  <button
                    onClick={() => { setA4Open(!a4Open); setPhasesOpen(false); }}
                    onBlur={() => setTimeout(() => setA4Open(false), 150)}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary hover:text-secondary-foreground",
                      isActive ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {item.label}
                    <ChevronDown className="size-3.5" />
                  </button>
                  {a4Open && (
                    <div className="absolute left-0 top-full mt-1 w-52 rounded-lg border bg-popover p-1 shadow-lg">
                      {assignment4Phases.map((phase) => (
                        <Link
                          key={phase.href}
                          href={phase.href}
                          onClick={() => setA4Open(false)}
                          className={cn(
                            "block rounded-md px-3 py-2 text-sm transition-colors hover:bg-secondary",
                            pathname === phase.href
                              ? "font-medium text-foreground bg-secondary"
                              : "text-muted-foreground"
                          )}
                        >
                          {phase.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary hover:text-secondary-foreground",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
            <a href="#" download>
              <Download className="size-3.5" />
              Deliverables
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="border-t bg-background px-4 pb-4 pt-2 lg:hidden" aria-label="Mobile navigation">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              if (item.dropdown === "phases") {
                return (
                  <div key={item.label}>
                    <span className="block px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Phases (Assign. 3)
                    </span>
                    {phases.map((phase) => (
                      <Link
                        key={phase.href}
                        href={phase.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "block rounded-md px-3 py-2 pl-6 text-sm transition-colors hover:bg-secondary",
                          pathname === phase.href
                            ? "font-medium text-foreground bg-secondary"
                            : "text-muted-foreground"
                        )}
                      >
                        {phase.label}
                      </Link>
                    ))}
                  </div>
                );
              }

              if (item.dropdown === "a4") {
                return (
                  <div key={item.label}>
                    <span className="block px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Assignment 4 (n8n)
                    </span>
                    {assignment4Phases.map((phase) => (
                      <Link
                        key={phase.href}
                        href={phase.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "block rounded-md px-3 py-2 pl-6 text-sm transition-colors hover:bg-secondary",
                          pathname === phase.href
                            ? "font-medium text-foreground bg-secondary"
                            : "text-muted-foreground"
                        )}
                      >
                        {phase.label}
                      </Link>
                    ))}
                  </div>
                );
              }

              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary",
                    isActive
                      ? "text-foreground bg-secondary"
                      : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
