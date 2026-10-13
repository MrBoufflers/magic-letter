import { useRef } from 'react';
import { IconPrinter, IconTrafficCone } from '@tabler/icons-react';
import { imprimerElement } from '../../lib/imprimer';

export default function Exercice({ titre, contenu }) {
  const ref = useRef(null);
  return (
    <section className="bloc exercice" ref={ref} aria-label={titre ? `Exercice : ${titre}` : 'Exercice'}>
      <div className="exercice-entete">
        <span className="exercice-label">Exercice</span>
        <IconTrafficCone className="icone-exercice" size={20} aria-hidden="true" />
        {titre && <span className="exercice-titre">{titre}</span>}
        <button type="button" className="btn btn-petit no-print" onClick={() => imprimerElement(ref.current)}>
          <IconPrinter size={18} aria-hidden="true" />
          Imprimer
        </button>
      </div>
      <div className="exercice-corps">{contenu}</div>
    </section>
  );
}
