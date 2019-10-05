// Dependencies
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import App from './components/App';
import BMap from './components/BMap';
import CatTime from './components/CatTime';
import DistExp from './components/DistExp';
import LoguedIn from './components/LoguedIn';
//import Home from './components/Home';
import Page404 from './components/Page404';
import ValoracionesApp from './components/Valoraciones';
import pantallaInicio from './components/pantallaInicio';

const AppRoutes = () =>
    <App>
        <Switch>

            <Route exact path="/logued_in" component={pantallaInicio} />
            <Route exact path="/bmap" component={BMap} />
            <Route exact path="/cattime" component={CatTime} />
            <Route exact path="/distexp" component={DistExp} />
            <Route exact path="/valoraciones" component={ValoracionesApp} />
            <Route exact path="/" component={pantallaInicio} />
            <Route component={Page404} />

        </Switch>
    </App>;
    //<Route exact path="/logued_in" component={pantallaInicio} />
    //<Route exact path="/pantallaInicio" component={pantallaInicio} />

export default AppRoutes;