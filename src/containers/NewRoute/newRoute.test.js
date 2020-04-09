import React from 'react';
import { render, cleanup, queryByAttribute, fireEvent } from 'react-testing-library';
import { HashRouter as Router } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import NewRoute from "./NewRoute";

library.add(fas);

const props = {
  webId: 'https://saragarcia.solid.community/'
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

  test('Inputs render properly', async () => {

    const nameInput = getById(container, 'route_name');
    const descriptionInput = getById(container, 'description');

    expect(nameInput).not.toBe(null);
    expect(descriptionInput).not.toBe(null);
  });

  test('Fill form', function(){
    const route_name = getById(container, 'route_name');
    const query = 'the title';
    fireEvent.change(route_name, { target: { value: query } });
    expect(route_name.value).toEqual('the title');

    const description = getById(container, 'description');
    const query2 = 'writing a description';
    fireEvent.change(description, { target: { value: query2 } });
    expect(description.value).toEqual('writing a description');

    const submitButton = getById(container, 'save_route');
    fireEvent.click(submitButton);

  });





});
