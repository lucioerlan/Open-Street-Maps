import React from 'react';
import { Link } from 'react-router-dom';
import { Box, IconButton, Tooltip, Typography } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import './styles.css';

const NotFoundPage = () => {
  return (
    <div className="notfound-content">
      <Link to="/">
        <Tooltip title="Back">
          <IconButton>
            <ArrowBack className="icon-back" />
          </IconButton>
        </Tooltip>
      </Link>

      <Box className="notfound">
        <Box className="notfound-404">
          <Typography variant="h3">Oops! Page not found</Typography>
          <Typography color="primary" variant="h1">
            <Box component="span">4</Box>
            <Box component="span">0</Box>
            <Box component="span">4</Box>
          </Typography>
        </Box>
        <Typography variant="h4">
          Sorry, the page you requested was not found
        </Typography>
      </Box>
    </div>
  );
};

export default NotFoundPage;
