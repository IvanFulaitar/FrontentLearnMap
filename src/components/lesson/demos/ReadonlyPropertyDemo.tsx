import { useState } from "react";
import { DemoPreview, DemoToolbar, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

// interface User { readonly id: number; name: string; }
type FieldName = "id" | "name";

const FIELDS: { value: FieldName; label: string; readonly: boolean }[] = [
  { value: "id", label: "user.id (readonly)", readonly: true },
  { value: "name", label: "user.name (звичайне)", readonly: false },
];

/**
 * Live demo for "Властивості readonly": models `readonly id: number` vs a
 * normal `name: string` field, then shows a real reassignment attempt for
 * whichever field is selected. The verdict is computed live from the
 * field's real `readonly` flag — mirroring the compile-time-only nature
 * of `readonly` (it does NOT freeze the object at runtime).
 */
export function ReadonlyPropertyDemo() {
  const [fieldName, setFieldName] = useState<FieldName>("id");
  const field = FIELDS.find((item) => item.value === fieldName) ?? FIELDS[0];
  const isAllowed = !field.readonly;

  return (
    <div className={styles.tsStage}>
      <DemoPreview label="interface User { readonly id: number; name: string; }">
        <DemoToolbar
          options={FIELDS.map((item) => ({ value: item.value, label: item.label }))}
          value={fieldName}
          onChange={(value) => setFieldName(value as FieldName)}
        />

        <div className={styles.tsRow}>
          <span className={styles.tsCode}>
            user.{fieldName} = {fieldName === "id" ? "99" : '"Нове імʼя"'};
          </span>
          <span className={isAllowed ? styles.tsBadgeOk : styles.tsBadgeErr}>{isAllowed ? "дозволено" : "помилка"}</span>
        </div>

        <div className={`${styles.tsCompilerBox} ${isAllowed ? styles.tsCompilerBoxOk : styles.tsCompilerBoxErr}`}>
          {isAllowed
            ? "Немає помилок — name не позначене readonly, перезапис дозволений."
            : `Cannot assign to 'id' because it is a read-only property.\n→ readonly дозволяє прочитати user.id, але забороняє компілятору пропустити будь-який новий запис у це поле після створення обʼєкта.`}
        </div>
      </DemoPreview>

      <DemoExplanation>
        readonly перед назвою властивості (readonly id: number) — це обіцянка тільки для компілятора: після того як
        обʼєкт створений, компілятор більше не дозволить жодного коду в проєкті записати нове значення в це поле.
        Важливо: readonly діє лише на етапі компіляції — це не те саме, що Object.freeze() у JavaScript, яке реально
        забороняє зміну обʼєкта під час виконання. Якщо обійти перевірку типів (наприклад, через приведення as any),
        readonly-поле технічно можна змінити в рантаймі — TypeScript просто більше не попереджає про це в звичайному,
        типізованому коді.
      </DemoExplanation>

      <DemoKeyTakeaway>
        readonly — це перевірка компілятора, а не справжнє заморожування обʼєкта під час виконання. Використовуй її
        для полів, які логічно не повинні змінюватись після створення (наприклад, id).
      </DemoKeyTakeaway>
    </div>
  );
}
