import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { HashRouter as Router } from 'react-router-dom';
import {MapContainer} from "./Map";

describe.only('Map', () => {
  afterAll(cleanup);
  const { container } = render(
    <Router>
      <MapContainer/>
    </Router>
  );

  it('renders without crashing', () => {
    expect(container).toBeTruthy();
  });

});
