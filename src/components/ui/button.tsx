import type { ComponentProps } from "react";

const baseClass =
	"rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white";

export type ButtonProps = ComponentProps<"button">;

export function Button({ className, type = "button", ...props }: ButtonProps) {
	return (
		<button
			type={type}
			className={[baseClass, className].filter(Boolean).join(" ")}
			{...props}
		/>
	);
}
