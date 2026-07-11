import { usePlatform } from "../../../context/PlatformContext";
import { DemoToolbar, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway, LessonFigure } from "./framework";
import styles from "./demos.module.css";

const COMMANDS = {
  windows: {
    shell: "PowerShell",
    where: "де я знаходжуся?",
    whereCmd: "pwd",
    list: "що лежить у цій папці?",
    listCmd: "ls",
    open: "code .",
  },
  macos: {
    shell: "Terminal (zsh)",
    where: "де я знаходжуся?",
    whereCmd: "pwd",
    list: "що лежить у цій папці?",
    listCmd: "ls",
    open: "code .",
  },
};

/**
 * Live demo for "Термінал": OS-aware terminal basics. `pwd`/`ls` work as
 * aliases in both PowerShell and zsh, so the commands are identical — what
 * differs is the shell name and prompt, which is the point worth showing.
 * Backed by 2 real screenshots (Windows/PowerShell) — the menu item that
 * opens the terminal, and the actual terminal panel with its prompt.
 */
export function VscodeTerminalDemo() {
  const { os, setOs } = usePlatform();
  const info = COMMANDS[os];

  return (
    <div className={styles.demoStack}>
      <DemoToolbar
        options={[
          { value: "windows", label: "Windows" },
          { value: "macos", label: "macOS" },
        ]}
        value={os}
        onChange={(value) => setOs(value === "macos" ? "macos" : "windows")}
      />

      <LessonFigure
        src="/images/courses/vscode/vscode-open-terminal-menu.png"
        alt="Реальний скріншот меню View у VS Code з підсвіченим пунктом Terminal і поєднанням клавіш Ctrl+backtick"
        caption="Найшвидший спосіб відкрити термінал — View → Terminal (або Ctrl+ ` )."
        width={960}
        height={265}
      />

      <DemoExplanation>
        У VS Code на {os === "windows" ? "Windows" : "macOS"} вбудований термінал за замовчуванням відкриває{" "}
        <strong>{info.shell}</strong>. Команди виконуються відносно поточної папки — тієї, яку зараз відкрито у
        VS Code.
      </DemoExplanation>

      <LessonFigure
        src="/images/courses/vscode/vscode-terminal-prompt.png"
        alt="Реальний скріншот відкритої панелі термінала VS Code з рядком запрошення pwsh у папці Frontend"
        caption="Рядок запрошення показує оболонку (pwsh) і поточну папку — решта тексту вище це службові повідомлення VS Code, ігноруй їх."
        width={792}
        height={769}
      />

      <DemoCodeSnippet
        code={`# ${info.where}\n${info.whereCmd}\n\n# ${info.list}\n${info.listCmd}\n\n# відкрити цю папку у VS Code\n${info.open}`}
      />

      <DemoKeyTakeaway>
        code . — найкорисніша команда цього уроку: крапка означає "поточна папка", тож команда відкриває у VS Code
        рівно ту папку, в якій зараз стоїть термінал — замість того, щоб відкривати файли по одному вручну.
      </DemoKeyTakeaway>
    </div>
  );
}
