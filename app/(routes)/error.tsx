'use client'; // Error components must be Client Components

import { Button } from '@ui/button';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error.stack);
  }, [error]);

  return (
    <main className='absolute left-[50%] top-[50%] h-fit -translate-x-[50%] -translate-y-[50%] space-y-4 text-center'>
      <h2 className='text-6xl'>Oops!</h2>
      <p className='text-lg text-muted-foreground'>Something went wrong.</p>
      <Button onClick={() => reset()}>Try again</Button>
    </main>
  );
}
