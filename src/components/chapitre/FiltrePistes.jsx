import { useFiltre } from '../../lib/contexts';
import { FormePiste } from '../blocks/Piste';

const OPTIONS = [
  { valeur: 0, libelle: 'Verte', niveaux: ['verte'] },
  { valeur: 1, libelle: '+ Rouge', niveaux: ['verte', 'rouge'] },
  { valeur: 2, libelle: '+ Noire', niveaux: ['verte', 'rouge', 'noire'] },
];

// Contrôle à trois états cumulatifs (cahier, 6.1).
export default function FiltrePistes() {
  const { filtre, setFiltre } = useFiltre();
  return (
    <div className="filtre no-print" role="radiogroup" aria-label="Pistes dépliées">
      <span className="filtre-label" aria-hidden="true">Pistes</span>
      {OPTIONS.map((o) => (
        <button
          key={o.valeur}
          type="button"
          role="radio"
          aria-checked={filtre === o.valeur}
          className="filtre-btn"
          onClick={() => setFiltre(o.valeur)}
        >
          <span className="filtre-formes" aria-hidden="true">
            {o.niveaux.map((n) => (
              <FormePiste key={n} niveau={n} size={13} />
            ))}
          </span>
          {o.libelle}
        </button>
      ))}
    </div>
  );
}
