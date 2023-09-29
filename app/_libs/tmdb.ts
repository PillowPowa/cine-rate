import type { CreationVideosResponse } from "@app/types/creation-types";

export const TMDB_IMAGE_URL = 'https://image.tmdb.org/t/p/';

interface TMDBImagePathProps {
  path: string | null;
  scale?: keyof typeof scales;
}

const scales = {
  avatar: 'w90_and_h90_face',
  poster: `w500`,
  backdrop: `w500_and_h282_face`,
  large_backdrop: 'w1000_and_h450_face',
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
