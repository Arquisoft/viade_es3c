import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { HashRouter as Router } from 'react-router-dom';
import FormModelRenderer from './form-renderer.component';

describe.only('Form Model Converter', () => {
  afterAll(cleanup);

  const { container, getByTestId } = render(
    <Router>
      <FormModelRenderer t={key => key} />
    </Router>
  );

  test('renders without crashing', () => {
    expect(container).toBeTruthy();
  });

  test('renders initial state correctly', () => {
    expect(getByTestId('layout-text-box').hasAttribute('disabled')).toBeTruthy();
    expect(getByTestId('copy-button').hasAttribute('disabled')).toBeTruthy();
    expect(getByTestId('convert-button').hasAttribute('disabled')).toBeTruthy();
  });
});
