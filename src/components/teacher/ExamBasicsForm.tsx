import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ExamBasicsFormProps {
    data: {
        title: string;
        subject: string;
        description: string;
        duration_minutes: number;
        total_points: number;
        instructions: string;
    };
    onChange: (field: string, value: any) => void;
}

const ExamBasicsForm = ({ data, onChange }: ExamBasicsFormProps) => {
    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="title">Exam Title *</Label>
                    <Input
                        id="title"
                        placeholder="e.g. Midterm Physics"
                        value={data.title}
                        onChange={(e) => onChange("title", e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                        id="subject"
                        placeholder="e.g. Physics 101"
                        value={data.subject}
                        onChange={(e) => onChange("subject", e.target.value)}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                    id="description"
                    placeholder="Brief description of the exam content..."
                    value={data.description}
                    onChange={(e) => onChange("description", e.target.value)}
                />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="duration">Duration (minutes) *</Label>
                    <Input
                        id="duration"
                        type="number"
                        min="1"
                        value={data.duration_minutes}
                        onChange={(e) => onChange("duration_minutes", parseInt(e.target.value) || 0)}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="points">Total Points (Auto-calculated)</Label>
                    <Input
                        id="points"
                        type="number"
                        value={data.total_points}
                        disabled
                        className="bg-muted"
                    />
                    <p className="text-xs text-muted-foreground">Points are calculated from questions.</p>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="instructions">Instructions (One per line)</Label>
                <Textarea
                    id="instructions"
                    placeholder="e.g. No calculators allowed&#10;Answer all questions"
                    className="min-h-[100px]"
                    value={data.instructions}
                    onChange={(e) => onChange("instructions", e.target.value)}
                />
            </div>
        </div>
    );
};

export default ExamBasicsForm;
