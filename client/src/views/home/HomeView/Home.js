/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import 'react-leaflet-fullscreen/dist/styles.css';
import ModalAdd from 'src/modals/add';
import api from 'src/services/api';
import io from 'socket.io-client';
import SideDrawer from './Mapa/SideDrawer';
import ShowMap from './Mapa/ShowMap';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [steine, setSteine] = useState([]);
  const [selectedStein, setSelectedStein] = useState([]);

  const handleSelectStein = (tracking) => {
    setSelectedStein({ tracking });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const socket = io(process.env.REACT_APP_SOCKET_URL, {
          transports: ['websocket'],
          upgrade: false
        });

        const { data } = await api.get('/get-all-mapa');

        setSteine(data.message);
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

  return (
    <>
      <SideDrawer
        steine={steine}
        onSelectStein={handleSelectStein}
        loading={loading}
      />
      <ShowMap
        steine={steine}
        selectedStein={selectedStein}
        onSelectStein={handleSelectStein}
      />
      <ModalAdd />
    </>
  );
};

export default Home;
