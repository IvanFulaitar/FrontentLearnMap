import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./Breadcrumbs.module.css";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className={styles.breadcrumbs} aria-label="Навігаційний ланцюжок">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span className={isLast ? styles.current : ""} key={`${item.label}-${index}`}>
            {item.href && !isLast ? <Link className={styles.link} to={item.href}>{item.label}</Link> : item.label}
            {!isLast ? <ChevronRight size={14} aria-hidden="true" /> : null}
          </span>
        );
      })}
    </nav>
  );
}
