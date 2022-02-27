import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: {
        main: "#388E3C",
      },
      secondary: {
        main: "#9E9E9E",
      },
    },
    typography: {
      body1: {
        fontSize: "1.2rem",
      },
      body2: {
        fontSize: "1rem",
        lineHeight: "1.1em",
      },
      button: {
        lineHeight: "1em",
      },
      subtitle1: {
        fontFamily: "Caveat",
        fontSize: "4rem",
        alignContent: "center",
      },
      subtitle2: {
        fontSize: "1rem",
        lineHeight: "1.2em",
        fontStyle: "italic",
        fontWeight: "400"
      },
      h3: {
        alignContent: "center"
      }
    },
  })
);

const styles = (theme) => ({
  appBar: {
    position: "fixed",
    [theme.breakpoints.down("sm")]: {
      width: "auto",
    },
    backgroundColor: "#1FA84D",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(4))]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
    [theme.breakpoints.down("sm")]: {
      width: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(6))]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
    backgroundColor: "rgba(250, 250, 250, .8)",
  },
  stepper: {
    padding: `${theme.spacing(3)}px 0 ${theme.spacing(5)}px`,
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  canvas: {
    border: 2,
    borderStyle: "inset",
  },
  grow: {
    flexGrow: 1,
  },
  fbLogin: {
    ...theme.typography.button,
    backgroundColor: "#4267B2",
    color: "#ffffff",
  },
  fbLogo: {
    width: theme.spacing(5),
    height: "auto",
  },
  fbText: {
    verticalAlign: "center",
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  landingGridRoot: {
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(4),
    },
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(1),
    },
    fontSize: "1.5em",
    maxWidth: "1280px",
    margin: "auto",
  },
  landingGridSection: {
    [theme.breakpoints.up("sm")]: {
      backgroundImage: (props) => `url(${props.img})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "100%",
    },
    padding: `${theme.spacing(4)}px 0px ${theme.spacing(4)}px 0px`,
    minHeight: (props) => (props.img ? "925px" : "500px"),
  },
  landingGridContent: {
    padding: theme.spacing(1),
  },
  navHeaderLink: {
    color: "white",
    cursor: "pointer",
  },
  packingListPrimary: {
    color: "blue",
  },
  staffPosition: {
    fontWeight: "bold",
  },
  staffPeople: {
    paddingLeft: "1rem",
  },
  subGoal: {
    paddingTop: ".5rem",
    paddingLeft: "1.5rem",
  },
  subGoal2: {
    paddingTop: ".5rem",
    paddingLeft: "1.5rem",
    paddingBottom: "1.5rem"
  },
  regDetails: {
    paddingTop: ".5rem"
  },
  regFooter: {
    paddingTop: ".5rem",
    alignContent: "center",
    fontWeight: "bold"
  },
  dateTimePlace: {
    padding: theme.spacing(2),
  },
  dateInvited: {
    padding: theme.spacing(2),
  },
});

export default styles;

export { theme };
