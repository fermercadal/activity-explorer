/**
 * Origin used for server-side fetches to this app’s own API routes.
 * Override in tests or deployment (e.g. INTERNAL_API_ORIGIN=https://…).
 */
export const internalApiOrigin = process.env.INTERNAL_API_ORIGIN ?? "http://localhost:3000";
