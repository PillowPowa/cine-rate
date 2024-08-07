'use client';

import { useCallback, useState } from 'react';
import ky from 'ky';
import { Loader2, Star, Trash } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type {
  AccountStatesResponse,
  RatingResponse,
} from '#types/creation-types';
import { Button } from '#ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '#ui/dialog';
import { useToast } from '#ui/use-toast';
import { cn } from '#libs/index';
import { rejectKy } from '#libs/ky';
import type { CreationIdentifierProps } from './common/types';

interface CreationRatingDialogProps extends CreationIdentifierProps {
  initialRated: AccountStatesResponse['rated'];
  children: React.ReactNode;
  // TEMP: transition to useSWR
  onUpdate?: (data: { rating: number | null }) => void;
}

export default function CreationRatingDialog({
  initialRated,
  mediaType,
  creationId,
  children,
  onUpdate,
}: CreationRatingDialogProps) {
  const t = useTranslations('Creations.CreationRatingDialog');
  const tt = useTranslations('Toast');
  const [isRated, setIsRated] = useState(!!initialRated);
  const [rating, setRating] = useState(initialRated ? initialRated.value : 1);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const upsertRating = useCallback(
    async (rating: number) => {
      setIsLoading(true);
      return ky
        .post(`/api/${mediaType}/${creationId}/rating`, {
          method: 'POST',
          body: JSON.stringify({
            value: rating,
          }),
        })
        .then((res) => res.json<RatingResponse>())
        .then(() => {
          if (onUpdate) onUpdate({ rating: isRated ? null : rating });
          setIsRated((prev) => {
            return prev || !prev;
          });
          toast({
            title: tt('submitReview.title'),
            description: tt('submitReview.description'),
          });
        })
        .catch(async (error) => {
          const { message } = await rejectKy(error);
          return toast({
            title: tt('error.title'),
            description: tt('error.description', { error: message }),
            variant: 'destructive',
          });
        })
        .finally(() => setIsLoading(false));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isRated]
  );

  const deleteRating = useCallback(async () => {
    setIsLoading(true);
    return ky
      .delete(`/api/${mediaType}/${creationId}/rating`, {
        method: 'DELETE',
      })
      .then(async (res) => {
        if (!res.ok) {
          const { message } = await rejectKy(res);
          return toast({
            title: tt('error.title'),
            description: tt('error.description', { error: message }),
            variant: 'destructive',
          });
        }

        onUpdate?.({ rating: null });
        setIsRated(false);
        setRating(0);
        toast({
          title: tt('deleteReview.title'),
          description: tt('deleteReview.description'),
        });
      })
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className={cn(
          'bottom-0 top-auto translate-y-0 pt-[48px] text-center',
          'sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2'
        )}
      >
        <div className='absolute left-1/2 top-0 grid w-fit -translate-x-1/2 translate-y-[-60%] place-items-center'>
          <Star
            className={cn(
              'size-[72px] fill-blue-500 text-blue-500 transition-all duration-300',
              isRated && 'fill-yellow-500 text-yellow-500'
            )}
            style={{ transform: `scale(1.${((rating - 1) / 2) * 10})` }}
          />
          <h2 className='absolute select-none text-2xl leading-none'>
            {rating}
          </h2>
        </div>
        <DialogHeader className='text-center sm:text-center'>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>
            {isRated ? t('upsertRatingDescription') : t('description')}
          </DialogDescription>
        </DialogHeader>
        <div className='grid h-fit place-items-center'>
          <div className='w-max space-y-4'>
            <div className='flex gap-1 sm:gap-2'>
              {Array.from({ length: 10 }, (_, index) => (
                <Star
                  onClick={() =>
                    setRating((prev) => (prev === ++index ? 0 : index))
                  }
                  key={index}
                  className={cn(
                    'size-5 cursor-pointer transition-all hover:fill-yellow-500 hover:text-yellow-500',
                    rating >= index + 1 && 'fill-yellow-500 text-yellow-500'
                  )}
                />
              ))}
            </div>
            <div className='flex w-full gap-2'>
              <Button
                variant='destructive'
                size='icon'
                aria-label='delete review'
                onClick={deleteRating}
                disabled={!isRated || isLoading}
              >
                {isLoading ? (
                  <Loader2 className='size-5 animate-spin' />
                ) : (
                  <Trash className='size-5' />
                )}
              </Button>
              <Button
                onClick={() => upsertRating(rating)}
                className='grow'
                type='submit'
                disabled={!rating || isLoading}
              >
                {isLoading ? (
                  <Loader2 className='size-5 animate-spin' />
                ) : (
                  t('submit')
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
