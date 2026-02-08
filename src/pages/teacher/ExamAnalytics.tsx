import { useParams } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Loader2, TrendingUp, Users, Clock, AlertTriangle } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const ExamAnalytics = () => {
    const { examId } = useParams();

    const { data: exam, isLoading } = useQuery({
        queryKey: ["exam-analytics", examId],
        queryFn: async () => {
            // Fetch exam details with attempts and enrollments
            const { data, error } = await supabase
                .from("exams")
                .select(`
          *,
          questions (*),
          exam_enrollments (*, student:profiles(*)),
          exam_attempts (*)
        `)
                .eq("id", examId)
                .single();

            if (error) throw error;
            return data;
        },
    });

    if (isLoading) {
        return (
            <DashboardLayout role="teacher">
                <div className="flex items-center justify-center h-[50vh]">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            </DashboardLayout>
        );
    }

    if (!exam) {
        return (
            <DashboardLayout role="teacher">
                <div className="text-center py-20">
                    <h2 className="text-xl font-semibold">Exam not found</h2>
                </div>
            </DashboardLayout>
        );
    }

    // Calculate stats
    const totalStudents = exam.exam_enrollments?.length || 0;
    const submittedAttempts = exam.exam_attempts?.filter((a: any) => a.status === 'completed') || [];
    const totalAttempts = submittedAttempts.length;

    const averageScore = totalAttempts > 0
        ? submittedAttempts.reduce((acc: number, curr: any) => acc + (curr.score || 0), 0) / totalAttempts
        : 0;

    const highestScore = totalAttempts > 0
        ? Math.max(...submittedAttempts.map((a: any) => a.score || 0))
        : 0;

    return (
        <DashboardLayout role="teacher">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">{exam.subject}</Badge>
                            <Badge variant={exam.is_published ? "default" : "secondary"}>
                                {exam.is_published ? "Published" : "Draft"}
                            </Badge>
                        </div>
                        <h1 className="text-3xl font-bold">{exam.title}</h1>
                    </div>
                    <Button variant="outline">Download Report</Button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Enrollments</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalStudents}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Submissions</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalAttempts} / {totalStudents}</div>
                            <p className="text-xs text-muted-foreground">
                                {totalStudents > 0 ? Math.round((totalAttempts / totalStudents) * 100) : 0}% completion rate
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{averageScore.toFixed(1)}</div>
                            <p className="text-xs text-muted-foreground">
                                out of {exam.total_points}
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Top Score</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{highestScore}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Results Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Student Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Student</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Score</TableHead>
                                    <TableHead>Submitted At</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {exam.exam_enrollments?.map((enrollment: any) => {
                                    const attempt = exam.exam_attempts?.find((a: any) => a.student_id === enrollment.student_id);

                                    return (
                                        <TableRow key={enrollment.id}>
                                            <TableCell>
                                                <div className="font-medium">{enrollment.student?.full_name || "Unknown"}</div>
                                                <div className="text-xs text-muted-foreground">{enrollment.student?.email}</div>
                                            </TableCell>
                                            <TableCell>
                                                {attempt ? (
                                                    <Badge variant={attempt.status === 'completed' ? 'default' : 'secondary'}>
                                                        {attempt.status}
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="outline">Not Started</Badge>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {attempt?.score !== undefined ? (
                                                    <span className={attempt.score >= (exam.total_points * 0.4) ? "text-green-600 font-medium" : "text-red-600"}>
                                                        {attempt.score} / {exam.total_points}
                                                    </span>
                                                ) : "-"}
                                            </TableCell>
                                            <TableCell>
                                                {attempt?.submitted_at ? new Date(attempt.submitted_at).toLocaleDateString() : "-"}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="sm">View</Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                                {exam.exam_enrollments?.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                                            No students enrolled yet.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default ExamAnalytics;
