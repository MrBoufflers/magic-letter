import { useState, useCallback, useMemo } from 'react';
import { FiltreContext } from './contexts';
import { readPref, writePref } from './storage';

const KEY = 'ml-pistes';

export default function FiltreProvider({ children }) {
  const [filtre, setState] = useState(() => {
    const v = Number(readPref(KEY));
    return v === 1 || v === 2 ? v : 0;
  });
  const setFiltre = useCallback((v) => {
    setState(v);
    writePref(KEY, String(v));
  }, []);
  const value = useMemo(() => ({ filtre, setFiltre }), [filtre, setFiltre]);
  return <FiltreContext.Provider value={value}>{children}</FiltreContext.Provider>;
}
