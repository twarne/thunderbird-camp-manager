export const LANDING = '/';
export const SIGN_IN = '/signin';
export const SIGN_OUT = '/signout';
export const HOME = '/home';
export const ACCOUNT = '/account';
export const ADMIN = '/admin';

export const LEADERS = '/leaders/:eventKey?';
export const LEADERS_WITH_EVENT = eventKey => `/leaders/${eventKey}`;

export const PARENTS = '/parents';

export const EVENTS = '/events';
export const EVENT_WITH_KEY = '/event/:eventKey';
export const EVENT = eventKey => `/event/${eventKey}`;

export const SUCCESS = '/success';

export const REGISTRATION = '/event/:eventKey/registration';
export const REGISTRATION_WITH_EVENT = eventKey => `/event/${eventKey}/registration`;
