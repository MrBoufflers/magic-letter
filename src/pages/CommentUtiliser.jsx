import useDocumentTitle from '../lib/useDocumentTitle';

// Contenu (Introduction et Mode d'emploi du tome 1, légende des blocs) : phase 3.
export default function CommentUtiliser() {
  useDocumentTitle('Comment utiliser le site');
  return (
    <div className="page">
      <header className="prose-w">
        <h1 className="page-title">Comment utiliser le site</h1>
      </header>
      <p className="notice prose-w">Cette page est en préparation.</p>
    </div>
  );
}
