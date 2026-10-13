import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import ScrollToTop from './components/layout/ScrollToTop';
import Accueil from './pages/Accueil';
import CommentUtiliser from './pages/CommentUtiliser';
import Tome from './pages/Tome';
import Chapitre from './pages/Chapitre';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <>
      <a href="#contenu" className="skip-link sr-only-focusable">
        Aller au contenu
      </a>
      <ScrollToTop />
      <Header />
      <main id="contenu" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/comment-utiliser" element={<CommentUtiliser />} />
          <Route path="/tome/:tome" element={<Tome />} />
          <Route path="/tome/:tome/:chapitre" element={<Chapitre />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}
