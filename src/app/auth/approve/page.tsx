'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { INextPageParams } from '#types/index';
import { useAppDispatch } from '#store/hooks';
import { approve } from '#store/user/user-actions';
import { useToast } from '#ui/use-toast';
import Loader from '#components/loader';
import { pipe } from '#libs/common/next';

const statusDescription = {
  200: 'You have successfully authorized us to receive and modify your data through the TMDB service.',
  401: 'You or TMDB did not approve the request for your TMDB account information.',
  400: 'An error occurred during redirection.',
  default: 'An unhandled error occurred, please try again later.',
};

function isValidStatus(
  status: string | number
): status is keyof typeof statusDescription {
  return status in statusDescription;
}

function getStatusDescription(status: number) {
  return isValidStatus(status)
    ? statusDescription[status]
    : statusDescription.default;
}

/*
 * https://github.com/vercel/next.js/issues/52799#issuecomment-1645124081
 */

export default function ApprovePage({ searchParams }: INextPageParams) {
  const requestToken = pipe.string(searchParams?.request_token);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    async function handleResult() {
      const result = await dispatch(approve(requestToken));

      router.replace('/');

      if (approve.fulfilled.match(result)) {
        toast({
          title: '✅ Successfully approval!',
          description:
            'You have successfully authorized us to receive and modify your data through the TMDB service.',
        });
      } else {
        toast({
          title: result.error.message || 'Uh, Oh! Something went wrong.',
          description: getStatusDescription(result.payload?.status || 500),
        });
      }
    }
    handleResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Loader />;
}