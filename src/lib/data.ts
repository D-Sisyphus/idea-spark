import { 
  Shield, 
  Eye, 
  Clock, 
  BarChart3, 
  Users, 
  FileCheck, 
  Brain,
  Lock,
  Smartphone,
  Globe
} from "lucide-react";

export interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    icon: Shield,
    title: "AI-Powered Proctoring",
    description: "Advanced facial recognition and behavior analysis ensures exam integrity with real-time monitoring.",
  },
  {
    icon: Eye,
    title: "Real-Time Monitoring",
    description: "Live webcam feeds with instant violation alerts and comprehensive session recording.",
  },
  {
    icon: Lock,
    title: "Browser Lockdown",
    description: "Secure exam environment with tab switch detection, copy-paste prevention, and fullscreen enforcement.",
  },
  {
    icon: FileCheck,
    title: "Automated Grading",
    description: "Instant scoring for objective questions with detailed analytics and performance insights.",
  },
  {
    icon: Brain,
    title: "Smart Question Bank",
    description: "Create and manage diverse question types including MCQ, essays, and file uploads with tagging.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Comprehensive dashboards with performance trends, violation reports, and learning insights.",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description: "Set exam windows, time limits, and late submission policies with timezone support.",
  },
  {
    icon: Users,
    title: "Multi-Role Support",
    description: "Dedicated interfaces for administrators, teachers, and students with role-based access.",
  },
  {
    icon: Smartphone,
    title: "Mobile Responsive",
    description: "Take exams on any device with optimized layouts and touch-friendly controls.",
  },
  {
    icon: Globe,
    title: "Scalable Infrastructure",
    description: "Support for 1000+ concurrent users with cloud-native architecture and high availability.",
  },
];

export interface Stat {
  value: string;
  label: string;
}

export const stats: Stat[] = [
  { value: "1000+", label: "Concurrent Users" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "< 2s", label: "Video Latency" },
  { value: "24/7", label: "Monitoring" },
];

export interface UserRole {
  id: string;
  title: string;
  description: string;
  features: string[];
}

export const userRoles: UserRole[] = [
  {
    id: "admin",
    title: "Administrator",
    description: "Complete system control and oversight",
    features: [
      "User management and role assignment",
      "System configuration and settings",
      "Audit logs and compliance reports",
      "Institution-wide analytics",
    ],
  },
  {
    id: "teacher",
    title: "Teacher",
    description: "Exam creation and student assessment",
    features: [
      "Question bank management",
      "Exam scheduling and configuration",
      "Manual grading with rubrics",
      "Proctoring violation review",
    ],
  },
  {
    id: "student",
    title: "Student",
    description: "Secure exam taking experience",
    features: [
      "Exam registration and scheduling",
      "Secure exam environment",
      "Instant results and feedback",
      "Performance tracking",
    ],
  },
];
