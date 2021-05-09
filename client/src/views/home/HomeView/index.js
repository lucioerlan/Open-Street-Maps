import React from 'react';
import { makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Home from './Home';

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100%'
  }
}));

const HomeView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Home">
      <Home />
    </Page>
  );
};

export default HomeView;
