import type { ReactNode } from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Link as LinkIcon, Twitter } from 'lucide-react';
import type { CreationExternalIds } from '#types/creation-types';
import { TitledSection } from '#components/section/titled';
import { type CreationExternalUrls, buildExternalUrls } from '#libs/tmdb';

interface CreationExternalLinksProps {
  externalIds: CreationExternalIds;
}

const icons = {
  imdb_id: <LinkIcon />,
  facebook_id: <Facebook />,
  instagram_id: <Instagram />,
  twitter_id: <Twitter />,
} as const satisfies Record<keyof CreationExternalUrls, ReactNode>;

export default function CreationExternalLinks({
  externalIds,
}: CreationExternalLinksProps) {
  const urls = Object.entries(buildExternalUrls(externalIds));

  if (!urls.length) return null;

  return (
    <TitledSection
      title='Social Links'
      subTitle='Social links of the creation.'
    >
      <div className='flex w-full gap-4 overflow-x-auto'>
        {urls.map(([icon, url]) => (
          <Link
            className='px-1 opacity-70 transition-opacity first:w-auto hover:opacity-100 [&>svg]:h-[36px]'
            href={url}
            target='_blank'
            key={url}
          >
            {icons[icon as keyof typeof icons]}
            <span className='sr-only'>{icon}</span>
          </Link>
        ))}
      </div>
    </TitledSection>
  );
}
