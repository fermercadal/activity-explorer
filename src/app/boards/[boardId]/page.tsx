import { notFound } from "next/navigation";
import { fetchBoardPage } from "@/lib/api/board-page";
import { BOARD_CATALOG } from "@/lib/boards/catalog";
import NoteList from "./NoteList";

/** Unknown slugs 404 here so the page (and `notFound()` after `await`) never run — avoids a React devtools `performance.measure` bug. */
export const dynamicParams = false;

export function generateStaticParams() {
	return BOARD_CATALOG.map(({ slug }) => ({ boardId: slug }));
}

type Props = {
	params: Promise<{ boardId: string }>;
};

export default async function BoardPage({ params }: Props) {
	const { boardId } = await params;

	const data = await fetchBoardPage(boardId);
	if (data === null) notFound();

	return (
		<main>
			<NoteList notes={data.notes} boardTitle={data.label} />
		</main>
	);
}
