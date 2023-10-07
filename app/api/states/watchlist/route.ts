import { type NextRequest, NextResponse } from 'next/server';
import type { ToggleResponse } from '@app/types/creation-types';
import { generateZodErrorsResponse } from '@libs/common/next';
import { cookies } from 'next/headers';
import { $api } from '@api/api-interceptor';
import { fetchErrorResponse } from '@libs/common/fetch';
import { MediaType } from '@config/enums';
import zod from 'zod';

const bodyDto = zod.object({
    mediaType: zod.nativeEnum(MediaType),
    creationId: zod.number(),
    watchlist: zod.boolean(),
});

export async function POST(request: NextRequest) {
    const sessionCookie = cookies().get('session_id');
    const sessionId = sessionCookie?.value;
    if (!sessionId) {
        return NextResponse.json({
            message: 'Only authorized users can do this action'
        }, { status: 401 })
    }

    const body = await request.json();
    const result = bodyDto.safeParse(body);
    if (!result.success) {
        return generateZodErrorsResponse(result);
    }

    const { creationId, watchlist, mediaType } = result.data;

    const [data, error] = await $api.safeFetch<ToggleResponse>(`/3/account/account_id/watchlist`, {
        body: JSON.stringify({
            media_id: creationId,
            media_type: mediaType,
            watchlist,
        }),
        method: 'POST',
        params: { session_id: sessionId }
    });

    if (error) {
        return fetchErrorResponse(error);
    }
    return NextResponse.json(data, { status: 201 })
}