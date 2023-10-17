import type { ReactNode } from 'react';
import type { MoreVideoDetails } from 'ytdl-core';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@ui/dialog';
import { Eye, ThumbsDown, ThumbsUp } from 'lucide-react';
import { formatTimeAgo } from '@libs/time';

interface YoutubeEmbedDialogProps {
  details: MoreVideoDetails;
  children: ReactNode;
}

export function YoutubeEmbedDialog({
  details,
  children,
}: YoutubeEmbedDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='max-w-3xl overflow-hidden px-4'>
        <DialogHeader className='mr-4'>
          <DialogTitle>{details.title}</DialogTitle>
        </DialogHeader>
        <div className='relative aspect-[16/9] w-full overflow-hidden rounded-md'>
          <iframe src={details.embed.iframeUrl} width='100%' height='100%'></iframe>
        </div>
        <div className='flex w-full flex-row gap-2'>
          <div className='flex items-center gap-2'>
            <Eye className='h-5 w-5' />
            <span className='text-sm text-foreground/80'>
              {Intl.NumberFormat('en', { notation: 'compact' }).format(
                +details.viewCount
              )}{' '}
              views
            </span>
          </div>

          <span className='text-sm text-foreground/80'>
            {formatTimeAgo(new Date(details.publishDate))}
          </span>

          <div className='ml-auto hidden gap-x-4 sm:flex'>
            {details.likes && (
              <div className='flex gap-x-2'>
                <ThumbsUp className='h-5 w-5 fill-current' />
                <span className='text-sm text-foreground/80'>
                  {Intl.NumberFormat('en', { notation: 'compact' }).format(
                    details.likes
                  )}
                </span>
              </div>
            )}

            {details.dislikes && (
              <div className='flex gap-x-2'>
                <ThumbsDown className='h-5 w-5 fill-current' />
                <span className='text-sm text-foreground/80'>
                  {Intl.NumberFormat('en', { notation: 'compact' }).format(
                    details.dislikes
                  )}
                </span>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
