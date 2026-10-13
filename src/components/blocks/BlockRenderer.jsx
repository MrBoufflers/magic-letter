import registry from './registry';

// `prefixe` sert à donner un identifiant stable à chaque bloc (ancres des mots-clés).
export default function BlockRenderer({ blocs, prefixe = 'bloc' }) {
  if (!Array.isArray(blocs)) return null;
  return (
    <div className="blocs">
      {blocs.map((bloc, i) => {
        const Composant = bloc && registry[bloc.type];
        if (!Composant) {
          if (import.meta.env.DEV) console.warn(`[BlockRenderer] type de bloc inconnu : "${bloc?.type}"`);
          return null;
        }
        const { type: _type, ...props } = bloc;
        return (
          <div key={i} id={`${prefixe}-${i}`} className="ancre" data-type={bloc.type}>
            <Composant {...props} />
          </div>
        );
      })}
    </div>
  );
}
