import { NextResponse } from "next/server";
import starWars from "./data/star-wars.json";
import electronicMusic from "./data/electronic-music.json";
import photography from "./data/photography.json";
import { hydrateStickyNotes, type RawStickyNote } from "./lib/hydrate-notes";

const BOARDS: Record<string, RawStickyNote[]> = {
  "star-wars": starWars,
  "electronic-music": electronicMusic,
  photography: photography,
};

export function GET(request: Request) {
  const boardId = new URL(request.url).searchParams.get("boardId");
  if (!boardId) {
    return NextResponse.json({ error: "Missing boardId query parameter" }, { status: 400 });
  }

  const raw = BOARDS[boardId];
  if (!raw) {
    return NextResponse.json({ error: "Unknown board" }, { status: 404 });
  }

  const notes = hydrateStickyNotes(raw, boardId);
  return NextResponse.json(notes);
}
