import { useState } from "react";
import { DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

interface Product {
  id: number;
  name: string;
  category: string;
}

const products: Product[] = [
  { id: 1, name: "Книга", category: "канцтовари" },
  { id: 2, name: "Ручка", category: "канцтовари" },
  { id: 3, name: "Ноутбук", category: "електроніка" },
  { id: 4, name: "Навушники", category: "електроніка" },
  { id: 5, name: "Зошит", category: "канцтовари" },
];

/**
 * Live demo for "Filter і пошук": a real controlled input drives a real
 * .filter() call on every keystroke — the list below is the ACTUAL
 * filtered array, and .find() alongside it genuinely returns a single
 * matched object (or undefined), not a scenario-based lookup.
 */
export function FilterSearchDemo() {
  const [query, setQuery] = useState("");

  const filtered = products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));
  const foundById = products.find((p) => p.id === 3);

  return (
    <div className={styles.demoStack}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <span>Пошуковий запит (products.filter)</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="напр. ноут"
          />
        </div>
      </div>

      <DemoPreview label="Реальний результат products.filter(...) для введеного запиту">
        <div className={styles.semanticBlock}>
          <p>Знайдено: {filtered.length} з {products.length}</p>
          <ul>
            {filtered.map((p) => (
              <li key={p.id}>{p.name} ({p.category})</li>
            ))}
          </ul>
          {filtered.length === 0 && <p><small>Масив filtered порожній — жоден елемент не пройшов перевірку.</small></p>}
        </div>
      </DemoPreview>

      <DemoExplanation>
        products.filter(callback) повертає НОВИЙ масив з усіма елементами, для яких callback повернув truthy —
        на відміну від products.find(callback), який повертає ПЕРШИЙ такий елемент напряму (не масив) або undefined,
        якщо жоден не знайдений.
      </DemoExplanation>

      <DemoCodeSnippet
        code={`const filtered = products.filter(\n  (p) => p.name.toLowerCase().includes("${query}")\n);\n// ${filtered.length} елемент(и): [${filtered.map((p) => `"${p.name}"`).join(", ")}]\n\nconst foundById = products.find((p) => p.id === 3);\n// ${foundById ? `{ id: 3, name: "${foundById.name}" }` : "undefined"}`}
      />

      <DemoKeyTakeaway>
        filter завжди повертає масив (навіть порожній), find завжди повертає один елемент або undefined —
        find[0]-подібний код (filter(...)[0]) працює, але find зупиняється на першому збігу й читається чіткіше.
      </DemoKeyTakeaway>
    </div>
  );
}
