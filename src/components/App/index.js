import React from "react";
import "./index.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Event from "../Event";
import Home from "../Home";
import Leaders from "../Leaders";
import Registration from "../Registration";
import SignIn from "../SignIn";
import SignOut from "../SignOut";

import * as ROUTES from "../../constants/routes";
import { withAuthentication } from "../Session";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "../Common";

const App = props => (
  <ThemeProvider theme={theme}>
    <Router>
      <div>
        <Switch>
          <Route path={ROUTES.REGISTRATION} component={Registration} />
          <Route path={ROUTES.EVENT_WITH_KEY} component={Event} />
          <Route path={ROUTES.HOME} component={Home} />
          <Route path={ROUTES.LEADERS} component={Leaders} />
          <Route path={ROUTES.SIGN_IN} component={SignIn} />
          <Route path={ROUTES.SIGN_OUT} component={SignOut} />
          <Route exact path={ROUTES.LANDING}>
            <Redirect to={ROUTES.EVENT("trek2020")} />
          </Route>
        </Switch>
      </div>
    </Router>
  </ThemeProvider>
);

export default withAuthentication(App);
