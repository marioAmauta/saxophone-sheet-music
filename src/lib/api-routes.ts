import { getHostUrl } from "@/api/utils";

export class ApiRoutes {
  static readonly spotifyApiUrl = process.env.SPOTIFY_API_URL!;

  static readonly spotifyTokenUrl = process.env.SPOTIFY_TOKEN_URL!;

  static readonly spotifySearchApi = ({ query }: { query: string }) => `${this.spotifyApiUrl}/search${query}`;

  static readonly spotifyApiArtist = async ({ artistName }: { artistName: string }) =>
    `${await getHostUrl()}/api/spotify/artist/${artistName}`;

  static readonly spotifyApiSong = async ({ songName, artistName }: { songName: string; artistName: string }) =>
    `${await getHostUrl()}/api/spotify/track/${songName}/${artistName}`;
}
