import * as permission from "./permissions";
import { cleanup } from "react-testing-library";
import React from "react";
import * as Toaster from "./toaster";

afterAll(cleanup);

describe.only("Permsissions", () => {
  test("the fetch fails with an error", () => {
    return permission
      .checkSpecificAppPermission("prueba", null)
      .catch(e => expect(e).toMatch("error"));
    return permission
      .checkOrSetInboxAppendPermissions(
        null,
        "https://saragg.solid.community/profile/card#me"
      )
      .catch(e => expect(e).toMatch("error"));
  });

  test("toaster", () => {
    permission.checkOrSetInboxAppendPermissions(
      null,
      "https://saragg.solid.community/profile/card#me"
    );
    expect(Toaster.successToaster()).toHaveBeenCalled;
  });
});
