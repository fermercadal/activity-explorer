import { fetchNotesForBoard } from "@/lib/api/notes";
import NoteList from "./NoteList";

const BOARD_TITLES: Record<string, string> = {
  "star-wars": "Star Wars quotes",
  "electronic-music": "Electronic music gear",
  photography: "Photography gear",
};

type Props = {
  params: Promise<{ boardId: string }>;
};

export default async function BoardPage({ params }: Props) {
  const { boardId } = await params;
  const notes = await fetchNotesForBoard(boardId);

  const title = BOARD_TITLES[boardId] ?? `Board: ${boardId}`;

  return (
    <main>
      <NoteList notes={notes} boardTitle={title} />
    </main>
  );
}
