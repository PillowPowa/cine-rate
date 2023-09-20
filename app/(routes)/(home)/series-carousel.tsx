import { MediaType } from '@app/types/index';
import { Separator } from '@ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@ui/tabs';
import { CreationArticle } from '@components/article/creation-article';
import { Carousel } from '@components/carousel';
import { Heading } from '@components/heading';
import { Sort, getTV } from '@actions/getTV';
import { capitalize } from '@libs/index';

async function CreationCarousel({ sort }: { sort: Sort }) {
  const { data } = await getTV(sort).catch(() => ({
    data: null,
  }));

  if (!data) return;

  return (
    <Carousel>
      {data.results.map((creation) => (
        <CreationArticle
          defaultMediaType={MediaType.TV}
          aspect='horizontal'
          key={creation.id}
          creation={creation}
          className='w-[260px]'
          size='sm'
          width={260}
          height={140}
        />
      ))}
    </Carousel>
  );
}

export default function SeriesCarousel() {
  return (
    <section>
      <Heading
        title='Captivating Series'
        description='The most popular and widely known TV series.'
      />
      <Separator className='my-4' />
      <Tabs defaultValue={Sort.TopRated}>
        <TabsList className='w-full md:w-fit'>
          {Object.values(Sort).map((value) => (
            <TabsTrigger key={value} value={value}>
              {capitalize(value, { split: '_' })}
            </TabsTrigger>
          ))}
        </TabsList>
        {Object.values(Sort).map((value) => (
          <TabsContent key={value} value={value}>
            <CreationCarousel sort={value} />
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
