"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import type { StickyNote } from "@/types/stickyNote";

type Props = {
  notes: StickyNote[];
  boardTitle: string;
};

const ROW_HEIGHT = 72;
const OVERSCAN = 5;

function filterByAuthor(notes: StickyNote[], author: string): StickyNote[] {
  if (author === "") return notes;
  return notes.filter((n) => n.author === author);
}

export default function NoteList({ notes, boardTitle }: Props) {
  const [authorFilter, setAuthorFilter] = useState("");

  const authors = useMemo(() => {
    const set = new Set(notes.map((n) => n.author));
    return [...set].sort((a, b) => a.localeCompare(b));
  }, [notes]);

  const filtered = useMemo(
    () => filterByAuthor(notes, authorFilter),
    [notes, authorFilter],
  );

  const listContainerRef = useRef<HTMLDivElement>(null);
  const [scrollMargin, setScrollMargin] = useState(0);

  useLayoutEffect(() => {
    const el = listContainerRef.current;
    if (!el) return;

    function measure() {
      const node = listContainerRef.current;
      if (!node) return;
      setScrollMargin(node.getBoundingClientRect().top + window.scrollY);
    }

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [authorFilter, filtered.length, boardTitle]);

  const virtualizer = useWindowVirtualizer({
    count: filtered.length,
    estimateSize: () => ROW_HEIGHT,
    overscan: OVERSCAN,
    scrollMargin,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [authorFilter]);

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

        <div className="mt-5">
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
            className="w-full max-w-md rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 sm:text-sm"
          >
            <option value="">Show all</option>
            {authors.map((author) => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
          </select>
          <p className="sr-only" aria-live="polite">
            {filtered.length} sticky notes shown
          </p>
        </div>

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
          aria-label="Sticky notes list"
        >
          {virtualizer.getVirtualItems().map((virtualRow) => {
            const note = filtered[virtualRow.index];
            // scrollMargin is included in virtualRow.start for window scroll math; subtract it
            // when positioning inside the list container so rows start at the top (TanStack Virtual).
            const top = virtualRow.start - scrollMargin;
            return (
              <div
                key={virtualRow.key}
                style={{
                  position: "absolute",
                  top,
                  left: 0,
                  right: 0,
                  height: ROW_HEIGHT,
                }}
                className="flex items-center gap-4 border-b border-gray-100 px-4 sm:px-5"
              >
                <span className="min-w-0 flex-1 truncate font-medium text-gray-800" title={note.text}>
                  {note.text}
                </span>
                <span className="shrink-0 text-sm text-gray-500">{note.author}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
