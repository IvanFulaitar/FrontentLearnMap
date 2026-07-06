import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import styles from "./ToastContext.module.css";

type ToastTone = "success" | "warning" | "info";

interface Toast {
  id: number;
  title: string;
  message?: string;
  tone: ToastTone;
}

interface ToastContextValue {
  notify: (toast: Omit<Toast, "id">) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const notify = useCallback((toast: Omit<Toast, "id">) => {
    const id = Date.now();
    setToasts((current) => [...current, { ...toast, id }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((item) => item.id !== id));
    }, 3200);
  }, []);

  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className={styles.viewport} role="status" aria-live="polite">
        {toasts.map((toast) => (
          <div className={`${styles.toast} ${styles[toast.tone] ?? ""}`} key={toast.id}>
            <div className={styles.title}>{toast.title}</div>
            {toast.message ? <div className={styles.message}>{toast.message}</div> : null}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
