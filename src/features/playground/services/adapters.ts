import type { ConsoleMessage, PlaygroundAdapter } from "../types";
import { findFileByLanguage } from "../utils/fileUtils";

const createMessage = (level: ConsoleMessage["level"], message: string): ConsoleMessage => ({
  id: `${level}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
  level,
  message,
  timestamp: Date.now(),
});

const interceptConsoleScript = `
  <script>
    ["log","warn","error"].forEach(function(level) {
      var original = console[level];
      console[level] = function() {
        var message = Array.prototype.slice.call(arguments).map(String).join(" ");
        window.parent.postMessage({ source: "playground-console", level: level, message: message }, "*");
        original.apply(console, arguments);
      };
    });
  </script>
`;

export const browserAdapter: PlaygroundAdapter = {
  id: "browser",
  async run(files) {
    const html = findFileByLanguage(files, "html");
    const css = findFileByLanguage(files, "css");
    const javascript = findFileByLanguage(files, "javascript");
    return {
      previewDocument: `${interceptConsoleScript}${html}<style>${css}</style><script>${javascript}</script>`,
      messages: [createMessage("log", "Перегляд оновлено.")],
      output: "Перегляд у браузері оновлено.",
    };
  },
};

export const reactAdapter: PlaygroundAdapter = {
  id: "react",
  async run() {
    return {
      previewDocument: "<main style='font-family: system-ui; padding: 24px'><h2>React-адаптер пісочниці</h2><p>Готовий до інтеграції із Sandpack, StackBlitz, CodeSandbox або WebContainer.</p></main>",
      messages: [createMessage("warn", "Виконання React підготовлено як адаптер, але не зібрано в цій демоверсії.")],
      output: "Заглушка React-адаптера.",
    };
  },
};

export const getPlaygroundAdapter = (mode: "web" | "tsx") => (mode === "tsx" ? reactAdapter : browserAdapter);
