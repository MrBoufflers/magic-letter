import { useRef } from 'react';
import { IconPrinter, IconPencil } from '@tabler/icons-react';
import { imprimerElement } from '../../lib/imprimer';

export default function Exercice({ titre, contenu }) {
  const ref = useRef(null);
  return (
    <section className="bloc exercice" ref={ref} aria-label={titre ? `Exercice : ${titre}` : 'Exercice'}>
      <div className="exercice-entete">
        <IconPencil size={20} aria-hidden="true" />
        <span className="exercice-label">Exercice</span>
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
