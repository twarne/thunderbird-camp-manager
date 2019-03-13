import React from 'react';

import StyledSelect from '../StyledSelect';

import * as ROLES from '../../constants/roles';
import { withAuthorization } from '../Session';

class LeadersPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { loading: true, participants: {} };

    this.handleSelectEvent = this.handleSelectEvent.bind(this);
  }

  handleSelectEvent(event) {
    console.log('Selected event key: ' + selectedEventKey);
    const selectedEventKey = event.target.value;
    this.props.firebase.loadPermissionFormsForEvent(selectedEventKey).then(permissionFormsDoc => {
      const permissionForms = permissionFormsDoc.docs.map(formDoc => formDoc.data());
      console.log('Permission forms');
      console.log(permissionForms);
      this.setState({ permissionForms: permissionForms, selectedEvent: event.target.value });
      this.loadParticipants();
    });
  }

  loadParticipants() {
    console.log('Loading participants');
    this.state.permissionForms.forEach(form => {
      form.participantRef.get().then(participantDoc => {
        const participants = this.state.participants;
        participants[form.participantRef.path] = participantDoc.data();
        this.setState({ participants });
      });
    });
  }

  componentDidMount() {
    this.props.firebase.loadEvents().then(eventsDoc => {
      console.log(eventsDoc);
      const events = eventsDoc.docs.map(eventDoc => {
        const event = eventDoc.data();
        return { value: eventDoc.ref, label: event.title };
      });
      this.setState({ loading: false, events: events });
    });
  }

  render() {
    return (
      <div>
        <h1>Leaders</h1>
        <StyledSelect
          id="eventSelect"
          name="selectedEvent"
          value={this.state.selectedEvent}
          title="Select Event"
          placeholder="Event"
          onChange={this.handleSelectEvent}
          inputWidth="20"
          options={this.state.events}
        />
        {this.state.selectedEvent && (
          <div>
            <table>
              <thead>
                <tr>
                  <th>Participant Name</th>
                  <th>Ward</th>
                  <th>Shirt Size</th>
                  <th>Permission Form</th>
                  <th>Release Form</th>
                </tr>
              </thead>
              <tbody>
                {this.state.permissionForms.map(form => {
                  console.log('Permission form: ');
                  console.log(form);
                  const participant = this.state.participants[form.participantRef.path];
                  console.log(participant);
                  if (participant) {
                    return (
                      <tr key={form.participantRef.path}>
                        <td>{participant.participant.name}</td>
                        <td>{participant.participant.ward}</td>
                        <td>{participant.participant.shirtSize}</td>
                        <td>Permission Form</td>
                        <td>Release Form</td>
                      </tr>
                    );
                  } else {
                    return;
                  }
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

const authorizationCondition = authUser =>
  authUser &&
  authUser.roles &&
  (authUser.roles.includes(ROLES.WARD_LEADER) ||
    authUser.roles.includes(ROLES.WARD_LEADER) ||
    authUser.roles.includes(ROLES.ADMIN));

export default withAuthorization(authorizationCondition)(LeadersPage);
