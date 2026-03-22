import type { UserBoardsResponse } from "@/types/userBoards";
import { getInternalApiOrigin } from "@/lib/api/origin";

export async function fetchUserBoards(): Promise<UserBoardsResponse> {
	const res = await fetch(`${getInternalApiOrigin()}/api/boards`, {
		cache: "no-store",
	});
	if (!res.ok) throw new Error("Failed to fetch boards");
	return res.json();
}
