import type { PlaygroundFile, PlaygroundLanguage } from "../types";

export const getFileId = (file: PlaygroundFile) => file.id ?? file.path ?? file.language;

export const getMonacoLanguage = (language: PlaygroundLanguage) => {
  const map: Record<PlaygroundLanguage, string> = {
    html: "html",
    css: "css",
    javascript: "javascript",
    typescript: "typescript",
    tsx: "typescript",
    json: "json",
    markdown: "markdown",
    bash: "shell",
  };
  return map[language];
};

export const cloneFiles = (files: PlaygroundFile[]) => files.map((file) => ({ ...file }));

export const findFileByLanguage = (files: PlaygroundFile[], language: PlaygroundLanguage) =>
  files.find((file) => file.language === language)?.code ?? "";
