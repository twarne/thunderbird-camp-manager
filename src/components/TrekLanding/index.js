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

  const links = [
    { link: 'Home', landingElementId: 'home' },
    {
      link: 'Spiritual Preparation',
      landingElementId: 'spiritual_preparation'
    },
    { link: 'Physical Preparation', landingElementId: 'physical_preparation' },
    { link: 'Dates to Remember', landingElementId: 'dates_to_remember' },
    { link: 'Registration', landingElementId: 'registration' },
    { link: 'What to Wear', landingElementId: 'what_to_wear' },
    { link: 'What to Pack', landingElementId: 'what_to_pack' },
    { link: 'Leaders', landingElementId: 'leaders', authOnly: true }
  ];

  const videoResources = [
    { title: 'Pioneers: Followers of Jesus Christ', videoId: 'J2rV0ey6Op0' },
    { title: 'Mormon Apostle Dieter F. Uchtdorf Talks about Mormon Pioneers', videoId: 'f8zNBQ8nkKw' },
    { title: 'Mormon Pioneers - Act of Courage - LDS Church History', videoId: 'WCFLQSy6alE' },
    { title: 'A Tribute to the Mormon Pioneers HD', videoId: 'cCrVM4fVCRI' }
  ];

  const videoOptions = {
    width: "90%"
  };

  const importantDates = [
    { title: 'Trek Committee Meeting', date: 'March 8, 2020', leadersOnly: true },
    { title: 'Stetson Valley Fireside', date: 'March 24, 2020' },
    { title: 'Arrowhead Ranch and Sierra Verde Fireside', date: 'March 25, 2020' },
    { title: 'Trek Committee Meeting', date: 'March 29, 2020', leadersOnly: true },
    { title: 'Mountain Ridge Fireside', date: 'April 1, 2020' },
    { title: 'Thunderbird Hills Fireside', date: 'April 8, 2020' },
    { title: 'Sonoran Mountain Fireside', date: 'April 15, 2020' },
    { title: 'Trek Committee Meeting', date: 'April 19, 2020', leadersOnly: true },
    { title: 'Ma and Pa Training', date: 'April 17-18, 2020', leadersOnly: true },
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
      <NavHeader title={event ? event.title : 'Loading...'} menuOnly={!showLinks}>
        {showLinks ? (
          links.map(({ link, landingElementId, authOnly }, index) => (
            <React.Fragment key={landingElementId}>
              {(!authOnly || authUser) && (
                <Grid item xs={1}>
                  <MaterialHashLink
                    smooth
                    scroll={scrollWithOffset}
                    to={`#${landingElementId}`}
                    variant="button"
                    className={classes.navHeaderLink}
                  >
                    {link}
                  </MaterialHashLink>
                </Grid>
              )}
            </React.Fragment>
          ))
        ) : (
          <Grid item xs={1}>
            <NavMenu links={links} />
          </Grid>
        )}
      </NavHeader>
      {event && (
        <Grid container spacing={4} className={classes.landingGridRoot}>
          <LandingElement
            sectionTitle="Trek 2020"
            hideTitle
            index={1}
            landingElementId="home"
            titleImg="/img/trek_logo.png"
          >
            <Grid container item xs={12} className={classes.landingGridContent}>
              <Grid item xs={12}>
                <Typography variant="body1" paragraph>
                  Welcome to Thunderbird Park Stake Trek 2020! Trek will be a lasting memory and will help you establish
                  strong spiritual foundations. Our trek will be held on:
                </Typography>
                <Typography variant="h4" align="center" paragraph>
                  June 3-6, 2020
                </Typography>
              </Grid>
              <Hidden smDown>
                <Grid item xs={12}>
                  <Countdown date={event.startDate.toDate()} renderer={daysUntilTrek} />
                </Grid>
              </Hidden>
              <Grid item xs={12}>
                <Typography variant="body1" paragraph>
                  This site lists some of the things you should know and do to prepare for trek. As you prepare with
                  your quorum or class, with your family, and individually, please listen to the Spirit as he guides you
                  to get the most out of this experience.
                </Typography>
                <Typography variant="h4" paragraph>
                  Trek for your personal or family name
                </Typography>
                <Typography variant="body1" paragraph>
                  Every person has a story. What's yours? Take the opportunity to find a family name to trek for. Not
                  everyone has a pioneer ancestor, but maybe that pioneer is you. Choose an ancestor. Get to know who
                  that person is so that you can share their story with your trek family. This will be an amazing
                  experience.
                </Typography>
              </Grid>
            </Grid>
          </LandingElement>
          <LandingElement
            sectionTitle="Dates to Remember"
            index={2}
            landingElementId="dates_to_remember"
            img="/img/youth-pioneer-handcart-trek-meadow-342033-tablet-mod.png"
          >
            <Grid item xs={12} className={classes.landingGridContent}>
              <List className={classes.root}>
                {importantDates.map(({ title, date, leadersOnly }, index) => (
                  <React.Fragment key={index}>
                    {(!leadersOnly || authUser) && (
                      <ListItem>
                        <ListItemText primary={title} secondary={date} />
                      </ListItem>
                    )}
                  </React.Fragment>
                ))}
              </List>
            </Grid>
          </LandingElement>
          <LandingElement
            sectionTitle="Spiritual Preparation"
            index={3}
            landingElementId="spiritual_preparation"
            titleImg="/img/handcart-pioneers-sam-lawlor-275615-tablet.jpg"
          >
            <Grid item xs={12}>
              <Typography variant="body1" paragraph>
                More important than the physical experience of trek is the intense spiritual experience that can
                accompany both your preparation and participation. The pioneers in Church history left family and
                friends, homes and possessions to gather with the Saints in Kirtland, Missouri, Nauvoo and finally in
                the Salt Lake Valley. These pioneers were driven by their faith in the goodness of their Heavenly
                Father, and the importance of the work which they were undertaking.
              </Typography>
              <Typography variant="body1" paragraph>
                In our day, modern pioneers similarly sacrifice to join with the Saints. Each of us has to make the
                important choice to choose the Savior and His gospel, and to live so that we are worthy of the Spirit
                and the blessings that the Lord has promised.
              </Typography>
              <Typography variant="body1" paragraph>
                As you prepare for your trek, we encourage you to choose a pioneer, past or present, for whom you can
                trek. As you learn about the individual you choose, you will feel a kinship and your experience will be
                strengthened by their experiences. Throughout your preparation and while on trek, you will be asked:
              </Typography>
              <Typography variant="h4" align="center" paragraph>
                What is your name?
              </Typography>
              <Typography variant="body1" paragraph>
                To get started, read about pioneers from the past on the Church's{' '}
                <a href="https://history.churchofjesuschrist.org/overlandtravel/">Overland Travels</a> site.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" paragraph>
                Video Resources
              </Typography>
            </Grid>
            {videoResources.map(({ title, videoId }, index) => (
              <Grid key={index} item xs={12}>
                <Typography variant="caption">{title}</Typography>
                <YouTube videoId={videoId} opts={videoOptions} />
              </Grid>
            ))}
          </LandingElement>
          <LandingElement
            sectionTitle="Physical Preparation"
            index={4}
            landingElementId="physical_preparation"
            img="/img/youth-simulation-pioneer-handcart-trek-341986-tablet.png"
          >
            <Grid item xs={12} className={classes.landingGridContent}>
              <Typography variant="body1" paragraph>
                Trek is a physically intense experience that includes hiking, camping and other outdoor activities. Your
                trek experience will be enhanced through proper physical preparation. In particular, you should be
                physically fit enough to safely hike the distances involved. If you have any conditions that limit your
                physical abilities, please talk to your bishop, young women's president, or ward Trek liason so that we
                can be sure that you are successful in your trek experience. You are required to walk three miles on
                level ground in 60 minutes or less without undue stress. Take practice hikes and prepare to walk uphill.
                Many of you will benefit from improving your physical fitness before trek.
              </Typography>
              <Typography variant="body1" paragraph>
                For more information, see{' '}
                <a href="https://www.churchofjesuschrist.org/callings/church-safety-and-health/training-and-video-resources/get-in-shape?lang=eng">
                  Get in Shape
                </a>{' '}
                on the Church website.
              </Typography>
            </Grid>
          </LandingElement>
          <LandingElement
            sectionTitle="Registration"
            index={5}
            landingElementId="registration"
            img="/img/pioneer-trek-993733-tablet.png"
          >
            <Grid item xs={12} className={classes.landingGridContent}>
              <Typography variant="body1">
                All participants will need to complete the registration and permission form.
              </Typography>
              <Link component={RouterLink} to={Routes.REGISTRATION_WITH_EVENT(event.key)}>
                {event.title} Registration
              </Link>
            </Grid>
          </LandingElement>
          <LandingElement
            sectionTitle="What to Wear"
            index={6}
            landingElementId="what_to_wear"
            img="/img/youth-handcart-trek-pioneer-reenactment-342091-tablet.png"
          >
            <Grid item xs={12} className={classes.landingGridContent}>
              <Typography variant="body1" paragraph>
                Where possible, you are encouraged to wear pioneer-style clothing. Doing so will help you immerse
                yourself in the trek experience. Please don't spend excessive time or money making or buying pioneer
                clothes. Many items can be found in existing wardrobes or at secondhand stores.
              </Typography>
              <Typography variant="body1" paragraph>
                Ideally, young women’s blouses should be lightweight and long-sleeved, and their skirts should reach the
                midcalf, with bloomers or shorts underneath to prevent chafing. Lightweight, long-sleeved shirts and
                comfortable, loose-fitting pants are recommended for the young men. Cotton fabrics are generally
                recommended.
              </Typography>
              <Typography variant="body1" paragraph>
                To help reduce the likelihood of blisters, you should wear (1) walking or hiking shoes that are broken
                in and (2) two pairs of socks at a time. Ideally the inner sock should be thin and synthetic, while the
                outer sock is wool or a wool blend. Socks that wick away moisture are the most helpful. Socks that are a
                wool-synthetic blend can also help reduce the potential for blisters.
              </Typography>
            </Grid>
          </LandingElement>
          <LandingElement sectionTitle="What to Pack" index={7} landingElementId="what_to_pack">
            <Grid item xs={12} className={classes.landingGridContent}>
              <Typography variant="body1">Plan to pack the following items:</Typography>
              <List className={classes.packingList}>
                {packingList.map(({ primary, secondary, sublist }, index) => (
                  <React.Fragment key={index}>
                    <ListItem dense>
                      <ListItemText primary={primary} secondary={secondary} />
                    </ListItem>
                    {sublist && (
                      <List className={classes.packingSubList} dense>
                        {sublist.map(({ primary, secondary }, index) => (
                          <ListItem key={index}>
                            <ListItemText primary={primary} secondary={secondary} inset />
                          </ListItem>
                        ))}
                      </List>
                    )}
                  </React.Fragment>
                ))}
              </List>
            </Grid>
          </LandingElement>
          {authUser && (
            <LandingElement sectionTitle="Leaders" index={8} landingElementId="leaders" minHeight="200px">
              <Typography variant="body1">Important links for leaders:</Typography>
              <Link component={RouterLink} to={Routes.LEADERS_WITH_EVENT(event.key)}>
                {event.title} Leaders
              </Link>
            </LandingElement>
          )}
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
