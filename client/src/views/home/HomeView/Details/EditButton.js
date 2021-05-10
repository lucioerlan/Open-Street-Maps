import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Button, Grid, SvgIcon, makeStyles
} from '@material-ui/core';
import { EditOutlined as EditIcon } from '@material-ui/icons';
import EditTalent from 'src/modals/edit';

const useStyles = makeStyles((theme) => ({
  root: {},
  actionIcon: {
    marginRight: theme.spacing(1)
  }
}));

const EditButton = ({ className, itens, ...rest }) => {
  const classes = useStyles();

  const [openDialog, setOpenDialog] = useState(false);
  const [input, setInput] = useState(itens);

  function handleDialogClose() {
    setOpenDialog(false);
  }

  return (
    <Grid
      container
      spacing={3}
      justify="space-between"
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Grid item />
      <Grid item>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => {
            setOpenDialog(true);
            setInput(itens);
          }}
        >
          <SvgIcon fontSize="small" className={classes.actionIcon}>
            <EditIcon />
          </SvgIcon>
          Edit
        </Button>
      </Grid>
      {openDialog && (
        <EditTalent
          open={openDialog}
          input={input}
          onClose={handleDialogClose}
        />
      )}
    </Grid>
  );
};

EditButton.propTypes = {
  className: PropTypes.string,
  state: PropTypes.object.isRequired
};

export default EditButton;
