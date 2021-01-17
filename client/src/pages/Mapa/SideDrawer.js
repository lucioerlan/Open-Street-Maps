import React, { Component } from 'react';
import { Box, TextField, Typography } from '@material-ui/core';
import escapeRegExp from 'escape-string-regexp';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

class SideDrawer extends Component {
  state = {
    query: '',
  };

  updateQuery = query => {
    this.setState({ query });
  };

  render() {
    const { query } = this.state;
    const { steine, onSelectStein } = this.props;
    let showingSteine;
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      showingSteine = steine.filter(
        stein => match.test(stein.tracking) || match.test(stein.tracking)
      );
    } else {
      showingSteine = steine;
    }

    return (
      <div>
        <TextField
          required
          placeholder="Search tracking"
          style={{ margin: 10 }}
          type="text"
          color="primary"
          margin="normal"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton variant="raised" style={{ cursor: 'text' }}>
                  <SearchIcon fontSize="small" color="primary" />
                </IconButton>
              </InputAdornment>
            ),
          }}
          value={query}
          onChange={e => this.updateQuery(e.target.value)}
        />

        {showingSteine.map(stein => {
          return (
            <Typography
              aria-hidden="true"
              key={stein.id}
              className="sideDrawer"
              onClick={() => onSelectStein(stein.id)}
            >
              id:
              <Box component="span" color="primary">
                {stein.id}
              </Box>
              <br />
              tracking:
              <Box component="span" color="primary">
                {stein.tracking}
              </Box>
              <br />
              plate: <Box component="span">{stein.plate}</Box>
            </Typography>
          );
        })}
      </div>
    );
  }
}

export default SideDrawer;
