import React, { useEffect, useState } from 'react';
import { usePopupState, bindTrigger, bindMenu } from 'material-ui-popup-state/hooks';
import { IconButton, Menu, MenuItem, Link, withStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { withFirebase } from '../Firebase';
import { genericHashLink } from 'react-router-hash-link';
import styles from '../Common';

const NavMenu = props => {
  const { classes, links } = props;
  const [authUser, setAuthUser] = useState(null);
  const popupState = usePopupState({ variant: 'popover', popupId: 'navMenu' });

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

  const scrollWithOffset = el => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
  };

  const MaterialHashLink = props => genericHashLink(props, Link);

  return (
    <div>
      <IconButton aria-label="navigation" aria-controls="menu" aria-haspopup="true" {...bindTrigger(popupState)}>
        <MenuIcon />
      </IconButton>
      <Menu {...bindMenu(popupState)}>
        {links.map(
          ({ link, landingElementId, authOnly }, index) =>
            (!authOnly || authUser) && (
              <MenuItem key={index} onClick={popupState.close}>
                <MaterialHashLink
                  smooth
                  scroll={scrollWithOffset}
                  to={`#${landingElementId}`}
                  variant="button"
                  className={classes.navMenuLink}
                >
                  {link}
                </MaterialHashLink>
                
              </MenuItem>
            )
        )}
      </Menu>
    </div>
  );
};

export default withFirebase(withStyles(styles)(NavMenu));
