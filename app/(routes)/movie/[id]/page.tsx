import type { INextPageParams } from '@app/types/index';
import { MediaType } from '@config/enums';
import dynamic from 'next/dynamic';

import CreationCast from '@components/creation/creation-cast';
import CreationHeader from '@components/creation/creation-header';
import CreationOverview from '@components/creation/creation-overview';
import CreationSimilar from '@components/creation/creation-similar';
import CreationMediaTabs from '@components/creation/creation-media-tabs';
import CreationCollection from '@components/creation/creation-collection';

const CreationReviews = dynamic(
  () => import('@components/creation/creation-reviews'),
  { ssr: false }
);

import MovieDetails from './movie-details';

import { getCreationDetails } from '@actions/getCreationDetails';
import { pipe } from '@libs/common/next';
import { generateCreationMetadata } from '@libs/common/metadata';
import { notFound } from 'next/navigation';

export const generateMetadata = generateCreationMetadata(MediaType.Movie);

export default async function MoviePage({ params }: INextPageParams) {
  const paramId = pipe.strToInt(params?.id);
  const [movie, error] = await getCreationDetails(paramId, MediaType.Movie);

  if (error) return notFound();

  return (
    <main className='min-h-screen w-full space-y-6'>
      <CreationHeader details={movie} mediaType={MediaType.Movie} />
      <section className='flex flex-col gap-4 md:flex-row'>
        <div className='flex-grow space-y-6 overflow-hidden'>
          <CreationOverview details={movie} />
          <CreationCast creationId={movie.id} mediaType={MediaType.Movie} />
          {movie.belongs_to_collection && (
            <CreationCollection collectionId={movie.belongs_to_collection.id} />
          )}
          <CreationMediaTabs
            creationId={movie.id}
            mediaType={MediaType.Movie}
          />
          <CreationSimilar creationId={movie.id} mediaType={MediaType.Movie} />
          <CreationReviews creationId={movie.id} mediaType={MediaType.Movie} />
        </div>
        <MovieDetails
          className='w-full min-w-[260px] space-y-6 sm:w-[260px]'
          details={movie}
        />
      </section>
    </main>
  );
}
