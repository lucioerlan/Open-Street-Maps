import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import LocalShipping from "@material-ui/icons/LocalShipping";

export default () => {
  return (



    <Tooltip title={"Icon highlighter Default"}>
      <IconButton>
        <LocalShipping color="primary" style={{ fontSize: "30px" }} alt='Icon highlighter Default' />
      </IconButton>
    </Tooltip>

  );
};
