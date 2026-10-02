import { Link } from 'react-router-dom';
import { IconSun, IconMoon, IconTextSize } from '@tabler/icons-react';
import { useTheme } from '../../lib/useTheme';
import { site } from '../../data/config';
import Sceau from '../ornaments/Sceau';

const TAILLES = ['Texte normal', 'Texte grand', 'Texte très grand'];

export default function Header() {
  const { theme, dys, size, setTheme, toggleDys, setSize } = useTheme();
  const nextSize = (size + 1) % TAILLES.length;

  return (
    <header className="header">
      <Link to="/" className="brand" aria-label={`${site.nom}, accueil`}>
        <Sceau size={34} />
        <span className="brand-name">{site.nom}</span>
      </Link>

      <div className="spacer" />

      <div className="h-actions">
        <div className="seg" role="group" aria-label="Thème">
          <button
            type="button"
            aria-pressed={theme === 'light'}
            onClick={() => setTheme('light')}
            aria-label="Thème clair"
            title="Thème clair"
          >
            <IconSun size={18} stroke={1.75} aria-hidden="true" />
            <span className="seg-label">Clair</span>
          </button>
          <button
            type="button"
            aria-pressed={theme === 'dark'}
            onClick={() => setTheme('dark')}
            aria-label="Thème sombre"
            title="Thème sombre"
          >
            <IconMoon size={18} stroke={1.75} aria-hidden="true" />
            <span className="seg-label">Sombre</span>
          </button>
        </div>

        <button
          type="button"
          className="icon-btn"
          onClick={() => setSize(nextSize)}
          aria-label={`Taille du texte\u00a0: ${TAILLES[size]}. Passer à\u00a0: ${TAILLES[nextSize]}`}
          title={`Taille du texte\u00a0: ${TAILLES[size]}`}
        >
          <IconTextSize size={20} stroke={1.75} aria-hidden="true" />
          <span aria-hidden="true" style={{ fontSize: '0.8rem', fontWeight: 700, marginLeft: 2 }}>
            {size + 1}
          </span>
        </button>

        <button
          type="button"
          className="icon-btn aa"
          aria-pressed={dys}
          onClick={toggleDys}
          aria-label="Police adaptée à la dyslexie"
          title="Police adaptée à la dyslexie"
        >
          Aa
        </button>
      </div>
    </header>
  );
}
