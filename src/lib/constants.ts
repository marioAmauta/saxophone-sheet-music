export const APP_NAME = "Sax Sheet";

export const authCookieName = "auth_session";

export const RECENT_SEARCHES_KEY = "recentSearches";

export const AFTER_LOGIN_REDIRECT_KEY = "afterLoginRedirect";

export const DATA_CY_ELEMENTS = Object.freeze({
  navbar: {
    mobileMenu: "mobile-menu",
    mobileMenuButton: "mobile-menu-button",
    logoutTriggerButton: "logout-trigger-button",
    logoutButton: "logout-button",
    searchButton: "search-button",
    createSongLink: "create-song-link",
    songsLink: "songs-link",
    artistsLink: "artists-link",
    favoriteSongsLink: "favorite-songs-link"
  },
  loginForm: {
    email: "email",
    password: "password",
    submitButton: "submit"
  },
  registerForm: {
    name: "name",
    email: "email",
    password: "password",
    confirmPassword: "confirmPassword",
    submitButton: "submit"
  },
  songCard: {
    likeButton: "song-card-like-button",
    deleteButton: "song-card-delete-button"
  }
});

export const PRISMA_ERRORS = Object.freeze({
  uniqueConstraint: "P2002"
});
