import { useEffect } from "react";

export function useKeyboardShortcuts(actions: { openSearch: () => void; openCommands: () => void; saveNotes?: () => void; close: () => void }) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        actions.openSearch();
      }
      if ((event.ctrlKey || event.metaKey) && event.key === "/") {
        event.preventDefault();
        actions.openCommands();
      }
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        actions.saveNotes?.();
      }
      if (event.key === "Escape") actions.close();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [actions]);
}
