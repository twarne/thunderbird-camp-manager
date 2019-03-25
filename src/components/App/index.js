import React from 'react';
import './index.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Event from '../Event';
import Registration from '../Registration';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

const App = props => (
  <Router>
    <div>
      {!props.location || props.location.path === '/' ? <Redirect to="/event/ywcamp2019" /> : <React.Fragment />}
      <Switch>
        <Route path={ROUTES.REGISTRATION} component={Registration} />
        <Route path={ROUTES.EVENT_WITH_KEY} component={Event} />
      </Switch>
    </div>
  </Router>
);

export default withAuthentication(App);
