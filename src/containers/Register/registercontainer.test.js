import React from "react";
import { render, cleanup } from "react-testing-library";
import { HashRouter as Router } from "react-router-dom";
import { RegisterComponent } from "./register.component";
import Register from './register.container';
import * as ldflex from "../../utils/ldflex-helper";
import * as Toaster from "../../utils/toaster";


describe.only("Register", () => {
  afterAll(cleanup);

  const {container} = render(
    <Router>
      <Register t={key => key} providers={[]} />
    </Router>
  );

  it('register test', () => {
    const register = new Register();
    expect(register.componentDidMount()).toBeDefined;
    return register.resourceExists("prueba").catch(e => expect(e).toMatch( Toaster.errorToaster(e.message, "Error")));

  });
});
