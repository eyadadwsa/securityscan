import { Button } from "@/components/ui/button";
import { Scan, Download, RefreshCw } from "lucide-react";

interface DashboardHeaderProps {
  title: string;
  description: string;
  onScan?: () => void;
  lastScanDate?: string;
  isScanning?: boolean;
}

const DashboardHeader = ({
  title,
  description,
  onScan = () => {},
  lastScanDate,
  isScanning = false,
}: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
        {lastScanDate && (
          <p className="text-sm text-muted-foreground mt-1">
            Last scan: {lastScanDate}
          </p>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          onClick={onScan}
          disabled={isScanning}
          className="flex items-center gap-2"
        >
          {isScanning ? (
            <>
              <RefreshCw size={16} className="animate-spin" />
              Scanning...
            </>
          ) : (
            <>
              <Scan size={16} />
              Start Scan
            </>
          )}
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Download size={16} />
          Export
        </Button>
      </div>
    </div>
  );
};

export { DashboardHeader };
