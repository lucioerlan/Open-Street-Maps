import React, { Component } from "react";
import Header from "./mapconfigs/Header";
import ShowMap from "./mapconfigs/ShowMap";
import SideDrawer from "./mapconfigs/SideDrawer";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-leaflet-fullscreen/dist/styles.css";
import ModalAdd from './modal/add';
import socketIOClient from "socket.io-client";


class App extends Component {
  state = {
    sideDrawerOpen: false,
    steine: []
  };

  constructor(props) {
    super(props);
    this.ClickHandler.bind(this);
    this.handleSelectStein.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(
      "http://localhost:5000/tracking"
    )
      .then(res => res.json())
      .then(steine => {
        const socket = socketIOClient(this.fetchData());
        socket.on(this.setState({ steine: steine }));
      })
      .catch(err => console.log("Erro search data", err));
  }

  ClickHandler = () => {
    this.setState(prevState => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  handleSelectStein = id => {
    console.log(`Selected stein id: ${id}`);
    this.setState({
      selectedStein: id
    });
  };

  render() {
    let sideDrawer;
    if (this.state.sideDrawerOpen) {
      sideDrawer = (
        <SideDrawer
          steine={this.state.steine}
          onSelectStein={this.handleSelectStein}
        />
      );
    }

    return (
      <div style={{ height: "100%" }}>

        <Header ClickHandler={this.ClickHandler} />
        {sideDrawer}

        <ShowMap
          steine={this.state.steine}
          selectedStein={this.state.selectedStein}
          onSelectStein={this.handleSelectStein}
        />
        <ModalAdd color="secondary" buttonLabel="Add" />

        


      </div>
    );
  }
}

export default App;
