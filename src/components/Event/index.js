import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import { withFirebase } from '../Firebase';

import EventDetails from '../EventDetails';

import * as ROUTES from '../../constants/routes';

import './index.css';

class EventBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = { loading: true };
  }

  componentDidMount() {
    if (this.props.match.params.eventKey) {
      this.props.firebase.loadEventDetails(this.props.match.params.eventKey).then(eventDoc => {
        console.log(eventDoc);
        this.setState({ loading: false, event: eventDoc.docs[0].data() });
      });
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <div>
          <span>Loading events...</span>
        </div>
      );
    } else {
      if (this.state.event) {
        console.log('Single Event: %s', this.state.event.key);
        console.log(this.props.location);
        return (
          <div>
            <h1>{this.state.event.title}</h1>
            <EventDetails event={this.state.event} />
            <div className="formLink">
              <Link to={{ pathname: ROUTES.PERMISSION_FORM.replace(':eventKey', this.state.event.key) }}>Register</Link>
            </div>
          </div>
        );
      } else if (!this.props.match.params.eventKey) {
        console.log('All Events');
        return <Redirect to={ROUTES.EVENTS} />;
      }
    }
  }
}

const Event = withFirebase(EventBase);

export default Event;
