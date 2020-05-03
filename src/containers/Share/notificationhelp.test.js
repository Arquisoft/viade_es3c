import React from "react";
import { render, cleanup, queryByAttribute, fireEvent } from "react-testing-library";
import { HashRouter as Router } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Notifications from "./NotificationHelp";

library.add(fas);

const props = {
	ruta: "rutaprueba",
	show: true,
	setshow: true
};

describe.only("NotificationHelp", () => {
	afterAll(cleanup);
	const getById = queryByAttribute.bind(null, "id");
	const { container } = render(
		<Router>
			<Notifications {...{ props }} />
		</Router>
	);

	test("renders without crashing", () => {
		expect(container).toBeTruthy();
	});
});
