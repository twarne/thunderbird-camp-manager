import React from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';

import EventDetails from '../EventDetails';

import * as ROUTES from '../../constants/routes';

import './index.css';

class EventsBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = { loading: true };
  }

  componentWillReceiveProps(nextProps) {
    console.log('Will receive');
    if (nextProps.id === this.props.id) {
      // Clean component and reload?
      this.setState({ loading: true });
    }
  }

  componentDidMount() {
    console.log('Event componentDidMount');
    console.log(this.props);

    if (this.props.match.params.eventKey) {
      this.props.firebase.loadEventDetails(this.props.match.params.eventKey).then(eventDoc => {
        console.log(eventDoc);
        this.setState({ loading: false, event: eventDoc.docs[0].data() });
      });
    } else {
      this.props.firebase.loadEvents().then(eventsDoc => {
        console.log(eventsDoc);
        this.setState({ loading: false, events: eventsDoc.docs.map(eventDoc => eventDoc.data()) });
      });
    }
  }

  render() {
    if (this.state.loading) {
      console.log('Loading');
      return (
        <div>
          <span>Loading events...</span>
        </div>
      );
    } else {
      console.log('Not loading');
      if (this.state.event) {
        console.log('Single Event: %s', this.state.event.key);
        console.log(this.props.location);
        const permissionFormPath = '/event/' + this.state.event.key + '/permission_form';
        return (
          <div>
            <h1>{this.state.event.title}</h1>
            <EventDetails event={this.state.event} />
            <div className="formLink">
              <Link to={{ pathname: ROUTES.REGISTRATION }}>Register</Link>
            </div>
          </div>
        );
      } else if (this.state.events) {
        console.log('All Events');
        return (
          <div>
            {this.state.events.map(event => (
              <Link key={event.key} to={'/event/' + event.key}>
                {event.title}
              </Link>
            ))}
          </div>
        );
      }
    }
  }
}

const Events = withFirebase(EventsBase);

export default Events;
