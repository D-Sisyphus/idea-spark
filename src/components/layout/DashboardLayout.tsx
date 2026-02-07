import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  GraduationCap,
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  BarChart3,
  Bell,
  Search,
  LogOut,
  ChevronDown,
  Menu,
  User,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  badge?: string;
}

interface DashboardLayoutProps {
  role: "admin" | "teacher" | "student";
  children?: React.ReactNode;
}

const adminNavItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Users, label: "Users", href: "/admin/users" },
  { icon: FileText, label: "Exams", href: "/admin/exams" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

const teacherNavItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/teacher" },
  { icon: FileText, label: "My Exams", href: "/teacher/exams", badge: "3" },
  { icon: Users, label: "Students", href: "/teacher/students" },
  { icon: BarChart3, label: "Reports", href: "/teacher/reports" },
  { icon: Settings, label: "Settings", href: "/teacher/settings" },
];

const studentNavItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/student" },
  { icon: FileText, label: "My Exams", href: "/student/exams", badge: "2" },
  { icon: BarChart3, label: "Results", href: "/student/results" },
  { icon: Settings, label: "Settings", href: "/student/settings" },
];

const navItemsMap = {
  admin: adminNavItems,
  teacher: teacherNavItems,
  student: studentNavItems,
};

const DashboardLayout = ({ role, children }: DashboardLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navItems = navItemsMap[role];

  // Get user initials and name
  const userInitials = user?.full_name?.split(' ').map(n => n[0]).join('').toUpperCase() || user?.email?.[0].toUpperCase() || 'U';
  const displayName = user?.full_name || user?.email || 'User';

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen bg-card border-r border-border transition-all duration-300",
          sidebarOpen ? "w-64" : "w-20"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-md">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            {sidebarOpen && (
              <span className="font-display font-bold text-lg">Xamify</span>
            )}
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                  isActive
                    ? "bg-accent text-accent-foreground shadow-md"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && (
                  <>
                    <span className="font-medium flex-1">{item.label}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="h-5 min-w-5 flex items-center justify-center">
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <div className={cn(
            "flex items-center gap-3",
            sidebarOpen ? "" : "justify-center"
          )}>
            <div className="w-10 h-10 rounded-full bg-gradient-accent flex items-center justify-center text-accent-foreground font-semibold">
              {userInitials}
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{displayName}</p>
                <p className="text-xs text-muted-foreground capitalize">{role}</p>
              </div>
            )}
            {sidebarOpen && (
              <Button variant="ghost" size="icon" className="flex-shrink-0" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={cn(
        "flex-1 transition-all duration-300",
        sidebarOpen ? "ml-64" : "ml-20"
      )}>
        {/* Top Header */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full h-10 pl-10 pr-4 rounded-xl bg-secondary border-0 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-accent flex items-center justify-center text-accent-foreground font-semibold text-sm">
                    {userInitials}
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{displayName}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to={`/${role}/settings`} className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to={`/${role}/settings`} className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
