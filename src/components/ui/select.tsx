import type { ComponentProps } from "react";

const labelClass = "mb-1.5 block text-sm font-medium text-gray-700";
const selectClass =
	"w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 sm:text-sm";

export type SelectOption = { value: string; label: string };

export type SelectFieldProps = {
	id: string;
	label: string;
	/** Renders `<option>` rows inside the select (see `emptyOptionLabel`). */
	options: readonly SelectOption[];
	/** When set, prepends `<option value="">{emptyOptionLabel}</option>`. */
	emptyOptionLabel?: string;
} & Omit<ComponentProps<"select">, "className" | "id" | "children">;

export function SelectField({
	id,
	label,
	options,
	emptyOptionLabel,
	...selectProps
}: SelectFieldProps) {
	return (
		<div>
			<label htmlFor={id} className={labelClass}>
				{label}
			</label>
			<select id={id} className={selectClass} {...selectProps}>
				{emptyOptionLabel !== undefined && (
					<option value="">{emptyOptionLabel}</option>
				)}
				{options.map((opt) => (
					<option key={opt.value} value={opt.value}>
						{opt.label}
					</option>
				))}
			</select>
		</div>
	);
}
