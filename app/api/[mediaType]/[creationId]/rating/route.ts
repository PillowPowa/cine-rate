import { type NextRequest, NextResponse } from 'next/server';
import type { RatingResponse } from '@app/types/creation-types';
import type { INextPageParams } from '@app/types/index';
import { generateZodErrorsResponse } from '@libs/common/next';
import { cookies } from 'next/headers';
import { $api } from '@api/api-interceptor';
import { rejectFetch } from '@libs/common/fetch';
import zod from 'zod';
import { paramsDto } from '../dto';

const bodyDto = zod.object({
    value: zod.number().max(10).min(1)
});

export async function POST(request: NextRequest, { params }: INextPageParams) {
    const parsedParams = paramsDto.safeParse(params);
    if (!parsedParams.success) {
        return generateZodErrorsResponse(parsedParams);
    }

    const sessionCookie = cookies().get('session_id');
    const sessionId = sessionCookie?.value;
    if (!sessionId) {
        return NextResponse.json({
            message: 'Only authorized users can do this action'
        }, { status: 401 })
    }

    const body = await request.json();
    const parsedBody = bodyDto.safeParse(body);
    if (!parsedBody.success) {
        return generateZodErrorsResponse(parsedBody);
    }

    const { mediaType, creationId } = parsedParams.data;

    const [data, error] = await $api.fetch<RatingResponse>(`/3/${mediaType}/${creationId}/rating`, {
        method: 'POST',
        body: JSON.stringify({
            value: parsedBody.data.value,
        }),
        params: { session_id: sessionId }
    });

    if (error) {
        return NextResponse.json(rejectFetch(error));
    }
    return NextResponse.json(data, { status: 200 });
}

export async function DELETE(_: NextRequest, { params }: INextPageParams) {
    const parsedParams = paramsDto.safeParse(params);
    if (!parsedParams.success) {
        return generateZodErrorsResponse(parsedParams);
    }

    const sessionCookie = cookies().get('session_id');
    const sessionId = sessionCookie?.value;
    if (!sessionId) {
        return NextResponse.json({
            message: 'Only authorized users can do this action'
        }, { status: 401 })
    }

    const { mediaType, creationId } = parsedParams.data;

    const [data, error] = await $api.fetch<RatingResponse>(`/3/${mediaType}/${creationId}/rating`, {
        method: 'DELETE',
        params: { sesson_id: sessionId }
    })

    if (error) {
        return NextResponse.json(rejectFetch(error));
    }
    return NextResponse.json(data, { status: 200 });
}