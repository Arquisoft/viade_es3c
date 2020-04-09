import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { HashRouter as Router } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import {MapContainer} from "./RouteMap";

library.add(fas);

describe.only('RouteMap', () => {
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
