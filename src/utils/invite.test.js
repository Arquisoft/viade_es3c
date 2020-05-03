import * as Invite from "./invite";
import { cleanup } from "react-testing-library";

afterAll(cleanup);

describe.only("Invited", () => {
	test("invite", async () => {
		expect(Invite.invite("https://saragg.solid.community/profile/card#me", null)).toBe(`@prefix inv: <>.
    @prefix as: <https://www.w3.org/ns/activitystreams#>.
    @prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>.
    @prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
    inv: a as:Notification;
        rdfs:label "Notification";
        rdfs:comment "saragg has share their route with you";
        as:object <null>.
    `);
	});
});
