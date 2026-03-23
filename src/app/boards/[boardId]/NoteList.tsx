"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import {
	AppLink,
	Button,
	SelectField,
	StickyNoteCard,
	type SelectOption,
} from "@/components/ui";
import {
	DEFAULT_NOTE_SORT_ORDER,
	filterNotes,
	sortNotes,
	NOTE_SORT_OPTIONS,
	type NoteSortOrder,
} from "@/lib/notes/note-filter-sort";
import type { StickyNote } from "@/types/stickyNote";

type Props = {
	notes: StickyNote[];
	boardTitle: string;
};

/** Minimum square edge (px); columns fill width with equal squares + gaps */
const MIN_CELL = 152;
const GAP = 12;
const OVERSCAN = 3;

export default function NoteList({ notes, boardTitle }: Props) {
	const [authorFilter, setAuthorFilter] = useState("");
	const [colorFilter, setColorFilter] = useState("");
	const [sortOrder, setSortOrder] = useState<NoteSortOrder>(
		DEFAULT_NOTE_SORT_ORDER,
	);

	const authors = useMemo(() => {
		const set = new Set(notes.map(n => n.author));
		return [...set].sort((a, b) => a.localeCompare(b));
	}, [notes]);

	const colors = useMemo(() => {
		const set = new Set(notes.map(n => n.color));
		return [...set].sort((a, b) => a.localeCompare(b));
	}, [notes]);

	const authorSelectOptions = useMemo<SelectOption[]>(
		() => authors.map(author => ({ value: author, label: author })),
		[authors],
	);

	const colorSelectOptions = useMemo<SelectOption[]>(
		() => colors.map(color => ({ value: color, label: color })),
		[colors],
	);

	const sortSelectOptions = useMemo<SelectOption[]>(
		() => [...NOTE_SORT_OPTIONS],
		[],
	);

	const filtered = useMemo(() => {
		const narrowed = filterNotes(notes, authorFilter, colorFilter);
		return sortNotes(narrowed, sortOrder);
	}, [notes, authorFilter, colorFilter, sortOrder]);

	const controlsAreDefault =
		authorFilter === "" &&
		colorFilter === "" &&
		sortOrder === DEFAULT_NOTE_SORT_ORDER;

	const listContainerRef = useRef<HTMLElement>(null);
	const [scrollMargin, setScrollMargin] = useState(0);
	const [containerWidth, setContainerWidth] = useState(0);

	// Remeasure when filter-driven row count changes; sort order and title do not affect container geometry.
	useLayoutEffect(() => {
		const el = listContainerRef.current;
		if (!el) return;

		function measure() {
			const node = listContainerRef.current;
			if (!node) return;
			setScrollMargin(node.getBoundingClientRect().top + window.scrollY);
			setContainerWidth(Math.max(0, node.clientWidth));
		}

		measure();
		const ro = new ResizeObserver(measure);
		ro.observe(el);
		return () => {
			ro.disconnect();
		};
	}, [authorFilter, colorFilter, filtered.length]);

	const layout = useMemo(() => {
		const w = Math.max(containerWidth, MIN_CELL);
		const cols = Math.max(1, Math.floor((w + GAP) / (MIN_CELL + GAP)));
		const cellSize = (w - GAP * (cols - 1)) / cols;
		const rowHeight = cellSize + GAP;
		const rowCount = Math.ceil(filtered.length / cols) || 0;
		return {
			numCols: cols,
			cellSize,
			rowHeight,
			rowCount,
		};
	}, [containerWidth, filtered.length]);

	const virtualizer = useWindowVirtualizer({
		count: layout.rowCount,
		estimateSize: () => layout.rowHeight,
		overscan: OVERSCAN,
		scrollMargin,
	});

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "auto" });
	}, [authorFilter, colorFilter, sortOrder]);

	return (
		<section className="min-h-screen bg-gray-50" aria-labelledby="board-title">
			<header className="sticky top-0 z-20 border-b border-gray-200 bg-gray-50 px-4 pb-4 pt-4 sm:px-6 sm:pb-5 sm:pt-6 lg:px-8">
				<AppLink href="/" variant="back">
					← Back
				</AppLink>
				<h1
					id="board-title"
					className="text-balance text-2xl font-bold text-gray-800 sm:text-3xl"
				>
					{boardTitle}
				</h1>

				<search>
					<div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						<SelectField
							id="note-author-filter"
							label="Filter by author"
							value={authorFilter}
							onChange={e => setAuthorFilter(e.target.value)}
							options={authorSelectOptions}
							emptyOptionLabel="Show all"
						/>
						<SelectField
							id="note-color-filter"
							label="Filter by color"
							value={colorFilter}
							onChange={e => setColorFilter(e.target.value)}
							options={colorSelectOptions}
							emptyOptionLabel="Show all"
						/>
						<div className="sm:col-span-2 lg:col-span-1">
							<SelectField
								id="note-sort-order"
								label="Order"
								value={sortOrder}
								onChange={e => setSortOrder(e.target.value as NoteSortOrder)}
								options={sortSelectOptions}
							/>
						</div>
					</div>
					<div className="mt-4 flex justify-end">
						<Button
							disabled={controlsAreDefault}
							onClick={() => {
								setAuthorFilter("");
								setColorFilter("");
								setSortOrder(DEFAULT_NOTE_SORT_ORDER);
							}}
						>
							Reset all
						</Button>
					</div>
				</search>
				<p className="sr-only" aria-live="polite">
					{filtered.length} sticky notes shown
				</p>

				<p className="mt-3 text-sm text-gray-500" aria-hidden>
					{filtered.length} sticky notes
				</p>
			</header>

			<div className="px-4 py-4 sm:mx-6 sm:px-0 lg:mx-8">
				<section
					ref={listContainerRef}
					className="relative w-full min-w-0 overflow-x-hidden"
					style={
						filtered.length === 0
							? { minHeight: "12rem" }
							: { height: virtualizer.getTotalSize() }
					}
					aria-label={
						filtered.length === 0 ? "No sticky notes to show" : "Sticky notes grid"
					}
				>
					{filtered.length === 0 ? (
						<p
							className="px-2 py-10 text-center text-sm text-gray-600 sm:px-0"
							role="status"
						>
							{notes.length === 0
								? "No sticky notes on this board."
								: "No sticky notes match these filters. Try changing them or use Reset all."}
						</p>
					) : (
						virtualizer.getVirtualItems().map(virtualRow => {
							const rowIndex = virtualRow.index;
							const top = virtualRow.start - scrollMargin;
							const { numCols, cellSize } = layout;
							const rowNotes: StickyNote[] = [];

							for (let col = 0; col < numCols; col++) {
								const i = rowIndex * numCols + col;
								if (i >= filtered.length) break;
								rowNotes.push(filtered[i]!);
							}

							return (
								<div
									key={virtualRow.key}
									className="grid min-w-0"
									style={{
										position: "absolute",
										top,
										left: 0,
										width: "100%",
										height: cellSize,
										gridTemplateColumns: `repeat(${numCols}, minmax(0, 1fr))`,
										columnGap: GAP,
									}}
								>
									{rowNotes.map(note => (
										<StickyNoteCard
											key={note.id}
											note={note}
											className="min-h-0 min-w-0"
											style={{
												width: "100%",
												height: "100%",
											}}
										/>
									))}
								</div>
							);
						})
					)}
				</section>
			</div>
		</section>
	);
}
