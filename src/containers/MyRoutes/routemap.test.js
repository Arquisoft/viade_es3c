import React from "react";
import { render, cleanup } from "react-testing-library";
import { HashRouter as Router } from "react-router-dom";
import RouteMap from "./RouteMap";

const props = {
  markers: [
    { position: { lat: 43.354831, lng: -5.851303 } },
    { position: { lat: 43.35644, lng: -5.854693 } },
    { position: { lat: 43.361836, lng: -5.850547 } }
  ]
};

describe.only("RouteMap", () => {
  afterAll(cleanup);
  const { container } = render(
    <Router>
      <RouteMap {...{ props }} />
    </Router>
  );

  it("renders without crashing", () => {
    expect(container).toBeTruthy();
  });
});
