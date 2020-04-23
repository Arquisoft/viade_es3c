import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { HashRouter as Router } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FriendsList } from "../MyFriends/myfriends.style";
import Notifications from "./NotificationHelp"

library.add(fas);

const props = {
  webId: 'https://saragarcia.solid.community/',
};

describe.only("Share", () => {
  afterAll(cleanup);
  const { container } = render(
    <Router>
      <Notifications {...{ ...props }} />
    </Router>
  );

  test('renders without crashing', () => {
    expect(container).toBeTruthy();
  });


});
