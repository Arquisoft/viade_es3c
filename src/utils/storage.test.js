import * as storage from "./storage";
import { cleanup } from "react-testing-library";
import React from "react";
import * as ldflex from "./ldflex-helper";
import * as Toaster from "./toaster";
import * as notification from "./notification";
import * as permission from "./permissions";

afterAll(cleanup);

describe.only("Storage", () => {
  test("calls", () => {
    expect(storage.getAppStorage("prueba", "path")).toBeTruthy;
    expect(
      storage.buildPathFromWebId(
        "https://saragg.solid.community/profile/card#me",
        "path"
      )
    ).toBeTruthy;
    expect(
      storage.addMedia("https://saragg.solid.community/profile/card#me", null)
    ).toBeTruthy;
    expect(
      storage.createInitialFiles(
        "https://saragg.solid.community/profile/card#me"
      )
    ).toBeTruthy;
  });

  test("fails with an error", () => {
    return storage
      .addRoute("https://saragg.solid.community/profile/card#me", null)
      .catch(e => expect(e).toMatch(Toaster.errorToaster(e.message, "Error")));
    return storage
      .addMedia("https://saragg.solid.community/profile/card#me", null)
      .catch(e => expect(e).toMatch(Toaster.errorToaster(e.message, "Error")));
    return storage
      .createInitialFiles("https://saragg.solid.community/profile/card#me")
      .catch(e => expect(e).toMatch(Toaster.errorToaster(e.message, "Error")));
  });

  test("buildPath is ok", () => {
    expect(
      storage.buildPathFromWebId(
        "https://saragg.solid.community/profile/card#me",
        "path"
      )
    ).toStrictEqual("https://saragg.solid.community/path");
  });

  test("toaster", () => {
    storage.createInitialFiles(
      "https://saragg.solid.community/profile/card#me"
    );
    expect(Toaster.errorToaster()).toHaveBeenCalled;
  });
});
