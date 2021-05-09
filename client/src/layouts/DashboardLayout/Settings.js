import React, { useState } from 'react';
import { capitalCase } from 'change-case';
import {
  Box,
  Button,
  Container,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import useSettings from 'src/hooks/useSettings';
import { THEMES } from 'src/constants';

const useStyles = makeStyles(() => ({
  root: {
    padding: '5%',
    margin: 'auto',
    marginTop: 10
  }
}));

const Settings = () => {
  const classes = useStyles();
  const { settings, saveSettings } = useSettings();
  const [, setOpen] = useState(false);
  const [values, setValues] = useState({
    direction: settings.direction,
    responsiveFontSizes: settings.responsiveFontSizes,
    theme: settings.theme
  });

  const handleChange = (field, value) => {
    setValues({
      ...values,
      [field]: value
    });
  };

  const handleSave = () => {
    saveSettings(values);
    setOpen(false);
  };

  return (
    <Container maxWidth="md" className={classes.root}>
      <Typography variant="h4" color="textPrimary">
        Settings
      </Typography>
      <Box mt={2} px={1}>
        <FormControlLabel
          control={(
            <Switch
              checked={values.direction === 'rtl'}
              edge="start"
              name="direction"
              onChange={(event) => handleChange('direction', event.target.checked ? 'rtl' : 'ltr')}
            />
          )}
          label="RTL"
        />
      </Box>
      <Box mt={2} px={1}>
        <FormControlLabel
          control={(
            <Switch
              checked={values.responsiveFontSizes}
              edge="start"
              name="direction"
              onChange={(event) => handleChange('responsiveFontSizes', event.target.checked)}
            />
          )}
          label="Responsive font sizes"
        />
      </Box>
      <Box mt={2}>
        <TextField
          fullWidth
          label="Theme"
          name="theme"
          onChange={(event) => handleChange('theme', event.target.value)}
          select
          SelectProps={{ native: true }}
          value={values.theme}
          variant="outlined"
        >
          {Object.keys(THEMES).map((theme) => (
            <option key={theme} value={theme}>
              {capitalCase(theme)}
            </option>
          ))}
        </TextField>
      </Box>
      <Box mt={2}>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={handleSave}
        >
          Save settings
        </Button>
      </Box>
    </Container>
  );
};

export default Settings;
