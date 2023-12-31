import type { CreditsResponse } from '@app/types/person-types';
import type { BaseParams } from '@app/types/index';
import type { MediaType } from '@config/enums';
import { $api } from '@api/api-interceptor';

export const getCreationCredits = (
  creationId: number,
  mediaType: MediaType,
  params?: BaseParams
) => {
  return $api.safeFetch<CreditsResponse>(`/${mediaType}/${creationId}/credits`, {
    params,
  });
};
