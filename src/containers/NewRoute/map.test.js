import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { HashRouter as Router } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Map from "./Map";

library.add(fas);

describe.only('Map', () => {
  afterAll(cleanup);
  const { container, getByTestId } = render(
    <Router>
      <Map/>
    </Router>
  );

  it('renders without crashing', () => {
    expect(container).toBeTruthy();
  });

});
