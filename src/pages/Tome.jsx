import { Link, useParams } from 'react-router-dom';
import { getTome, libelleChapitre } from '../data/tomes';
import MotsCles from '../components/chapitre/MotsCles';
import BlockRenderer from '../components/blocks/BlockRenderer';
import { TomeContext } from '../lib/contexts';
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
        <div style={{ marginTop: '0.75rem' }}>
          <MotsCles mots={tome.motsCles} />
        </div>
      </header>

      {tome.introduction.length > 0 && (
        <section className="prose-w tome-intro" aria-label="Introduction du tome">
          <TomeContext.Provider value={tome.numero}>
            <BlockRenderer blocs={tome.introduction} prefixe="intro" />
          </TomeContext.Provider>
        </section>
      )}

      {tome.chapitres.length > 0 && <h2 className="sommaire-titre">Chapitres</h2>}
      {tome.chapitres.length === 0 ? (
        <p className="notice prose-w">Les chapitres de ce tome sont en préparation.</p>
      ) : (
        <ol className="chap-list prose-w">
          {tome.chapitres.map((c) => (
            <li key={c.id}>
              <Link className="chap-link" to={`/tome/${tome.slug}/${c.slug}`}>
                <span className="eyebrow chap-num">{libelleChapitre(c)}</span>
                <span>
                  {c.titre && <strong>{c.titre}</strong>}
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
