import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography, colors } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 0,
    flexShrink: 0,
    borderRadius: theme.shape.borderRadius,
    lineHeight: '10px',
    fontSize: '10px',
    height: 20,
    minWidth: 20,
    whiteSpace: 'nowrap',
    padding: theme.spacing(0.5, 1)
  },
  rounded: {
    borderRadius: 10,
    padding: theme.spacing(0.5)
  }
}));

const Label = (props) => {
  const {
    className, variant, color, shape, children, style, ...rest
  } = props;

  const classes = useStyles();

  const rootClassName = clsx(
    {
      [classes.root]: true,
      [classes.rounded]: shape === 'rounded'
    },
    className
  );

  const finalStyle = { ...style };

  if (variant === 'contained') {
    finalStyle.backgroundColor = color;
    finalStyle.color = '#FFF';
  } else {
    finalStyle.border = `1px solid ${color}`;
    finalStyle.color = color;
  }

  return (
    <Typography
      {...rest}
      className={rootClassName}
      style={finalStyle}
      variant="overline"
    >
      {children}
    </Typography>
  );
};

Label.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.string,
  shape: PropTypes.oneOf(['square', 'rounded']),
  style: PropTypes.object,
  variant: PropTypes.oneOf(['contained', 'outlined'])
};

Label.defaultProps = {
  style: {},
  color: colors.grey[600],
  variant: 'contained',
  shape: 'square'
};

export default Label;
