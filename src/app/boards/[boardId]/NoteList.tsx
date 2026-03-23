"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
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
	const [sortOrder, setSortOrder] = useState<NoteSortOrder>(DEFAULT_NOTE_SORT_ORDER);

	const authors = useMemo(() => {
		const set = new Set(notes.map((n) => n.author));
		return [...set].sort((a, b) => a.localeCompare(b));
	}, [notes]);

	const colors = useMemo(() => {
		const set = new Set(notes.map((n) => n.color));
		return [...set].sort((a, b) => a.localeCompare(b));
	}, [notes]);

	const filtered = useMemo(() => {
		const narrowed = filterNotes(notes, authorFilter, colorFilter);
		return sortNotes(narrowed, sortOrder);
	}, [notes, authorFilter, colorFilter, sortOrder]);

	const controlsAreDefault =
		authorFilter === "" &&
		colorFilter === "" &&
		sortOrder === DEFAULT_NOTE_SORT_ORDER;

	const listContainerRef = useRef<HTMLDivElement>(null);
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
			setContainerWidth(node.clientWidth);
		}

		measure();
		const ro = new ResizeObserver(measure);
		ro.observe(el);
		window.addEventListener("resize", measure);
		return () => {
			ro.disconnect();
			window.removeEventListener("resize", measure);
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
		<div className="min-h-screen bg-gray-50">
			<header className="sticky top-0 z-20 border-b border-gray-200 bg-gray-50/95 px-4 pb-4 pt-4 backdrop-blur-sm supports-[backdrop-filter]:bg-gray-50/90 sm:px-6 sm:pb-5 sm:pt-6 lg:px-8">
				<Link
					href="/"
					className="mb-4 inline-block text-sm text-gray-500 hover:text-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
				>
					← Back
				</Link>
				<h1 className="text-balance text-2xl font-bold text-gray-800 sm:text-3xl">{boardTitle}</h1>

				<div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					<div>
						<label
							htmlFor="note-author-filter"
							className="mb-1.5 block text-sm font-medium text-gray-700"
						>
							Filter by author
						</label>
						<select
							id="note-author-filter"
							value={authorFilter}
							onChange={(e) => setAuthorFilter(e.target.value)}
							className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 sm:text-sm"
						>
							<option value="">Show all</option>
							{authors.map((author) => (
								<option key={author} value={author}>
									{author}
								</option>
							))}
						</select>
					</div>
					<div>
						<label
							htmlFor="note-color-filter"
							className="mb-1.5 block text-sm font-medium text-gray-700"
						>
							Filter by color
						</label>
						<select
							id="note-color-filter"
							value={colorFilter}
							onChange={(e) => setColorFilter(e.target.value)}
							className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 sm:text-sm"
						>
							<option value="">Show all</option>
							{colors.map((color) => (
								<option key={color} value={color}>
									{color}
								</option>
							))}
						</select>
					</div>
					<div className="sm:col-span-2 lg:col-span-1">
						<label
							htmlFor="note-sort-order"
							className="mb-1.5 block text-sm font-medium text-gray-700"
						>
							Order
						</label>
						<select
							id="note-sort-order"
							value={sortOrder}
							onChange={(e) => setSortOrder(e.target.value as NoteSortOrder)}
							className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 sm:text-sm"
						>
							{NOTE_SORT_OPTIONS.map((opt) => (
								<option key={opt.value} value={opt.value}>
									{opt.label}
								</option>
							))}
						</select>
					</div>
				</div>
				<div className="mt-4 flex justify-end">
					<button
						type="button"
						disabled={controlsAreDefault}
						onClick={() => {
							setAuthorFilter("");
							setColorFilter("");
							setSortOrder(DEFAULT_NOTE_SORT_ORDER);
						}}
						className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
					>
						Reset all
					</button>
				</div>
				<p className="sr-only" aria-live="polite">
					{filtered.length} sticky notes shown
				</p>

				<p className="mt-3 text-sm text-gray-500" aria-hidden>
					{filtered.length} sticky notes
				</p>
			</header>

			<div className="px-4 sm:mx-6 sm:px-0 lg:mx-8">
				<div
					ref={listContainerRef}
					className="relative w-full overflow-hidden rounded-b-lg border border-t-0 border-gray-200 bg-white"
					style={{ height: virtualizer.getTotalSize() }}
					role="region"
					aria-label="Sticky notes grid"
				>
					{virtualizer.getVirtualItems().map((virtualRow) => {
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
								className="flex flex-row"
								style={{
									position: "absolute",
									top,
									left: 0,
									width: "100%",
									height: cellSize,
									gap: GAP,
								}}
							>
								{rowNotes.map((note) => (
									<div
										key={note.id}
										style={{
											width: cellSize,
											height: cellSize,
											flexShrink: 0,
										}}
										className="box-border flex min-w-0 flex-col gap-0.5 overflow-hidden rounded-md border border-gray-200 bg-amber-50/90 p-2 text-left shadow-sm"
									>
										<p className="line-clamp-3 text-xs font-medium leading-snug text-gray-900">
											{note.text}
										</p>
										<p className="text-[10px] leading-tight text-gray-600">
											x: {note.x} · y: {note.y}
										</p>
										<p className="text-[10px] leading-tight text-gray-600">color: {note.color}</p>
										<p className="mt-auto truncate text-[10px] font-medium text-gray-700">
											{note.author}
										</p>
									</div>
								))}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
