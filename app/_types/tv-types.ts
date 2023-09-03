import { ICreationLanguage, IProductionCountry } from '.';
import { IPartialCompany } from './company-types';
import type { IPartialGenre } from './genre-types';
import { ICelebrity } from './person-types';

export interface ITVDetails {
  created_by: ICelebrity[];
  episode_run_time: number[];
  first_air_date: string;
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null | number;
  genres: IPartialGenre[];
  homepage?: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: IPartialCompany[];
  production_countries: IProductionCountry[];
  release_date: string;
  runtime: number;
  spoken_languages: ICreationLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;

  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: IEpisode | null;
  name: string;
  next_episode_to_air: IEpisode | null;
  networks: unknown;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_name: string;
  seasons: ISeason[];
  type: string;
}

export interface IEpisode {
  id: 2558114;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  episode_type: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
}

export interface ISeason {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}