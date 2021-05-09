import React, { useState } from 'react';
import {
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  makeStyles
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
  input: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 20,
      backgroundColor: theme.palette.background.dark
    },
    position: 'fixed',
    width: '400px',
    zIndex: 20000,
    margin: '1% 1%',
    borderRadius: 20,
    boxShadow:
      '0px 3px 5px -1px  rgba(0, 0, 0, 0.14), 0px 1px 9px 0px rgba(0, 0, 0, 0.12)',
    '@media (hover: none)': {
      width: '300px'
    }
  },
  label: {
    '&::placeholder': {
      fontSize: '1em'
    }
  },
  autoComplete: {
    paddingLeft: 0
  }
}));

const SideDrawer = ({ steine, onSelectStein, loading }) => {
  const classes = useStyles();
  const [, setQuery] = useState({});

  const updateQuery = (query) => {
    setQuery({ query });
  };

  const showingSteine = steine.filter((stein) => stein.tracking);

  return (
    <Autocomplete
      className={classes.autoComplete}
      options={showingSteine.map((option) => option.tracking)}
      onChange={(event, value) => onSelectStein(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search Tracking"
          className={classes.input}
          type="text"
          color="primary"
          margin="normal"
          variant="outlined"
          onChange={(e) => updateQuery(e.target.value)}
          InputProps={{
            ...params.InputProps,
            classes: { input: classes.label },
            endAdornment: (
              <InputAdornment>
                {loading ? <CircularProgress size={20} /> : null}
                <IconButton
                  variant="raised"
                  style={{ cursor: 'text', marginRight: -50 }}
                >
                  <SearchIcon color="primary" />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      )}
    />
  );
};

export default SideDrawer;
