import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  Container,
  Grid,
  Divider,
  Tab,
  Tabs,
  makeStyles
} from '@material-ui/core';
import { SkeletonCustomers } from 'src/components/Skeleton';
import Page from 'src/components/Page';
import api from 'src/services/api';
import io from 'socket.io-client';
import Header from './Header';
import CustomerDetails from './DetailTracking';
import DetailTransport from './DetailTransport';
import EditButton from './EditButton';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const DetailTracking = ({ className, ...rest }) => {
  const classes = useStyles();
  const { state } = useLocation();
  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const socket = io(process.env.REACT_APP_SOCKET_URL, {
          transports: ['websocket'],
          upgrade: false
        });

        const { data } = await api.get('/getid-mapa', {
          params: { id: state }
        });

        setItens(data.message);
        setLoading(false);

        socket.once('notification', () => {
          fetchData();
        });
      } catch (error) {
        throw new Error('Error in showing the data!');
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <SkeletonCustomers />;
  }

  return (
    <Page className={classes.root} title="Details">
      <Container maxWidth={false}>
        <Header />

        <Box mt={3}>
          <Tabs value="Details" textColor="secondary">
            <Tab label="Details" value="Details" />
          </Tabs>
          <Divider />
        </Box>

        <Box mt={3}>
          <Grid container spacing={3} {...rest}>
            <EditButton itens={itens} />

            <Grid item lg={4} md={6} xl={3} xs={12}>
              <CustomerDetails itens={itens} />
            </Grid>

            <Grid item lg={4} md={6} xl={4} xs={12}>
              <DetailTransport itens={itens} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Page>
  );
};

DetailTracking.propTypes = {
  className: PropTypes.string
};

export default DetailTracking;
