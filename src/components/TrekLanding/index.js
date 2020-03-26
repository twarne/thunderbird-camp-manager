import React, { useState, useEffect } from 'react';

import {
  Grid,
  Link,
  withStyles,
  List,
  ListItem,
  ListItemText,
  Typography,
  Hidden,
  useMediaQuery,
  useTheme
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { genericHashLink } from 'react-router-hash-link';
import Countdown from 'react-countdown';
import YouTube from 'react-youtube';
import * as Routes from '../../constants/routes';
import styles from '../Common';
import NavHeader from '../NavHeader';
import NavMenu from '../NavMenu';
import Img from 'react-image';

import { withFirebase } from '../Firebase';

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

const LandingElement = withStyles(styles)(props => {
  // img property is used by styles
  // eslint-disable-next-line
  const { sectionTitle, index, landingElementId, img, titleImg, classes, hideTitle } = props;

  const theme = useTheme();
  const isFullSize = useMediaQuery(theme.breakpoints.up('md'));
  const titleImgWidth = isFullSize ? 90 : 100;
  const titleVariant = isFullSize ? 'h2' : 'h3';

  return (
    <React.Fragment>
      <Grid container item id={landingElementId} className={classes.landingGridSection}>
        {index % 2 === 0 ? (
          <Hidden mdUp>
            <Grid container item xs={12}>
              <Grid item xs={12}>
                <Typography variant={titleVariant}>{sectionTitle}</Typography>
              </Grid>
            </Grid>
          </Hidden>
        ) : (
          <Grid container item xs={12} md={6}>
            {!hideTitle && (
              <Grid item xs={12}>
                <Typography variant={titleVariant}>{sectionTitle}</Typography>
              </Grid>
            )}
            {titleImg && (
              <Grid item xs={12}>
                <Img src={titleImg} width={`${titleImgWidth}%`} />
              </Grid>
            )}
          </Grid>
        )}
        <Grid item xs={12} md={6}>
          {props.children}
        </Grid>
        {index % 2 === 0 ? (
          <Hidden smDown>
            <Grid container item xs={12} md={6}>
              <Typography variant={titleVariant}>{sectionTitle}</Typography>
              {titleImg && (
                <Grid item xs={12}>
                  <Img src={titleImg} width={`${titleImgWidth}%`} />
                </Grid>
              )}
            </Grid>
          </Hidden>
        ) : (
          <React.Fragment />
        )}
      </Grid>
    </React.Fragment>
  );
});

const TrekLanding = props => {
  const [authUser, setAuthUser] = useState(null);

  const { event, classes } = props;

  const MaterialHashLink = props => genericHashLink(props, Link);

  const scrollWithOffset = el => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
  };

  const links = [{ link: 'Home', landingElementId: 'home' }];

  const videoResources = [
    { title: 'Pioneers: Followers of Jesus Christ', videoId: 'J2rV0ey6Op0' },
    { title: 'Mormon Apostle Dieter F. Uchtdorf Talks about Mormon Pioneers', videoId: 'f8zNBQ8nkKw' },
    { title: 'Mormon Pioneers - Act of Courage - LDS Church History', videoId: 'WCFLQSy6alE' },
    { title: 'A Tribute to the Mormon Pioneers HD', videoId: 'cCrVM4fVCRI' }
  ];

  const videoOptions = {
    width: '90%'
  };

  const importantDates = [
    { title: 'Trek Committee Meeting', date: 'March 8, 2020', leadersOnly: true },
    { title: 'Stetson Valley Fireside', date: 'March 24, 2020', tbd: true },
    { title: 'Arrowhead Ranch and Sierra Verde Fireside', date: 'March 25, 2020', tbd: true },
    { title: 'Trek Committee Meeting', date: 'March 29, 2020', leadersOnly: true },
    { title: 'Mountain Ridge Fireside', date: 'April 1, 2020', tbd: true },
    { title: 'Thunderbird Hills Fireside', date: 'April 8, 2020', tbd: true },
    { title: 'Sonoran Mountain Fireside', date: 'April 15, 2020', tbd: true },
    { title: 'Trek Committee Meeting', date: 'April 19, 2020', leadersOnly: true },
    { title: 'Ma and Pa Training', date: 'April 17-18, 2020', leadersOnly: true, tbd: true },
    { title: 'Trek Committee Meeting', date: 'May 17, 2020', leadersOnly: true },
    { title: 'Equipment Check', date: 'May 30, 2020' },
    { title: 'Trek', date: 'June 3, 2020' }
  ];

  const packingList = [
    {
      primary: '5-Gallon Bucket with lid',
      secondary:
        'LABELED with name and ward, ALL gear must fit in bucket (except sleeping bag), bucket will be used as a STOOL and it also waterproofs your gear.'
    },
    { primary: 'Flashlight w/batteries' },
    { primary: 'Warm sleeping bag in a heavy-duty trash bag' },
    { primary: 'Heavy-duty trash bag for dirty or wet clothes' },
    { primary: 'Mess kit', secondary: '(plate, bowl, spoon, and fork) labeled with your name' },
    { primary: 'Mesh bag to hold mess kit' },
    { primary: 'Tin cup with handle', secondary: 'Must be carried on you hands free' },
    { primary: '2 Carabiners', secondary: '1 to attach tin cup to belt loop or apron and 1 for mesh bag' },
    {
      primary: 'Personal hygiene Items',
      sublist: [
        { primary: 'Small hand towel/or pre-moistened wipes for face & hands' },
        { primary: 'travel size shampoo, conditioner, and soap' },
        { primary: 'toothbrush, toothpaste, and dental floss' },
        { primary: 'deodorant' },
        { primary: 'lotion' },
        { primary: 'chap-stick' },
        { primary: 'comb or brush' },
        { primary: 'hand sanitizer and tissues' },
        { primary: 'contact lens solution and case', secondary: 'if you wear contact lenses' },
        { primary: 'feminine hygiene products (young women)' }
      ]
    },
    {
      primary: 'Prescription medications',
      secondary: 'labeled in original pack (to be checked in with medical staff).'
    },
    { primary: 'Insect repellent' },
    { primary: 'Sunblock' },
    { primary: 'Sunglasses' },
    { primary: 'Personal first aid kit', secondary: 'Band-Aids & Mole Skin for foot care' },
    { primary: 'Pillowcase', secondary: 'use to make a pillow out of your jacket' },
    { primary: 'Old set of scriptures in a Ziploc bag' },
    { primary: 'Sturdy work gloves', secondary: 'for pulling the handcart - these are a MUST' },
    {
      primary: 'Clothing',
      sublist: [
        { primary: '2 pairs of tennis shoes or hiking boots', secondary: 'MUST BE broken in' },
        { primary: '4 pairs of sturdy socks + 1 thick pair to sleep in' },
        { primary: '4 undergarments' },
        { primary: 'rain poncho' },
        { primary: 'warm jacket' },
        { primary: 'warm pajamas' }
      ]
    },
    {
      primary: 'Young Women',
      sublist: [
        { primary: '1-2 bonnets' },
        { primary: '2 mid-calf length skirts and 2 blouses or 2 dresses' },
        { primary: '1-2 aprons' }
      ]
    },
    {
      primary: 'Young Men',
      sublist: [
        { primary: '2 pairs of light-colored cotton pants', secondary: 'NO camouflage, athletic pants or jeans' },
        { primary: '2 long-sleeved, button up, light colored shirts', secondary: 'Preferably cotton; NO t-shirts' },
        { primary: 'Western-style hat', secondary: 'No baseball caps, beanies or army hats' },
        { primary: 'Suspenders or vest', secondary: 'Optional' }
      ]
    },
    { primary: 'No jewelry, makeup or electronics of any kind' }
  ];

  useEffect(() => {
    return props.firebase.onAuthUserListener(
      authUser => {
        setAuthUser(authUser);
      },
      () => {
        setAuthUser(null);
      }
    );
  }, [props.firebase]);

  const theme = useTheme();
  const showLinks = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <React.Fragment>
      <NavHeader title={event ? event.title : 'Loading...'}></NavHeader>
      {event && (
        <Grid container spacing={4} className={classes.landingGridRoot}>
          <LandingElement
            sectionTitle="Trek 2020"
            hideTitle
            index={1}
            landingElementId="home"
            titleImg="/img/handcart-pioneers-sam-lawlor-275615-tablet.jpg"
          >
            <Grid container item xs={12} className={classes.landingGridContent}>
              <Grid item xs={12}>
                <Typography variant="body1" paragraph>
                  Unfortunately, due to ongoing concerns with COVID-19, Thunderbird Park Stake Trek will be postponed
                  until 2021. We look forward to preparing together over the next year for a memorable trek experience.
                </Typography>
              </Grid>
            </Grid>
          </LandingElement>
          <LandingElement
            sectionTitle=""
            index={20}
            landingElementId="end"
            img="/img/handcarts-lined-up-325609-tablet-mod.png"
          ></LandingElement>
        </Grid>
      )}
    </React.Fragment>
  );
};

export default withFirebase(withStyles(styles)(TrekLanding));
