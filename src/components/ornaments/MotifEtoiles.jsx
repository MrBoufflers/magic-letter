import { useId } from 'react';

// Motif décoratif : étoiles et runes inventées (aucun alphabet existant).
export default function MotifEtoiles({ className = 'pattern' }) {
  const id = useId();
  return (
    <svg className={className} aria-hidden="true" focusable="false" width="100%" height="100%">
      <defs>
        <pattern id={id} width="120" height="96" patternUnits="userSpaceOnUse">
          <g fill="currentColor">
            <path d="M14 10l1.8 5.2 5.2 1.8-5.2 1.8L14 24l-1.8-5.2L7 17l5.2-1.8z" />
            <path d="M84 58l1.2 3.4 3.4 1.2-3.4 1.2L84 67.2l-1.2-3.4-3.4-1.2 3.4-1.2z" />
            <circle cx="62" cy="18" r="1.4" />
            <circle cx="104" cy="34" r="1" />
            <circle cx="30" cy="80" r="1.2" />
            <circle cx="112" cy="86" r="1.4" />
          </g>
          <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M44 44v14M44 44l6 5M44 51l-5 4" />
            <path d="M96 10v12M92 14l8 4M92 20l8-6" />
            <path d="M66 74l5 10 5-10M71 84v-14" />
            <path d="M16 50h8M20 46v12l-4 3" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
