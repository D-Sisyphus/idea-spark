import { createContext, useContext, useState, ReactNode } from "react";

type Role = "student" | "teacher" | "admin";

interface User {
  id: string;
  email: string;
  role: Role;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // 🔴 FAKE LOGIN (replace with backend later)
    await new Promise((res) => setTimeout(res, 1000));

    let role: Role = "student";

    if (email.includes("teacher")) role = "teacher";
    if (email.includes("admin")) role = "admin";

    const loggedInUser: User = {
      id: crypto.randomUUID(),
      email,
      role,
    };

    setUser(loggedInUser);
    return loggedInUser;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
