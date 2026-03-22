/** Single source for board slugs and human-readable titles (home + board APIs). */
export const BOARD_CATALOG = [
	{ slug: "star-wars", label: "Star Wars quotes" },
	{ slug: "electronic-music", label: "Electronic music gear" },
	{ slug: "photography", label: "Photography gear" },
] as const;

export function getBoardLabel(slug: string): string | undefined {
	return BOARD_CATALOG.find((b) => b.slug === slug)?.label;
}
