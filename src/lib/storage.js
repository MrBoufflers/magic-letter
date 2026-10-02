// Accès à localStorage tolérant aux erreurs (navigation privée, stockage bloqué).
export function readPref(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writePref(key, value) {
  try {
    if (value == null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {
    /* préférence non mémorisée */
  }
}
