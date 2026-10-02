// Impression d'un seul élément (un exercice) : le marque le temps de l'impression.
export function imprimerElement(el) {
  if (!el) {
    window.print();
    return;
  }
  el.classList.add('a-imprimer');
  document.documentElement.classList.add('impression-ciblee');
  const fin = () => {
    el.classList.remove('a-imprimer');
    document.documentElement.classList.remove('impression-ciblee');
    window.removeEventListener('afterprint', fin);
  };
  window.addEventListener('afterprint', fin);
  window.print();
}
