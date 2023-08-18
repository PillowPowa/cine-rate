import { CreationArticle } from '@components/article/creation-article';
import { ScrollBar, ScrollArea } from '@ui/scroll-area';
import { Separator } from '@ui/separator';
import { getSimilar } from '@actions/getSimilar';

interface SimilarCreationsProps {
  movieId: number;
}

export async function SimilarCreations({ movieId }: SimilarCreationsProps) {
  const { data: creations } = await getSimilar(movieId);

  if (!creations) return null;

  return (
    <section>
      <div className='mt-6 flex items-center justify-between'>
        <div className='space-y-1'>
          <h2 className='text-2xl font-semibold tracking-tight'>Similar</h2>
          <p className='text-sm text-muted-foreground'>More like this.</p>
        </div>
      </div>
      <Separator className='my-4' />
      <ScrollArea>
        <section className='flex snap-x space-x-4 pb-4'>
          {creations.results.map((creation) => (
            <CreationArticle
              key={creation.id}
              creation={creation}
              className='w-[260px]'
              size='sm'
              width={720}
              height={480}
            />
          ))}
        </section>
        <ScrollBar className='' orientation='horizontal' />
      </ScrollArea>
    </section>
  );
}
