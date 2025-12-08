import { userRoles } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, UserCog, GraduationCap, BookOpen } from "lucide-react";

const roleIcons = {
  admin: UserCog,
  teacher: BookOpen,
  student: GraduationCap,
};

const RolesSection = () => {
  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">User Roles</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mt-3 mb-4">
            Designed for Everyone
          </h2>
          <p className="text-lg text-muted-foreground">
            Tailored interfaces and features for each user type in your institution.
          </p>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {userRoles.map((role, index) => {
            const Icon = roleIcons[role.id as keyof typeof roleIcons];
            return (
              <Card 
                key={role.id} 
                className="relative overflow-hidden group hover:shadow-xl transition-all duration-300"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Gradient Accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-accent" />
                
                <CardHeader className="pb-4">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent group-hover:shadow-glow transition-all duration-300">
                    <Icon className="w-7 h-7 text-accent group-hover:text-accent-foreground transition-colors" />
                  </div>
                  <CardTitle className="text-2xl">{role.title}</CardTitle>
                  <p className="text-muted-foreground">{role.description}</p>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3">
                    {role.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-success" />
                        </div>
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RolesSection;
