import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { getCreationKeywords } from '#actions/getCreationKeywords';
import type { MediaType } from '#config/enums';
import { Button } from '#ui/button';
import { MSeparator } from '#ui/separator';
import { Heading } from '#components/heading';
import { getCreationTitle } from '#libs/tmdb';
import type { CreationDetailsProps } from './common/types';

interface CreationKeywordsProps extends CreationDetailsProps {
  mediaType: MediaType.Movie | MediaType.TV;
}

export default async function CreationKeywords({
  mediaType,
  details,
}: CreationKeywordsProps) {
  const t = await getTranslations('Creations.CreationKeywords');
  const [data, error] = await getCreationKeywords(details.id, mediaType);

  if (error || !data?.keywords?.length) return null;

  return (
    <div>
      <Heading
        title={t('title')}
        description={t('description', { title: getCreationTitle(details) })}
      />
      <MSeparator className='my-4' />

      <div className='flex flex-wrap gap-2'>
        {data.keywords.map((keyword) => (
          <Link
            href={{
              pathname: `/${mediaType}`,
              query: {
                with_keywords: keyword.name,
              },
            }}
            key={keyword.id}
            passHref
            legacyBehavior
          >
            <Button className='h-7 truncate text-sm' variant='outline'>
              {keyword.name}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
