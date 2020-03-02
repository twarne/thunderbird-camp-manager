import React from 'react';

const RegistrationFormContext = React.createContext({
    readyForNext: false,
    updateReadyForNext: () => {}
});

export default RegistrationFormContext;