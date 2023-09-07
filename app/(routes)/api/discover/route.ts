import { getDiscover } from '@/app/_shared/actions/getDiscover';
import { MediaType } from '@/app/_types';
import { isAxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import zod from 'zod';

const filterDto = zod.object({
  page: zod.string().regex(/^\d+$/).transform(Number),
  mediaType: zod.nativeEnum(MediaType).default(MediaType.Movie),
});

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const searchParams = Object.fromEntries(requestUrl.searchParams.entries());
  const result = filterDto.safeParse(searchParams);

  if (!result.success) {
    if (result.error.issues.length) {
      return NextResponse.json(
        { errors: result.error.format() },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: 'Unhandled zod error' },
      { status: 500 }
    );
  }
  const { mediaType, ...params } = result.data;
  return getDiscover(mediaType, params)
    .then(({ data }) => {
      return NextResponse.json(data, { status: 200 });
    })
    .catch((err) => {
      if (!isAxiosError(err)) {
        return NextResponse.json('Unhandled error occurred', { status: 500 });
      }
      return NextResponse.json(err.response?.data, { status: err.status });
    });
}
