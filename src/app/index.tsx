import * as React from 'react';
import { Route, Switch } from 'react-router';
import { App as ComicApp} from 'app/containers/App';
import { hot } from 'react-hot-loader';
require('../assets/style.css');

export const App = hot(module)(() => (
  <Switch>
    <Route path="/" component={ComicApp} />
  </Switch>
));
