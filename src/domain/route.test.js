import { cleanup } from "react-testing-library";
import Route from "./route";

afterAll(cleanup);

const markers = [
	{ position: { lat: 43.354831, lng: -5.851303 } },
	{ position: { lat: 43.35644, lng: -5.854693 } },
	{ position: { lat: 43.361836, lng: -5.850547 } }
];

describe("Route class domain", () => {
	it("create class route without crashing", () => {
		const route = new Route("Prueba", "Sara", "prueba", markers);
		expect(route.name === "Prueba");
		expect(route.author === "Sara");
		expect(route.description === "prueba");
		expect(route.points === markers);
		expect(route.getIdRoute() === "Prueba_Sara");
		expect(route.calculateCenter() !== null);
	});
});
