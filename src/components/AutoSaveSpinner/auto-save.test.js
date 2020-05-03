import React from "react";
import { render, cleanup } from "react-testing-library";
import { HashRouter as Router } from "react-router-dom";
import AutoSaveSpinner from "../AutoSaveSpinner";

describe.only("AutoSaveSpinner", () => {
	afterAll(cleanup);

	const { container } = render(
		<Router>
			<AutoSaveSpinner />
		</Router>
	);

	test("renders without crashing", () => {
		expect(container).toBeTruthy();
	});
});
