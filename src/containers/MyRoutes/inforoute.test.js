import React from "react";
import { HashRouter as Router } from "react-router-dom";
import InfoRoutes from "./InfoRoute";
import { cleanup, queryByAttribute, render } from "react-testing-library";

const props = {
  name: 'prueba',
  author: 'sara',
  description: 'esto es una prueba',
  points: null,
  center: null,
  mult: [{}],
  r: 'https://saragarcia.solid.community/',
  uuid: 'https://saragarcia.solid.community/'
};


describe.only("InfoRoutes", () => {
  afterAll(cleanup);

  const getById = queryByAttribute.bind(null, 'id');

  const { container } = render(
    <Router>
      <InfoRoutes{...{...props}}/>
    </Router>
  );

  test("renders without crashing", () => {
    expect(container).toBeTruthy();
  });

  test("timeline render properly", () => {
    const btinfo = getById(container, 'infoRoute');
    const btroute = getById(container, 'viewRoute');
    const btfriends = getById(container, 'viewFriends');

    fireEvent.click(btinfo);
    fireEvent.click(btroute);
    fireEvent.click(btfriends);
  });
});
