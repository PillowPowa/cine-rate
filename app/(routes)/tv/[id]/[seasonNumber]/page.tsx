import { intParamPipe } from '@libs/common/next';
import { MediaType, type INextPageParams, BaseParams } from '@app/types/index';
import type { SeasonDetailsResponse } from '@app/types/tv-types';
import { $api } from '@/app/_shared/api/api-interceptor';
import { Star } from 'lucide-react';
import {
  BaseArticle,
  BaseArticleFigure,
} from '@/app/_components/article/base-article';
import { buildImagePath } from '@/app/_libs/tmdb';

async function getSeasonDetails(
  seriesId: number,
  seasonNumber: number,
  params?: BaseParams
) {
  return $api.get<SeasonDetailsResponse>(
    `/3/${MediaType.TV}/${seriesId}/season/${seasonNumber}`,
    { params }
  );
}

export default async function SeasonPage({ params }: INextPageParams) {
  const seriesId = intParamPipe('id', params);
  const seasonNumber = intParamPipe('seasonNumber', params);
  const { data: season } = await getSeasonDetails(seriesId, seasonNumber);

  // TEMP
  if (!season) return null;

  return (
    <main className='min-h-screen w-full space-y-6'>
      {season.episodes.map((episode) => (
        <BaseArticle
          className='space-y-4 rounded-md border p-4'
          key={episode.id}
        >
          <section className='flex w-full flex-col items-center gap-4 sm:flex-row'>
            <div className='w-full sm:w-fit'>
              <BaseArticleFigure
                className='w-full sm:w-[260px] sm:min-w-[260px]'
                src={buildImagePath({
                  path: episode.still_path,
                  scale: 'backdrop',
                })}
                aspect='horizontal'
                width={500}
                height={282}
                alt='Episode Poster'
              />
            </div>
            <div className='space-y-1.5'>
              <div>
                <span className='font-semibold'>
                  {episode.episode_number}. {episode.name}
                </span>
                <div className='flex gap-1.5 text-sm'>
                  <div className='flex items-center space-x-1.5'>
                    <Star className='h-4 w-4 fill-yellow-300 text-yellow-400' />
                    <span>{episode.vote_average.toFixed(1)}</span>
                  </div>
                  <span>{new Date(episode.air_date).toDateString()}</span>
                </div>
              </div>
              {!!episode.overview && <p>{episode.overview}</p>}
            </div>
          </section>
        </BaseArticle>
      ))}
    </main>
  );
}