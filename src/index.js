// Dependencies
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import '../node_modules/leaflet/dist/leaflet';
import '../node_modules/react-leaflet/dist/react-leaflet';
import '../node_modules/leaflet.markercluster/dist/MarkerCluster.css';
import '../node_modules/leaflet.markercluster/dist/MarkerCluster.Default.css';
import '../node_modules/leaflet.markercluster/dist/leaflet.markercluster';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

// Routes
import AppRoutes from './routes'

// Assets
import './index.css';

render(
    <Router>
        <AppRoutes />
    </Router>,
    document.getElementById('root')
);

