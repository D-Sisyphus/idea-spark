// src/hooks/useExams.ts
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const useExams = () => {
    return useQuery({
        queryKey: ["exams"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("exams")
                .select(`
          *,
          questions (*),
          creator:profiles!created_by (full_name, email)
        `)
                .eq("is_published", true)
                .order("created_at", { ascending: false });

            if (error) throw error;
            return data;
        },
    });
};

// Usage in component
const StudentDashboard = () => {
    const { data: exams, isLoading, error } = useExams();

    if (isLoading) return <Spinner />;
    if (error) return <ErrorMessage error={ error } />;

    return (
        <div>
        {
            exams.map(exam => (
                <ExamCard key= { exam.id } exam = { exam } />
      ))
        }
        </div>
    );
};
