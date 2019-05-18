// Dependencies
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import App from './components/App';
import BMap from './components/BMap';
import Contact from './components/Contact';
import Home from './components/Home';
import Page404 from './components/Page404';

const AppRoutes = () =>
    <App>
        <Switch>
            <Route exact path="/bmap" component={BMap} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/" component={Home} />
            <Route component={Page404} />
        </Switch>
    </App>;

export default AppRoutes;