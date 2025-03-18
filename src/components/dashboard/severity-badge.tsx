import { cn } from "@/lib/utils";

type SeverityLevel = "critical" | "high" | "medium" | "low" | "info";

interface SeverityBadgeProps {
  severity: SeverityLevel;
  className?: string;
}

const getSeverityColor = (severity: SeverityLevel) => {
  switch (severity) {
    case "critical":
      return "bg-destructive text-destructive-foreground";
    case "high":
      return "bg-orange-500 text-white";
    case "medium":
      return "bg-yellow-500 text-white";
    case "low":
      return "bg-green-500 text-white";
    case "info":
      return "bg-blue-500 text-white";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getSeverityLabel = (severity: SeverityLevel) => {
  return severity.charAt(0).toUpperCase() + severity.slice(1);
};

const SeverityBadge = ({ severity, className }: SeverityBadgeProps) => {
  const severityClass = getSeverityColor(severity);
  const label = getSeverityLabel(severity);

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        severityClass,
        className,
      )}
    >
      {label}
    </span>
  );
};

export { SeverityBadge };
export type { SeverityLevel };
