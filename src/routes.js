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
import ValoracionesApp from './components/Valoraciones';
import Buscador from './components/Buscador';
import FollowingItems from './components/FollowingItems';
import FollowingSellers from './components/FollowingSellers';
import Ventas from './components/Ventas';
import TenCat from './components/TenCat';
import VenCat from './components/VenCat'; 
import MisPublis from './components/MisPublis';
import Preguntas from './components/Preguntas';

const AppRoutes = () =>
    <App>
        <Switch>
            <Route exact path="/bmap" component={BMap} />
            <Route exact path="/cattime" component={CatTime} />
            <Route exact path="/distexp" component={DistExp} />
            <Route exact path="/valoraciones" component={ValoracionesApp} />
            <Route exact path="/buscador" component={Buscador} />
            <Route exact path="/FollowingItems" component={FollowingItems} />
            <Route exact path="/FollowingSellers" component={FollowingSellers} />
            <Route exact path="/Ventas" component={Ventas} />
            <Route exact path="/logued_in" component={LoguedIn} />
            <Route exact path="/Tencat" component={TenCat} />
            <Route exact path="/Vencat" component={VenCat} />
            <Route exact path="/MisPublis" component={MisPublis} />
            <Route exact path="/Preguntas" component={Preguntas} />
            <Route exact path="/" component={Home} />
            <Route component={Page404} />
        </Switch>
    </App>;

export default AppRoutes;