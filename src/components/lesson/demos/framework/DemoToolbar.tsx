import styles from "./framework.module.css";

interface DemoToolbarOption {
  value: string;
  label: string;
}

interface DemoToolbarProps {
  options: DemoToolbarOption[];
  value: string;
  onChange: (value: string) => void;
}

/** Generic segmented button group — the same visual pattern used for the
 * Before/After toggle, device presets, or any small set of mutually
 * exclusive options where a <select> would feel too heavy. */
export function DemoToolbar({ options, value, onChange }: DemoToolbarProps) {
  return (
    <div className={styles.toolbar} role="tablist">
      {options.map((option) => (
        <button
          type="button"
          role="tab"
          key={option.value}
          aria-selected={option.value === value}
          className={`${styles.toolbarButton} ${option.value === value ? styles.toolbarButtonActive : ""}`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
