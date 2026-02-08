import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Users,
  Clock,
  AlertTriangle,
  Plus,
  Play,
  Edit,
  MoreVertical,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const myExams = [
  {
    name: "Data Structures Final",
    students: 145,
    status: "active",
    pendingGrading: 23,
    violations: 3,
    date: "Dec 8, 2025"
  },
  {
    name: "Algorithm Design Quiz",
    students: 89,
    status: "scheduled",
    pendingGrading: 0,
    violations: 0,
    date: "Dec 10, 2025"
  },
  {
    name: "Programming Basics",
    students: 234,
    status: "completed",
    pendingGrading: 45,
    violations: 8,
    date: "Dec 5, 2025"
  },
];

const statusColors = {
  active: "success",
  scheduled: "warning",
  completed: "secondary",
  draft: "outline",
} as const;

const TeacherDashboard = () => {
  return (
    <DashboardLayout role="teacher">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold">My Exams</h1>
            <p className="text-muted-foreground">Manage your exams and grade submissions.</p>
          </div>
          <Button variant="default" asChild>
            <Link to="/teacher/exams/create">
              <Plus className="w-4 h-4 mr-2" />
              Create New Exam
            </Link>
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Exams</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">468</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Grading</p>
                <p className="text-2xl font-bold">68</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Violations</p>
                <p className="text-2xl font-bold">11</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Exams List */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>All Exams</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Filter</Button>
              <Button variant="outline" size="sm">Sort</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myExams.map((exam, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl bg-secondary/50 border border-border/50 gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{exam.name}</h3>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {exam.students} students
                        </span>
                        <span>{exam.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    {exam.pendingGrading > 0 && (
                      <Badge variant="warning">
                        <Clock className="w-3 h-3 mr-1" />
                        {exam.pendingGrading} pending
                      </Badge>
                    )}
                    {exam.violations > 0 && (
                      <Badge variant="destructive">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        {exam.violations} violations
                      </Badge>
                    )}
                    <Badge variant={statusColors[exam.status as keyof typeof statusColors]}>
                      {exam.status}
                    </Badge>

                    <div className="flex items-center gap-2">
                      {exam.status === "active" && (
                        <Button variant="outline" size="sm">
                          <Play className="w-4 h-4 mr-1" />
                          Monitor
                        </Button>
                      )}
                      {exam.pendingGrading > 0 && (
                        <Button variant="accent" size="sm">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Grade
                        </Button>
                      )}
                      <Button variant="ghost" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboard;
