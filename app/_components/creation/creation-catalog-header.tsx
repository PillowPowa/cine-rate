import { Button } from '@ui/button';

import { CreationFilterDialog } from '@components/dialog/creation-filter-dialog';
import { CreationSortSelect } from '@components/select/creation-sort-select';
import { CreationShowSelect } from '@components/select/creation-show-select';

import { Filter } from 'lucide-react';

import { Sort as MoviesSort } from '@actions/getMovies';
import { Sort as SeriesSort } from '@actions/getTV';
import { MediaType } from '@app/types/index';

interface CreationCatalogHeaderProps {
    mediaType: MediaType;
    Sort: typeof MoviesSort | typeof SeriesSort;
}

export default function CreationCatalogHeader({ mediaType, Sort }: CreationCatalogHeaderProps) {
  return (
    <header className='flex gap-2 overflow-hidden py-2'>
      <CreationFilterDialog mediaType={mediaType}>
        <Button size='icon' variant='outline' title='Filter'>
          <Filter className='h-5 w-5' />
        </Button>
      </CreationFilterDialog>

      <CreationSortSelect Sort={Sort} />
      <CreationShowSelect />
    </header>
  );
}
