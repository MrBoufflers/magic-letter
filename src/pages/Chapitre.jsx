import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IconArrowLeft, IconArrowRight, IconList } from '@tabler/icons-react';
import { getTome, getChapitre, libelleChapitre } from '../data/tomes';
import { TomeContext } from '../lib/contexts';
import useDocumentTitle from '../lib/useDocumentTitle';
import { trouverCibles } from '../lib/motsCles';
import BlockRenderer from '../components/blocks/BlockRenderer';
import FiltrePistes from '../components/chapitre/FiltrePistes';
import MotsCles from '../components/chapitre/MotsCles';
import MarquePage from '../components/chapitre/MarquePage';
import Sommaire from '../components/chapitre/Sommaire';
import NotFound from './NotFound';

// Seule la première piste verte de la page porte le libellé « Piste verte ».
function marquerPremiereVerte(arrets) {
  let vue = false;
  return arrets.map((a) => ({
    ...a,
    blocs: a.blocs.map((b) => {
      if (b.type !== 'piste' || (b.niveau ?? 'verte') !== 'verte' || vue) return b;
      vue = true;
      return { ...b, libelle: true };
    }),
  }));
}

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
  const boutonSommaire = useRef(null);
  const fermer = useCallback(() => {
    setTiroir((ouvert) => {
      if (ouvert) window.requestAnimationFrame(() => boutonSommaire.current?.focus());
      return false;
    });
  }, []);
  const article = useRef(null);
  const [cibles, setCibles] = useState({});
  const chapitreCourant = trouve?.chapitre;
  const arrets = useMemo(() => (chapitreCourant ? marquerPremiereVerte(chapitreCourant.arrets) : []), [chapitreCourant]);
  const motsCles = chapitreCourant?.motsCles?.length ? chapitreCourant.motsCles : tome?.motsCles ?? [];

  useEffect(() => {
    setCibles(trouverCibles(article.current, motsCles));
    // les mots-clés ne changent qu'avec le chapitre
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapitreCourant]);
  useDocumentTitle(
    trouve ? [libelleChapitre(trouve.chapitre), trouve.chapitre.titre].filter(Boolean).join(' · ') : null,
  );
  if (!trouve) return <NotFound />;

  const { chapitre, precedent, suivant } = trouve;
  const base = `/tome/${tome.slug}`;

  return (
    <TomeContext.Provider value={tome.numero}>
      <div className="page page-chapitre" data-tome={tome.numero}>
        <Sommaire tome={tome} ouvert={tiroir} onFermer={fermer} />

        <article className="chapitre" ref={article}>
          <header className="chapitre-tete">
            <div className="chapitre-livre">
              <Link to={base} className="eyebrow">Tome {tome.numero} · {tome.titre}</Link>
              <MotsCles mots={motsCles} cibles={cibles} />
            </div>
            {chapitre.titre && <p className="chapitre-num">{libelleChapitre(chapitre)}</p>}
            <h1 className="page-title">{chapitre.titre ?? libelleChapitre(chapitre)}</h1>
            <div className="chapitre-outils no-print">
              <button
                type="button"
                ref={boutonSommaire}
                className="btn btn-petit bouton-sommaire"
                aria-expanded={tiroir}
                onClick={() => setTiroir(true)}
              >
                <IconList size={18} aria-hidden="true" /> Sommaire
              </button>
              <FiltrePistes />
            </div>
          </header>

          {chapitre.banniere && <MarquePage>{chapitre.banniere}</MarquePage>}

          {arrets.map((arret, i) => {
            const titre = titreArret(arret);
            const suivantArret = arrets[i + 1];
            const prochainePage =
              suivantArret?.page != null && suivantArret.page !== arret.page ? suivantArret.page : null;
            return (
              <section key={i} className="arret" aria-label={titre ?? 'Introduction'}>
                {titre && (
                  <h2 className="arret-titre">
                    <span>{titre}</span>
                  </h2>
                )}
                <BlockRenderer blocs={arret.blocs} prefixe={`a${i}`} />
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
                  {precedent.titre ?? 'Chapitre précédent'}
                </span>
              </Link>
            ) : <span />}
            {suivant && (
              <Link className="btn suivant" to={`${base}/${suivant.slug}`}>
                <span>
                  <span className="nav-sous">{libelleChapitre(suivant)}</span>
                  {suivant.titre ?? 'Chapitre suivant'}
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
