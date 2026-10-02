import registry from './registry';

export default function BlockRenderer({ blocs }) {
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
        return <Composant key={i} {...props} />;
      })}
    </div>
  );
}
