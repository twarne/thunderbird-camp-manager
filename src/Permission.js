import React, { Component } from 'react';
import SignatureCanvas from 'react-signature-canvas';

class Permission extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {}

  handleSubmit(event) {}
  render() {
    return (
      <div className="Section">
        <form onSubmit={this.handleSubmit}>
          <label>
            I give permission for my child/youth to participate in the event and activities listed above (unless noted)
            and authorize the adult leaders supervising this event to administer emergency treatment to the above-named
            participant for any accident or illness and to act in my stead in approving necessary medical care. This
            authorization shall cover this event and travel to and from this event. The participant is responsible for
            his or her own conduct and is aware of and agrees to abide by Church standards, camp, or event safety rules
            and other pertinent instructions. Participants’ conduct and interactions should abide by Church standards
            and exemplify Christlike behavior. Parents and participants should understand that participation in an
            activity is not a right but a privilege that can be revoked if they behave inappropriately or if they pose a
            risk to themselves or others
          </label>
          <label>
            Participant signature
            <SignatureCanvas penColor="blue" canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }} />
          </label>
          <label>
            Date
            <input type="text" value={this.state.participantSignatureDate} onChange={this.handleChange} />
          </label>
          <label>
            Parent/guardian signature (if necessary)
            <SignatureCanvas penColor="blue" canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }} />
          </label>
          <label>
            Date
            <input type="text" value={this.state.parentSignatureDate} onChange={this.handleChange} />
          </label>
        </form>
      </div>
    );
  }
}

export default Permission;
