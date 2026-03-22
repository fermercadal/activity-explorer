import { NextResponse } from "next/server";
import { hydrateStickyNotes } from "./lib/hydrate-notes";
import { getRawNotesForBoard } from "@/lib/boards/raw-notes";

export function GET(request: Request) {
	const boardId = new URL(request.url).searchParams.get("boardId");
	if (!boardId) {
		return NextResponse.json({ error: "Missing boardId query parameter" }, { status: 400 });
	}

	const raw = getRawNotesForBoard(boardId);
	if (!raw) {
		return NextResponse.json({ error: "Unknown board" }, { status: 404 });
	}

	const notes = hydrateStickyNotes(raw, boardId);
	return NextResponse.json(notes);
}
