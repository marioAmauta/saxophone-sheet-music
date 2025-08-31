import { getHostUrl } from "@/api/utils";

export class ApiRoutes {
  static readonly spotifyApiUrl = process.env.SPOTIFY_API_URL!;

  static readonly spotifyTokenUrl = process.env.SPOTIFY_TOKEN_URL!;

  static readonly spotifySearchApi = ({
    name,
    type,
    limit
  }: {
    name: string;
    type: "album" | "artist" | "track";
    limit: number;
  }) => `${this.spotifyApiUrl}/search?q=${name}&type=${type}&limit=${limit}`;

  static readonly spotifyApiArtist = async ({ artistName }: { artistName: string }) =>
    `${await getHostUrl()}/api/spotify/artist/${artistName}`;

  static readonly spotifyApiSong = async ({ songName }: { songName: string }) =>
    `${await getHostUrl()}/api/spotify/track/${songName}`;
}
