import React from 'react';
import {cleanup} from 'react-testing-library';
import friendsHelper from "./FriendsHelper";

afterAll(cleanup);

describe.only('FriendsHelp', () => {
  var name = 'elmer';
  var url = 'https://elmer.solid.community/';

  it("create class FriendsHelp without crashing", () => {
    friendsHelper.addFriend(name, url);
    friendsHelper.deleteFriend(name, url);
    friendsHelper.findFriendsFor(name);
    friendsHelper.getName(name);
  });
});
