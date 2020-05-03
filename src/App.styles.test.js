import React from "react";
import { render, cleanup } from "react-testing-library";
import { Toaster } from "./App.styled";

afterAll(cleanup);

const { container } = render(<Toaster t={(key) => key} />);

describe("Toasted", () => {
	it("renders without crashing", () => {
		expect(container).toBeTruthy();
	});
});
