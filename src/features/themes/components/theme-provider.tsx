import { ScriptOnce } from '@tanstack/react-router';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type Theme = 'dark' | 'light' | 'system';

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

function getThemeScript(storageKey: string, defaultTheme: Theme) {
  const key = JSON.stringify(storageKey);
  const fallback = JSON.stringify(defaultTheme);

  return `(function(){try{var t=localStorage.getItem(${key});if(t!=='light'&&t!=='dark'&&t!=='system'){t=${fallback}}var d=matchMedia('(prefers-color-scheme: dark)').matches;var r=t==='system'?(d?'dark':'light'):t;var e=document.documentElement;e.classList.add(r);e.style.colorScheme=r}catch(e){}})();`;
}

const ThemeProviderContext = createContext<ThemeProviderState>({
  setTheme: () => {
    throw new Error('setTheme must be used within a ThemeProvider');
  },
  theme: 'system',
});

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');

  let resolved;

  if (theme === 'system') {
    resolved = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  } else {
    resolved = theme;
  }

  root.classList.add(resolved);
  root.style.colorScheme = resolved;
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'theme',
}: ThemeProviderProps) {
  const [themeState, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') {
      return defaultTheme;
    }

    const stored = localStorage.getItem(storageKey);

    return stored === 'light' || stored === 'dark' || stored === 'system'
      ? stored
      : defaultTheme;
  });

  const setTheme = useCallback(
    (next: Theme) => {
      localStorage.setItem(storageKey, next);

      setThemeState(next);
    },
    [storageKey]
  );

  useEffect(() => {
    applyTheme(themeState);
  }, [themeState]);

  function onChange() {
    applyTheme('system');
  }

  useEffect(() => {
    let cleanup;

    if (themeState === 'system') {
      const media = window.matchMedia('(prefers-color-scheme: dark)');

      media.addEventListener('change', onChange);

      cleanup = () => {
        media.removeEventListener('change', onChange);
      };
    }

    return cleanup;
  }, [themeState]);

  const value = useMemo(
    () => ({ setTheme, theme: themeState }),
    [themeState, setTheme]
  );

  return (
    <ThemeProviderContext.Provider value={value}>
      <ScriptOnce>{getThemeScript(storageKey, defaultTheme)}</ScriptOnce>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
