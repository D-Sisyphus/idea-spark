import { Shield, Clock, FileText, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Exam } from "@/lib/examData";

interface ExamInstructionsProps {
  exam: Exam;
  onStart: () => void;
}

const ExamInstructions = ({ exam, onStart }: ExamInstructionsProps) => {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-2xl w-full space-y-6">
        {/* Header Card */}
        <Card className="border-2 border-accent/30">
          <CardHeader className="text-center pb-2">
            <div className="w-16 h-16 rounded-2xl bg-gradient-primary mx-auto mb-4 flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary-foreground" />
            </div>
            <CardTitle className="font-display text-2xl">{exam.title}</CardTitle>
            <p className="text-muted-foreground">{exam.subject}</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 py-4 border-y border-border">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Duration</span>
                </div>
                <p className="font-bold text-lg">{exam.duration} mins</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
                  <FileText className="w-4 h-4" />
                  <span className="text-sm">Questions</span>
                </div>
                <p className="font-bold text-lg">{exam.totalQuestions}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">Total Points</span>
                </div>
                <p className="font-bold text-lg">{exam.totalPoints}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Instructions Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Important Instructions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              {exam.instructions.map((instruction, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Badge variant="secondary" className="mt-0.5 w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs">
                    {index + 1}
                  </Badge>
                  <span className="text-muted-foreground">{instruction}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-border">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-warning/10 border border-warning/30">
                <Checkbox
                  id="agree"
                  checked={agreed}
                  onCheckedChange={(checked) => setAgreed(checked as boolean)}
                />
                <label htmlFor="agree" className="text-sm cursor-pointer">
                  I understand that this exam will be proctored. I agree to follow all instructions and 
                  understand that any violations may result in disqualification.
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Start Button */}
        <Button
          variant="hero"
          size="xl"
          className="w-full"
          disabled={!agreed}
          onClick={onStart}
        >
          <Shield className="w-5 h-5 mr-2" />
          Start Exam
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          The exam will automatically enter fullscreen mode for security purposes.
        </p>
      </div>
    </div>
  );
};

export default ExamInstructions;
