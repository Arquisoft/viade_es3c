import React from "react";
import { HashRouter as Router } from "react-router-dom";
import MySharedRoutes from "./MySharedRoutes";
import { cleanup, queryByAttribute, render } from "react-testing-library";

const props = {
  webId: "https://saragg.solid.community/"
};

describe.only("MyRoutes", () => {
  afterAll(cleanup);

  const getById = queryByAttribute.bind(null, "id");
  const { container } = render(
    <Router>
      <MySharedRoutes {...{ ...props }} />
    </Router>
  );

  test("renders without crashing", () => {
    expect(container).toBeTruthy();
  });

  test("timeline render properly", () => {
    setTimeout(function() {
      const myroute_wrapper = getById(container, "route-component");
      const myroute_container = getById(container, "myroute-container");
      const myroute_header = getById(container, "myroute-header");

      expect(myroute_wrapper).not.toBe(null);
      expect(myroute_container).not.toBe(null);
      expect(myroute_header).not.toBe(null);
    }, 3000);
  });
});
