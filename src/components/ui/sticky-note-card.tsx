import type { ComponentProps } from "react";
import { stickyNoteBackgroundClass } from "@/lib/notes/note-colors";
import type { StickyNote } from "@/types/stickyNote";

const shellClass =
	"box-border flex min-w-0 flex-col gap-0.5 overflow-hidden rounded-md border border-gray-200 p-2 text-left shadow-sm";

export type StickyNoteCardProps = {
	note: StickyNote;
} & Omit<ComponentProps<"article">, "children">;

export function StickyNoteCard({ note, className, ...props }: StickyNoteCardProps) {
	return (
		<article
			className={[shellClass, stickyNoteBackgroundClass(note.color), className]
				.filter(Boolean)
				.join(" ")}
			{...props}
		>
			<p className="line-clamp-3 text-xs font-medium leading-snug text-gray-900">{note.text}</p>
			<p className="text-[10px] leading-tight text-gray-600">
				x: {note.x} · y: {note.y}
			</p>
			<p className="text-[10px] leading-tight text-gray-600">color: {note.color}</p>
			<p className="mt-auto truncate text-[10px] font-medium text-gray-700">{note.author}</p>
		</article>
	);
}
