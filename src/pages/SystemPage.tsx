import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

const messages = {
  "403": ["403", "Немає доступу", "Цей маршрут потребує інших прав."],
  "404": ["404", "Сторінку не знайдено", "Перевір адресу або повернись на Dashboard."],
  "500": ["500", "Помилка сервера", "Бекенд поки що імітований (mock), але інтерфейс готовий обробити стан 500."],
  offline: ["Немає мережі", "Немає інтернету", "Перевір з'єднання й повтори спробу."],
} as const;

export function SystemPage({ type }: { type: keyof typeof messages }) {
  const [code, title, message] = messages[type];
  return (
    <div className="page">
      <Card style={{ padding: 28 }}>
        <span className="eyebrow">{code}</span>
        <h1>{title}</h1>
        <p>{message}</p>
        <Link to="/">
          <Button>На дашборд</Button>
        </Link>
      </Card>
    </div>
  );
}
