import * as ldflex from "./ldflex-helper";
import { cleanup } from "react-testing-library";
import React from "react";
import * as Toaster from "./toaster";

afterAll(cleanup);

describe.only("Ldflex", () => {
  it("renders without crashing", () => {
    ldflex.documentExists("prueba");
    ldflex.createDocument("prueba", "body");
  });

  test("the fetch fails with an error", () => {
    return ldflex
      .createDoc("prueba", null)
      .catch(e => expect(e).toMatch("error"));
    return ldflex
      .deleteFile("prueba", null)
      .catch(e => expect(e).toMatch("error"));
    return ldflex
      .createDocument("prueba", null)
      .catch(e => expect(e).toMatch("error"));
    return ldflex
      .createDocumentWithTurtle("prueba", null)
      .catch(e => expect(e).toMatch("error"));
    return ldflex
      .getLinkedInbox("prueba")
      .catch(e => expect(e).toMatch("error"));
    return ldflex
      .resourceExists("prueba")
      .catch(e => expect(e).toMatch(Toaster.errorToaster(e.message, "Error")));
  });

  test("documentExists is ok", () => {
    return ldflex.documentExists("prueba").then(data => {
      expect(data).toStrictEqual({ ok: true, status: 200 });
    });
  });

  test("createDocumentTurtle is ok", () => {
    return ldflex.createDocumentWithTurtle("prueba", null).then(data => {
      expect(data).toStrictEqual({ ok: true, status: 200 });
    });
  });

  test("calls", () => {
    expect(ldflex.documentExists("prueba")).toBeTruthy;
    expect(ldflex.createDoc("prueba", null)).toBeTruthy;
    expect(ldflex.deleteFile("prueba")).toBeTruthy;
    expect(ldflex.createDocument("prueba")).toBeTruthy;
    expect(ldflex.createDocumentWithTurtle("prueba")).toBeTruthy;
    expect(ldflex.createNonExistentDocument("prueba")).toBeTruthy;
    expect(ldflex.fetchLdflexDocument("prueba")).toBeTruthy;
    expect(ldflex.resourceExists("prueba")).toBeTruthy;
    expect(ldflex.discoverInbox("prueba")).toBeTruthy;
    expect(ldflex.getLinkedInbox("prueba")).toBeTruthy;
  });
});
