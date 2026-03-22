import { NextResponse } from "next/server";
import { hydrateStickyNotes } from "@/app/api/notes/lib/hydrate-notes";
import { getBoardLabel } from "@/lib/boards/catalog";
import { getRawNotesForBoard } from "@/lib/boards/raw-notes";

type RouteContext = {
	params: Promise<{ boardId: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
	const { boardId } = await context.params;

	const label = getBoardLabel(boardId);
	const raw = getRawNotesForBoard(boardId);

	if (!label || !raw) {
		return NextResponse.json({ error: "Unknown board" }, { status: 404 });
	}

	const notes = hydrateStickyNotes(raw, boardId);
	return NextResponse.json({ label, notes });
}
