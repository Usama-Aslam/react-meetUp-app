import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Screens/Login/Login';
import Profile from './Screens/Profile/Profile';

// import * as firebase from 'firebase'

import { firebase } from './Config/firebase'
import { askForPermissionToReceiveNotifications ,messagePayLoad } from './push-notification'

import Routes from "./Config/Router/router";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import AppBar from "./Components/appBar/AppBar"

//redux
import { Provider } from "react-redux";
import { store, persistor } from './Redux/store'
import { connect } from "react-redux"

import { PersistGate } from 'redux-persist/integration/react'
import { rejects } from 'assert';

class App extends Component {
    constructor() {
        super()
        this.state = {
            loginFlag: false,
            isAvailable: false
        }
        this.showProfile = this.showProfile.bind(this);
        this.hideProfile = this.hideProfile.bind(this);
    }

    showProfile() {
        this.setState({
            loginFlag: true
        })
    }

    hideProfile() {
        this.setState({
            loginFlag: false
        })
    }
    render() {
        const { loginFlag } = this.state
        // let a = askForPermissionToReceiveNotifications()
        // let b = messagePayLoad();
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <div className="App">
                        {loginFlag && <AppBar />}
                        <Routes showProfile={this.showProfile} hideProfile={this.hideProfile} />
                        <button onClick={askForPermissionToReceiveNotifications}>Notification</button>
                    </div >
                </PersistGate>
            </Provider>
        );
    }
}

export default App;