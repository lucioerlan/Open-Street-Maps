import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Drawer, Fab, Tooltip } from '@material-ui/core';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import Settings from './Settings';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 280
  },
  root: {
    backgroundColor: theme.palette.white
  },
  list: {
    padding: theme.spacing(1, 3)
  },
  listItemText: {
    marginRight: theme.spacing(1)
  },
  lastActivity: {
    whiteSpace: 'nowrap'
  },
  fab: {
    position: 'fixed',
    bottom: 32,
    left: 32,
    zIndex: theme.zIndex.drawer - 100
  }
}));

const TemporaryDrawer = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Drawer
        anchor="right"
        classes={{ paper: classes.drawer }}
        elevation={1}
        onClose={handleClose}
        open={open}
        variant="temporary"
      >
        <div {...rest} className={clsx(classes.root, className)}>
          <Settings />
        </div>
      </Drawer>
      <span
        className={clsx(classes.fab, {
          [classes.shiftFab]: open
        })}
      >
        <Tooltip title="Settings" aria-label="Settings">
          <Fab color="primary" onClick={handleOpen}>
            <SettingsOutlinedIcon />
          </Fab>
        </Tooltip>
      </span>
    </>
  );
};

TemporaryDrawer.propTypes = {
  className: PropTypes.string
};

export default TemporaryDrawer;
