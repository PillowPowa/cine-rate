import { buildImagePath } from '@libs/tmdb';
import type { ICelebrity } from '@app/types/celebrity-types';
import {
  BaseArticleProps,
  BaseArticle,
  BaseArticleContent,
  BaseArticleFigure,
} from './base-article';
import Link from 'next/link';

interface CelebrityArticleProps extends Omit<BaseArticleProps, 'src' | 'href'> {
  celebrity: ICelebrity;
}

export function CelebrityArticle({
  celebrity,
  ...props
}: CelebrityArticleProps) {
  return (
    <BaseArticle {...props}>
      <Link href={`/celebrities/${celebrity.id}`}>
        <BaseArticleFigure
          aspect='vertical'
          src={buildImagePath(celebrity.profile_path)}
          alt='Person Avatar'
          width={480}
          height={854}
        />
      </Link>
      <BaseArticleContent>
        <h2 className='text-md truncate font-semibold tracking-tight'>
          {celebrity.name}
        </h2>
        <div className='flex items-center justify-between text-xs'>
          <span>{celebrity.known_for_department}</span>
          <span>{celebrity.popularity.toFixed(1)}</span>
        </div>
      </BaseArticleContent>
    </BaseArticle>
  );
}