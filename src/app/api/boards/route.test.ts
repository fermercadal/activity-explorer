import { describe, expect, it } from "vitest";
import { BOARD_CATALOG } from "@/lib/boards/catalog";
import { GET } from "./route";

describe("GET /api/boards", () => {
	it("returns 200 with username and boards from catalog", async () => {
		const res = GET();
		expect(res.status).toBe(200);
		const body = (await res.json()) as {
			username: string;
			boards: { slug: string; label: string }[];
		};
		expect(body.username).toBe("Fer");
		expect(body.boards).toHaveLength(BOARD_CATALOG.length);
		expect(body.boards.map((b) => b.slug)).toEqual(BOARD_CATALOG.map((b) => b.slug));
	});
});
