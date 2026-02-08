import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, FileText, Users, Calendar, AlertCircle } from "lucide-react";
import { format } from "date-fns";

interface ExamPreviewProps {
    data: any; // Using any for simplicity in this generated code, but strictly typed in real app
}

const ExamPreview = ({ data }: ExamPreviewProps) => {
    return (
        <div className="space-y-6">
            <Card className="p-6">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <Badge className="mb-2">{data.subject}</Badge>
                        <h2 className="text-2xl font-bold">{data.title}</h2>
                        {data.description && (
                            <p className="text-muted-foreground mt-2">{data.description}</p>
                        )}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <Badge variant="outline" className="text-lg py-1 px-3">
                            {data.total_points} Points
                        </Badge>
                        <div className="text-sm text-muted-foreground">
                            {data.questions.length} Questions
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                        <Clock className="w-5 h-5 text-primary" />
                        <div>
                            <p className="text-xs text-muted-foreground">Duration</p>
                            <p className="font-medium">{data.duration_minutes} mins</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                        <Users className="w-5 h-5 text-primary" />
                        <div>
                            <p className="text-xs text-muted-foreground">Enrolled</p>
                            <p className="font-medium">{data.selectedStudents?.length || 0} Students</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                        <Calendar className="w-5 h-5 text-primary" />
                        <div>
                            <p className="text-xs text-muted-foreground">Start Time</p>
                            <p className="font-medium">
                                {data.start_time ? format(new Date(data.start_time), "MMM d, HH:mm") : "Anytime"}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-primary" />
                        <div>
                            <p className="text-xs text-muted-foreground">End Time</p>
                            <p className="font-medium">
                                {data.end_time ? format(new Date(data.end_time), "MMM d, HH:mm") : "No Limit"}
                            </p>
                        </div>
                    </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Instructions</h3>
                    {data.instructions ? (
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                            {data.instructions.split('\n').map((line: string, i: number) => (
                                <li key={i}>{line}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-muted-foreground italic">No specific instructions.</p>
                    )}
                </div>
            </Card>

            <div className="space-y-4">
                <h3 className="font-semibold text-lg">Questions Preview</h3>
                {data.questions.map((q: any, i: number) => (
                    <Card key={q.id} className="p-4">
                        <div className="flex items-start gap-4">
                            <Badge variant="secondary" className="h-6 w-6 rounded-full flex items-center justify-center p-0 shrink-0">
                                {i + 1}
                            </Badge>
                            <div className="flex-1">
                                <div className="flex justify-between mb-2">
                                    <p className="font-medium">{q.question_text}</p>
                                    <Badge variant="outline">{q.points} pt{q.points !== 1 && 's'}</Badge>
                                </div>

                                {/* Options Preview */}
                                {(q.type === 'mcq' || q.type === 'multiple') && (
                                    <div className="space-y-2 pl-2 border-l-2 border-muted mt-2">
                                        {q.options.map((opt: string, idx: number) => (
                                            <div key={idx} className="flex items-center gap-2 text-sm">
                                                <div className={`w-3 h-3 rounded-full border ${(q.type === 'mcq' && q.correct_answer === opt) ||
                                                        (q.type === 'multiple' && q.correct_answer?.includes(opt))
                                                        ? 'bg-green-500 border-green-500' : 'border-muted-foreground'
                                                    }`} />
                                                <span>{opt}</span>
                                                {(q.type === 'mcq' && q.correct_answer === opt) ||
                                                    (q.type === 'multiple' && q.correct_answer?.includes(opt)) ? (
                                                    <span className="text-xs text-green-600 font-medium ml-2">(Correct)</span>
                                                ) : null}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {q.type === 'true-false' && (
                                    <div className="flex gap-4 mt-2">
                                        <Badge variant={q.correct_answer === 'True' ? 'default' : 'outline'}>True</Badge>
                                        <Badge variant={q.correct_answer === 'False' ? 'default' : 'outline'}>False</Badge>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ExamPreview;
