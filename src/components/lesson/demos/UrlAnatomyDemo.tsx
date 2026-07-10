import { useState } from "react";
import { DemoToolbar, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Part = "protocol" | "domain" | "path" | "query" | "fragment";

const PARTS: { value: Part; label: string; text: string }[] = [
  { value: "protocol", label: "Протокол", text: "https://" },
  { value: "domain", label: "Домен", text: "shop.com" },
  { value: "path", label: "Шлях", text: "/products/15" },
  { value: "query", label: "Параметри", text: "?color=red" },
  { value: "fragment", label: "Фрагмент", text: "#reviews" },
];

const PART_EXPLANATION: Record<Part, string> = {
  protocol: "https:// каже браузеру використовувати зашифроване з'єднання. http:// (без s) для реальних сайтів у 2026 практично не використовується.",
  domain: "shop.com — адреса сервера, яку DNS перетворює на IP-адресу. Саме домен реєструють і щороку продовжують.",
  path: "/products/15 — шлях до конкретного ресурсу на сервері, так само як шлях до файлу на диску. Тут це товар з id 15.",
  query: "?color=red — додаткові параметри після шляху. Перший починається з ?, кожен наступний додається через & (?color=red&size=XL).",
  fragment: "#reviews взагалі не надсилається на сервер! Браузер сам, локально, прокручує сторінку до елемента з id=\"reviews\" вже після завантаження.",
};

const PART_CODE: Record<Part, string> = {
  protocol: `http://shop.com    → не зашифровано (застаріло)
https://shop.com   → зашифровано (стандарт)`,
  domain: `shop.com
   ↓ DNS
142.250.74.14`,
  path: `/products/15
/products/16   ← інший товар, той самий шаблон шляху`,
  query: `?color=red
?color=red&size=XL   ← другий параметр додано через &`,
  fragment: `<h2 id="reviews">Відгуки</h2>
<!-- #reviews прокрутить саме сюди — сервер про це навіть не дізнається -->`,
};

/**
 * Live demo for "Посилання, URL і навігація": click any segment of a real
 * URL (inline or via the toolbar) and see exactly what that segment does,
 * with the rest of the URL staying visible for context — instead of
 * reading one static breakdown top to bottom.
 */
export function UrlAnatomyDemo() {
  const [part, setPart] = useState<Part>("protocol");

  return (
    <div className={styles.demoStack}>
      <DemoToolbar
        options={PARTS.map(({ value, label }) => ({ value, label }))}
        value={part}
        onChange={(value) => setPart(value as Part)}
      />

      <p className={styles.urlLine}>
        {PARTS.map((p) => (
          <span
            key={p.value}
            className={`${styles.urlSegment} ${p.value === part ? styles.urlSegmentActive : ""}`}
            onClick={() => setPart(p.value)}
          >
            {p.text}
          </span>
        ))}
      </p>

      <DemoExplanation>{PART_EXPLANATION[part]}</DemoExplanation>

      <DemoCodeSnippet code={PART_CODE[part]} />

      <DemoKeyTakeaway>
        Кожна частина URL має власну роль: протокол — про безпеку з'єднання, домен — про сервер, шлях — про ресурс на
        ньому, параметри запиту — про додаткові умови, а фрагмент взагалі лишається на стороні браузера й ніколи не
        йде на сервер.
      </DemoKeyTakeaway>
    </div>
  );
}
