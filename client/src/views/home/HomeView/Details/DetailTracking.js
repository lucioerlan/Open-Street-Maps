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
import { formatDateTime } from 'src/utils/format-dates';

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

const DetailTracking = ({ className, itens, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="Detail Tracking" />
      <Divider />
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>id</TableCell>
            <TableCell>
              <Typography variant="body2" color="textSecondary">
                {itens._id}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Tracking</TableCell>
            <TableCell>
              <Typography variant="body2" color="textSecondary">
                {itens.tracking}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Creation Date
            </TableCell>
            <TableCell>
              <Typography variant="body2" color="textSecondary">
                {formatDateTime(itens.createdAt)}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
};

DetailTracking.propTypes = {
  className: PropTypes.string
};

export default DetailTracking;
