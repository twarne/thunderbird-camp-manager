import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import { withFirebase } from "../Firebase";
import EventDetails from "../EventDetails";
import NavHeader from "../NavHeader";
import TrekLanding from "../TrekLanding";
import styles from "../Common";

import * as ROUTES from "../../constants/routes";

const Event = props => {
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (props.match.params.eventKey) {
      props.firebase
        .loadEventDetails(props.match.params.eventKey)
        .then(eventDoc => {
          setLoading(false);
          if (eventDoc.docs.length > 0) {
            setEvent(eventDoc.docs[0].data());
          } else {
            setEvent(null);
          }
        });
    }
  }, [props.firebase, props.match.params.eventKey]);

  return (
    <React.Fragment>
      <CssBaseline />
      {props.match.params.eventKey === "trek2022" ? (
        <TrekLanding event={event} />
      ) : (
        <React.Fragment>
          <NavHeader
            title={
              event ? event.title : loading ? "Loading..." : "Event not found!"
            }
          />
          {event && (
            <React.Fragment>
              <EventDetails event={event} />
              <div className="formLink">
                <Link
                  to={{
                    pathname: ROUTES.REGISTRATION.replace(
                      ":eventKey",
                      event.key
                    ),
                    state: { event: event }
                  }}
                >
                  Register
                </Link>
              </div>
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

Event.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withFirebase(withStyles(styles)(Event));
