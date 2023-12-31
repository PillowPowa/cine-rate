'use client';

import {
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
  createContext,
  ChangeEvent,
} from 'react';
import type { MediaType } from '@config/enums';
import { Button } from '@ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@ui/dialog';
import type { GetDiscoverParams } from '@actions/getDiscover';
import { ScrollArea, ScrollBar } from '@ui/scroll-area';
import { Label } from '@ui/label';
import { Input } from '@ui/input';
import { MSeparator } from '@ui/separator';
import { CreationGenres } from './creation-genres';
import { CreationLanguage } from './creation-language';
import useQueryParams from '@hooks/useQueryParams';

interface CreationFilterDialogProps {
  mediaType: MediaType;
  children: ReactNode;
}

type FilterDiscoverParams = Partial<GetDiscoverParams>;

export const FilterContext = createContext<
  [FilterDiscoverParams, Dispatch<SetStateAction<FilterDiscoverParams>>]
>([{}, () => null]);

function toISO(stringDate: string) {
  if (!stringDate) return undefined;
  return new Date(stringDate).toISOString().split('T')[0];
}

export function CreationFilterDialog({
  mediaType,
  children,
}: CreationFilterDialogProps) {
  const { setQueryParams, urlSearchParams } = useQueryParams();
  const searchParamsObj = Object.fromEntries(urlSearchParams.entries());
  const [filter, setFilter] = useState<FilterDiscoverParams>(searchParamsObj);

  const updateFilter = (params: FilterDiscoverParams) => {
    return setFilter((prev) => ({ ...prev, ...params }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filtering</DialogTitle>
          <DialogDescription>
            Refine your film experience with our cutting-edge filters.
          </DialogDescription>
        </DialogHeader>
        <FilterContext.Provider value={[filter, setFilter]}>
          <ScrollArea>
            <div className='mr-4 max-h-[460px] space-y-4 px-2'>
              <h2>Realese Date</h2>
              <div className='flex justify-between gap-4'>
                <div className='grid w-full max-w-sm items-center gap-2'>
                  <Label htmlFor='realese_from'>From</Label>
                  <Input
                    defaultValue={filter['primary_release_date.gte']}
                    onChange={({ target }) =>
                      updateFilter({
                        'primary_release_date.gte': toISO(target.value),
                      })
                    }
                    id='realese_from'
                    type='date'
                  />
                </div>
                <div className='grid w-full max-w-sm items-center gap-2'>
                  <Label htmlFor='realese_to'>To</Label>
                  <Input
                    defaultValue={filter['primary_release_date.lte']}
                    onChange={({ target }) =>
                      updateFilter({
                        'primary_release_date.lte': toISO(target.value),
                      })
                    }
                    id='realese_to'
                    type='date'
                  />
                </div>
              </div>
              <MSeparator className='my-4' />

              <CreationLanguage />
              <CreationGenres mediaType={mediaType} />
            </div>
            <ScrollBar orientation='vertical' />
          </ScrollArea>
          <DialogFooter className='pt-4'>
            <DialogClose asChild>
              <Button onClick={() => setQueryParams(filter)}>Search</Button>
            </DialogClose>
          </DialogFooter>
        </FilterContext.Provider>
      </DialogContent>
    </Dialog>
  );
}
