import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { HashRouter as Router } from 'react-router-dom';
import {MapContainer} from "./Map";
import { Marker } from "google-maps-react";

const marker = [ {position : { lat: 59.955413, lng: 30.337844 }}];

describe.only('Map', () => {
  afterAll(cleanup);
  const { container } = render(
    <Router>
      <MapContainer/>
    </Router>
  );

  it("renders without crashing", () => {
    expect(container).toBeTruthy();
  });

});
