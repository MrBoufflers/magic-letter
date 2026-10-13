import { IconBookmark } from '@tabler/icons-react';

export default function MarquePage({ page }) {
  return (
    <p className="marque-page">
      <IconBookmark size={18} aria-hidden="true" />
      Prochain arrêt&nbsp;: page&nbsp;{page}
    </p>
  );
}
