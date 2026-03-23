import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import type { ComponentProps, ReactNode } from "react";
import { afterEach, vi } from "vitest";

afterEach(() => {
	cleanup();
});

vi.mock("next/link", () => ({
	default: function MockLink({
		children,
		href,
		...props
	}: { children: ReactNode; href: string } & Omit<ComponentProps<"a">, "href">) {
		return (
			<a href={href} {...props}>
				{children}
			</a>
		);
	},
}));
