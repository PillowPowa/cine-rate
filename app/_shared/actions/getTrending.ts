import type { CreationsResponse } from '@app/types/creation-types';
import type { BaseParams } from '@app/types/index';
import { $api } from '@api/api-interceptor';

export function getTrending(periodParam: 'day' | 'week' = 'day', params?: BaseParams) {
  return $api.safeFetch<CreationsResponse>(`/trending/all/${periodParam}`, {
    params,
  });
}
