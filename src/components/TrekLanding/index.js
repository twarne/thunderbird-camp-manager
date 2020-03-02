import React, { useState, useEffect } from "react";

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
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { genericHashLink } from "react-router-hash-link";
import Countdown from "react-countdown";
import * as Routes from "../../constants/routes";
import styles from "../Common";
import NavHeader from "../NavHeader";
import Img from "react-image";

import { withFirebase } from "../Firebase";

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
  const {
    sectionTitle,
    index,
    landingElementId,
    img,
    titleImg,
    classes
  } = props;

  return (
    <React.Fragment>
      <Grid
        container
        item
        id={landingElementId}
        className={classes.landingGridSection}
      >
        {index % 2 === 0 ? (
          <Hidden smUp>
            <Grid container item xs={12}>
              <Typography variant="h2">{sectionTitle}</Typography>
              {titleImg && (
                <Typography variant="body1">
                  <Img src={titleImg} />
                </Typography>
              )}
            </Grid>
          </Hidden>
        ) : (
          <Grid container item xs={12} sm={6}>
            <Typography variant="h2">{sectionTitle}</Typography>
          </Grid>
        )}
        <Grid item xs={12} sm={6}>
          {props.children}
        </Grid>
        {index % 2 === 0 ? (
          <Hidden xsDown>
            <Grid container item xs={12} sm={6}>
              <Typography variant="h2">{sectionTitle}</Typography>
              {titleImg && (
                <Typography variant="body1">
                  <Img src={titleImg} />
                </Typography>
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
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };

  const links = [
    { link: "Home", landingElementId: "home" },
    { link: "Dates to Remember", landingElementId: "dates_to_remember" },
    { link: "What to Pack", landingElementId: "what_to_pack" },
    { link: "What to Wear", landingElementId: "what_to_wear" },
    { link: "Physical Preparation", landingElementId: "physical_preparation" },
    {
      link: "Spiritual Preparation",
      landingElementId: "spiritual_preparation"
    },
    { link: "Registration", landingElementId: "registration" },
    { link: "Leaders", landingElementId: "leaders", authOnly: true }
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
  const showLinks = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <React.Fragment>
      <NavHeader title={event ? event.title : "Loading..."}>
          {showLinks && links.map(({ link, landingElementId, authOnly }, index) => (
            <React.Fragment>
              {(!authOnly || authUser) && (
                <Grid key={landingElementId} item xs={1}>
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
          ))}
      </NavHeader>
      {event && (
        <Grid container spacing={4} className={classes.landingGridRoot}>
          <LandingElement
            sectionTitle="Trek 2020"
            index={1}
            landingElementId="home"
          >
            <Grid container item xs={12} className={classes.landingGridContent}>
              <Grid item xs={12}>
                <Typography variant="body1" paragraph>
                  Welcome to Thunderbird Park Stake Trek 2020! Trek will be a
                  lasting memory and will help you establish strong spiritual
                  foundations. Our trek will be held on:
                </Typography>
                <Typography variant="h4" align="center" paragraph>
                  June 3-6, 2020
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Countdown
                  date={event.startDate.toDate()}
                  renderer={daysUntilTrek}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  This site lists some of the things you should know and do to
                  prepare for trek. As you prepare with your quorum or class,
                  with your family, and individually, please listen to the
                  Spirit as he guides you to get the most out of this
                  experience.
                </Typography>
              </Grid>
            </Grid>
          </LandingElement>
          <LandingElement
            sectionTitle="Dates to Remember"
            index={3}
            landingElementId="dates_to_remember"
            img="/img/youth-pioneer-handcart-trek-meadow-342033-tablet-mod.png"
          >
            <Grid item xs={12} className={classes.landingGridContent}>
              <List className={classes.root}>
                <ListItem>
                  <ListItemText
                    primary="Stetson Valley Fireside"
                    secondary="March 24"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Arrowhead Ranch and Sierra Verde Fireside"
                    secondary="March 25"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Mountain Ridge Fireside"
                    secondary="April 1"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Thunderbird Hills Fireside"
                    secondary="April 8"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Sonoran Mountain Fireside"
                    secondary="April 15"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Equipment Check" secondary="May 30" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Trek" secondary="June 3-6" />
                </ListItem>
              </List>
            </Grid>
          </LandingElement>
          <LandingElement
            sectionTitle="What to Pack"
            index={4}
            landingElementId="what_to_pack"
          >
            <Grid item xs={12} className={classes.landingGridContent}>
              <Typography variant="body1">
                Plan to pack the following items in a 5 gallon bucket:
              </Typography>
              <List className={classes.listRoot}>
                <ListItem>
                  <ListItemText primary="Sunscreen" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Small flashlight" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Sunglasses" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Poncho" />
                </ListItem>
              </List>
              <Typography variant="body1">
                Plan to pack the following items in a large plastic bag:
              </Typography>
              <List className={classes.listRoot}>
                <ListItem>
                  <ListItemText primary="Sleeping bag" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Pillow" />
                </ListItem>
              </List>
            </Grid>
          </LandingElement>
          <LandingElement
            sectionTitle="What to Wear"
            index={5}
            landingElementId="what_to_wear"
            img="/img/youth-handcart-trek-pioneer-reenactment-342091-tablet.png"
          >
            <Grid item xs={12} className={classes.landingGridContent}></Grid>
          </LandingElement>
          <LandingElement
            sectionTitle="Physical Preparation"
            index={6}
            landingElementId="physical_preparation"
            img="/img/youth-simulation-pioneer-handcart-trek-341986-tablet.png"
          >
            <Grid item xs={12} className={classes.landingGridContent}>
              <Typography variant="body1" paragraph>
                Trek is a physically intense experience that includes hiking,
                camping and other outdoor activities. Your trek experience will
                be enhanced through physical preparation:
              </Typography>
            </Grid>
          </LandingElement>
          <LandingElement
            sectionTitle="Spiritual Preparation"
            index={7}
            landingElementId="spiritual_preparation"
            titleImg="/img/handcart-pioneers-sam-lawlor-275615-tablet.jpg"
          >
            <Typography variant="body1" paragraph>
              More important than the physical experience of trek is the intense
              spiritual experience that can accompany both your preparation and
              participation. The pioneers in Church history left family and
              friends, homes and possessions to gather with the Saints in
              Kirtland, Missouri, Nauvoo and finally in the Salt Lake Valley.
              These pioneers were driven by their faith in the goodness of their
              Heavenly Father, and the importance of the work which they were
              undertaking.
            </Typography>
            <Typography variant="body1" paragraph>
              In our day, modern pioneers similarly sacrifice to join with the
              Saints. Each of us has to make the important choice to choose the
              Savior and His gospel, and to live so that we are worthy of the
              Spirit and the blessings that the Lord has promised.
            </Typography>
            <Typography variant="body1" paragraph>
              As you prepare for your trek, we encourage you to choose a
              pioneer, past or present, for whom you can trek. As you learn
              about the individual you choose, you will feel a kinship and your
              experience will be strengthened by their experiences. Throughout
              your preparation and while on trek, you will be asked:
            </Typography>
            <Typography variant="h4" align="center" paragraph>
              What is your name?
            </Typography>
            <Typography variant="body1" paragraph>
              To get started, read about pioneers from the past on the Church's{" "}
              <a href="https://history.churchofjesuschrist.org/overlandtravel/">
                Overland Travels
              </a>{" "}
              site.
            </Typography>
          </LandingElement>
          <LandingElement
            sectionTitle="Registration"
            index={2}
            landingElementId="registration"
            img="/img/pioneer-trek-993733-tablet.png"
          >
            <Grid item xs={12} className={classes.landingGridContent}>
              <Typography variant="body1">
                All participants will need to complete the registration and
                permission form.
              </Typography>
              <Link
                component={RouterLink}
                to={Routes.REGISTRATION_WITH_EVENT(event.key)}
              >
                {event.title} Registration
              </Link>
            </Grid>
          </LandingElement>
          {authUser && (
            <LandingElement
              sectionTitle="Leaders"
              index={8}
              landingElementId="leaders"
            >
              <Typography variant="body1">
                Important links for leaders:
              </Typography>
              <Link
                component={RouterLink}
                to={Routes.LEADERS_WITH_EVENT(event.key)}
              >
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
