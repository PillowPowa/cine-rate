import type { MoreVideoDetails, videoFormat } from 'ytdl-core';
import type { CreationVideoSite, MediaType } from '#config/enums';
import type { BaseResponse } from '.';
import type { IMediaResource } from './media-types';

export interface IKeyword {
  id: number;
  name: string;
}

export interface ICreation {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title?: string;
  original_language: string;
  original_title?: string;
  original_name?: string;
  overview: string;
  poster_path: string;
  media_type: MediaType;
  genre_ids: number[];
  popularity: number;
  release_date?: string;
  first_air_date?: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface ICreationVideo {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: CreationVideoSite;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export type ToggleFavoriteData = {
  mediaType: MediaType;
  creationId: number;
  favorite: boolean;
};

export type ToggleRatingData = {
  value: number;
};

export type AddRatingData = {
  value: number;
};

export type CreationsResponse = BaseResponse<ICreation>;
export type CreationVideosResponse = {
  id: number;
  results: ICreationVideo[];
};
export type CreationImagesResponse = {
  id: number;
  backdrops: IMediaResource[];
  logos: IMediaResource[];
  posters: IMediaResource[];
};
export type CreationKeywordsResponse = {
  id: number;
  keywords: IKeyword[];
};

export type ToggleResponse = {
  success: boolean;
  status_code: number;
  status_message: string;
};

// TEMP: dublicate
export type RatingResponse = {
  success: boolean;
  status_code: number;
  status_message: string;
};

export type AccountStatesResponse = {
  id: number;
  favorite: boolean;
  rated: false | { value: number };
  watchlist: boolean;
};

export type CreationTrailerResponse = {
  details: MoreVideoDetails;
  format: videoFormat;
};

export type CreationExternalIds = {
  imdb_id?: string | null;
  facebook_id?: string | null;
  instagram_id?: string | null;
  twitter_id?: string | null;
};

export interface ICreationExternalIds {
  external_ids: CreationExternalIds;
}
