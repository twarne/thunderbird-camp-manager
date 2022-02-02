import React, { lazy, Suspense } from 'react';
import './index.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
import { ThemeProvider } from '@material-ui/core';
import { theme } from '../Common';

const Event = lazy(() => import('../Event'));
const Home = lazy(() => import('../Home'));
const Leaders = lazy(() => import('../Leaders'));
const Registration = lazy(() => import('../Registration'));
const SignIn = lazy(() => import('../SignIn'));
const SignOut = lazy(() => import('../SignOut'));

const App = props => (
  <ThemeProvider theme={theme}>
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <div>
          <Switch>
            <Route path={ROUTES.REGISTRATION} component={Registration} />
            <Route path={ROUTES.EVENT_WITH_KEY} component={Event} />
            <Route path={ROUTES.HOME} component={Home} />
            <Route path={ROUTES.LEADERS} component={Leaders} />
            <Route path={ROUTES.SIGN_IN} component={SignIn} />
            <Route path={ROUTES.SIGN_OUT} component={SignOut} />
            <Route exact path={ROUTES.LANDING}>
              <Redirect to={ROUTES.EVENT('trek2022')} />
            </Route>
          </Switch>
        </div>
      </Suspense>
    </Router>
  </ThemeProvider>
);

export default withAuthentication(App);
