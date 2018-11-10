import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from './../../Screens/Login/Login';
import Profile from './../../Screens/Profile/Profile';
import Dashboard from './../../Screens/Dashboard/Dashboard';

import * as screens from '../../Screens/index'

const Routes = (props) => {
    console.log("router++", props)
    return <Router>
        <div>
            <Route exact path="/" render={newProps => <Login {...newProps} loginStateFunction={props.showProfile} />} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/profile/dashboard/:userUid/meeting" component={Dashboard} />
        </div>
    </Router>
}
export default Routes;