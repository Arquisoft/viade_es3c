import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { HashRouter as Router } from 'react-router-dom';
import FormModelRenderer from './form-renderer.component';
import * as Toaster from "../../../utils/toaster";

describe.only('Form Model Renderer', () => {
  afterAll(cleanup);

  const { container, getByTestId } = render(
    <Router>
      <FormModelRenderer t={key => key} />
    </Router>
  );

  test('renders without crashing', () => {
    expect(container).toBeTruthy();
  });

  test('toaster', () => {
    (expect(Toaster.successToaster()).toHaveBeenCalled);
  });
});
