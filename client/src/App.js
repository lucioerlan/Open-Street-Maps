import React from "react";
import { Route, Switch } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Header from "./components/Header";
import RightDrawer from "./components/RightDrawer";
import ButtonBase from "@material-ui/core/ButtonBase";
import NotFound from "./pages/NotFoundPage";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import defaultTheme, { customTheme } from "./theme";
import DashboardPage from "./pages/DashboardPage";
import Tooltip from "@material-ui/core/Tooltip";
import { Form, FormField } from "semantic-ui-react";
import "./components/css/loginstyle.css";
import EcorpLogo from './components/img/ecorp_logo.png'



const Home = () => ({
  container: {
    margin: "80px 20px 20px 15px",
    paddingLeft: defaultTheme.drawer.width,
    [defaultTheme.breakpoints.down("sm")]: {
      paddingLeft: 0
    }
    // width
  },
  containerFull: {
    paddingLeft: defaultTheme.drawer.miniWidth,
    [defaultTheme.breakpoints.down("sm")]: {
      paddingLeft: 0
    }
  },
  settingBtn: {
    top: 500,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    color: "white",
    width: 48,
    right: 0,
    height: 48,
    opacity: 0.9,
    padding: 0,
    zIndex: 999,
    position: "fixed",
    minWidth: 48,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  }
});

class App extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    localStorage.setItem('@welcome-app/username', username);
    window.location.reload();
  }

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
    this.setState({
      rightDrawerOpen: !this.state.rightDrawerOpen
    });
  }

  handleChangeTheme(colorOption) {
    const theme = customTheme({
      palette: colorOption
    });
    this.setState({
      theme
    });
  }

  render() {


    const { classes } = this.props;
    const { rightDrawerOpen, theme } = this.state;

    const username = localStorage.getItem('@welcome-app/username');

    if (username !== null) {
      return (

        <div>
          <MuiThemeProvider theme={theme}>
            <Header
              handleChangeNavDrawer={this.handleChangeNavDrawer}
            />
            <Tooltip title={"Change Theme"}>
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

    return (

      <React.Fragment>

        <div id="body">
          <Form className="style-form" onSubmit={this.handleSubmit}>
            <img id="ecorp_logo" width="100" height="100" src={EcorpLogo} alt="Logo"></img>
            <FormField>
              <input name="username" type="email" placeholder="youemail@email.com" />
            </FormField>
            <input type="submit" value="Log in" />
          </Form>
        </div>

      </React.Fragment>


    );
  }
}


export default withStyles(Home)(App);
