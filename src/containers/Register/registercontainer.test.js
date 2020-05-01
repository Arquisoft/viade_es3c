import React from "react";
import { render, cleanup } from "react-testing-library";
import { HashRouter as Router } from "react-router-dom";
import Register from "./register.container";

describe.only("Register", () => {
  afterAll(cleanup);

  const { container } = render(
    <Router>
      <Register t={key => key} providers={[]} />
    </Router>
  );

  it("register test", () => {
    const register = new Register();
    expect(register.componentDidMount()).toBeDefined;
  });
});
