'use client';

import Image, { type ImageProps } from 'next/image';
import { Image as FallbackIcon } from 'lucide-react';
import { cn } from '@libs/index';
import { Skeleton } from '@ui/skeleton';
import { useState } from 'react';

type ImageFromPathProps = Omit<ImageProps, 'src'> & {
  src: string | null;
};

export function ImageFromPath({
  src,
  alt,
  className,
  ...props
}: ImageFromPathProps) {
  const [isLoading, setIsLoading] = useState(true);

  if (!src) {
    return (
      <div
        className={cn(
          'grid h-full w-full place-items-center bg-secondary',
          className
        )}
      >
        <FallbackIcon className='m-auto h-12 w-12 text-primary/70' />
      </div>
    );
  }

  return (
    <Image
      className={cn(
        isLoading && 'animate-pulse rounded-md bg-muted',
        className
      )}
      alt={alt}
      src={src}
      onLoadingComplete={() => setIsLoading(false)}
      {...props}
    />
  );
}
