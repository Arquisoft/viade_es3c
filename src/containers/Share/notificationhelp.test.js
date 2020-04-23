import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { HashRouter as Router } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FriendsList } from "../MyFriends/myfriends.style";
import {List} from "@solid/react";

library.add(fas);

describe.only("NotificationHelp", () => {
  afterAll(cleanup);
  const { container } = render(
    <Router>
      <FriendsList>
        <List>
          <li>
          </li>
        </List>
      </FriendsList>
    </Router>
  );

  test('renders without crashing', () => {
    expect(container).toBeTruthy();
  });

});
