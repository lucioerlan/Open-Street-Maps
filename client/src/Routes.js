import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import NotFoundView from 'src/views/errors/NotFoundView';
import HomeView from 'src/views/home/HomeView';
import HomeShowDetails from 'src/views/home/HomeView/Details';

const routes = () => [
  {
    path: '/app',
    element: <DashboardLayout />,
    children: [
      {
        path: 'home',
        element: <HomeView />
      },
      {
        path: '/home/view',
        element: <HomeShowDetails />
      },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    children: [
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/home" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
