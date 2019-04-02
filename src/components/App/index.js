import React from 'react';
import './index.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Event from '../Event';
import Home from '../Home';
import Leaders from '../Leaders';
import Registration from '../Registration';
import SignIn from '../SignIn';
import SignOut from '../SignOut';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

const App = props => (
  <Router>
    <div>
      <Switch>
        <Route path={ROUTES.REGISTRATION} component={Registration} />
        <Route path={ROUTES.EVENT_WITH_KEY} component={Event} />
        <Route path={ROUTES.HOME} component={Home} />
        <Route path={ROUTES.LEADERS} component={Leaders} />
        <Route path={ROUTES.SIGN_IN} component={SignIn} />
        <Route path={ROUTES.SIGN_OUT} component={SignOut} />
      </Switch>
    </div>
  </Router>
);

export default withAuthentication(App);
