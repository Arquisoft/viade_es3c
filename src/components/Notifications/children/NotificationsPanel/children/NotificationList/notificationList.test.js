import React from "react";
import { render, cleanup } from "react-testing-library";
import Notifications from "./notification-list.component";

afterAll(cleanup);

const nots = [{ n: { n1: "n1" } }];

const Props = {
  notifications: nots
};

describe.only("Notification list", () => {
  const { container } = render(<Notifications {...{ Props }} />);

  it("renders without crashing", () => {
    expect(container).toBeTruthy();
  });
});
