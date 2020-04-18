import React from 'react';
import {cleanup, render, queryByAttribute, fireEvent} from 'react-testing-library';
import {HashRouter as Router} from 'react-router-dom';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import MyFriends from "./MyFriends";
import InfoFriends from "./InfoFriends";

library.add(fas);

const props = {
  webId: 'https://saragr.inrupt.net/'
};

describe.only('MyFriends', () => {
  afterAll(cleanup);
  const getById = queryByAttribute.bind(null, 'id');
  const {container} = render(
    <Router>
      <MyFriends {...{...props}} >
        <InfoFriends></InfoFriends>
      </MyFriends>
    </Router>
  );

  test('renders without crashing', () => {
    expect(container).toBeTruthy();
    const button_friends = getById(container, 'submit-friends');
    fireEvent.click(button_friends);
  });

});
