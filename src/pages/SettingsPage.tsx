import { useRef, type ChangeEvent } from "react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { usePlatform } from "../context/PlatformContext";
import { useToast } from "../context/ToastContext";
import { useTheme } from "../context/ThemeContext";
import { PageHeader } from "../shared/page/PageHeader";
import { SettingsRow } from "../features/settings/SettingsRow";
import { exportProgress, importProgress } from "../utils/backup";
import styles from "./PlatformPages.module.css";

export function SettingsPage() {
  const { settings, updateSettings, profile, updateProfile, resetPlatform } = usePlatform();
  const platform = usePlatform();
  const { theme, setThemeMode } = useTheme();
  const { notify } = useToast();
  const importInputRef = useRef<HTMLInputElement>(null);

  const handleImportFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    try {
      const { importedKeys } = await importProgress(file);
      notify({
        title: "Прогрес імпортовано",
        message: `Відновлено ${importedKeys} записів. Сторінка зараз оновиться, щоб застосувати їх.`,
        tone: "success",
      });
      setTimeout(() => window.location.reload(), 1200);
    } catch (error) {
      notify({
        title: "Не вдалося імпортувати",
        message: error instanceof Error ? error.message : "Файл резервної копії пошкоджений або має неправильний формат.",
        tone: "warning",
      });
    }
  };

  return (
    <div className="page">
      <PageHeader
        breadcrumbs={[{ label: "Дашборд", href: "/" }, { label: "Налаштування" }]}
        eyebrow="Налаштування"
        title="Налаштування"
        description="Тема перемикається кнопкою у шапці, інші параметри підготовлені для майбутнього Users API."
      />
      <Card className={styles.card}>
        <div className={styles.settingsForm}>
          <SettingsRow label="Ім'я користувача">
            <input className={styles.input} value={profile.username} onChange={(event) => updateProfile({ username: event.target.value })} />
          </SettingsRow>
          <SettingsRow label="Тема оформлення">
            <select className={styles.select} value={theme} onChange={(event) => setThemeMode(event.target.value as "light" | "dark" | "high-contrast" | "custom")}>
              <option value="light">Світла</option>
              <option value="dark">Темна</option>
              <option value="high-contrast">Висока контрастність</option>
              <option value="custom">Користувацька</option>
            </select>
          </SettingsRow>
          <SettingsRow label="Розмір шрифту">
            <select className={styles.select} value={settings.fontSize} onChange={(event) => updateSettings({ fontSize: event.target.value as "small" | "medium" | "large" })}>
              <option value="small">Малий</option>
              <option value="medium">Середній</option>
              <option value="large">Великий</option>
            </select>
          </SettingsRow>
          <SettingsRow label="Розмір шрифту редактора">
            <input className={styles.input} type="number" min={12} max={24} value={settings.editorFontSize} onChange={(event) => updateSettings({ editorFontSize: Number(event.target.value) })} />
          </SettingsRow>
          <SettingsRow label="Шрифт коду">
            <select className={styles.select} value={settings.codeFont} onChange={(event) => updateSettings({ codeFont: event.target.value as "Cascadia Code" | "Fira Code" | "Consolas" })}>
              <option>Cascadia Code</option>
              <option>Fira Code</option>
              <option>Consolas</option>
            </select>
          </SettingsRow>
          <SettingsRow label="Анімації">
            <input type="checkbox" checked={settings.animations} onChange={(event) => updateSettings({ animations: event.target.checked })} />
          </SettingsRow>
          <SettingsRow label="Компактний режим">
            <input type="checkbox" checked={settings.compactMode} onChange={(event) => updateSettings({ compactMode: event.target.checked })} />
          </SettingsRow>
          <Button
            variant="ghost"
            onClick={() => {
              resetPlatform();
              notify({ title: "Прогрес скинуто", message: "XP та налаштування платформи повернуто до початкових значень.", tone: "warning" });
            }}
          >
            Скинути прогрес
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              platform.resetNotes();
              notify({ title: "Нотатки очищено", message: "Усі локальні нотатки видалено.", tone: "warning" });
            }}
          >
            Очистити нотатки
          </Button>
        </div>
      </Card>

      <Card className={styles.card}>
        <div className={styles.settingsForm}>
          <h2 className={styles.backupTitle}>Резервна копія прогресу</h2>
          <p className={styles.hint}>
            Весь прогрес зберігається лише в цьому браузері. Якщо очистиш кеш чи перейдеш на інший пристрій — він
            зникне, якщо не зробити копію заздалегідь.
          </p>
          <div className={styles.backupActions}>
            <Button
              variant="secondary"
              onClick={() => {
                exportProgress();
                notify({ title: "Готово", message: "Файл резервної копії завантажено.", tone: "success" });
              }}
            >
              Експортувати прогрес
            </Button>
            <Button variant="ghost" onClick={() => importInputRef.current?.click()}>
              Імпортувати прогрес
            </Button>
            <input
              ref={importInputRef}
              type="file"
              accept="application/json"
              className={styles.hiddenFileInput}
              onChange={handleImportFile}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
