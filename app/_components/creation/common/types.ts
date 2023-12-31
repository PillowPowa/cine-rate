import type { MediaType } from '@config/enums';
import type { IMovieDetails } from '@app/types/movies-types';
import type { ITVDetails } from '@app/types/tv-types';

export type CreationDetails = IMovieDetails | ITVDetails;

export interface CreationDetailsProps {
  details: CreationDetails;
}

export interface CreationIdentifierProps {
  creationId: number;
  mediaType: MediaType;
}
