import React from 'react';
import {cleanup, render} from 'react-testing-library';
import {HashRouter as Router} from 'react-router-dom';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import InfoFriends from "./MyFriends";

library.add(fas);

const props = {
  webId: ' https://saragg.solid.community/'
};

describe.only('MyFriends', () => {
  afterAll(cleanup);
  const {container} = render(
    <Router>
      <InfoFriends {...{...props}} />
    </Router>
  );

  test('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});
