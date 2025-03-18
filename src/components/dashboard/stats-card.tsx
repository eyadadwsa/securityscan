import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type SeverityLevel = "critical" | "high" | "medium" | "low" | "info";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
  severity?: SeverityLevel;
  trend?: number;
  trendLabel?: string;
}

const getSeverityColor = (severity: SeverityLevel) => {
  switch (severity) {
    case "critical":
      return "text-destructive bg-destructive/10";
    case "high":
      return "text-orange-500 bg-orange-500/10";
    case "medium":
      return "text-yellow-500 bg-yellow-500/10";
    case "low":
      return "text-green-500 bg-green-500/10";
    case "info":
      return "text-blue-500 bg-blue-500/10";
    default:
      return "text-muted-foreground bg-muted";
  }
};

const StatsCard = ({
  title,
  value,
  description,
  icon,
  severity = "info",
  trend,
  trendLabel,
}: StatsCardProps) => {
  const severityClass = getSeverityColor(severity);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={cn("p-2 rounded-full", severityClass)}>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        {trend !== undefined && (
          <div className="flex items-center mt-1">
            <span
              className={cn(
                "text-xs",
                trend > 0
                  ? "text-green-500"
                  : trend < 0
                    ? "text-destructive"
                    : "text-muted-foreground",
              )}
            >
              {trend > 0 ? "+" : ""}
              {trend}%
            </span>
            {trendLabel && (
              <span className="text-xs text-muted-foreground ml-1">
                {trendLabel}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export { StatsCard };
