import { getSiteConfig } from "@/lib/content";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BackToTop } from "@/components/back-to-top";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ExternalLink, DollarSign, Clock, FileSpreadsheet } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Billing",
};

export default function BillingPage() {
  const config = getSiteConfig();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 lg:px-6">
      <Breadcrumbs items={[{ label: "Billing" }]} />

      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">
          Billing & Records
        </h1>
        <p className="text-lg text-muted-foreground">
          Our consulting billing method and time-tracking records.
        </p>
      </div>

      {/* Rate Card */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex flex-col items-center gap-2 pt-6 text-center">
            <DollarSign className="size-8 text-accent" />
            <div className="text-2xl font-bold text-foreground">
              ${config.consultingRate}
            </div>
            <p className="text-sm text-muted-foreground">per hour / person</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center gap-2 pt-6 text-center">
            <Clock className="size-8 text-accent" />
            <div className="text-lg font-bold text-foreground">
              Meetings Billable
            </div>
            <p className="text-sm text-muted-foreground">
              All meetings count as billable hours
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center gap-2 pt-6 text-center">
            <FileSpreadsheet className="size-8 text-accent" />
            <div className="text-lg font-bold text-foreground">
              Google Sheet
            </div>
            <p className="text-sm text-muted-foreground">
              Timesheet tracked in a shared spreadsheet
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Billing Method */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>How We Track Time</CardTitle>
          <CardDescription>
            Our billing records method for this consulting engagement
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Team {config.teamName} operates as a UX consulting team at a rate of{" "}
            <strong className="text-foreground">
              ${config.consultingRate}/hour/person
            </strong>
            . All work — including meetings, research, design, prototyping, and
            documentation — is tracked in a shared Google Sheet timesheet. Every
            meeting is logged with a calendar entry and meeting notes, and we
            produce a weekly per-person summary.
          </p>

          <div>
            <h3 className="mb-2 text-sm font-semibold text-foreground">
              Fields Recorded in the Timesheet
            </h3>
            <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="size-1.5 shrink-0 rounded-full bg-accent" />
                <strong className="text-foreground">Date</strong> — When the work was performed
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 shrink-0 rounded-full bg-accent" />
                <strong className="text-foreground">Person</strong> — Team member who did the work
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 shrink-0 rounded-full bg-accent" />
                <strong className="text-foreground">Activity Type</strong> — Meeting, research, design, development, documentation, etc.
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 shrink-0 rounded-full bg-accent" />
                <strong className="text-foreground">Description</strong> — Brief description of the activity
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 shrink-0 rounded-full bg-accent" />
                <strong className="text-foreground">Hours</strong> — Time spent in decimal hours
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* External Links */}
      <Card>
        <CardHeader>
          <CardTitle>Records Access</CardTitle>
          <CardDescription>
            Links to our billing records (may be access-restricted)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline" size="sm">
              <a
                href={config.timesheetUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileSpreadsheet className="size-3.5" />
                Timesheet (Google Sheet)
                <ExternalLink className="size-3" />
              </a>
            </Button>
            <Button asChild variant="outline" size="sm">
              <a href="#" target="_blank" rel="noopener noreferrer">
                Meeting Log / Notes
                <ExternalLink className="size-3" />
              </a>
            </Button>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            These links may require team/instructor access. Contact the team if you need viewing permissions.
          </p>
        </CardContent>
      </Card>

      <BackToTop />
    </div>
  );
}
