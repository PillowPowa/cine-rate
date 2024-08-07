'use client';

import { useTransition } from 'react';
import { ArrowDownUp, Loader } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { ITVDetails } from '#types/tv-types';
import useQueryParams from '#hooks/useQueryParams';
import { Button } from '#ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#ui/select';

interface EpisodeFilterProps {
  series: ITVDetails;
}

interface SeasonFilter {
  season?: string | undefined;
  sort: 'asc' | 'desc';
}

export default function EpisodeFilter({ series }: EpisodeFilterProps) {
  const t = useTranslations('EpisodesPage.EpisodeFilter');
  const { urlSearchParams, appendQueryParams } = useQueryParams<SeasonFilter>();
  const [isLoading, startTransition] = useTransition();

  const sorted = urlSearchParams.get('sort') || 'asc';
  const onSortChange = () => {
    startTransition(() => {
      appendQueryParams({ sort: sorted === 'desc' ? 'asc' : 'desc' });
    });
  };

  const selectedValue = urlSearchParams.get('season') || undefined;
  const onValueChange = (newValue: string) => {
    startTransition(() => {
      appendQueryParams({ season: newValue });
    });
  };

  return (
    <section className='flex items-center justify-between gap-2 rounded-md border px-2 py-1'>
      <div className='flex grow items-center justify-between gap-4 overflow-auto px-2 py-1 sm:justify-start'>
        <Select
          value={selectedValue}
          onValueChange={onValueChange}
          disabled={isLoading}
        >
          <SelectTrigger className='w-[160px] truncate'>
            <SelectValue placeholder={t('seasonPlaceholder')} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {series.seasons.map((season) => (
                <SelectItem
                  key={season.id}
                  value={season.season_number.toString()}
                >
                  {season.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <h2>{t('or')}</h2>
        <Select
          value={selectedValue}
          onValueChange={onValueChange}
          disabled={isLoading}
        >
          <SelectTrigger className='w-[160px] truncate'>
            <SelectValue placeholder={t('yearPlaceholder')} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {series.seasons.map((season) => (
                <SelectItem
                  key={season.id}
                  value={season.season_number.toString()}
                >
                  {new Date(season.air_date).getFullYear()}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className='mx-2 hidden sm:inline-block'>
        <Button
          size='icon'
          variant='outline'
          aria-label='episode filter'
          onClick={onSortChange}
        >
          {isLoading ? (
            <Loader className='size-5 animate-spin' />
          ) : (
            <ArrowDownUp className='size-5' />
          )}
        </Button>
      </div>
    </section>
  );
}
