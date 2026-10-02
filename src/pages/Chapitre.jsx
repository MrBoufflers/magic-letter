import { useCallback, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IconArrowLeft, IconArrowRight, IconList, IconPrinter } from '@tabler/icons-react';
import { getTome, getChapitre, libelleChapitre } from '../data/tomes';
import { TomeContext } from '../lib/contexts';
import useDocumentTitle from '../lib/useDocumentTitle';
import BlockRenderer from '../components/blocks/BlockRenderer';
import FiltrePistes from '../components/chapitre/FiltrePistes';
import MotsCles from '../components/chapitre/MotsCles';
import MarquePage from '../components/chapitre/MarquePage';
import Sommaire from '../components/chapitre/Sommaire';
import NotFound from './NotFound';

function titreArret(arret) {
  if (arret.repere) return arret.repere;
  if (arret.page != null) return `Page ${arret.page}`;
  return null;
}

export default function Chapitre() {
  const { tome: slugTome, chapitre: slugChapitre } = useParams();
  const tome = getTome(slugTome);
  const trouve = getChapitre(tome, slugChapitre);
  const [tiroir, setTiroir] = useState(false);
  const fermer = useCallback(() => setTiroir(false), []);
  useDocumentTitle(trouve ? `${libelleChapitre(trouve.chapitre)} · ${trouve.chapitre.titre}` : null);
  if (!trouve) return <NotFound />;

  const { chapitre, precedent, suivant } = trouve;
  const base = `/tome/${tome.slug}`;
  const motsCles = chapitre.motsCles?.length ? chapitre.motsCles : tome.motsCles;

  return (
    <TomeContext.Provider value={tome.numero}>
      <div className="page page-chapitre" data-tome={tome.numero}>
        <Sommaire tome={tome} ouvert={tiroir} onFermer={fermer} />

        <article className="chapitre">
          <header className="chapitre-tete">
            <div className="chapitre-livre">
              <Link to={base} className="eyebrow">Tome {tome.numero} · {tome.titre}</Link>
              <MotsCles mots={motsCles} />
            </div>
            <p className="chapitre-num">{libelleChapitre(chapitre)}</p>
            <h1 className="page-title">{chapitre.titre}</h1>
            <div className="chapitre-outils no-print">
              <button type="button" className="btn btn-petit bouton-sommaire" onClick={() => setTiroir(true)}>
                <IconList size={18} aria-hidden="true" /> Sommaire
              </button>
              <FiltrePistes />
              <button type="button" className="btn btn-petit" onClick={() => window.print()}>
                <IconPrinter size={18} aria-hidden="true" /> Imprimer
              </button>
            </div>
          </header>

          {chapitre.arrets.map((arret, i) => {
            const titre = titreArret(arret);
            const suivantArret = chapitre.arrets[i + 1];
            const prochainePage =
              suivantArret?.page != null && suivantArret.page !== arret.page ? suivantArret.page : null;
            return (
              <section key={i} className="arret" aria-label={titre ?? 'Introduction'}>
                {titre && (
                  <h2 className="arret-titre">
                    <span>{titre}</span>
                  </h2>
                )}
                <BlockRenderer blocs={arret.blocs} />
                {prochainePage != null && <MarquePage page={prochainePage} />}
              </section>
            );
          })}

          <nav aria-label="Chapitres précédent et suivant" className="chapitre-nav no-print">
            {precedent ? (
              <Link className="btn" to={`${base}/${precedent.slug}`}>
                <IconArrowLeft size={18} aria-hidden="true" />
                <span>
                  <span className="nav-sous">{libelleChapitre(precedent)}</span>
                  {precedent.titre}
                </span>
              </Link>
            ) : <span />}
            {suivant && (
              <Link className="btn suivant" to={`${base}/${suivant.slug}`}>
                <span>
                  <span className="nav-sous">{libelleChapitre(suivant)}</span>
                  {suivant.titre}
                </span>
                <IconArrowRight size={18} aria-hidden="true" />
              </Link>
            )}
          </nav>
        </article>
      </div>
    </TomeContext.Provider>
  );
}
