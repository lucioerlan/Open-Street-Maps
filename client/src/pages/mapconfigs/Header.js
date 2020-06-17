import React from "react";
import Tooltip from "@material-ui/core/Tooltip";


const Header = props => {
  return (
    <nav className="navbar fixed-top ">
      <Tooltip title={"Search tracking"}>
        <button
          className="bg-secondary"
          onClick={props.ClickHandler}
          style={{ cursor: "pointer" }}
        >
          <i className="fas fa-map fa-2x text-light" />
        </button>
      </Tooltip>

      <div />

    </nav>
  );
};

export default Header;
