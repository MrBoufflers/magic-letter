import { Link } from 'react-router-dom';
import { IconArrowRight, IconHourglass } from '@tabler/icons-react';
import { site } from '../data/config';
import { tomes } from '../data/tomes';
import MotifEtoiles from '../components/ornaments/MotifEtoiles';
import useDocumentTitle from '../lib/useDocumentTitle';

function nombreChapitres(n) {
  if (n === 0) return 'Chapitres en préparation';
  return n === 1 ? '1 chapitre' : `${n} chapitres`;
}

function CarteTome({ tome }) {
  const contenu = (
    <>
      <span className="tome-num" aria-hidden="true">{tome.numero}</span>
      <span className="eyebrow">Tome {tome.numero}</span>
      <h3>{tome.titre}</h3>
      {tome.sousTitre && <p className="lead" style={{ fontSize: '0.98rem' }}>{tome.sousTitre}</p>}
      {tome.disponible ? (
        <span className="meta">{nombreChapitres(tome.chapitres.length)}</span>
      ) : (
        <span className="badge-soon meta" style={{ marginTop: 'auto' }}>
          <IconHourglass size={16} stroke={1.75} aria-hidden="true" />
          Bientôt
        </span>
      )}
    </>
  );

  if (!tome.disponible) {
    return (
      <div className="tome-card soon" aria-disabled="true">
        {contenu}
      </div>
    );
  }
  return (
    <Link to={`/tome/${tome.slug}`} className="tome-card" data-tome={tome.numero}>
      {contenu}
    </Link>
  );
}

export default function Accueil() {
  useDocumentTitle(null);
  return (
    <div className="page">
      <header style={{ marginBottom: '1.75rem' }}>
        <h1 className="page-title">{site.nom}</h1>
        <p className="lead">{site.accroche}</p>
      </header>

      <Link to="/comment-utiliser" className="howto-banner">
        <MotifEtoiles />
        <div style={{ flex: '1 1 18rem' }}>
          <h2>Comment utiliser le site</h2>
          <p>Citations, pistes, exercices : à lire avant de commencer.</p>
        </div>
        <span className="howto-cta">
          Mode d’emploi
          <IconArrowRight size={20} stroke={2} aria-hidden="true" />
        </span>
      </Link>

      <section aria-labelledby="titre-tomes" style={{ marginTop: '2.5rem' }}>
        <h2 id="titre-tomes" style={{ fontSize: '1.6rem', marginBottom: '1rem' }}>Les tomes</h2>
        <ul className="tome-grid">
          {tomes.map((t) => (
            <li key={t.numero}>
              <CarteTome tome={t} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
