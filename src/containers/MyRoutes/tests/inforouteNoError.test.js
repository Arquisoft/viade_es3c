import React from "react";
import { HashRouter as Router } from "react-router-dom";
import InfoRoutes from "../InfoRoute";
import {
  cleanup,
  render,
  fireEvent
} from "react-testing-library";
import MultsButton from "../ViewMult";
import { act } from "react-dom/test-utils";
import { getByTestId } from "@testing-library/dom";

const multi = [{ url: ".mp3" }, { url: ".mp4" }, { url: ".ext" }];

const props = {
  name: "prueba",
  author: "sara",
  description: "esto es una prueba",
  points: null,
  center: null,
  mult: multi,
  r: "https://saragarcia.solid.community/",
  uuid: "https://saragarcia.solid.community/",
  error: false,
  errorMore: "",
  webId : "https://saragarcia.solid.community/",
  ruta: ""
};

describe.only("InfoRoutes", () => {
  afterAll(cleanup);

  const { container } = render(
    <Router>
      <InfoRoutes {...props}>
        <MultsButton {...props} />
      </InfoRoutes>
    </Router>
  );

  test("renders without crashing", async () => {
    act(() => {
      expect(container).toBeTruthy();
    });
  });

  test("click button", async () => {

    const drop = getByTestId(container, "operationmenu");
    fireEvent.click(drop);

    /*const btModify = getByTestId(container, "btnModify");
    fireEvent.click(btModify);

    const btDownload = getByTestId(container, "btnDownload");
    fireEvent.click(btDownload);

    const btDelete = getByTestId(container, "btnDelete");
    fireEvent.click(btDelete);*/

    const btFriends = getByTestId(container, "viewFriends");
    fireEvent.click(btFriends);

    const btMult = getByTestId(container, "mult");
    fireEvent.click(btFriends);
  });
});
