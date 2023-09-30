import type { CreationImagesResponse } from '@app/types/creation-types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/tabs';
import { ImageFromPath } from '@components/image/image-from-path';
import { Carousel } from '@components/carousel';
import { NotFound } from '@components/not-found';
import Link from 'next/link';
import { TMDB_IMAGE_URL, buildImagePath } from '@libs/tmdb';

interface MediaTabsProps {
  images: CreationImagesResponse | null;
}

export function MediaTabs({ images }: MediaTabsProps) {
  const isEmpty = !images?.backdrops.length && !images?.posters.length;

  if (!isEmpty) {
    return (
      <Tabs
        className='my-2'
        defaultValue={images?.backdrops.length ? 'backdrops' : 'posters'}
      >
        <TabsList>
          <TabsTrigger value='backdrops' disabled={!images?.backdrops.length}>
            Backdrops
          </TabsTrigger>
          <TabsTrigger value='posters' disabled={!images?.posters.length}>
            Posters
          </TabsTrigger>
        </TabsList>
        <TabsContent value='backdrops'>
          <Carousel>
            {images.backdrops.slice(0, 20).map((image, index) => (
              <div className='relative' key={image.file_path}>
                <div className='aspect-[16/9] h-[150px] overflow-hidden rounded-md lg:h-[300px]'>
                  <ImageFromPath
                    className='h-full w-auto object-cover'
                    src={buildImagePath({
                      path: image.file_path,
                      scale: 'backdrop',
                    })}
                    alt={`Image #${index}`}
                    width={720}
                    height={480}
                  />
                </div>
                <Link
                  className='absolute bottom-2 left-2 text-xs text-foreground/70 transition-all hover:text-foreground hover:underline'
                  href={TMDB_IMAGE_URL + 'original' + image.file_path}
                  target='_blank'
                >
                  Open original (high resolution)
                </Link>
              </div>
            ))}
          </Carousel>
        </TabsContent>
        <TabsContent value='posters'>
          <Carousel>
            {images.posters.slice(0, 20).map((image, index) => (
              <div
                className='aspect-[2/3] h-[150px] overflow-hidden rounded-md md:h-[300px]'
                key={image.file_path}
              >
                <ImageFromPath
                  className='h-full w-auto object-cover'
                  src={buildImagePath({
                    path: image.file_path,
                    scale: 'poster',
                  })}
                  alt={`Image #${index}`}
                  width={260}
                  height={390}
                />
              </div>
            ))}
          </Carousel>
        </TabsContent>
      </Tabs>
    );
  }

  return <NotFound />;
}
