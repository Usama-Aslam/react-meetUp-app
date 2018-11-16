import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from './../../Screens/Login/Login';
import Profile from './../../Screens/Profile/Profile';
import Dashboard from './../../Screens/Dashboard/Dashboard';
import Meeting from './../../Screens/Dashboard/SetMeeting/index';
import Locations from './../../Screens/MapLocation/MapLocation';

import * as screens from '../../Screens/index'

const Routes = (props) => {
    console.log("router++", props)
    return <Router>
        <div>
            <Route exact path="/" render={newProps => <Login {...newProps} loginStateFunction={props.showProfile} />} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/profile/dashboard/:userUid" component={Dashboard} />
            <Route exact path="/profile/dashboard/:userUid/meeting" component={Meeting} />
            <Route exact path="/profile/dashboard/:userUid/meeting/location" component={Locations} />
        </div>
    </Router>
}
export default Routes;