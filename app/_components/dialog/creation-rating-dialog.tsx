'use client';

import type {
  AccountStatesResponse,
  RatingResponse,
} from '@app/types/creation-types';
import type { MediaType } from '@config/enums';
import { ReactNode, useState, useTransition } from 'react';

import { Button } from '@ui/button';
import { useToast } from '@ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@ui/dialog';
import { cn } from '@libs/index';
import { Loader, Star, Trash } from 'lucide-react';

import axios from 'axios';

interface CreationRatingDialogProps {
  mediaType: MediaType;
  creationId: number;
  initialRated: AccountStatesResponse['rated'];
  children: ReactNode;
}

export function CreationRatingDialog({
  initialRated,
  mediaType,
  creationId,
  children,
}: CreationRatingDialogProps) {
  const [isRated, setIsRated] = useState(!!initialRated);
  const [rating, setRating] = useState(initialRated ? initialRated.value : 1);
  const [isLoading, startTransition] = useTransition();
  const { toast } = useToast();

  async function upsertRating() {
    return (
      axios
        .post<RatingResponse>(`/api/states/${mediaType}/${creationId}/rating`, {
          value: rating,
        })
        .then(() => {
          setIsRated((prev) => {
            return prev || !prev;
          });
          toast({
            title: '✅ Your review has been sent!',
            description:
              'Thank you for helping to improve the quality of our resource.',
          });
        })
        // TEMP
        .catch(() => {})
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className={cn(
          'bottom-0 top-auto translate-y-0 pt-[48px] text-center',
          'sm:bottom-auto sm:top-[50%] sm:-translate-y-[50%]'
        )}
      >
        <div className='absolute left-[50%] top-0 grid w-fit -translate-x-[50%] -translate-y-[60%] place-items-center'>
          <Star
            className={cn(
              'h-[72px] w-[72px] fill-blue-500 text-blue-500 transition-all duration-300',
              isRated && 'fill-yellow-500 text-yellow-500'
            )}
            style={{ transform: `scale(1.${(rating - 1) / 2 * 10})` }}
          />
          <h2 className='absolute select-none text-2xl leading-none'>
            {rating}
          </h2>
        </div>
        <DialogHeader className='text-center sm:text-center'>
          <DialogTitle>Rate This!</DialogTitle>
          <DialogDescription>
            {isRated
              ? 'Upsert or delete your rating for this creation'
              : 'Rate this creation right now!'}
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
                    'h-5 w-5 cursor-pointer transition-all hover:fill-yellow-500 hover:text-yellow-500',
                    rating >= index + 1 && 'fill-yellow-500 text-yellow-500'
                  )}
                />
              ))}
            </div>
            <div className='flex w-full gap-2'>
              <Button
                variant='destructive'
                size='icon'
                disabled={!isRated || isLoading}
              >
                {isLoading ? (
                  <Loader className='h-5 w-5 animate-spin' />
                ) : (
                  <Trash className='h-5 w-5' />
                )}
              </Button>
              <Button
                onClick={() => startTransition(upsertRating)}
                className='flex-grow'
                type='submit'
                disabled={!rating || isLoading}
              >
                {isLoading ? (
                  <Loader className='h-5 w-5 animate-spin' />
                ) : (
                  'Submit'
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}