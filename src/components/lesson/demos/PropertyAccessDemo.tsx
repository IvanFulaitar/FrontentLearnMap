import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type UserKind = "withAddress" | "withoutAddress";
type AccessMode = "unsafe" | "optionalChain";

interface UserData {
  name: string;
  address?: { city: string };
}

const userWithAddress: UserData = { name: "Іван", address: { city: "Київ" } };
const userWithoutAddress: UserData = { name: "Оксана" };

function readCity(user: UserData, mode: AccessMode): { result?: string; error?: string } {
  try {
    if (mode === "unsafe") {
      // Genuine unsafe access — throws for real when address is missing. Cast to a
      // narrower type (not `any`) that still bypasses the optional-property check.
      const city = (user as UserData & { address: { city: string } }).address.city;
      return { result: city };
    }
    return { result: user.address?.city ?? "Невідомо" };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

/**
 * Live demo for "Читання та запис властивостей": a real property access
 * against two actual user objects (with/without address), toggling between
 * an unsafe direct chain (throws a genuine TypeError) and optional chaining
 * (?. — returns a real fallback instead).
 */
export function PropertyAccessDemo() {
  const [userKind, setUserKind] = useState<UserKind>("withAddress");
  const [mode, setMode] = useState<AccessMode>("optionalChain");
  const user = userKind === "withAddress" ? userWithAddress : userWithoutAddress;
  const { result, error } = readCity(user, mode);

  return (
    <div className={styles.demoStack}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <span>Користувач</span>
          <DemoToolbar
            options={[
              { value: "withAddress", label: "з address" },
              { value: "withoutAddress", label: "без address" },
            ]}
            value={userKind}
            onChange={(v) => setUserKind(v as UserKind)}
          />
        </div>
        <div className={styles.control}>
          <span>Спосіб доступу</span>
          <DemoToolbar
            options={[
              { value: "unsafe", label: "user.address.city" },
              { value: "optionalChain", label: "user.address?.city" },
            ]}
            value={mode}
            onChange={(v) => setMode(v as AccessMode)}
          />
        </div>
      </div>

      <DemoPreview label="Реальний результат читання вкладеної властивості city">
        <div className={styles.semanticBlock}>
          <p>user: {JSON.stringify(user)}</p>
          <p>
            Результат: {error ? (
              <strong style={{ color: "#c0392b" }}>Помилка: {error}</strong>
            ) : (
              <strong style={{ color: "#2e7d32" }}>{result}</strong>
            )}
          </p>
        </div>
      </DemoPreview>

      <DemoExplanation>
        {error
          ? "user.address дорівнює undefined, а спроба прочитати .city напряму з undefined кидає справжній TypeError — саме так це виглядає в production без ?."
          : mode === "unsafe"
          ? "У цього користувача address існує, тому пряма крапкова нотація спрацьовує без помилки — але це працює лише тому, що дані \"хороші\"."
          : "?. перевіряє address ПЕРЕД читанням .city — якщо address відсутній, вираз безпечно повертає undefined, а ?? підставляє \"Невідомо\"."}
      </DemoExplanation>

      <DemoCodeSnippet
        code={
          mode === "unsafe"
            ? `const city = user.address.city;\n// ${error ? `TypeError: ${error}` : `"${result}"`}`
            : `const city = user.address?.city ?? "Невідомо";\n// "${result}"`
        }
      />

      <DemoKeyTakeaway>
        ?. коротко замикає ланцюжок і повертає undefined, щойно ланка перед ним null/undefined — без нього той
        самий доступ кидає справжній TypeError на реальних неповних даних.
      </DemoKeyTakeaway>
    </div>
  );
}
