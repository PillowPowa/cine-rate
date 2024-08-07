import type { LanguagesResponse } from '#types/configuration-types';
import type { BaseParams } from '#types/index';
import { staticPersistentCacheTerm } from '#api/api-cache';
import { $api } from '#api/api-interceptor';

export function getLanguages(params: BaseParams = {}) {
  return $api.safeFetch<LanguagesResponse>('/configuration/languages', {
    params,
    ...staticPersistentCacheTerm,
  });
}
