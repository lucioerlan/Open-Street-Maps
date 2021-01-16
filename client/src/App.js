import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ButtonBase, Tooltip, withStyles } from '@material-ui/core';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import RightDrawer from './components/RightDrawer';
import NotFound from './pages/NotFound';
import defaultTheme, { customTheme } from './themes';
import DashboardPage from './pages/Dashboard';

const style = () => ({
  container: {
    margin: '80px 20px 20px 15px',
    paddingLeft: defaultTheme.drawer.width,
    [defaultTheme.breakpoints.down('sm')]: {
      paddingLeft: 0,
    },
    // width
  },
  containerFull: {
    paddingLeft: defaultTheme.drawer.miniWidth,
    [defaultTheme.breakpoints.down('sm')]: {
      paddingLeft: 0,
    },
  },
  settingBtn: {
    top: 500,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    color: 'white',
    width: 48,
    right: 0,
    height: 48,
    opacity: 0.9,
    padding: 0,
    zIndex: 999,
    position: 'fixed',
    minWidth: 48,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: defaultTheme,
      rightDrawerOpen: false,
    };

    this.handleChangeRightDrawer = this.handleChangeRightDrawer.bind(this);
    this.handleChangeTheme = this.handleChangeTheme.bind(this);
  }

  handleChangeRightDrawer() {
    const { rightDrawerOpen } = this.state;
    this.setState({
      rightDrawerOpen: !rightDrawerOpen,
    });
  }

  handleChangeTheme(colorOption) {
    const theme = customTheme({
      palette: colorOption,
    });
    this.setState({
      theme,
    });
  }

  render() {
    const { classes } = this.props;
    const { rightDrawerOpen, theme } = this.state;

    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Tooltip title="Change Theme">
            <ButtonBase
              color="inherit"
              classes={{ root: classes.settingBtn }}
              onClick={this.handleChangeRightDrawer}
            >
              <i className="fa fa-cog fa-3x" />
            </ButtonBase>
          </Tooltip>

          <RightDrawer
            rightDrawerOpen={rightDrawerOpen}
            handleChangeRightDrawer={this.handleChangeRightDrawer}
            handleChangeTheme={this.handleChangeTheme}
          />

          <Switch>
            <Route exact path="/" component={DashboardPage} />
            <Route component={NotFound} />
          </Switch>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withStyles(style)(App);
