import type { CursorPosition, PlaygroundSettings } from "../types";
import type { PlaygroundFile } from "../types";

export interface StoredPlayground {
  files: PlaygroundFile[];
  activeFileId: string;
  cursorPosition: CursorPosition;
  settings: PlaygroundSettings;
}

const keyFor = (lessonId: string) => `frontend-academy:playground:${lessonId}`;

export const playgroundStorage = {
  read(lessonId: string): StoredPlayground | null {
    try {
      const rawValue = localStorage.getItem(keyFor(lessonId));
      return rawValue ? (JSON.parse(rawValue) as StoredPlayground) : null;
    } catch {
      return null;
    }
  },
  write(lessonId: string, value: StoredPlayground) {
    localStorage.setItem(keyFor(lessonId), JSON.stringify(value));
  },
  clear(lessonId: string) {
    localStorage.removeItem(keyFor(lessonId));
  },
};
