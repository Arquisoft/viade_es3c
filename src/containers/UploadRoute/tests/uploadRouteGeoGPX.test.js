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

	test("Trying to upload a Route with gpx", () => {
		const nameInput = getByTestId(container, "route_name");
		const descriptionInput = getByTestId(container, "route_description");
		const button_save = getByTestId(container, "bt-save");

		fireEvent.change(nameInput, { target: { value: "prueba" } });
		fireEvent.change(descriptionInput, { target: { value: "esto es una prueba" } });

		expect(nameInput.value).toEqual("prueba");
		expect(descriptionInput.value).toEqual("esto es una prueba");

		const fileInput = getByTestId(container, "file-input");
		const gpx =
			'<?xml version="1.0" encoding="UTF-8"?><gpx creator="StravaGPX Android" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd" version="1.1" xmlns="http://www.topografix.com/GPX/1/1"> <metadata><time>2019-05-11T18:16:59Z</time> </metadata> <trk><name>Atletismo al anochecer</name><type>9</type><trkseg> <trkpt lat="43.3614310" lon="-5.8551880"><ele>255.5</ele><time>2019-05-11T18:16:59Z</time> </trkpt> <trkpt lat="43.3614120" lon="-5.8551590"><ele>255.5</ele><time>2019-05-11T18:17:13Z</time> </trkpt> <trkpt lat="43.3613890" lon="-5.8551320"><ele>255.5</ele><time>2019-05-11T18:17:15Z</time> </trkpt> <trkpt lat="43.3613530" lon="-5.8550940"><ele>255.5</ele><time>2019-05-11T18:17:17Z</time> </trkpt> <trkpt lat="43.3613220" lon="-5.8550790"><ele>255.5</ele><time>2019-05-11T18:17:18Z</time> </trkpt> <trkpt lat="43.3612880" lon="-5.8550680"><ele>255.5</ele><time>2019-05-11T18:17:19Z</time> </trkpt></trkseg> </trk></gpx>';
		const file = new File([ gpx ], "prueba.gpx");

		Object.defineProperty(fileInput, "files", { value: [ file ] });
		fireEvent.change(fileInput);
		Object.defineProperty(container, "file", { value: file });
		fireEvent.change(container);

		fireEvent.click(button_save);
	});
});
