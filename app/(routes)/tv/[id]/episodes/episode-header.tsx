import type { ITVDetails } from '@app/types/tv-types';
import { memo } from 'react';
import { ImageFromPath } from '@components/image/image-from-path';
import { CreationStates } from '@components/creation/creation-states';
import { getTitle } from '@components/creation/common/utils';
import { buildImagePath } from '@libs/tmdb';
import Link from 'next/link';

interface EpisodeHeaderProps {
  series: ITVDetails;
}

const EpisodeHeader = memo(({ series }: EpisodeHeaderProps) => {
  return (
    <header className='flex w-full flex-col items-center gap-4 overflow-hidden rounded-md border p-4 sm:flex-row'>
      <div className='w-full sm:w-fit'>
        <ImageFromPath
          className='block aspect-[16/9] w-full min-w-[160px] rounded-md sm:w-[160px]'
          alt='Series Poster'
          src={buildImagePath({
            path: series.backdrop_path,
            scale: 'backdrop',
          })}
          width={260}
          height={390}
        />
      </div>
      <div className='flex flex-grow flex-col items-center justify-between gap-4 sm:flex-row'>
        <div className='text-center sm:text-left'>
          <div className='flex items-center gap-1.5'>
            <Link
              className='text-xl text-blue-500 transition-all hover:underline'
              href={`/tv/${series.id}`}
            >
              {getTitle(series)}
            </Link>
            <span className='text-sm text-foreground/70'>
              ({new Date(series.first_air_date).getFullYear()})
            </span>
          </div>
          <h2 className='text-2xl font-semibold'>Episode List</h2>
        </div>
        <CreationStates details={series} />
      </div>
    </header>
  );
});

EpisodeHeader.displayName = 'EpisodeHeader';

export default EpisodeHeader;
