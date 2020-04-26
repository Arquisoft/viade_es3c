import React from "react";
import { HashRouter as Router } from "react-router-dom";
import InfoRoutes from "./InfoRoute";
import { cleanup, queryByAttribute, render, fireEvent } from "react-testing-library";
import MultsButton from "./ViewMult";
import { act } from 'react-dom/test-utils';

const multi = [
  { url: ".mp3" },
  { url: ".mp4" },
  { url: ".ext" }
];

const props = {
  name: 'prueba',
  author: 'sara',
  description: 'esto es una prueba',
  points: null,
  center: null,
  mult: multi,
  r: 'https://saragarcia.solid.community/',
  uuid: 'https://saragarcia.solid.community/'
};


describe.only("InfoRoutes", () => {
  afterAll(cleanup);

  const getById = queryByAttribute.bind(null, 'id');

  const { container } = render(
    <Router>
      <InfoRoutes{...props}>
        <MultsButton {...props} />
      </InfoRoutes>
    </Router>
  );

  test("renders without crashing", async() => {
    act(() => {
      expect(container).toBeTruthy();
    })
  });

  test("click button", async() => {
    const btModify = getById(container, 'btnModify');
    fireEvent.click(btModify);

    const btDownload = getById(container, 'btnDownload');
    fireEvent.click(btDownload);

    const btDelete = getById(container, 'btnDelete');
    fireEvent.click(btDelete);

    const btFriends = getById(container, 'viewFriends')
    fireEvent.click(btFriends);
  });
});
