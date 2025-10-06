import { test, expect, Page } from "@playwright/test";

import { AppRoutes } from "@/lib/app-routes";

import en from "../messages/en.json";
import { deleteArtist } from "./data-access/artist";

test.use({ storageState: "playwright/.auth/admin.json" });

test.describe("Logged Admin", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(AppRoutes.homePage);
  });

  test.describe("Mobile", () => {
    test.describe("Navigation", () => {
      test("can navigate to create song page", async ({ page }) => {
        await page.getByRole("button", { name: en.MobileNavbar.menuLabel }).click();
        await page.getByRole("link", { name: en.navbar.createSong }).click();
        await expect(page.getByRole("heading", { name: en.CreateSongPage.title })).toBeVisible();
      });
    });

    test.describe("Create Song", () => {
      test("can create a new song", async ({ page }) => {
        await deleteArtist({ artistName: newSong.artistName });

        await page.getByRole("button", { name: en.MobileNavbar.menuLabel }).click();
        await page.getByRole("link", { name: en.navbar.createSong }).click();

        await fillCreateSongForm({ page, songData: newSong });

        await expect(page.getByRole("heading", { name: en.SongsPage.title })).toBeVisible();

        await expect(page.getByRole("link", { name: newSong.songName, exact: true })).toBeVisible();
      });
    });
  });
});

async function fillCreateSongForm({ page, songData }: { page: Page; songData: NewSong }) {
  await page.getByRole("textbox", { name: en.EditArtistForm.artistName.label }).fill(songData.artistName);
  await page.getByRole("textbox", { name: en.EditArtistForm.biographyLink.label }).fill(songData.biographyLink);
  await page.getByRole("combobox", { name: en.EditArtistForm.musicalGenre.label }).click();
  await page.getByRole("option", { name: songData.musicalGenre }).click();
  await page.getByRole("textbox", { name: en.EditSongForm.title.label }).fill(songData.songName);
  await page.getByRole("textbox", { name: en.EditSongForm.youTubeLink.label }).fill(songData.youtubeLink);
  await page.getByRole("textbox", { name: en.EditSongForm.originalSongLink.label }).fill(songData.originalSongLink);
  await page.getByRole("button", { name: en.CreateSongForm.submitButton }).click();
}

const newSong = {
  artistName: "George Michael",
  biographyLink: "https://wikipedia.org/wiki/George_Michael",
  musicalGenre: "Pop",
  songName: "Careless Whisper",
  youtubeLink: "https://www.youtube.com/watch?v=izGwDsrQ1eQ",
  originalSongLink: "https://open.spotify.com/track/5WDLRQ3VCdVrKw0njWe5E5?si=5xGQ3rieRWytM3V1hWWJyA"
};

type NewSong = typeof newSong;
