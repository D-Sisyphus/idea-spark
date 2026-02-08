import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, Save } from "lucide-react";
import { toast } from "sonner";

// Components
import ExamBasicsForm from "@/components/teacher/ExamBasicsForm";
import QuestionBuilder from "@/components/teacher/QuestionBuilder";
import ScheduleForm from "@/components/teacher/ScheduleForm";
import EnrollStudents from "@/components/teacher/EnrollStudents";
import ExamPreview from "@/components/teacher/ExamPreview";

// Hooks
import { useCreateExam } from "@/hooks/teacher/useCreateExam";
import { usePublishExam } from "@/hooks/teacher/usePublishExam";
import { useEnrollStudents } from "@/hooks/teacher/useEnrollStudents";

const STEPS = [
    { id: 1, title: "Basics" },
    { id: 2, title: "Questions" },
    { id: 3, title: "Schedule" },
    { id: 4, title: "Students" },
    { id: 5, title: "Preview" },
];

const CreateExam = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const createExamMutation = useCreateExam();
    const publishExamMutation = usePublishExam();
    const enrollStudentsMutation = useEnrollStudents();

    const [formData, setFormData] = useState({
        title: "",
        subject: "",
        description: "",
        duration_minutes: 60,
        total_points: 0,
        instructions: "",
        questions: [],
        start_time: "",
        end_time: "",
        selectedStudents: [],
    });

    const updateField = (field: string, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const calculateTotalPoints = (questions: any[]) => {
        return questions.reduce((sum, q) => sum + (q.points || 0), 0);
    };

    const handleQuestionChange = (questions: any[]) => {
        setFormData((prev) => ({
            ...prev,
            questions,
            total_points: calculateTotalPoints(questions),
        }));
    };

    const handleNext = () => {
        if (currentStep === 1) {
            if (!formData.title || !formData.subject || !formData.duration_minutes) {
                toast.error("Please fill in all required fields");
                return;
            }
        }
        if (currentStep === 2) {
            if (formData.questions.length === 0) {
                toast.error("Please add at least one question");
                return;
            }
        }

        if (currentStep < 5) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const prepareExamData = () => {
        return {
            ...formData,
            instructions: typeof formData.instructions === 'string'
                ? formData.instructions.split('\n').filter(Boolean)
                : formData.instructions,
            questions: formData.questions.map((q: any, index: number) => ({
                ...q,
                question_number: index + 1,
            })),
            start_time: formData.start_time || null,
            end_time: formData.end_time || null,
        };
    };

    const handleSaveDraft = async () => {
        try {
            const examData = prepareExamData();
            await createExamMutation.mutateAsync(examData as any);
            navigate("/teacher/exams");
        } catch (error) {
            // Error handled by hook
        }
    };

    const handlePublish = async () => {
        try {
            const examData = prepareExamData();
            const exam = await createExamMutation.mutateAsync(examData as any);

            // If we have an exam ID, publish it and enroll students
            if (exam?.id) {
                await publishExamMutation.mutateAsync(exam.id);

                // Enroll selected students if any
                if (formData.selectedStudents.length > 0) {
                    await enrollStudentsMutation.mutateAsync({
                        examId: exam.id,
                        studentIds: formData.selectedStudents,
                    });
                }

                navigate("/teacher/exams");
            }
        } catch (error) {
            // Error handled by hook
        }
    };

    return (
        <DashboardLayout role="teacher">
            <div className="max-w-5xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Create New Exam</h1>
                        <p className="text-muted-foreground">Follow the steps to set up your exam details.</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={handleSaveDraft} disabled={createExamMutation.isPending}>
                            <Save className="w-4 h-4 mr-2" />
                            Save Draft
                        </Button>
                    </div>
                </div>

                {/* Progress Steps */}
                <div className="flex justify-between items-center relative mb-8">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-muted -z-10" />

                    {STEPS.map((step) => {
                        const isActive = step.id === currentStep;
                        const isCompleted = step.id < currentStep;

                        return (
                            <div key={step.id} className="flex flex-col items-center bg-background px-2">
                                <div
                                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center border-2 font-medium transition-colors
                      ${isActive ? "border-primary bg-primary text-primary-foreground" : ""}
                      ${isCompleted ? "border-primary bg-primary/20 text-primary" : "border-muted text-muted-foreground"}
                    `}
                                >
                                    {step.id}
                                </div>
                                <span className={`text-sm mt-2 font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                                    {step.title}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Step Content */}
                <Card className="min-h-[500px]">
                    <CardContent className="p-6">
                        {currentStep === 1 && (
                            <ExamBasicsForm data={formData} onChange={updateField} />
                        )}
                        {currentStep === 2 && (
                            <QuestionBuilder questions={formData.questions} onChange={handleQuestionChange} />
                        )}
                        {currentStep === 3 && (
                            <ScheduleForm data={formData} onChange={updateField} />
                        )}
                        {currentStep === 4 && (
                            <EnrollStudents
                                selectedStudents={formData.selectedStudents}
                                onChange={(ids) => updateField("selectedStudents", ids)}
                            />
                        )}
                        {currentStep === 5 && (
                            <ExamPreview data={formData} />
                        )}
                    </CardContent>
                </Card>

                {/* Navigation Footer */}
                <div className="flex justify-between pt-4">
                    <Button
                        variant="outline"
                        onClick={handleBack}
                        disabled={currentStep === 1}
                    >
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Back
                    </Button>

                    {currentStep < 5 ? (
                        <Button onClick={handleNext}>
                            Next Step
                            <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                    ) : (
                        <Button onClick={handlePublish} className="bg-green-600 hover:bg-green-700">
                            Publish Exam
                            <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default CreateExam;
