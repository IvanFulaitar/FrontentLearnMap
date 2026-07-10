import { useMemo, useState } from "react";
import { DemoToolbar, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Mode = "correct" | "broken";

type HeadingNode = { id: string; level: number; text: string };
type ActiveHeadingNode = HeadingNode & { prevLevel: number; isJump: boolean };

const CORRECT_NODES: HeadingNode[] = [
  { id: "c-h1", level: 1, text: "Магазин техніки" },
  { id: "c-h2-laptops", level: 2, text: "Ноутбуки" },
  { id: "c-h3-asus", level: 3, text: "ASUS" },
  { id: "c-h3-lenovo", level: 3, text: "Lenovo" },
  { id: "c-h2-phones", level: 2, text: "Смартфони" },
  { id: "c-h3-samsung", level: 3, text: "Samsung" },
];

const BROKEN_NODES: HeadingNode[] = [
  { id: "b-h1", level: 1, text: "Магазин" },
  { id: "b-h4-laptops", level: 4, text: "Ноутбуки" },
  { id: "b-h2-asus", level: 2, text: "ASUS" },
];

/**
 * Live demo for "Текстові елементи та ієрархія": click any heading node in a
 * correct vs. broken outline and see exactly what a screen reader would
 * announce for it. The lesson's static code walkthrough shows *that*
 * skipping levels is wrong — this demo shows *what the user actually hears*
 * when it happens, which is the real reason it matters.
 */
export function HeadingHierarchyDemo() {
  const [mode, setMode] = useState<Mode>("correct");
  const nodes = mode === "correct" ? CORRECT_NODES : BROKEN_NODES;
  const [selectedId, setSelectedId] = useState<string>(CORRECT_NODES[0].id);

  const activeNodes: ActiveHeadingNode[] = useMemo(() => {
    return nodes.map((node, index) => {
      const prevLevel = index === 0 ? node.level : nodes[index - 1].level;
      const isJump = node.level - prevLevel > 1;
      return { ...node, prevLevel, isJump };
    });
  }, [nodes]);

  const selected = activeNodes.find((n) => n.id === selectedId) ?? activeNodes[0];

  function handleModeChange(value: string) {
    const next = value as Mode;
    setMode(next);
    setSelectedId(next === "correct" ? CORRECT_NODES[0].id : BROKEN_NODES[0].id);
  }

  return (
    <div className={styles.demoStack}>
      <DemoToolbar
        options={[
          { value: "correct", label: "Правильна ієрархія" },
          { value: "broken", label: "Зі стрибком рівня" },
        ]}
        value={mode}
        onChange={handleModeChange}
      />

      <div className={styles.headingTree}>
        {activeNodes.map((node) => (
          <button
            key={node.id}
            type="button"
            className={`${styles.headingNode} ${node.id === selected.id ? styles.headingNodeActive : ""} ${node.isJump ? styles.headingNodeJump : ""}`}
            style={{ marginLeft: `${(node.level - 1) * 18}px` }}
            onClick={() => setSelectedId(node.id)}
          >
            <span className={styles.headingTag}>{`<h${node.level}>`}</span>
            <span>{node.text}</span>
            {node.isJump ? <span aria-hidden="true">⚠</span> : null}
          </button>
        ))}
      </div>

      <p className={styles.headingAnnounce}>
        🔊 Скрінрідер оголосить: «Заголовок {selected.level} рівня, {selected.text}»
        {selected.isJump ? " — і користувач не зрозуміє, чому рівень раптом стрибнув." : "."}
      </p>

      <DemoExplanation>
        {selected.isJump
          ? `Перед цим заголовком був рівень ${selected.prevLevel}, а очікувався рівень ${selected.prevLevel + 1} — це і є "стрибок": скрінрідер не пояснює, чому пропущені рівні, користувач просто чує різкий перехід.`
          : "Кожен наступний заголовок підпорядкований попередньому без пропусків — скрінрідер озвучує рівні послідовно, і структура сторінки зрозуміла на слух, а не тільки на вигляд."}
      </DemoExplanation>

      <DemoCodeSnippet code={`<h${selected.level}>${selected.text}</h${selected.level}>`} />

      <DemoKeyTakeaway>
        HTML5 технічно дозволяє пропускати рівні заголовків, але для незрячого користувача, який навігує сторінкою
        саме по заголовках, кожен пропущений рівень — зайве питання "а де решта структури?". Клікни по вузлах вище,
        щоб почути різницю самому.
      </DemoKeyTakeaway>
    </div>
  );
}
