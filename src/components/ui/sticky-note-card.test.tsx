import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { StickyNote } from "@/types/stickyNote";
import { StickyNoteCard } from "./sticky-note-card";

const baseNote: StickyNote = {
	id: "n1",
	text: "Hello world",
	x: 10,
	y: 20,
	author: "Ada",
	color: "yellow",
	createdAt: "2020-01-01T00:00:00.000Z",
};

describe("StickyNoteCard", () => {
	it("renders note content", () => {
		render(<StickyNoteCard note={baseNote} />);
		expect(screen.getByText("Hello world")).toBeInTheDocument();
		expect(screen.getByText(/x: 10/)).toBeInTheDocument();
		expect(screen.getByText(/y: 20/)).toBeInTheDocument();
		expect(screen.getByText(/color: yellow/)).toBeInTheDocument();
		expect(screen.getByText("Ada")).toBeInTheDocument();
	});

	it("uses article semantics", () => {
		render(<StickyNoteCard note={baseNote} />);
		expect(screen.getByRole("article")).toBeInTheDocument();
	});

	it("applies palette background for known color", () => {
		render(<StickyNoteCard note={{ ...baseNote, color: "blue" }} />);
		expect(screen.getByRole("article").className).toContain("bg-blue-100/90");
	});

	it("applies fallback background for unknown color", () => {
		render(<StickyNoteCard note={{ ...baseNote, color: "unknown" }} />);
		expect(screen.getByRole("article").className).toContain("bg-amber-50/90");
	});
});
