import type { LanguagesResponse } from '@app/types/configuration-types';
import type { BaseParams } from '@app/types/index';
import { $api } from '@api/api-interceptor';

export function getLanguages(params?: BaseParams) {
  return $api.safeFetch<LanguagesResponse>('/configuration/languages', {
    params,
  });
}
