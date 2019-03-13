import React from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

import './index.css';

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser => (authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />)}
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = authUser => (
  <div className="NavigationGroup">
    <div className="NavigationLink">
      <Link to={ROUTES.EVENTS}>Events</Link>
    </div>
    <div className="NavigationLink">
      <Link to={ROUTES.LEADERS}>Leaders</Link>
    </div>
    {authUser.authUser.roles.includes(ROLES.ADMIN) && (
      <div className="NavigationLink">
        <Link to={ROUTES.ADMIN}>Admin</Link>
      </div>
    )}
    <div className="NavigationLink">
      <SignOutButton />
    </div>
  </div>
);

const NavigationNonAuth = () => (
  <div className="NavigationGroup">
    <div className="NavigationLink">
      <Link to={ROUTES.EVENTS}>Events</Link>
    </div>
    <div className="NavigationLink">
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </div>
  </div>
);

export default Navigation;
