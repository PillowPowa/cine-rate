import { type ImageProps } from 'next/image';
import { buildImagePath } from '@libs/tmdb';
import { cn } from '../../_libs';
import { ImageFromPath } from '../image/image-from-path';

interface BaseFigureProps extends Omit<ImageProps, 'alt' | 'src'> {
  alt?: string;
  className?: string;
  posterPath: string;
}

export function BaseFigure({
  posterPath,
  alt,
  className,
  ...props
}: BaseFigureProps) {
  return (
    <figure className={cn('w-full overflow-hidden rounded-md', className)}>
      <ImageFromPath
        className={
          'h-auto w-full object-cover transition-all ease-in-out hover:scale-105'
        }
        src={buildImagePath({ path: posterPath, scale: 'poster' })}
        alt={alt || 'Creation Poster'}
        {...props}
      />
    </figure>
  );
}
