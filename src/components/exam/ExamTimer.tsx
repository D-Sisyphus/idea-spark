import { Clock, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExamTimerProps {
  formattedTime: string;
  percentage: number;
  isLowTime: boolean;
  isCriticalTime: boolean;
}

const ExamTimer = ({ formattedTime, percentage, isLowTime, isCriticalTime }: ExamTimerProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-2 rounded-xl border transition-all duration-300",
        isCriticalTime
          ? "bg-destructive/20 border-destructive text-destructive animate-pulse"
          : isLowTime
          ? "bg-warning/20 border-warning text-warning"
          : "bg-secondary border-border"
      )}
    >
      {isCriticalTime ? (
        <AlertTriangle className="w-5 h-5" />
      ) : (
        <Clock className="w-5 h-5" />
      )}
      <div className="flex flex-col">
        <span className="font-mono text-lg font-bold tracking-wider">
          {formattedTime}
        </span>
        <div className="w-24 h-1.5 bg-background/50 rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-1000",
              isCriticalTime
                ? "bg-destructive"
                : isLowTime
                ? "bg-warning"
                : "bg-accent"
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ExamTimer;
