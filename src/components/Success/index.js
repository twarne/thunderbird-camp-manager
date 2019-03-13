import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

const Success = props => (
  <div>
    <span>
      Thank you for registering for{' '}
      <Link to={ROUTES.EVENT_WITH_KEY.replace(':eventKey', props.location.state.event.key)}>
        {props.location.state.event.title}
      </Link>
      !
    </span>
  </div>
);

export default Success;
