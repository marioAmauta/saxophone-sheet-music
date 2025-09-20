export class ApiRoutes {
  static readonly spotifyApiUrl = process.env.SPOTIFY_API_URL!;

  static readonly spotifyTokenUrl = process.env.SPOTIFY_TOKEN_URL!;

  static readonly spotifySearchApi = ({ query }: { query: string }) => `${this.spotifyApiUrl}/search${query}`;

  static readonly searchArtistQuery = ({ artistName }: { artistName: string }) =>
    `/songs/create/api/search-artist?artistName=${artistName}`;
}
