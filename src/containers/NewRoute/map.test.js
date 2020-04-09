import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { HashRouter as Router } from 'react-router-dom';
import Map from "./Map";

describe.only('Map', () => {
  afterAll(cleanup);
  const { container } = render(
    <Router>
      <Map/>
    </Router>
  );

  it('renders without crashing', () => {
    expect(container).toBeTruthy();
  });

});
