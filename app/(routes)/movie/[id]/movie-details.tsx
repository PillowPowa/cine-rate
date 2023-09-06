import type { IMovieDetails } from '@app/types/movies-types';
import CreationKeywords from '@/app/_components/creation/creation-keywords';
import { getTitle } from '@components/creation/common/utils';
import { Separator } from '@ui/separator';
import { HTMLAttributes } from 'react';

interface MovieDetailsProps extends HTMLAttributes<HTMLDivElement> {
  details: IMovieDetails;
}

export default async function MovieDetails({
  details,
  ...props
}: MovieDetailsProps) {
  return (
    <div {...props}>
      <section>
        <div className='flex items-center justify-between'>
          <div className='space-y-1'>
            <h2 className='text-2xl font-semibold tracking-tight'>Details</h2>
            <p className='truncate text-sm text-muted-foreground'>
              Interesting about {getTitle(details)}.
            </p>
          </div>
        </div>
        <Separator className='my-4' />

        <ul className='space-y-6'>
          <li>
            <span className='font-semibold'>Status</span>
            <p className='text-foreground/70'>{details.status}</p>
          </li>

          <li>
            <span className='font-semibold'>Original Language</span>
            <p className='text-foreground/70'>
              {details.original_language.toUpperCase()}
            </p>
          </li>

          <li>
            <span className='font-semibold'>Budget</span>
            <p className='text-foreground/70'>
              {details.budget.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </p>
          </li>

          <li>
            <span className='font-semibold'>Revenue</span>
            <p className='text-foreground/70'>
              {details.revenue.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </p>
          </li>

          <li>
            <span className='font-semibold'>Production Companies</span>
            <p className='text-foreground/70'>
              {details.production_companies.map(company => company.name).join(', ')}
            </p>
          </li>
        </ul>
      </section>

      <CreationKeywords details={details} />
    </div>
  );
}