import { useState } from "react";
import { useEnrollStudents } from "@/hooks/teacher/useEnrollStudents"; // We might not need this hook HERE if we pass selected students up
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

interface EnrollStudentsProps {
    selectedStudents: string[];
    onChange: (studentIds: string[]) => void;
}

const EnrollStudents = ({ selectedStudents, onChange }: EnrollStudentsProps) => {
    const [searchTerm, setSearchTerm] = useState("");

    // Fetch all students (in a real app, you'd filter by class or school)
    const { data: students, isLoading } = useQuery({
        queryKey: ["students"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .eq("role", "student");

            if (error) throw error;
            return data;
        },
    });

    const filteredStudents = students?.filter(student =>
        student.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    const toggleStudent = (id: string) => {
        if (selectedStudents.includes(id)) {
            onChange(selectedStudents.filter(s => s !== id));
        } else {
            onChange([...selectedStudents, id]);
        }
    };

    const toggleAll = () => {
        if (selectedStudents.length === filteredStudents.length) {
            onChange([]);
        } else {
            onChange(filteredStudents.map(s => s.id));
        }
    };

    return (
        <div className="space-y-4">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    placeholder="Search students by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                />
            </div>

            <div className="border rounded-lg overflow-hidden">
                <div className="bg-muted/50 p-3 flex items-center gap-3 border-b">
                    <Checkbox
                        checked={filteredStudents.length > 0 && selectedStudents.length === filteredStudents.length}
                        onCheckedChange={toggleAll}
                    />
                    <span className="text-sm font-medium">Select All ({filteredStudents.length})</span>
                    <span className="ml-auto text-sm text-muted-foreground">
                        {selectedStudents.length} selected
                    </span>
                </div>

                <div className="max-h-[400px] overflow-y-auto divide-y">
                    {isLoading ? (
                        <div className="p-4 text-center text-muted-foreground">Loading students...</div>
                    ) : filteredStudents.length === 0 ? (
                        <div className="p-4 text-center text-muted-foreground">No students found.</div>
                    ) : (
                        filteredStudents.map((student) => (
                            <div
                                key={student.id}
                                className={`p-3 flex items-center gap-3 hover:bg-accent/50 transition-colors cursor-pointer ${selectedStudents.includes(student.id) ? "bg-accent/20" : ""}`}
                                onClick={() => toggleStudent(student.id)}
                            >
                                <Checkbox
                                    checked={selectedStudents.includes(student.id)}
                                    onCheckedChange={() => toggleStudent(student.id)}
                                />
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${student.full_name}`} />
                                    <AvatarFallback>{student.full_name?.[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-sm truncate">{student.full_name}</p>
                                    <p className="text-xs text-muted-foreground truncate">{student.email}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default EnrollStudents;
