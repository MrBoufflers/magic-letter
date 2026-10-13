import { useEffect } from 'react';
import { site } from '../data/config';

export default function useDocumentTitle(titre) {
  useEffect(() => {
    document.title = titre ? `${titre} · ${site.nom}` : site.nom;
  }, [titre]);
}
