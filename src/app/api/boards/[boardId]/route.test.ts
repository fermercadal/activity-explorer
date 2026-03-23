import { describe, expect, it } from "vitest";
import { GET } from "./route";

function ctx(boardId: string) {
	return { params: Promise.resolve({ boardId }) };
}

describe("GET /api/boards/[boardId]", () => {
	it("returns 200 with label and notes for a known board", async () => {
		const res = await GET(new Request("http://localhost/api/boards/star-wars"), ctx("star-wars"));
		expect(res.status).toBe(200);
		const body = (await res.json()) as { label: string; notes: unknown[] };
		expect(body.label).toBe("Star Wars quotes");
		expect(body.notes.length).toBeGreaterThan(0);
	});

	it("returns 404 for an unknown board", async () => {
		const res = await GET(
			new Request("http://localhost/api/boards/no-such-board"),
			ctx("no-such-board"),
		);
		expect(res.status).toBe(404);
		const body = (await res.json()) as { error: string };
		expect(body.error).toBe("Unknown board");
	});
});
