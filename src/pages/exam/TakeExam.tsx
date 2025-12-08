import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { sampleExam } from "@/lib/examData";
import { useExamTimer } from "@/hooks/useExamTimer";
import { useFullscreen } from "@/hooks/useFullscreen";
import ExamInstructions from "@/components/exam/ExamInstructions";
import ExamHeader from "@/components/exam/ExamHeader";
import QuestionCard from "@/components/exam/QuestionCard";
import QuestionNavigation from "@/components/exam/QuestionNavigation";
import ExamReview from "@/components/exam/ExamReview";
import FullscreenWarning from "@/components/exam/FullscreenWarning";

type ExamState = 'instructions' | 'in-progress' | 'review' | 'submitted';

const TakeExam = () => {
  const navigate = useNavigate();
  const [examState, setExamState] = useState<ExamState>('instructions');
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTimeUp = useCallback(() => {
    toast.error("Time's up! Your exam has been auto-submitted.");
    handleSubmit();
  }, []);

  const { formattedTime, percentage, isLowTime, isCriticalTime, start: startTimer } = useExamTimer({
    initialMinutes: sampleExam.duration,
    onTimeUp: handleTimeUp,
  });

  const { isFullscreen, violations, enterFullscreen } = useFullscreen();

  const handleStartExam = useCallback(async () => {
    await enterFullscreen();
    setExamState('in-progress');
    startTimer();
    toast.success("Exam started. Good luck!");
  }, [enterFullscreen, startTimer]);

  const handleAnswer = useCallback((answer: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion]: answer }));
  }, [currentQuestion]);

  const handleFlag = useCallback(() => {
    setFlaggedQuestions((prev) =>
      prev.includes(currentQuestion)
        ? prev.filter((q) => q !== currentQuestion)
        : [...prev, currentQuestion]
    );
  }, [currentQuestion]);

  const handleNavigate = useCallback((questionNum: number) => {
    setCurrentQuestion(questionNum);
    if (examState === 'review') {
      setExamState('in-progress');
    }
  }, [examState]);

  const handlePrevious = useCallback(() => {
    if (currentQuestion > 1) {
      setCurrentQuestion((prev) => prev - 1);
    }
  }, [currentQuestion]);

  const handleNext = useCallback(() => {
    if (currentQuestion < sampleExam.totalQuestions) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setExamState('review');
    }
  }, [currentQuestion]);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setExamState('submitted');
    toast.success("Exam submitted successfully!");
    
    // Exit fullscreen and redirect
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    
    setTimeout(() => {
      navigate('/student');
    }, 3000);
  }, [navigate]);

  // Show low time warning
  useEffect(() => {
    if (isLowTime && !isCriticalTime && examState === 'in-progress') {
      toast.warning("5 minutes remaining!", { duration: 5000 });
    }
  }, [isLowTime, isCriticalTime, examState]);

  useEffect(() => {
    if (isCriticalTime && examState === 'in-progress') {
      toast.error("1 minute remaining!", { duration: 3000 });
    }
  }, [isCriticalTime, examState]);

  // Instructions Screen
  if (examState === 'instructions') {
    return <ExamInstructions exam={sampleExam} onStart={handleStartExam} />;
  }

  // Submitted Screen
  if (examState === 'submitted') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 rounded-full bg-success/20 mx-auto flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-success/40 flex items-center justify-center">
              <svg className="w-8 h-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold">Exam Submitted!</h1>
            <p className="text-muted-foreground mt-2">
              Your answers have been recorded. Redirecting to dashboard...
            </p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    );
  }

  const currentQuestionData = sampleExam.questions[currentQuestion - 1];
  const showFullscreenWarning = !isFullscreen && examState === 'in-progress' && violations.length > 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Fullscreen Warning Overlay */}
      {showFullscreenWarning && (
        <FullscreenWarning
          violations={violations.length}
          onEnterFullscreen={enterFullscreen}
        />
      )}

      {/* Header */}
      <ExamHeader
        title={sampleExam.title}
        subject={sampleExam.subject}
        formattedTime={formattedTime}
        percentage={percentage}
        isLowTime={isLowTime}
        isCriticalTime={isCriticalTime}
        violations={violations.length}
        isFullscreen={isFullscreen}
        onEnterFullscreen={enterFullscreen}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question Area */}
          <div className="lg:col-span-3">
            {examState === 'review' ? (
              <ExamReview
                questions={sampleExam.questions}
                answers={answers}
                flaggedQuestions={flaggedQuestions}
                onNavigate={handleNavigate}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            ) : (
              <QuestionCard
                question={currentQuestionData}
                questionNumber={currentQuestion}
                totalQuestions={sampleExam.totalQuestions}
                answer={answers[currentQuestion]}
                isFlagged={flaggedQuestions.includes(currentQuestion)}
                onAnswer={handleAnswer}
                onFlag={handleFlag}
                onPrevious={handlePrevious}
                onNext={handleNext}
                isFirst={currentQuestion === 1}
                isLast={currentQuestion === sampleExam.totalQuestions}
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <QuestionNavigation
                totalQuestions={sampleExam.totalQuestions}
                currentQuestion={currentQuestion}
                answers={answers}
                flaggedQuestions={flaggedQuestions}
                onNavigate={handleNavigate}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TakeExam;
