import type { HTMLAttributes } from 'react';
import { buildImagePath } from '@libs/tmdb';
import { cn } from '@libs/index';
import { ICreation } from '@app/types/creation-types';
import Image from 'next/image';
import { BookmarkPlus, Star } from 'lucide-react';
import { Button } from '../ui/button';
import { YoutubePlayer } from '../youtube-player';

export interface CreationCardProps extends HTMLAttributes<HTMLDivElement> {
  width: number;
  height: number;

  creation: ICreation;
  size?: 'default' | 'sm';
}

export function CreationCard({
  creation,
  width,
  height,
  className,
  size = 'default',
  ...props
}: CreationCardProps) {
  const title =
    creation.title || creation.original_title || creation.original_name;

  return (
    <div className='group relative'>
      <article
        className={cn(
          'relative snap-center space-y-2 group-hover:opacity-0',
          className
        )}
        {...props}
      >
        <figure className='relative overflow-hidden rounded-md'>
          <Image
            className={cn(
              'object-fit h-auto w-auto transition-all ease-in-out hover:scale-105',
              size === 'default' ? 'aspect-[4/6]' : 'aspect-[16/9]'
            )}
            src={buildImagePath(
              size === 'default' ? creation.poster_path : creation.backdrop_path
            )}
            alt='Poster Image'
            width={width}
            height={height}
          />
          <div className='absolute right-2 top-2 flex gap-2'>
            <Button className='h-7 w-7' size='icon' variant='outline'>
              <BookmarkPlus className='h-4 w-4' />
            </Button>
            <Button className='h-7 w-7' size='icon' variant='outline'>
              <Star className='h-4 w-4' />
            </Button>
          </div>
        </figure>
        <div className='space-y-1'>
          <h2
            className='text-md truncate font-semibold tracking-tight'
            title={title}
          >
            {title}
          </h2>
          <div className='flex items-center justify-between text-xs'>
            <div className='flex items-center space-x-1.5'>
              <Star className='h-4 w-4 fill-yellow-300 text-yellow-400' />
              <span>{creation.vote_average.toFixed(1)}</span>
            </div>
            <span>({creation.vote_count} reviews)</span>
          </div>
        </div>
      </article>
      <article className='border-md absolute left-0 top-0 z-10 hidden h-[150px] w-[250px] scale-150 overflow-hidden bg-red-500 group-hover:block'>
      </article>
    </div>
  );
}
