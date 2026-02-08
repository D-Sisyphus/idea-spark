import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { useTeacherExams } from "@/hooks/teacher/useTeacherExams";
import { usePublishExam } from "@/hooks/teacher/usePublishExam";
import ExamCard from "@/components/teacher/ExamCard";
import { useState } from "react";

const ManageExams = () => {
    const { data: exams, isLoading } = useTeacherExams();
    const publishExamMutation = usePublishExam();
    const [searchTerm, setSearchTerm] = useState("");

    const filteredExams = exams?.filter(exam =>
        exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <DashboardLayout role="teacher">
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">My Exams</h1>
                        <p className="text-muted-foreground">Manage your exams, questions, and students.</p>
                    </div>
                    <Button asChild>
                        <Link to="/teacher/exams/create">
                            <Plus className="w-4 h-4 mr-2" />
                            Create Exam
                        </Link>
                    </Button>
                </div>

                {/* Filters */}
                <div className="flex gap-4 items-center">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search exams..."
                            className="pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" size="icon">
                        <Filter className="w-4 h-4" />
                    </Button>
                </div>

                {/* Exam Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isLoading ? (
                        // Skeletons
                        [1, 2, 3].map((n) => (
                            <div key={n} className="h-[200px] rounded-xl bg-muted/50 animate-pulse" />
                        ))
                    ) : filteredExams?.length === 0 ? (
                        <div className="col-span-full text-center py-20 border-2 border-dashed rounded-xl">
                            <h3 className="text-lg font-semibold">No exams found</h3>
                            <p className="text-muted-foreground mb-4">Get started by creating your first exam.</p>
                            <Button asChild>
                                <Link to="/teacher/exams/create">Create Exam</Link>
                            </Button>
                        </div>
                    ) : (
                        filteredExams?.map((exam) => (
                            <ExamCard
                                key={exam.id}
                                exam={exam}
                                onPublish={(id) => publishExamMutation.mutate(id)}
                            />
                        ))
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ManageExams;
