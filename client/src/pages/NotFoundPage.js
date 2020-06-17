import React from "react";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Tooltip from "@material-ui/core/Tooltip";
 
const NotFoundPage = () => {
  return (
        
    <React.Fragment>
   <Link  to="/"  >
          <Tooltip title={"Come back"}>
             <IconButton color="secondary"   >
              <ArrowBack style={{ fontSize: 60, marginTop: 50 }} />
             </IconButton>
          </Tooltip>
        </Link>
        <div class="site">
	<div class="sketch">
		<div class="bee-sketch red"></div>
		<div class="bee-sketch blue"></div>
	</div>

<h1>404:
  
	<small>Page Not Found</small></h1>
</div>

    </React.Fragment>
  );
};

export default NotFoundPage;
