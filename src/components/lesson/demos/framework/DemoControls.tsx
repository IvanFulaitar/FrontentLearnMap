import { useId, type ReactNode } from "react";
import styles from "./framework.module.css";

/** Row of controls (selects, sliders, toggles) — always at the top of a demo. */
export function DemoControls({ children }: { children: ReactNode }) {
  return <div className={styles.controls}>{children}</div>;
}

interface DemoSelectOption<T extends string> {
  value: T;
  label: string;
}

interface DemoSelectProps<T extends string> {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: DemoSelectOption<T>[];
}

/** Labeled <select> control, styled consistently across every demo. */
export function DemoSelect<T extends string>({ label, value, onChange, options }: DemoSelectProps<T>) {
  const id = useId();
  return (
    <label className={styles.control} htmlFor={id}>
      <span>{label}</span>
      <select id={id} value={value} onChange={(event) => onChange(event.target.value as T)}>
        {options.map((option) => (
          <option value={option.value} key={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  );
}

interface DemoSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
}

/** Labeled range slider, showing the current value + unit in the label. */
export function DemoSlider({ label, value, onChange, min, max, step = 1, unit = "" }: DemoSliderProps) {
  const id = useId();
  return (
    <label className={styles.control} htmlFor={id}>
      <span>{label}: {value}{unit}</span>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

interface DemoColorInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

/** Labeled native color picker, showing the current hex value next to the swatch. */
export function DemoColorInput({ label, value, onChange }: DemoColorInputProps) {
  const id = useId();
  return (
    <label className={styles.control} htmlFor={id}>
      <span>{label}: {value}</span>
      <input
        id={id}
        type="color"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={styles.colorInput}
      />
    </label>
  );
}
