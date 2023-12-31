import type { MediaType } from '@config/enums';
import { MSeparator } from '@ui/separator';
import { getCreationImages } from '@actions/getCreationImages';
import { Heading } from '@components/heading';
import { MediaTabs } from '@components/media-tabs';

interface MediaTabsProps {
  mediaType: MediaType;
  creationId: number;
}

export default async function CreationMediaTabs({
  creationId,
  mediaType,
}: MediaTabsProps) {
  const [images, error] = await getCreationImages(creationId, mediaType);

  if (error) return null;

  return (
    <section>
      <Heading title='Media' description='Resources that may interest you.' />
      <MSeparator className='my-4' />
      <MediaTabs images={images} />
    </section>
  );
}
