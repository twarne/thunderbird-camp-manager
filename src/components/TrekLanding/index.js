import React from "react";

import {
  Box,
  Grid,
  Link,
  withStyles,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Hidden,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { genericHashLink } from "react-router-hash-link";
import Countdown from "react-countdown";
import YouTube from "react-youtube";
import styles from "../Common";
import NavHeader from "../NavHeader";
import NavMenu from "../NavMenu";
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

const LandingElement = withStyles(styles)((props) => {
  // img property is used by styles
  // eslint-disable-next-line
  const {
    sectionTitle,
    index,
    landingElementId,
    img,
    titleImg,
    classes,
    hideTitle,
  } = props;

  const theme = useTheme();
  const isFullSize = useMediaQuery(theme.breakpoints.up("md"));
  const titleImgWidth = isFullSize ? 90 : 100;
  const titleVariant = isFullSize ? "h2" : "h3";

  return (
    <React.Fragment>
      <Grid
        container
        item
        id={landingElementId}
        className={classes.landingGridSection}
        spacing={2}
      >
        {index % 2 === 0 ? (
          <Hidden mdUp>
            <Grid container item xs={12}>
              <Grid item xs={12}>
                <Typography variant={titleVariant}>{sectionTitle}</Typography>
              </Grid>
              {titleImg && (
                <Grid item xs={12}>
                  <Img src={titleImg} width={`${titleImgWidth}%`} />
                </Grid>
              )}
            </Grid>
          </Hidden>
        ) : (
          <Grid container item xs={12} md={6} alignItems="flex-start">
            {!hideTitle && (
              <Grid item xs={12}>
                <Typography
                  variant={titleVariant}
                  align={isFullSize ? "right" : "left"}
                >
                  {sectionTitle}
                </Typography>
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
          {props.children && (
            <Paper variant="outlined" className={classes.paper}>
              {props.children}
            </Paper>
          )}
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

const TrekLanding = (props) => {
  const { classes } = props;

  const MaterialHashLink = (props) => genericHashLink(props, Link);

  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };

  const links = [
    { link: "Home", landingElementId: "home" },
    { link: "Theme", landingElementId: "theme" },
    { link: "Goals", landingElementId: "goals" },
    { link: "Dates to Remember", landingElementId: "dates_to_remember" },
    {
      link: "Spiritual Preparation",
      landingElementId: "spiritual_preparation",
    },
    { link: "Physical Preparation", landingElementId: "physical_preparation" },
    { link: "Registration", landingElementId: "registration" },
    { link: "What to Wear", landingElementId: "what_to_wear" },
    { link: "What to Pack", landingElementId: "what_to_pack" },
    { link: "Trek Staff", landingElementId: "trek_staff" },
  ];

  const videoResources = [
    {
      title: "Pioneer Journeys - More Than a Trek",
      videoSrc:
        "//players.brightcove.net/1241706627001/default_default/index.html?videoId=6007250944001",
    },
    { title: "Pioneers: Followers of Jesus Christ", videoId: "J2rV0ey6Op0" },
    {
      title: "Mormon Pioneers - Act of Courage - LDS Church History",
      videoId: "WCFLQSy6alE",
    },
  ];

  const videoOptions = {
    width: "90%",
  };

  const importantDates = [
    {
      title: "Trek '22 Devotional",
      date: "February 27, 2022",
      time: "7pm",
      location: "Stake Center",
      invited:
        "All youth 14+ in 2022, YM/YW Leaders, Parents, Trek Committee Members, Ma's & Pa's",
    },
    {
      title: "Trek '22 Prep Hike #1",
      date: "March 5, 2022",
      time: "8am",
      location:
        "Thunderbird Park - Meet at Trailhead in parking lot on Pinnacle Peak & 55th Ave",
      invited: "All youth 14+ in 2022, Stake YM/YW Leaders, Ma's and Pa's",
    },
    {
      title: "Trek '22 Ward Coordinator Meeting",
      date: "March 6, 2022",
      time: "5:30-6:30 PM",
      location: "Stake Center",
      invited: "Trek Coordinators from each ward",
    },
    {
      title: "Trek '22 Committee Meeting",
      date: "March 6, 2020",
      time: "7pm",
      location: "Stake Center",
      invited: "All Trek '22 Committee Members",
    },
    {
      title: "Trek '22 Ma/Pa Orientation Meeting",
      date: "March 10, 2022",
      time: "7:00-8:30 PM",
      location: "Stake Center",
      invited: "All Ma's & Pa's",
    },
    {
      title: "Trek '22 Ma/Pa Training",
      date: "May 6-May 7, 2022",
      time: "Overnight",
      location: "TBD",
      invited: "All Ma's & Pa's, Related Committee Members",
    },
    {
      title: "Trek '22 Prep Hike #2",
      date: "May 11, 2022",
      time: "5:30 PM",
      location:
        "Thunderbird Park - Meet at Trailhead in parking lot on Pinnacle Peak & 55th Ave",
      invited: "All youth 14+ in 2022, Stake YM/YW Leaders, Ma's and Pa's",
    },
    {
      title: "Trek '22 Committee Meeting",
      date: "May 24, 2022",
      time: "7:00 PM",
      location: "Stake Center",
      invited: "All Trek '22 Committee Members",
    },
    {
      title: "Trek '22 Gear Shake Down/Drop Off",
      date: "June 4, 2022",
      time: "10:00 AM - 2:00 PM (Wards will be assigned a specific window of time)",
      location: "Stake Center",
      invited: "All youth attending Trek and Ma's & Pa's",
    },
    {
      title: "Trek '22",
      date: "June 8-June 11, 2022",
    },
    {
      title: "Trek '22 Recap Devotional",
      date: "August 14, 2022",
      time: "7:00 PM",
      location: "Stake Center",
      invited:
        "All youth 14+ in 2022, YM/YW Leaders, Parents, Trek Committee Members, Ma's & Pa's",
    },
  ];

  const packingList = [
    {
      primary: "5-Gallon Bucket with lid",
      secondary:
        "LABELED with name and ward, ALL gear must fit in bucket (except sleeping bag), bucket will be used as a STOOL and it also waterproofs your gear.",
    },
    { primary: "Flashlight w/batteries" },
    { primary: "Warm sleeping bag in a heavy-duty trash bag" },
    { primary: "Heavy-duty trash bag for dirty or wet clothes" },
    {
      primary: "Mess kit",
      secondary: "(plate, bowl, spoon, and fork) labeled with your name",
    },
    { primary: "Mesh bag to hold mess kit" },
    {
      primary: "Tin cup with handle",
      secondary: "Must be carried on you hands free",
    },
    {
      primary: "2 Carabiners",
      secondary: "1 to attach tin cup to belt loop or apron and 1 for mesh bag",
    },
    {
      primary: "Personal hygiene Items",
      sublist: [
        { primary: "Small hand towel/or pre-moistened wipes for face & hands" },
        { primary: "travel size shampoo, conditioner, and soap" },
        { primary: "toothbrush, toothpaste, and dental floss" },
        { primary: "deodorant" },
        { primary: "lotion" },
        { primary: "chap-stick" },
        { primary: "comb or brush" },
        { primary: "hand sanitizer and tissues" },
        {
          primary: "contact lens solution and case",
          secondary: "if you wear contact lenses",
        },
        { primary: "feminine hygiene products (young women)" },
      ],
    },
    {
      primary: "Prescription medications",
      secondary:
        "labeled in original pack (to be checked in with medical staff).",
    },
    { primary: "Insect repellent" },
    { primary: "Sunblock" },
    { primary: "Sunglasses" },
    {
      primary: "Personal first aid kit",
      secondary: "Band-Aids & Mole Skin for foot care",
    },
    {
      primary: "Pillowcase",
      secondary: "use to make a pillow out of your jacket",
    },
    { primary: "Old set of scriptures in a Ziploc bag" },
    {
      primary: "Sturdy work gloves",
      secondary: "for pulling the handcart - these are a MUST",
    },
    {
      primary: "Clothing",
      sublist: [
        {
          primary: "2 pairs of tennis shoes or hiking boots",
          secondary: "MUST BE broken in",
        },
        { primary: "4 pairs of sturdy socks + 1 thick pair to sleep in" },
        { primary: "4 undergarments" },
        { primary: "rain poncho" },
        { primary: "warm jacket" },
        { primary: "warm pajamas" },
        {
          primary: "1 pair of jeans",
          secondary:
            "Everyone will need one pair of jeans that you won't mind getting dirty or damaged. These will not be used to trek in, they will be used in a specific activity, and will be collected at the Gear Shake Down. They will not be kept in your bucket.",
        },
      ],
    },
    {
      primary: "Young Women",
      sublist: [
        { primary: "1-2 bonnets" },
        { primary: "2 mid-calf length skirts and 2 blouses or 2 dresses" },
        { primary: "1-2 aprons" },
      ],
    },
    {
      primary: "Young Men",
      sublist: [
        {
          primary: "2 pairs of light-colored cotton pants",
          secondary:
            "NO camouflage, athletic pants or jeans* (see explanation above)",
        },
        {
          primary: "2 long-sleeved, button up, light colored shirts",
          secondary: "Preferably cotton; NO t-shirts",
        },
        {
          primary: "Western-style hat",
          secondary: "No baseball caps, beanies or army hats",
        },
        { primary: "Suspenders or vest", secondary: "Optional" },
      ],
    },
    { primary: "No jewelry, makeup or electronics of any kind" },
  ];

  const trekStaff = [
    {
      position: "Trek Committee Chairs",
      people: ["Leigh & Becky Toole (STV)"],
    },
    {
      position: "Trail Boss",
      people: ["Larry McCrery (MR)"],
    },
    {
      position: "Company Captains",
      people: [
        "President Jackson (TH)",
        "President Baird (STV)",
        "Marcus Allen (STV)",
      ],
    },
    {
      position: "Equipment Chair",
      people: ["Wade Niver (STV)"],
    },
    {
      position: "Food Committee Chairs",
      people: ["Coming Soon"],
    },
    {
      position: "Ward Trek Coordinators",
      people: [
        "Arrowhead Ranch - Courtney Reynolds",
        "Mountain Ridge - Jordan Nelson",
        "Sierra Verde - Phil Collett",
        "Sonoran Mountain - Daron Kettler",
        "Stetson Valley - Cindy Rowe",
        "Thunderbird Hills - Bill & Carolee Schlofman",
      ],
    },
  ];

  const theme = useTheme();
  const showLinks = useMediaQuery(theme.breakpoints.up("md"));
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <React.Fragment>
      <NavHeader title={"T'22"} menuOnly={!showLinks}>
        {showLinks ? (
          links.map(({ link, landingElementId }, index) => (
            <Grid item xs key={landingElementId}>
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
          ))
        ) : (
          <Grid item xs={1}>
            <NavMenu links={links} />
          </Grid>
        )}
      </NavHeader>

      <Grid container spacing={4} className={classes.landingGridRoot}>
        <LandingElement
          sectionTitle="Trek 2022"
          hideTitle
          index={1}
          landingElementId="home"
          titleImg="/img/trek_logo_new.png"
        >
          <Grid container item xs={12} className={classes.landingGridContent}>
            <Grid item xs={12}>
              <Typography variant="h3" paragraph>
                Welcome to Thunderbird Park Stake T'22 (Trek)!
              </Typography>
              <Typography variant="body1" paragraph>
                We're SO excited to take this journey with you! We're confident
                T'22 will be an amazing experience for all involved.
              </Typography>
              <Typography variant="h4" align="center" paragraph>
                June 8-11, 2022
              </Typography>
            </Grid>
            <Hidden smDown>
              <Grid item xs={12}>
                <Countdown date={"June 8, 2022"} renderer={daysUntilTrek} />
              </Grid>
            </Hidden>
            <Grid item xs={12}>
              <Typography variant="body1" paragraph>
                This site contains much of the information you need to know and
                do to prepare for trek. As you prepare with your class or
                quorum, with your family, and indvidiually, please to and act
                upon promptings you will receive. As you seek personal
                revelation, the Spirit will guide you in your preparation to get
                the most out of this experience.
              </Typography>
            </Grid>
          </Grid>
        </LandingElement>
        <LandingElement
          sectionTitle="Theme"
          index={2}
          landingElementId="theme"
          titleImg="/img/trek-22-theme-quote.png"
        >
          <Grid item xs={12} className={classes.landingGridContent}>
            <Typography variant="body1" paragraph>
              We look forward to the unique opportunity of walking for a brief
              time in the footsteps of our pioneer ancestors, reflecting on
              their legacy of faith, and pondering their endless sacrifices. Our
              hope is that all participants of T'22 will gain a clearer
              understanding of how to apply the eternal principles exemplified
              by these extraordinary pioneers in our own lives, as we continue
              on our journey to become true disciples of Jesus Christ.
            </Typography>
            <Typography variant="subtitle1">This is our Place...</Typography>
            <Typography variant="subtitle1">Now is OUR Time!</Typography>
          </Grid>
        </LandingElement>
        <LandingElement
          sectionTitle="Goals"
          index={3}
          landingElementId="goals"
          titleImg={
            isSmDown
              ? undefined
              : "/img/handcart-pioneers-sam-lawlor-275615-tablet.jpg"
          }
        >
          <Grid item xs={12} className={classes.landingGridContent}>
            <Typography variant="body1" paragraph>
              Cultivate an increased ability, and greater desire to...
            </Typography>
            <Box fontWeight={500}>TRUST</Box>{" "}
            <Typography variant="body1" paragraph className={classes.subGoal}>
              in the Lord with all our heart.
            </Typography>
            <Box fontWeight={500}>STAND</Box>{" "}
            <Typography variant="body1" paragraph className={classes.subGoal}>
              firm in our testimony of the Savior.
            </Typography>
            <Box fontWeight={500}>SERVE & RESCUE</Box>{" "}
            <Typography variant="body1" paragraph className={classes.subGoal}>
              all individuals the Lord places within our reach.
            </Typography>
            <Box fontWeight={500}>PRESS FORWARD</Box>{" "}
            <Typography variant="body1" paragraph className={classes.subGoal}>
              with steadfast faith in Christ.
            </Typography>
          </Grid>
        </LandingElement>
        <LandingElement
          sectionTitle="Dates to Remember"
          index={4}
          landingElementId="dates_to_remember"
          img="/img/youth-pioneer-handcart-trek-meadow-342033-tablet-mod.png"
        >
          <Grid item xs={12} className={classes.landingGridContent}>
            <List className={classes.root}>
              {importantDates.map(
                ({ title, date, time, location, invited }, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={title}
                      secondary={
                        <React.Fragment>
                          <span className={classes.dateTimePlace}>
                            {date} {time && `@ ${time}`}{" "}
                            {location && `(${location})`}
                          </span>
                          {invited && (
                            <React.Fragment>
                              <br />
                              <span className={classes.dateInvited}>
                                {invited}
                              </span>
                            </React.Fragment>
                          )}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                )
              )}
            </List>
          </Grid>
        </LandingElement>
        <LandingElement
          sectionTitle="Spiritual Preparation"
          index={5}
          landingElementId="spiritual_preparation"
        >
          <Grid item xs={12}>
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
              As you prepare for trek, we encourage you to seek opportunities to
              research your ancestors. Ideas might include: looking for a story
              from your family hihstory you might share on trek; spending time
              on <Link href="https://familysearch.org">Family Search</Link>{" "}
              indexing; or adding to your family history records. We strongly
              urge you to take the opportunity to do temple work for one or more
              of your ancestors prior to trek.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" paragraph>
              Video Resources
            </Typography>
          </Grid>
          {videoResources.map(({ title, videoId, videoSrc }, index) => (
            <Grid key={index} item xs={12}>
              <Typography variant="caption">{title}</Typography>
              {videoId ? (
                <YouTube videoId={videoId} opts={videoOptions} />
              ) : (
                <iframe
                  src={videoSrc}
                  width={isSmDown ? "306" : "560"}
                  height="340"
                  allowFullScreen
                  frameBorder={0}
                  title={index}
                />
              )}
            </Grid>
          ))}
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
              camping and other outdoor activities. Your trek experience will be
              enhanced through proper physical preparation. In particular, you
              should be physically fit enough to safely hike the distances
              involved. If you have any conditions that limit your physical
              abilities, please talk to your Bishop, Young Women's President, or
              Ward Trek Coordinator so that we can be sure that you are
              successful in your trek experience. You should be able to walk
              three miles on level ground in 60 minutes or less without undue
              stress. Take practice hikes and prepare to walk uphill. Many of us
              would benefit from improving our physical fitness before trek.
              Also, remember to join us on our T'22 Prep Hikes, March 5th & May
              5th!
            </Typography>
          </Grid>
        </LandingElement>
        <LandingElement
          sectionTitle="Registration"
          index={7}
          landingElementId="registration"
          img="/img/pioneer-trek-993733-tablet.png"
        >
          <Grid item xs={12} className={classes.landingGridContent}>
            <Typography variant="body1">
              All participants will need to complete the registration and
              permission form.
            </Typography>
            <Typography variant="body1">
              <Link href="https://forms.gle/RyHfVM5RUEKapFkt5">
                Register for T'22!
              </Link>
            </Typography>
          </Grid>
        </LandingElement>
        <LandingElement
          sectionTitle="What to Wear"
          index={8}
          landingElementId="what_to_wear"
          img="/img/youth-handcart-trek-pioneer-reenactment-342091-tablet.png"
        >
          <Grid item xs={12} className={classes.landingGridContent}>
            <Typography variant="body1" paragraph>
              All participants are expected to wear pioneer-style clothing.
              Doing so will help you immerse yourself in the trek experience.
              Please don't spend excessive time or money making or buying
              pioneer clothes. Many items can be found in existing wardrobes or
              at secondhand stores (Goodwill and Deseret Industries are great
              options)!
            </Typography>
            <Typography variant="body1" paragraph>
              Ideally, young women’s blouses should be lightweight and
              long-sleeved, and their skirts should reach the midcalf, with
              bloomers or shorts underneath to prevent chafing. Lightweight,
              long-sleeved shirts and comfortable, loose-fitting pants are
              recommended for the young men. Cotton fabrics are generally
              recommended.
            </Typography>
            <Typography variant="body1" paragraph>
              To help reduce the likelihood of blisters, you should wear (1)
              walking or hiking shoes that are broken in and (2) two pairs of
              socks at a time. Ideally the inner sock should be thin and
              synthetic, while the outer sock is wool or a wool blend. Socks
              that wick away moisture are the most helpful. Socks that are a
              wool-synthetic blend can also help reduce the potential for
              blisters.
            </Typography>
            <Typography variant="body1" paragraph>
              To help protect from sun and insects, participants are encouraged
              to wear long sleeves, wide-brimmed hats or bonnets, and sunglasses
              (no baseball caps, beanies, or army hats).
            </Typography>
          </Grid>
        </LandingElement>
        <LandingElement
          sectionTitle="What to Pack"
          index={9}
          landingElementId="what_to_pack"
          img="/img/youth_simulation_pioneer_handcart_trek.png"
        >
          <Grid item xs={12} className={classes.landingGridContent}>
            <Typography variant="body1">
              Plan to pack the following items (<Link href="/trek_22_packing_list.pdf">Download list</Link>):
            </Typography>
            <List className={classes.packingList}>
              {packingList.map(({ primary, secondary, sublist }, index) => (
                <React.Fragment key={index}>
                  <ListItem dense>
                    <ListItemText
                      primary={primary}
                      secondary={secondary}
                      classes={{ primary: "packingListPrimary" }}
                    />
                  </ListItem>
                  {sublist && (
                    <List className={classes.packingSubList} dense>
                      {sublist.map(({ primary, secondary }, index) => (
                        <ListItem key={index}>
                          <ListItemText
                            primary={primary}
                            secondary={secondary}
                            inset
                          />
                        </ListItem>
                      ))}
                    </List>
                  )}
                </React.Fragment>
              ))}
            </List>
          </Grid>
        </LandingElement>
        <LandingElement
          sectionTitle="Trek Staff"
          index={10}
          landingElementId="trek_staff"
          img="/img/youth_pioneer_trek_handcart_reenactment.png"
        >
          <Grid item xs={12} className={classes.landingGridContent}>
            {trekStaff.map(({ position, people }, index) => (
              <React.Fragment key={index}>
                <Typography className={classes.staffPosition}>
                  {position}
                </Typography>
                {people.map((name, index) => (
                  <Typography className={classes.staffPeople} key={index}>
                    {name}
                  </Typography>
                ))}
              </React.Fragment>
            ))}
          </Grid>
        </LandingElement>
        <LandingElement
          sectionTitle=""
          index={20}
          landingElementId="end"
          img="/img/handcarts-lined-up-325609-tablet-mod.png"
          titleImg={
            isSmDown
              ? "/img/handcarts-lined-up-325609-tablet-mod.png"
              : undefined
          }
        ></LandingElement>
      </Grid>
    </React.Fragment>
  );
};

export default withFirebase(withStyles(styles)(TrekLanding));
