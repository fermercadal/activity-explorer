import type { UserBoardsResponse } from "@/types/userBoards";
import { internalApiOrigin } from "@/lib/api/origin";

const API_BOARDS = `${internalApiOrigin}/api/boards`;

export async function fetchUserBoards(): Promise<UserBoardsResponse> {
  const res = await fetch(API_BOARDS, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch boards");
  return res.json();
}
