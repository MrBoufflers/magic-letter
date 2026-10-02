import { Link } from 'react-router-dom';
import { IconHome } from '@tabler/icons-react';
import useDocumentTitle from '../lib/useDocumentTitle';

export default function NotFound() {
  useDocumentTitle('Page introuvable');
  return (
    <div className="page prose-w" style={{ textAlign: 'center', marginInline: 'auto' }}>
      <p className="tome-num ornament" aria-hidden="true" style={{ fontSize: '4rem' }}>404</p>
      <h1 className="page-title">Page introuvable</h1>
      <p className="lead" style={{ marginBottom: '1.5rem' }}>Cette page n’existe pas ou a changé d’adresse.</p>
      <Link to="/" className="btn">
        <IconHome size={18} aria-hidden="true" /> Retour à l’accueil
      </Link>
    </div>
  );
}
