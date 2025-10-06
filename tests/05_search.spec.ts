import { expect, test } from "@playwright/test";

import { AppRoutes } from "@/lib/app-routes";

import en from "../messages/en.json";

test.describe("Search", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(AppRoutes.searchPage);
  });

  test(`should see "${en.RecentSearches.noSearches}" message when are not recent searches on localStorage`, async ({
    page
  }) => {
    await page.evaluate(() => localStorage.clear());

    await expect(page.getByText(en.RecentSearches.noSearches)).toBeVisible();
  });

  const notFoundSearchQuery = "hola sax sheet";

  test(`should see "${en.SearchResults.withoutResult}" when search for something that does not exists, and can clear input and clear recent searches with a dedicated button with confirmation dialog`, async ({
    page
  }) => {
    const searchInput = page.getByRole("textbox", { name: en.SearchForm.placeholder });
    await searchInput.click();
    await searchInput.fill(notFoundSearchQuery);

    await expect(page.getByText(en.SearchResults.withoutResult)).toBeVisible();
    await expect(page.getByText(notFoundSearchQuery)).toBeVisible();

    await page.locator("form svg").click();

    await expect(page.getByText(en.RecentSearches.title, { exact: true })).toBeVisible();

    await page.getByRole("button", { name: en.RecentSearches.clearButton }).click();

    await page.getByRole("button", { name: en.RecentSearches.clearConfirm }).click();

    await expect(page.getByText(en.RecentSearches.noSearches)).toBeVisible();
  });
});
