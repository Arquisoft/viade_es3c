import React from "react";
import { render } from "react-testing-library";
import { i18n } from "./i18n";
import { I18nextProvider } from "react-i18next";

describe("i18n", () => {
	it("renders all documents in the list", () => {
		const c = render(<I18nextProvider i18n={i18n} />);

		expect(c).toBeTruthy();
	});
});
