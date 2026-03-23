import { test, expect } from "@playwright/test";

test.describe("happy paths", () => {
	test("home → board shows title and grid", async ({ page }) => {
		await page.goto("/");
		await expect(
			page.getByRole("heading", { name: /collaborative board activity explorer/i }),
		).toBeVisible();

		await page.getByRole("link", { name: /star wars quotes/i }).click();
		await expect(page.getByRole("heading", { name: /star wars quotes/i })).toBeVisible();
		await expect(page.getByRole("region", { name: /sticky notes grid/i })).toBeVisible();
	});

	test("filters and reset all", async ({ page }) => {
		await page.goto("/boards/star-wars");
		await expect(page.getByRole("heading", { name: /star wars quotes/i })).toBeVisible();

		const authorSelect = page.getByRole("combobox", { name: /filter by author/i });
		await authorSelect.selectOption({ index: 1 });
		await expect(authorSelect).not.toHaveValue("");

		await page.getByRole("button", { name: /reset all/i }).click();
		await expect(authorSelect).toHaveValue("");
	});

	test("unknown board shows not found", async ({ page }) => {
		await page.goto("/boards/__not_a_real_board_slug__");
		await expect(page.getByRole("heading", { name: /page not found/i })).toBeVisible();
	});
});
