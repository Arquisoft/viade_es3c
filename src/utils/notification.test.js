import * as notification from "./notification";
import { cleanup } from "react-testing-library";
import React from 'react';

afterAll(cleanup);

describe.only("Notification", () => {

  test('calls', () => {
    expect(notification.sendNotification("friend", "content", null, "me")).toBeTruthy;
    expect(notification.findUserInboxes(null)).toBeTruthy;
  })


});
