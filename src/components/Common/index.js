const styles = theme => ({
  appBar: {
    position: 'fixed',
    [theme.breakpoints.down('sm')]: {
      width: 'auto'
    }
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(4))]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    [theme.breakpoints.down('sm')]: {
      width: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(6))]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  stepper: {
    padding: `${theme.spacing(3)}px 0 ${theme.spacing(5)}px`
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  },
  canvas: {
    border: 2,
    borderStyle: 'inset'
  },
  grow: {
    flexGrow: 1
  },
  fbLogin: {
    ...theme.typography.button,
    backgroundColor: '#4267B2',
    color: '#ffffff'
  },
  fbLogo: {
    width: theme.spacing(5),
    height: 'auto'
  },
  fbText: {
    verticalAlign: 'center'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  landingGridRoot: {
    padding: theme.spacing(4)
  },
  landingGridSection: {
    padding: `${theme.spacing(4)} 0 ${theme.spacing(4)} 0`
  },
  landingHeaderLink: {
    color: "white"
  }
});

export default styles;
