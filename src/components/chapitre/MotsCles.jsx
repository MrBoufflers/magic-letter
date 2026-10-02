export default function MotsCles({ mots, label = 'Mots-clés' }) {
  if (!mots || mots.length === 0) return null;
  return (
    <ul className="mots-cles" aria-label={label}>
      {mots.map((m) => (
        <li key={m} className="rune">{m}</li>
      ))}
    </ul>
  );
}
