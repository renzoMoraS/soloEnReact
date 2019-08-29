// Dependencies
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import App from './components/App';
import BMap from './components/BMap';
import CatTime from './components/CatTime';
import DistExp from './components/DistExp';
import LoguedIn from './components/LoguedIn';
import Home from './components/Home';
import Page404 from './components/Page404';

const AppRoutes = () =>
    <App>
        <Switch>
            <Route exact path="/bmap" component={BMap} />
            <Route exact path="/cattime" component={CatTime} />
            <Route exact path="/distexp" component={DistExp} />
            <Route exact path="/logued_in" component={LoguedIn} />
            <Route exact path="/" component={Home} />
            <Route component={Page404} />
        </Switch>
    </App>;

export default AppRoutes;