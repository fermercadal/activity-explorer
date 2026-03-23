import type { StickyNote } from "@/types/stickyNote";

/** Labels for the order `<select>`; values are the sort mode. */
export const NOTE_SORT_OPTIONS = [
	{ value: "position-tb", label: "Board position (top to bottom)" },
	{ value: "position-bt", label: "Board position (bottom to top)" },
	{ value: "author-az", label: "Author (A to Z)" },
	{ value: "author-za", label: "Author (Z to A)" },
] as const;

export type NoteSortOrder = (typeof NOTE_SORT_OPTIONS)[number]["value"];

/** Initial sort and value used by “reset all” for the order control. */
export const DEFAULT_NOTE_SORT_ORDER: NoteSortOrder = "position-tb";

export function filterNotes(
	notes: StickyNote[],
	author: string,
	color: string,
): StickyNote[] {
	let result = notes;
	if (author !== "") result = result.filter((n) => n.author === author);
	if (color !== "") result = result.filter((n) => n.color === color);
	return result;
}

/** Board coords: smaller y is higher on the board; tie-break with x left → right. */
export function sortNotes(notes: StickyNote[], order: NoteSortOrder): StickyNote[] {
	const copy = [...notes];
	switch (order) {
		case "position-tb":
			copy.sort((a, b) => a.y - b.y || a.x - b.x);
			break;
		case "position-bt":
			copy.sort((a, b) => b.y - a.y || b.x - a.x);
			break;
		case "author-az":
			copy.sort((a, b) => a.author.localeCompare(b.author));
			break;
		case "author-za":
			copy.sort((a, b) => b.author.localeCompare(a.author));
			break;
	}
	return copy;
}
