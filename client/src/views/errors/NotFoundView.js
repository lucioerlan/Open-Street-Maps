import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Container,
  Typography,
  makeStyles
} from '@material-ui/core';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import Page from 'src/components/Page';
import { ReactComponent as ErrorLogo } from 'src/assets/images/erros/undraw_empty_xct9.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  image: {
    maxWidth: '100%',
    margin: '-100px 0px -100px 0px',
    width: 560,
    '@media (hover: none)': {
      margin: '-150px 0px -150px 0px'
    }
  },
  btn: {
    textTransform: 'uppercase',
    marginTop: '10px'
  }
}));

const NotFoundView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Page className={classes.root} title="404">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="md">
          <Typography align="center" color="textPrimary" variant="h1">
            The page you are looking for is not here
          </Typography>
          <Typography align="center" color="textPrimary" variant="subtitle2">
            You either tried a dubious path or came here by mistake. Be the
            whatever, try using navigation
          </Typography>
          <Box align="center">
            <ErrorLogo
              fill={theme.palette.primary.main}
              alt="Under development"
              className={classes.image}
            />
          </Box>
          <Box display="flex" justifyContent="center">
            <Button
              className={classes.btn}
              onClick={() => navigate('/app/home')}
              size="large"
              color="primary"
              startIcon={<ArrowBackIosOutlinedIcon />}
            >
              Come back
            </Button>
          </Box>
        </Container>
      </Box>
    </Page>
  );
};

export default NotFoundView;
