import { NextResponse } from "next/server";
import { BOARD_CATALOG } from "@/lib/boards/catalog";
import type { UserBoardsResponse } from "@/types/userBoards";

const USER_BOARDS: UserBoardsResponse = {
	username: "Fer",
	boards: BOARD_CATALOG.map(({ slug, label }) => ({ slug, label })),
};

export function GET() {
	return NextResponse.json(USER_BOARDS);
}
