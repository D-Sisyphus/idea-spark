import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import QuestionCard from "./QuestionCard";
import { v4 as uuidv4 } from "uuid";

interface QuestionBuilderProps {
    questions: any[];
    onChange: (questions: any[]) => void;
}

const QuestionBuilder = ({ questions, onChange }: QuestionBuilderProps) => {

    const addQuestion = () => {
        const newQuestion = {
            id: uuidv4(),
            type: "mcq",
            question_text: "",
            points: 1,
            options: ["", "", "", ""],
            correct_answer: "",
        };
        onChange([...questions, newQuestion]);
    };

    const removeQuestion = (id: string) => {
        onChange(questions.filter((q) => q.id !== id));
    };

    const updateQuestion = (id: string, field: string, value: any) => {
        onChange(questions.map((q) => (q.id === id ? { ...q, [field]: value } : q)));
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Questions ({questions.length})</h3>
                <Button onClick={addQuestion}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Question
                </Button>
            </div>

            <div className="space-y-4">
                {questions.length === 0 ? (
                    <div className="text-center py-10 border-2 border-dashed rounded-lg text-muted-foreground">
                        No questions added yet. Click "Add Question" to start building your exam.
                    </div>
                ) : (
                    questions.map((question, index) => (
                        <QuestionCard
                            key={question.id}
                            index={index}
                            question={question}
                            onChange={updateQuestion}
                            onRemove={removeQuestion}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default QuestionBuilder;
