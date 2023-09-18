import { SkeletonArticle } from './article/skeleton-article';

interface CatalogSkeletonGroupProps {
  itemsCount?: number;
}

export function CatalogSkeletonGroup({
  itemsCount = 10,
}: CatalogSkeletonGroupProps) {
  return Array.from({ length: itemsCount }, (_, index) => (
    <SkeletonArticle
      key={index}
      className='mb-4 w-[40%] flex-grow md:w-[260px]'
    />
  ));
}