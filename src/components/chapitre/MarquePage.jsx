import { IconBookmark } from '@tabler/icons-react';

export default function MarquePage({ page, children }) {
  return (
    <p className="marque-page">
      <IconBookmark size={18} aria-hidden="true" />
      {children ?? <>Prochain arrêt&nbsp;: page&nbsp;{page}</>}
    </p>
  );
}
