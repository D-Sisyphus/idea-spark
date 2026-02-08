import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export const usePublishExam = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (examId: string) => {
            const { error } = await supabase
                .from("exams")
                .update({ is_published: true })
                .eq("id", examId);

            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["teacher-exams"] });
            toast.success("Exam published successfully!");
        },
        onError: (error: any) => {
            toast.error("Failed to publish exam: " + error.message);
        },
    });
};
