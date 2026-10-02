import { Link, useParams } from 'react-router-dom';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { getTome, getChapitre } from '../data/tomes';
import useDocumentTitle from '../lib/useDocumentTitle';
import NotFound from './NotFound';

// Page de chapitre : squelette de la phase 0 (blocs, filtre des pistes et sommaire latéral en phase 1).
export default function Chapitre() {
  const { tome: slugTome, chapitre: slugChapitre } = useParams();
  const tome = getTome(slugTome);
  const trouve = getChapitre(tome, slugChapitre);
  useDocumentTitle(trouve?.chapitre.titre);
  if (!trouve) return <NotFound />;
  const { chapitre, precedent, suivant } = trouve;
  const base = `/tome/${tome.slug}`;

  return (
    <div className="page" data-tome={tome.numero}>
      <header className="prose-w">
        <Link to={base} className="eyebrow">{tome.titre}</Link>
        <h1 className="page-title">{chapitre.titre}</h1>
      </header>

      <nav aria-label="Chapitres" className="no-print" style={{ display: 'flex', gap: '0.75rem', marginTop: '3rem', flexWrap: 'wrap' }}>
        {precedent && (
          <Link className="btn" to={`${base}/${precedent.slug}`}>
            <IconArrowLeft size={18} aria-hidden="true" /> {precedent.titre}
          </Link>
        )}
        {suivant && (
          <Link className="btn" to={`${base}/${suivant.slug}`} style={{ marginLeft: 'auto' }}>
            {suivant.titre} <IconArrowRight size={18} aria-hidden="true" />
          </Link>
        )}
      </nav>
    </div>
  );
}
