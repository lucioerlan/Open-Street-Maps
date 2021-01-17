import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import App from './App';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={App} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
