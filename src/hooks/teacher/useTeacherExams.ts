import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const useTeacherExams = () => {
    return useQuery({
        queryKey: ["teacher-exams"],
        queryFn: async () => {
            // RLS policies should ensure teachers only see their own exams
            // Or explicitly filter by created_by if needed, but RLS is cleaner
            const { data, error } = await supabase
                .from("exams")
                .select(`
          *,
          questions (count),
          exam_enrollments (count)
        `)
                .order("created_at", { ascending: false });

            if (error) throw error;
            return data;
        },
    });
};
