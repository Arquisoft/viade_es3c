import React from 'react';
import ReactDOM from 'react-dom';
import './i18n';
import App from './App';
import { ErrorBoundary, GlobalError } from './components';
import * as serviceWorker from './serviceWorker';
import { viadeManager } from '@utils';
import { ldflexHelper } from './utils';
import { WebId } from './containers/Profile/profile.style';


ReactDOM.render(
  <ErrorBoundary component={(error, info) => <GlobalError error={error} info={info} />}>
    <App />
  </ErrorBoundary>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();





