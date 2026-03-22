import type { StickyNote } from "@/types/stickyNote";

export type RawStickyNote = {
	text: string;
	author: string;
};

const COLORS = ["yellow", "pink", "blue", "green", "orange", "purple"] as const;

export function hydrateStickyNotes(
	items: RawStickyNote[],
	idPrefix: string,
): StickyNote[] {
	return items.map((item, i) => ({
		id: `${idPrefix}_${i + 1}`,
		text: item.text,
		author: item.author,
		x: 80 + ((i * 37) % 920),
		y: 60 + ((i * 53) % 880),
		color: COLORS[i % COLORS.length]!,
		createdAt: new Date(Date.now() - i * 45 * 60 * 1000).toISOString(),
	}));
}
