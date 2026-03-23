import { describe, expect, it } from "vitest";
import { DEFAULT_NOTE_SORT_ORDER, filterNotes, sortNotes } from "./note-filter-sort";
import type { StickyNote } from "@/types/stickyNote";

function note(partial: Partial<StickyNote> & Pick<StickyNote, "id">): StickyNote {
	return {
		text: "t",
		x: 0,
		y: 0,
		author: "A",
		color: "yellow",
		createdAt: "2020-01-01T00:00:00.000Z",
		...partial,
	};
}

describe("filterNotes", () => {
	const notes = [
		note({ id: "1", author: "Ada", color: "blue" }),
		note({ id: "2", author: "Bob", color: "yellow" }),
		note({ id: "3", author: "Ada", color: "yellow" }),
	];

	it("returns all notes when author and color are empty", () => {
		expect(filterNotes(notes, "", "")).toEqual(notes);
	});

	it("filters by author", () => {
		expect(filterNotes(notes, "Ada", "").map((n) => n.id)).toEqual(["1", "3"]);
	});

	it("filters by color", () => {
		expect(filterNotes(notes, "", "yellow").map((n) => n.id)).toEqual(["2", "3"]);
	});

	it("combines author and color with AND", () => {
		expect(filterNotes(notes, "Ada", "yellow").map((n) => n.id)).toEqual(["3"]);
	});
});

describe("sortNotes", () => {
	const notes = [
		note({ id: "a", y: 20, x: 10, author: "Zed" }),
		note({ id: "b", y: 10, x: 20, author: "Ann" }),
		note({ id: "c", y: 10, x: 10, author: "Bob" }),
	];

	it("sorts by position top-to-bottom then x", () => {
		const ids = sortNotes(notes, "position-tb").map((n) => n.id);
		expect(ids).toEqual(["c", "b", "a"]);
	});

	it("sorts by position bottom-to-top", () => {
		const ids = sortNotes(notes, "position-bt").map((n) => n.id);
		expect(ids).toEqual(["a", "b", "c"]);
	});

	it("sorts by author A–Z", () => {
		const ids = sortNotes(notes, "author-az").map((n) => n.id);
		expect(ids).toEqual(["b", "c", "a"]);
	});

	it("sorts by author Z–A", () => {
		const ids = sortNotes(notes, "author-za").map((n) => n.id);
		expect(ids).toEqual(["a", "c", "b"]);
	});

	it("does not mutate the original array", () => {
		const copy = [...notes];
		sortNotes(notes, "author-az");
		expect(notes).toEqual(copy);
	});

	it("DEFAULT_NOTE_SORT_ORDER is a valid mode", () => {
		expect(() => sortNotes(notes, DEFAULT_NOTE_SORT_ORDER)).not.toThrow();
	});
});
