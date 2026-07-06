import type { ReactNode } from "react";

export function Spinner() {
  return <span aria-label="Завантаження" style={{ display: "inline-block", width: 18, height: 18, border: "3px solid var(--border)", borderTopColor: "var(--primary)", borderRadius: "50%" }} />;
}

export function Avatar({ label }: { label: string }) {
  return <span style={{ display: "inline-grid", width: 40, height: 40, placeItems: "center", borderRadius: "50%", background: "var(--primary)", color: "white", fontWeight: 900 }}>{label.slice(0, 2).toUpperCase()}</span>;
}

export function Chip({ children }: { children: ReactNode }) {
  return <span style={{ border: "1px solid var(--border)", borderRadius: 999, padding: "6px 10px", color: "var(--muted)", fontWeight: 800 }}>{children}</span>;
}

export function Dropdown({ label, children }: { label: string; children: ReactNode }) {
  return <details><summary>{label}</summary>{children}</details>;
}

export function Pagination({ page, total, onPageChange }: { page: number; total: number; onPageChange: (page: number) => void }) {
  return (
    <nav aria-label="Пагінація" style={{ display: "flex", gap: 8 }}>
      <button disabled={page <= 1} onClick={() => onPageChange(page - 1)}>Назад</button>
      <span>{page} / {total}</span>
      <button disabled={page >= total} onClick={() => onPageChange(page + 1)}>Далі</button>
    </nav>
  );
}
