import { useId, useState } from 'react';
import { IconChevronDown, IconFlame } from '@tabler/icons-react';
import { NIVEAUX, useFiltre } from '../../lib/contexts';
import { Etoiles } from '../contenu';
import DrapeauRallye from '../ornaments/DrapeauRallye';

const LIBELLES = { verte: 'Piste verte', rouge: 'Piste rouge', noire: 'Piste noire' };

export function FormePiste({ niveau, size = 16 }) {
  return (
    <svg className={`forme forme-${niveau}`} width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      {niveau === 'verte' && <circle cx="8" cy="8" r="6.5" />}
      {niveau === 'rouge' && <rect x="2" y="2" width="12" height="12" rx="1" />}
      {niveau === 'noire' && <path d="M8 1l7 7-7 7-7-7z" />}
    </svg>
  );
}

function IconeNiveau({ niveau }) {
  if (niveau === 'rouge') return <IconFlame className="icone-piste" size={18} aria-hidden="true" />;
  if (niveau === 'noire') return <DrapeauRallye />;
  return null;
}

function PisteRepliable({ niveau, titre, contenu, ouverteParDefaut }) {
  // L'état local se réinitialise quand le filtre change (clé posée par le parent).
  const [ouverte, setOuverte] = useState(ouverteParDefaut);
  const id = useId();
  return (
    <section className={`bloc piste piste-${niveau}${ouverte ? '' : ' repliee'}`} aria-label={LIBELLES[niveau]}>
      <button
        type="button"
        className="piste-entete"
        aria-expanded={ouverte}
        aria-controls={id}
        onClick={() => setOuverte(!ouverte)}
      >
        <FormePiste niveau={niveau} />
        <span className="piste-label">{LIBELLES[niveau]}</span>
        <IconeNiveau niveau={niveau} />
        {titre && <span className="piste-titre">{titre}</span>}
        {!ouverte && <span className="piste-hint">toucher pour ouvrir</span>}
        <IconChevronDown className="chevron" size={20} aria-hidden="true" />
      </button>
      <div id={id} className={`piste-corps${ouverte ? '' : ' ferme'}`}>
        {contenu}
      </div>
    </section>
  );
}

// `libelle` : « Piste verte » écrit en entier (première piste verte de la page,
// ou piste à étoiles) ; sinon le point vert seul suffit.
export default function Piste({ niveau = 'verte', titre, contenu, etoiles, libelle }) {
  const { filtre } = useFiltre();
  const rang = NIVEAUX.indexOf(niveau);

  if (niveau === 'verte') {
    const avecLibelle = libelle || etoiles;
    return (
      <section className={`bloc piste piste-verte${avecLibelle || titre ? '' : ' sans-libelle'}`} aria-label={LIBELLES.verte}>
        <p className="piste-entete statique">
          <FormePiste niveau="verte" />
          <span className={avecLibelle ? 'piste-label' : 'sr-only'}>{LIBELLES.verte}</span>
          {etoiles && <Etoiles n={etoiles} />}
          {titre && <span className="piste-titre">{titre}</span>}
        </p>
        <div className="piste-corps">{contenu}</div>
      </section>
    );
  }
  return (
    <PisteRepliable
      key={filtre}
      niveau={niveau}
      titre={titre}
      contenu={contenu}
      ouverteParDefaut={rang <= filtre}
    />
  );
}
