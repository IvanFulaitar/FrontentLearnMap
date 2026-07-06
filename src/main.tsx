import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import { ProgressProvider } from "./context/ProgressContext";
import { PlatformProvider } from "./context/PlatformContext";
import { ToastProvider } from "./context/ToastContext";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./features/auth/AuthProvider";
import { ErrorBoundary } from "./shared/errors/ErrorBoundary";
import "./styles/variables.css";
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <ThemeProvider>
          <ToastProvider>
            <PlatformProvider>
              <ProgressProvider>
                <RouterProvider router={router} />
              </ProgressProvider>
            </PlatformProvider>
          </ToastProvider>
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
