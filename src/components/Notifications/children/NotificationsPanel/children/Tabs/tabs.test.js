import React from "react";
import { render, cleanup } from "react-testing-library";
import { HashRouter as Router } from "react-router-dom";
import { Tabs } from "./tabs.component";
import { act } from "react-dom/test-utils";

describe.only("Register", () => {
  afterAll(cleanup);

  const {container} = render(
    <Router>
      <Tabs {...{}}/>
    </Router>
  );

  test("renders without crashing", async() => {
    act(() => {
      expect(container).toBeTruthy();
    })
  });
});
