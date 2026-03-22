import Link from "next/link";
import type { Metadata } from "next";

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
				<Link
					href="/"
					className="mt-8 inline-block rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
				>
					Back to home
				</Link>
			</div>
		</main>
	);
}
