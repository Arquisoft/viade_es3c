import React from 'react';
import { render, cleanup, queryByAttribute, fireEvent } from 'react-testing-library';
import { HashRouter as Router } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import NewRoute from "../NewRoute";
import * as Toaster from "../../../utils/toaster";
import { mount } from 'enzyme';
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

library.add(fas);

const props = {
  webId: 'https://saragarcia.solid.community/'
};

describe.only("NewRoute", () => {
  afterAll(cleanup);
  const getById = queryByAttribute.bind(null, 'id');
  const { container } = render(
    <Router>
      <NewRoute {...{ ...props }} />
    </Router>
  );

  test('renders without crashing', async () => {
    expect(container).toBeTruthy();
  });

  test('trying to create a route without marks', () => {
    const nameInput = getById(container, 'route_name');
    const descriptionInput = getById(container, 'description');
    const button_save = getById(container, 'save_route');

    fireEvent.change(nameInput, {target: {value: "prueba"}});
    fireEvent.change(descriptionInput, {target: {value: "esto es una prueba"}});

    expect(nameInput.value).toEqual("prueba");
    expect(descriptionInput.value).toEqual("esto es una prueba");

    const input_img = getById(container, 'input-img');

    const img = new File(["(⌐□_□)"], "img.png", {
      type: "image/png"
    });

    Object.defineProperty(input_img, "files", {
      value: [img]
    });
    fireEvent.change(input_img);

    const markers = [
      { position: { lat: 43.354831, lng: -5.851303 } },
      { position: { lat: 43.35644, lng: -5.854693 } },
      { position: { lat: 43.361836, lng: -5.850547 } }
    ];

    let wrapper;
    wrapper = mount(<NewRoute {... {props}}/>);
    wrapper.setState({ markers : markers });
    fireEvent.click(button_save);

    expect(Toaster.successToaster()).toHaveBeenCalled;
  });
});
