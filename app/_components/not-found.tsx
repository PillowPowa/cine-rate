import { ComponentProps } from 'react';
import { cn } from '../_libs';
import { SearchX } from 'lucide-react';

interface NotFoundProps extends Omit<ComponentProps<'div'>, 'children'> {
  title?: string;
  description?: string;
}

const descriptions = [
  "Where Stuff Goes to Hide: The Mystery of 'There are no items yet.'",
  'The Museum of Nothingness: A Tour of the Void',
  "The Ultimate Minimalist Experience: 'There are no items yet.'",
  'The Great Inventory Vanishing Act: A Comedy in Progress',
  "When Items Play Hide and Seek: 'There are no items yet.' Chronicles",
];

export function NotFound({
  className,
  title,
  description,
  ...props
}: NotFoundProps) {
  return (
    <div
      className={cn(
        'relative mt-8 grid w-full select-none place-items-center gap-4 rounded-md p-8',
        className
      )}
      {...props}
    >
      <SearchX className='h-10 w-10 shadow-red-500 drop-shadow-md' />
      <div className='text-center'>
        <h2 className='text-xl font-semibold tracking-tight sm:text-2xl'>
          {title || 'There are no items yet ;('}
        </h2>
        <p className='text-xs text-muted-foreground sm:text-sm'>
          {description || descriptions[~~(Math.random() * descriptions.length)]}
        </p>
      </div>

      <div className='absolute inset-0 -z-10 h-full w-full'>
        <div className='absolute left-[47%] top-[20%] h-[16px] w-[16px] -translate-x-[50%] animate-pulse rounded-full bg-orange-400 blur-xl sm:h-[32px] sm:w-[32px]' />
        <div className='absolute left-[50%] top-[10%] h-[24px] w-[24px] -translate-x-[50%] animate-pulse rounded-full bg-red-600 blur-xl sm:h-[64px] sm:w-[64px]' />
        <div className='absolute left-[52%] top-[15%] h-[18px] w-[18px] -translate-x-[50%] animate-pulse rounded-full bg-yellow-500 blur-xl sm:h-[48px] sm:w-[48px]' />
      </div>
    </div>
  );
}