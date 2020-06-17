import React, { Component } from "react";
import escapeRegExp from "escape-string-regexp";
import TextField from "@material-ui/core/TextField";



class SideDrawer extends Component {
  state = {
    query: "",
    filteredSteine: []
  };

  updateQuery = query => {
    this.setState({ query });
  };

  render() {
    let showingSteine;
    if (this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), "i");
      showingSteine = this.props.steine.filter(
        stein =>
          match.test(stein.tracking) || match.test(stein.tracking)
      );
    } else {
      showingSteine = this.props.steine;
    }

    return (
      <nav className="side-drawer fixed-left">

        <TextField

          required={true}

          placeholder="Search Tracking"
          style={{ margin: 10 }}
          type="text"
          color="primary"
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}

          value={this.state.query}
          onChange={e => this.updateQuery(e.target.value)} />



        {showingSteine.map(stein => {
          return (

            <p id="barra_mapa"
              key={stein.id}

              className="list-group-item list-group-item-light"
              onClick={() => this.props.onSelectStein(stein.id)}
            >
              id: <span color="primary" className="font-weight-bold">   {stein.id}  </span>{" "}<br />
              tracking: <span color="primary" className="font-weight-bold">   {stein.tracking}  </span>{" "}<br />
              plate: <span className="font-weight-bold"> {stein.plate}   </span>{" "}


            </p>
          );
        })}

      </nav>
    );
  }
}

export default SideDrawer;
