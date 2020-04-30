import React from "react";

import { render, cleanup, queryByAttribute, fireEvent } from "react-testing-library";
import PrintButton from "./PrintButton";

afterAll(cleanup);
const getById = queryByAttribute.bind(null, "id");

const { container, getByText } = render(
  <PrintButton>
    <div className="tc mb4 mt2"/>
  </PrintButton>
);

describe("Print Button Component", () => {
  it("PrintButton", () => {
    expect(container).toBeTruthy();
  });

});
