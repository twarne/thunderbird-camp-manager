const styles = theme => ({
  appBar: {
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      width: 'auto'
    }
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    [theme.breakpoints.down('sm')]: {
      width: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    }
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit
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
    width: theme.spacing.unit * 5,
    height: 'auto'
  },
  fbText: {
    verticalAlign: 'center'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
});

export default styles;
