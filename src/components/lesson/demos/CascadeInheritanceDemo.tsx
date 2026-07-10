import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Property = "color" | "border";

export function CascadeInheritanceDemo() {
  const [property, setProperty] = useState<Property>("color");
  const [linkInherits, setLinkInherits] = useState(true);

  return (
    <div className={styles.demoStack}>
      <DemoToolbar
        options={[
          { value: "color", label: "color (успадковується)" },
          { value: "border", label: "border (НЕ успадковується)" },
        ]}
        value={property}
        onChange={(value) => setProperty(value as Property)}
      />

      <DemoPreview label="Батьківський блок і вкладена картка — дивись, чи дитина підхопила стиль батька">
        <div
          className={styles.ciParent}
          style={property === "color" ? { color: "#b45309" } : { border: "3px solid #b45309" }}
        >
          батьківський блок ({property === "color" ? "color: #b45309" : "border: 3px solid #b45309"})
          <div className={styles.ciChild}>
            дочірня картка — {property === "color" ? "успадкувала колір тексту" : "своєї рамки немає, і батьківська теж не передалась"}
          </div>
        </div>
      </DemoPreview>

      <DemoExplanation>
        {property === "color"
          ? "color — успадковувана властивість: дочірня картка автоматично отримує той самий колір тексту від батька, без жодного окремого правила."
          : "border — НЕ успадковується ніколи: батьківська рамка залишається тільки на батьківському блоці, дочірня картка виглядає так, ніби батьківського border взагалі не існує."}
      </DemoExplanation>

      <hr className={styles.ciDivider} />

      <DemoToolbar
        options={[
          { value: "on", label: "a { color: inherit } — увімкнено" },
          { value: "off", label: "a { color: inherit } — вимкнено" },
        ]}
        value={linkInherits ? "on" : "off"}
        onChange={(value) => setLinkInherits(value === "on")}
      />

      <DemoPreview label="Класичний приклад із footer: посилання всередині сірого тексту">
        <p className={styles.ciFooterText}>
          © 2026 Кав'ярня «Аромат». <a href="#" className={linkInherits ? styles.ciFooterLinkInherit : styles.ciFooterLinkDefault} onClick={(e) => e.preventDefault()}>Політика конфіденційності</a>
        </p>
      </DemoPreview>

      <DemoCodeSnippet
        code={
          property === "color"
            ? `.parent {\n  color: #b45309; /* успадковується дітьми автоматично */\n}`
            : `.parent {\n  border: 3px solid #b45309; /* НІКОЛИ не успадковується */\n}`
        }
      />

      <DemoKeyTakeaway>
        color/font/line-height/text-align передаються дітям безкоштовно; margin/padding/border/background/width/height
        — ніколи. Ключове слово inherit примусово бере значення властивості від батька навіть там, де успадкування
        зазвичай не відбувається (як у прикладі з посиланням у footer вище).
      </DemoKeyTakeaway>
    </div>
  );
}
