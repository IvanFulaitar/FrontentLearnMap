import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { courses } from "../../data/courses";
import { searchLearningContent } from "../../utils/progress";
import { searchResultTypeLabels } from "../../constants/labels";
import styles from "./CommandPalette.module.css";

const staticCommands = [
  { title: "Відкрити дашборд", href: "/" },
  { title: "Відкрити задачі", href: "/tasks" },
  { title: "Відкрити проєкти", href: "/projects" },
  { title: "Відкрити налаштування", href: "/settings" },
  { title: "Відкрити профіль", href: "/profile" },
  { title: "Змінити тему", href: "/settings" },
];

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const commands = useMemo(() => {
    const courseCommands = courses.map((course) => ({ title: `Відкрити курс «${course.title}»`, href: `/courses/${course.id}` }));
    const searchResults = searchLearningContent(query).map((item) => ({
      title: `${searchResultTypeLabels[item.type] ?? item.type}: ${item.title}`,
      href: item.href,
    }));
    const all = [...staticCommands, ...courseCommands, ...searchResults];
    return query ? all.filter((item) => item.title.toLowerCase().includes(query.toLowerCase())).slice(0, 16) : all.slice(0, 16);
  }, [query]);

  if (!open) return null;

  return (
    <div className={styles.backdrop} role="presentation" onClick={onClose}>
      <section className={styles.panel} role="dialog" aria-modal="true" aria-label="Палітра команд" onClick={(event) => event.stopPropagation()}>
        <input className={styles.input} autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Введи команду або запит для пошуку..." />
        <div className={styles.list}>
          {commands.map((command) => (
            <button
              className={styles.item}
              key={`${command.title}-${command.href}`}
              onClick={() => {
                navigate(command.href);
                onClose();
              }}
            >
              {command.title}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
