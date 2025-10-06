import { test, expect } from "@playwright/test";

import { AppRoutes } from "@/lib/app-routes";

import en from "../messages/en.json";
import { screenSizes } from "./lib/constants";

test.use({ storageState: "playwright/.auth/user.json" });

test.describe("Logged User", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(AppRoutes.homePage);
  });

  test.describe("Mobile Navigation", () => {
    test("can navigate to favorites song on mobile navbar", async ({ page }) => {
      await page.getByRole("button", { name: en.MobileNavbar.menuLabel }).click();
      await page.getByRole("link", { name: en.navbar.favoriteSongs }).click();
      await expect(page.getByRole("heading", { name: en.FavoriteSongsPage.title })).toBeVisible();
    });
  });

  test.describe("Desktop Navigation", () => {
    test.use({ viewport: screenSizes.hd });

    test("can navigate to favorites song on desktop navbar", async ({ page }) => {
      await page.getByRole("link", { name: en.navbar.favoriteSongs }).click();
      await expect(page.getByRole("heading", { name: en.FavoriteSongsPage.title })).toBeVisible();
    });
  });
});
