import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface EnrollStudentsInput {
    examId: string;
    studentIds: string[];
    classId?: string;
}

export const useEnrollStudents = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ examId, studentIds, classId }: EnrollStudentsInput) => {
            if (studentIds.length === 0) return;

            const { error } = await supabase.from("exam_enrollments").insert(
                studentIds.map((studentId) => ({
                    exam_id: examId,
                    student_id: studentId,
                    enrolled_via_class_id: classId || null,
                }))
            );

            if (error) throw error;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["exam-enrollments", variables.examId] });
            // Also invalidate the specific exam so counts update
            queryClient.invalidateQueries({ queryKey: ["teacher-exams"] });
            toast.success(`${variables.studentIds.length} students enrolled!`);
        },
        onError: (error: any) => {
            toast.error("Failed to enroll students: " + error.message);
        },
    });
};
