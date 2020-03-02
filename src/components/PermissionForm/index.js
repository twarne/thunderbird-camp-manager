import React, { useState, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import SignatureCanvas from 'react-signature-canvas';
import { FormGroup, FormLabel, FormControl, Grid, Button } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import RegistrationFormContext from '../Context';

const PermissionForm = props => {
  const parentSignatureRef = props.parentSigRef;
  const participantSignatureRef = props.participantSigRef;

  const [signatureData, setSignatureData] = useState({ releaseText: props.releaseText });

  const registrationFormContext = useContext(RegistrationFormContext);
  registrationFormContext.updateReadyForNext(true);

  console.log('Permission Form Props');
  console.log(props);
  const { classes } = props;
  const theme = useTheme();
  var signatureBlockBase = (useMediaQuery(theme.breakpoints.down('md')) && 300) || 450;
  console.log('Signature block base: ' + signatureBlockBase);

  const handleSignatureUpdated = sigRef => () => {
    console.log('Signature updated (%s)', sigRef.current.props.name);
    console.log(sigRef.current.getTrimmedCanvas().toDataURL('image/png'));
    const sigRefData = sigRef.current.toDataURL('image/png');
    const updatedSignatureData = { ...signatureData };
    updatedSignatureData[sigRef.current.props.name] = sigRefData;
    setSignatureData(updatedSignatureData);
    props.onChange(updatedSignatureData);
  };

  const clearSignatureBlock = sigRef => event => {
    sigRef.current.clear();
    const updatedSignatureData = { ...signatureData };
    updatedSignatureData[sigRef.current.props.name] = '';
    setSignatureData(updatedSignatureData);
    props.onChange(updatedSignatureData);
  };

  return (
    <React.Fragment>
      <FormGroup>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ReactMarkdown source={props.releaseText} />
          </Grid>
          {props.includeParticipant && (
            <React.Fragment>
              <Grid item xs={12}>
                <FormLabel>Participant Signature</FormLabel>
              </Grid>
              <Grid item xs={12}>
                <FormControl>
                  <SignatureCanvas
                    name="participantSignature"
                    ref={participantSignatureRef}
                    penColor="blue"
                    onEnd={handleSignatureUpdated(participantSignatureRef)}
                    canvasProps={{
                      width: signatureBlockBase,
                      height: (signatureBlockBase * 2) / 5,
                      className: classes.canvas
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  className={classes.button}
                  onClick={clearSignatureBlock(participantSignatureRef)}
                >
                  Clear
                </Button>
              </Grid>
            </React.Fragment>
          )}
          {props.includeParent && (
            <React.Fragment>
              <Grid item xs={12}>
                <FormLabel>Parent/Guardian Signature</FormLabel>
              </Grid>
              <Grid item xs={12}>
                <FormControl>
                  <SignatureCanvas
                    name="parentSignature"
                    ref={parentSignatureRef}
                    penColor="blue"
                    onEnd={handleSignatureUpdated(parentSignatureRef)}
                    canvasProps={{
                      width: signatureBlockBase,
                      height: (signatureBlockBase * 2) / 5,
                      className: classes.canvas
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button variant="outlined" className={classes.button} onClick={clearSignatureBlock(parentSignatureRef)}>
                  Clear
                </Button>
              </Grid>
            </React.Fragment>
          )}
        </Grid>
      </FormGroup>
    </React.Fragment>
  );
};

export default PermissionForm;
