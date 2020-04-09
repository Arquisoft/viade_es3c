import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { HashRouter as Router } from 'react-router-dom';
import Map from "./Map";

const markers = [
  {position :{lat: 43.354831, lng: -5.851303}},
  {position :{lat: 43.356440, lng: -5.854693}},
  {position :{lat: 43.361836, lng: -5.850547}}
];

describe.only('Map', () => {
  afterAll(cleanup);
  const { container } = render(
    <Router>
      <Map zoom={15} markers={markers}/>
    </Router>
  );

  it('renders without crashing', () => {
    expect(container).toBeTruthy();
  });

});
