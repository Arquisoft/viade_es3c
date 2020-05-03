import React from "react";
import { cleanup, render, queryByAttribute, fireEvent } from "react-testing-library";
import { HashRouter as Router } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import MyFriends from "./MyFriends";
import InfoFriends from "./InfoFriends";
import { act } from "react-dom/test-utils";
import * as friends from "./MyFriends";
import * as Toaster from "../../utils/toaster";

library.add(fas);

const props = {
	webId: "https://saragr.inrupt.net/"
};

describe.only("MyFriends", () => {
	afterAll(cleanup);
	const getById = queryByAttribute.bind(null, "id");

	const { container } = render(
		<Router>
			<MyFriends {...{ ...props }}>
				<InfoFriends />
			</MyFriends>
		</Router>
	);

	test("renders without crashing", () => {
		act(() => {
			expect(container).toBeTruthy();
		});
	});

	test("functions", () => {
		expect(friends.getUserName("https://saragg.solid.community/profile/card#me/")).toBe("saragg/");
		expect(friends.getUrl("https://saragg.solid.community/profile/card#me")).toBe(
			"https://saragg.solid.community/"
		);
	});

	test("click", () => {
		expect(Toaster.successToaster()).toHaveBeenCalled;
	});
});
