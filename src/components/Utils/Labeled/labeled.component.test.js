import { render, cleanup } from "react-testing-library";
import Labeled from "./labeled.component";
import React from "react";

afterAll(cleanup);

describe.only("Labeled", () => {
  const { container } = render(<Labeled />);

  it("renders without crashing", () => {
    expect(container).toBeTruthy();
  });
});
