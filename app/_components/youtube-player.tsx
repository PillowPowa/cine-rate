'use client';

import { cn } from '@libs/index';
import { videoFormat } from 'ytdl-core';
import { Loader2, Play } from 'lucide-react';
import { useFetch } from '@hooks/useFetch';

interface YoutubePlayerProps {
  url: string;
  className?: string;
}

export function YoutubePlayer({ url, className }: YoutubePlayerProps) {
  // TODO: error handling
  const { data: format, error } = useFetch<videoFormat>('/api/stream/video', {
    params: { url },
  });

  return (
    <figure
      className={cn(
        'relative grid place-items-center overflow-hidden rounded-md bg-black',
        className
      )}
    >
      {format ? (
        <div className='relative h-full w-full'>
          <video
            className='absolute bottom-0 w-full object-cover align-top'
            src={format.url}
            width='100%'
            height='100%'
            muted
            loop
            playsInline
          >
            Your browser does not support the video tag.
          </video>
          <div className='absolute bottom-0 left-0 p-4'>
            <div className='flex cursor-pointer items-center transition-all hover:underline'>
              <Play className='mr-2 h-5 w-5 sm:h-8 sm:w-8' />
              <span className='text-sm sm:text-base'>Play trailer</span>
            </div>
          </div>
        </div>
      ) : (
        <div className='grid h-full w-full place-items-center text-center'>
          <div className='flex flex-col items-center justify-center space-y-1'>
            <Loader2 className='h-[64px] w-[64px] animate-spin' />
            <span className='text-sm text-foreground/70'>
              Processing data...
            </span>
          </div>
        </div>
      )}
    </figure>
  );
}
