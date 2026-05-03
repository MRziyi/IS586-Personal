"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { ExternalLink, Menu, X } from "lucide-react";

const navItems = [
  { label: "Overview", href: "/" },
  { label: "4B — Analysis", href: "/4b" },
  { label: "4C — User Study", href: "/4c" },
  { label: "4D — Redesign", href: "/4d" },
  { label: "4E — Final", href: "/4e" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 lg:px-6">
        {/* Logo */}
        <Link href="/" className="flex flex-col gap-0 shrink-0">
          <span className="text-base font-semibold tracking-tight text-foreground">
            n8n Usability Study
          </span>
          <span className="hidden text-xs text-muted-foreground sm:block">
            Ziyi Zhang · Assignment 4
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {navItems.map((item) => {
            const isActive =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary hover:text-secondary-foreground",
                  isActive ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href="https://n8n.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground"
          >
            n8n
            <ExternalLink className="size-3" />
          </a>
        </nav>

        {/* Right */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            className="rounded-md p-2 text-muted-foreground hover:bg-secondary md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="border-t bg-background px-4 pb-4 pt-2 md:hidden" aria-label="Mobile navigation">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary",
                    isActive ? "text-foreground bg-secondary" : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <a
              href="https://n8n.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary"
            >
              n8n <ExternalLink className="size-3" />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
