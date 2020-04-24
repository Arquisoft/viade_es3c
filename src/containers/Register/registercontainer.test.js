import React from "react";
import { render, cleanup } from "react-testing-library";
import { HashRouter as Router } from "react-router-dom";
import { RegisterContainer } from "./register.container";
import { RegisterComponent } from "./register.component";

describe.only("Register", () => {
  afterAll(cleanup);

  const {container} = render(
    <Router>
      <RegisterComponent t={key => key} providers={[]} />
    </Router>
  );

  test("renders without crashing", () => {
    expect(container).toBeTruthy();
  });
});
