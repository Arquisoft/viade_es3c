import * as notification from "./notification";
import { cleanup } from "react-testing-library";
import React from "react";
import * as permission from "./permissions";
import * as Toaster from "./toaster";

afterAll(cleanup);

describe.only("Notification", () => {
  test("calls", () => {
    expect(notification.sendNotification("friend", "content", null, "me"))
      .toBeTruthy;
    expect(notification.findUserInboxes(null)).toBeTruthy;
  });

  test("error", () => {
    notification.findUserInboxes(null);
    expect(Error).toHaveBeenCalled;

    notification.sendNotification(null, null, null, null);
    expect(Error).toHaveBeenCalled;
  });
});
