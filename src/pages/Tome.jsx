import { Link, useParams } from 'react-router-dom';
import { getTome } from '../data/tomes';
import useDocumentTitle from '../lib/useDocumentTitle';
import NotFound from './NotFound';

export default function Tome() {
  const { tome: slug } = useParams();
  const tome = getTome(slug);
  useDocumentTitle(tome?.titre);
  if (!tome) return <NotFound />;

  return (
    <div className="page" data-tome={tome.numero}>
      <header className="prose-w" style={{ marginBottom: '2rem' }}>
        <p className="eyebrow">Tome {tome.numero}</p>
        <h1 className="page-title">{tome.titre}</h1>
        {tome.sousTitre && <p className="lead">{tome.sousTitre}</p>}
      </header>

      {tome.chapitres.length === 0 ? (
        <p className="notice prose-w">Les chapitres de ce tome sont en préparation.</p>
      ) : (
        <ol className="chap-list prose-w">
          {tome.chapitres.map((c) => (
            <li key={c.id}>
              <Link className="chap-link" to={`/tome/${tome.slug}/${c.slug}`}>
                <span className="eyebrow">{c.numero === 0 ? 'Avant' : `Chap. ${c.numero}`}</span>
                <span>
                  <strong>{c.titre}</strong>
                  {c.resume && <span style={{ display: 'block', color: 'var(--text-muted)' }}>{c.resume}</span>}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
