import { Link } from 'react-router-dom';
import { IconBookmark, IconFeather, IconFlame, IconPrinter, IconTextSize, IconTrafficCone, IconSun, IconMoon } from '@tabler/icons-react';
import useDocumentTitle from '../lib/useDocumentTitle';
import MotifEtoiles from '../components/ornaments/MotifEtoiles';
import DrapeauRallye from '../components/ornaments/DrapeauRallye';
import { FormePiste } from '../components/blocks/Piste';
import { Definition } from '../components/contenu';
import { entete, introduction, modeEmploi } from '../data/commentUtiliser';

// Légende des capsules et des boutons du site (textes d'interface).
const LEGENDE = [
  {
    cle: 'introduction',
    icone: <IconFeather size={22} aria-hidden="true" />,
    nom: 'Introduction',
    texte: 'En tête de chapitre ou de tome : ce qu’il faut savoir avant de commencer. Toujours affichée.',
  },
  {
    cle: 'citation',
    icone: <span className="legende-guillemet" aria-hidden="true">«</span>,
    nom: 'Citation',
    texte: 'Un extrait du livre, recopié à l’identique, avec sa page (pastille « p. 121 ») et sa source.',
  },
  {
    cle: 'verte',
    icone: <FormePiste niveau="verte" size={20} />,
    nom: 'Piste verte',
    texte: 'Les explications essentielles, à lire par tout le monde. Repérée par un rond vert.',
  },
  {
    cle: 'rouge',
    icone: (
      <>
        <FormePiste niveau="rouge" size={20} />
        <IconFlame size={20} aria-hidden="true" />
      </>
    ),
    nom: 'Piste rouge',
    texte: 'Pour aller plus loin, en plus des vertes. Repérée par un carré rouge et une flamme.',
  },
  {
    cle: 'noire',
    icone: (
      <>
        <FormePiste niveau="noire" size={20} />
        <DrapeauRallye size={20} />
      </>
    ),
    nom: 'Piste noire',
    texte: 'Pour les aventuriers : les mécanismes secrets du livre. Repérée par un losange et un drapeau de rallye.',
  },
  {
    cle: 'exercice',
    icone: <IconTrafficCone size={22} aria-hidden="true" />,
    nom: 'Exercice',
    texte: (
      <>
        Ce que vous devez faire ou compléter. Le bouton <IconPrinter size={16} aria-label="Imprimer" /> l’imprime seul, avec ses lignes.
      </>
    ),
  },
  {
    cle: 'marque-page',
    icone: <IconBookmark size={22} aria-hidden="true" />,
    nom: 'Prochain arrêt',
    texte: 'Le ruban indique la page du livre jusqu’à laquelle lire avant le commentaire suivant.',
  },
];

const BOUTONS = [
  {
    cle: 'filtre',
    icone: (
      <span className="legende-formes" aria-hidden="true">
        <FormePiste niveau="verte" size={14} />
        <FormePiste niveau="rouge" size={14} />
        <FormePiste niveau="noire" size={14} />
      </span>
    ),
    nom: 'Verte · + Rouge · + Noire',
    texte: 'En haut de chaque chapitre : choisissez les pistes à déplier. Les autres restent repliées ; touchez leur titre pour les ouvrir. Votre choix est mémorisé.',
  },
  {
    cle: 'mots-cles',
    icone: <span className="rune legende-rune">notion</span>,
    nom: 'Mots-clés',
    texte: 'Les notions du chapitre. Touchez une pastille pour aller directement à la capsule qui l’explique.',
  },
  {
    cle: 'aa',
    icone: <span className="legende-bouton-aa" aria-hidden="true">Aa</span>,
    nom: 'Police adaptée à la dyslexie',
    texte: 'Le bouton « Aa » de l’en-tête affiche tout le site dans une police plus facile à lire, avec plus d’espace.',
  },
  {
    cle: 'taille',
    icone: <IconTextSize size={22} aria-hidden="true" />,
    nom: 'Taille du texte',
    texte: 'Trois tailles de texte, par exemple pour la lecture au tableau.',
  },
  {
    cle: 'theme',
    icone: (
      <>
        <IconSun size={20} aria-hidden="true" />
        <IconMoon size={20} aria-hidden="true" />
      </>
    ),
    nom: 'Clair ou sombre',
    texte: 'Parchemin clair ou nuit profonde : au choix, ou selon le réglage de votre appareil.',
  },
];

