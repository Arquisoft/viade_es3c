import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { HashRouter as Router } from 'react-router-dom';
import RouteMap from "./RouteMap";


describe.only('RouteMap', () => {
  afterAll(cleanup);
  const { container } = render(
    <Router>
      <RouteMap/>
    </Router>
  );

  it('renders without crashing', () => {
    expect(container).toBeTruthy();
  });

});
