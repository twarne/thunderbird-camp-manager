import React from 'react';
import SignaturePad from 'react-signature-canvas';

import { Redirect } from 'react-router-dom';

import { withFirebase } from '../Firebase';

import EventDetails from '../EventDetails';
import ParticipantInformation from '../ParticipantInformation';

import * as STRINGS from '../../constants/strings';
import * as ROUTES from '../../constants/routes';

class ReleaseFormBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      event: {},
      participantInformation: {},
      loadingEvent: true,
      loadingParticipant: true,
      stored: false,
      signed: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.storeForm = this.storeForm.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const youthSignatureData = this.youthSigPad.getTrimmedCanvas().toDataURL('image/png');
    const parentSignatureData = this.parentSigPad.getTrimmedCanvas().toDataURL('image/png');
    this.setState(
      { youthSignatureData: youthSignatureData, parentSignatureData: parentSignatureData, signed: true },
      this.storeForm
    );
  }

  storeForm() {
    const releaseForm = {
      eventRef: this.state.eventRef.ref,
      participantRef: this.state.participantRef.ref,
      youthSignatureData: this.state.youthSignatureData,
      parentSignatureData: this.state.parentSignatureData
    };

    this.props.firebase.storeReleaseForm(releaseForm).then(this.setState({ stored: true }));
  }

  componentDidMount() {
    const eventRef = this.props.firebase
      .getData(this.props.location.state.eventRefPath)
      .get()
      .then(eventRef => this.setState({ loadingEvent: false, event: eventRef.data(), eventRef }));
    this.props.firebase
      .getData(this.props.location.state.participantRefPath)
      .get()
      .then(participantRef =>
        this.setState({ loadingParticipant: false, participantInformation: participantRef.data(), participantRef })
      );
  }

  render() {
    if (this.state.stored) {
      return <Redirect push to={{ pathname: ROUTES.SUCCESS, state: { event: this.state.event } }} />;
    }
    return (
      <div className="PermissionForm">
        <h1>{this.state.event.title}</h1>
        {this.state.loadingEvent || this.state.loadingParticipant ? (
          <span>Loading...</span>
        ) : (
          <form onSubmit={this.handleSubmit}>
            <EventDetails event={this.state.event} />
            <ParticipantInformation
              participant={this.state.participantInformation.participant}
              address={this.state.participantInformation.address}
              onChange={event => {}}
              readOnly={true}
            />
            <div className="ReleaseBlurb">
              <span>{STRINGS.BASIC_RELEASE}</span>
            </div>
            <div>
              <SignaturePad
                ref={ref => {
                  this.youthSigPad = ref;
                }}
              />
            </div>
            <div className="ReleaseBlurb">
              <span>{STRINGS.PARENT_RELEASE}</span>
            </div>
            <div>
              <SignaturePad
                ref={ref => {
                  this.parentSigPad = ref;
                }}
              />
            </div>
            <input type="submit" value="Sign" />
          </form>
        )}
      </div>
    );
  }
}

const ReleaseForm = withFirebase(ReleaseFormBase);

export default ReleaseForm;
