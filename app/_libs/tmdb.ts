import type { CreationVideosResponse } from "@app/types/creation-types";

export const TMDB_IMAGE_URL = 'https://image.tmdb.org/t/p/';

interface TMDBImagePathProps {
  path: string | null;
  scale?: keyof typeof scales;
}

const scales = {
  avatar: 'w92_and_h92_face',
  poster: `w500`,
  backdrop: `w500_and_h282_face`,
  large_backdrop: 'w1000_and_h450_face',
} as const;

// TEMP: to scales
export const images = {
  base_url: 'http://image.tmdb.org/t/p/',
  secure_base_url: 'https://image.tmdb.org/t/p/',
  backdrop_sizes: ['w300', 'w780', 'w1280', 'original'],
  logo_sizes: ['w45', 'w92', 'w154', 'w185', 'w300', 'w500', 'original'],
  poster_sizes: ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'],
  profile_sizes: ['w45', 'w185', 'h632', 'original'],
  still_sizes: ['w92', 'w185', 'w300', 'original'],
} as const;

export function buildImagePath({ path, scale }: TMDBImagePathProps) {
  if (!path) return null;
  return TMDB_IMAGE_URL + (scale ? scales[scale] : 'original') + path;
}

export function buildGravatarPath(hash: string) {
  return `https://secure.gravatar.com/avatar/${hash}?s=90`;
}

export function inferOfficialTrailer({ results }: CreationVideosResponse) {
  const officialTrailer = results.find(
    (video) => video.official && video.type === 'Trailer'
  );
  return results.length ? officialTrailer || results[0] : null;
}
