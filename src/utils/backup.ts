// All persistent state on this platform (progress, quiz scores, activity
// log, XP/settings/profile, theme, sidebar collapse, per-lesson playground
// files) is namespaced under this prefix in localStorage. Exporting/
// importing generically by prefix means this stays correct automatically as
// new features add new keys, instead of hardcoding a list that silently goes
// stale.
const PREFIX = "frontend-academy:";

export interface BackupPayload {
  exportedAt: string;
  version: 1;
  data: Record<string, string>;
}

export const exportProgress = () => {
  const data: Record<string, string> = {};
  for (let i = 0; i < localStorage.length; i += 1) {
    const key = localStorage.key(i);
    if (!key || !key.startsWith(PREFIX)) continue;
    const value = localStorage.getItem(key);
    if (value !== null) data[key] = value;
  }

  const payload: BackupPayload = { exportedAt: new Date().toISOString(), version: 1, data };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `frontend-academy-progress-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

export const importProgress = async (file: File): Promise<{ importedKeys: number }> => {
  const text = await file.text();
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error("Файл не є коректним JSON.");
  }

  const payload = parsed as Partial<BackupPayload> | null;
  if (!payload || typeof payload !== "object" || !payload.data || typeof payload.data !== "object") {
    throw new Error("Файл не схожий на резервну копію прогресу цієї платформи.");
  }

  const entries = Object.entries(payload.data).filter(([key]) => key.startsWith(PREFIX));
  if (entries.length === 0) {
    throw new Error("У файлі немає жодного відомого ключа прогресу.");
  }

  entries.forEach(([key, value]) => {
    localStorage.setItem(key, value);
  });

  return { importedKeys: entries.length };
};
