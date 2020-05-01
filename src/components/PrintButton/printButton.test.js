import React from "react";

import { render, cleanup } from "react-testing-library";
import PrintButton from "./PrintButton";

afterAll(cleanup);

const { container, getByText } = render(
  <PrintButton>
    <div className="tc mb4 mt2" />
  </PrintButton>
);

describe("Toaster Notification Component", () => {
  it("PrintButton", () => {
    expect(container).toBeTruthy();
  });
});
