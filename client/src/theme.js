import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {
  blue,
  grey,
  pink,
  red,
  deepOrange,
  orange,
  brown,
  teal,
  green,
  amber
} from "@material-ui/core/colors";

export const availableThemes = [
  {
    title: "Default",
    primary: blue,
    secondary: red
  },
  {
    title: "VerSummerão",
    primary: deepOrange,
    secondary: orange
  },
  {
    title: "Spring",
    primary: teal,
    secondary: green
  },
  {
    title: "Winter",
    primary: grey,
    secondary: amber
  },
  {
    title: "Autumn",
    primary: brown,
    secondary: pink
  },
  {
    title: "Party",
    primary: pink,
    secondary: blue
  }

];

const defaultTheme = {
  palette: {
    primary: {
      main: 'rgb(20, 53, 99)',
    },
    secondary: {
      main: '#AB003C',
    },
  },
  error: red,
  appBar: {
    height: 57,
    color: blue[900]
  },
  drawer: {
    width: 240,
    color: grey[900],
    backgroundColor: brown,
    miniWidth: 56
  },
  raisedButton: {
    primaryColor: blue[600]
  },
  typography: {
    useNextVariants: true
  }
};

const theme = createMuiTheme(defaultTheme);

export const customTheme = option => {
  return createMuiTheme({ ...defaultTheme, ...option });
};

export default theme;
