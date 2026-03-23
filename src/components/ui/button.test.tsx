import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./button";

describe("Button", () => {
	it("renders children", () => {
		render(<Button>Save</Button>);
		expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
	});

	it("defaults to type button", () => {
		render(<Button>Go</Button>);
		expect(screen.getByRole("button")).toHaveAttribute("type", "button");
	});

	it("forwards type submit", () => {
		render(<Button type="submit">Send</Button>);
		expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
	});

	it("calls onClick when enabled", async () => {
		const user = userEvent.setup();
		const onClick = vi.fn();
		render(<Button onClick={onClick}>Tap</Button>);
		await user.click(screen.getByRole("button"));
		expect(onClick).toHaveBeenCalledTimes(1);
	});

	it("does not call onClick when disabled", async () => {
		const user = userEvent.setup();
		const onClick = vi.fn();
		render(
			<Button disabled onClick={onClick}>
				Nope
			</Button>,
		);
		await user.click(screen.getByRole("button"));
		expect(onClick).not.toHaveBeenCalled();
	});
});
