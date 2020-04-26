import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { HashRouter as Router } from 'react-router-dom';
import RouteMap from "./RouteMap";
import { MapContainer } from "../NewRoute/Map";
import { Map } from "google-maps-react";

const props = {
  markers : [
    { position: { lat: 43.354831, lng: -5.851303 } },
    { position: { lat: 43.35644, lng: -5.854693 } },
    { position: { lat: 43.361836, lng: -5.850547 } }
  ]
}

describe.only('RouteMap', () => {
  afterAll(cleanup);
  const { container } = render(
    <Router>
      <MapContainer {...{props}}/>
    </Router>
  );

  it('renders without crashing', () => {
    expect(container).toBeTruthy();
  });

  test('methods', () => {
    const map = new MapContainer(props);
    expect(map.draw()).toStrictEqual([]);
    expect(map.getLocation()).toBeDefined;
  })

});
