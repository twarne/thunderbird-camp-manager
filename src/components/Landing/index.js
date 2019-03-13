import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const Landing = () => (
  <div>
    <h1>Welcome to Thunderbird Activity Manager!</h1>
    <div>
      <Link to={ROUTES.PARENTS}>Parents</Link> | <Link to={ROUTES.LEADERS}>Leaders</Link>
    </div>
  </div>
);

export default Landing;
