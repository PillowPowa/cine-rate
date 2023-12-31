import type { CreationDetailsProps } from './common/types';
import { BaseFigure } from '@components/figure/base-figure';
import { MSeparator } from '@ui/separator';
import { getTitle } from './common/utils';
import { CreationGenres } from './creation-genres';
import { Heading } from '../heading';

export default function CreationOverview({ details }: CreationDetailsProps) {
  return (
    <section>
      <Heading
        title='About'
        description={(details.tagline || `About ${getTitle(details)}`) + '.'}
      />
      <MSeparator className='my-4' />
      <div className='flex space-x-4 sm:space-x-0'>
        <BaseFigure
          className='block w-[120px] min-w-[120px] aspect-[2/3] h-fit sm:hidden'
          posterPath={details.poster_path}
          width={320}
          height={550}
        />
        <div className='flex-grow space-y-2 overflow-hidden'>
          <CreationGenres
            className='w-full sm:hidden'
            genres={details.genres.slice(0, 3)}
          />
          <p className='flex-grow break-words text-sm md:text-base'>
            {details.overview || 'No overview found.'}
          </p>
        </div>
      </div>
    </section>
  );
}
