import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Play,
  Calendar,
  Trophy,
  TrendingUp,
} from "lucide-react";

const upcomingExams = [
  { 
    name: "Data Structures Final", 
    subject: "Computer Science",
    date: "Dec 10, 2025", 
    time: "10:00 AM",
    duration: "2 hours",
    status: "upcoming"
  },
  { 
    name: "Calculus II Midterm", 
    subject: "Mathematics",
    date: "Dec 12, 2025", 
    time: "2:00 PM",
    duration: "90 mins",
    status: "upcoming"
  },
];

const recentResults = [
  { name: "Physics Mechanics", score: 92, grade: "A", date: "Dec 5, 2025" },
  { name: "English Literature", score: 85, grade: "B+", date: "Dec 3, 2025" },
  { name: "Chemistry Basics", score: 78, grade: "B", date: "Nov 28, 2025" },
];

const StudentDashboard = () => {
  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold">Welcome, John!</h1>
            <p className="text-muted-foreground">You have 2 upcoming exams this week.</p>
          </div>
          <Badge variant="accent" className="w-fit">
            <Trophy className="w-4 h-4 mr-1" />
            Top 10% Performer
          </Badge>
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
                <p className="text-2xl font-bold">24</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">22</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Upcoming</p>
                <p className="text-2xl font-bold">2</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg. Score</p>
                <p className="text-2xl font-bold">85%</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Exams */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent" />
                Upcoming Exams
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingExams.map((exam, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-xl bg-secondary/50 border border-border/50 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{exam.name}</h3>
                      <p className="text-sm text-muted-foreground">{exam.subject}</p>
                    </div>
                    <Badge variant="warning">Upcoming</Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {exam.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {exam.time}
                    </span>
                    <span>{exam.duration}</span>
                  </div>
                  <Button variant="accent" className="w-full">
                    <Play className="w-4 h-4 mr-2" />
                    Start Exam
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-success" />
                Recent Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentResults.map((result, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-xl bg-secondary/50 border border-border/50"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{result.name}</h3>
                      <p className="text-sm text-muted-foreground">{result.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-accent">{result.grade}</p>
                      <p className="text-sm text-muted-foreground">{result.score}%</p>
                    </div>
                  </div>
                  <Progress value={result.score} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
