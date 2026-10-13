import { allerA } from '../../lib/motsCles';

// Pastilles de mots-clés ; celles qui ont une capsule cible deviennent des liens.
export default function MotsCles({ mots, cibles = {}, label = 'Mots-clés' }) {
  if (!mots || mots.length === 0) return null;
  return (
    <ul className="mots-cles" aria-label={label}>
      {mots.map((m) => (
        <li key={m}>
          {cibles[m] ? (
            <a
              className="rune-cible"
              href={`#${cibles[m]}`}
              onClick={(e) => {
                e.preventDefault();
                allerA(cibles[m]);
              }}
            >
              <span className="rune rune-lien">{m}</span>
            </a>
          ) : (
            <span className="rune">{m}</span>
          )}
        </li>
      ))}
    </ul>
  );
}
