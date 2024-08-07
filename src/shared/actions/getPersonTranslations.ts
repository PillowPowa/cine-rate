import { TranslationsResponse } from '#types/person-types';
import { MediaType } from '#config/enums';
import { dayCacheTerm } from '#api/api-cache';
import { $api } from '#api/api-interceptor';

export function getPersonTranslations(personId: number) {
  return $api.safeFetch<TranslationsResponse>(
    `/${MediaType.Person}/${personId}/translations`,
    dayCacheTerm
  );
}
