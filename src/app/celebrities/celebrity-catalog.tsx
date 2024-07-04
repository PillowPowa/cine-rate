'use client';

import { type ComponentProps, useEffect, useState } from 'react';
import ky from 'ky';
import type { IPagination } from '#types/index';
import type { CelebritiesResponse } from '#types/person-types';
import useInfiniteScroll from '#hooks/useInfiniteScroll';
import { initialPagination } from '#config/pagination';
import { PersonArticle } from '#components/article/person-article';
import { CatalogSkeletonGroup } from '#components/skeleton/catalog-skeleton-group';
import { cn } from '#libs/index';

type Celebrities = CelebritiesResponse['results'];

interface CreationCatalogProps extends ComponentProps<'div'> {}

export function CelebrityCatalog({
  className,
  ...props
}: CreationCatalogProps) {
  const [items, setItems] = useState<Celebrities | null>(null);
  const [{ currentPage }, setPagination] =
    useState<IPagination>(initialPagination);

  const getData = async () => {
    const searchParams = {
      page: currentPage + 1,
    };
    return ky
      .get('api/celebrities', { searchParams, cache: 'force-cache' })
      .then((res) => res.json<CelebritiesResponse>())
      .then((data) => {
        setItems((prev) => [...(prev || []), ...data.results]);
        setPagination((prev) => ({ ...prev, currentPage: data.page }));
      })
      .catch(() => setItems(null));
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => void getData(), []);
  const { canScroll } = useInfiniteScroll(getData, currentPage);

  function handleItems() {
    if (!items) return <CatalogSkeletonGroup itemsCount={20} />;

    return items.map((celebrity, i) => (
      <PersonArticle
        custom={i}
        key={celebrity.id}
        celebrity={celebrity}
        className='mb-4 w-2/5 grow md:w-[260px]'
      />
    ));
  }

  return (
    <section className={cn('flex flex-wrap gap-4', className)} {...props}>
      {handleItems()}
      {!canScroll && <CatalogSkeletonGroup />}
    </section>
  );
}