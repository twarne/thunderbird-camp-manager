import React from 'react';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navigation from '../Navigation';

import LandingPage from '../Landing';
import SignInPage from '../SignIn';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import ParentsPage from '../Parents';
import LeadersPage from '../Leaders';
import PermissionForm from '../PermissionForm';
import ReleaseForm from '../ReleaseForm';
import Title from '../Title';
import Events from '../Events';
import Event from '../Event';
import Success from '../Success';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

const App = () => (
  <Router>
    <div>
      <div className="AppHeader">
        <Title />
        <Navigation />
      </div>
      <hr />
      <div className="AppRoutes">
        <Switch>
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route exact path={ROUTES.HOME} component={HomePage} />
          <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route exact path={ROUTES.ADMIN} component={AdminPage} />
          <Route exact path={ROUTES.PARENTS} component={ParentsPage} />
          <Route exact path={ROUTES.LEADERS} component={LeadersPage} />
          <Route path={ROUTES.PERMISSION_FORM} component={PermissionForm} />
          <Route path={ROUTES.RELEASE_FORM} component={ReleaseForm} />
          <Route exact path={ROUTES.EVENTS} component={Events} />
          <Route path={ROUTES.EVENT_WITH_KEY} component={Event} />
          <Route path={ROUTES.SUCCESS} component={Success} />
        </Switch>
      </div>
    </div>
  </Router>
);

export default withAuthentication(App);
