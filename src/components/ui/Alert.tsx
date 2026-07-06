import { CheckCircle2, Info, TriangleAlert } from "lucide-react";
import styles from "./Alert.module.css";

interface AlertProps {
  title: string;
  message: string;
  tone?: "info" | "success" | "warning";
}

const icons = {
  info: <Info size={20} />,
  success: <CheckCircle2 size={20} />,
  warning: <TriangleAlert size={20} />,
};

export function Alert({ title, message, tone = "info" }: AlertProps) {
  return (
    <div className={`${styles.alert} ${styles[tone]}`} role="note">
      {icons[tone]}
      <div>
        <div className={styles.title}>{title}</div>
        <div className={styles.message}>{message}</div>
      </div>
    </div>
  );
}
