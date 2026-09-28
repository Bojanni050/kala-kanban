export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'kala-theme';

export const getStoredTheme = (): Theme | null => {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === 'light' || v === 'dark' ? v : null;
  } catch {
    return null;
  }
};

export const applyTheme = (theme: Theme) => {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Private browsing without storage: the class is still applied for this session
  }
};

export const initTheme = (): Theme => {
  const stored = getStoredTheme();
  if (stored) {
    applyTheme(stored);
    return stored;
  }
  const prefersDark =
    typeof window.matchMedia === 'function' && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme: Theme = prefersDark ? 'dark' : 'light';
  document.documentElement.classList.toggle('dark', theme === 'dark');
  return theme;
};
