import React from "react";
import { render, cleanup } from "react-testing-library";
import { HashRouter as Router } from "react-router-dom";
import { RegisterComponent } from "./register.component";
import Register from './register.container';


describe.only("Register", () => {
  afterAll(cleanup);

  const {container} = render(
    <Router>
      <Register t={key => key} providers={[]} />
    </Router>
  );

  it('We can check if the consumer called the class constructor', () => {
    const register = new Register();
    expect(register.componentDidMount()).toBeDefined;

  });
});
