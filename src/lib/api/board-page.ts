import type { StickyNote } from "@/types/stickyNote";
import { getInternalApiOrigin } from "@/lib/api/origin";

export type BoardPagePayload = {
	label: string;
	notes: StickyNote[];
};

/** One round-trip: board title + hydrated notes for a slug. */
export async function fetchBoardPage(boardId: string): Promise<BoardPagePayload | null> {
	const url = `${getInternalApiOrigin()}/api/boards/${encodeURIComponent(boardId)}`;
	const res = await fetch(url, { cache: "no-store" });
	if (res.status === 404) return null;
	if (!res.ok) throw new Error("Failed to fetch board");
	return res.json();
}
