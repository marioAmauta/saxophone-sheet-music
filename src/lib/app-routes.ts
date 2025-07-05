export class AppRoutes {
  static readonly homePage = "/";

  static readonly loginPage = "/login";
  static readonly registerPage = "/register";
  static readonly forgotPasswordPage = "/forgot-password";
  static readonly resetPasswordPage = "/reset-password";
  static readonly resetMailSentPage = "/reset-mail-sent";

  static readonly musicalGenresPage = "/musical-genres";
  static readonly musicalGenreDetailPage = ({ musicalGenre }: { musicalGenre: string }) =>
    `${this.musicalGenresPage}/${musicalGenre}`;

  static readonly searchPage = "/search";

  static readonly songsPage = "/songs";
  static readonly songsPageDetail = ({ slug }: { slug: string }) => `${this.songsPage}/${slug}`;
  static readonly createSongPage = `${this.songsPage}/create`;
  static readonly editSongPage = ({ slug }: { slug: string }) => `${this.songsPage}/${slug}/edit`;
  static readonly favoriteSongsPage = `${this.songsPage}/favorites`;
  static readonly favoriteSongsPageDetail = ({ slug }: { slug: string }) => `${this.favoriteSongsPage}/${slug}`;

  static readonly artistsPage = "/artists";
  static readonly artistsDetailPage = ({ slug }: { slug: string }) => `${this.artistsPage}/${slug}`;
  static readonly editArtistPage = ({ slug }: { slug: string }) => `${this.artistsPage}/${slug}/edit`;

  static readonly accountRequiredPage = "/account-required";

  static readonly downloadApi = ({
    format,
    songName,
    artistName,
    videoUrl
  }: {
    format: "mp3" | "mp4";
    songName: string;
    artistName: string;
    videoUrl: string;
  }) => `/api/download/${format}?videoUrl=${videoUrl}&songName=${songName}&artistName=${artistName}`;

  static readonly projectOnGithub = "https://github.com/marioAmauta/saxophone-sheet-music";
}
