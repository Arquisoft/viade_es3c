import React from "react";
import { render, cleanup, queryByAttribute, fireEvent } from "react-testing-library";
import { HashRouter as Router } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import UploadRoute from "../UploadRoute";
import * as Toaster from "../../../utils/toaster";
import { configure } from "enzyme";
import { getByTestId } from "@testing-library/dom";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

library.add(fas);

const props = {
	webId: "https://saragarcia.solid.community/"
};

describe.only("NewRoute", () => {
	afterAll(cleanup);

	const { container } = render(
		<Router>
			<UploadRoute {...{ ...props }} />
		</Router>
	);

	test("renders without crashing", async () => {
		expect(container).toBeTruthy();
	});

	test("trying to create a route without a title", () => {
		render(
			<Router>
				<UploadRoute {...{ props }} />
			</Router>
		);
		const button_save = getByTestId(container, "bt-save");

		fireEvent.click(button_save);
		expect(Toaster.errorToaster()).toHaveBeenCalled;
	});

	test("trying to create a route without a description", () => {
		render(
			<Router>
				<UploadRoute {...{ props }} />
			</Router>
		);
		const nameInput = getByTestId(container, "route_name");
		fireEvent.change(nameInput, { target: { value: "prueba" } });

		const descriptionInput = getByTestId(container, "route_description");
		fireEvent.change(descriptionInput, { target: { value: "" } });

		const button_save = getByTestId(container, "bt-save");
		fireEvent.click(button_save);

		expect(Toaster.errorToaster()).toHaveBeenCalled;
	});

	test("Trying to upload a Route with any file", () => {
		const nameInput = getByTestId(container, "route_name");
		const descriptionInput = getByTestId(container, "route_description");
		const button_save = getByTestId(container, "bt-save");

		fireEvent.change(nameInput, { target: { value: "prueba" } });
		fireEvent.change(descriptionInput, { target: { value: "esto es una prueba" } });

		expect(nameInput.value).toEqual("prueba");
		expect(descriptionInput.value).toEqual("esto es una prueba");

		const getById = queryByAttribute.bind(null, "id");
		const input_img = getById(container, "input-img");

		const img = new File([ "(⌐□_□)" ], "img.png", {
			type: "image/png"
		});

		const fileInput = getByTestId(container, "file-input");
		const anyfile = "prueba any file";
		const file = new File([ anyfile ], "prueba.txt");

		Object.defineProperty(fileInput, "files", { value: [ file ] });
		fireEvent.change(fileInput);
		Object.defineProperty(container, "file", { value: file });
		fireEvent.change(container);

		fireEvent.click(button_save);
	});
});
