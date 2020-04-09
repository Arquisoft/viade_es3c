import React from 'react';
import { render, cleanup, queryByAttribute} from 'react-testing-library';
import RouteForm from './form.component';
import { DivMin } from './form.component.style'

describe('Route form', () => {
  afterAll(cleanup);

  const getById = queryByAttribute.bind(null, 'id');
  const { container } = render(
    <DivMin>
      <RouteForm />
    </DivMin>
  );

  test('App renders without crashing', () => {
    expect(container).toBeTruthy();
  });

  test('Inputs render properly', async () => {

    const route_name = getById(container, 'route_name');
    const descriptionInput = getById(container, 'description_name');
    const image = getById(container, 'id_img');

    expect(route_name).not.toBe(null);
    expect(descriptionInput).not.toBe(null);
    expect(image).not.toBe(null);
  });
});