function Legende({ items }) {
  return (
    <ul className="legende">
      {items.map((it) => (
        <li key={it.cle} className={`legende-item legende-${it.cle}`}>
          <span className="legende-icone">{it.icone}</span>
          <span>
            <strong className="legende-nom">{it.nom}</strong>
            <span className="legende-texte">{it.texte}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function CommentUtiliser() {
  useDocumentTitle('Comment utiliser le site');
  const { pistes, notions, organisation } = modeEmploi.fonctionnement;
  return (
    <div className="page howto">
      <header className="howto-hero">
        <MotifEtoiles />
        <p className="eyebrow howto-eyebrow">Comment utiliser le site</p>
        <h1 className="page-title">{entete.titre}</h1>
        <p className="lead howto-lead">{entete.sousTitre}</p>
        <nav aria-label="Dans cette page" className="howto-sommaire">
          <a href="#legende">Légende</a>
          <a href="#introduction">Introduction</a>
          <a href="#mode-emploi">Mode d’emploi</a>
        </nav>
      </header>

      <section id="legende" className="howto-section" aria-labelledby="titre-legende">
        <h2 id="titre-legende">Légende</h2>
        <h3 className="howto-h3">Les capsules</h3>
        <Legende items={LEGENDE} />
        <h3 className="howto-h3">Les boutons</h3>
        <Legende items={BOUTONS} />
      </section>

      <section id="introduction" className="howto-section prose-w" aria-labelledby="titre-intro">
        <h2 id="titre-intro">{introduction.titre}</h2>
        <Definition terme="Introduction">
          <p>{introduction.definition}</p>
        </Definition>
        {introduction.parties.map((p, i) => (
          <article key={i} className="howto-carte">
            <h3>{p.titre}</h3>
            <div className="howto-texte">{p.contenu}</div>
          </article>
        ))}
      </section>

      <section id="mode-emploi" className="howto-section prose-w" aria-labelledby="titre-mode">
        <h2 id="titre-mode">{modeEmploi.titre}</h2>

        <article className="howto-carte">
          <h3>{modeEmploi.prendreDesNotes.titre}</h3>
          <div className="howto-texte">{modeEmploi.prendreDesNotes.contenu}</div>
        </article>

        <article className="howto-carte">
          <h3>{modeEmploi.fonctionnement.titre}</h3>

          <h4>{pistes.titre}</h4>
          <p>{pistes.avant}</p>
          <div className="howto-pistes">
            <div className="howto-piste piste-verte">
              <p className="howto-piste-nom"><FormePiste niveau="verte" /> Piste verte</p>
              <p>{pistes.verte}</p>
            </div>
            <div className="howto-piste piste-rouge">
              <p className="howto-piste-nom"><FormePiste niveau="rouge" /> Piste rouge <IconFlame size={18} aria-hidden="true" /></p>
              <p>{pistes.rouge}</p>
            </div>
            <div className="howto-piste piste-noire">
              <p className="howto-piste-nom"><FormePiste niveau="noire" /> Piste noire <DrapeauRallye /></p>
              {pistes.noire}
            </div>
          </div>

          <h4>{notions.titre}</h4>
          <p>{notions.contenu}</p>

          <h4>{organisation.titre}</h4>
          <p>{organisation.avant}</p>
          <ol className="howto-etapes">
            {organisation.etapes.map((e, i) => (
              <li key={i}>
                <span className="howto-num" aria-hidden="true">{i + 1})</span>
                <span>{e}</span>
              </li>
            ))}
          </ol>
        </article>

        <p className="howto-fin">
          <Link to="/" className="btn">Retour aux tomes</Link>
        </p>
      </section>
    </div>
  );
}
