import type { SeasonDetailsResponse } from '@app/types/tv-types';
import { type BaseParams, MediaType } from '@app/types/index';
import { EpisodeArticle } from './episode-article';
import { $api } from '@/app/_shared/api/api-interceptor';

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

interface EpisodeListProps {
  seriesId: number;
  seasonNumber: number;
}

export default async function EpisodeList({
  seriesId,
  seasonNumber,
}: EpisodeListProps) {
  const { data: season } = await getSeasonDetails(seriesId, seasonNumber);

  // TEMP
  if (!season || !season.episodes?.length) return null;

  return (
    <section className='space-y-4'>
      {season.episodes.map((episode) => (
        <EpisodeArticle
          seriesId={seriesId}
          key={episode.id}
          episode={episode}
        />
      ))}
    </section>
  );
}
