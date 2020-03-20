import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { HashRouter as Router } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import NewRoute from "./NewRoute";

library.add(fas);

const props = {
  webId: 'https://saragarcia.solid.community/'
};

describe.only('NewRoute', () => {
  afterAll(cleanup);
  const { container, getByTestId } = render(
    <Router>
      <NewRoute{...{...propssss}}/>
    </Router>
  );

  it('renders without crashing', () => {
    expect(container).toBeTruthy();
  });

});
