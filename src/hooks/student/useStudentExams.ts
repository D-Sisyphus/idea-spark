import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const useStudentExams = () => {
    return useQuery({
        queryKey: ["student-exams"],
        queryFn: async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("Not authenticated");

            // Get exams the student is enrolled in
            const { data, error } = await supabase
                .from("exam_enrollments")
                .select(`
                    *,
                    exam:exams (
                        *,
                        questions (count)
                    )
                `)
                .eq("student_id", user.id)
                .order("created_at", { ascending: false });

            if (error) throw error;

            // Transform the data to have exam at the top level
            return data?.map(enrollment => ({
                ...enrollment.exam,
                enrollment_id: enrollment.id,
                enrolled_at: enrollment.created_at,
            })) || [];
        },
    });
};
