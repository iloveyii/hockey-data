import React from "react";
import {Route, Switch, BrowserRouter} from 'react-router-dom';

import Users from "../components/Users";
import Doors from "../components/Doors";
import Login from "../components/Login";
import Permissions from "../components/Permissions";
import Settings from "../components/Settings";
import Ni from "../components/Ni";



function Router(props) {


  return (
        <BrowserRouter basename="/">
          <Switch>
            <Route exact path={`/`} component={Login}/>
            <Route exact path={`/login`} component={Login}/>
            <Route exact path={`/users`} component={Users}/>
            <Route exact path={`/doors`} component={Doors}/>
            <Route exact path={`/permissions`} component={Permissions}/>
            <Route exact path={`/settings`} component={Settings}/>
            <Route component={Ni}/>
          </Switch>
        </BrowserRouter>
  );
}


export default Router;
