import { render, cleanup } from "react-testing-library";
import Input from "./input.component";

afterAll(cleanup);

describe("Input", () => {
	it("renders without crashing", () => {
		expect(render(Input)).toBeTruthy();
	});
});
