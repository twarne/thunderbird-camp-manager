import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

const ParentsPage = () => (
  <div>
    <h1>Parents</h1>
    <span>Please complete the following forms for each youth:</span>
    <ul>
      <li>
        <Link to={{ pathname: ROUTES.PERMISSION_FORM, state: { eventId: 'w7fGUDHCxhyxnlVmCm6r' } }}>
          Permission and Medical Information
        </Link>
      </li>
      <li>
        <Link to={{ pathname: ROUTES.RELEASE_FORM, state: { eventId: 'w7fGUDHCxhyxnlVmCm6r' } }}>
          Participant Release
        </Link>
      </li>
    </ul>
  </div>
);

export default ParentsPage;
