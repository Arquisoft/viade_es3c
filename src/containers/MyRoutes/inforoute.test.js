import React from "react";
import { HashRouter as Router } from "react-router-dom";
import InfoRoutes from "./InfoRoute";
import {cleanup, queryByAttribute, render} from 'react-testing-library';

const props = {
  webId: 'https://saragg.solid.community/'
};

describe.only('InfoRoutes', () => {
  afterAll(cleanup);

  const getById = queryByAttribute.bind(null, 'id');
  const { container } = render(
    <Router>
      <InfoRoutes{...{...props}}/>
    </Router>
  );

  test('renders without crashing', () => {
    expect(container).toBeTruthy();
  });

  test('inforoute render properly', () => {

    setTimeout(function () {
      const btroute = getById(container, 'viewRoute');
      const btfriends = getById(container, 'viewFriends');

      expect(btroute).not.toBe(null);
      expect(btfriends).not.toBe(null);
    }, 3000);

  });
});
