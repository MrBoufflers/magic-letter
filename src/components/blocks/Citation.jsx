import { ligneSource } from '../../data/config';
import { useTomeCourant } from '../../lib/contexts';

export default function Citation({ page, titre, texte }) {
  const tome = useTomeCourant();
  return (
    <figure className="bloc citation">
      {titre && <p className="bloc-titre">{titre}</p>}
      {page != null && <span className="pastille-page">p.&nbsp;{page}</span>}
      <blockquote className="citation-texte">
        <span className="guillemet" aria-hidden="true">«</span>
        <div className="citation-corps">
          {texte}
        </div>
      </blockquote>
      <figcaption className="citation-source">{ligneSource(tome, page)}</figcaption>
    </figure>
  );
}
