import React from 'react';
import { cleanup } from 'react-testing-library';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Discover from "./discover-inbox";
library.add(fas);

describe.only("Discover", () => {
  afterAll(cleanup);


  test('call function', () => {
    expect(Discover.fetch_inbox("prueba")).toMatchObject(new Promise(function(resolve, reject) {}));
  });
});
