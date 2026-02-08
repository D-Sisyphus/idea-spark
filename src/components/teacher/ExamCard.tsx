import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, FileText, Users, Calendar, MoreVertical, Play, Edit } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { format } from "date-fns";

interface ExamCardProps {
    exam: {
        id: string;
        title: string;
        subject: string;
        duration_minutes: number;
        total_points: number;
        is_published: boolean;
        created_at: string;
        start_time?: string | null;
        questions?: { count: number }[];
        exam_enrollments?: { count: number }[];
    };
    onPublish?: (id: string) => void;
}

const ExamCard = ({ exam, onPublish }: ExamCardProps) => {
    const questionCount = exam.questions?.[0]?.count || 0;
    const studentCount = exam.exam_enrollments?.[0]?.count || 0;

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs font-normal">
                            {exam.subject}
                        </Badge>
                        <Badge
                            variant={exam.is_published ? "default" : "secondary"}
                            className={exam.is_published ? "bg-green-500 hover:bg-green-600" : ""}
                        >
                            {exam.is_published ? "Published" : "Draft"}
                        </Badge>
                    </div>
                    <CardTitle className="text-xl font-bold line-clamp-1">{exam.title}</CardTitle>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="-mr-2">
                            <MoreVertical className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                            <Link to={`/teacher/exams/${exam.id}/edit`}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                            </Link>
                        </DropdownMenuItem>
                        {!exam.is_published && onPublish && (
                            <DropdownMenuItem onClick={() => onPublish(exam.id)}>
                                <Play className="w-4 h-4 mr-2" />
                                Publish
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent className="pb-2">
                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{exam.duration_minutes} mins</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        <span>{questionCount} Questions</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{studentCount} Students</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{format(new Date(exam.created_at || new Date()), "MMM d, yyyy")}</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="pt-4 border-t">
                <Button variant="outline" className="w-full" asChild>
                    <Link to={`/teacher/exams/${exam.id}`}>View Details</Link>
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ExamCard;
