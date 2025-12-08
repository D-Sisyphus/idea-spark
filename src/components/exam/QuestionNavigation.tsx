import { cn } from "@/lib/utils";
import { CheckCircle, Circle, Flag } from "lucide-react";

interface QuestionNavigationProps {
  totalQuestions: number;
  currentQuestion: number;
  answers: Record<number, string | string[]>;
  flaggedQuestions: number[];
  onNavigate: (index: number) => void;
}

const QuestionNavigation = ({
  totalQuestions,
  currentQuestion,
  answers,
  flaggedQuestions,
  onNavigate,
}: QuestionNavigationProps) => {
  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <h3 className="font-semibold text-sm text-muted-foreground mb-3">
        Question Navigator
      </h3>
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: totalQuestions }, (_, i) => {
          const questionNum = i + 1;
          const isAnswered = answers[questionNum] !== undefined;
          const isFlagged = flaggedQuestions.includes(questionNum);
          const isCurrent = currentQuestion === questionNum;

          return (
            <button
              key={questionNum}
              onClick={() => onNavigate(questionNum)}
              className={cn(
                "relative w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-200",
                isCurrent
                  ? "bg-accent text-accent-foreground ring-2 ring-accent ring-offset-2 ring-offset-background"
                  : isAnswered
                  ? "bg-success/20 text-success border border-success/50 hover:bg-success/30"
                  : "bg-secondary text-foreground border border-border hover:bg-secondary/80"
              )}
            >
              {questionNum}
              {isFlagged && (
                <Flag className="absolute -top-1 -right-1 w-3 h-3 text-warning fill-warning" />
              )}
              {isAnswered && !isCurrent && (
                <CheckCircle className="absolute -bottom-1 -right-1 w-3 h-3 text-success" />
              )}
            </button>
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="mt-4 pt-3 border-t border-border space-y-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-success/20 border border-success/50" />
          <span>Answered</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-secondary border border-border" />
          <span>Not Answered</span>
        </div>
        <div className="flex items-center gap-2">
          <Flag className="w-3 h-3 text-warning fill-warning" />
          <span>Flagged for Review</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionNavigation;
