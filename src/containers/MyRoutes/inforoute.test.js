import React from "react";
import { HashRouter as Router } from "react-router-dom";
import InfoRoutes from "./InfoRoute";
import {cleanup, render} from 'react-testing-library';
import { getByTestId } from "@testing-library/dom";

const props = {
  webId: 'https://saragg.solid.community/'
};

describe.only('InfoRoutes', () => {
  afterAll(cleanup);

  const { container } = render(
    <Router>
      <InfoRoutes{...{...props}}/>
    </Router>
  );

  test('renders without crashing', () => {
    expect(container).toBeTruthy();
  });

  test('inforoute render properly', () => {
      const btroute = getByTestId(container, 'viewRoute');
      const btfriends = getByTestId(container, 'viewFriends');

      expect(btroute).not.toBe(null);
      expect(btfriends).not.toBe(null);
  });
});
