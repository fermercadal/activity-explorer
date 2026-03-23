import AxeBuilder from "@axe-core/playwright";
import { test, expect } from "@playwright/test";

test.describe("accessibility (axe)", () => {
	test("home has no serious axe violations", async ({ page }) => {
		await page.goto("/");
		const results = await new AxeBuilder({ page }).analyze();
		const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
		expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
	});

	test("board page has no serious axe violations", async ({ page }) => {
		await page.goto("/boards/star-wars");
		const results = await new AxeBuilder({ page }).analyze();
		const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
		expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
	});

	test("not found page has no serious axe violations", async ({ page }) => {
		await page.goto("/boards/__not_a_real_board_slug__");
		const results = await new AxeBuilder({ page }).analyze();
		const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
		expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
	});
});
