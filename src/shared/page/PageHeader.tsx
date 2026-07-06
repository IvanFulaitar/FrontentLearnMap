import type { ReactNode } from "react";
import { Breadcrumbs, type BreadcrumbItem } from "../../components/layout/Breadcrumbs";
import styles from "./PageHeader.module.css";

interface PageHeaderProps {
  breadcrumbs?: BreadcrumbItem[];
  eyebrow: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}

/** Standard route header with consistent spacing, breadcrumbs and optional actions. */
export function PageHeader({ breadcrumbs, eyebrow, title, description, actions }: PageHeaderProps) {
  return (
    <div className={styles.header}>
      <div className={styles.content}>
        {breadcrumbs ? <Breadcrumbs items={breadcrumbs} /> : null}
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {description ? <p>{description}</p> : null}
      </div>
      {actions ? <div className={styles.actions}>{actions}</div> : null}
    </div>
  );
}
