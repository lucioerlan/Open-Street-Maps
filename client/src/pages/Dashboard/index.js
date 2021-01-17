import React, { Component } from 'react';
import { ButtonBase, Drawer, Tooltip, withStyles } from '@material-ui/core';
import 'react-leaflet-fullscreen/dist/styles.css';
import io from 'socket.io-client';
import ModalAdd from '../Modal';
import SideDrawer from '../Mapa/SideDrawer';
import ShowMap from '../Mapa/ShowMap';
import './styles.css';
import api from '../../services/api';

const style = () => ({
  root: {
    display: 'flex',
  },
  BackdropRoot: {
    backgroundColor: 'transparent',
  },
  drawerPaper: {
    width: 240,
  },
  settingBtn: {
    top: 300,
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

class Dashboard extends Component {
  state = {
    sideDrawerOpen: false,
    steine: [],
    open: false,
  };

  constructor(props) {
    super(props);
    this.ClickHandler.bind(this);
    this.handleSelectStein.bind(this);
  }

  componentDidMount() {
    this.registerToSocket();
    this.fetchData();
  }

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleSelectStein = id => {
    this.setState({
      selectedStein: id,
    });
  };

  ClickHandler = () => {
    this.setState({ open: true });
    this.setState(prevState => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  registerToSocket = () => {
    const socket = io(process.env.REACT_APP_SOCKET_URL);

    socket.on('notification', () => {
      this.fetchData();
    });
  };

  async fetchData() {
    try {
      const { data } = await api.get('/tracking');

      this.setState({ steine: data.message });
    } catch (err) {
      // console.log('Erro search data', err);
    }
  }

  render() {
    const { classes } = this.props;
    const { open, steine, selectedStein } = this.state;

    const sideDrawer = (
      <SideDrawer steine={steine} onSelectStein={this.handleSelectStein} />
    );

    return (
      <div>
        <Tooltip title="Search tracking">
          <ButtonBase
            color="inherit"
            classes={{ root: classes.settingBtn }}
            onClick={this.ClickHandler}
          >
            <i className="fas fa-map fa-2x text-light" />
          </ButtonBase>
        </Tooltip>

        <Drawer
          variant="temporary"
          anchor="right"
          open={open}
          onClose={this.handleDrawerClose}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            BackdropProps: {
              classes: { root: classes.BackdropRoot },
            },
          }}
        >
          {sideDrawer}
        </Drawer>

        <ShowMap
          steine={steine}
          selectedStein={selectedStein}
          onSelectStein={this.handleSelectStein}
        />

        <ModalAdd color="secondary" buttonLabel="Add" />
      </div>
    );
  }
}

export default withStyles(style)(Dashboard);
