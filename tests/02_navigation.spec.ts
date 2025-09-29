import { expect, test } from "@playwright/test";

import { AppRoutes } from "@/lib/app-routes";

import en from "../messages/en.json";

test.describe("Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(AppRoutes.homePage);
  });

  const navbarData: {
    linkName: string;
    headingName: string;
  }[] = [
    {
      linkName: en.navbar.search,
      headingName: en.SearchPage.title
    },
    {
      linkName: en.navbar.artists,
      headingName: en.ArtistsPage.title
    },
    {
      linkName: en.navbar.songs,
      headingName: en.SongsPage.title
    },
    {
      linkName: en.navbar.musicalGenres,
      headingName: en.MusicalGenresPage.title
    }
  ];

  test.describe("Mobile Navigation", () => {
    test("should open and close mobile menu successfully", async ({ page }) => {
      await page.getByRole("button", { name: en.MobileNavbar.menuLabel }).click();
      await page.getByRole("button", { name: en.MobileNavbar.closeLabel }).click();
    });

    for (const { linkName, headingName } of navbarData) {
      test(`should navigate to ${linkName} page by clicking ${linkName} button on mobile navbar`, async ({ page }) => {
        if (linkName !== en.navbar.search) {
          await page.getByRole("button", { name: en.MobileNavbar.menuLabel }).click();
        }

        await page.getByRole("link", { name: linkName, exact: linkName === en.navbar.songs }).click();
        await expect(page.getByRole("heading", { name: headingName })).toBeVisible();
      });
    }

    test("user cannot navigate to favorite page if has not an account and must be redirected to account required page", async ({
      page
    }) => {
      await page.getByRole("button", { name: en.MobileNavbar.menuLabel }).click();
      await page.getByRole("link", { name: en.navbar.favoriteSongs }).click();
      await expect(page.getByRole("heading", { name: en.AccountRequiredPage.title })).toBeVisible();
    });
  });

  test.describe("Desktop Navigation", () => {
    test.use({ viewport: { width: 1280, height: 720 } });

    test("should display desktop navbar", async ({ page }) => {
      await page.getByRole("navigation").getByRole("button").click();
      await expect(page.getByText("My Account")).toBeVisible();
    });

    for (const { linkName, headingName } of navbarData) {
      test(`should navigate to ${linkName} page by clicking ${linkName} link on desktop navbar`, async ({ page }) => {
        await page.getByRole("link", { name: linkName, exact: linkName === en.navbar.songs }).click();
        await expect(page.getByRole("heading", { name: headingName })).toBeVisible();
      });
    }

    test("user cannot navigate to favorite page if has not an account and must be redirected to account required page", async ({
      page
    }) => {
      await page.getByRole("link", { name: en.navbar.favoriteSongs }).click();
      await expect(page.getByRole("heading", { name: en.AccountRequiredPage.title })).toBeVisible();
    });
  });
});
