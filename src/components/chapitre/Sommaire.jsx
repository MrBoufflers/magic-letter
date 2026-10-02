import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { IconX } from '@tabler/icons-react';
import { libelleChapitre } from '../../data/tomes';

// Sommaire du tome : colonne latérale sur grand écran, tiroir sur tablette et téléphone.
export default function Sommaire({ tome, ouvert, onFermer }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ouvert) return undefined;
    const onKey = (e) => e.key === 'Escape' && onFermer();
    document.addEventListener('keydown', onKey);
    ref.current?.querySelector('button')?.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [ouvert, onFermer]);

  return (
    <>
      {ouvert && <div className="tiroir-fond" onClick={onFermer} aria-hidden="true" />}
      <nav
        ref={ref}
        className={`sommaire no-print${ouvert ? ' ouvert' : ''}`}
        aria-label={`Sommaire du tome ${tome.numero}`}
      >
        <div className="sommaire-tete">
          <p className="eyebrow">Sommaire</p>
          <button type="button" className="icon-btn tiroir-fermer" onClick={onFermer} aria-label="Fermer le sommaire">
            <IconX size={20} aria-hidden="true" />
          </button>
        </div>
        <ol>
          {tome.chapitres.map((c) => (
            <li key={c.id}>
              <NavLink to={`/tome/${tome.slug}/${c.slug}`} onClick={onFermer}>
                <span className="sommaire-num">{libelleChapitre(c)}</span>
                <span>{c.titre}</span>
              </NavLink>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
