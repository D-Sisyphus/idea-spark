import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus } from "lucide-react";

interface QuestionCardProps {
    question: {
        id: string;
        type: "mcq" | "multiple" | "true-false" | "short-answer";
        question_text: string;
        options?: string[];
        correct_answer?: string | string[];
        points: number;
    };
    index: number;
    onChange: (id: string, field: string, value: any) => void;
    onRemove: (id: string) => void;
}

const QuestionCard = ({ question, index, onChange, onRemove }: QuestionCardProps) => {

    const handleOptionChange = (optIndex: number, value: string) => {
        const newOptions = [...(question.options || [])];
        newOptions[optIndex] = value;
        onChange(question.id, "options", newOptions);
    };

    const addOption = () => {
        const newOptions = [...(question.options || []), ""];
        onChange(question.id, "options", newOptions);
    };

    const removeOption = (optIndex: number) => {
        const newOptions = (question.options || []).filter((_, i) => i !== optIndex);
        onChange(question.id, "options", newOptions);
    };

    return (
        <Card className="p-4 relative hover:shadow-sm transition-shadow">
            <div className="absolute top-4 right-4">
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-destructive"
                    onClick={() => onRemove(question.id)}
                >
                    <Trash2 className="w-4 h-4" />
                </Button>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <Badge variant="outline" className="h-6 w-6 rounded-full flex items-center justify-center p-0 shrink-0">
                        {index + 1}
                    </Badge>
                    <div className="w-[200px]">
                        <Select
                            value={question.type}
                            onValueChange={(value) => onChange(question.id, "type", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Question Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="mcq">Multiple Choice</SelectItem>
                                <SelectItem value="multiple">Multiple Select</SelectItem>
                                <SelectItem value="true-false">True/False</SelectItem>
                                <SelectItem value="short-answer">Short Answer</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="w-[100px] ml-auto mr-8">
                        <Input
                            type="number"
                            min="1"
                            placeholder="Points"
                            value={question.points}
                            onChange={(e) => onChange(question.id, "points", parseInt(e.target.value) || 0)}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Question Text</Label>
                    <Textarea
                        placeholder="Enter your question here..."
                        value={question.question_text}
                        onChange={(e) => onChange(question.id, "question_text", e.target.value)}
                    />
                </div>

                {/* Options based on type */}
                {(question.type === "mcq" || question.type === "multiple") && (
                    <div className="space-y-3 pl-4 border-l-2 border-muted">
                        <Label>Options</Label>
                        {question.options?.map((option, optIdx) => (
                            <div key={optIdx} className="flex items-center gap-2">
                                <Input
                                    value={option}
                                    onChange={(e) => handleOptionChange(optIdx, e.target.value)}
                                    placeholder={`Option ${optIdx + 1}`}
                                />

                                {/* Correct Answer Selection Logic */}
                                {question.type === "mcq" && (
                                    <input
                                        type="radio"
                                        name={`correct-${question.id}`}
                                        checked={question.correct_answer === option && option !== ""}
                                        onChange={() => onChange(question.id, "correct_answer", option)}
                                        className="w-4 h-4 text-primary"
                                        title="Mark as correct"
                                    />
                                )}
                                {question.type === "multiple" && (
                                    <input
                                        type="checkbox"
                                        checked={Array.isArray(question.correct_answer) && question.correct_answer.includes(option)}
                                        onChange={(e) => {
                                            const current = Array.isArray(question.correct_answer) ? question.correct_answer : [];
                                            if (e.target.checked) {
                                                onChange(question.id, "correct_answer", [...current, option]);
                                            } else {
                                                onChange(question.id, "correct_answer", current.filter((o) => o !== option));
                                            }
                                        }}
                                        className="w-4 h-4 text-primary"
                                        title="Mark as correct"
                                    />
                                )}

                                <Button variant="ghost" size="icon" onClick={() => removeOption(optIdx)}>
                                    <Trash2 className="w-4 h-4 text-muted-foreground" />
                                </Button>
                            </div>
                        ))}
                        <Button variant="outline" size="sm" onClick={addOption} className="mt-2">
                            <Plus className="w-4 h-4 mr-2" /> Add Option
                        </Button>
                    </div>
                )}

                {question.type === "true-false" && (
                    <div className="flex gap-4 pl-4">
                        <Button
                            variant={question.correct_answer === "True" ? "default" : "outline"}
                            onClick={() => onChange(question.id, "correct_answer", "True")}
                        >
                            True
                        </Button>
                        <Button
                            variant={question.correct_answer === "False" ? "default" : "outline"}
                            onClick={() => onChange(question.id, "correct_answer", "False")}
                        >
                            False
                        </Button>
                    </div>
                )}

                {question.type === "short-answer" && (
                    <div className="pl-4">
                        <Input
                            placeholder="Correct Answer (for auto-grading)"
                            value={question.correct_answer as string || ""}
                            onChange={(e) => onChange(question.id, "correct_answer", e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground mt-1">Exact match required for auto-grading.</p>
                    </div>
                )}
            </div>
        </Card>
    );
};

export default QuestionCard;
