'use client';

import { type ReactNode, useEffect, useState } from 'react';
import { type HTMLMotionProps, m } from 'framer-motion';
import ky from 'ky';
import { useTranslations } from 'next-intl';
import type { AccountStatesResponse } from '#types/creation-types';
import useFetch from '#hooks/useFetch';
import { useUserStore } from '#store/user';
import { Target, opacityAnimations } from '#config/animations';
import { Popover, PopoverContent, PopoverTrigger } from '#ui/popover';
import { cn } from '#libs/index';
import type { CreationIdentifierProps } from '../common/types';
import { StatesAction, StatesContext, useStatesReducer } from './common/hooks';
import { FavoriteButton } from './favorite-button';
import { RatingButton } from './rating-button';
import { WatchlistButton } from './watchlist-button';

interface CreationStatesProps extends CreationIdentifierProps {
  children: ReactNode;
}

export function StatesPopover({
  creationId,
  mediaType,
  children,
}: CreationStatesProps) {
  const user = useUserStore((state) => state.user);
  const [states, dispatch] = useStatesReducer();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  function handleOpen(open: boolean) {
    if (!user || !open) {
      setIsOpen(false);
    } else if (open && states) {
      setIsOpen(true);
    } else {
      ky.get(`/api/${mediaType}/${creationId}/states`, { cache: 'no-cache' })
        .then((res) => res.json<AccountStatesResponse>())
        .then((data) => {
          dispatch({
            type: StatesAction.SET_STATE,
            payload: { ...data, mediaType },
          });
          setIsOpen(true);
        })
        .catch(() => {
          dispatch({ type: StatesAction.SET_STATE, payload: null });
        });
    }
  }

  return (
    <StatesContext.Provider value={[states, dispatch]}>
      <Popover open={isOpen} onOpenChange={handleOpen}>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent className='w-[110px] p-1'>
          {states && (
            <div className='flex flex-col text-left'>
              <WatchlistButton
                className='h-7 justify-start'
                size='sm'
                variant='ghost'
              />
              <RatingButton
                className='h-7 justify-start'
                size='sm'
                variant='ghost'
              />
              <FavoriteButton
                className='h-7 justify-start'
                size='sm'
                variant='ghost'
              />
            </div>
          )}
        </PopoverContent>
      </Popover>
    </StatesContext.Provider>
  );
}

interface StatesDetailedProps
  extends CreationIdentifierProps,
    HTMLMotionProps<'div'> {}

export function CreationStatesDetailed({
  creationId,
  mediaType,
  className,
  ...props
}: StatesDetailedProps) {
  const t = useTranslations('Creations.AccountStates.CreationStatesDetailed');
  const user = useUserStore((state) => state.user);
  const [states, dispatch] = useStatesReducer();

  const { data } = useFetch<AccountStatesResponse>(
    `/api/${mediaType}/${creationId}/states`,
    { cache: 'no-cache' },
    [user]
  );

  useEffect(() => {
    dispatch({
      type: StatesAction.SET_STATE,
      payload: data ? { ...data, mediaType } : null,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (!states) return null;

  return (
    <StatesContext.Provider value={[states, dispatch]}>
      <m.div
        initial={Target.HIDDEN}
        animate={Target.VISIBLE}
        variants={opacityAnimations}
        className={cn(
          'flex w-full justify-between gap-4 overflow-x-auto sm:w-fit sm:justify-start',
          className
        )}
        {...props}
      >
        <div className='flex w-[120px] flex-col items-center justify-center space-y-1 text-center'>
          <span className='truncate text-xs font-semibold uppercase'>
            {t('favoriteList')}
          </span>
          <FavoriteButton
            className='h-7 text-lg text-white'
            size='sm'
            variant='link'
          />
        </div>

        <div className='flex w-[120px] flex-col items-center justify-center space-y-1 text-center'>
          <span className='truncate text-xs font-semibold uppercase'>
            {t('watchlist')}
          </span>
          <WatchlistButton
            className='h-7 text-lg text-white'
            size='sm'
            variant='link'
          />
        </div>

        <div className='flex w-[120px] flex-col items-center justify-center space-y-1  text-center'>
          <span className='truncate text-xs font-semibold uppercase'>
            {t('rating')}
          </span>
          <RatingButton
            className='h-7 text-lg text-white'
            size='sm'
            variant='link'
          />
        </div>
      </m.div>
    </StatesContext.Provider>
  );
}
