function withoutTrailingSlashes(origin: string): string {
	return origin.replace(/\/+$/, "");
}

/**
 * Base URL for server-side HTTP requests to this app’s own Route Handlers.
 *
 * Resolution order:
 * 1. `INTERNAL_API_ORIGIN` — use when inference is wrong (Docker, custom domain, tests).
 * 2. `VERCEL_URL` — set by Vercel (hostname only; we prefix `https://`).
 * 3. Local fallback — `http://127.0.0.1` and `PORT` (Next defaults to 3000 when unset).
 */
export function getInternalApiOrigin(): string {
	const explicit = process.env.INTERNAL_API_ORIGIN?.trim();
	if (explicit) return withoutTrailingSlashes(explicit);

	const vercel = process.env.VERCEL_URL?.trim();
	if (vercel) return `https://${vercel}`;

	const port = process.env.PORT ?? "3000";
	return `http://127.0.0.1:${port}`;
}
