import Link from "next/link";
import { getSiteConfig } from "@/lib/content";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BackToTop } from "@/components/back-to-top";
import { TbdCallout } from "@/components/tbd-callout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink, Github } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team",
};

export default function TeamPage() {
  const config = getSiteConfig();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 lg:px-6">
      <Breadcrumbs items={[{ label: "Team" }]} />

      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">
          Team {config.teamName}
        </h1>
        <p className="text-lg text-muted-foreground">
          Our consulting team for the Usability Engineering assignment.
        </p>
      </div>

      {/* Team Members */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {config.members.map((member) => (
          <Card key={member.name}>
            <CardContent className="flex flex-col items-center gap-3 pt-6 text-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-accent text-xl font-bold text-accent-foreground">
                {member.name.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-foreground">
                  {member.name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {member.role === "TBD" ? (
                    <span className="italic">Role TBD</span>
                  ) : (
                    member.role
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <TbdCallout>
        Specific role assignments will be finalized and updated here.
      </TbdCallout>

      {/* Collaboration Tools */}
      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Collaboration Tools
        </h2>
        <Card>
          <CardContent className="flex flex-col gap-3 pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Github className="size-5 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium text-foreground">
                    GitHub Repository
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Version control and collaboration
                  </div>
                </div>
              </div>
              <Button asChild variant="outline" size="sm">
                <a
                  href={config.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open
                  <ExternalLink className="size-3" />
                </a>
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <svg viewBox="0 0 24 24" className="size-5 text-muted-foreground" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.933 11.933 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.37 0-4.567-.82-6.294-2.19l-.44-.367-3.06 1.026 1.026-3.06-.367-.44A9.935 9.935 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
                </svg>
                <div>
                  <div className="text-sm font-medium text-foreground">
                    WhatsApp Group
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Real-time team communication
                  </div>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">Private</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <BackToTop />
    </div>
  );
}
