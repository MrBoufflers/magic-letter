// Drapeau de rallye à damier (SVG original), à côté du libellé « Piste noire ».
export default function DrapeauRallye({ size = 18 }) {
  return (
    <svg className="icone-piste" width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M5 21V3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M5.8 4h14v10h-14z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <g fill="currentColor">
        <rect x="5.8" y="4" width="3.5" height="3.33" />
        <rect x="12.8" y="4" width="3.5" height="3.33" />
        <rect x="9.3" y="7.33" width="3.5" height="3.33" />
        <rect x="16.3" y="7.33" width="3.5" height="3.33" />
        <rect x="5.8" y="10.67" width="3.5" height="3.33" />
        <rect x="12.8" y="10.67" width="3.5" height="3.33" />
      </g>
    </svg>
  );
}
