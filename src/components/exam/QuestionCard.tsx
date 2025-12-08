import { Question } from "@/lib/examData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Flag, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  answer: string | string[] | undefined;
  isFlagged: boolean;
  onAnswer: (answer: string | string[]) => void;
  onFlag: () => void;
  onPrevious: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const QuestionCard = ({
  question,
  questionNumber,
  totalQuestions,
  answer,
  isFlagged,
  onAnswer,
  onFlag,
  onPrevious,
  onNext,
  isFirst,
  isLast,
}: QuestionCardProps) => {
  const handleOptionClick = (option: string) => {
    if (question.type === 'multiple') {
      const currentAnswers = Array.isArray(answer) ? answer : [];
      if (currentAnswers.includes(option)) {
        onAnswer(currentAnswers.filter((a) => a !== option));
      } else {
        onAnswer([...currentAnswers, option]);
      }
    } else {
      onAnswer(option);
    }
  };

  const isOptionSelected = (option: string) => {
    if (question.type === 'multiple') {
      return Array.isArray(answer) && answer.includes(option);
    }
    return answer === option;
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-mono">
              Q{questionNumber}/{totalQuestions}
            </Badge>
            <Badge variant="secondary">
              {question.type === 'mcq' && 'Multiple Choice'}
              {question.type === 'multiple' && 'Select Multiple'}
              {question.type === 'true-false' && 'True/False'}
              {question.type === 'short-answer' && 'Short Answer'}
            </Badge>
            <Badge variant="accent">{question.points} pts</Badge>
          </div>
        </div>
        <Button
          variant={isFlagged ? "warning" : "outline"}
          size="sm"
          onClick={onFlag}
          className={cn(isFlagged && "bg-warning/20 border-warning text-warning")}
        >
          <Flag className={cn("w-4 h-4", isFlagged && "fill-warning")} />
          {isFlagged ? "Flagged" : "Flag"}
        </Button>
      </div>

      {/* Question */}
      <div className="py-4 border-y border-border">
        <p className="text-lg font-medium leading-relaxed">{question.question}</p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question.type === 'short-answer' ? (
          <Textarea
            placeholder="Type your answer here..."
            value={(answer as string) || ''}
            onChange={(e) => onAnswer(e.target.value)}
            className="min-h-[150px] resize-none"
          />
        ) : (
          question.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className={cn(
                "w-full p-4 rounded-xl border-2 text-left transition-all duration-200 flex items-center gap-3",
                isOptionSelected(option)
                  ? "bg-accent/10 border-accent text-accent-foreground"
                  : "bg-secondary/50 border-border hover:border-accent/50 hover:bg-secondary"
              )}
            >
              {question.type === 'multiple' ? (
                <Checkbox
                  checked={isOptionSelected(option)}
                  className="pointer-events-none"
                />
              ) : (
                <div
                  className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                    isOptionSelected(option)
                      ? "border-accent bg-accent"
                      : "border-muted-foreground"
                  )}
                >
                  {isOptionSelected(option) && (
                    <div className="w-2 h-2 rounded-full bg-accent-foreground" />
                  )}
                </div>
              )}
              <span className="font-medium">{option}</span>
            </button>
          ))
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={isFirst}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </Button>
        <Button
          variant={isLast ? "accent" : "default"}
          onClick={onNext}
        >
          {isLast ? "Review Answers" : "Next"}
          {!isLast && <ChevronRight className="w-4 h-4 ml-1" />}
        </Button>
      </div>
    </div>
  );
};

export default QuestionCard;
