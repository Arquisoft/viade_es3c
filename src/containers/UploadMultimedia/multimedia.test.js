import React from 'react';
import {cleanup, render} from 'react-testing-library';
import {HashRouter as Router} from 'react-router-dom';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import { MultimediaPageContent } from "./multimedia.component";
import Uploader from "./uploader.component";

library.add(fas);

class File extends React.Component {
    name = "pruebafile";
    type=  "png";
}

const props = {
  webId: 'https://saragr.inrupt.net/'
};

describe.only('Multimedia', () => {
  afterAll(cleanup);
  const {container} = render(
    <Router>
        <MultimediaPageContent {...{...props}} />
    </Router>
  );

  test('renders without crashing', () => {
    expect(container).toBeTruthy();
  });

  test('uploader', () => {
    const upload = new Uploader;
    const file = new File();
    const randomSuffix = Date.parse(new Date());
    expect(upload.renameFile(file, "jpg")).toBe("_"+randomSuffix+"_.jpg");
  })

});
