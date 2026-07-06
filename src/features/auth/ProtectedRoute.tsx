import { Navigate } from "react-router-dom";
import type { ReactElement } from "react";
import { useAuth, type Permission } from "./AuthProvider";

export function ProtectedRoute({ children, permission }: { children: ReactElement; permission: Permission }) {
  const auth = useAuth();
  if (!auth.can(permission)) return <Navigate to="/403" replace />;
  return children;
}
