import { AlertCircle } from "lucide-react";

export function TbdCallout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-dashed border-amber-300 bg-amber-50/50 p-4 text-sm text-amber-800 dark:border-amber-700 dark:bg-amber-950/20 dark:text-amber-300">
      <AlertCircle className="mt-0.5 size-4 shrink-0" />
      <div>{children ?? "This section is a placeholder and will be updated in a future phase."}</div>
    </div>
  );
}
