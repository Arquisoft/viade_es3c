import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { HashRouter as Router } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import List from "@material-ui/core/List";
import { FriendsList } from "../MyFriends/myfriends.style";

library.add(fas);

describe.only("NotificationHelp", () => {
  afterAll(cleanup);
  const { container } = render(
    <Router>
      <FriendsList/>
    </Router>
  );

  test('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});
