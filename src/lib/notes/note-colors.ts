/** Cycle order for `hydrateStickyNotes` and Tailwind backgrounds for `StickyNoteCard`. */
export const STICKY_NOTE_COLOR_NAMES = [
	"yellow",
	"pink",
	"blue",
	"green",
	"orange",
	"purple",
] as const;

export type StickyNotePaletteColor = (typeof STICKY_NOTE_COLOR_NAMES)[number];

/** Full class strings so Tailwind can statically see them (no dynamic `bg-${x}`). */
export const STICKY_NOTE_BG_CLASS: Record<StickyNotePaletteColor, string> = {
	yellow: "bg-yellow-100/90",
	pink: "bg-pink-100/90",
	blue: "bg-blue-100/90",
	green: "bg-green-100/90",
	orange: "bg-orange-100/90",
	purple: "bg-purple-100/90",
};

export function stickyNoteBackgroundClass(color: string): string {
	return color in STICKY_NOTE_BG_CLASS
		? STICKY_NOTE_BG_CLASS[color as StickyNotePaletteColor]
		: "bg-amber-50/90";
}
