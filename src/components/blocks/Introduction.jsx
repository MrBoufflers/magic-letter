import { IconFeather } from '@tabler/icons-react';

// Introduction de chapitre (paragraphes en italique en tête du Word) : toujours affichée.
export default function Introduction({ contenu }) {
  return (
    <section className="bloc introduction" aria-label="Introduction">
      <p className="introduction-entete">
        <IconFeather size={18} aria-hidden="true" />
        <span className="introduction-label">Introduction</span>
      </p>
      <div className="introduction-corps">{contenu}</div>
    </section>
  );
}
