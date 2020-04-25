import React from "react";
import { cleanup } from 'react-testing-library';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Share from "./Share";

library.add(fas);

const Props = {
  webId: 'https://saragarcia.solid.community/'
};

describe.only("Share", () => {
  afterAll(cleanup);

  test('class share', () => {
    const share = new Share(Props);
    share.permit('friend', 'prueba', 'sara');
  })

});
