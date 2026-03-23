import { describe, expect, it } from "vitest";
import {
	STICKY_NOTE_BG_CLASS,
	STICKY_NOTE_COLOR_NAMES,
	stickyNoteBackgroundClass,
} from "./note-colors";

describe("stickyNoteBackgroundClass", () => {
	it("returns a Tailwind class for each palette name", () => {
		for (const name of STICKY_NOTE_COLOR_NAMES) {
			const cls = stickyNoteBackgroundClass(name);
			expect(cls).toBe(STICKY_NOTE_BG_CLASS[name]);
			expect(cls).toMatch(/^bg-/);
		}
	});

	it("falls back for unknown colors", () => {
		expect(stickyNoteBackgroundClass("magenta")).toBe("bg-amber-50/90");
		expect(stickyNoteBackgroundClass("")).toBe("bg-amber-50/90");
	});
});
