import { Shield, AlertTriangle, Maximize } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ExamTimer from "./ExamTimer";

interface ExamHeaderProps {
  title: string;
  subject: string;
  formattedTime: string;
  percentage: number;
  isLowTime: boolean;
  isCriticalTime: boolean;
  violations: number;
  isFullscreen: boolean;
  onEnterFullscreen: () => void;
}

const ExamHeader = ({
  title,
  subject,
  formattedTime,
  percentage,
  isLowTime,
  isCriticalTime,
  violations,
  isFullscreen,
  onEnterFullscreen,
}: ExamHeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Exam Info */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display font-bold text-lg">{title}</h1>
            <p className="text-sm text-muted-foreground">{subject}</p>
          </div>
        </div>

        {/* Status & Timer */}
        <div className="flex items-center gap-4">
          {violations > 0 && (
            <Badge variant="destructive" className="gap-1">
              <AlertTriangle className="w-3 h-3" />
              {violations} Violation{violations > 1 ? 's' : ''}
            </Badge>
          )}
          
          {!isFullscreen && (
            <Button variant="outline" size="sm" onClick={onEnterFullscreen}>
              <Maximize className="w-4 h-4 mr-1" />
              Enter Fullscreen
            </Button>
          )}

          <ExamTimer
            formattedTime={formattedTime}
            percentage={percentage}
            isLowTime={isLowTime}
            isCriticalTime={isCriticalTime}
          />
        </div>
      </div>
    </header>
  );
};

export default ExamHeader;
