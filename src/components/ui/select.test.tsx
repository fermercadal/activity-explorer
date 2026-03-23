import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SelectField } from "./select";

describe("SelectField", () => {
	it("associates label with select", () => {
		render(
			<SelectField
				id="f1"
				label="Choose"
				value=""
				onChange={() => {}}
				options={[{ value: "a", label: "Alpha" }]}
			/>,
		);
		expect(screen.getByLabelText("Choose")).toBeInTheDocument();
	});

	it("renders options and empty option when emptyOptionLabel is set", () => {
		render(
			<SelectField
				id="f2"
				label="Pick"
				value=""
				onChange={() => {}}
				options={[{ value: "x", label: "X" }]}
				emptyOptionLabel="All"
			/>,
		);
		const select = screen.getByRole("combobox", { name: "Pick" });
		expect(select).toHaveValue("");
		const opts = screen.getAllByRole("option").map((o) => o.textContent);
		expect(opts).toEqual(["All", "X"]);
	});

	it("fires onChange when value changes", () => {
		const onChange = vi.fn();
		render(
			<SelectField
				id="f3"
				label="Color"
				value=""
				onChange={onChange}
				options={[
					{ value: "red", label: "Red" },
					{ value: "blue", label: "Blue" },
				]}
				emptyOptionLabel="Any"
			/>,
		);
		const select = screen.getByRole("combobox", { name: "Color" });
		fireEvent.change(select, { target: { value: "red" } });
		expect(onChange).toHaveBeenCalledTimes(1);
	});
});
