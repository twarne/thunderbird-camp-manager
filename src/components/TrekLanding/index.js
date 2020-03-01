import React from 'react';

import { Grid, Link, withStyles, List, ListItem, ListItemText, Typography, Hidden } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { genericHashLink } from 'react-router-hash-link';
import Countdown from 'react-countdown';
import Img from 'react-image';
import * as Routes from '../../constants/routes';
import styles from '../Common';
import NavHeader from '../NavHeader';

const daysUntilTrek = ({ days, hours, minutes, seconds, complete }) => {
  return (
    <React.Fragment>
      <Grid container>
        <Grid container item xs={3}>
          <Grid item xs={12}>
            <Typography variant="h5">{days}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Days</Typography>
          </Grid>
        </Grid>
        <Grid container item xs={3}>
          <Grid item xs={12}>
            <Typography variant="h5">{hours}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Hours</Typography>
          </Grid>
        </Grid>
        <Grid container item xs={3}>
          <Grid item xs={12}>
            <Typography variant="h5">{minutes}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Minutes</Typography>
          </Grid>
        </Grid>
        <Grid container item xs={3}>
          <Grid item xs={12}>
            <Typography variant="h5">{seconds}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Seconds</Typography>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const LandingElement = props => {
  const { sectionTitle, index, landingElementId, img } = props;

  return (
    <React.Fragment>
      <Grid container item id={landingElementId}>
        {index % 2 === 0 ? (
          <Hidden smUp>
            <Grid container item xs={12}>
              <Typography variant="h2">{sectionTitle}</Typography>
            </Grid>
          </Hidden>
        ) : (
          <Grid container item xs={12} sm={6}>
            <Typography variant="h2">{sectionTitle}</Typography>
            {img && <Img src={img} />}
          </Grid>
        )}
        <Grid item xs={12} sm={6}>
          {props.children}
        </Grid>
        {index % 2 === 0 ? (
          <Hidden xsDown>
            <Grid container item xs={12} sm={6}>
              <Typography variant="h2">{sectionTitle}</Typography>
              {img && <Img src={img} />}
            </Grid>
          </Hidden>
        ) : (
          <React.Fragment />
        )}
      </Grid>
    </React.Fragment>
  );
};

const TrekLanding = props => {
  const { event, classes } = props;
  console.log(event);

  const MaterialHashLink = props => genericHashLink(props, Link);

  const scrollWithOffset = el => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
  };

  const links = [
    { link: 'Home', landingElementId: 'home' },
    { link: 'Registration', landingElementId: 'registration' },
    { link: 'Dates to Remember', landingElementId: 'dates_to_remember' },
    { link: 'What to Pack', landingElementId: 'what_to_pack' },
    { link: 'What to Wear', landingElementId: 'what_to_wear' },
    { link: 'Physical Preparation', landingElementId: 'physical_preparation' },
    { link: 'Spiritual Preparation', landingElementId: 'spiritual_preparation' }
  ];

  return (
    <React.Fragment>
      <NavHeader title={event ? event.title : 'Loading...'}>
        {links.map(({ link, landingElementId }, index) => (
          <Grid key={landingElementId} item xs={1}>
            <MaterialHashLink
              smooth
              scroll={scrollWithOffset}
              to={`#${landingElementId}`}
              variant="body2"
              className={classes.landingHeaderLink}
            >
              {link}
            </MaterialHashLink>
          </Grid>
        ))}
      </NavHeader>
      {event && (
        <Grid container spacing={3} className={classes.landingGridRoot}>
          <LandingElement
            sectionTitle="Trek 2020"
            index={1}
            landingElementId="home"
            img="/img/handcarts-lined-up-325609-tablet-mod.png"
          >
            <Grid container item xs={12}>
              <Grid item xs={12}>
                <Typography variant="h4">June 3-6, 2020</Typography>
              </Grid>
              <Grid item xs={12}>
                <Countdown date={event.startDate.toDate()} renderer={daysUntilTrek} />
              </Grid>
            </Grid>
          </LandingElement>
          <LandingElement
            sectionTitle="Registration"
            index={2}
            landingElementId="registration"
            img="/img/pioneer-trek-993733-tablet-mod.jpg"
          >
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">All participants will need to complete registration:</Typography>
              <Typography variant="body1">
                <Link component={RouterLink} to={Routes.REGISTRATION_WITH_EVENT(event.key)}>
                  {event.title} Registration
                </Link>
              </Typography>
            </Grid>
          </LandingElement>
          <LandingElement sectionTitle="Dates to Remember" index={3} landingElementId="dates_to_remember">
            <List className={classes.root}>
              <ListItem>
                <ListItemText primary="Stetson Valley Fireside" secondary="March 24" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Arrowhead Ranch and Sierra Verde Fireside" secondary="March 25" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Mountain Ridge Fireside" secondary="April 1" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Thunderbird Hills Fireside" secondary="April 8" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Sonoran Mountain Fireside" secondary="April 15" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Equipment Check" secondary="May 30" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Trek" secondary="June 3-6" />
              </ListItem>
            </List>
          </LandingElement>
          <LandingElement sectionTitle="What to Pack" index={4} landingElementId="what_to_pack">
            <Typography variant="body1">Plan to pack the following items in a 5 gallon bucket:</Typography>
            <List className={classes.listRoot}>
              <ListItem>
                <ListItemText primary="Sunscreen" />
                <ListItemText primary="Small flashlight" />
                <ListItemText primary="Sunglasses" />
                <ListItemText primary="Poncho" />
              </ListItem>
            </List>
            <Typography variant="body1">Plan to pack the following items in a large plastic bag:</Typography>
            <List className={classes.listRoot}>
              <ListItem>
                <ListItemText primary="Sleeping bag" />
                <ListItemText primary="Pillow" />
              </ListItem>
            </List>
          </LandingElement>
          <LandingElement sectionTitle="What to Wear" index={5} landingElementId="what_to_wear">
            <Grid container></Grid>
          </LandingElement>
          <LandingElement sectionTitle="Physical Preparation" index={6} landingElementId="physical_preparation">
            <Typography variant="body1">
              Trek is a physically intense experience that includes hiking, camping and other outdoor activities.
            </Typography>
          </LandingElement>
          <LandingElement sectionTitle="Spiritual Preparation" index={7} landingElementId="spiritual_preparation">
            <Typography variant="body1">
              More important than the physical experience of trek is the intense spiritual experience that can accompany
              both your preparation and participation.
            </Typography>
          </LandingElement>
        </Grid>
      )}
    </React.Fragment>
  );
};

export default withStyles(styles)(TrekLanding);
