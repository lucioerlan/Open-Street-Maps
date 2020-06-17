import React from "react";
import classNames from "classnames";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Refresh from "@material-ui/icons/Refresh";
import { Toolbar } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from "@material-ui/core/Tooltip";
import DarkModeToggle from './DarkModeToggle';


const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    // marginLeft: theme.drawer.width,
    width: `calc(100% - ${theme.drawer.width}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },


  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
});

class Header extends React.Component {

  handleLogout = () => {
    localStorage.removeItem('@welcome-app/username');
    window.location.reload();
  }
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      anchorEl: null,
      mobileMoreAnchorEl: null
    };
  }

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };


  handleRefresh = () => {
    this.setState(window.location.reload());
  };



  componentDidMount() {


  };

  render() {
    const username = localStorage.getItem('@welcome-app/username');
    const { classes, navDrawerOpen } = this.props;

    const { anchorEl } = this.state;
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = event => {
      this.setState({ anchorEl: event.currentTarget });
    };

    const handleMenuClose = () => {
      this.setState({ anchorEl: null });
      this.handleMobileMenuClose();
    };


    return (
      <div>
        <AppBar
          className={classNames(classes.appBar, {
            [classes.appBarShift]: navDrawerOpen
          })}>

          <Toolbar>


            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>


              <DarkModeToggle

                className={classes.sectionDesktop} />


              <Tooltip title={"Update Page"}>
                <IconButton
                  className={classes.sectionDesktop}
                  color="inherit"
                  onClick={this.handleRefresh}>
                  <Refresh />
                </IconButton>
              </Tooltip>


              <Tooltip title={"Exit"}>
                <IconButton
                  color="inherit"
                  aria-owns={isMenuOpen ? "material-appbar" : null}
                  onClick={handleProfileMenuOpen}>
                  <AccountCircle />
                </IconButton>
              </Tooltip>
              <Menu
                id="menu_Exit"
                keepMounted
                onClose={handleMenuClose} >
                <MenuItem id="username"  > {username}  </MenuItem>
                <MenuItem onClick={this.handleLogout} >Exit </MenuItem>

              </Menu>


            </div>
            <div className={classes.sectionMobile}>
              <DarkModeToggle
                className={classes.sectionMobile} />

              <Tooltip title={"Update Page"}>
                <IconButton
                  className={classes.sectionMobile}
                  color="inherit"
                  onClick={this.handleRefresh}>
                  <Refresh />
                </IconButton>
              </Tooltip>

              <Tooltip title={"Exit"}>
                <IconButton
                  className={classes.sectionMobile}
                  color="inherit"
                  aria-owns={isMenuOpen ? "material-appbar" : null}
                  onClick={handleProfileMenuOpen}>
                  <AccountCircle />
                </IconButton>
              </Tooltip>


              <Menu
                id="menu_Exit"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose} >
                <MenuItem id="username"> {username}  </MenuItem>
                <MenuItem onClick={this.handleLogout} >Exit </MenuItem>

              </Menu>

            </div>
          </Toolbar>
        </AppBar>

      </div>
    );
  }
}
export default withStyles(styles)(Header);
