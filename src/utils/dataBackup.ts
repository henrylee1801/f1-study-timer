'use client';

/**
 * Export / import all of Kathryn's F1 Study Timer local data (settings, study
 * history, tasks) as a single JSON file. Everything lives in localStorage.
 */
const KEYS = ['pitmydoro_settings', 'pitmydoro_tasks', 'kfst_study_history'];

export interface BackupFile {
  app: 'kathryns-f1-study-time';
  version: 1;
  exportedAt: string;
  data: Record<string, unknown>;
}

export const buildBackup = (): BackupFile => {
  const data: Record<string, unknown> = {};
  for (const key of KEYS) {
    const raw = localStorage.getItem(key);
    if (raw != null) {
      try {
        data[key] = JSON.parse(raw);
      } catch {
        data[key] = raw;
      }
    }
  }
  return {
    app: 'kathryns-f1-study-time',
    version: 1,
    exportedAt: new Date().toISOString(),
    data,
  };
};

export const downloadBackup = () => {
  const blob = new Blob([JSON.stringify(buildBackup(), null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `kathryns-f1-study-time-backup-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

/** Returns true on success. Caller should reload so every store re-reads storage. */
export const restoreBackup = async (file: File): Promise<boolean> => {
  try {
    const parsed = JSON.parse(await file.text()) as BackupFile;
    if (parsed?.app !== 'kathryns-f1-study-time' || !parsed.data) return false;
    for (const key of KEYS) {
      if (key in parsed.data) {
        localStorage.setItem(key, JSON.stringify(parsed.data[key]));
      }
    }
    return true;
  } catch {
    return false;
  }
};
