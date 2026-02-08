import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface CreateExamInput {
    title: string;
    subject: string;
    description?: string;
    duration_minutes: number;
    total_points: number;
    instructions: string[];
    start_time?: string;
    end_time?: string;
    questions: Array<{
        question_number: number;
        type: "mcq" | "multiple" | "true-false" | "short-answer";
        question_text: string;
        options?: string[];
        correct_answer?: string | string[];
        points: number;
    }>;
}

export const useCreateExam = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (input: CreateExamInput) => {
            // Get current user
            const { data: { user }, error: userError } = await supabase.auth.getUser();
            if (userError || !user) {
                throw new Error("User not authenticated");
            }

            // 1. Create exam
            const { data: exam, error: examError } = await supabase
                .from("exams")
                .insert({
                    title: input.title,
                    subject: input.subject,
                    description: input.description,
                    duration_minutes: input.duration_minutes,
                    total_points: input.total_points,
                    instructions: input.instructions,
                    start_time: input.start_time,
                    end_time: input.end_time,
                    is_published: false,
                    created_by: user.id, // CRITICAL: Set the creator
                })
                .select()
                .single();

            if (examError) throw examError;

            // 2. Create questions
            // Need to make sure we handle empty questions array gracefully, although UI should prevent it
            if (input.questions.length > 0) {
                const { error: questionsError } = await supabase
                    .from("questions")
                    .insert(
                        input.questions.map((q) => ({
                            exam_id: exam.id,
                            ...q,
                        }))
                    );

                if (questionsError) throw questionsError;
            }

            return exam;
        },
        onSuccess: (exam) => {
            queryClient.invalidateQueries({ queryKey: ["teacher-exams"] });
            toast.success(`Exam "${exam.title}" created successfully!`);
        },
        onError: (error: any) => {
            console.error("Create exam error:", error);
            toast.error("Failed to create exam: " + error.message);
        },
    });
};
