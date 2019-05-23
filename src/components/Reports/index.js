import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Grid, TextField, MenuItem, Paper, Typography } from '@material-ui/core';
import { PDFDownloadLink } from '@react-pdf/renderer';

import AllergiesReport from './allergies';
import TShirtReport from './tshirts';
import YearsReport from './years';

import styles from '../Common';

const REPORTS = [
  {
    key: 'allergies',
    label: 'Allergies and Dietary Restrictions',
    value: 'allergies'
  },
  {
    key: 'tshirts',
    label: 'T-Shirt Sizes',
    value: 'tshirts'
  },
  {
    key: 'years',
    label: 'Participants by Year',
    value: 'years'
  }
];

const ReportsSelector = props => {
  const [selectedReport, setSelectedReport] = useState('');
  const [generatedReport, setGeneratedReport] = useState(null);

  useEffect(() => {
    if (selectedReport === 'allergies') {
      setGeneratedReport({
        document: <AllergiesReport permissionForms={permissionForms} event={event} authUser={authUser} />,
        fileName: 'allergies.pdf'
      });
    } else if (selectedReport === 'tshirts') {
      setGeneratedReport({
        document: <TShirtReport permissionForms={permissionForms} event={event} authUser={authUser} />,
        fileName: 'tshirts.pdf'
      });
    } else if (selectedReport === 'years') {
      setGeneratedReport({
        document: <YearsReport permissionForms={permissionForms} event={event} authUser={authUser} />,
        fileName: 'years.pdf'
      });
    }
  }, [selectedReport]);

  const handleReportChange = event => {
    setSelectedReport(event.target.value);
  };

  const { classes, authUser, permissionForms, event } = props;

  console.log('AuthUser:');
  console.log(authUser);

  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Grid container spacing={24}>
            <Grid item xs={8}>
              <Typography variant="subtitle1">Pre-defined Reports</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                id="report"
                select
                value={selectedReport}
                onChange={handleReportChange}
                helperText="Please select report"
              >
                {event.reports &&
                  event.reports.map(item => (
                    <MenuItem key={item.key} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item xs={8}>
              {generatedReport && (
                <PDFDownloadLink document={generatedReport.document} fileName={generatedReport.fileName}>
                  {({ blob, url, loading, error }) => (loading ? 'Loading report...' : 'Download now!')}
                </PDFDownloadLink>
              )}
            </Grid>
          </Grid>
        </Paper>
      </main>
    </React.Fragment>
  );
};

ReportsSelector.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ReportsSelector);
