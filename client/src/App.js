import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { create } from 'jss';
import rtl from 'jss-rtl';
import {
  createStyles,
  jssPreset,
  makeStyles,
  StylesProvider,
  ThemeProvider
} from '@material-ui/core';
import { createTheme } from 'src/theme';
import routes from 'src/routes';
import useSettings from 'src/hooks/useSettings';

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const useStyles = makeStyles(() => createStyles({
  '@global': {
    '*': {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0
    },
    html: {
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
      height: '100%',
      width: '100%'
    },
    body: {
      height: '100%',
      width: '100%'
    },
    '#root': {
      height: '100%',
      width: '100%'
    }
  }
}));

const App = () => {
  useStyles();
  const { settings } = useSettings();
  const routing = useRoutes(routes());

  return (
    <ThemeProvider theme={createTheme(settings)}>
      <StylesProvider jss={jss}>{routing}</StylesProvider>
    </ThemeProvider>
  );
};

export default App;
