// Petits composants utilisés dans le contenu des blocs (fichiers de données).
import { IconArrowNarrowRight } from '@tabler/icons-react';

// Souligné du Word = idée clé : mise en évidence sémantique.
export function Cle({ children }) {
  return <mark className="cle">{children}</mark>;
}

// Lien externe, ouvert dans un nouvel onglet.
export function Lien({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="lien-ext">
      {children}
      <span className="sr-only"> (nouvel onglet)</span>
    </a>
  );
}

// Flèche « >>> » du Word, rendue comme pictogramme.
export function Fl() {
  return (
    <span className="fleche" role="img" aria-label="flèche">
      <IconArrowNarrowRight size="1.1em" stroke={2} aria-hidden="true" />
    </span>
  );
}

// Ligne de réponse à compléter (blancs « ____ » du Word). Jamais un champ de saisie.
export function Ligne({ n = 1 }) {
  return (
    <span className="lignes" aria-label={n > 1 ? `${n} lignes à compléter` : 'ligne à compléter'} role="img">
      {Array.from({ length: n }, (_, i) => (
        <span key={i} className="ligne" />
      ))}
    </span>
  );
}

// Blanc dans une phrase (« Mot : ______ »).
export function Blanc() {
  return <span className="blanc" role="img" aria-label="à compléter" />;
}

// Tableau à compléter : `colonnes` (en-têtes), `lignes` (tableau de lignes ; cellule vide = à compléter).
export function Tableau({ colonnes, lignes, entetesLignes = false, legende }) {
  return (
    <div className="tableau-wrap">
      <table className="tableau">
        {legende && <caption>{legende}</caption>}
        {colonnes && (
          <thead>
            <tr>
              {colonnes.map((c, i) => (
                <th key={i} scope="col">{c}</th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {lignes.map((l, i) => (
            <tr key={i}>
              {l.map((cell, j) =>
                entetesLignes && j === 0 ? (
                  <th key={j} scope="row">{cell}</th>
                ) : (
                  <td key={j} className={cell == null || cell === '' ? 'vide' : undefined}>
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Fiche personnage à trois colonnes (physique / caractère / habitudes),
// en cartes empilées en largeur étroite. `lignesVides` = nombre de lignes à compléter.
export function FichePersonnage({ personnage, colonnes, exemples = [], lignesVides = 4 }) {
  return (
    <div className="fiche">
      {personnage && <p className="fiche-nom">{personnage}</p>}
      <div className="fiche-cols">
        {colonnes.map((c, i) => (
          <div className="fiche-col" key={i}>
            <p className="fiche-titre">{c}</p>
            {exemples.map((e, k) => e[i] ? <p className="fiche-ex" key={k}>{e[i]}</p> : null)}
            <Ligne n={lignesVides} />
          </div>
        ))}
      </div>
    </div>
  );
}

// Carte de définition.
export function Definition({ terme, children, label = 'Définition' }) {
  return (
    <div className="definition">
      <p className="definition-label">{label}</p>
      {terme && <p className="definition-terme">{terme}</p>}
      <div>{children}</div>
    </div>
  );
}

// Étoiles (« information 5 étoiles »), SVG original.
export function Etoiles({ n = 5 }) {
  return (
    <span className="etoiles" role="img" aria-label={`${n} étoile${n > 1 ? 's' : ''}`}>
      {Array.from({ length: n }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M12 2.5l2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 17.4l-6.1 3.5 1.5-6.8L2.2 9.5l6.9-.7z" />
        </svg>
      ))}
    </span>
  );
}

// Liste de mots de vocabulaire à chercher (avec ligne de définition).
export function Mots({ mots, lignes = true }) {
  return (
    <ul className="mots">
      {mots.map((m, i) => (
        <li key={i}>
          <span className="mot">{m}</span>
          {lignes && <Blanc />}
        </li>
      ))}
    </ul>
  );
}
