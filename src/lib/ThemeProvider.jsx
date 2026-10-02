import { useState, useEffect, useCallback, useMemo } from 'react';
import { ThemeContext } from './useTheme';
import { readPref, writePref } from './storage';

// Clés localStorage. Absence de 'ml-theme' = suivre la préférence système.
const KEY_THEME = 'ml-theme';
const KEY_DYS = 'ml-dys';
const KEY_SIZE = 'ml-size';

const systemQuery = () => window.matchMedia('(prefers-color-scheme: dark)');
const systemTheme = () => (systemQuery().matches ? 'dark' : 'light');

export default function ThemeProvider({ children }) {
  const [chosen, setChosen] = useState(() => {
    const t = readPref(KEY_THEME);
    return t === 'light' || t === 'dark' ? t : null;
  });
  const [system, setSystem] = useState(systemTheme);
  const [dys, setDys] = useState(() => readPref(KEY_DYS) === 'on');
  const [size, setSizeState] = useState(() => {
    const s = Number(readPref(KEY_SIZE));
    return s === 1 || s === 2 ? s : 0;
  });

  const theme = chosen ?? system;

  useEffect(() => {
    const mq = systemQuery();
    const onChange = () => setSystem(mq.matches ? 'dark' : 'light');
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.dataset.dys = dys ? 'on' : 'off';
    root.dataset.size = String(size);
  }, [theme, dys, size]);

  const setTheme = useCallback((t) => {
    setChosen(t);
    writePref(KEY_THEME, t);
  }, []);

  const toggleDys = useCallback(() => {
    setDys(!dys);
    writePref(KEY_DYS, dys ? 'off' : 'on');
  }, [dys]);

  const setSize = useCallback((s) => {
    setSizeState(s);
    writePref(KEY_SIZE, String(s));
  }, []);

  const value = useMemo(
    () => ({ theme, dys, size, setTheme, toggleDys, setSize }),
    [theme, dys, size, setTheme, toggleDys, setSize],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
