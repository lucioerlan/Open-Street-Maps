import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  fontWeightMedium: {
    fontWeight: theme.typography.fontWeightMedium
  },
  deleteAction: {
    color: theme.palette.common.white
  },
  actionIcon: {
    marginRight: theme.spacing(1)
  }
}));

const DetailTransport = ({ className, itens, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="Detail Transport" />
      <Divider />
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Plate</TableCell>
            <TableCell>
              <Typography variant="body2" color="textSecondary">
                {itens.plate}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Latitude</TableCell>
            <TableCell>
              <Typography variant="body2" color="textSecondary">
                {!itens.lat ? 'Not available' : itens.lat}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Longitude
            </TableCell>
            <TableCell>
              <Typography variant="body2" color="textSecondary">
                {!itens.lon ? 'Not available' : itens.lon}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
};

DetailTransport.propTypes = {
  className: PropTypes.string
};

export default DetailTransport;
