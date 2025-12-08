import { AlertTriangle, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FullscreenWarningProps {
  violations: number;
  onEnterFullscreen: () => void;
}

const FullscreenWarning = ({ violations, onEnterFullscreen }: FullscreenWarningProps) => {
  return (
    <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 rounded-2xl bg-warning/20 mx-auto flex items-center justify-center">
          <AlertTriangle className="w-10 h-10 text-warning" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-display font-bold">Fullscreen Required</h2>
          <p className="text-muted-foreground">
            You have exited fullscreen mode. This action has been recorded as a violation.
            Please return to fullscreen to continue your exam.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/30">
          <p className="text-sm text-destructive">
            <strong>Warning:</strong> You have {violations} violation{violations > 1 ? 's' : ''} recorded. 
            Multiple violations may result in exam disqualification.
          </p>
        </div>

        <Button variant="hero" size="lg" onClick={onEnterFullscreen} className="w-full">
          <Maximize className="w-5 h-5 mr-2" />
          Return to Fullscreen
        </Button>
      </div>
    </div>
  );
};

export default FullscreenWarning;
