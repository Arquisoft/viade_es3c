import React, from "react";
import { render, cleanup, queryByAttribute, fireEvent } from "react-testing-library";
import { HashRouter as Router } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import NewRoute from "./NewRoute";
import * as Toaster from "../../utils/toaster";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { configure } from "enzyme";
import Map from "./Map";
import { shallow } from "enzyme/build";

configure({ adapter: new Adapter() });

library.add(fas);

const props = {
  webId: "https://saragarcia.solid.community/"
};

describe.only("NewRoute", () => {
  afterAll(cleanup);
  const getById = queryByAttribute.bind(null, "id");
  const { container } = render(
    <Router>
      <NewRoute {...{ ...props }}>
      </NewRoute>
    </Router>
  );

  test("renders without crashing", async () => {
    expect(container).toBeTruthy();
  });

  test("trying to create a route without a title", () => {
    render(
      <Router>
        <NewRoute {...{ props }}/>
      </Router>
    );
    const button_save = getById(container, "save_route");

    fireEvent.click(button_save);
    expect(Toaster.errorToaster()).toHaveBeenCalled;
  });

  test("trying to create a route without a description", () => {
    render(
      <Router>
        <NewRoute {...{ props }}/>
      </Router>
    );
    const nameInput = getById(container, "route_name");
    fireEvent.change(nameInput, { target: { value: "prueba" } });

    const descriptionInput = getById(container, "description");
    fireEvent.change(descriptionInput, { target: { value: "" } });

    const button_save = getById(container, "save_route");
    fireEvent.click(button_save);

    expect(Toaster.errorToaster()).toHaveBeenCalled;
  });

  test("trying to create a route without marks", () => {
    const nameInput = getById(container, "route_name");
    const descriptionInput = getById(container, "description");
    const button_save = getById(container, "save_route");

    fireEvent.change(nameInput, { target: { value: "prueba" } });
    fireEvent.change(descriptionInput, { target: { value: "esto es una prueba" } });

    expect(nameInput.value).toEqual("prueba");
    expect(descriptionInput.value).toEqual("esto es una prueba");

    const input_img = getById(container, "input-img");

    const img = new File(["(⌐□_□)"], "img.png", {
      type: "image/png"
    });

    Object.defineProperty(input_img, "files", {
      value: [img]
    });
    fireEvent.change(input_img);
    fireEvent.click(button_save);
    expect(Toaster.errorToaster()).toHaveBeenCalled;
  });

  describe("NewRoute handleChange", () => {
    let wrapper;
    let mockSubmit;
    beforeEach(() => {
      mockSubmit = jest.fn();
      wrapper = shallow(<NewRoute onClick={mockSubmit}/>);
    });

    describe("handleChange", () => {
      it("should call setState on title", () => {
        const mockEvent = {
          target: {
            name: "markers",
            value: [
              { lat: 43.354831, lng: -5.851303 },
              { lat: 43.35644, lng: -5.854693 },
              { lat: 43.361836, lng: -5.850547 }
            ]
          }
        };
        const expected = {};
        wrapper.instance().handleChange(mockEvent);
      });
    });
  });

  describe("Trying to create a route", () => {

    let wrapper;

    it("should set markers", () => {
      const markers = [
        { lat: 43.354831, lng: -5.851303 },
        { lat: 43.35644, lng: -5.854693 },
        { lat: 43.361836, lng: -5.850547 }
      ];

      wrapper = shallow(<Map parentCallBack={markers}/>);
      wrapper.setState({ markers });

      const nameInput = getById(container, "route_name");
      const descriptionInput = getById(container, "description");
      const button_save = getById(container, "save_route");

      fireEvent.change(nameInput, { target: { value: "prueba" } });
      fireEvent.change(descriptionInput, { target: { value: "esto es una prueba" } });

      expect(nameInput.value).toEqual("prueba");
      expect(descriptionInput.value).toEqual("esto es una prueba");

      const input_img = getById(container, "input-img");

      const img = new File(["(⌐□_□)"], "img.png", {
        type: "image/png"
      });
    });

    let mockSubmit;
    beforeEach(() => {
      mockSubmit = jest.fn();
      wrapper = shallow(<NewRoute onClick={mockSubmit}/>);
    });

    it("should create a route", () => {
      const mockPreventDefault = jest.fn();
      const prevent = {
        preventDefault: mockPreventDefault
      };
      wrapper.instance().handleSubmit(prevent);


      expect(Toaster.successToaster()).toHaveBeenCalled;
    });

  });
});
