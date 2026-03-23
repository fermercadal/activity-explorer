import NextLink from "next/link";
import type { ComponentProps } from "react";

const variants = {
	back: "mb-4 inline-block text-sm text-gray-500 hover:text-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400",
	board:
		"block w-64 rounded-lg border border-gray-200 bg-white px-5 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400",
	cta: "mt-8 inline-block rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400",
} as const;

export type AppLinkVariant = keyof typeof variants;

export type AppLinkProps = Omit<ComponentProps<typeof NextLink>, "className"> & {
	variant: AppLinkVariant;
	className?: string;
};

export function AppLink({ variant, className, ...props }: AppLinkProps) {
	return (
		<NextLink
			className={[variants[variant], className].filter(Boolean).join(" ")}
			{...props}
		/>
	);
}
