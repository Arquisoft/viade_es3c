import React from 'react';
import { render, cleanup, queryByAttribute, fireEvent } from 'react-testing-library';
import { HashRouter as Router } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import NewRoute from "../NewRoute";
import * as Toaster from "../../../utils/toaster";

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

  test('trying to create a route without a description',  () => {
    render(
      <Router>
        <NewRoute {... {props}}/>
      </Router>
    );
    const nameInput = getById(container, 'route_name');
    fireEvent.change(nameInput, {target: {value: "prueba"}});

    const descriptionInput = getById(container, 'description');
    fireEvent.change(descriptionInput, {target: {value: ""}});

    const button_save = getById(container, 'save_route');
    fireEvent.click(button_save);

    expect(Toaster.errorToaster()).toHaveBeenCalled;
  });
});
