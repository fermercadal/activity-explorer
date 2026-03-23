import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AppLink } from "./link";

describe("AppLink", () => {
	it("renders an anchor with href", () => {
		render(
			<AppLink href="/boards/x" variant="board">
				Board title
			</AppLink>,
		);
		const a = screen.getByRole("link", { name: "Board title" });
		expect(a).toHaveAttribute("href", "/boards/x");
	});

	it("applies variant classes (back)", () => {
		render(
			<AppLink href="/" variant="back">
				Back
			</AppLink>,
		);
		const a = screen.getByRole("link", { name: "Back" });
		expect(a.className).toContain("text-sm");
		expect(a.className).toContain("text-gray-500");
	});
});
