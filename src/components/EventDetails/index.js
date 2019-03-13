import React from 'react';

import { AuthUserContext } from '../Session';

import '../Common/index.css';
import './index.css';

class EventDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser =>
          authUser ? (
            <div className="Section">
              <h2 className="SectionHeading">Event Details</h2>
              <span className="EventDetails">
                Dates: {this.props.event.startDate.toDate().toLocaleString()} through{' '}
                {this.props.event.endDate.toDate().toLocaleString()}
              </span>
              <span className="EventDetails">{this.props.event.description}</span>
              <span className="EventDetails">Stake: {this.props.event.stake}</span>
              <span className="EventDetails">Leader: {this.props.event.leader.name}</span>
              <span className="EventDetails">Leader phone number: {this.props.event.leader.phoneNumber}</span>
              <span className="EventDetails">Leader email: {this.props.event.leader.emailAddress}</span>
            </div>
          ) : (
            <div className="Section">
              <h2 className="SectionHeading">Event Details</h2>
              <span className="EventDetails">
                Dates: {this.props.event.startDate.toDate().toLocaleString()} through{' '}
                {this.props.event.endDate.toDate().toLocaleString()}
              </span>
              <span className="EventDetails">{this.props.event.description}</span>
              <span className="EventDetails">Stake: {this.props.event.stake}</span>
            </div>
          )
        }
      </AuthUserContext.Consumer>
    );
  }
}

export default EventDetails;
