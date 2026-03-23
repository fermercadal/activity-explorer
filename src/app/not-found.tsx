import type { Metadata } from "next";
import { AppLink } from "@/components/ui";

export const metadata: Metadata = {
	title: {
		absolute: "Page not found",
	},
};

export default function NotFound() {
	return (
		<main className="min-h-screen bg-gray-50 px-4 py-12 sm:px-8">
			<div className="mx-auto max-w-lg">
				<p className="text-sm font-medium text-gray-500">404</p>
				<h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">Page not found</h1>
				<p className="mt-3 text-gray-600">
					This board or page doesn&apos;t exist. Check the URL or start again from home.
				</p>
				<AppLink href="/" variant="cta">
					Back to home
				</AppLink>
			</div>
		</main>
	);
}
