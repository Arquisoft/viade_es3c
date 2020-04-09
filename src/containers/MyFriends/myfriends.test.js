import React from 'react';
import {cleanup, render} from 'react-testing-library';
import {HashRouter as Router} from 'react-router-dom';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import MyFriends from "./MyFriends";

library.add(fas);

const props = {
  webId: 'https://saragr.inrupt.net/'
};

describe.only('MyFriends', () => {
  afterAll(cleanup);
  const {container} = render(
    <Router>
      <MyFriends {...{...props}}/>
    </Router>
  );

  test('renders without crashing', () => {
    g
  });

  test('get user', () => {
    expect(container).toBeTruthy();
  });

});
