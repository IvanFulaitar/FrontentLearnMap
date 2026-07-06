import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type UserRole = "guest" | "student" | "admin";

export interface AuthUser {
  id: string;
  username: string;
  role: UserRole;
}

interface AuthContextValue {
  user: AuthUser;
  isAuthenticated: boolean;
  can: (permission: Permission) => boolean;
  signInAsStudent: () => void;
  signOut: () => void;
}

export type Permission = "course:read" | "lesson:complete" | "admin:read";

const rolePermissions: Record<UserRole, Permission[]> = {
  guest: ["course:read"],
  student: ["course:read", "lesson:complete"],
  admin: ["course:read", "lesson:complete", "admin:read"],
};

const guestUser: AuthUser = { id: "guest", username: "Гість", role: "guest" };

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser>(guestUser);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    isAuthenticated: user.role !== "guest",
    can: (permission) => rolePermissions[user.role].includes(permission),
    signInAsStudent: () => setUser({ id: "local-student", username: "Студент Free Frontend", role: "student" }),
    signOut: () => setUser(guestUser),
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
