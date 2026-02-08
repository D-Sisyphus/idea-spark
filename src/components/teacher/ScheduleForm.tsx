import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ScheduleFormProps {
    data: {
        start_time: string;
        end_time: string;
    };
    onChange: (field: string, value: any) => void;
}

const ScheduleForm = ({ data, onChange }: ScheduleFormProps) => {
    return (
        <div className="space-y-6">
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-100 text-blue-800 mb-6">
                <h4 className="font-semibold mb-1">Optional Scheduling</h4>
                <p className="text-sm">Leave these fields blank if you want the exam to be available indefinitely after publishing. Setting times restricts access to the specified window.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="start_time">Start Time</Label>
                    <Input
                        id="start_time"
                        type="datetime-local"
                        value={data.start_time || ""}
                        onChange={(e) => onChange("start_time", e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">Students cannot start before this time.</p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="end_time">End Time</Label>
                    <Input
                        id="end_time"
                        type="datetime-local"
                        value={data.end_time || ""}
                        onChange={(e) => onChange("end_time", e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">Exam closes automatically at this time.</p>
                </div>
            </div>
        </div>
    );
};

export default ScheduleForm;
