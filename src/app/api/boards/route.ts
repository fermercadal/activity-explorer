import { NextResponse } from "next/server";
import type { UserBoardsResponse } from "@/types/userBoards";

const USER_BOARDS: UserBoardsResponse = {
  username: "Fer",
  boards: [
    { label: "Star Wars quotes", slug: "star-wars" },
    { label: "Electronic music gear", slug: "electronic-music" },
    { label: "Photography gear", slug: "photography" },
  ],
};

export function GET() {
  return NextResponse.json(USER_BOARDS);
}
