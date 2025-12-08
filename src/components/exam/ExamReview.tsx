import { CheckCircle, Circle, Flag, AlertTriangle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Question } from "@/lib/examData";
import { cn } from "@/lib/utils";

interface ExamReviewProps {
  questions: Question[];
  answers: Record<number, string | string[]>;
  flaggedQuestions: number[];
  onNavigate: (questionNum: number) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const ExamReview = ({
  questions,
  answers,
  flaggedQuestions,
  onNavigate,
  onSubmit,
  isSubmitting,
}: ExamReviewProps) => {
  const answeredCount = Object.keys(answers).length;
  const unansweredCount = questions.length - answeredCount;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-accent" />
            Review Your Answers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Summary */}
          <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-secondary/50 border border-border">
            <div className="text-center">
              <p className="text-2xl font-bold text-success">{answeredCount}</p>
              <p className="text-sm text-muted-foreground">Answered</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-destructive">{unansweredCount}</p>
              <p className="text-sm text-muted-foreground">Unanswered</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-warning">{flaggedQuestions.length}</p>
              <p className="text-sm text-muted-foreground">Flagged</p>
            </div>
          </div>

          {/* Warning */}
          {unansweredCount > 0 && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-warning/10 border border-warning/30">
              <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
              <p className="text-sm">
                You have <strong>{unansweredCount} unanswered question{unansweredCount > 1 ? 's' : ''}</strong>. 
                Click on any question below to answer it before submitting.
              </p>
            </div>
          )}

          {/* Question List */}
          <div className="space-y-2">
            {questions.map((question, index) => {
              const questionNum = index + 1;
              const isAnswered = answers[questionNum] !== undefined;
              const isFlagged = flaggedQuestions.includes(questionNum);

              return (
                <button
                  key={question.id}
                  onClick={() => onNavigate(questionNum)}
                  className={cn(
                    "w-full p-4 rounded-xl border text-left transition-all duration-200 flex items-center gap-4 hover:bg-secondary/80",
                    isAnswered 
                      ? "bg-success/10 border-success/30" 
                      : "bg-destructive/5 border-destructive/30"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center font-mono text-sm font-bold",
                    isAnswered ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
                  )}>
                    {questionNum}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{question.question}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {question.points} pts
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {question.type}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isFlagged && <Flag className="w-4 h-4 text-warning fill-warning" />}
                    {isAnswered ? (
                      <CheckCircle className="w-5 h-5 text-success" />
                    ) : (
                      <Circle className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Button
        variant="hero"
        size="xl"
        className="w-full"
        onClick={onSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="w-5 h-5 mr-2" />
            Submit Exam
          </>
        )}
      </Button>
    </div>
  );
};

export default ExamReview;
