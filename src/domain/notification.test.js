import { cleanup } from "react-testing-library";
import Notification from "./notification";
import Point from "./point";

afterAll(cleanup);

describe("Notification class domain", () => {
	const points = new Point(-5.851303, -5.851303, 300);
	it("create class notification without crashing", () => {
		const notification = new Notification("prueba", "sara", "prueba notificacion", points, "saray");
		expect(notification.name === "prueba");
		expect(notification.author === "sara");
		expect(notification.description === "prueba notificacion");
		expect(notification.points === points);
		expect(notification.receptor === "saray");
		expect(notification.getRouteId() === "prueba_sara");
	});
});
