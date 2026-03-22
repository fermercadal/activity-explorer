import electronicMusic from "@/app/api/notes/data/electronic-music.json";
import photography from "@/app/api/notes/data/photography.json";
import starWars from "@/app/api/notes/data/star-wars.json";
import type { RawStickyNote } from "@/app/api/notes/lib/hydrate-notes";

const RAW_BY_SLUG: Record<string, RawStickyNote[]> = {
	"star-wars": starWars,
	"electronic-music": electronicMusic,
	photography: photography,
};

export function getRawNotesForBoard(slug: string): RawStickyNote[] | undefined {
	return RAW_BY_SLUG[slug];
}
