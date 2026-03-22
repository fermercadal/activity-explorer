import type { StickyNote } from "@/types/stickyNote";
import { internalApiOrigin } from "@/lib/api/origin";

export async function fetchNotesForBoard(boardId: string): Promise<StickyNote[]> {
  const url = `${internalApiOrigin}/api/notes?boardId=${encodeURIComponent(boardId)}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch notes");
  return res.json();
}
