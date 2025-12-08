import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  FileText,
  TrendingUp,
  AlertTriangle,
  Plus,
  ArrowUpRight,
  Calendar,
  Clock,
} from "lucide-react";

const stats = [
  { label: "Total Users", value: "2,847", change: "+12%", icon: Users, trend: "up" },
  { label: "Active Exams", value: "48", change: "+3", icon: FileText, trend: "up" },
  { label: "Completion Rate", value: "94.2%", change: "+2.1%", icon: TrendingUp, trend: "up" },
  { label: "Violations", value: "23", change: "-8%", icon: AlertTriangle, trend: "down" },
];

const recentExams = [
  { name: "Advanced Mathematics", students: 145, status: "active", date: "Dec 8, 2025" },
  { name: "Physics Final", students: 89, status: "scheduled", date: "Dec 10, 2025" },
  { name: "Computer Science 101", students: 234, status: "completed", date: "Dec 5, 2025" },
  { name: "English Literature", students: 56, status: "draft", date: "Dec 12, 2025" },
];

const statusColors = {
  active: "success",
  scheduled: "warning",
  completed: "secondary",
  draft: "outline",
} as const;

const AdminDashboard = () => {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's your overview.</p>
          </div>
          <Button variant="accent">
            <Plus className="w-4 h-4 mr-2" />
            Create Exam
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-display font-bold mt-1">{stat.value}</p>
                    <p className={`text-sm mt-1 ${stat.trend === "up" ? "text-success" : "text-destructive"}`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-accent" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Exams */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Exams</CardTitle>
              <Button variant="ghost" size="sm">
                View All
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentExams.map((exam, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium">{exam.name}</p>
                        <p className="text-sm text-muted-foreground">{exam.students} students</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right hidden sm:block">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {exam.date}
                        </div>
                      </div>
                      <Badge variant={statusColors[exam.status as keyof typeof statusColors]}>
                        {exam.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="w-4 h-4 mr-2" />
                Create New Exam
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                Add New User
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                View Reports
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Clock className="w-4 h-4 mr-2" />
                Schedule Exam
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
