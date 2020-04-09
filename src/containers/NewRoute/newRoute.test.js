import React from 'react';
import { render, cleanup, queryByAttribute, fireEvent } from 'react-testing-library';
import { HashRouter as Router } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import NewRoute from "./NewRoute";
import { getByTestId } from "@testing-library/dom";

library.add(fas);

const props = {
  webId: 'https://saragarcia.solid.community/',
  test: true
};

describe.only('NewRoute', () => {
  afterAll(cleanup);
  const getById = queryByAttribute.bind(null, 'id');
  const { container } = render(
    <Router>
      <NewRoute{...{...props}}/>
    </Router>
  );

  test('renders without crashing', () => {
    expect(container).toBeTruthy();
  });

  test('renders with styled components', () => {
    const route_wrapper = getByTestId(container, 'route-component');
    const route_header = getByTestId(container, 'route-header');
    const nameInput = getById(container, 'route_name');
    const descriptionInput = getById(container, 'description');
    const input_img = getById(container, 'input-img');
    const button_save = getById(container, 'save_route');

    expect(route_wrapper).not.toBe(null);
    expect(route_header).not.toBe(null);
    expect(nameInput).not.toBe(null);
    expect(descriptionInput).not.toBe(null);
    expect(button_save).not.toBe(null);
    expect(input_img).not.toBe(null);
  });

  test('fill form', () => {
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

    fireEvent.click(button_save);
  });
});
